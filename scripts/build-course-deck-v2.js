const path = require("path");
const pptxgen = require("pptxgenjs");

const pptx = new pptxgen();
pptx.layout = "LAYOUT_16x9";
pptx.author = "OpenAI Codex";
pptx.company = "OpenAI";
pptx.subject = "AI literacy teaching deck v2";
pptx.title = "AI 不是更强的搜索，而是新的任务接口";
pptx.lang = "zh-CN";
pptx.theme = {
  headFontFace: "Microsoft YaHei UI",
  bodyFontFace: "Microsoft YaHei UI",
  lang: "zh-CN",
};

const W = 10;
const H = 5.625;

const C = {
  ink: "141A27",
  panel: "FFFFFF",
  paper: "F6F8FC",
  line: "DCE4F1",
  text: "162033",
  sub: "62708B",
  blue: "5B8CFF",
  violet: "7B61FF",
  pink: "FF6FAE",
  softBlue: "EAF1FF",
  softViolet: "F1EEFF",
  softPink: "FFF0F7",
  softGray: "F0F3F8",
  white: "FFFFFF",
};

const assets = {
  cover: path.join(__dirname, "..", "assets", "cover-abstract.svg"),
  closing: path.join(__dirname, "..", "assets", "closing-abstract.svg"),
  searchVsAi: path.join(__dirname, "..", "assets", "diagrams", "search-vs-ai.svg"),
  llmConcepts: path.join(__dirname, "..", "assets", "diagrams", "llm-four-concepts.svg"),
  workflow: path.join(__dirname, "..", "assets", "diagrams", "workflow-five-step.svg"),
  chatgpt: path.join(__dirname, "..", "assets", "screens", "chatgpt-overview.png"),
  claude: path.join(__dirname, "..", "assets", "screens", "claude-home.png"),
  gemini: path.join(__dirname, "..", "assets", "screens", "gemini-overview.png"),
  deepseek: path.join(__dirname, "..", "assets", "screens", "deepseek-home.png"),
  doubao: path.join(__dirname, "..", "assets", "screens", "doubao-home.png"),
  kimi: path.join(__dirname, "..", "assets", "screens", "kimi-home.png"),
  yuanbao: path.join(__dirname, "..", "assets", "screens", "yuanbao-home.png"),
  spark: path.join(__dirname, "..", "assets", "screens", "spark-home.png"),
  report6: path.join(__dirname, "..", "assets", "reports", "pages", "openai-report-p6.png"),
  report7: path.join(__dirname, "..", "assets", "reports", "pages", "openai-report-p7.png"),
  report11: path.join(__dirname, "..", "assets", "reports", "pages", "openai-report-p11.png"),
  systemHallucination: path.join(__dirname, "..", "assets", "reports", "systemcard", "gpt5-p12.png"),
  anthropicPrompting: path.join(__dirname, "..", "assets", "research", "anthropic-prompting.png"),
  aiBotPrompt: path.join(__dirname, "..", "assets", "research", "ai-bot-optimize-prompt.png"),
  aiBotChain: path.join(__dirname, "..", "assets", "research", "ai-bot-prompt-chain.png"),
  aiBotEncyclopedia: path.join(__dirname, "..", "assets", "research", "ai-bot-encyclopedia.png"),
};

function slideBase(no, dark = false) {
  const slide = pptx.addSlide();
  slide.background = { color: dark ? C.ink : C.paper };
  slide.addText(String(no), {
    x: 9.16, y: 5.12, w: 0.24, h: 0.14,
    fontFace: "Georgia", fontSize: 9,
    color: dark ? "D4DDF4" : "94A0B8",
    align: "right",
    margin: 0,
  });
  return slide;
}

function addKicker(slide, text, dark = false) {
  slide.addText(text.toUpperCase(), {
    x: 0.72, y: dark ? 0.56 : 0.46, w: 2.2, h: 0.16,
    fontFace: "Georgia", fontSize: 8.5, bold: true,
    charSpacing: 1.1, color: dark ? C.blue : C.blue, margin: 0,
  });
}

function addTitle(slide, title, subtitle = "", opts = {}) {
  slide.addText(title, {
    x: 0.72, y: opts.dark ? 0.96 : 0.9, w: opts.w || 8.2, h: opts.h || 0.52,
    fontFace: "Microsoft YaHei UI",
    fontSize: opts.dark ? 24 : 20.5,
    bold: true,
    color: opts.dark ? C.white : C.text,
    margin: 0,
    fit: "shrink",
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.74, y: opts.dark ? 1.56 : 1.48, w: opts.w || 8.2, h: 0.2,
      fontFace: "Microsoft YaHei UI",
      fontSize: 10.2,
      color: opts.dark ? "CFD8F3" : C.sub,
      margin: 0,
      fit: "shrink",
    });
  }
}

function panel(slide, x, y, w, h, fill = C.panel, line = C.line) {
  slide.addShape(pptx.ShapeType.rect, {
    x, y, w, h,
    line: { color: line, width: 1 },
    fill: { color: fill },
  });
}

function text(slide, content, x, y, w, h, opts = {}) {
  slide.addText(content, {
    x, y, w, h,
    fontFace: opts.fontFace || "Microsoft YaHei UI",
    fontSize: opts.fontSize || 10.5,
    bold: !!opts.bold,
    color: opts.color || C.text,
    margin: opts.margin === undefined ? 0 : opts.margin,
    align: opts.align || "left",
    valign: opts.valign || "top",
    fit: opts.fit || "shrink",
  });
}

