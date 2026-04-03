import React, { useState, useEffect, useCallback } from 'react';

// ==========================================
// 1. 核心视觉组件 (Gemini 主题美学)
// ==========================================

const GeminiStar = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2C12 2 12 9.5 19.5 9.5C12 9.5 12 17 12 17C12 17 12 9.5 4.5 9.5C12 9.5 12 2 12 2Z" fill="url(#gemini-grad)" />
    <defs>
      <linearGradient id="gemini-grad" x1="4.5" y1="9.5" x2="19.5" y2="9.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#60A5FA" />
        <stop offset="0.5" stopColor="#C084FC" />
        <stop offset="1" stopColor="#F472B6" />
      </linearGradient>
    </defs>
  </svg>
);

const GlowingOrb = ({ color1, color2, delay, position }) => (
  <div className={`absolute rounded-full mix-blend-screen filter blur-[120px] animate-pulse ${position}`} 
       style={{ 
         background: `radial-gradient(circle, ${color1} 0%, ${color2} 100%)`,
         width: '45vw', height: '45vw',
         animationDuration: '10s',
         animationDelay: delay,
         opacity: 0.35
       }} 
  />
);

const GradientText = ({ children, className = "" }) => (
  <span className={`text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 ${className}`}>
    {children}
  </span>
);

