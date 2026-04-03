import { startTransition, useEffect, useState } from "react";

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getSlideIndexFromHash(total) {
  if (typeof window === "undefined") return 0;
  const match = window.location.hash.match(/\d+/);
  if (!match) return 0;
  const value = Number(match[0]) - 1;
  return Number.isNaN(value) ? 0 : clamp(value, 0, total - 1);
}

function OrbitalBackdrop() {
  return (
    <>
      <div className="deck-noise" />
      <div className="deck-grid" />
      <div className="deck-vignette" />
      <div className="deck-orb deck-orb--violet" />
      <div className="deck-orb deck-orb--pink" />
      <div className="deck-orb deck-orb--cyan" />
    </>
  );
}

function SearchIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="7.6"></circle>
      <path d="M20 20L16.8 16.8"></path>
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2.5L14.1 9.9L21.5 12L14.1 14.1L12 21.5L9.9 14.1L2.5 12L9.9 9.9L12 2.5Z"></path>
    </svg>
  );
}

function PromptIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 7.5H20"></path>
      <path d="M4 12H14"></path>
      <path d="M4 16.5H10"></path>
      <path d="M17.2 15.3L19.6 17.7L15.8 21.5H13.4V19.1L17.2 15.3Z"></path>
    </svg>
  );
}

function SafetyIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3L19 6V11.4C19 16 16 19.8 12 21C8 19.8 5 16 5 11.4V6L12 3Z"></path>
      <path d="M9.3 12.4L11.1 14.3L14.8 10.2"></path>
    </svg>
  );
}

function SlideFrame({ children }) {
  return (
    <section className="relative h-full overflow-hidden px-[clamp(2rem,4vw,5.5rem)] py-[clamp(1.8rem,4vh,4rem)]">
      {children}
    </section>
  );
}