function bulletList(slide, items, x, y, w, h, opts = {}) {
  const runs = [];
  items.forEach((item, i) => {
    runs.push({ text: item, options: { bullet: true, breakLine: i !== items.length - 1 } });
  });
  slide.addText(runs, {
    x, y, w, h,
    fontFace: "Microsoft YaHei UI",
    fontSize: opts.fontSize || 9.8,
    color: opts.color || C.text,
    margin: 0,
    paraSpaceAfterPt: opts.paraSpaceAfterPt || 5,
    fit: "shrink",
  });
}

function cell(slide, x, y, w, h, title, body, fill = C.panel) {
  panel(slide, x, y, w, h, fill, C.line);
  text(slide, title, x + 0.12, y + 0.12, w - 0.24, 0.14, {
    fontSize: 10.1, bold: true,
  });
  text(slide, body, x + 0.12, y + 0.34, w - 0.24, h - 0.42, {
    fontSize: 9.2, color: C.sub,
  });
}

function metric(slide, value, desc, x, y, w = 1.5, fill = C.panel) {
  panel(slide, x, y, w, 1.0, fill, C.line);
  text(slide, value, x + 0.12, y + 0.12, w - 0.24, 0.28, {
    fontFace: "Georgia", fontSize: 24, bold: true, color: C.blue,
  });
  text(slide, desc, x + 0.12, y + 0.5, w - 0.24, 0.34, {
    fontSize: 9.2, color: C.sub,
  });
}

function source(slide, content, dark = false) {
  slide.addText(content, {
    x: 0.72, y: 5.02, w: 8.24, h: 0.14,
    fontFace: "Microsoft YaHei UI",
    fontSize: 7.2,
    color: dark ? "C7D0EA" : "8893A9",
    margin: 0,
    fit: "shrink",
  });
}

function imageCard(slide, title, sub, img, x, y, w, h) {
  panel(slide, x, y, w, h, C.panel, C.line);
  slide.addImage({
    path: img, x: x + 0.1, y: y + 0.1, w: w - 0.2, h: h - 0.54,
    sizing: { type: "contain", w: w - 0.2, h: h - 0.54 },
  });
  text(slide, title, x + 0.12, y + h - 0.38, w - 0.24, 0.12, {
    fontSize: 9.5, bold: true,
  });
  text(slide, sub, x + 0.12, y + h - 0.22, w - 0.24, 0.1, {
    fontSize: 8.1, color: C.sub,
  });
}

let s = 1;

// 1 cover
{
  const slide = slideBase(s++, true);
  slide.addImage({ path: assets.cover, x: 0, y: 0, w: W, h: H });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 6.4, h: H,
    line: { color: C.ink, transparency: 100 },
    fill: { color: C.ink, transparency: 10 },
  });
  addKicker(slide, "AI Literacy Course", true);
  addTitle(slide, "AI 不是更强的搜索，\n而是新的任务接口", "面向泛职场用户的 AI 入门课程", {
    dark: true, w: 5.5, h: 1.02
  });
  text(slide, "AI 正在从单点问答工具演变为通用任务接口。这门课重点讨论 4 个问题：它是什么、为什么会出错、现在能做什么、普通人如何真正上手。", 0.72, 2.42, 5.0, 0.52, {
    fontSize: 11.2, color: "E3E8F8"
  });
  metric(slide, "26", "页课程内容", 0.72, 4.14, 1.35, C.panel);
  metric(slide, "4", "个主问题", 2.18, 4.14, 1.3, C.panel);
  metric(slide, "10+", "个真实来源", 3.6, 4.14, 1.5, C.softBlue);
}

// 2 map
{
  const slide = slideBase(s++);
  addKicker(slide, "01 / Course Map");
  addTitle(slide, "今天只讲 4 个问题", "先把框架建立起来，再进入产品、案例与方法");
  cell(slide, 0.72, 1.94, 4.0, 1.08, "1. AI 到底是什么", "不是更强的搜索，而是能接收任务、生成草稿、比较方案、调用工具的通用接口。", C.panel);
  cell(slide, 5.0, 1.94, 4.0, 1.08, "2. 它为什么有时很强，有时很离谱", "要理解训练、上下文、工具、幻觉、过时信息这几个关键概念。", C.softBlue);
  cell(slide, 0.72, 3.18, 4.0, 1.08, "3. 现在值得认识哪些产品和场景", "既看全球常见产品，也看中国用户高频入口和视频模型、研究工具、办公场景。", C.softViolet);
  cell(slide, 5.0, 3.18, 4.0, 1.08, "4. 普通人如何真正上手", "提示词不是咒语，核心是任务定义、拆步骤、核事实、做迭代。", C.softPink);
  text(slide, "从这 4 个问题出发，后面的产品、提示词、案例和工作流才不会散。", 0.72, 4.62, 8.0, 0.16, {
    fontSize: 9.4, color: C.sub
  });
}

// 3 task map
{
  const slide = slideBase(s++);
  addKicker(slide, "02 / Task Map");
  addTitle(slide, "AI 正在进入哪些任务", "先看任务类型，比先背产品名更有效");
  const cols = [
    ["写作", "通知、邮件、汇报摘要、FAQ、提案骨架、润色改写"],
    ["研究", "资料阅读、摘要提炼、对比分析、问题澄清、术语解释"],
    ["分析", "表格解释、指标口径、框架搭建、方案比较、行动项拆分"],
    ["创作", "图像草图、视频提示、脚本大纲、风格探索、文案方向"],
    ["执行", "接搜索、接文档、接代码、接日历、接自动化工作流"],
  ];
  cols.forEach((item, i) => {
    const x = 0.72 + i * 1.86;
    cell(slide, x, 2.0, 1.64, 2.12, item[0], item[1], i % 2 ? C.softBlue : C.panel);
  });
  text(slide, "一个重要变化：过去我们是在软件里点按钮，现在越来越多时候是在对话框里定义任务。", 0.72, 4.44, 8.2, 0.18, {
    fontSize: 10.0, color: C.sub
  });
}

