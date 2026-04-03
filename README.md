# AI Course Web Slides

This repository now runs as a native React + Vite slide deck for an AI literacy talk.

The main surface is:

- `/slides/`: the live presentation

## Quick Start

```bash
npm install
npm run dev
```

Open:

- `http://127.0.0.1:5173/slides/`

## Commands

```bash
npm run dev
npm run build
npm run preview
npm run test
npm run check
npm run slides:audit -- http://127.0.0.1:5173/slides/
npm run export:pptx -- http://127.0.0.1:5173/slides/
```

`npm run build` writes the production bundle to `dist/`.

## Project Map

- `slides/index.html`: deck entry route
- `src/slides/App.jsx`: all slide composition and presentation runtime
- `src/slides/main.jsx`: React bootstrap
- `src/slides/index.css`: global deck theme, stage, shared visual primitives
- `scripts/audit-web-slides.mjs`: browser-based layout audit
- `scripts/export-web-to-pptx.mjs`: screenshot-based PPTX export
- `assets/`: screenshots, report images, diagrams, and other deck assets
- `materials/`: exported presentation artifacts

## Maintenance Loop

1. Edit slide content and structure in `src/slides/App.jsx`.
2. Adjust shared visuals in `src/slides/index.css`.
3. Run `npm run test`.
4. Run `npm run build`.
5. Run `npm run slides:audit -- http://127.0.0.1:5173/slides/` against a local dev server when layout changes are substantial.