const GridBackground = () => (
  <div className="absolute inset-0 z-0 opacity-[0.07]" 
       style={{ backgroundImage: 'radial-gradient(#9ca3af 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
);

// ==========================================
// 2. 页面模板组件
// ==========================================

const StatementSlide = ({ eyebrow, title, highlight, subtitle, children }) => (
  <div className="relative w-full h-full flex flex-col justify-center items-start p-24 lg:p-32 bg-[#0B0F19] text-white overflow-hidden">
    <GlowingOrb color1="#3b82f6" color2="#8b5cf6" delay="0s" position="top-[-20%] right-[-10%]" />
    <div className="z-10 flex flex-col gap-6 w-full max-w-6xl">
      {eyebrow && (
        <div className="flex items-center gap-4">
          <GeminiStar className="w-6 h-6"/>
          <span className="text-purple-400 font-mono tracking-widest text-sm uppercase">{eyebrow}</span>
        </div>
      )}
      <h1 className="text-5xl lg:text-6xl font-medium tracking-tight leading-tight text-slate-100">
        {title} {highlight && <GradientText>{highlight}</GradientText>}
      </h1>
      {subtitle && <p className="text-2xl lg:text-3xl text-slate-400 font-light mt-4 leading-relaxed border-l-2 border-purple-500/30 pl-8">{subtitle}</p>}
      <div className="mt-8">{children}</div>
    </div>
  </div>
);

// ==========================================
// 3. 核心定制页面 (Flagship Slides)
// ==========================================

const SlideCover = () => (
  <div className="relative w-full h-full flex flex-col justify-center items-start p-32 overflow-hidden bg-[#0B0F19] text-white">
    <GlowingOrb color1="#3b82f6" color2="#ec4899" delay="0s" position="top-[-10%] right-[-5%]" />
    <GlowingOrb color1="#8b5cf6" color2="#3b82f6" delay="3s" position="bottom-[-20%] left-[-10%]" />
    <GridBackground />
    
    <div className="absolute right-32 top-1/2 -translate-y-1/2 opacity-70">
      <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
        <circle cx="200" cy="200" r="199" stroke="url(#g1)" strokeWidth="1" strokeDasharray="4 12" className="animate-[spin_60s_linear_infinite]"/>
        <circle cx="200" cy="200" r="150" stroke="url(#g2)" strokeWidth="2" className="animate-[spin_40s_linear_infinite_reverse]"/>
        <path d="M200 20 L200 380 M20 200 L380 200" stroke="#fff" strokeOpacity="0.05" strokeWidth="1"/>
        <GeminiStar className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-90" />
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="400" y2="400"><stop stopColor="#60A5FA" /><stop offset="1" stopColor="#F472B6" /></linearGradient>
          <linearGradient id="g2" x1="400" y1="0" x2="0" y2="400"><stop stopColor="#C084FC" /><stop offset="1" stopColor="#60A5FA" /></linearGradient>
        </defs>
      </svg>
    </div>

    <div className="z-10 max-w-4xl flex flex-col gap-10">
      <div className="flex items-center gap-4">
        <div className="h-[2px] w-12 bg-blue-500"></div>
        <span className="text-blue-400 font-mono tracking-widest text-sm uppercase">Cognitive Upgrade Program</span>
      </div>
      <h1 className="text-7xl lg:text-8xl font-medium tracking-tighter leading-[1.1]">
        新时代的认知接口 <br/>
        <span className="text-4xl lg:text-5xl font-light text-slate-300 tracking-normal mt-4 block">不仅是工具，而是数字大脑</span>
      </h1>
      <div className="flex gap-8 mt-4 text-lg font-mono text-slate-400">
        <span># 思维升维</span>
        <span># 指令艺术</span>
        <span># 全能提效</span>
      </div>
    </div>
  </div>
);

const SlideSearchVsInterface = () => (
  <div className="relative w-full h-full flex flex-col p-24 lg:p-32 bg-[#0B0F19] text-white overflow-hidden">
    <div className="z-10 mb-16 flex justify-between items-end">
      <div>
        <h2 className="text-4xl lg:text-5xl font-medium tracking-tight mb-4">为什么 AI 不是更强的百度？</h2>
        <p className="text-xl lg:text-2xl text-slate-500 font-light">范式切换：从信息检索（找答案）到意图生成（下指令）。</p>
      </div>
      <GeminiStar className="w-12 h-12 opacity-50" />
    </div>

    <div className="flex-1 flex w-full relative z-10 gap-16 lg:gap-24">
      {/* 搜索 */}
      <div className="flex-1 flex flex-col items-start pr-8 relative border-r border-slate-800">
        <div className="text-slate-500 mb-6 flex items-center gap-4 text-xl font-mono tracking-widest uppercase">
          [ 过去的工具：搜索引擎 ]
        </div>
        <svg width="100%" height="120" className="mb-8 overflow-visible">
          <rect x="0" y="20" width="280" height="30" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1"/>
          <line x1="140" y1="50" x2="140" y2="80" stroke="#334155" strokeWidth="2" strokeDasharray="4 4"/>
          <rect x="0" y="80" width="280" height="8" fill="#334155"/>
          <rect x="0" y="100" width="220" height="8" fill="#334155"/>
          <rect x="0" y="120" width="260" height="8" fill="#334155"/>
        </svg>
        <h3 className="text-3xl font-medium text-slate-300 mb-4">给你链接，让你自己找</h3>
        <ul className="space-y-3 text-slate-500 text-lg leading-relaxed">
          <li>• 输入：明确的关键词</li>
          <li>• 过程：在已有数据库中匹配排序</li>
          <li>• 输出：静态网页的列表集合</li>
        </ul>
      </div>

      {/* AI 数字大脑 */}
      <div className="flex-1 flex flex-col items-start pl-8 relative">
        <GlowingOrb color1="#8b5cf6" color2="#3b82f6" delay="0s" position="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="text-purple-400 mb-6 flex items-center gap-4 text-xl font-mono tracking-widest uppercase relative z-10">
          [ 现在的伙伴：数字大脑 ]
        </div>
        <svg width="100%" height="120" className="mb-8 overflow-visible relative z-10">
          <circle cx="140" cy="60" r="24" fill="url(#purpleGrad)" className="animate-pulse"/>
          <path d="M140 60 Q 40 10 0 20" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeOpacity="0.5" className="animate-[dash_3s_linear_infinite] [stroke-dasharray:10,10]"/>
          <path d="M140 60 Q 240 10 280 20" fill="none" stroke="#ec4899" strokeWidth="2" strokeOpacity="0.5" className="animate-[dash_3s_linear_infinite] [stroke-dasharray:10,10]"/>
          <path d="M140 60 Q 40 110 0 100" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeOpacity="0.5" className="animate-[dash_3s_linear_infinite] [stroke-dasharray:10,10]"/>
          <path d="M140 60 Q 240 110 280 100" fill="none" stroke="#ec4899" strokeWidth="2" strokeOpacity="0.5" className="animate-[dash_3s_linear_infinite] [stroke-dasharray:10,10]"/>
          <defs>
            <radialGradient id="purpleGrad"><stop offset="0%" stopColor="#a855f7"/><stop offset="100%" stopColor="#3b82f6"/></radialGradient>
          </defs>
        </svg>
        <h3 className="text-3xl font-medium text-white mb-4">给你起点，为你做任务</h3>
        <ul className="space-y-3 text-slate-300 text-lg leading-relaxed relative z-10">
          <li>• 输入：模糊的需求与意图描述</li>
          <li>• 过程：根据上下文进行逻辑推理与生成</li>
          <li>• 输出：直接呈现提炼好的专属结果或草稿</li>
        </ul>
      </div>
    </div>
  </div>
);

const SlideHowAIWorks = () => (
  <div className="relative w-full h-full flex flex-col p-24 lg:p-32 bg-[#0B0F19] text-white overflow-hidden">
    <GridBackground />
    <div className="z-10 mb-12">
      <h2 className="text-4xl lg:text-5xl font-medium tracking-tight mb-4">AI 究竟是如何“思考”的？</h2>
      <p className="text-xl lg:text-2xl text-slate-500 font-light">并非拥有灵魂，而是基于极其庞大的语料库进行“下一个词的概率预测”。</p>
    </div>

    <div className="flex-1 flex flex-col items-center justify-center relative w-full">
      <div className="w-full max-w-6xl relative z-10 flex items-center justify-between">
        
        {/* 输入 */}
        <div className="flex flex-col items-center gap-4 w-1/4">
          <div className="text-slate-500 font-mono text-xs tracking-widest uppercase">1. 上下文输入 (Prompt)</div>
          <div className="w-full p-6 border-l-4 border-blue-500 bg-slate-900/80 backdrop-blur-sm">
            <span className="text-xl text-slate-300">“落霞与孤鹜齐飞，”</span>
          </div>
          <div className="text-xs text-slate-600 mt-1">转化为机器识别的 Token</div>
        </div>

        {/* 神经网络 */}
        <div className="flex-1 flex flex-col items-center justify-center relative px-8">
          <svg width="100%" height="160" viewBox="0 0 400 160" className="overflow-visible">
            {[60, 140, 220, 300, 380].map((x, colIdx) => (
              <g key={`col-${colIdx}`}>
                {[30, 80, 130].map((y, rowIdx) => (
                   colIdx < 4 && <path key={`path-${colIdx}-${rowIdx}`} d={`M${x} ${y} L${x+80} 30 M${x} ${y} L${x+80} 80 M${x} ${y} L${x+80} 130`} stroke="#334155" strokeWidth="1" strokeOpacity="0.6" />
                ))}
                {[30, 80, 130].map((y, rowIdx) => (
                  <circle key={`node-${colIdx}-${rowIdx}`} cx={x} cy={y} r="4" fill={colIdx === 0 || colIdx === 4 ? "#64748b" : "#8b5cf6"} className={colIdx > 0 && colIdx < 4 ? "animate-pulse" : ""} style={{ animationDelay: `${colIdx * 0.2}s`}}/>
                ))}
              </g>
            ))}
            <path d="M60 80 L140 130 L220 30 L300 80 L380 80" fill="none" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="animate-[dash_2s_linear_infinite] [stroke-dasharray:10,20] drop-shadow-[0_0_12px_rgba(168,85,247,0.8)]"/>
          </svg>
          <div className="mt-6 text-purple-400 font-mono tracking-widest text-xs uppercase border border-purple-900/50 bg-purple-950/30 px-6 py-2 rounded-full">
            2. 模式匹配与概率计算 (Transformer)
          </div>
        </div>

        {/* 输出 */}
        <div className="flex flex-col items-center gap-4 w-1/4">
          <div className="text-slate-500 font-mono text-xs tracking-widest uppercase">3. 概率预测 (Prediction)</div>
          <div className="flex flex-col items-center gap-3 w-full bg-slate-900/50 p-4 rounded-lg">
             <div className="w-full flex justify-between items-center text-base">
               <span className="text-white">秋水</span>
               <span className="text-blue-400 font-mono">98.5%</span>
             </div>
             <div className="w-full h-1.5 bg-slate-800 rounded overflow-hidden"><div className="h-full bg-blue-500 w-[98.5%]"></div></div>
             
             <div className="w-full flex justify-between items-center text-xs opacity-50 mt-1">
               <span className="text-white">晚霞</span>
               <span className="text-slate-400 font-mono">1.2%</span>
             </div>
          </div>
          <div className="text-2xl text-white font-medium mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">“秋水共长天一色”</div>
        </div>

      </div>
    </div>
  </div>
);

const SlidePromptStructure = () => (
  <div className="relative w-full h-full flex flex-col justify-center items-center p-24 lg:p-32 bg-[#0B0F19] text-white overflow-hidden">
    <GlowingOrb color1="#8b5cf6" color2="#3b82f6" delay="1s" position="top-[-10%] right-[-10%]" />
    
    <div className="w-full max-w-6xl z-10">
      <h2 className="text-4xl lg:text-5xl font-medium tracking-tight mb-4">掌握“万能咒语”</h2>
      <p className="text-xl text-slate-400 mb-16 border-l-2 border-purple-500 pl-4">提示词不是玄学，而是清晰的<GradientText>任务管理</GradientText>。如何让输出从60分变成95分？</p>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "背景 Context", desc: "你是谁？给谁看？事情的起因是什么？", icon: "🌐" },
          { title: "角色 Persona", desc: "你是顶尖文案？还是资深数据分析师？", icon: "🎭" },
          { title: "任务 Task", desc: "具体要做什么？写大纲、总结还是翻译？", icon: "🎯" },
          { title: "标准 Standard", desc: "语气要严肃还是幽默？逻辑要严密？", icon: "📏" },
          { title: "约束 Constraint", desc: "字数限制？不能使用哪些词汇？", icon: "🚫" },
          { title: "格式 Format", desc: "输出为Markdown、表格还是HTML？", icon: "📝" },
          { title: "例子 Example", desc: "（进阶）提供一个你喜欢的参考样例", icon: "💡" },
          { title: "迭代 Iterate", desc: "根据初稿不断追问、要求其修改细节", icon: "🔄" },
        ].map((item, idx) => (
          <div key={idx} className="bg-slate-900/60 border border-slate-800 p-6 rounded-xl hover:border-purple-500/50 transition-colors">
            <div className="text-3xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-medium text-slate-200 mb-2">{item.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SlideEfficiency = () => (
  <div className="relative w-full h-full flex flex-col p-24 lg:p-32 bg-[#0B0F19] text-white overflow-hidden">
    <div className="z-10 mb-12">
      <h2 className="text-4xl lg:text-5xl font-medium tracking-tight mb-4">全能提效：重塑工作流</h2>
      <p className="text-xl text-slate-400">瞬间处理原本耗时数小时的枯燥任务，释放你的核心生产力。</p>
    </div>

    <div className="flex-1 grid grid-cols-3 gap-8 z-10 w-full max-w-6xl mx-auto">
      {/* 场景1：文案 */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-8 rounded-2xl flex flex-col relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/50"></div>
        <h3 className="text-2xl font-medium mb-6 text-white flex items-center gap-3"><span className="text-blue-400">✍️</span> 文案撰写</h3>
        <div className="flex-1 space-y-6 text-base">
          <div>
            <div className="text-xs font-mono text-slate-500 uppercase mb-1">Before (耗时2小时)</div>
            <div className="text-slate-400">到处搜集资料，对着空白文档发呆，憋不出一句话。</div>
          </div>
          <div>
            <div className="text-xs font-mono text-blue-400 uppercase mb-1">AI 时代 (耗时5分钟)</div>
            <div className="text-slate-200">输入核心诉求，<GradientText>30秒生成多风格初稿</GradientText>，人类只需做选择和微调。</div>
          </div>
        </div>
      </div>

      {/* 场景2：数据报表 */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-8 rounded-2xl flex flex-col relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-purple-500/50"></div>
        <h3 className="text-2xl font-medium mb-6 text-white flex items-center gap-3"><span className="text-purple-400">📊</span> 数据报表</h3>
        <div className="flex-1 space-y-6 text-base">
          <div>
            <div className="text-xs font-mono text-slate-500 uppercase mb-1">Before (耗时半天)</div>
            <div className="text-slate-400">手动清洗数据，背诵复杂的Excel函数公式，调整图表格式。</div>
          </div>
          <div>
            <div className="text-xs font-mono text-purple-400 uppercase mb-1">AI 时代 (耗时1分钟)</div>
            <div className="text-slate-200">直接把Excel喂给大模型，下指令：“帮我分析季度环比趋势，并生成图表”。</div>
          </div>
        </div>
      </div>

      {/* 场景3：PPT构思 */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-8 rounded-2xl flex flex-col relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-pink-500/50"></div>
        <h3 className="text-2xl font-medium mb-6 text-white flex items-center gap-3"><span className="text-pink-400">🎯</span> PPT 构思</h3>
        <div className="flex-1 space-y-6 text-base">
          <div>
            <div className="text-xs font-mono text-slate-500 uppercase mb-1">Before (耗时数天)</div>
            <div className="text-slate-400">想逻辑大纲，到处找模板，痛苦地排版对齐。</div>
          </div>
          <div>
            <div className="text-xs font-mono text-pink-400 uppercase mb-1">AI 时代 (耗时3分钟)</div>
            <div className="text-slate-200">利用 AI 先拉出逻辑框架，通过Gamma等工具<GradientText>一键生成排版良好的初稿</GradientText>。</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SlideEcosystem = () => (
  <div className="relative w-full h-full flex flex-col justify-center items-center p-24 lg:p-32 bg-[#0B0F19] text-white overflow-hidden">
    <div className="w-full max-w-6xl z-10">
      <h2 className="text-4xl lg:text-5xl font-medium tracking-tight mb-4 text-center">主流 AI 产品业态全景图</h2>
      <p className="text-xl text-slate-400 mb-12 text-center">理解四层架构，按需选择，不盲目焦虑。</p>
      
      <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto">
        {/* Layer 4 */}
        <div className="flex bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden group hover:border-pink-500/50 transition-colors">
          <div className="w-40 bg-slate-800/80 p-6 flex flex-col justify-center items-center border-r border-slate-700">
            <span className="text-pink-400 font-mono text-sm font-bold tracking-widest uppercase">Layer 04</span>
            <span className="text-white font-medium mt-1">垂直应用</span>
          </div>
          <div className="flex-1 p-6 flex items-center">
            <div className="text-slate-300">
              <span className="font-medium text-white">解决特定场景的工具：</span> Gamma (一键PPT)、Cursor (辅助写代码)、Midjourney (专业级画图)、妙鸭相机 (人像摄影)...
            </div>
          </div>
        </div>

        {/* Layer 3 */}
        <div className="flex bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden group hover:border-purple-500/50 transition-colors">
          <div className="w-40 bg-slate-800/80 p-6 flex flex-col justify-center items-center border-r border-slate-700">
            <span className="text-purple-400 font-mono text-sm font-bold tracking-widest uppercase">Layer 03</span>
            <span className="text-white font-medium mt-1">平台/入口</span>
          </div>
          <div className="flex-1 p-6 flex items-center">
            <div className="text-slate-300">
              <span className="font-medium text-white">普通人接触最多的超级APP：</span> ChatGPT, Kimi, 字节豆包, 秘塔AI搜索, Coze (扣子-自己搭机器人)...
            </div>
          </div>
        </div>

        {/* Layer 2 */}
        <div className="flex bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden group hover:border-blue-500/50 transition-colors">
          <div className="w-40 bg-slate-800/80 p-6 flex flex-col justify-center items-center border-r border-slate-700">
            <span className="text-blue-400 font-mono text-sm font-bold tracking-widest uppercase">Layer 02</span>
            <span className="text-white font-medium mt-1">大模型基座</span>
          </div>
          <div className="flex-1 p-6 flex items-center">
            <div className="text-slate-300">
              <span className="font-medium text-white">真正懂逻辑的“大脑”：</span> GPT-4o, Claude 3.5, Google Gemini, 智谱GLM, 百度文心一言... (通常通过Layer3访问)
            </div>
          </div>
        </div>

        {/* Layer 1 */}
        <div className="flex bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden group hover:border-slate-500/50 transition-colors">
          <div className="w-40 bg-slate-800/80 p-6 flex flex-col justify-center items-center border-r border-slate-700">
            <span className="text-slate-400 font-mono text-sm font-bold tracking-widest uppercase">Layer 01</span>
            <span className="text-white font-medium mt-1">算力基建</span>
          </div>
          <div className="flex-1 p-6 flex items-center">
            <div className="text-slate-400 text-sm">
              <span className="font-medium text-slate-300">提供计算资源的底座（离普通用户较远）：</span> NVIDIA (英伟达显卡), 阿里云, 微软 Azure, AWS...
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ==========================================
// 4. 数据层：全部干货幻灯片及讲师备注
// ==========================================

const slideData = [
  {
    id: 1,
    Component: SlideCover,
    notes: { start: "大家好，今天我们来重新认识一下AI。这不是一堂枯燥的技术课，而是一场认知升级。", key: "重点：这三个标签，思维升维、指令艺术、全能提效，是我们今天的三大核心板块。", transition: "首先，我们来看看为什么要花时间了解AI？" }
  },
  {
    id: 2,
    Component: () => <StatementSlide eyebrow="Goal" title="为什么你必须了解 AI？" subtitle="不是为了应付KPI，而是看清未来十年生产力爆发的方向。了解什么是AI、它能做什么、它正在如何改变我们的生活。"><ul className="text-2xl text-slate-300 space-y-4 font-light ml-8"><li>• 消除恐惧：它不会凭空抢走工作，只会淘汰不会用工具的人。</li><li>• 抓住红利：普通人第一次拥有了廉价配置“超级团队”的机会。</li></ul></StatementSlide>,
    notes: { start: "很多同事可能觉得，我的工作不需要写代码，不用学AI。", key: "重点：消除恐惧，抓住红利。AI正在成为像Word、Excel一样的基础设施。", transition: "但在用它之前，我们需要先纠正一个最大的误区。" }
  },
  {
    id: 3,
    Component: SlideSearchVsInterface,
    notes: { start: "很多人抱怨AI不好用，是因为他们把AI当成了加强版的百度。", key: "重点：搜索是给你链接让你自己看；AI是理解你的意图，直接帮你生成结果。从‘找答案’变成了‘下指令’。", transition: "那它为什么能直接帮我们做任务呢？我们简单看看它的原理。" }
  },
  {
    id: 4,
    Component: SlideHowAIWorks,
    notes: { start: "别害怕，我们不讲复杂的代码。你可以把大模型理解为一个阅读量巨大、直觉超强的文科生。", key: "重点：它不是真的有灵魂在思考，而是在算概率——预测下一个最合适的词。正因如此，它也会犯错（也就是幻觉）。", transition: "既然它是预测，那么什么决定了它预测的准不准呢？" }
  },
  {
    id: 5,
    Component: () => (
      <div className="w-full h-full flex flex-col justify-center items-center p-24 bg-[#0B0F19] text-white text-center">
        <h2 className="text-5xl lg:text-6xl font-medium mb-12"><GradientText>上下文</GradientText> 决定输出轨道</h2>
        <p className="text-2xl text-slate-300 max-w-3xl leading-relaxed">
          你输入的不是一句话，而是一段<span className="font-bold text-white border-b-2 border-pink-500">跑道</span>。<br/><br/>给的信息越模糊，它的预测就越随意（容易胡说八道）；给的上下文越清晰，它跑出的结果就越惊艳。
        </p>
      </div>
    ),
    notes: { start: "你给它的话，学术上叫 Prompt（提示词）。", key: "上下文决定轨道。你给的信息越明确，它的预测就越精准。", transition: "这就是为什么，AI时代提问的能力比答案更重要。" }
  },
  {
    id: 6,
    Component: () => <StatementSlide title="为什么 AI 时代，" highlight="“提问的能力”比“答案”更值钱？" subtitle="当获取标准答案的成本无限趋近于零，决定人与人差距的，是你提出好问题的能力。"><div className="flex gap-12 mt-8 text-xl"><div className="border border-slate-700 p-6 rounded-lg bg-slate-900/50"><div className="text-blue-400 mb-2">普通人</div>问：“怎么写年终总结？” → 得到通用废话。</div><div className="border border-purple-500/50 p-6 rounded-lg bg-purple-900/20"><div className="text-purple-400 mb-2">高手</div>问：“我是销售，业绩超额20%但客户投诉上升，如何写一份扬长避短的汇报大纲？” → 得到极品策略。</div></div></StatementSlide>,
    notes: { start: "以前是会背标准答案的人厉害，以后是会提问的人厉害。", key: "展示这两个问法的差距。答案不稀缺了，高质量的问题才稀缺。", transition: "那么，怎么提出高质量的问题呢？这里有个万能咒语。" }
  },
  {
    id: 7,
    Component: SlidePromptStructure,
    notes: { start: "如果你觉得AI给你的回复像机器人，大概率是你少给了这几个要素。", key: "重点讲：背景、角色、任务这三个是最核心的。交代清楚你是谁、你想干嘛、标准是什么，它就能从60分变95分。", transition: "我们来看个具体的对比案例。" }
  },
  {
    id: 8,
    Component: () => (
      <div className="w-full h-full flex flex-col p-24 lg:p-32 bg-[#0B0F19] text-white">
        <h2 className="text-4xl lg:text-5xl mb-12">普通指令 vs 优化指令 (结构化魔力)</h2>
        <div className="flex-1 flex gap-8">
          <div className="flex-1 bg-slate-900/50 p-10 border border-slate-800 font-mono text-lg text-slate-400 leading-relaxed rounded-xl">
            <span className="text-sm font-sans text-slate-500 uppercase tracking-widest block mb-4">普通人输入：</span>
            "帮我写一个新产品上线的公众号文章。"
            <div className="mt-8 pt-8 border-t border-slate-800 text-sm italic opacity-50">输出结果：长篇大论，空洞无物，全是废话套话。</div>
          </div>
          <div className="flex-[1.5] bg-slate-900 p-10 border border-purple-500/30 font-mono text-lg text-slate-200 leading-relaxed space-y-4 rounded-xl relative">
             <div className="absolute top-0 right-0 p-4 opacity-20"><GeminiStar /></div>
            <span className="text-sm font-sans text-purple-400 uppercase tracking-widest block mb-4">高手输入：</span>
            <p><span className="text-purple-400">【背景】</span>我们是一款面向大学生的 AI 笔记工具，下周发布 2.0 版。</p>
            <p><span className="text-purple-400">【角色】</span>你是一个懂互联网梗、风格轻松的自媒体运营。</p>
            <p><span className="text-purple-400">【任务】</span>写一篇推文初稿，重点突出“语音转思维导图”功能。</p>
            <p><span className="text-purple-400">【格式】</span>字数800字，多用短句，分段清晰，带表情符号。</p>
          </div>
        </div>
      </div>
    ),
    notes: { start: "大家看左边，如果是你收到这个要求，你会怎么写？懵吧。", key: "右边把要素补齐了，给AI框定了极度明确的跑道，输出的结果通常可以直接用作初稿。", transition: "掌握了这个咒语，我们能在哪些地方全能提效？" }
  },
  {
    id: 9,
    Component: SlideEfficiency,
    notes: { start: "AI最大的价值就是瞬间处理那些耗时的枯燥任务。", key: "给大家讲几个工作流被重塑的场景：文案一键生成、报表秒懂、PPT生成大纲。注意，它擅长的是从0到1。", transition: "但是，它帮你出了初稿，不代表你的工作就结束了。" }
  },
  {
    id: 10,
    Component: () => (
      <div className="w-full h-full flex flex-col justify-center p-24 lg:p-32 bg-[#0B0F19] text-white">
        <h2 className="text-5xl lg:text-6xl font-medium mb-12">AI 负责生成选项，<br/><GradientText>人类负责审美与决策</GradientText></h2>
        <div className="flex items-center gap-12 mt-8">
           <div className="flex-1 bg-slate-900/50 border border-slate-800 p-8 rounded-xl text-slate-400">
             <h3 className="text-xl text-slate-300 mb-4 border-b border-slate-700 pb-2">AI 拉开可能性</h3>
             <ul className="space-y-2"><li>• 瞬间生成 10 个活动标题</li><li>• 写出 3 版不同语气的邮件</li><li>• 画出 5 种不同配色的海报</li></ul>
           </div>
           <div className="text-4xl text-slate-600">→</div>
           <div className="flex-1 bg-purple-900/20 border border-purple-500/50 p-8 rounded-xl text-white">
             <h3 className="text-xl text-purple-300 mb-4 border-b border-purple-800 pb-2">人类收束方向</h3>
             <ul className="space-y-2"><li>• <span className="text-purple-400 font-bold">品味：</span>哪一版最符合品牌调性？</li><li>• <span className="text-purple-400 font-bold">事实：</span>其中是否存在捏造的数据？</li><li>• <span className="text-purple-400 font-bold">拍板：</span>最终选用哪个方案并承担责任？</li></ul>
           </div>
        </div>
      </div>
    ),
    notes: { start: "AI能给你N个选项，但最终定稿的必须是你。", key: "重点强调：人的审美和决策能力在AI时代不仅没有贬值，反而更重要了！", transition: "除了工作，AI在日常生活中也有巨大的红利。" }
  },
  {
    id: 11,
    Component: () => (
      <div className="relative w-full h-full flex flex-col p-24 lg:p-32 bg-[#0B0F19] text-white overflow-hidden">
        <h2 className="text-4xl lg:text-5xl font-medium mb-12">生活红利：你的全能私教与助理</h2>
        <div className="grid grid-cols-2 gap-8 z-10 w-full max-w-5xl">
           <div className="p-6 border border-slate-800 rounded-lg bg-slate-900/40">
             <div className="text-2xl mb-2">🌍 旅游规划师</div>
             <p className="text-slate-400 text-base">丢给它几篇长长的马蜂窝攻略，命令它：“提取核心景点，按顺路程度为我排一个3天2夜带有预算和地图的行程表。”</p>
           </div>
           <div className="p-6 border border-slate-800 rounded-lg bg-slate-900/40">
             <div className="text-2xl mb-2">🏥 医疗/财报翻译官</div>
             <p className="text-slate-400 text-base">看不懂密密麻麻的体检报告指标？让AI扮演医生：“请用高中生能听懂的语言，告诉我这项指标偏高的影响及建议。”</p>
           </div>
           <div className="p-6 border border-slate-800 rounded-lg bg-slate-900/40">
             <div className="text-2xl mb-2">🗣️ 外语私教老师</div>
             <p className="text-slate-400 text-base">使用语音模式，设定指令：“扮演一名严格的雅思考官，指出我的语法错误，并用苏格拉底的方式引导我用英语回答。”</p>
           </div>
           <div className="p-6 border border-slate-800 rounded-lg bg-slate-900/40">
             <div className="text-2xl mb-2">🏋️ 健身饮食顾问</div>
             <p className="text-slate-400 text-base">“我身高175体重80kg，想在三个月内减脂10斤，平时只能在家用哑铃，请帮我出一份每周练3休1的课表及饮食方案。”</p>
           </div>
        </div>
      </div>
    ),
    notes: { start: "很多时候大家下班了就不想碰AI了，其实它能让你的生活更有质感。", key: "举例旅游、医疗翻译、外语私教。它是个免费的、不知疲倦的专家。", transition: "听起来很棒，那我们现在到底该用什么工具呢？" }
  },
  {
    id: 12,
    Component: SlideEcosystem,
    notes: { start: "现在市面上每天都有新AI出来，大家觉得很乱。", key: "帮大家梳理了这四层架构：算力基建、大模型（大脑）、平台入口、垂直应用。普通人重点关注 Layer 3 的大平台就可以了。", transition: "面对这么多工具，我们上手的原则是什么？" }
  },
  {
    id: 13,
    Component: () => <StatementSlide title="开始行动的原则：" highlight="不要一上来就追最新、最难的。" subtitle="先找一个高频小痛点试水（比如每天要写的汇报），用最顺手的工具（比如微信里的小程序接入的豆包/Kimi）。先开始，不必先完美。"><div className="mt-8 flex items-center gap-4 text-2xl"><span className="text-slate-500">门槛低</span> <span className="text-slate-600">→</span> <span className="text-slate-400">场景高频</span> <span className="text-slate-600">→</span> <span className="text-blue-400">带来正反馈</span></div></StatementSlide>,
    notes: { start: "最后给一点实操建议。", key: "不要去死磕复杂的专业工具，先用简单的对话机器人解决一个小痛点，获得正反馈。", transition: "给大家留一个课后作业。" }
  },
  {
    id: 14,
    Component: () => (
      <div className="w-full h-full flex flex-col justify-center items-center p-24 bg-[#0B0F19] text-white text-center">
        <GeminiStar className="w-16 h-16 mb-8" />
        <h2 className="text-6xl lg:text-7xl font-bold mb-8 tracking-tight">AI 无法取代真正有思想的人，<br/>但会淘汰不会使用它的人。</h2>
        <p className="text-2xl text-slate-400 font-light mt-4">当算力无限释放，你大脑里的<GradientText>方向感</GradientText>将是你最宝贵的资产。</p>
      </div>
    ),
    notes: { start: "分享的尾声，送给大家一句话。", key: "不要把AI当成对手，把它当成杠杆。方向感和判断力才是你最重要的资产。", transition: "谢谢大家！我们进入Q&A环节。" }
  },
  {
    id: 15,
    Component: () => (
      <div className="w-full h-full flex flex-col p-24 lg:p-32 bg-[#0B0F19] text-white overflow-hidden">
        <h2 className="text-4xl font-mono text-blue-400 mb-12">Q & A</h2>
        <div className="grid grid-cols-2 gap-x-16 gap-y-12 flex-1 text-lg lg:text-xl">
          <div>
            <h3 className="text-xl font-medium mb-3 text-white">Q: 我不会写提示词怎么办？要报班吗？</h3>
            <p className="text-slate-400 leading-relaxed text-base">不需要神化提示词。就把AI当成一个极其聪明但完全不了解你公司业务的实习生，把背景、任务要求（大白话）说清楚就能超过80%的人。</p>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-3 text-white">Q: AI 给的数据经常是编的，怎么防范？</h3>
            <p className="text-slate-400 leading-relaxed text-base">AI 本质是“概率预测模型”，它确实会产生“幻觉”。最佳实践是：让 AI 做思路发散、大纲生成、翻译润色；涉及关键数据、医学、法律决策时，必须人工交叉验证。</p>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-3 text-white">Q: 如果我的工作不需要写方案，AI还有用吗？</h3>
            <p className="text-slate-400 leading-relaxed text-base">当然。它可以是你的外语私教、旅行规划师、看长视频/长文章的总结助手。习惯了它的陪伴，你的信息获取效率会产生质变。</p>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-3 text-white">Q: 这么多大模型，我用哪个好？</h3>
            <p className="text-slate-400 leading-relaxed text-base">国内日常办公和搜索推荐用 Kimi 或 豆包；需要极强逻辑推理或代码编写可以尝试 Claude 3.5 或 GPT-4o。没有绝对的最好，只有最适合当前任务的工具。</p>
          </div>
        </div>
      </div>
    ),
    notes: { start: "准备了几个大家最常问的问题备用。", key: "核心态度：拥抱工具，保持批判性思维。", transition: "本次分享正式结束。" }
  }
];

// ==========================================
// 5. 引擎逻辑 (讲师提词器功能增强)
// ==========================================

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotes, setShowNotes] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev < slideData.length - 1 ? prev + 1 : prev));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') nextSlide();
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') prevSlide();
      else if (e.key === 'n' || e.key === 'N') setShowNotes(prev => !prev);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const [touchStart, setTouchStart] = useState(null);
  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
    setTouchStart(null);
  };

  const CurrentSlideComponent = slideData[currentSlide].Component;
  const currentNotes = slideData[currentSlide].notes;

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center overflow-hidden font-sans selection:bg-purple-500 selection:text-white"
         onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      
      {/* 16:9 演示容器 - 使用响应式策略确保内容不溢出 */}
      <div className="relative w-full max-w-[1920px] aspect-video bg-[#0B0F19] shadow-2xl overflow-hidden flex flex-col text-[14px] md:text-[16px] xl:text-[18px]"
           style={{ boxShadow: '0 0 100px rgba(0,0,0,0.8)' }}>
        
        {/* 页面内容 */}
        <div key={currentSlide} className="flex-1 w-full h-full animate-[fadeIn_0.5s_ease-out] relative">
          <CurrentSlideComponent />
        </div>

        {/* 底部 UI */}
        <div className="absolute bottom-6 left-0 w-full flex justify-between px-12 items-center mix-blend-difference text-white opacity-40 z-50 pointer-events-none">
          <div className="flex gap-4 items-center">
             <div className="font-mono text-xs tracking-widest uppercase">AI Cognitive Upgrade Program</div>
             <button onClick={() => setShowNotes(!showNotes)} className="px-2 py-1 border border-white/30 rounded text-xs hover:bg-white/20 transition cursor-pointer pointer-events-auto">
                [ 备注(N) ]
             </button>
          </div>
          <div className="font-mono text-xs">{currentSlide + 1} / {slideData.length}</div>
        </div>

        {/* 讲师提词器面板 (浮层) */}
        {showNotes && (
          <div className="absolute bottom-16 left-12 w-[600px] max-w-[80vw] bg-slate-900/95 backdrop-blur-xl border border-slate-700 p-6 rounded-xl shadow-2xl z-[100] animate-[slideUp_0.2s_ease-out] text-slate-200">
            <h4 className="text-purple-400 font-mono text-sm mb-4 border-b border-slate-700 pb-2">实战讲稿提示 (页面 {currentSlide + 1})</h4>
            <div className="space-y-4 text-base">
              {currentNotes?.start && <div><span className="text-blue-400 font-bold mr-2">开头:</span>{currentNotes.start}</div>}
              {currentNotes?.key && <div><span className="text-pink-400 font-bold mr-2">干货:</span>{currentNotes.key}</div>}
              {currentNotes?.transition && <div><span className="text-slate-400 font-bold mr-2">过渡:</span>{currentNotes.transition}</div>}
            </div>
            <div className="mt-4 pt-2 border-t border-slate-800 text-xs text-slate-500 text-right">按 'N' 键隐藏</div>
          </div>
        )}

        {/* 左右点击区域 (翻页) */}
        <div className="absolute top-0 left-0 w-[15%] h-full cursor-pointer z-40 hover:bg-white/5 transition-colors" onClick={prevSlide}></div>
        <div className="absolute top-0 right-0 w-[15%] h-full cursor-pointer z-40 hover:bg-white/5 transition-colors" onClick={nextSlide}></div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes dash { to { stroke-dashoffset: -30; } }
      `}} />
    </div>
  );
}