// 4 search vs ai
{
  const slide = slideBase(s++);
  addKicker(slide, "03 / Search vs AI");
  addTitle(slide, "搜索引擎 vs AI：它们解决的是两类问题");
  slide.addImage({ path: assets.searchVsAi, x: 0.62, y: 1.52, w: 8.75, h: 3.86 });
  source(slide, "图示：搜索更适合找信息，AI 更适合完成任务。");
}

// 5 llm basics
{
  const slide = slideBase(s++);
  addKicker(slide, "04 / LLM Basics");
  addTitle(slide, "大模型怎么工作：4 个够用概念", "训练、预测、上下文、工具");
  slide.addImage({ path: assets.llmConcepts, x: 0.62, y: 1.52, w: 8.75, h: 3.86 });
  source(slide, "图示：训练、预测、上下文、工具，是理解大模型最常用的四个概念。");
}

// 6 errors
{
  const slide = slideBase(s++);
  addKicker(slide, "05 / Limits");
  addTitle(slide, "为什么 AI 会出错", "出错不是偶发现象，而是这类系统天然会带来的使用成本");
  cell(slide, 0.72, 1.94, 2.0, 1.16, "幻觉", "看起来很完整，但事实、引用、日期或来源是错的。", C.panel);
  cell(slide, 2.94, 1.94, 2.0, 1.16, "过时", "没有联网或检索时，它可能停留在旧时间点。", C.softBlue);
  cell(slide, 5.16, 1.94, 2.0, 1.16, "缺上下文", "任务说得太泛，它只能给出中庸而空泛的答案。", C.softViolet);
  cell(slide, 7.38, 1.94, 1.58, 1.16, "缺工具", "没接搜索、文件、计算环境时，它只是会说，不一定会查和算。", C.softPink);
  panel(slide, 0.72, 3.42, 5.14, 1.28, C.panel, C.line);
  text(slide, "高风险内容为什么必须保留人", 0.92, 3.6, 1.8, 0.14, { fontSize: 10.2, bold: true });
  bulletList(slide, [
    "关键数字、时间、法律、医疗、财务信息必须回到原始来源核验",
    "高风险结论和外发内容必须保留人工复核",
    "不要把“流畅表达”误当成“真实可靠”"
  ], 0.92, 3.86, 4.5, 0.62);
  panel(slide, 6.08, 3.42, 2.88, 1.28, C.softGray, C.line);
  text(slide, "核心判断", 6.26, 3.6, 1.0, 0.14, { fontSize: 10.2, bold: true });
  text(slide, "AI 的常见问题不是“不会说”，而是“说得像对，但不一定真对”。", 6.26, 3.88, 2.4, 0.48, {
    fontSize: 9.8, color: C.sub
  });
}

// 7 hallucination
{
  const slide = slideBase(s++);
  addKicker(slide, "06 / Hallucination");
  addTitle(slide, "幻觉是什么：高可信外观下的错误", "危险之处在于它经常“错得很像真的”");
  cell(slide, 0.72, 1.94, 2.26, 0.88, "表现 1", "编造论文、网页、年份、功能或来源。", C.panel);
  cell(slide, 0.72, 2.96, 2.26, 0.88, "表现 2", "混淆版本、时间线、定价、产品能力。", C.softBlue);
  cell(slide, 0.72, 3.98, 2.26, 0.82, "识别顺序", "先看来源，再看日期，再查原文。", C.softViolet);
  panel(slide, 3.22, 1.94, 2.34, 2.86, C.panel, C.line);
  text(slide, "教学示例", 3.42, 2.12, 1.0, 0.14, { fontSize: 10.2, bold: true });
  text(slide, "问题：Seedance 2.0 的论文在哪里？", 3.42, 2.44, 1.9, 0.14, { fontSize: 9.8 });
  text(slide, "风险：模型可能给出一个结构完整、作者齐全、年份明确、但现实中并不存在的引用。", 3.42, 2.76, 1.9, 0.6, {
    fontSize: 9.2, color: C.sub
  });
  text(slide, "处理方式：回到官网、官方博客、论文库、开发者文档核对。", 3.42, 3.84, 1.9, 0.34, {
    fontSize: 9.2, color: C.sub
  });
  imageCard(slide, "OpenAI system card 中的 hallucination 说明", "来源：GPT-5 system card, p.12", assets.systemHallucination, 5.84, 1.94, 3.12, 2.86);
  source(slide, "来源：OpenAI GPT-5 system card。示例展示的是幻觉常见形态：结构完整，但来源并不存在。");
}

