import Reveal from "/vendor/reveal/reveal.mjs";
import RevealNotes from "/vendor/reveal/plugin/notes.mjs";

const deck = new Reveal({
  hash: true,
  controls: true,
  progress: true,
  center: false,
  width: 1440,
  height: 810,
  margin: 0.04,
  transition: "fade",
  plugins: [RevealNotes],
});

async function initDeck() {
  await deck.initialize();

  const navToggle = document.querySelector("#section-nav-toggle");
  const navPanel = document.querySelector("#section-nav");
  const navButtons = document.querySelectorAll("[data-slide-index]");

  navToggle?.addEventListener("click", () => {
    const hidden = navPanel?.hasAttribute("hidden");
    if (hidden) {
      navPanel?.removeAttribute("hidden");
    } else {
      navPanel?.setAttribute("hidden", "");
    }
  });

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const rawIndex = button.getAttribute("data-slide-index");
      if (!rawIndex) return;
      deck.slide(Number(rawIndex));
      navPanel?.setAttribute("hidden", "");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() === "m") {
      const hidden = navPanel?.hasAttribute("hidden");
      if (hidden) {
        navPanel?.removeAttribute("hidden");
      } else {
        navPanel?.setAttribute("hidden", "");
      }
    }
  });

  initLayoutTuner();
  initCanvasDiagrams();
}

function initLayoutTuner() {
  const storageKey = "slides-layout-tuner-v2";
  const defaults = {
    titleScale: "0.95",
    bodyScale: "0.96",
    spaceScale: "0.86",
    titleLineHeight: "1.1",
    topbarScale: "0.92",
  };

  const saved = JSON.parse(localStorage.getItem(storageKey) || "null") || defaults;
  applyTuning(saved);

  const tuner = document.createElement("aside");
  tuner.className = "layout-tuner";
  tuner.hidden = true;
  tuner.innerHTML = `
    <div class="layout-tuner__head">
      <strong>Layout Tuner</strong>
      <button type="button" data-tuner-close>关闭</button>
    </div>
    <div class="layout-tuner__rows">
      <label>标题缩放 <input data-var="titleScale" type="range" min="0.8" max="1.15" step="0.01" value="${saved.titleScale}" /></label>
      <label>正文缩放 <input data-var="bodyScale" type="range" min="0.85" max="1.1" step="0.01" value="${saved.bodyScale}" /></label>
      <label>间距缩放 <input data-var="spaceScale" type="range" min="0.82" max="1.05" step="0.01" value="${saved.spaceScale}" /></label>
      <label>标题行高 <input data-var="titleLineHeight" type="range" min="1.02" max="1.18" step="0.01" value="${saved.titleLineHeight}" /></label>
      <label>顶栏缩放 <input data-var="topbarScale" type="range" min="0.85" max="1.05" step="0.01" value="${saved.topbarScale}" /></label>
    </div>
    <div class="layout-tuner__actions">
      <button type="button" data-tuner-reset>恢复默认</button>
      <button type="button" data-tuner-compact>更紧凑</button>
      <button type="button" data-tuner-copy>复制 CSS</button>
    </div>
    <div class="layout-tuner__hint">Shift+T 打开或关闭。常用做法是先拖滑块，再把当前值复制回 src/styles/slides-tokens.css 或 src/styles/slides-overrides.css。</div>
    <pre data-tuner-snippet></pre>
  `;

  document.body.appendChild(tuner);

  const persist = () => {
    const next = Object.fromEntries(
      [...tuner.querySelectorAll("input[data-var]")].map((input) => [input.dataset.var, input.value]),
    );
    localStorage.setItem(storageKey, JSON.stringify(next));
    applyTuning(next);
    renderSnippet(tuner, next);
  };

  tuner.querySelectorAll("input[data-var]").forEach((input) => {
    input.addEventListener("input", persist);
  });

  tuner.querySelector("[data-tuner-close]")?.addEventListener("click", () => {
    tuner.hidden = true;
  });

  tuner.querySelector("[data-tuner-reset]")?.addEventListener("click", () => {
    tuner.querySelectorAll("input[data-var]").forEach((input) => {
      input.value = defaults[input.dataset.var];
    });
    localStorage.setItem(storageKey, JSON.stringify(defaults));
    applyTuning(defaults);
    renderSnippet(tuner, defaults);
  });

  tuner.querySelector("[data-tuner-compact]")?.addEventListener("click", () => {
    const compact = {
      titleScale: "0.92",
      bodyScale: "0.94",
      spaceScale: "0.82",
      titleLineHeight: "1.1",
      topbarScale: "0.9",
    };
    tuner.querySelectorAll("input[data-var]").forEach((input) => {
      input.value = compact[input.dataset.var];
    });
    localStorage.setItem(storageKey, JSON.stringify(compact));
    applyTuning(compact);
    renderSnippet(tuner, compact);
  });

  tuner.querySelector("[data-tuner-copy]")?.addEventListener("click", async () => {
    const current = Object.fromEntries(
      [...tuner.querySelectorAll("input[data-var]")].map((input) => [input.dataset.var, input.value]),
    );
    const snippet = buildCssSnippet(current);
    try {
      await navigator.clipboard.writeText(snippet);
      const hint = tuner.querySelector(".layout-tuner__hint");
      if (hint) {
        hint.textContent = "已复制当前 CSS 变量。你可以直接贴回 slides-tokens.css 或某个单页 override 里。";
      }
    } catch {
      const hint = tuner.querySelector(".layout-tuner__hint");
      if (hint) {
        hint.textContent = "复制失败了，可以直接从下方代码块手动复制。";
      }
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() === "t" && event.shiftKey) {
      tuner.hidden = !tuner.hidden;
    }
  });

  renderSnippet(tuner, saved);
}

