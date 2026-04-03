# Slide Design Knowledge Base

## Purpose

This document captures design principles distilled from selected iSlide blog posts and translates them into working guidance for this repository.

It is not a style guide with final answers.
It is a background knowledge base for how we should think about presentation design when building the Astro slide deck.

## What We Learned From iSlide

### 1. Presentation visuals are graphic design, not text pagination

The strongest framing comes from iSlide's article on "visual sophistication":

- Presentation visuals are a form of planar layout design.
- Pages are composed from text, images, icons, lines, tables, color blocks, and spacing.
- The goal is not to place content on a canvas, but to express it visually.

Implication for this repo:

- A slide should not begin as "some copy plus a card layout".
- A slide should begin as "what should the audience understand at a glance?".
- Text is only one element in the composition, not the default center of gravity.

### 2. Five foundational principles matter more than decoration

The most reusable principle set across the iSlide materials is:

- `Unity`: keep colors, type, repeated shapes, and decorative language consistent.
- `Alignment`: create order with clear horizontal, vertical, or centered alignment logic.
- `Whitespace`: leave room on purpose; if a page needs too much explanation, split it.
- `Proximity`: use grouping and spacing to show relationships, not just borders.
- `Contrast`: emphasize with one main contrast strategy at a time instead of stacking every effect.

Implication for this repo:

- We should stop solving emphasis by only increasing font size.
- We should reduce unnecessary boxes and let spacing form structure.
- We should design with a visible grid, not freehand placement.

### 3. Different slide types need different visual behavior

iSlide repeatedly separates presentations into structural page types:

- cover page
- section / chapter page
- content page
- closing page

The recommendations are consistent:

- Cover pages can carry stronger atmosphere and stronger visual personality.
- Section pages should inherit the cover language so the deck feels like one system.
- Content pages should simplify the background and prioritize message clarity.
- Closing pages should echo the opening rather than start a new style.

Implication for this repo:

- We should not use one visual recipe for every slide.
- Our Astro deck needs explicit page archetypes, not just generic "content blocks".
- The cover, divider, argument, evidence, and closing slides should each feel like different species inside one family.

### 4. Good content pages start with hierarchy, not decoration

In iSlide's content-page redesign article, the first step is always to sort the content hierarchy before styling anything:

- first clarify the logic and information levels
- then decide layout
- only then fill in images, icons, and color

Implication for this repo:

- Before styling a slide, identify:
  - the core claim
  - the supporting evidence
  - the optional detail
- If the optional detail competes with the claim, remove it or move it to another slide.
- Our current weak slides often fail because they try to explain everything at once.

### 5. Images should do communication work, not just fill space

From iSlide's image-layout articles:

- Images have two major uses: `content` and `decoration`.
- Covers benefit from simple, high-quality images that set tone rather than explain complexity.
- Content pages should use images to guide vision, balance text, and support theme.
- Large images can be cropped, partially shown, desaturated, softened, or masked to improve composition.
- A good image is better than a clever effect applied to a weak image.

Implication for this repo:

- We should stop using visuals as polite companions to paragraphs.
- For major idea slides, visuals must carry meaning.
- Partial crops, scale changes, and masked compositions are welcome if recognition stays clear.

### 6. A chart is chosen to support a conclusion, not to display raw data

The iSlide chart article makes an important point:

- Data itself is not the purpose.
- The real purpose is to use visualization to support the conclusion we want the audience to understand.
- Different claims require different chart types:
  - comparison
  - trend
  - composition
  - multi-series relationship

Implication for this repo:

- A diagram or chart must answer: "what claim is this visual helping prove?"
- If a slide says "AI is an interface, not search", the graphic should prove that structural shift.
- We should allow custom SVG or canvas components when static cards cannot express the idea well.

### 7. Refinement lives in details and repetition

iSlide's template and branding posts emphasize that polish comes from repetition:

- repeated shape language
- repeated decorative motifs
- repeated page margins
- repeated title bar logic
- repeated color rules

Implication for this repo:

- We need a stricter deck system:
  - page margins
  - title treatments
  - label styles
  - source strip styles
  - chapter transition language
- "Designed" should mean the viewer recognizes the system before reading the words.

## Source Notes

The following external articles informed this document:

- iSlide, "让PPT设计具有视觉高级感"
  - https://www.islide.cc/blog/202
- iSlide, "PPT设计教程分享：对齐与对比"
  - https://www.islide.cc/blog/107
- iSlide, "PPT创意的内容页设计，至此拒绝平庸"
  - https://www.islide.cc/blog/177
- iSlide, "PPT制作设计怎样做排版更有韵味？"
  - https://www.islide.cc/blog/161
- iSlide, "PPT图文排版教程，学会这一招,幻灯片排版瞬间整齐"
  - https://www.islide.cc/blog/91
- iSlide, "运用公司logo设计出企业专属的整套PPT风格模板"
  - https://www.islide.cc/blog/132
- iSlide, "PPT图表制作，分享设计和美化方法技巧!"
  - https://www.islide.cc/blog/90

## Translation Into Repository Rules

### What We Should Start Doing

- Design each slide around one visual claim.
- Use fewer text blocks and larger visual structures.
- Split overloaded slides instead of shrinking everything.
- Treat spacing as a primary design tool.
- Build consistent slide archetypes for:
  - cover
  - chapter
  - argument
  - evidence
  - process
  - comparison
  - closing
- Let important visuals be custom-built instead of forcing every page through the same MDX rhythm.

### What We Should Stop Doing

- Stop treating slides as paginated prose.
- Stop using oversized headings to compensate for weak structure.
- Stop surrounding every related item with a rounded card.
- Stop adding visuals after the text is already finalized.
- Stop using a diagram unless it clearly improves understanding.

## Practical Checklist For New Slides

- What is the one sentence this slide must land?
- What should the audience understand in three seconds?
- Which element is visually dominant, and why?
- Can one block of text be replaced by structure, image, icon, or diagram?
- Is there a clear alignment system?
- Are related elements grouped by proximity rather than boxed by habit?
- Is there enough whitespace to make the hierarchy obvious?
- Are we using only one or two emphasis mechanisms, rather than all of them?
- Does this slide belong to a defined page archetype?
- Would the slide still feel intentional if the body copy were hidden?

## How This Changes Our Astro Approach

Astro is not the limitation.
The limitation is using Astro as a templated document renderer instead of a presentation system.

Going forward, this repo should prefer:

- MDX for ordinary editorial content
- custom Astro components for key visual slides
- SVG-first diagrams when structure matters
- canvas or interactive components only when they materially improve understanding
- a stronger slide taxonomy instead of one generic layout mentality

## Next Design Work For This Repo

- Define visual archetypes for the deck.
- Redesign the cover page and the strongest argument slides first.
- Rebuild comparison and mechanism slides as designed diagrams.
- Reduce decorative card usage on content pages.
- Establish a more deliberate typography scale and margin system.
- Create a repository-specific design checklist derived from this knowledge base.
