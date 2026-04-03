# Figma Slides 首轮搭建清单

## 本轮目标

在不追求全量迁移的前提下，先把 Figma Slides 的主框架搭起来，并完成最关键的 8 页。

这 8 页完成后，你应该已经能拿它去做一次像样的分享预演。

## 第一轮范围

优先完成以下页面：

1. `cover`
2. `four-questions`
3. `search-vs-interface`
4. `why-now`
5. `prompt-structure`
6. `workflow`
7. `seven-day-plan`
8. `closing`

## 开工顺序

### Step 1. 建 Figma 文件结构

在 Figma Slides 中建立以下页面：

- `00 Cover & Theme`
- `01 Components`
- `02 Slides Main`
- `03 Assets`
- `04 Archive`

完成标准：

- 页面命名清晰
- 主工作区在 `02 Slides Main`
- 所有实验稿都不混进正式页

### Step 2. 建主题变量

先建立基础样式，不要急着画具体页面。

需要先建：

- 颜色变量 8 个左右
- 字体样式 5 个层级
- 统一圆角规则
- 统一描边规则
- 统一阴影或模糊规则

完成标准：

- 任意一页都可以只靠样式系统完成 70% 的视觉统一

### Step 3. 先做 6 套母版

建议先做：

- 封面页母版
- 观点陈述页母版
- 双栏对比页母版
- 流程页母版
- 卡片矩阵页母版
- 数据证据页母版

完成标准：

- 每套母版都有标题区、内容区、页脚规则
- 母版之间有明显差异，但属于同一套系统

### Step 4. 抽常用组件

先做这些组件：

- Kicker
- 主标题块
- 正文段落块
- 数据卡
- 标签胶囊
- Shot Card
- 对比栏
- 流程步骤卡
- 风险卡
- 章节结束页构图

完成标准：

- 至少 8 个组件能跨页复用
- 同类卡片不再逐页手工画

### Step 5. 整理素材页

从仓库里把以下内容导入 `03 Assets`：

- 产品截图
- 报告页截图
- 研究图
- 图标或示意图

建议来源：

- `assets/screens/`
- `assets/reports/`
- `assets/research/`
- `assets/diagrams/`

完成标准：

- 所有高频素材在 Figma 中都能快速找到

### Step 6. 开始做 8 张关键页

建议顺序：

1. `cover`
2. `closing`
3. `four-questions`
4. `search-vs-interface`
5. `why-now`
6. `prompt-structure`
7. `workflow`
8. `seven-day-plan`

这个顺序的好处：

- 先定封面和结尾，统一气质
- 再定中间关键结构页
- 最后处理流程和行动页

## 每页施工规则

每完成一页，都检查以下几点：

1. 这页是否只表达一个主要观点
2. 标题是否能在 3 秒内被看懂
3. 页面上是否有一个最强视觉焦点
4. 元素是否已经对齐到统一栅格
5. 文案是否比 web 版本更短、更准
6. 是否为了“复刻 web”而牺牲了可编辑性

如果第 6 条答案是“是”，就应当回退，改成更适合 Figma 的表达。

## 优先级提醒

最值得花时间精修的不是所有页，而是：

- `cover`
- `search-vs-interface`
- `workflow`
- `closing`

因为这几页决定了整套演示的第一印象、方法论感和结束力度。

## 不要做的事

- 不要先做 23 页再回头建组件
- 不要把 web 页面整张截图贴进去充数
- 不要为复刻动画花掉太多时间
- 不要一开始就追求 100% 完成度
- 不要让每一页都长得像同一套模板

## 第一轮完成标准

满足以下条件，就可以结束第一轮：

1. 8 张关键页已在 Figma Slides 中完成
2. 已建立基本主题变量和母版
3. 关键素材已整理进素材页
4. 页面顺序已经可以直接用于一次完整预演
5. 后续补页时不需要推翻前面的系统

## 第二轮再做什么

第一轮完成后，再进入第二轮补齐：

- `audience-positioning`
- `task-shift`
- `hallucination`
- `human-ai-roles`
- `product-layers`
- `global-interfaces`
- `china-interfaces`
- `option-generation`
- `work-life-surface`
- `risk-boundary`
- `resources-action`

## 仓库里的对应参考

结构参考：

- [src/slides/App.jsx](C:/Users/whatk/Documents/ai-course-deck/src/slides/App.jsx)

迁移总方案：

- [docs/figma-slides-migration-plan.md](C:/Users/whatk/Documents/ai-course-deck/docs/figma-slides-migration-plan.md)

页面映射表：

- [docs/figma-slides-slide-map.md](C:/Users/whatk/Documents/ai-course-deck/docs/figma-slides-slide-map.md)
