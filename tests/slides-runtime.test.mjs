import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("slides bootstrap imports App and shared deck styles", () => {
  const file = fs.readFileSync("src/slides/main.jsx", "utf8");

  assert.match(file, /import App from "\.\/App\.jsx";/);
  assert.match(file, /import "\.\/index\.css";/);
  assert.match(file, /ReactDOM\.createRoot\(document\.getElementById\("app"\)\)\.render/);
});

test("package scripts point at the active Vite workflow", () => {
  const file = fs.readFileSync("package.json", "utf8");

  assert.match(file, /"dev": "vite"/);
  assert.match(file, /"build": "vite build"/);
  assert.match(file, /"slides:audit": "node scripts\/audit-web-slides\.mjs"/);
  assert.match(file, /"export:pptx": "node scripts\/export-web-to-pptx\.mjs"/);
  assert.doesNotMatch(file, /build-course-deck-v2/);
});