// 8 data
{
  const slide = slideBase(s++);
  addKicker(slide, "07 / Public Data");
  addTitle(slide, "几组公开数据：AI 已经进入真实工作流", "用报告和截图替代“AI 很重要”这种泛化判断");
  metric(slide, "700M+", "ChatGPT weekly active users", 0.72, 1.9, 1.56, C.panel);
  metric(slide, "28%", "employed adults using ChatGPT at work", 2.46, 1.9, 1.78, C.softBlue);
  metric(slide, "43%", "U.S. knowledge workers using AI", 4.42, 1.9, 1.72, C.softViolet);
  metric(slide, "4", "dominant early-use categories", 6.32, 1.9, 1.58, C.softPink);
  text(slide, "OpenAI 报告里早期最集中的使用类别包括：写作、研究、编程、分析。它们的共同点是都需要先处理信息，再形成表达。", 0.72, 3.08, 8.14, 0.28, {
    fontSize: 9.8, color: C.sub
  });
  imageCard(slide, "OpenAI 报告 p.6", "weekly active users", assets.report6, 0.72, 3.48, 4.02, 1.48);
  imageCard(slide, "OpenAI 报告 p.7", "workplace adoption", assets.report7, 4.96, 3.48, 4.0, 1.48);
  source(slide, "来源：OpenAI《ChatGPT usage and adoption patterns at work》；报告还引用了 Stanford、Pew、St. Louis Fed、Harvard 等研究。");
}

// 9 product map
{
  const slide = slideBase(s++);
  addKicker(slide, "08 / Product Map");
  addTitle(slide, "产品地图：不要只记名字，要知道它们分别解决什么任务", "同一个模型会以聊天助手、搜索入口、创作工具、办公工具、视频模型、Agent 平台等多种形态出现");
  panel(slide, 0.72, 1.9, 8.22, 3.06, C.panel, C.line);
  text(slide, "类别", 0.92, 2.06, 0.7, 0.14, { fontSize: 10.1, bold: true, color: C.sub });
  text(slide, "全球常见产品", 2.02, 2.06, 2.0, 0.14, { fontSize: 10.1, bold: true, color: C.sub });
  text(slide, "国内常见产品", 4.72, 2.06, 2.0, 0.14, { fontSize: 10.1, bold: true, color: C.sub });
  text(slide, "最典型任务", 7.12, 2.06, 1.2, 0.14, { fontSize: 10.1, bold: true, color: C.sub });
  const rows = [
    ["综合助手", "ChatGPT / Claude / Gemini", "豆包 / Kimi / 元宝 / 文心", "问答、写作、总结、日常任务"],
    ["搜索研究", "Perplexity / Gemini / ChatGPT Search", "秘塔 / 文心 / 通义", "搜资料、找来源、做比较"],
    ["办公文档", "Notion AI / Microsoft Copilot", "通义 / 讯飞星火 / WPS AI", "纪要、PPT、表格、文档"],
    ["图像视频", "Midjourney / Runway / Veo", "即梦 / 海螺 / Seedance 2.0", "图像、视频、镜头提示"],
    ["编程开发", "Cursor / Claude Code / Copilot", "通义灵码 / CodeGeeX / 豆包编程", "生成代码、解释代码、改 bug"],
    ["Agent 自动化", "OpenAI Agents / Zapier AI / Make", "扣子 / Dify / 腾讯元器", "串联工具、拆任务、自动执行"],
  ];
  rows.forEach((row, i) => {
    const y = 2.36 + i * 0.42;
    panel(slide, 0.84, y - 0.04, 7.98, 0.34, i % 2 ? C.softGray : C.panel, i % 2 ? C.softGray : C.panel);
    text(slide, row[0], 0.92, y, 0.9, 0.16, { fontSize: 9.2, bold: true });
    text(slide, row[1], 2.02, y, 2.3, 0.18, { fontSize: 8.9 });
    text(slide, row[2], 4.72, y, 2.1, 0.18, { fontSize: 8.9 });
    text(slide, row[3], 7.12, y, 1.5, 0.18, { fontSize: 8.8, color: C.sub });
  });
}

// 10 global products
{
  const slide = slideBase(s++);
  addKicker(slide, "09 / Global Products");
  addTitle(slide, "海外主流产品：先看真实页面，再谈定位", "ChatGPT、Claude、Gemini、DeepSeek 是最常见的四个代表入口");
  imageCard(slide, "ChatGPT", "openai.com/chatgpt/overview", assets.chatgpt, 0.72, 1.92, 4.0, 1.5);
  imageCard(slide, "Claude", "anthropic.com/claude", assets.claude, 4.98, 1.92, 3.98, 1.5);
  imageCard(slide, "Gemini", "gemini.google.com/overview", assets.gemini, 0.72, 3.66, 4.0, 1.5);
  imageCard(slide, "DeepSeek", "deepseek.com/en", assets.deepseek, 4.98, 3.66, 3.98, 1.5);
  source(slide, "截图来源：OpenAI、Anthropic、Google、DeepSeek 官方公开页面。");
}

// 11 china products
{
  const slide = slideBase(s++);
  addKicker(slide, "10 / China Products");
  addTitle(slide, "国内主流产品：用户真正常见的入口长什么样", "对大多数听众来说，先认识入口比先背模型名称更有帮助");
  imageCard(slide, "豆包", "doubao.com", assets.doubao, 0.72, 1.92, 4.0, 1.5);
  imageCard(slide, "Kimi", "kimi.moonshot.cn", assets.kimi, 4.98, 1.92, 3.98, 1.5);
  imageCard(slide, "元宝", "yuanbao.tencent.com", assets.yuanbao, 0.72, 3.66, 4.0, 1.5);
  imageCard(slide, "讯飞星火", "xinghuo.xfyun.cn", assets.spark, 4.98, 3.66, 3.98, 1.5);
  source(slide, "截图来源：豆包、Kimi、元宝、讯飞星火官方公开页面；通义、文心、DeepSeek、Seedance 2.0 也经常出现在同类对比中。");
}

