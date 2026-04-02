import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("slides page uses a bundled runtime script instead of bare module imports", () => {
  const file = fs.readFileSync("src/pages/slides/index.astro", "utf8");

  assert.match(file, /<script type="module" src="\/slides-runtime\.js"><\/script>/);
  assert.doesNotMatch(file, /import Reveal from "reveal\.js"/);
  assert.doesNotMatch(file, /import RevealNotes from "reveal\.js\/plugin\/notes"/);
});
