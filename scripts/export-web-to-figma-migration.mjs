import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { chromium } from "playwright";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

const baseUrl = process.argv[2] || "http://127.0.0.1:5173/slides/";
const outputDir =
  process.argv[3] || path.join(repoRoot, "materials", "figma-migration", "latest");
const appFile = path.join(repoRoot, "src", "slides", "App.jsx");
const chromePath = "C:/Program Files/Google/Chrome/Application/chrome.exe";

await fs.mkdir(outputDir, { recursive: true });

const screenDir = path.join(outputDir, "screens");
await fs.mkdir(screenDir, { recursive: true });

const slideMeta = await readSlideMeta(appFile);
if (slideMeta.length === 0) {
  throw new Error(`No slide metadata found in ${appFile}`);
}

const browser = await chromium.launch({
  headless: true,
  executablePath: (await fileExists(chromePath)) ? chromePath : undefined,
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
    button[aria-label^="上一页"],
    button[aria-label^="下一页"] {
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

if (slideCount !== slideMeta.length) {
  throw new Error(
    `Slide count mismatch. Browser found ${slideCount} slides but App.jsx has ${slideMeta.length} entries.`,
  );
}

const manifest = [];

for (let index = 0; index < slideCount; index += 1) {
  const meta = slideMeta[index];
  await page.goto(`${baseUrl}#${index + 1}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);

  const imageName = `${String(index + 1).padStart(2, "0")}-${meta.id}.png`;
  const imagePath = path.join(screenDir, imageName);

  await page.locator(".deck-stage").screenshot({ path: imagePath });

  manifest.push({
    number: index + 1,
    id: meta.id,
    label: meta.label,
    section: meta.section,
    title: meta.title,
    image: path.relative(outputDir, imagePath).replaceAll("\\", "/"),
  });
}

await browser.close();

await fs.writeFile(
  path.join(outputDir, "manifest.json"),
  `${JSON.stringify({ baseUrl, slideCount, slides: manifest }, null, 2)}\n`,
  "utf8",
);

await fs.writeFile(path.join(outputDir, "README.md"), buildReadme(manifest), "utf8");

console.log(
  JSON.stringify(
    {
      ok: true,
      baseUrl,
      slideCount,
      outputDir,
      files: {
        manifest: path.join(outputDir, "manifest.json"),
        readme: path.join(outputDir, "README.md"),
        screens: screenDir,
      },
    },
    null,
    2,
  ),
);

async function readSlideMeta(filePath) {
  const source = await fs.readFile(filePath, "utf8");
  const match = source.match(/const slideDeck = \[(?<body>[\s\S]*?)\n\];/);
  if (!match?.groups?.body) return [];

  const slides = [];
  const entryPattern =
    /\{\s*id:\s*"([^"]+)",\s*label:\s*"([^"]+)",\s*section:\s*"([^"]+)",\s*title:\s*"([^"]+)"/g;

  for (const entry of match.groups.body.matchAll(entryPattern)) {
    slides.push({
      id: entry[1],
      label: entry[2],
      section: entry[3],
      title: entry[4],
    });
  }

  return slides;
}

function buildReadme(slides) {
  const lines = [
    "# Figma Migration Export",
    "",
    "This folder is a migration pack for rebuilding the current web slide deck in Figma Slides.",
    "",
    "## What Is Here",
    "",
    "- `screens/`: one PNG per slide, captured from the live web deck",
    "- `manifest.json`: slide order, ids, labels, sections, titles, and image paths",
    "",
    "## Suggested Figma Workflow",
    "",
    "1. Create a new 16:9 Figma Slides file.",
    "2. Import the PNGs from `screens/` into an `Assets` page for visual reference.",
    "3. Use `manifest.json` or the table below to rebuild each slide with editable layers.",
    "4. Rebuild text, layout, and cards in Figma instead of dropping the screenshots in as final slides.",
    "",
    "## Slide Index",
    "",
    "| # | ID | Section | Title |",
    "|---|---|---|---|",
    ...slides.map((slide) => `| ${slide.number} | \`${slide.id}\` | ${slide.section} | ${slide.title} |`),
    "",
  ];

  return `${lines.join("\n")}\n`;
}

async function fileExists(target) {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
}
