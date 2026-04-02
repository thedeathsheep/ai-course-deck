import { chromium } from "playwright";

const baseUrl = process.argv[2] || "http://127.0.0.1:4321/slides/";
const slideCount = Number(process.argv[3] || 19);

const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});

const page = await browser.newPage({
  viewport: { width: 1600, height: 900 },
  locale: "zh-CN",
});

const failures = [];

for (let index = 0; index < slideCount; index += 1) {
  await page.goto(`${baseUrl}#/${index}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(350);

  const result = await page.evaluate(() => {
    const viewportHeight = window.innerHeight;
    const topbar = document.querySelector(".deck-topbar");
    const present = document.querySelector(".deck-slide.present");
    if (!present) {
      return { missing: true };
    }

    const inner = present.querySelector(".deck-slide__inner");
    const h1 = present.querySelector("h1");
    const actionButtons = [...document.querySelectorAll(".deck-topbar__actions > *")];

    const rect = inner?.getBoundingClientRect();
    const titleStyle = h1 ? getComputedStyle(h1) : null;
    const titleFont = titleStyle ? parseFloat(titleStyle.fontSize) : 0;
    const titleLine = titleStyle ? parseFloat(titleStyle.lineHeight) : 0;

    const overlaps = [];
    for (let i = 0; i < actionButtons.length; i += 1) {
      for (let j = i + 1; j < actionButtons.length; j += 1) {
        const a = actionButtons[i].getBoundingClientRect();
        const b = actionButtons[j].getBoundingClientRect();
        const isOverlap = !(a.right <= b.left || b.right <= a.left || a.bottom <= b.top || b.bottom <= a.top);
        if (isOverlap) overlaps.push([i, j]);
      }
    }

    return {
      missing: false,
      slug: present.getAttribute("data-slide-slug"),
      overflowBottom: rect ? rect.bottom > viewportHeight + 6 : false,
      overflowTop: rect ? rect.top < 0 : false,
      titleTooTight: titleFont && titleLine ? titleLine < titleFont * 1.01 : false,
      topbarOverlap: overlaps.length > 0,
      topbarWrappedOffscreen: topbar ? topbar.getBoundingClientRect().bottom > 120 : false,
    };
  });

  if (result.missing) {
    failures.push({ index, issue: "missing-slide" });
    continue;
  }

  Object.entries(result).forEach(([key, value]) => {
    if (["overflowBottom", "overflowTop", "titleTooTight", "topbarOverlap", "topbarWrappedOffscreen"].includes(key) && value) {
      failures.push({ index, slug: result.slug, issue: key });
    }
  });
}

await browser.close();

if (failures.length > 0) {
  console.error(JSON.stringify(failures, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ ok: true, checked: slideCount, baseUrl }, null, 2));
