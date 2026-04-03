import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("root entry redirects to /slides/", () => {
  const file = fs.readFileSync("index.html", "utf8");

  assert.match(file, /url=\/slides\//);
  assert.match(file, /<a href="\/slides\/"/);
});

test("slides shell mounts the React runtime from src/slides/main.jsx", () => {
  const file = fs.readFileSync("slides/index.html", "utf8");

  assert.match(file, /<div id="app"><\/div>/);
  assert.match(file, /<script type="module" src="\/src\/slides\/main\.jsx"><\/script>/);
});
