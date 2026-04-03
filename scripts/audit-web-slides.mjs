import { chromium } from "playwright";

const baseUrl = process.argv[2] || "http://127.0.0.1:5173/slides/";

const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});

const page = await browser.newPage({
  viewport: { width: 1600, height: 900 },
  locale: "zh-CN",
});

await page.goto(baseUrl, { waitUntil: "networkidle" });

const slideCount = await page.evaluate(() => {
  return document.querySelectorAll("[aria-label^='跳转到第']").length;
});

const failures = [];

for (let index = 0; index < slideCount; index += 1) {
  await page.goto(`${baseUrl}#${index + 1}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(250);

  const result = await page.evaluate(() => {
    const stage = document.querySelector(".deck-stage");
    const title = document.querySelector("h1, h2");
    const rect = stage?.getBoundingClientRect();
    const bodyWidth = document.body.scrollWidth;
    const bodyHeight = document.body.scrollHeight;

    return {
      hasStage: Boolean(stage),
      hasTitle: Boolean(title),
      overflowX: bodyWidth > window.innerWidth + 2,
      overflowY: bodyHeight > window.innerHeight + 2,
      stageTooSmall: rect ? rect.width < window.innerWidth * 0.7 : true,
    };
  });

  if (!result.hasStage) failures.push({ index, issue: "missing-stage" });
  if (!result.hasTitle) failures.push({ index, issue: "missing-title" });
  if (result.overflowX) failures.push({ index, issue: "overflow-x" });
  if (result.overflowY) failures.push({ index, issue: "overflow-y" });
  if (result.stageTooSmall) failures.push({ index, issue: "stage-too-small" });
}

await browser.close();

if (failures.length > 0) {
  console.error(JSON.stringify(failures, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ ok: true, checked: slideCount, baseUrl }, null, 2));
