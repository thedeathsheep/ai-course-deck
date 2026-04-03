# Web To Figma Workflow

## 结论

把当前 `web/html` 项目迁移到 Figma Slides，本质上不是“导入 HTML”，而是：

- 从 web 项目导出可参考的视觉资产
- 带着页面结构和文案清单
- 在 Figma 里重建为可编辑图层

Figma AI 配额不会决定这条路线能不能做。它只影响“AI 帮你自动生成 deck”，不影响你把现有项目迁成 Figma 稿。

## 推荐工作流

### 1. 跑本地演示

```bash
npm run dev
```

默认地址：

```text
http://127.0.0.1:5173/slides/
```

### 2. 导出迁移包

在另一个终端里执行：

```bash
npm run export:figma -- http://127.0.0.1:5173/slides/
```

输出目录默认在：

- `materials/figma-migration/latest/`

生成内容包括：

- `screens/`：每页 PNG
- `manifest.json`：页面顺序、标题、章节、图片路径
- `README.md`：导入 Figma 时的索引表

### 3. 在 Figma Slides 里重建

推荐方式：

1. 新建一个 16:9 的 Figma Slides 文件
2. 建 `Assets` 页面，把 `screens/` 全部导入进去
3. 按 `manifest.json` 的顺序重建页面
4. 截图只做参考，不作为最终交付页面

## 为什么不建议直接贴截图当成最终稿

因为你的目标是“迁移到 Figma 并继续编辑”，而不是“把 web 页面冻成图片”。

所以正确做法应该是：

- 截图负责保留构图和气质
- Figma 负责重建文字、卡片、流程和图形

## 哪些内容应该重建

- 标题与正文
- 卡片结构
- 流程步骤
- 对比页
- 风险页
- 章节页

## 哪些内容可以沿用截图做参考

- 产品界面截图
- 报告页截图
- 研究图
- 复杂抽象构图的整体氛围

## 当前仓库里相关文件

- [scripts/export-web-to-figma-migration.mjs](C:/Users/whatk/Documents/ai-course-deck/scripts/export-web-to-figma-migration.mjs)
- [docs/figma-slides-migration-plan.md](C:/Users/whatk/Documents/ai-course-deck/docs/figma-slides-migration-plan.md)
- [docs/figma-slides-slide-map.md](C:/Users/whatk/Documents/ai-course-deck/docs/figma-slides-slide-map.md)
- [docs/figma-slides-build-checklist.md](C:/Users/whatk/Documents/ai-course-deck/docs/figma-slides-build-checklist.md)
