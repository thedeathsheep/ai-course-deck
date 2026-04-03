# AI Course Web Slides

This repository is organized around a static web presentation for an AI literacy talk.

The main deliverables are:

- `/slides/`: the live talk deck built with Astro and Reveal.js
- `/resources/`: a curated post-session resource library

The site is optimized for in-person delivery and keeps real screenshots, report figures, product marks, and citation strips in the final experience instead of placeholder slide chrome.

## Quick Start

```bash
npm install
npm run dev
```

Open:

- `http://localhost:4321/slides/`
- `http://localhost:4321/resources/`

## Commands

```bash
npm run dev
npm run build
npm run preview
npm run test
npm run check
npm run slides:audit -- http://127.0.0.1:4321/slides/
```

`npm run build` writes the static site to `dist/`.

## Project Map

- `src/pages/slides/index.astro`: Reveal.js deck shell
- `src/pages/resources/index.astro`: resource library page
- `src/content/slides/*.mdx`: slide content and frontmatter
- `src/content/resources/*.mdx`: resource entries and metadata
- `src/components/`: slide and resource rendering primitives
- `src/lib/site-data.mjs`: ordering and grouping helpers
- `src/styles/`: global, slide, and resource styles
- `assets/`: public screenshots, diagrams, icons, reports, and runtime assets
- `docs/slides-tuning.md`: layout tuning notes for the deck
- `docs/web-project-map.md`: editing guide for the web slide site

## Editing Workflow

1. Update slide copy or metadata in `src/content/slides/*.mdx`.
2. Update resource cards in `src/content/resources/*.mdx`.
3. Adjust shared layout and visual rules in `src/components/` and `src/styles/`.
4. Run `npm run test` for data helpers.
5. Run `npm run build` before shipping.

## Legacy Files

The repository still contains PPT-era source material in `materials/` and the old generator in `scripts/build-course-deck-v2.js`, but they are retained only as reference material and are no longer the primary project surface.
