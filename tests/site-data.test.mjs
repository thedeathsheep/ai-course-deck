import test from "node:test";
import assert from "node:assert/strict";

import {
  groupSlidesBySection,
  sortSlides,
  groupResourcesByCategory,
  sortResourcesByPriority,
  PRIORITY_ORDER,
} from "../src/lib/site-data.mjs";

test("sortSlides sorts slides by order ascending", () => {
  const slides = [
    { id: "c", data: { order: 3 } },
    { id: "a", data: { order: 1 } },
    { id: "b", data: { order: 2 } },
  ];

  const sorted = sortSlides(slides);

  assert.deepEqual(
    sorted.map((slide) => slide.id),
    ["a", "b", "c"],
  );
});

test("groupSlidesBySection preserves slide order inside each section", () => {
  const slides = [
    { id: "one", data: { order: 3, section: "基础认知" } },
    { id: "two", data: { order: 1, section: "开场" } },
    { id: "three", data: { order: 2, section: "基础认知" } },
  ];

  const grouped = groupSlidesBySection(slides);

  assert.deepEqual(grouped.map((item) => item.section), ["开场", "基础认知"]);
  assert.deepEqual(
    grouped[1].slides.map((slide) => slide.id),
    ["three", "one"],
  );
});

test("sortResourcesByPriority ranks S before A before B and then by title", () => {
  const resources = [
    { id: "zeta", data: { title: "Zeta", priority: "B" } },
    { id: "alpha", data: { title: "Alpha", priority: "S" } },
    { id: "beta", data: { title: "Beta", priority: "A" } },
    { id: "another-alpha", data: { title: "Another Alpha", priority: "S" } },
  ];

  const sorted = sortResourcesByPriority(resources);

  assert.deepEqual(
    sorted.map((item) => item.id),
    ["alpha", "another-alpha", "beta", "zeta"],
  );
});

test("groupResourcesByCategory groups sorted resources under category titles", () => {
  const resources = [
    { id: "kimi", data: { title: "Kimi", category: "免费 AI 工具", priority: "S" } },
    { id: "prompting-guide", data: { title: "Prompting Guide", category: "提示词资料库", priority: "A" } },
    { id: "doubao", data: { title: "豆包", category: "免费 AI 工具", priority: "A" } },
  ];

  const grouped = groupResourcesByCategory(resources);

  assert.deepEqual(grouped.map((group) => group.category), ["免费 AI 工具", "提示词资料库"]);
  assert.deepEqual(
    grouped[0].resources.map((item) => item.id),
    ["kimi", "doubao"],
  );
});

test("PRIORITY_ORDER exposes the expected editorial order", () => {
  assert.deepEqual(PRIORITY_ORDER, ["S", "A", "B"]);
});
