# Web Project Map

## What This Repo Is

This is a Vite-based presentation project with one primary public surface:

- `/slides/` for the live talk deck

## Where To Edit

### Slides

- `src/slides/App.jsx`
  - Main slide list, slide components, navigation chrome, and runtime behavior
- `src/slides/main.jsx`
  - React entry
- `src/slides/index.css`
  - Shared theme, stage shell, materials, and motion

### Entry HTML

- `index.html`
  - Redirects the root path to `/slides/`
- `slides/index.html`
  - Mount point for the deck

### Scripts

- `scripts/audit-web-slides.mjs`
  - Browser audit for stage presence and viewport overflow
- `scripts/export-web-to-pptx.mjs`
  - Screenshot-based PPTX export from the live deck

### Assets

- `assets/screens/`
  - Product UI screenshots
- `assets/reports/`
  - Report pages and figures
- `assets/research/`
  - Research visuals used in slides
- `assets/diagrams/`
  - Supporting SVG assets

## Suggested Maintenance Loop

1. Edit the deck in `src/slides/App.jsx`.
2. Adjust shared visuals in `src/slides/index.css`.
3. Run `npm run test`.
4. Run `npm run build`.
5. Run `npm run slides:audit -- http://127.0.0.1:5173/slides/` after structural or layout-heavy changes.