// 12 tool choice
{
  const slide = slideBase(s++);
  addKicker(slide, "11 / Tool Choice");
  addTitle(slide, "先看任务，再看工具：一个更稳的选型方法", "问“哪个最强”通常没有意义，问“我的任务属于哪一类”更有用");
  panel(slide, 0.72, 1.92, 8.18, 3.02, C.panel, C.line);
  text(slide, "任务类型", 0.92, 2.08, 1.0, 0.14, { fontSize: 10.1, bold: true, color: C.sub });
  text(slide, "适合优先尝试的工具", 2.34, 2.08, 2.4, 0.14, { fontSize: 10.1, bold: true, color: C.sub });
  text(slide, "理由", 5.46, 2.08, 2.2, 0.14, { fontSize: 10.1, bold: true, color: C.sub });
  const rows = [
    ["写作/改写", "ChatGPT、Claude、豆包、Kimi", "通知、邮件、文案、FAQ、脚本初稿"],
    ["资料阅读", "Kimi、Claude、Gemini、Perplexity", "长文总结、对比、多来源归纳"],
    ["PPT/文档", "ChatGPT、Claude、通义、讯飞星火", "大纲、结构、提炼、页面文案"],
    ["图像/视频", "Midjourney、Runway、即梦、Seedance 2.0", "风格探索、镜头提示、脚本可视化"],
    ["编程/自动化", "Cursor、Claude Code、扣子、Dify", "生成代码、联动工具、自动执行"],
  ];
  rows.forEach((row, i) => {
    const y = 2.42 + i * 0.5;
    panel(slide, 0.84, y - 0.04, 7.98, 0.4, i % 2 ? C.softGray : C.panel, i % 2 ? C.softGray : C.panel);
    text(slide, row[0], 0.92, y, 1.1, 0.18, { fontSize: 9.3, bold: true });
    text(slide, row[1], 2.34, y, 2.72, 0.18, { fontSize: 9.1 });
    text(slide, row[2], 5.46, y, 2.7, 0.18, { fontSize: 9.1, color: C.sub });
  });
}

// 13 prompting
{
  const slide = slideBase(s++);
  addKicker(slide, "12 / Prompting");
  addTitle(slide, "提示词不是“咒语”，而是任务定义", "高质量输出靠的不是写得多花，而是把任务说完整");
  const boxes = [
    ["背景", "这件事发生在什么场景里"],
    ["目标", "要解决什么问题，给谁看"],
    ["任务", "希望它具体做什么"],
    ["标准", "什么结果才算好"],
    ["约束", "篇幅、禁区、风格、格式"],
    ["输出格式", "列表、表格、邮件、PPT、JSON"],
  ];
  boxes.forEach((box, i) => {
    const x = 0.72 + (i % 3) * 2.82;
    const y = 1.94 + Math.floor(i / 3) * 1.16;
    cell(slide, x, y, 2.58, 0.92, box[0], box[1], i % 2 ? C.softBlue : C.panel);
  });
  panel(slide, 0.72, 4.44, 8.18, 0.56, C.softGray, C.line);
  text(slide, "提示词的本质，是把一个模糊需求翻译成一个可执行任务。", 0.92, 4.62, 7.8, 0.14, {
    fontSize: 10.0, color: C.text
  });
}

// 14 official guidance
{
  const slide = slideBase(s++);
  addKicker(slide, "13 / Official Guidance");
  addTitle(slide, "官方建议：Prompt engineering 的共同原则", "不同厂商表述不同，但原则高度相似");
  panel(slide, 0.72, 1.92, 4.24, 3.02, C.panel, C.line);
  text(slide, "共同原则", 0.92, 2.08, 1.0, 0.14, { fontSize: 10.1, bold: true });
  bulletList(slide, [
    "把任务目标说清楚，不要只丢一个关键词",
    "提供上下文、受众、示例和评价标准",
    "复杂任务先分步，再组合，不要一口气压给模型",
    "给出期望的输出格式，减少自由发挥",
    "把提示词当成可迭代对象，而不是一次性输入",
    "对关键信息做核验，不把流畅当成真实"
  ], 0.92, 2.34, 3.6, 1.92);
  imageCard(slide, "Anthropic Prompt engineering overview", "来源：Claude API Docs", assets.anthropicPrompting, 5.18, 1.92, 3.78, 3.02);
  source(slide, "来源：Anthropic Claude API Docs 的 Prompt engineering overview。");
}

// 15 prompt chain
{
  const slide = slideBase(s++);
  addKicker(slide, "14 / Prompt Chain");
  addTitle(slide, "Prompt 链：复杂任务别一次做完，拆成多步更稳", "尤其适合研究、审阅、长文处理、分析、视频脚本等任务");
  panel(slide, 0.72, 1.92, 3.78, 3.02, C.panel, C.line);
  text(slide, "一个常见的 3 步拆法", 0.92, 2.08, 1.8, 0.14, { fontSize: 10.1, bold: true });
  cell(slide, 0.92, 2.36, 3.38, 0.58, "Step 1 / 抽取", "先把原始材料里的事实、术语、时间线、角色关系抽出来。", C.softBlue);
  cell(slide, 0.92, 3.08, 3.38, 0.58, "Step 2 / 组织", "把抽出的信息变成结构、表格、对比、优先级或提纲。", C.softViolet);
  cell(slide, 0.92, 3.8, 3.38, 0.58, "Step 3 / 生成", "在前两步基础上再写邮件、PPT、大纲、报告或脚本。", C.softPink);
  imageCard(slide, "AI-BOT：Prompt 链教程", "来源：ai-bot.cn/prompt-chain", assets.aiBotChain, 4.76, 1.92, 4.2, 3.02);
  source(slide, "来源：AI-BOT《如何用 Prompt 链提升准确性与覆盖率？》。");
}