function applyTuning(values) {
  document.documentElement.style.setProperty("--tune-title-scale", values.titleScale);
  document.documentElement.style.setProperty("--tune-body-scale", values.bodyScale);
  document.documentElement.style.setProperty("--tune-space-scale", values.spaceScale);
  document.documentElement.style.setProperty("--tune-title-line-height", values.titleLineHeight);
  document.documentElement.style.setProperty("--tune-topbar-scale", values.topbarScale);
}

function buildCssSnippet(values) {
  return `:root {\n  --tune-title-scale: ${values.titleScale};\n  --tune-body-scale: ${values.bodyScale};\n  --tune-space-scale: ${values.spaceScale};\n  --tune-title-line-height: ${values.titleLineHeight};\n  --tune-topbar-scale: ${values.topbarScale};\n}`;
}

function renderSnippet(tuner, values) {
  const snippet = tuner.querySelector("[data-tuner-snippet]");
  if (snippet) {
    snippet.textContent = buildCssSnippet(values);
  }
}

function initCanvasDiagrams() {
  const redraw = () => {
    window.requestAnimationFrame(() => {
      document.querySelectorAll(".diagram-canvas").forEach((canvas) => {
        if (!(canvas instanceof HTMLCanvasElement)) return;
        drawDiagram(canvas);
      });
    });
  };

  redraw();
  deck.on("ready", redraw);
  deck.on("slidechanged", redraw);
  window.addEventListener("resize", redraw);
}

function drawDiagram(canvas) {
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(320, rect.width);
  const height = Math.max(220, rect.height);
  const dpr = window.devicePixelRatio || 1;

  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);

  drawCanvasBackground(ctx, width, height);

  switch (canvas.dataset.diagram) {
    case "adoption-bars":
      drawAdoptionBars(ctx, width, height, canvas.dataset.values);
      break;
    case "llm-system":
      drawLlmSystem(ctx, width, height);
      break;
    case "enterprise-stack":
      drawEnterpriseStack(ctx, width, height);
      break;
    default:
      break;
  }
}

function drawCanvasBackground(ctx, width, height) {
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, "rgba(255,255,255,0.98)");
  grad.addColorStop(1, "rgba(240,246,255,0.92)");
  ctx.fillStyle = grad;
  roundRect(ctx, 0, 0, width, height, 24);
  ctx.fill();

  ctx.fillStyle = "rgba(79,124,255,0.08)";
  ctx.beginPath();
  ctx.arc(width * 0.12, height * 0.18, height * 0.16, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(102,201,194,0.08)";
  ctx.beginPath();
  ctx.arc(width * 0.88, height * 0.2, height * 0.12, 0, Math.PI * 2);
  ctx.fill();
}

function drawAdoptionBars(ctx, width, height, rawValues) {
  const items = JSON.parse(rawValues || "[]");
  const left = 32;
  const top = 34;
  const barWidth = width - 220;
  const rowGap = 54;

  ctx.fillStyle = "#1b2740";
  ctx.font = "600 22px 'Segoe UI', 'PingFang SC', sans-serif";
  ctx.fillText("AI 已进入工作流", left, 32);

  items.forEach((item, index) => {
    const y = top + index * rowGap;
    ctx.fillStyle = "#6f7f99";
    ctx.font = "500 14px 'Segoe UI', 'PingFang SC', sans-serif";
    ctx.fillText(item.label, left, y + 6);

    ctx.fillStyle = "rgba(79,124,255,0.1)";
    roundRect(ctx, left, y + 14, barWidth, 16, 8);
    ctx.fill();

    ctx.fillStyle = item.color || "#4f7cff";
    roundRect(ctx, left, y + 14, (barWidth * item.value) / 100, 16, 8);
    ctx.fill();

    ctx.fillStyle = "#1b2740";
    ctx.font = "700 16px 'Segoe UI', 'PingFang SC', sans-serif";
    ctx.fillText(`${item.value}%`, left + barWidth + 16, y + 28);
  });

  ctx.fillStyle = "#7d8aa5";
  ctx.font = "500 12px 'Segoe UI', 'PingFang SC', sans-serif";
  ctx.fillText("来源：OpenAI / McKinsey / Stanford HAI（2025）", left, height - 20);
}