function SlideCover() {
  return (
    <SlideFrame>
      <div className="relative flex h-full items-center justify-between gap-10">
        <div className="relative z-10 flex max-w-[58%] flex-col">
          <div className="deck-kicker">AI认知启发分享</div>
          <h1 className="deck-display mt-7 text-[clamp(3.8rem,7.1vw,8rem)] leading-[0.88]">
            AI 不是更强的搜索
            <br />
            <span className="deck-gradient-text">而是新的任务接口</span>
          </h1>
          <p className="mt-8 max-w-[38rem] text-[clamp(1.05rem,1.5vw,1.4rem)] leading-relaxed text-white/70">
            这场分享面向非技术背景的职场人。我们不先背模型名和产品表，而是先把一件更重要的事讲清楚:
            AI 正在把很多工作，从“我去找答案”改写成“我来定义任务，系统协助完成”。
          </p>

          <div className="mt-12 grid grid-cols-3 gap-8 text-sm">
            {[
              ["一个前提", "今天不要求大家先精通 AI，只要求先建立不落后的理解。"],
              ["一个结构", "从范式变化、工作原理、上手方法到风险边界，搭起完整认知框架。"],
              ["一个目标", "让听众带走可以明天就开始试的行动路径，而不是一串产品名字。"],
            ].map(([title, body]) => (
              <div key={title} className="border-t border-white/12 pt-4">
                <div className="text-base font-medium text-white">{title}</div>
                <p className="mt-2 leading-6 text-white/60">{body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex h-full flex-1 items-center justify-center">
          <div className="relative h-[34vw] max-h-[32rem] w-[34vw] max-w-[32rem]">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 500 500" fill="none">
              <circle
                cx="250"
                cy="250"
                r="238"
                stroke="url(#cover-ring-a)"
                strokeWidth="1.5"
                strokeDasharray="5 11"
                className="deck-spin-slow origin-center"
              />
              <circle
                cx="250"
                cy="250"
                r="182"
                stroke="url(#cover-ring-b)"
                strokeWidth="1.2"
                className="deck-spin-reverse origin-center"
              />
              <circle cx="250" cy="250" r="124" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
              <circle cx="250" cy="250" r="42" fill="url(#cover-core)" />
              <path d="M250 34V466M34 250H466" stroke="rgba(255,255,255,0.08)" />
              <path d="M126 126L374 374M374 126L126 374" stroke="rgba(255,255,255,0.04)" />
              <defs>
                <linearGradient id="cover-ring-a" x1="40" y1="52" x2="420" y2="418">
                  <stop stopColor="#7C6CFF" />
                  <stop offset="1" stopColor="#EF4F96" />
                </linearGradient>
                <linearGradient id="cover-ring-b" x1="420" y1="64" x2="98" y2="436">
                  <stop stopColor="#41C7FF" />
                  <stop offset="1" stopColor="#7C6CFF" />
                </linearGradient>
                <radialGradient id="cover-core">
                  <stop offset="0%" stopColor="#EADFFF" />
                  <stop offset="68%" stopColor="#7C6CFF" />
                  <stop offset="100%" stopColor="#171827" />
                </radialGradient>
              </defs>
            </svg>

            <div className="absolute left-[8%] top-[12%] text-[0.72rem] uppercase tracking-[0.28em] text-white/40">
              Search
            </div>
            <div className="absolute bottom-[10%] right-[8%] text-[0.72rem] uppercase tracking-[0.28em] text-white/40">
              Interface
            </div>
            <div className="absolute left-1/2 top-1/2 w-[68%] -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-[clamp(2.2rem,4vw,4.8rem)] font-medium tracking-[-0.06em] text-white/90">
                intent
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.36em] text-white/45">from retrieval to synthesis</div>
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

function SlideFourQuestions() {
  return (
    <SlideFrame>
      <div className="relative flex h-full flex-col">
        <div className="deck-kicker">Opening Frame</div>
        <div className="mt-7 grid flex-1 grid-cols-[1.05fr_0.95fr] gap-12">
          <div className="relative flex flex-col justify-between">
            <div>
              <div className="text-[7rem] font-semibold leading-none tracking-[-0.08em] text-white/8">3</div>
              <h2 className="deck-display mt-[-1rem] max-w-[18rem] text-[clamp(3rem,5vw,5.8rem)] leading-[0.92]">
                这次分享
                <br />
                先回答三个问题
              </h2>
              <p className="mt-7 max-w-[34rem] text-[1.15rem] leading-8 text-white/68">
                我们不从参数规模、神话叙事和工具排行榜开始，而是先把这场分享最基本的目标讲清楚:
                让大家知道什么是 AI、AI 能做什么，以及 AI 正在怎样改变我们的生产与生活。
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 text-sm text-white/56">
              <div>
                <div className="text-xs uppercase tracking-[0.28em] text-[#aab6ff]">Scope</div>
                <p className="mt-3 leading-6">不是技术课，而是面向普通工作者的 AI 认知和应用入口。</p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.28em] text-[#aab6ff]">Mode</div>
                <p className="mt-3 leading-6">用图形、节奏和现场演示承载认知，而不是把讲义切成一页一页。</p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.28em] text-[#aab6ff]">Output</div>
                <p className="mt-3 leading-6">让听众带着更低焦虑、更清晰判断和更具体的上手路径离开。</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            {[
              ["01", "什么是 AI", "先建立正确理解，不把它神化，也不把它只当成聊天工具。"],
              ["02", "AI 能做什么", "看清它在写作、研究、分析、创作和协作中的真实能力边界。"],
              ["03", "AI 正在怎样改变生产生活", "把抽象趋势拉回工作、学习、生活与决策场景。"],
            ].map(([no, title, body], index) => (
              <div key={title} className={index === 0 ? "" : "mt-8"}>
                <div className="flex items-start gap-6">
                  <div className="w-14 text-sm font-medium tracking-[0.32em] text-white/32">{no}</div>
                  <div className="flex-1">
                    <div className="text-[1.65rem] font-medium tracking-[-0.03em] text-white">{title}</div>
                    <p className="mt-2 max-w-[28rem] text-[1rem] leading-7 text-white/60">{body}</p>
                  </div>
                </div>
                {index < 2 && <div className="mt-7 deck-divider-horizontal" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

function SlideSearchVsInterface() {
  return (
    <SlideFrame>
      <div className="relative flex h-full flex-col">
        <div className="deck-kicker">Paradigm Shift</div>
        <div className="mt-5 flex items-end justify-between gap-10">
          <div>
            <h2 className="deck-display text-[clamp(3rem,5vw,5.4rem)] leading-[0.9]">搜索 vs 交互界面</h2>
            <p className="mt-4 max-w-[38rem] text-[1.08rem] leading-8 text-white/66">
              真正的变化不是系统更会聊天，而是系统角色从“提供信息”转向“承接意图、生成第一版可推进结果”。
            </p>
          </div>
          <div className="text-right text-xs uppercase tracking-[0.32em] text-white/36">
            From deterministic retrieval to generative synthesis
          </div>
        </div>

        <div className="mt-10 grid flex-1 grid-cols-[1fr_auto_1fr] items-center gap-8">
          <div className="relative flex h-full flex-col justify-center pr-8">
            <div className="mb-7 flex items-center gap-4 text-white/48">
              <SearchIcon />
              <span className="text-lg uppercase tracking-[0.28em]">The past: search</span>
            </div>

            <svg viewBox="0 0 440 250" className="w-full max-w-[30rem] overflow-visible">
              <rect x="0" y="16" width="300" height="48" rx="10" fill="#131622" stroke="rgba(255,255,255,0.12)" />
              <path d="M24 40H160" stroke="rgba(255,255,255,0.36)" strokeWidth="2" />
              <circle cx="270" cy="40" r="8" stroke="#5d6583" />
              <path d="M271 48L279 56" stroke="#5d6583" />
              <path d="M150 64V104" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
              <rect x="0" y="104" width="330" height="18" fill="rgba(255,255,255,0.08)" />
              <rect x="0" y="136" width="268" height="18" fill="rgba(255,255,255,0.08)" />
              <rect x="0" y="168" width="308" height="18" fill="rgba(255,255,255,0.08)" />
              <rect x="0" y="200" width="242" height="18" fill="rgba(255,255,255,0.08)" />
            </svg>

            <div className="mt-8">
              <div className="text-[1.8rem] font-medium tracking-[-0.03em] text-white/92">信息检索</div>
              <p className="mt-3 max-w-[22rem] text-[1.02rem] leading-7 text-white/58">
                你知道自己要找什么，系统返回现成文档，最后由你自己读、筛、比、拼，完成答案的整合。
              </p>
            </div>
          </div>

          <div className="flex h-full flex-col items-center justify-center gap-4">
            <div className="deck-divider-vertical" />
            <div className="rounded-full border border-white/12 bg-white/4 px-5 py-2 text-center text-xs uppercase tracking-[0.24em] text-white/50">
              System role
              <br />
              shift
            </div>
            <div className="deck-divider-vertical" />
          </div>

          <div className="relative flex h-full flex-col justify-center pl-6">
            <div className="absolute right-[10%] top-[18%] h-56 w-56 rounded-full bg-[#7c6cff]/25 blur-[90px]" />
            <div className="mb-7 flex items-center gap-4 text-[#cdb8ff]">
              <SparkleIcon />
              <span className="text-lg uppercase tracking-[0.28em]">The future: interface</span>
            </div>

            <svg viewBox="0 0 430 250" className="relative z-10 w-full max-w-[30rem] overflow-visible">
              <circle cx="200" cy="125" r="34" fill="url(#future-core)" className="deck-float-node" />
              <path
                d="M200 125Q92 28 24 56"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="2.2"
                strokeOpacity="0.74"
                className="deck-pulse-path"
              />
              <path
                d="M200 125Q294 30 390 56"
                fill="none"
                stroke="#ef4f96"
                strokeWidth="2.2"
                strokeOpacity="0.72"
                className="deck-pulse-path"
              />
              <path
                d="M200 125Q92 220 26 194"
                fill="none"
                stroke="#7c6cff"
                strokeWidth="2.2"
                strokeOpacity="0.68"
                className="deck-pulse-path"
              />
              <path
                d="M200 125Q314 216 394 196"
                fill="none"
                stroke="#41c7ff"
                strokeWidth="2.2"
                strokeOpacity="0.72"
                className="deck-pulse-path"
              />
              {[
                [24, 56, "目标"],
                [392, 56, "背景"],
                [26, 194, "约束"],
                [392, 196, "格式"],
              ].map(([x, y, label]) => (
                <g key={label}>
                  <circle cx={x} cy={y} r="7" fill="#fff" />
                  <circle cx={x} cy={y} r="14" stroke="rgba(255,255,255,0.18)" />
                  <text
                    x={x + (x < 200 ? 18 : -18)}
                    y={y + 4}
                    fill="rgba(255,255,255,0.72)"
                    fontSize="15"
                    textAnchor={x < 200 ? "start" : "end"}
                  >
                    {label}
                  </text>
                </g>
              ))}
              <defs>
                <radialGradient id="future-core">
                  <stop offset="0%" stopColor="#f3e8ff" />
                  <stop offset="45%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#6d28d9" />
                </radialGradient>
              </defs>
            </svg>

            <div className="mt-8">
              <div className="text-[1.8rem] font-medium tracking-[-0.03em] text-white">任务交互</div>
              <p className="mt-3 max-w-[22rem] text-[1.02rem] leading-7 text-white/62">
                你描述意图，系统在上下文中综合生成草案、结构、界面和方案。它不是只回答问题，而是在承担第一轮认知劳动。
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm text-white/56">
          <span>搜索帮你找到资料</span>
          <span>AI 帮你推进任务</span>
          <span>人的重心从检索转向判断与校验</span>
        </div>
      </div>
    </SlideFrame>
  );
}

function SlideHowAIWorks() {
  return (
    <SlideFrame>
      <div className="relative flex h-full flex-col">
        <div className="deck-kicker">Architecture Of Thought</div>
        <div className="mt-5 flex items-end justify-between gap-10">
          <div>
            <h2 className="deck-display text-[clamp(3rem,5vw,5.2rem)] leading-[0.9]">AI 如何工作</h2>
            <p className="mt-4 max-w-[38rem] text-[1.08rem] leading-8 text-white/66">
              最值得让听众带走的不是技术细节，而是一个稳固的心智模型：模型不是“真的懂”，而是在上下文里持续预测下一步最可能成立的内容。
            </p>
          </div>
          <div className="text-right text-xs uppercase tracking-[0.32em] text-white/36">
            Prompt → tokens → transformer → probability → response
          </div>
        </div>

        <div className="mt-10 flex flex-1 items-center justify-between gap-8">
          <div className="flex w-[24%] flex-col items-center justify-center">
            <div className="text-xs uppercase tracking-[0.26em] text-white/36">1. Prompt</div>
            <div className="mt-4 w-full border-l border-white/16 bg-white/4 px-5 py-5 backdrop-blur-xl">
              <div className="deck-code text-lg italic text-white/86">“为什么天空是蓝色的？”</div>
            </div>
            <div className="mt-8 h-14 w-px bg-gradient-to-b from-white/0 via-white/30 to-white/0" />
            <div className="flex gap-2">
              {[12, 45, 89, 2].map((token) => (
                <div key={token} className="rounded-lg border border-white/10 bg-white/6 px-3 py-1 text-xs text-white/60">
                  {token}
                </div>
              ))}
            </div>
            <div className="mt-3 text-sm text-white/40">Tokens</div>
          </div>

          <div className="relative flex flex-1 items-center justify-center">
            <svg viewBox="0 0 520 250" className="w-full max-w-[34rem] overflow-visible">
              {[70, 160, 250, 340, 430].map((x, colIndex) => (
                <g key={x}>
                  {[50, 125, 200].map((y) => (
                    <circle
                      key={`${x}-${y}`}
                      cx={x}
                      cy={y}
                      r={colIndex === 0 || colIndex === 4 ? 7 : 5}
                      fill={colIndex === 0 || colIndex === 4 ? "#8a90a8" : "#41c7ff"}
                      className={colIndex === 0 || colIndex === 4 ? "" : "deck-float-node"}
                    />
                  ))}

                  {colIndex < 4 &&
                    [50, 125, 200].map((startY) =>
                      [50, 125, 200].map((endY) => (
                        <path
                          key={`${x}-${startY}-${endY}`}
                          d={`M${x} ${startY} L${x + 90} ${endY}`}
                          stroke="rgba(255,255,255,0.12)"
                          strokeWidth="1"
                        />
                      )),
                    )}
                </g>
              ))}

              <path
                d="M70 125L160 50L250 200L340 125L430 125"
                fill="none"
                stroke="#41c7ff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="deck-pulse-path"
              />
            </svg>

            <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full border border-emerald-400/18 bg-emerald-400/8 px-5 py-2 text-xs uppercase tracking-[0.26em] text-emerald-300">
              2. Transformer layers
            </div>
          </div>

          <div className="flex w-[24%] flex-col items-center justify-center">
            <div className="text-xs uppercase tracking-[0.26em] text-white/36">3. Prediction</div>
            <div className="mt-6 w-full space-y-4">
              {[
                ["Rayleigh", "98%", "w-[98%]", "bg-emerald-400"],
                ["Ocean", "1.5%", "w-[22%]", "bg-white/18"],
                ["Magic", "0.5%", "w-[10%]", "bg-white/12"],
              ].map(([word, value, width, tone], index) => (
                <div key={word} className={index === 0 ? "" : "opacity-60"}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-white/92">{word}</span>
                    <span className="deck-code text-emerald-300">{value}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/8">
                    <div className={`h-full rounded-full ${width} ${tone}`} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 h-14 w-px bg-gradient-to-b from-white/0 via-white/30 to-white/0" />
            <div className="deck-display text-[1.9rem] text-white/92">“Rayleigh ...”</div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-sm text-white/56">
          <span>训练给它模式</span>
          <span>上下文给它轨道</span>
          <span>概率驱动输出，而不是“真正理解”</span>
        </div>
      </div>
    </SlideFrame>
  );
}

function SlideWhyNow() {
  return (
    <SlideFrame>
      <div className="relative flex h-full flex-col">
        <div className="deck-kicker">Why Now</div>
        <div className="mt-5 grid flex-1 grid-cols-[0.92fr_1.08fr] gap-12">
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="deck-display text-[clamp(3rem,5vw,5.2rem)] leading-[0.9]">AI 已进入真实工作流</h2>
              <p className="mt-4 max-w-[30rem] text-[1.06rem] leading-8 text-white/66">
                对普通听众来说，最重要的不是记住哪家公司又发了什么模型，而是看到一件更现实的事:
                越来越多的工作，已经从“我自己从零做完”转成“我先定义任务，再让系统协助推进”。
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                ["43%", "知识工作者表示 AI 已进入自己的任务处理环节。"],
                ["78%", "组织层面已经在至少一个业务流程中接入生成式 AI。"],
                ["71%", "管理者预期 AI 会改变岗位分工和工作方式。"],
              ].map(([value, body], index) => (
                <div key={value} className="deck-stat-card">
                  <div className={`text-[2.7rem] font-semibold leading-none tracking-[-0.06em] ${index === 0 ? "text-[#5d72d8]" : index === 1 ? "text-[#70a8c8]" : "text-[#d68ea3]"}`}>
                    {value}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/58">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid h-full grid-rows-[1.06fr_0.7fr_auto] gap-4">
            <figure className="deck-shot-card">
              <img src="/research/openai-work-report.png" alt="OpenAI work report chart" className="h-[16.5rem] w-full object-cover object-top" />
              <figcaption>报告图表先回答“变化是否正在发生”，再进入解释。这一页的重点是用证据支持判断，而不是营造科技感。</figcaption>
            </figure>

            <div className="grid grid-cols-2 gap-4">
              <figure className="deck-shot-card">
                <img src="/reports/pages/openai-report-p6.png" alt="OpenAI report page" className="h-[11.2rem] w-full object-cover object-top" />
                <figcaption>组织与岗位开始把 AI 放进真实流程。</figcaption>
              </figure>
              <figure className="deck-shot-card">
                <img src="/reports/pages/openai-report-p11.png" alt="OpenAI report page" className="h-[11.2rem] w-full object-cover object-top" />
                <figcaption>管理者更关心“它会如何改写分工”。</figcaption>
              </figure>
            </div>

            <div className="deck-soft-panel rounded-[1.5rem] px-6 py-5 text-sm leading-7 text-white/58">
              这一页想给听众建立一个更稳的判断:
              生成式 AI 不是离我们很远的未来技术，它已经在文档整理、方案初稿、信息汇总、会议纪要、搜索研究等任务里，成为“先跑第一轮”的常见助手。
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

function SlideCapabilitySurface() {
  return (
    <SlideFrame>
      <div className="relative flex h-full flex-col">
        <div className="deck-kicker">Capability Surface</div>
        <div className="mt-5 flex items-end justify-between gap-10">
          <div>
            <h2 className="deck-display text-[clamp(3rem,5vw,5.2rem)] leading-[0.9]">AI 不再是单一能力</h2>
            <p className="mt-4 max-w-[36rem] text-[1.06rem] leading-8 text-white/66">
              更稳的理解方式不是背产品名，而是先看能力层。今天的 AI 表面上是聊天产品，底层已经演变成推理、搜索、视觉、音频和代理能力的组合。
            </p>
          </div>
          <div className="text-right text-xs uppercase tracking-[0.32em] text-white/36">
            Models → tools → multimodal → agentic workflows
          </div>
        </div>

        <div className="mt-8 grid flex-1 grid-cols-[1.1fr_0.9fr] gap-12">
          <div className="relative flex items-center justify-center">
            <svg viewBox="0 0 560 420" className="w-full max-w-[38rem] overflow-visible">
              <circle cx="280" cy="210" r="148" stroke="rgba(255,255,255,0.08)" strokeWidth="1" className="deck-spin-slow origin-center" />
              <circle cx="280" cy="210" r="110" stroke="rgba(255,255,255,0.12)" strokeWidth="1" className="deck-spin-reverse origin-center" />
              <circle cx="280" cy="210" r="68" fill="url(#cap-center)" />
              <text x="280" y="204" textAnchor="middle" fill="white" fontSize="18" letterSpacing="4">AI</text>
              <text x="280" y="228" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11" letterSpacing="4">TASK INTERFACE</text>

              {[
                [280, 42, "推理", "#7c6cff"],
                [470, 116, "搜索", "#41c7ff"],
                [486, 306, "视觉", "#ef4f96"],
                [280, 378, "音频", "#ffe29f"],
                [84, 306, "代理", "#7cf4c5"],
                [94, 116, "工作流", "#caa6ff"],
              ].map(([x, y, label, color], index) => (
                <g key={label} className="deck-float-node" style={{ animationDelay: `${index * 0.4}s` }}>
                  <path d={`M280 210 Q ${(Number(x) + 280) / 2} ${(Number(y) + 210) / 2} ${x} ${y}`} stroke="rgba(255,255,255,0.12)" />
                  <circle cx={x} cy={y} r="24" fill={color} fillOpacity="0.18" stroke={color} />
                  <text x={x} y={y + 5} textAnchor="middle" fill="white" fontSize="16">{label}</text>
                </g>
              ))}

              <defs>
                <radialGradient id="cap-center">
                  <stop offset="0%" stopColor="#F9F7FF" />
                  <stop offset="48%" stopColor="#A78BFA" />
                  <stop offset="100%" stopColor="#1E1B4B" />
                </radialGradient>
              </defs>
            </svg>
          </div>

          <div className="flex flex-col justify-center">
            {[
              ["Reasoning", "ChatGPT / Claude / Gemini / DeepSeek", "从问答走向方案生成、研究分析和复杂任务拆解。"],
              ["Search", "Perplexity / Kimi / 元宝 / 秘塔", "检索不再独立存在，而是越来越常成为推理链条的一部分。"],
              ["Vision & Video", "即梦 / 可灵 / 海螺 / Seedance", "从理解图像到生成视频，视觉模态把 AI 从文本扩展到内容生产。"],
              ["Agentic Workflows", "Copilot / 自动化平台 / 企业内工作流", "一旦接上系统和工具，语言能力会被放大成执行能力。"],
            ].map(([kicker, title, body], index) => (
              <div key={kicker} className={index === 0 ? "" : "mt-7"}>
                <div className="text-xs uppercase tracking-[0.28em] text-[#aab6ff]">{kicker}</div>
                <div className="mt-2 text-[1.4rem] font-medium tracking-[-0.03em] text-white">{title}</div>
                <p className="mt-2 max-w-[28rem] text-[1rem] leading-7 text-white/60">{body}</p>
                {index < 3 && <div className="mt-6 deck-divider-horizontal" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

function SlidePrompting() {
  return (
    <SlideFrame>
      <div className="relative flex h-full flex-col">
        <div className="deck-kicker">Prompting</div>
        <div className="mt-5 grid flex-1 grid-cols-[0.92fr_1.08fr] gap-12">
          <div className="flex flex-col justify-between">
            <div>
              <div className="mb-6 flex items-center gap-4 text-[#cdb8ff]">
                <PromptIcon />
                <span className="text-lg uppercase tracking-[0.28em]">Prompt is task specification</span>
              </div>
              <h2 className="deck-display text-[clamp(3rem,5vw,5.2rem)] leading-[0.9]">
                提示词不是咒语
                <br />
                而是任务定义
              </h2>
              <p className="mt-5 max-w-[30rem] text-[1.08rem] leading-8 text-white/66">
                高质量输出靠的不是“更会写提示词”，而是把目标、上下文、限制、格式和判断标准一次性说完整。你不是在施法，而是在设计一个清楚的任务接口。
              </p>
            </div>

            <div className="space-y-5">
              {[
                ["目标", "要完成什么，不要只说“帮我写”。"],
                ["背景", "提供场景、对象和已有材料。"],
                ["限制", "时间、口径、风险、边界都属于任务的一部分。"],
                ["格式", "先给结构，再给长度、风格和交付样式。"],
              ].map(([title, body]) => (
                <div key={title} className="border-l border-white/12 pl-5">
                  <div className="text-base font-medium text-white">{title}</div>
                  <div className="mt-1 text-sm leading-6 text-white/56">{body}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center">
            <div className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[rgba(11,13,22,0.82)] p-8 shadow-2xl backdrop-blur-2xl">
              <div className="mb-5 flex items-center justify-between">
                <div className="text-xs uppercase tracking-[0.32em] text-white/36">Task spec</div>
                <div className="flex gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20"></span>
                </div>
              </div>

              <pre className="deck-code whitespace-pre-wrap text-[1rem] leading-8 text-white/84">
                <span className="text-[#aab6ff]">角色：</span>你是一名企业内部沟通顾问。{"\n"}
                <span className="text-[#f6b7d8]">任务：</span>把这份会议纪要整理成 1 页管理层更新。{"\n"}
                <span className="text-[#7fd5ff]">背景：</span>受众是非技术管理者，关注决策、风险和下一步。{"\n"}
                <span className="text-[#b6ffc6]">限制：</span>不要编造事实，不确定内容必须标注待确认。{"\n"}
                <span className="text-[#ffe5a8]">输出：</span>先给三段结构，再给最终文稿，控制在 300 字以内。
              </pre>

              <div className="deck-annotation-dot left-[74%] top-[26%]" />
              <div className="deck-annotation-line left-[76%] top-[27.4%] w-[18%]" />
              <div className="absolute right-0 top-[22%] max-w-[7rem] text-xs uppercase tracking-[0.22em] text-[#aab6ff]">
                先定义身份与任务
              </div>

              <div className="deck-annotation-dot left-[74%] top-[45%]" />
              <div className="deck-annotation-line left-[76%] top-[46.4%] w-[18%]" />
              <div className="absolute right-0 top-[40%] max-w-[7rem] text-xs uppercase tracking-[0.22em] text-[#f6b7d8]">
                提供上下文与受众
              </div>

              <div className="deck-annotation-dot left-[74%] top-[64%]" />
              <div className="deck-annotation-line left-[76%] top-[65.4%] w-[18%]" />
              <div className="absolute right-0 top-[58%] max-w-[7rem] text-xs uppercase tracking-[0.22em] text-[#7fd5ff]">
                明确限制与输出格式
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

function SlideWorkflow() {
  return (
    <SlideFrame>
      <div className="relative flex h-full flex-col">
        <div className="deck-kicker">Workflow</div>
        <div className="mt-5">
          <h2 className="deck-display text-[clamp(3rem,5vw,5.2rem)] leading-[0.9]">一个稳定的 AI 工作流</h2>
          <p className="mt-4 max-w-[38rem] text-[1.06rem] leading-8 text-white/66">
            很多人觉得 AI “一般”，往往不是模型不够好，而是流程停在了第一步。真正有效的协作通常不是一轮问答，而是一条完整回路。
          </p>
        </div>

        <div className="relative mt-10 flex flex-1 items-center justify-center">
          <svg viewBox="0 0 1200 360" className="absolute inset-x-0 top-1/2 w-full -translate-y-1/2">
            <path
              d="M92 210C188 128 264 116 360 178C456 240 520 254 616 188C712 122 784 120 880 182C976 244 1048 236 1110 162"
              fill="none"
              stroke="rgba(255,255,255,0.14)"
              strokeWidth="2"
            />
            <path
              d="M92 210C188 128 264 116 360 178C456 240 520 254 616 188C712 122 784 120 880 182C976 244 1048 236 1110 162"
              fill="none"
              stroke="#7c6cff"
              strokeWidth="4"
              className="deck-pulse-path"
            />
          </svg>

          <div className="grid w-full grid-cols-5 gap-7">
            {[
              ["01", "定义任务", "先说清楚目标、对象、限制和交付。", "pt-[1.5rem]"],
              ["02", "生成草案", "让系统产出第一版结构、方案或文稿。", "pt-[6rem]"],
              ["03", "追问补全", "针对缺口、逻辑和事实逐轮迭代。", "pt-[1.5rem]"],
              ["04", "接入工具", "需要时连接搜索、文件、表格和工作流。", "pt-[6rem]"],
              ["05", "人工校验", "最终输出必须经过人的判断、修订和确认。", "pt-[1.5rem]"],
            ].map(([no, title, body, pad]) => (
              <div key={title} className={`relative flex flex-col ${pad}`}>
                <div className="mb-5 text-xs uppercase tracking-[0.32em] text-white/32">{no}</div>
                <div className="h-4 w-4 rounded-full border border-white/20 bg-[#0f1221]" />
                <div className="mt-6 text-[1.55rem] font-medium tracking-[-0.03em] text-white">{title}</div>
                <p className="mt-3 max-w-[15rem] text-[0.98rem] leading-7 text-white/58">{body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 border-t border-white/10 pt-4 text-sm leading-7 text-white/56">
          AI 最适合做的是“第一版认知劳动”与“中间层处理”；真正决定质量和责任归属的，仍然是人的判断。
        </div>
      </div>
    </SlideFrame>
  );
}

function SlideRiskBoundary() {
  return (
    <SlideFrame>
      <div className="relative flex h-full flex-col">
        <div className="deck-kicker">Boundary Conditions</div>
        <div className="mt-5 grid flex-1 grid-cols-[0.95fr_1.05fr] gap-12">
          <div className="flex flex-col justify-between">
            <div>
              <div className="mb-6 flex items-center gap-4 text-[#b6ffc6]">
                <SafetyIcon />
                <span className="text-lg uppercase tracking-[0.28em]">Use with boundaries</span>
              </div>
              <h2 className="deck-display text-[clamp(3rem,5vw,5.2rem)] leading-[0.9]">真正重要的是边界感</h2>
              <p className="mt-5 max-w-[30rem] text-[1.06rem] leading-8 text-white/66">
                决定 AI 能不能长期进入工作流的，不只是效果，更是你有没有保留准确性、隐私、版权与合规意识。没有边界感，演示再惊艳也很危险。
              </p>
            </div>

            <div className="space-y-5">
              {[
                ["准确性", "关键事实、数字、引用和结论必须核验。"],
                ["隐私", "敏感信息、客户材料和内部数据不要随意上传。"],
                ["版权与出处", "生成内容能不能用、能不能商用、是否需要标注来源，要提前判断。"],
                ["自动化边界", "越接近执行和决策，越需要把人放回回路中。"],
              ].map(([title, body]) => (
                <div key={title} className="border-l border-white/12 pl-5">
                  <div className="text-base font-medium text-white">{title}</div>
                  <div className="mt-1 text-sm leading-6 text-white/56">{body}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <svg viewBox="0 0 520 420" className="w-full max-w-[34rem] overflow-visible">
              <circle cx="260" cy="210" r="144" stroke="rgba(255,255,255,0.08)" />
              <circle cx="260" cy="210" r="106" stroke="rgba(255,255,255,0.12)" strokeDasharray="5 9" />
              <path d="M260 38V382M88 210H432" stroke="rgba(255,255,255,0.08)" />
              <path d="M260 66L330 140L260 210L190 140Z" fill="rgba(124,108,255,0.12)" stroke="#7c6cff" />
              <path d="M404 210L330 280L260 210L330 140Z" fill="rgba(65,199,255,0.1)" stroke="#41c7ff" />
              <path d="M260 354L190 280L260 210L330 280Z" fill="rgba(239,79,150,0.1)" stroke="#ef4f96" />
              <path d="M116 210L190 140L260 210L190 280Z" fill="rgba(127,255,220,0.08)" stroke="#7cf4c5" />
              <circle cx="260" cy="210" r="28" fill="rgba(255,255,255,0.95)" />
              <text x="260" y="214" textAnchor="middle" fill="#10111b" fontSize="18" letterSpacing="3">HUMAN</text>
              <text x="260" y="92" textAnchor="middle" fill="white" fontSize="18">准确性</text>
              <text x="370" y="214" textAnchor="middle" fill="white" fontSize="18">隐私</text>
              <text x="260" y="336" textAnchor="middle" fill="white" fontSize="18">版权</text>
              <text x="150" y="214" textAnchor="middle" fill="white" fontSize="18">自动化</text>
            </svg>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

function SlideClosing() {
  return (
    <SlideFrame>
      <div className="relative flex h-full flex-col justify-between">
        <div>
          <div className="deck-kicker">Closing</div>
          <h2 className="deck-display mt-7 max-w-[62rem] text-[clamp(3.4rem,6vw,6.8rem)] leading-[0.9]">
            先把 AI 看成新的任务接口
            <br />
            再决定它应该进入你哪些场景
          </h2>
          <p className="mt-7 max-w-[38rem] text-[1.1rem] leading-8 text-white/68">
            真正值得带走的不是某个单点工具，而是三件事：把任务讲清楚，把第一版做出来，把关键内容核验掉。剩下的，只是越来越多的界面和入口。
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
          {[
            ["Define", "先定义目标、对象、限制和交付。"],
            ["Generate", "让系统快速产出第一版结构和草案。"],
            ["Verify", "把事实、风险、边界和责任重新放回人手里。"],
          ].map(([title, body]) => (
            <div key={title}>
              <div className="text-[2.1rem] font-medium tracking-[-0.05em] text-white">{title}</div>
              <p className="mt-3 max-w-[18rem] text-[1rem] leading-7 text-white/58">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}

function SlideAudiencePositioning() {
  return (
    <SlideFrame>
      <div className="relative flex h-full flex-col">
        <div className="deck-kicker">Audience</div>
        <div className="mt-5 grid flex-1 grid-cols-[0.96fr_1.04fr] gap-12">
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="deck-display text-[clamp(3rem,5vw,5.2rem)] leading-[0.9]">这门分享是给谁的</h2>
              <p className="mt-5 max-w-[30rem] text-[1.08rem] leading-8 text-white/66">
                面向非技术背景的普通职场人。你也许对 AI 好奇，也可能焦虑、怀疑、怕跟不上，但并不需要先成为技术专家，才有资格理解这场变化。
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 text-sm text-white/56">
              <div>
                <div className="text-xs uppercase tracking-[0.26em] text-[#aab6ff]">Curious</div>
                <p className="mt-3 leading-6">看不懂全貌，但已经感到它在逼近自己的工作与生活。</p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.26em] text-[#aab6ff]">Anxious</div>
                <p className="mt-3 leading-6">担心落后，也担心被“工具焦虑”和神话叙事裹挟。</p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.26em] text-[#aab6ff]">Practical</div>
                <p className="mt-3 leading-6">更希望知道明天怎么开始，而不是今天背下多少术语。</p>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <svg viewBox="0 0 540 380" className="w-full max-w-[36rem] overflow-visible">
              <circle cx="270" cy="190" r="148" stroke="rgba(255,255,255,0.08)" />
              <circle cx="270" cy="190" r="112" stroke="rgba(255,255,255,0.12)" strokeDasharray="6 12" />
              <circle cx="270" cy="190" r="76" stroke="rgba(255,255,255,0.18)" />
              <circle cx="270" cy="190" r="26" fill="rgba(255,255,255,0.96)" />
              <text x="270" y="195" textAnchor="middle" fill="#0d1020" fontSize="16" letterSpacing="2">你</text>

              {[
                [270, 38, "不先恐惧 AI"],
                [448, 190, "理解 AI 是什么"],
                [270, 342, "愿意开始试用"],
                [94, 190, "保留边界感"],
              ].map(([x, y, label], index) => (
                <g key={label} className="deck-float-node" style={{ animationDelay: `${index * 0.5}s` }}>
                  <path d={`M270 190 Q ${(Number(x) + 270) / 2} ${(Number(y) + 190) / 2} ${x} ${y}`} stroke="rgba(255,255,255,0.14)" />
                  <circle cx={x} cy={y} r="22" fill="rgba(124,108,255,0.14)" stroke="#8f84ff" />
                  <text x={x} y={y + 42} textAnchor="middle" fill="rgba(255,255,255,0.78)" fontSize="16">{label}</text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

function SlideTaskShift() {
  return (
    <SlideFrame>
      <div className="relative flex h-full flex-col">
        <div className="deck-kicker">Task Shift</div>
        <div className="mt-5 flex items-end justify-between gap-10">
          <div>
            <h2 className="deck-display text-[clamp(3rem,5vw,5.2rem)] leading-[0.9]">从找答案到定义任务</h2>
            <p className="mt-4 max-w-[38rem] text-[1.06rem] leading-8 text-white/66">
              AI 时代最值钱的变化之一，不是更会搜，而是更会把模糊需求转成一个可协作、可推进、可迭代的任务。
            </p>
          </div>
          <div className="text-right text-xs uppercase tracking-[0.32em] text-white/36">Question asking becomes task design</div>
        </div>

        <div className="mt-10 grid flex-1 grid-cols-[1fr_auto_1fr] items-center gap-8">
          <div className="flex flex-col justify-center">
            <div className="text-xs uppercase tracking-[0.24em] text-white/34">Old habit</div>
            <div className="mt-4 text-[2rem] font-medium tracking-[-0.04em] text-white">我去找答案</div>
            <div className="mt-8 space-y-5">
              {["输入关键词", "打开很多链接", "自己筛选比对", "拼出一个可用版本"].map((item, index) => (
                <div key={item} className="flex items-center gap-4">
                  <span className="w-10 text-xs uppercase tracking-[0.26em] text-white/28">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-[1.1rem] text-white/70">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex h-full flex-col items-center justify-center gap-4">
            <div className="deck-divider-vertical" />
            <div className="rounded-full border border-white/12 bg-white/4 px-5 py-2 text-center text-xs uppercase tracking-[0.24em] text-white/50">
              user role
              <br />
              changes
            </div>
            <div className="deck-divider-vertical" />
          </div>

          <div className="relative flex flex-col justify-center">
            <div className="absolute left-[12%] top-[24%] h-48 w-48 rounded-full bg-[#41c7ff]/14 blur-[80px]" />
            <div className="text-xs uppercase tracking-[0.24em] text-[#b8adff]">New habit</div>
            <div className="mt-4 text-[2rem] font-medium tracking-[-0.04em] text-white">我来定义任务</div>
            <div className="mt-8 space-y-5">
              {["说明目标与对象", "补充背景与限制", "让系统产出第一版", "继续追问、修订与核验"].map((item, index) => (
                <div key={item} className="flex items-center gap-4">
                  <span className="w-10 text-xs uppercase tracking-[0.26em] text-white/28">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-[1.1rem] text-white/78">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

function SlideHallucination() {
  return (
    <SlideFrame>
      <div className="relative flex h-full flex-col">
        <div className="deck-kicker">Hallucination</div>
        <div className="mt-5 grid flex-1 grid-cols-[0.92fr_1.08fr] gap-12">
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="deck-display text-[clamp(3rem,5vw,5.2rem)] leading-[0.9]">为什么 AI 会一本正经地出错</h2>
              <p className="mt-5 max-w-[30rem] text-[1.08rem] leading-8 text-white/66">
                幻觉最危险的地方，不是它错，而是它经常错得很像真的。语言流畅、结构完整、语气笃定，并不等于事实可靠。
              </p>
            </div>

            <div className="space-y-5">
              {[
                ["模式优先", "模型擅长生成“像样的答案”，不等于它拥有事实访问权。"],
                ["上下文不足", "背景给得不够时，它会自动补全最可能成立的内容。"],
                ["表达掩盖风险", "表述越顺，听众越容易放松核验意识。"],
              ].map(([title, body]) => (
                <div key={title} className="border-l border-white/12 pl-5">
                  <div className="text-base font-medium text-white">{title}</div>
                  <div className="mt-1 text-sm leading-6 text-white/56">{body}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <svg viewBox="0 0 540 380" className="w-full max-w-[36rem] overflow-visible">
              <path d="M270 26V354M58 190H482" stroke="rgba(255,255,255,0.14)" />
              <text x="270" y="18" textAnchor="middle" fill="rgba(255,255,255,0.44)" fontSize="14">事实更可靠</text>
              <text x="270" y="374" textAnchor="middle" fill="rgba(255,255,255,0.44)" fontSize="14">事实更脆弱</text>
              <text x="36" y="194" textAnchor="middle" fill="rgba(255,255,255,0.44)" fontSize="14">表达更弱</text>
              <text x="506" y="194" textAnchor="middle" fill="rgba(255,255,255,0.44)" fontSize="14">表达更强</text>

              <rect x="286" y="206" width="172" height="118" rx="22" fill="rgba(239,79,150,0.12)" stroke="#ef4f96" />
              <text x="372" y="246" textAnchor="middle" fill="white" fontSize="24">危险区</text>
              <text x="372" y="278" textAnchor="middle" fill="rgba(255,255,255,0.72)" fontSize="16">像真的</text>
              <text x="372" y="302" textAnchor="middle" fill="rgba(255,255,255,0.72)" fontSize="16">但未必是真的</text>

              <circle cx="360" cy="104" r="22" fill="rgba(124,108,255,0.16)" stroke="#8f84ff" />
              <text x="360" y="110" textAnchor="middle" fill="white" fontSize="14">引用</text>

              <circle cx="192" cy="102" r="22" fill="rgba(65,199,255,0.14)" stroke="#41c7ff" />
              <text x="192" y="108" textAnchor="middle" fill="white" fontSize="14">原文</text>

              <circle cx="194" cy="274" r="22" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" />
              <text x="194" y="280" textAnchor="middle" fill="white" fontSize="14">草稿</text>
            </svg>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

function SlideHumanAIRoles() {
  return (
    <SlideFrame>
      <div className="relative flex h-full flex-col">
        <div className="deck-kicker">Division Of Labor</div>
        <div className="mt-5 flex items-end justify-between gap-10">
          <div>
            <h2 className="deck-display text-[clamp(3rem,5vw,5.2rem)] leading-[0.9]">最稳的人机分工</h2>
            <p className="mt-4 max-w-[38rem] text-[1.06rem] leading-8 text-white/66">
              AI 的价值不是代替人的判断，而是把“起草、整合、扩展选项、加速初稿”做得非常便宜；人的价值则会更集中在判断、审美、取舍和责任上。
            </p>
          </div>
          <div className="text-right text-xs uppercase tracking-[0.32em] text-white/36">AI expands possibilities, humans choose direction</div>
        </div>

        <div className="mt-10 grid flex-1 grid-cols-[1fr_auto_1fr] gap-8">
          <div className="flex flex-col justify-center">
            <div className="text-xs uppercase tracking-[0.26em] text-[#aab6ff]">AI 更擅长</div>
            <div className="mt-6 space-y-6">
              {["快速起草", "整理与摘要", "扩展方案池", "重复性处理", "把零散材料拼成第一版"].map((item) => (
                <div key={item} className="text-[1.35rem] leading-8 text-white/82">{item}</div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <svg viewBox="0 0 260 320" className="h-full max-h-[20rem] w-auto overflow-visible">
              <circle cx="130" cy="160" r="108" stroke="rgba(255,255,255,0.08)" />
              <circle cx="130" cy="160" r="74" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" />
              <circle cx="130" cy="160" r="28" fill="rgba(255,255,255,0.94)" />
              <text x="130" y="166" textAnchor="middle" fill="#0d1020" fontSize="15" letterSpacing="2">协作</text>
            </svg>
          </div>

          <div className="flex flex-col justify-center">
            <div className="text-xs uppercase tracking-[0.26em] text-[#f6b7d8]">人更擅长</div>
            <div className="mt-6 space-y-6">
              {["判断真伪", "做关键取舍", "把握审美与风格", "承担结果责任", "决定什么值得被继续推进"].map((item) => (
                <div key={item} className="text-[1.35rem] leading-8 text-white/86">{item}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

function SlideProductLayers() {
  return (
    <SlideFrame>
      <div className="relative flex h-full flex-col">
        <div className="deck-kicker">Ecosystem Layers</div>
        <div className="mt-5">
          <h2 className="deck-display text-[clamp(3rem,5vw,5.2rem)] leading-[0.9]">主流 AI 产品，不要当成一堆名字背</h2>
          <p className="mt-4 max-w-[38rem] text-[1.06rem] leading-8 text-white/66">
            更稳的理解方式，是用四层结构去看它们: 模型层、平台层、应用层、智能体层。这样听众知道的不是谁更火，而是谁在解决哪一层问题。
          </p>
        </div>

        <div className="mt-10 flex flex-1 flex-col justify-center gap-6">
          {[
            ["04", "智能体层", "从回答问题走向拆任务、调工具和执行流程。", "#7cf4c5", "Agent / Workflow / Copilot"],
            ["03", "应用层", "写作、办公、搜索、设计、视频、编程等场景化入口。", "#41c7ff", "Search / Writing / Design / Video"],
            ["02", "平台层", "ChatGPT、Claude、Gemini、Kimi、元宝等日常交互界面。", "#ef4f96", "Assistant / Workspace / Collaboration"],
            ["01", "模型层", "OpenAI、Anthropic、Google、DeepSeek 等底层能力提供者。", "#8f84ff", "LLM / VLM / ASR / TTS"],
          ].map(([no, title, body, color, sub]) => (
            <div key={title} className="grid grid-cols-[96px_240px_1fr_320px] items-center gap-6 border-b border-white/8 pb-5">
              <div className="text-[2rem] font-semibold tracking-[-0.06em]" style={{ color }}>{no}</div>
              <div className="text-[1.6rem] font-medium tracking-[-0.04em] text-white">{title}</div>
              <div className="text-[1rem] leading-7 text-white/60">{body}</div>
              <div className="text-right text-sm uppercase tracking-[0.22em] text-white/34">{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}

function SlideGlobalInterfaces() {
  return (
    <SlideFrame>
      <div className="relative flex h-full flex-col">
        <div className="deck-kicker">Interfaces</div>
        <div className="mt-5 grid flex-1 grid-cols-[0.82fr_1.18fr] gap-12">
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="deck-display text-[clamp(3rem,5vw,5rem)] leading-[0.9]">海外主流入口长什么样</h2>
              <p className="mt-5 max-w-[28rem] text-[1.06rem] leading-8 text-white/66">
                对普通听众来说，先认识入口远比先背模型名更有帮助。ChatGPT、Claude、Gemini、DeepSeek 代表了今天最常见的 AI 交互方式。
              </p>
            </div>

            <div className="space-y-5">
              {[
                ["看界面，而不是先背榜单", "普通用户实际接触到 AI，通常是一个聊天框、若干推荐任务和可直接点击的工具按钮。"],
                ["看它最擅长帮你做什么", "有人擅长综合问答，有人更适合长文写作，有人擅长搜索与整理。入口不同，使用习惯也会不同。"],
                ["看它能不能进入你的日常", "真正长期留下来的，不是“参数最强”的那个，而是最方便被你高频打开的那个。"],
              ].map(([title, body]) => (
                <div key={title} className="deck-soft-panel rounded-[1.35rem] px-5 py-5">
                  <div className="text-base font-medium text-white">{title}</div>
                  <div className="mt-1 text-sm leading-6 text-white/56">{body}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid h-full grid-cols-2 gap-4">
            {[
              ["ChatGPT", "/screens/chatgpt-overview.png", "通用型入口，适合大多数人的第一站。"],
              ["Claude", "/screens/claude-home.png", "长文阅读、结构化整理、温和交互体验更突出。"],
              ["Gemini", "/screens/gemini-overview.png", "和 Google 生态衔接更自然，适合搜索与多模态混合场景。"],
              ["DeepSeek", "/screens/deepseek-home.png", "高性价比推理入口，近两年让很多用户第一次认真用起 AI。"],
            ].map(([title, src, body]) => (
              <figure key={title} className="deck-shot-card">
                <img src={src} alt={title} className="h-[12.8rem] w-full object-cover object-top" />
                <figcaption>
                  <strong className="mr-2 text-[0.95rem] text-white">{title}</strong>
                  {body}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

function SlideChinaInterfaces() {
  return (
    <SlideFrame>
      <div className="relative flex h-full flex-col">
        <div className="deck-kicker">China Surface</div>
        <div className="mt-5 grid flex-1 grid-cols-[1.14fr_0.86fr] gap-12">
          <div className="grid h-full grid-cols-2 gap-4">
            {[
              ["豆包", "/screens/doubao-home.png", "更像面向大众的日常入口，很多人第一次尝试 AI 就从这里开始。"],
              ["Kimi", "/screens/kimi-home.png", "资料阅读、联网总结、长文本处理，在认知里辨识度很高。"],
              ["元宝", "/screens/yuanbao-home.png", "依托大厂生态，更容易在熟悉的产品环境里被看见。"],
              ["通义", "/screens/qwen-home.png", "既是聊天入口，也是企业与开发场景的重要基础能力来源。"],
            ].map(([title, src, body]) => (
              <figure key={title} className="deck-shot-card">
                <img src={src} alt={title} className="h-[12.6rem] w-full object-cover object-top" />
                <figcaption>
                  <strong className="mr-2 text-[0.95rem] text-white">{title}</strong>
                  {body}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h2 className="deck-display text-[clamp(3rem,5vw,5rem)] leading-[0.9]">国内用户真正常见的入口</h2>
              <p className="mt-5 max-w-[28rem] text-[1.06rem] leading-8 text-white/66">
                面向大众讲 AI，不能只展示海外产品名。很多人真正会遇到的，就是豆包、Kimi、元宝、通义这类已经能在手机和浏览器里直接打开的入口。
              </p>
            </div>

            <div className="space-y-5">
              {[
                ["更低门槛", "入口越像熟悉的应用，越容易被普通用户用来做第一次尝试。"],
                ["更高频场景", "搜索、总结、写作、翻译、资料整合，会是最先发生的高频用法。"],
                ["更真实的扩散路径", "真正适合大众的讲法，必须从他们会打开什么界面开始，而不是从排行榜开始。"],
              ].map(([title, body]) => (
                <div key={title} className="deck-soft-panel rounded-[1.35rem] px-5 py-5">
                  <div className="text-base font-medium text-white">{title}</div>
                  <div className="mt-1 text-sm leading-6 text-white/56">{body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

function SlidePromptStructure() {
  return (
    <SlideFrame>
      <div className="relative flex h-full flex-col">
        <div className="deck-kicker">Prompt Structure</div>
        <div className="mt-5">
          <h2 className="deck-display text-[clamp(3rem,5vw,5.1rem)] leading-[0.9]">一条高质量提示词通常包含这些部分</h2>
          <p className="mt-4 max-w-[38rem] text-[1.06rem] leading-8 text-white/66">
            真正稳定的提示结构不是为了写得花，而是为了降低系统的误解概率。你给出的不是一句话，而是一段跑道。
          </p>
        </div>

        <div className="relative mt-10 flex flex-1 items-center justify-center">
          <svg viewBox="0 0 1180 360" className="w-full overflow-visible">
            <path d="M84 182H1098" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
            {[
              ["01", "背景", "这件事发生在什么场景里", 110, "#8f84ff"],
              ["02", "角色", "希望 AI 扮演谁", 280, "#41c7ff"],
              ["03", "任务", "具体要完成什么", 450, "#ef4f96"],
              ["04", "标准", "什么叫做好结果", 620, "#ffe29f"],
              ["05", "限制", "有哪些边界与禁区", 790, "#7cf4c5"],
              ["06", "格式", "希望怎么呈现输出", 960, "#c9b7ff"],
            ].map(([no, title, body, x, color], index) => (
              <g key={title} className="deck-float-node" style={{ animationDelay: `${index * 0.4}s` }}>
                <circle cx={x} cy="182" r="32" fill={color} fillOpacity="0.18" stroke={color} />
                <text x={x} y="178" textAnchor="middle" fill="white" fontSize="14">{no}</text>
                <text x={x} y="198" textAnchor="middle" fill="white" fontSize="18">{title}</text>
                <text x={x} y="244" textAnchor="middle" fill="rgba(255,255,255,0.68)" fontSize="16">{body}</text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </SlideFrame>
  );
}

function SlideDemoPromptComparison() {
  return (
    <SlideFrame>
      <div className="relative flex h-full flex-col">
        <div className="deck-kicker">Demo</div>
        <div className="mt-5 flex items-end justify-between gap-10">
          <div>
            <h2 className="deck-display text-[clamp(3rem,5vw,5rem)] leading-[0.9]">同一个任务，问法不同，结果差很多</h2>
            <p className="mt-4 max-w-[38rem] text-[1.06rem] leading-8 text-white/66">
              演示重点不是炫技，而是让听众直观看到: 高质量结果往往来自更完整的任务定义，而不是更玄学的“咒语”。
            </p>
          </div>
          <div className="text-right text-xs uppercase tracking-[0.32em] text-white/36">普通问法 vs 指令式问法</div>
        </div>

        <div className="mt-10 grid flex-1 grid-cols-[1fr_auto_1fr] gap-8">
          <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl">
            <div className="text-xs uppercase tracking-[0.24em] text-white/36">普通问法</div>
            <pre className="deck-code mt-6 whitespace-pre-wrap text-[1.08rem] leading-8 text-white/82">
帮我写一则 AI 分享通知。
            </pre>
            <div className="mt-10 text-sm leading-7 text-white/56">
              问题在于: 目标不清楚、对象不清楚、口吻不清楚、输出要求也不清楚。
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="deck-divider-vertical" />
          </div>

          <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.05] p-7 backdrop-blur-xl">
            <div className="text-xs uppercase tracking-[0.24em] text-[#b8adff]">优化问法</div>
            <pre className="deck-code mt-6 whitespace-pre-wrap text-[1rem] leading-8 text-white/86">
你是公司内部沟通负责人。
我要发一则 AI 启发分享通知，
面向非技术同事，目的是降低距离感，
让大家愿意参加。

请输出:
1. 一版正式通知
2. 一版更轻松的海报文案

语气理性、友好，
不要写成技术宣传稿，
控制在 150 字以内。
            </pre>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

function SlideOptionGeneration() {
  return (
    <SlideFrame>
      <div className="relative flex h-full flex-col">
        <div className="deck-kicker">Option Space</div>
        <div className="mt-5 grid flex-1 grid-cols-[0.88fr_1.12fr] gap-12">
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="deck-display text-[clamp(3rem,5vw,5rem)] leading-[0.9]">AI 很适合先帮你扩展选项池</h2>
              <p className="mt-5 max-w-[30rem] text-[1.06rem] leading-8 text-white/66">
                它不一定一次就给出最佳答案，但非常擅长同时生成多种风格、多种角度和多种方案。于是人的价值就从“苦找第一版”转向“更快做判断和取舍”。
              </p>
            </div>

            <div className="border-t border-white/10 pt-5 text-sm leading-7 text-white/56">
              当生成变便宜，选择就变贵。AI 帮你把可能性拉开，人负责把方向选对。
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8">
            {[
              ["稳重专业", "AI 不是更强的搜索，而是新的认知接口", "适合对外分享、培训和正式场景。"],
              ["轻传播", "别再只会搜，开始给 AI 下任务", "适合海报、活动页和大众化传播。"],
              ["认知升级", "从找答案到定义任务，这是下一代工作方式", "适合观点型开场和课程标题。"],
            ].map(([title, big, body], index) => (
              <div
                key={title}
                className={`flex flex-col justify-between border-t border-white/12 pt-5 ${index === 1 ? "translate-y-6" : index === 2 ? "translate-y-12" : ""}`}
              >
                <div className="text-xs uppercase tracking-[0.24em] text-[#aab6ff]">{title}</div>
                <div className="mt-5 text-[1.7rem] font-medium tracking-[-0.05em] text-white">{big}</div>
                <p className="mt-5 text-sm leading-7 text-white/58">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

function SlideWorkLifeSurface() {
  return (
    <SlideFrame>
      <div className="relative flex h-full flex-col">
        <div className="deck-kicker">Life Surface</div>
        <div className="mt-5 flex items-end justify-between gap-10">
          <div>
            <h2 className="deck-display text-[clamp(3rem,5vw,5rem)] leading-[0.9]">AI 的价值不只在办公桌上</h2>
            <p className="mt-4 max-w-[38rem] text-[1.06rem] leading-8 text-white/66">
              如果听众只把 AI 理解成“写周报、做汇报的工具”，认知会非常窄。它更像一种新的认知协作方式，正在同时进入工作、学习和日常生活。
            </p>
          </div>
        </div>

        <div className="mt-10 grid flex-1 grid-cols-2 gap-12">
          <div className="deck-soft-panel rounded-[2rem] px-7 py-7">
            <div className="text-xs uppercase tracking-[0.26em] text-[#6881aa]">工作场景</div>
            <div className="mt-6 grid gap-4">
              {[
                ["会议之后", "把一小时讨论快速整理成结论、待办和责任人。"],
                ["资料处理", "先对长文、报告、政策、研究做摘要、改写和重点提取。"],
                ["从零到一", "把一个空白问题先拉出结构、提纲、PPT 或方案初稿。"],
                ["多方案比较", "同一问题快速生成几个备选答案，再由人做选择。"],
              ].map(([title, body]) => (
                <div key={title} className="deck-scene-card">
                  <h3 className="text-[1.26rem] font-medium tracking-[-0.03em]">{title}</h3>
                  <p className="mt-3 text-[0.98rem] leading-7">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="deck-soft-panel rounded-[2rem] px-7 py-7">
            <div className="text-xs uppercase tracking-[0.26em] text-[#c48aa1]">工作之外</div>
            <div className="mt-6 grid gap-4">
              {[
                ["学习新东西", "把陌生概念解释成自己能听懂的话，再生成学习路线。"],
                ["生活规划", "旅行路线、健身饮食、家庭安排，都可以先让 AI 给出草案。"],
                ["日常决策", "面对多个选择时，先让它帮你列出利弊和比较维度。"],
                ["兴趣与创意", "写文案、做脚本、想标题、做灵感扩展，都能先借它打开思路。"],
              ].map(([title, body]) => (
                <div key={title} className="deck-scene-card">
                  <h3 className="text-[1.26rem] font-medium tracking-[-0.03em]">{title}</h3>
                  <p className="mt-3 text-[0.98rem] leading-7">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 text-sm leading-7 text-white/58">
          更适合大众的表达不是“AI 还有很多能力”，而是让人看见:
          它已经在真实的小任务里，悄悄改变我们获取信息、整理想法、做出选择和开始行动的方式。
        </div>
      </div>
    </SlideFrame>
  );
}

function SlideSevenDayPlan() {
  return (
    <SlideFrame>
      <div className="relative flex h-full flex-col">
        <div className="deck-kicker">Action Plan</div>
        <div className="mt-5">
          <h2 className="deck-display text-[clamp(3rem,5vw,5rem)] leading-[0.9]">如果只给普通学习者一条路，我会让他这样开始 7 天</h2>
          <p className="mt-4 max-w-[38rem] text-[1.06rem] leading-8 text-white/66">
            重点不是学完所有工具，而是用七天把认知和动作接起来。每天都只做一件非常小但真实的事情。
          </p>
        </div>

        <div className="mt-10 grid flex-1 grid-cols-7 gap-4">
          {[
            ["Day 1", "选一个最熟悉的小任务，先感受 AI 的基本交互。"],
            ["Day 2", "用“背景 + 角色 + 任务 + 标准”重做同一个问题。"],
            ["Day 3", "拿一段真实文本，试一次改写、摘要或整理。"],
            ["Day 4", "在工作之外尝试一个生活场景，比如旅行或学习。"],
            ["Day 5", "对同一问题让 AI 给出 3 个方案，再练习选择。"],
            ["Day 6", "刻意追问和迭代，不停在第一轮输出。"],
            ["Day 7", "总结它最适合帮你做什么，不适合做什么。"],
          ].map(([day, body], index) => (
            <div key={day} className={`flex flex-col border-t border-white/12 pt-5 ${index % 2 === 1 ? "translate-y-6" : ""}`}>
              <div className="text-sm uppercase tracking-[0.24em] text-[#aab6ff]">{day}</div>
              <p className="mt-5 text-[1rem] leading-7 text-white/62">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}

function SlideResourcesAction() {
  return (
    <SlideFrame>
      <div className="relative flex h-full flex-col justify-between">
        <div>
          <div className="deck-kicker">Resources</div>
          <h2 className="deck-display mt-7 text-[clamp(3rem,5vw,5rem)] leading-[0.9]">课后不要继续刷推荐，而要沿着问题继续学</h2>
          <p className="mt-5 max-w-[36rem] text-[1.06rem] leading-8 text-white/66">
            更好的学习路径不是“再看十个推荐视频”，而是带着今天的框架回到自己的真实任务: 我到底想解决什么问题？我还缺哪类能力与资料？
          </p>
        </div>

        <div className="grid grid-cols-3 gap-10 border-t border-white/10 pt-8">
          {[
            ["继续认识入口", "先熟悉 1 到 2 个自己会高频打开的 AI 入口。"],
            ["继续练任务定义", "把最常见的小任务反复用更完整的结构重做。"],
            ["继续保留边界感", "任何关键内容都保留核验、引用和责任判断。"],
          ].map(([title, body]) => (
            <div key={title}>
              <div className="text-[1.7rem] font-medium tracking-[-0.04em] text-white">{title}</div>
              <p className="mt-3 text-[1rem] leading-7 text-white/58">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}

const slideDeck = [
  { id: "cover", label: "封面", section: "Opening", title: "AI 不是更强的搜索，而是新的任务接口", Component: SlideCover },
  { id: "audience-positioning", label: "受众定位", section: "Opening", title: "这门分享是给谁的", Component: SlideAudiencePositioning },
  { id: "four-questions", label: "三个目标", section: "Opening", title: "这次分享先回答三个问题", Component: SlideFourQuestions },
  { id: "search-vs-interface", label: "搜索 vs 交互", section: "What AI Is", title: "搜索 vs 交互界面", Component: SlideSearchVsInterface },
  { id: "task-shift", label: "定义任务", section: "What AI Is", title: "从找答案到定义任务", Component: SlideTaskShift },
  { id: "how-ai-works", label: "AI 工作原理", section: "What AI Is", title: "AI 如何工作", Component: SlideHowAIWorks },
  { id: "hallucination", label: "为什么会错", section: "What AI Is", title: "为什么 AI 会一本正经地出错", Component: SlideHallucination },
  { id: "why-now", label: "Why Now", section: "Change", title: "AI 已进入真实工作流", Component: SlideWhyNow },
  { id: "human-ai-roles", label: "人机分工", section: "Change", title: "最稳的人机分工", Component: SlideHumanAIRoles },
  { id: "capability-surface", label: "能力表面", section: "What AI Can Do", title: "AI 不再是单一能力", Component: SlideCapabilitySurface },
  { id: "product-layers", label: "生态四层", section: "What AI Can Do", title: "主流 AI 产品，不要当成一堆名字背", Component: SlideProductLayers },
  { id: "global-interfaces", label: "海外入口", section: "What AI Can Do", title: "海外主流入口长什么样", Component: SlideGlobalInterfaces },
  { id: "china-interfaces", label: "国内入口", section: "What AI Can Do", title: "国内用户真正常见的入口", Component: SlideChinaInterfaces },
  { id: "prompting", label: "提示词", section: "Practice", title: "提示词不是咒语，而是任务定义", Component: SlidePrompting },
  { id: "prompt-structure", label: "提示结构", section: "Practice", title: "一条高质量提示词通常包含这些部分", Component: SlidePromptStructure },
  { id: "demo-prompt-comparison", label: "演示对比", section: "Practice", title: "同一个任务，问法不同，结果差很多", Component: SlideDemoPromptComparison },
  { id: "workflow", label: "工作流", section: "Practice", title: "一个稳定的 AI 工作流", Component: SlideWorkflow },
  { id: "option-generation", label: "多方案", section: "Practice", title: "AI 很适合先帮你扩展选项池", Component: SlideOptionGeneration },
  { id: "work-life-surface", label: "生产生活", section: "Change", title: "AI 的价值不只在办公桌上", Component: SlideWorkLifeSurface },
  { id: "risk-boundary", label: "边界", section: "Boundary", title: "真正重要的是边界感", Component: SlideRiskBoundary },
  { id: "seven-day-plan", label: "7天上手", section: "Action", title: "如果只给普通学习者一条路，我会让他这样开始 7 天", Component: SlideSevenDayPlan },
  { id: "resources-action", label: "课后路径", section: "Action", title: "课后不要继续刷推荐，而要沿着问题继续学", Component: SlideResourcesAction },
  { id: "closing", label: "结尾", section: "Closing", title: "先把 AI 看成新的任务接口", Component: SlideClosing },
];

function DeckChrome({ currentSlide, navOpen, setNavOpen, goToSlide }) {
  return (
    <>
      <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between px-[clamp(1.5rem,2.8vw,3rem)] py-[clamp(1rem,2vh,1.5rem)]">
        <div className="deck-pill pointer-events-auto inline-flex items-center gap-3 rounded-full px-4 py-2 text-[0.72rem] uppercase tracking-[0.24em] text-white/62">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#6f83de] shadow-[0_0_10px_rgba(111,131,222,0.28)]" />
          AI Cognition Deck
        </div>

        <div className="pointer-events-auto flex items-center gap-3">
          <div className="deck-pill hidden rounded-full px-4 py-2 text-[0.72rem] uppercase tracking-[0.24em] text-white/48 md:inline-flex">
            {currentSlide + 1} / {slideDeck.length}
          </div>
          <button
            type="button"
            onClick={() => setNavOpen((value) => !value)}
            className="deck-pill rounded-full px-4 py-2 text-[0.72rem] uppercase tracking-[0.24em] text-white/62 transition hover:bg-white/8"
          >
            章节导航
          </button>
        </div>
      </header>

      {navOpen && (
        <aside className="absolute right-[clamp(1.5rem,2.8vw,3rem)] top-[5.4rem] z-40 w-[22rem] rounded-[2rem] border border-white/10 bg-[rgba(255,255,255,0.88)] p-5 shadow-[0_28px_60px_rgba(120,142,164,0.18)] backdrop-blur-2xl">
          <div className="mb-4 text-xs uppercase tracking-[0.28em] text-white/40">Jump To</div>
          <div className="space-y-2">
            {slideDeck.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(index)}
                className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition ${
                  currentSlide === index ? "bg-white/20 text-white" : "bg-transparent text-white/58 hover:bg-white/10"
                }`}
              >
                <span>
                  <span className="mr-3 text-xs uppercase tracking-[0.24em] text-white/32">{String(index + 1).padStart(2, "0")}</span>
                  {slide.label}
                </span>
                <span className="text-[0.68rem] uppercase tracking-[0.24em] text-white/30">{slide.section}</span>
              </button>
            ))}
          </div>
        </aside>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 px-[clamp(1.5rem,2.8vw,3rem)] pb-[clamp(1rem,2vh,1.5rem)]">
        <div className="flex items-center justify-between gap-6">
          <div className="pointer-events-auto deck-pill inline-flex items-center gap-4 rounded-full px-4 py-2 text-[0.72rem] uppercase tracking-[0.22em] text-white/48">
            <span>{slideDeck[currentSlide].section}</span>
            <span className="h-1 w-1 rounded-full bg-white/24" />
            <span>{slideDeck[currentSlide].title}</span>
          </div>

          <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-white/24 px-3 py-2 backdrop-blur-xl">
            {slideDeck.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`跳转到第 ${index + 1} 页`}
                className={`deck-progress-dot ${
                  currentSlide === index ? "scale-125 bg-[#6f83de] opacity-100" : "bg-[#93a3b8] opacity-60 hover:opacity-100"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => goToSlide(currentSlide - 1)}
        className="absolute left-0 top-0 z-20 h-full w-[12%] cursor-w-resize bg-transparent"
        aria-label="上一页"
      />
      <button
        type="button"
        onClick={() => goToSlide(currentSlide + 1)}
        className="absolute right-0 top-0 z-20 h-full w-[12%] cursor-e-resize bg-transparent"
        aria-label="下一页"
      />
    </>
  );
}
export default function App() {
  const [currentSlide, setCurrentSlide] = useState(() => getSlideIndexFromHash(slideDeck.length));
  const [navOpen, setNavOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);

  function goToSlide(nextSlide) {
    const target = clamp(nextSlide, 0, slideDeck.length - 1);
    setNavOpen(false);
    startTransition(() => {
      setCurrentSlide(target);
    });
  }

  useEffect(() => {
    const nextHash = `#${currentSlide + 1}`;
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, "", nextHash);
    }
  }, [currentSlide]);

  useEffect(() => {
    function handleHashChange() {
      setCurrentSlide(getSlideIndexFromHash(slideDeck.length));
    }

    function handleKeyDown(event) {
      if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
        event.preventDefault();
        goToSlide(currentSlide + 1);
      }

      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        goToSlide(currentSlide - 1);
      }

      if (event.key.toLowerCase() === "m") {
        event.preventDefault();
        setNavOpen((value) => !value);
      }
    }

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentSlide]);

  const CurrentSlide = slideDeck[currentSlide].Component;

  return (
    <div
      className="deck-root"
      onTouchStart={(event) => setTouchStartX(event.changedTouches[0].clientX)}
      onTouchEnd={(event) => {
        if (touchStartX === null) return;
        const delta = touchStartX - event.changedTouches[0].clientX;
        if (delta > 60) goToSlide(currentSlide + 1);
        if (delta < -60) goToSlide(currentSlide - 1);
        setTouchStartX(null);
      }}
    >
      <div className="deck-stage">
        <OrbitalBackdrop />
        <div key={slideDeck[currentSlide].id} className="relative z-10 h-full w-full deck-slide-enter">
          <CurrentSlide />
        </div>
        <DeckChrome currentSlide={currentSlide} navOpen={navOpen} setNavOpen={setNavOpen} goToSlide={goToSlide} />
      </div>
    </div>
  );
}
