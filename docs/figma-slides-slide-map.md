# Figma Slides 页面映射表

## 使用方式

这份清单对应当前 [src/slides/App.jsx](C:/Users/whatk/Documents/ai-course-deck/src/slides/App.jsx) 的正式页面顺序。

每一页都标记了：

- 当前页面定位
- 推荐使用的 Figma 母版
- 迁移方式
- 备注

迁移方式说明：

- `重建`：在 Figma 中重新搭建对象和版式
- `半重建`：保留结构，局部改成截图或简化图形
- `降级`：不追求原有动态或代码绘制，转为静态关键帧表达

## 页面清单

| # | ID | 标题 | 章节 | 推荐母版 | 迁移方式 | 备注 |
|---|---|---|---|---|---|---|
| 1 | `cover` | AI 不是更强的搜索，而是新的任务接口 | Opening | 封面页 | 降级 | 保留左文右图构图，右侧抽象轨道改为静态主视觉 |
| 2 | `audience-positioning` | 这门分享是给谁的 | Opening | 观点陈述页 | 重建 | 可用 3 到 5 个标签点出受众心态 |
| 3 | `four-questions` | 这次分享先回答三个问题 | Opening | 双栏对比页 | 重建 | 左侧大数字，右侧 3 个问题卡片即可 |
| 4 | `search-vs-interface` | 搜索 vs 交互界面 | What AI Is | 双栏对比页 | 半重建 | 保留对比关系，流程箭头和界面示意可简化 |
| 5 | `task-shift` | 从找答案到定义任务 | What AI Is | 观点陈述页 | 重建 | 建议用一句核心判断 + 三段支持 |
| 6 | `how-ai-works` | AI 如何工作 | What AI Is | 流程页 | 降级 | 不复刻复杂机制图，改成 4 步预测逻辑图 |
| 7 | `hallucination` | 为什么 AI 会一本正经地出错 | What AI Is | 卡片矩阵页 | 重建 | 适合 3 卡或 4 卡解释错误来源 |
| 8 | `why-now` | AI 已进入真实工作流 | Change | 数据与证据页 | 半重建 | 数据保留，报告截图可直接复用 |
| 9 | `human-ai-roles` | 最稳的人机分工 | Change | 双栏对比页 | 重建 | 左 AI，右 Human，强调“扩展 vs 收束” |
| 10 | `capability-surface` | AI 不再是单一能力 | What AI Can Do | 卡片矩阵页 | 半重建 | 可保留能力层次图，但做成更规整的环状或分层结构 |
| 11 | `product-layers` | 主流 AI 产品，不要当成一堆名字背 | What AI Can Do | 卡片矩阵页 | 重建 | 用 4 层地图表达，适合统一组件化 |
| 12 | `global-interfaces` | 海外主流入口长什么样 | What AI Can Do | 卡片矩阵页 | 半重建 | 产品截图直接复用，说明文字重新整理 |
| 13 | `china-interfaces` | 国内用户真正常见的入口 | What AI Can Do | 卡片矩阵页 | 半重建 | 与海外入口页保持同一版式体系 |
| 14 | `prompting` | 提示词不是咒语，而是任务定义 | Practice | 观点陈述页 | 重建 | 这页应更简洁，突出“不是咒语，是任务定义” |
| 15 | `prompt-structure` | 一条高质量提示词通常包含这些部分 | Practice | 卡片矩阵页 | 重建 | 最适合做成组件页，后续可复用 |
| 16 | `demo-prompt-comparison` | 同一个任务，问法不同，结果差很多 | Practice | 双栏对比页 | 重建 | 左右并排最清晰，适合现场讲解 |
| 17 | `workflow` | 一个稳定的 AI 工作流 | Practice | 流程页 | 重建 | 这页是关键页，建议重点打磨 |
| 18 | `option-generation` | AI 很适合先帮你扩展选项池 | Practice | 卡片矩阵页 | 重建 | 可做 3 种风格方案对比，视觉表现力强 |
| 19 | `work-life-surface` | AI 的价值不只在办公桌上 | Change | 卡片矩阵页 | 重建 | 适合做场景卡片墙 |
| 20 | `risk-boundary` | 真正重要的是边界感 | Boundary | 观点陈述页 | 重建 | 可搭配 3 到 4 个风险卡片 |
| 21 | `seven-day-plan` | 如果只给普通学习者一条路，我会让他这样开始 7 天 | Action | 流程页 | 重建 | 建议做时间线或 7 格卡片 |
| 22 | `resources-action` | 课后不要继续刷推荐，而要沿着问题继续学 | Action | 观点陈述页 | 重建 | 更适合收尾前的行动引导页 |
| 23 | `closing` | 先把 AI 看成新的任务接口 | Closing | 封面页 | 重建 | 与封面形成呼应，做收束和情绪拉满 |

## 高优先级页面

以下页面建议优先迁移，因为它们最能决定整套演示的质量：

1. `cover`
2. `four-questions`
3. `search-vs-interface`
4. `why-now`
5. `prompt-structure`
6. `workflow`
7. `seven-day-plan`
8. `closing`

## 最适合组件化的页面

这些页面建议优先抽成可复用组件：

- `product-layers`
- `global-interfaces`
- `china-interfaces`
- `prompt-structure`
- `work-life-surface`
- `risk-boundary`

## 最不值得硬复刻的页面

这些页面如果强行按 web 版本复刻，成本高但收益有限：

- `cover`
- `how-ai-works`
- `capability-surface`

推荐做法：

- 保留构图和观点
- 降低动态复杂度
- 提高静态完成度

## 资产来源提醒

迁移过程中优先从以下目录拿素材：

- `assets/screens/`
- `assets/reports/`
- `assets/research/`
- `assets/diagrams/`

如果某页只需要“表达观点”，优先重建版式，不要直接把整个 web 页面截图贴进去。
