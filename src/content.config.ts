import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const slides = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/slides" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    order: z.number().int().positive(),
    section: z.string(),
    layoutType: z.enum(["hero", "statement", "split", "evidence", "map", "workflow", "closing"]),
    speakerNotes: z.string().optional(),
    sourceRefs: z.array(z.string()).default([]),
    heroAsset: z.string().optional(),
    inlineAssets: z.array(z.string()).default([]),
    demoLink: z
      .object({
        label: z.string(),
        url: z.string(),
      })
      .optional(),
  }),
});

const resources = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/resources" }),
  schema: z.object({
    title: z.string(),
    category: z.enum([
      "免费 AI 工具",
      "提示词资料库",
      "热门玩法与教程",
      "飞书与知识库",
      "AI 通识课程",
    ]),
    summary: z.string(),
    sourceType: z.enum(["官方", "GitHub", "飞书", "社区整理", "报告", "课程", "导航站"]),
    regionAccess: z.enum(["大陆友好", "需外网", "登录可能受限"]),
    priority: z.enum(["S", "A", "B"]),
    url: z.string().url(),
    relatedTags: z.array(z.string()).default([]),
  }),
});

export const collections = {
  slides,
  resources,
};
