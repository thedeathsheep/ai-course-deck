# Slides Tuning

## Most Common Edit Points

- `src/slides/App.jsx`
  - Update slide copy, page order, and per-slide composition.
- `src/slides/index.css`
  - Update theme colors, stage chrome, shared cards, gradients, and motion.

## Recommended Tuning Flow

1. Change content structure first.
2. Only then adjust shared visual rules.
3. Keep the stage in a `16:9` mental model while editing.
4. Rebuild and run the audit after any major layout change.

## Verification

Start a local dev server, then run:

```bash
npm run slides:audit -- http://127.0.0.1:5173/slides/
```

The audit checks:

- slide stage exists
- each page has a visible title
- no page overflows the viewport
- the stage still fills the screen as a presentation surface