// 16 before after
{
  const slide = slideBase(s++);
  addKicker(slide, "15 / Before vs After");
  addTitle(slide, "同一任务，低质量提示词和高质量提示词的差距", "真正拉开结果差距的通常不是模型名字，而是任务定义质量");
  cell(slide, 0.72, 1.94, 3.82, 1.56, "普通问法", "帮我写一份活动通知。", C.panel);
  cell(slide, 0.72, 3.72, 3.82, 1.08, "常见问题", "对象是谁、活动目标是什么、语气怎么把握、字数控制多少、要不要行动指令，这些都没有说。", C.softPink);
  cell(slide, 4.86, 1.94, 4.1, 2.86, "高质量问法", "请为公司内部 AI 入门分享写一条群通知。对象是非技术同事；目标是降低距离感并促使报名；语气友好、具体、不过度营销；控制在 120 字内；最后补一行时间地点。", C.softBlue);
  text(slide, "高质量提示词并不一定更长，但一定更完整：有对象、有目标、有风格、有格式。", 0.72, 4.96, 8.0, 0.14, {
    fontSize: 9.8, color: C.sub
  });
}

// 17 case writing
{
  const slide = slideBase(s++);
  addKicker(slide, "16 / Case 1");
  addTitle(slide, "案例 1：会议纪要 / 汇报整理", "这类任务非常适合从“先出可修改初稿”开始");
  panel(slide, 0.72, 1.92, 3.18, 3.02, C.panel, C.line);
  text(slide, "任务输入", 0.92, 2.08, 1.0, 0.14, { fontSize: 10.1, bold: true });
  bulletList(slide, [
    "会议记录、聊天截图、散乱要点",
    "希望整理成：结论、争议点、待办、责任人",
    "最后产出要适合发群或进 PPT"
  ], 0.92, 2.34, 2.6, 0.76);
  text(slide, "提示词样本", 0.92, 3.32, 1.0, 0.14, { fontSize: 10.1, bold: true });
  text(slide, "请把下面的会议记录整理成 4 部分：已达成结论、待确认问题、行动项、责任人。不要补充我没有说过的事实；用简洁中文输出；最后生成一版适合发工作群的 120 字摘要。", 0.92, 3.58, 2.62, 0.92, {
    fontSize: 9.1, color: C.sub
  });
  panel(slide, 4.18, 1.92, 4.78, 3.02, C.softBlue, C.line);
  text(slide, "输出检查点", 4.38, 2.08, 1.2, 0.14, { fontSize: 10.1, bold: true });
  bulletList(slide, [
    "有没有把“事实”与“推测”混在一起",
    "待办和责任人是否一一对应",
    "摘要有没有写进没有说过的话",
    "是否适合作为后续追踪文档的第一页"
  ], 4.38, 2.34, 4.1, 0.8);
  text(slide, "这类任务的关键不是模型多聪明，而是你是否要求它“别补事实、只做整理、输出结构化结果”。", 4.38, 3.8, 4.1, 0.34, {
    fontSize: 9.4, color: C.sub
  });
}

// 18 case research
{
  const slide = slideBase(s++);
  addKicker(slide, "17 / Case 2");
  addTitle(slide, "案例 2：研究资料阅读与对比", "研究类任务里，AI 的价值不在替你下结论，而在替你先做结构化理解");
  panel(slide, 0.72, 1.92, 2.92, 3.02, C.panel, C.line);
  text(slide, "适合的任务", 0.92, 2.08, 1.0, 0.14, { fontSize: 10.1, bold: true });
  bulletList(slide, [
    "读报告、读产品说明、读竞品资料",
    "抽取差异、风险、优势和适用场景",
    "把阅读结果改写成自己的汇报语言"
  ], 0.92, 2.34, 2.36, 0.78);
  text(slide, "提示词样本", 0.92, 3.34, 1.0, 0.14, { fontSize: 10.1, bold: true });
  text(slide, "请阅读下面 3 段产品说明，分别提取：定位、核心能力、使用门槛、适合人群、潜在风险。最后输出成一张比较表。", 0.92, 3.6, 2.36, 0.78, {
    fontSize: 9.1, color: C.sub
  });
  panel(slide, 3.9, 1.92, 5.06, 3.02, C.softViolet, C.line);
  text(slide, "核验动作", 4.12, 2.08, 1.0, 0.14, { fontSize: 10.1, bold: true });
  const checks = [
    "把时间、价格、版本、来源拉出来逐项检查",
    "把“模型说的”与“原文真的写了”的区分开",
    "比较表完成后再追问：谁更适合哪个场景，为什么",
    "最后让它重写成适合你老板/同事读的语言"
  ];
  checks.forEach((item, i) => {
    text(slide, `${i + 1}. ${item}`, 4.12, 2.38 + i * 0.48, 4.3, 0.2, {
      fontSize: 9.4, color: i === 3 ? C.text : C.sub, bold: i === 3
    });
  });
}

