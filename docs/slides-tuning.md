# Slides Tuning

## 快速手动改

最适合手动改的文件是：

- `src/styles/slides-tokens.css`
- `src/styles/slides-overrides.css`

这里已经把最容易出问题的尺寸收敛成一组变量：

- `--tune-title-scale`
- `--tune-body-scale`
- `--tune-space-scale`
- `--tune-title-line-height`
- `--tune-topbar-scale`

通常你只需要这样调：

1. 页面装不下：先把 `--tune-space-scale` 调小到 `0.9` 左右
2. 标题太大：把 `--tune-title-scale` 调到 `0.9` 或 `0.92`
3. 行间距太挤：把 `--tune-title-line-height` 调到 `1.08` 或 `1.1`
4. 顶部按钮太大：把 `--tune-topbar-scale` 调到 `0.9`

如果你只想改某一页，不想影响全局，优先改：

- `src/styles/slides-overrides.css`

示例：

```css
.deck-slide[data-slide-slug="cover"] {
  --slide-hero-title-size: clamp(2.2rem, 3.4vw, 4rem);
}
```

## 浏览器里直接调

在 `slides` 页面里按：

- `Shift + T`

会打开一个 `Layout Tuner` 面板，可以实时调：

- 标题缩放
- 正文缩放
- 间距缩放
- 标题行高
- 顶栏缩放

这些值会保存到浏览器本地存储里，方便你边看边调。

面板里还新增了：

- `复制 CSS` 按钮：直接复制当前 5 个核心变量
- 下方代码块：复制失败时也能手动拷走

## 自动检查

本地启动站点后，可以跑：

```bash
npm run slides:audit -- http://127.0.0.1:4321/slides/
```

这个脚本会在 `1600x900` 下检查每页是否出现这些问题：

- 底部溢出
- 顶部溢出
- 标题行高过紧
- 顶栏按钮重叠
- 顶栏换行后超出安全区

如果你改了样式，先跑一遍这个脚本，再人工看重点页，会省很多时间。