function drawLlmSystem(ctx, width, height) {
  const center = { x: width * 0.5, y: height * 0.52 };
  const nodes = [
    { x: width * 0.2, y: height * 0.24, title: "训练", body: "从语料中学模式" },
    { x: width * 0.8, y: height * 0.24, title: "预测", body: "选更可能的下一步" },
    { x: width * 0.2, y: height * 0.76, title: "上下文", body: "背景决定轨道" },
    { x: width * 0.8, y: height * 0.76, title: "工具", body: "接入搜索与系统" },
  ];

  ctx.strokeStyle = "rgba(79,124,255,0.22)";
  ctx.lineWidth = 2;
  nodes.forEach((node) => {
    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.quadraticCurveTo((center.x + node.x) / 2, center.y, node.x, node.y);
    ctx.stroke();
  });

  drawNodeCard(ctx, center.x - 84, center.y - 54, 168, 108, "#5d86ff", "#ffffff", "大模型", "高概率生成看似合理的下一步");
  nodes.forEach((node) => {
    drawNodeCard(ctx, node.x - 78, node.y - 42, 156, 84, "#ffffff", "#1b2740", node.title, node.body);
  });

  ctx.fillStyle = "#6f7f99";
  ctx.font = "500 12px 'Segoe UI', 'PingFang SC', sans-serif";
  ctx.fillText("提示词的本质：补上下文、缩小歧义、抬高命中率", 28, height - 18);
}

function drawEnterpriseStack(ctx, width, height) {
  const layers = [
    { label: "行业应用", detail: "金融 / 教育 / 客服 / 数据 / 营销", color: "#5f87ff" },
    { label: "工作流与治理", detail: "权限 / 评测 / 审核 / 日志 / SOP", color: "#6f99ff" },
    { label: "模型与知识", detail: "LLM / RAG / Embedding / Agent", color: "#82b0ff" },
    { label: "推理与算力", detail: "GPU / 云 / 延迟 / 成本 / 稳定性", color: "#9dc4ff" },
  ];
  const left = 44;
  const widthBox = width - 88;
  const heightBox = 52;
  const gap = 16;
  const startY = 40;

  ctx.fillStyle = "#1b2740";
  ctx.font = "600 20px 'Segoe UI', 'PingFang SC', sans-serif";
  ctx.fillText("企业 AI 交付链", left, 26);

  layers.forEach((layer, index) => {
    const y = startY + index * (heightBox + gap);
    ctx.fillStyle = layer.color;
    roundRect(ctx, left, y, widthBox, heightBox, 18);
    ctx.fill();

    ctx.fillStyle = index === 0 ? "#ffffff" : "#1b2740";
    ctx.font = "700 15px 'Segoe UI', 'PingFang SC', sans-serif";
    ctx.fillText(layer.label, left + 18, y + 22);
    ctx.font = "500 12px 'Segoe UI', 'PingFang SC', sans-serif";
    ctx.fillText(layer.detail, left + 18, y + 40);
  });

  ctx.fillStyle = "#6f7f99";
  ctx.font = "500 12px 'Segoe UI', 'PingFang SC', sans-serif";
  ctx.fillText("企业真正买单的是整条链路是否打通，而不是单独某个模型名。", left, height - 18);
}

function drawNodeCard(ctx, x, y, width, height, fill, textColor, title, body) {
  ctx.fillStyle = fill;
  roundRect(ctx, x, y, width, height, 22);
  ctx.fill();

  ctx.fillStyle = textColor;
  ctx.font = "700 16px 'Segoe UI', 'PingFang SC', sans-serif";
  ctx.fillText(title, x + 16, y + 28);
  ctx.font = "500 12px 'Segoe UI', 'PingFang SC', sans-serif";
  wrapText(ctx, body, x + 16, y + 50, width - 32, 18);
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  let line = "";
  const chars = Array.from(text);
  chars.forEach((char) => {
    const testLine = line + char;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, y);
      line = char;
      y += lineHeight;
    } else {
      line = testLine;
    }
  });
  if (line) ctx.fillText(line, x, y);
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

initDeck();
