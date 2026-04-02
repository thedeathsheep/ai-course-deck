# AI Course Deck

This repo now contains two delivery formats for the same AI literacy talk:

- a static web presentation at `/slides/`
- a curated resource library at `/resources/`
- the legacy PPT generation workflow for offline deck export

The web version is designed for long-form, in-person delivery and uses real screenshots, report figures, product icons, and citation strips instead of placeholder slide chrome.

## Project Structure

- `src/pages/slides/index.astro`: Reveal.js talk deck
- `src/pages/resources/index.astro`: curated post-session resource site
- `src/content/slides/*.mdx`: slide content entries
- `src/content/resources/*.mdx`: curated resource entries
- `src/content.config.ts`: Astro content collections schema
- `src/lib/site-data.mjs`: sorting and grouping helpers used by both pages
- `assets/`: static public assets, including screenshots, diagrams, reports, and icons
- `materials/`: legacy PPT, notes, and supporting markdown handouts
- `scripts/build-course-deck-v2.js`: legacy PPT generator

## Run The Site

```bash
npm install
npm run dev
```

Open:

- `http://localhost:4321/slides/`
- `http://localhost:4321/resources/`

## Build For Deployment

```bash
npm run build
```

The static output is written to `dist/` and can be uploaded directly to a standard web server.

## Legacy PPT Build

```bash
npm run build:deck
```

The generated PPT is written to:

`materials/ai-cognition-course-v2.pptx`