// 19 case visual
{
  const slide = slideBase(s++);
  addKicker(slide, "18 / Case 3");
  addTitle(slide, "案例 3：图像 / 视频生成提示", "图像和视频任务特别适合拿来解释“输入越完整，输出越可控”");
  panel(slide, 0.72, 1.92, 2.78, 3.02, C.panel, C.line);
  text(slide, "一个常见结构", 0.92, 2.08, 1.2, 0.14, { fontSize: 10.1, bold: true });
  bulletList(slide, [
    "主体：谁、什么物体、什么动作",
    "镜头：近景/中景/远景、俯拍/跟拍",
    "风格：纪实、广告、电影、3D、插画",
    "环境：时间、天气、地点、光线",
    "运动：推拉摇移、速度、节奏",
    "约束：时长、比例、不要出现什么"
  ], 0.92, 2.34, 2.2, 1.54);
  panel(slide, 3.78, 1.92, 5.18, 3.02, C.softBlue, C.line);
  text(slide, "视频提示词样本", 3.98, 2.08, 1.3, 0.14, { fontSize: 10.1, bold: true });
  text(slide, "生成一段 10 秒短视频：主题是“普通人第一次用 AI 做旅行计划”。镜头从桌面地图和手机界面开始，中景切到人物与对话框，整体风格真实、清爽、明亮；镜头有轻微推近；节奏从困惑到明确；不要出现赛博风格和悬浮代码；16:9。", 3.98, 2.34, 4.6, 1.28, {
    fontSize: 9.3, color: C.text
  });
  text(slide, "视频模型比文本任务更依赖主体、镜头、风格和约束。", 3.98, 3.94, 4.6, 0.34, {
    fontSize: 9.2, color: C.sub
  });
}

// 20 workflow
{
  const slide = slideBase(s++);
  addKicker(slide, "19 / Workflow");
  addTitle(slide, "一个稳定的 AI 工作流，通常分 5 步", "很多人觉得 AI 一般，不是模型不行，而是流程停在了第一步");
  slide.addImage({ path: assets.workflow, x: 0.62, y: 1.82, w: 8.75, h: 3.46 });
  source(slide, "图示：从任务定义到核验落地的五步流程。");
}

// 21 work scenarios
{
  const slide = slideBase(s++);
  addKicker(slide, "20 / Work Scenarios");
  addTitle(slide, "工作场景：最容易立刻见效的 5 类任务", "写作、研究、分析、编程、PPT 是最常见的起步入口");
  panel(slide, 0.72, 1.92, 8.18, 3.02, C.panel, C.line);
  text(slide, "任务", 0.92, 2.08, 0.8, 0.14, { fontSize: 10.1, bold: true, color: C.sub });
  text(slide, "AI 能先做什么", 2.1, 2.08, 2.5, 0.14, { fontSize: 10.1, bold: true, color: C.sub });
  text(slide, "人的价值还在哪里", 5.72, 2.08, 2.2, 0.14, { fontSize: 10.1, bold: true, color: C.sub });
  const rows = [
    ["写作", "起草通知、邮件、汇报摘要、FAQ", "把空白页变成可修改的第一页"],
    ["研究", "读报告、做比较、提差异、拆风险", "决定结论、补充背景、核事实"],
    ["分析", "做对比表、整理指标、归纳结论", "判断优先级和业务含义"],
    ["编程", "解释代码、改 bug、写脚本、读报错", "定义边界、验证运行结果"],
    ["PPT", "列大纲、写页面文案、组织结构", "做判断、筛选和审美决策"],
  ];
  rows.forEach((row, i) => {
    const y = 2.42 + i * 0.5;
    panel(slide, 0.84, y - 0.04, 7.98, 0.4, i % 2 ? C.softGray : C.panel, i % 2 ? C.softGray : C.panel);
    text(slide, row[0], 0.92, y, 0.9, 0.18, { fontSize: 9.2, bold: true });
    text(slide, row[1], 2.1, y, 2.9, 0.18, { fontSize: 9.0 });
    text(slide, row[2], 5.72, y, 2.3, 0.18, { fontSize: 9.0, color: C.sub });
  });
}

// 22 life scenarios
{
  const slide = slideBase(s++);
  addKicker(slide, "21 / Life Scenarios");
  addTitle(slide, "生活场景：AI 的价值不只在办公桌上", "把它看成认知助手，而不只是生产力工具");
  cell(slide, 0.72, 1.94, 1.92, 1.28, "旅行", "路线、预算、节奏、候选方案对比、行李清单、注意事项。", C.panel);
  cell(slide, 2.86, 1.94, 1.92, 1.28, "学习", "概念解释、学习计划、陪练问答、材料改写、知识复盘。", C.softBlue);
  cell(slide, 5.0, 1.94, 1.92, 1.28, "健身", "饮食建议、训练拆解、记录总结、行为提醒。", C.softViolet);
  cell(slide, 7.14, 1.94, 1.82, 1.28, "亲子", "故事改写、知识解释、阅读陪伴、题目讲解思路。", C.softPink);
  cell(slide, 0.72, 3.5, 2.92, 1.16, "兴趣探索", "选题拓展、拍摄脚本、风格模仿、练习计划、创意发散。", C.panel);
  cell(slide, 3.9, 3.5, 5.06, 1.16, "最值得讲的点", "AI 进入生活场景时，最有价值的不是“自动替你活”，而是让你更快得到解释、候选方案和行动起点。", C.softGray);
}

