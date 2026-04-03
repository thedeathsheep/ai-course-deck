import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { chromium } from "playwright";
import PptxGenJS from "pptxgenjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

const baseUrl = process.argv[2] || "http://127.0.0.1:5173/slides/";
const outputFile =
  process.argv[3] || path.join(repoRoot, "materials", "ai-cognition-course-web-latest.pptx");
const screenshotDir = path.join(repoRoot, ".codex-temp", "web-pptx-export");
const chromePath = "C:/Program Files/Google/Chrome/Application/chrome.exe";

await fs.mkdir(screenshotDir, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: await fileExists(chromePath) ? chromePath : undefined,
});

const page = await browser.newPage({
  viewport: { width: 1600, height: 900 },
  deviceScaleFactor: 1,
  locale: "zh-CN",
});

await page.goto(baseUrl, { waitUntil: "networkidle" });
await page.addStyleTag({
  content: `
    body {
      margin: 0 !important;
      background: #edf2f5 !important;
    }

    .deck-pill,
    aside,
    button[aria-label="上一页"],
    button[aria-label="下一页"] {
      display: none !important;
    }
  `,
});

const slideCount = await page.evaluate(() => {
  return document.querySelectorAll("[aria-label^='跳转到第']").length;
});

if (!slideCount) {
  throw new Error(`No slides found at ${baseUrl}`);
}

const deck = new PptxGenJS();
deck.layout = "LAYOUT_16x9";
deck.author = "OpenAI Codex";
deck.company = "OpenAI";
deck.subject = "Latest web-exported AI course deck";
deck.title = "AI course deck (web export)";
deck.lang = "zh-CN";
deck.theme = {
  headFontFace: "Microsoft YaHei UI",
  bodyFontFace: "Microsoft YaHei UI",
  lang: "zh-CN",
};

for (let index = 0; index < slideCount; index += 1) {
  await page.goto(`${baseUrl}#${index + 1}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);

  const slug = await page.evaluate(() => {
    return window.location.hash.replace("#", "") || "slide";
  });

  const imagePath = path.join(
    screenshotDir,
    `${String(index + 1).padStart(2, "0")}-${slug.replace(/[^a-z0-9-]/gi, "_")}.png`,
  );

  await page.locator(".deck-stage").screenshot({ path: imagePath });

  const slide = deck.addSlide();
  slide.background = { color: "EDF2F5" };
  slide.addImage({
    path: imagePath,
    x: 0,
    y: 0,
    w: 10,
    h: 5.625,
    sizing: { type: "contain", w: 10, h: 5.625 },
  });
}

await browser.close();
await deck.writeFile({ fileName: outputFile });

console.log(
  JSON.stringify(
    {
      ok: true,
      slideCount,
      baseUrl,
      outputFile,
    },
    null,
    2,
  ),
);

async function fileExists(target) {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
}
