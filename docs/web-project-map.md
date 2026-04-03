# Web Project Map

## What This Repo Is

This is an Astro-based presentation site with two public surfaces:

- `/slides/` for the live talk
- `/resources/` for follow-up learning material

## Where To Edit

### Content

- `src/content/slides/*.mdx`
  - One file per slide
  - Frontmatter controls order, section, layout type, assets, citations, and optional demo links
- `src/content/resources/*.mdx`
  - One file per resource entry
  - Frontmatter controls category, priority, source type, access notes, and tags

### Rendering

- `src/pages/slides/index.astro`
  - Loads slide entries, renders them in order, and builds section navigation
- `src/pages/resources/index.astro`
  - Groups resources and renders the library landing page
- `src/components/SlideFrame.astro`
  - Shared slide wrapper, metadata rail, hero asset slot, notes, and source strip
- `src/components/ResourceRow.astro`
  - Shared resource row presentation
- `src/components/SourceStrip.astro`
  - Footer citations for slides

### Data Helpers

- `src/content.config.ts`
  - Schema for slide and resource frontmatter
- `src/lib/site-data.mjs`
  - Sorting and grouping logic shared across pages

### Styles

- `src/styles/global.css`
  - Shared page-level rules
- `src/styles/slides.css`
  - Main slide system
- `src/styles/slides-tokens.css`
  - Slide design tokens and tuning values
- `src/styles/slides-overrides.css`
  - Safe place for targeted slide overrides
- `src/styles/resources.css`
  - Resource library visuals

### Public Assets

- `assets/screens/`
  - Product screenshots and visual references
- `assets/brands/`
  - Brand marks used in cards and diagrams
- `assets/diagrams/`
  - Supporting SVG diagrams
- `assets/reports/`
  - Report PDFs and extracted evidence figures
- `assets/slides-runtime.js`
  - Client-side Reveal runtime and keyboard interactions

## Suggested Maintenance Loop

1. Edit MDX content first.
2. Adjust styles only when content changes cannot solve the issue cleanly.
3. Run `npm run test`.
4. Run `npm run build`.
5. If layout changed, run `npm run slides:audit -- http://127.0.0.1:4321/slides/` against a local dev server.

## Legacy Surface

`materials/` and `scripts/build-course-deck-v2.js` are still present for historical reference, but current work should treat the web slide site as the source of truth.