// 23 agent automation
{
  const slide = slideBase(s++);
  addKicker(slide, "22 / Agents");
  addTitle(slide, "下一阶段：从聊天助手走向 Agent 和自动化", "理解这个趋势，能帮助听众建立“AI 为什么越来越像系统层能力”的感觉");
  cell(slide, 0.72, 1.94, 2.4, 1.2, "聊天助手", "你提一个问题，它回答一次。", C.panel);
  cell(slide, 3.3, 1.94, 2.4, 1.2, "带工具的助手", "它可以搜网页、读文档、查日历、写代码。", C.softBlue);
  cell(slide, 5.88, 1.94, 3.08, 1.2, "Agent / 自动化", "它能理解目标、拆分步骤、调用多个工具，并把中间结果串起来。", C.softViolet);
  panel(slide, 0.72, 3.48, 8.24, 1.22, C.panel, C.line);
  text(slide, "典型例子", 0.92, 3.66, 1.0, 0.14, { fontSize: 10.1, bold: true });
  bulletList(slide, [
    "收集竞品页面并生成对比表",
    "读会议记录并同步生成待办清单",
    "根据素材自动生成周报草稿",
    "联动表格、文档、邮件和日历做流程化处理"
  ], 2.02, 3.62, 6.4, 0.6);
}

// 24 boundaries
{
  const slide = slideBase(s++);
  addKicker(slide, "23 / Boundaries");
  addTitle(slide, "使用边界：准确性、隐私、版权、合规都要保留意识", "真正决定 AI 能不能进入工作流的，是边界意识");
  panel(slide, 0.72, 1.92, 8.18, 3.02, C.panel, C.line);
  const rows = [
    ["准确性", "时间、数字、政策、引用、价格、版本必须核验"],
    ["隐私", "敏感信息、公司数据、客户资料不要直接丢给外部服务"],
    ["版权", "图像、文字、音视频内容要看生成、训练、商用边界"],
    ["合规", "法律、医疗、财务等高风险内容必须保留人工判断"],
    ["依赖", "不要把“会说”误认为“会做”或“是真的”"],
  ];
  rows.forEach((row, i) => {
    const y = 2.18 + i * 0.52;
    panel(slide, 0.86, y - 0.04, 8.0, 0.4, i % 2 ? C.softGray : C.panel, i % 2 ? C.softGray : C.panel);
    text(slide, row[0], 1.02, y, 0.9, 0.16, { fontSize: 9.4, bold: true });
    text(slide, row[1], 2.12, y, 5.9, 0.18, { fontSize: 9.3, color: C.sub });
  });
}

// 25 start + resources
{
  const slide = slideBase(s++);
  addKicker(slide, "24 / Start");
  addTitle(slide, "7 天上手路径 + 延伸阅读入口", "从真实任务开始，再沿着这些来源继续往下学");
  panel(slide, 0.72, 1.92, 3.18, 3.02, C.panel, C.line);
  text(slide, "7 天行动建议", 0.92, 2.08, 1.2, 0.14, { fontSize: 10.1, bold: true });
  const days = [
    "D1：选一个每周都在重复的任务",
    "D2：把任务重写成“背景 + 目标 + 任务 + 约束”",
    "D3：让 AI 先出第一版，再追问两轮",
    "D4：把结果改成你自己的口径",
    "D5：核对事实与来源",
    "D6：换一个产品再做同任务比较",
    "D7：总结什么环节最值、什么环节不该交给 AI"
  ];
  days.forEach((d, i) => {
    text(slide, d, 0.92, 2.34 + i * 0.34, 2.6, 0.14, {
      fontSize: 8.95, color: i === 0 ? C.text : C.sub, bold: i === 0
    });
  });
  imageCard(slide, "Anthropic Prompting", "官方提示词文档", assets.anthropicPrompting, 4.18, 1.92, 2.05, 1.52);
  imageCard(slide, "AI-BOT 优化 Prompt", "中文教程入口", assets.aiBotPrompt, 6.45, 1.92, 2.05, 1.52);
  panel(slide, 4.18, 3.72, 2.05, 1.2, C.softGray, C.line);
  text(slide, "继续补课", 4.38, 3.9, 1.0, 0.14, { fontSize: 10.1, bold: true });
  text(slide, "提效：提示词 + 工作流\n选型：产品分层 + 任务匹配\n进阶：Agent、多模态、上下文工程", 4.38, 4.18, 1.55, 0.46, {
    fontSize: 8.35, color: C.sub
  });
  panel(slide, 6.45, 3.72, 2.05, 1.2, C.softGray, C.line);
  text(slide, "更多入口", 6.65, 3.9, 1.0, 0.14, { fontSize: 10.1, bold: true });
  text(slide, "AI-BOT Prompt 链教程\nAI-BOT 百科\n适合：复杂任务拆解、术语导航", 6.65, 4.14, 1.5, 0.46, {
    fontSize: 8.8, color: C.sub
  });
  source(slide, "来源：Anthropic 官方文档；AI-BOT 的 Prompt 教程、Prompt 链教程、AI 百科入口。");
}

// 26 closing
{
  const slide = slideBase(s++, true);
  slide.addImage({ path: assets.closing, x: 0, y: 0, w: W, h: H });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 6.3, h: H,
    line: { color: C.ink, transparency: 100 },
    fill: { color: C.ink, transparency: 15 },
  });
  addKicker(slide, "Closing", true);
  addTitle(slide, "先把 AI 看成新的任务接口，\n再决定它该进入你的哪些场景", "真正的变化不在于你会不会一个工具，而在于你是否学会了新的协作方式", {
    dark: true, w: 5.45, h: 1.02
  });
  text(slide, "这门课的核心不是“人人都要变成技术专家”，而是先建立一套稳定的理解框架：任务、产品、提示词、风险、工作流。", 0.72, 2.54, 4.95, 0.52, {
    fontSize: 11.0, color: "E3E8F8"
  });
}

pptx.writeFile({ fileName: "materials/ai-cognition-course-v2.pptx" });
