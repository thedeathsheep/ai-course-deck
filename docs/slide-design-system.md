# Slide Design System

## Purpose

This document turns the background principles in `docs/slide-design-knowledge-base.md` into a working system for this repository.

It answers:

- what kinds of slides we are building
- how each kind should behave visually
- when to use MDX, Astro components, SVG, or canvas
- how to judge whether a slide is presentation-quality

This is the default design contract for the Astro deck.

## Design Positioning

This deck should feel like:

- a designed live presentation
- a structured editorial object
- a contemporary web-native slide experience

This deck should not feel like:

- paginated notes
- PPT content dumped into cards
- a dashboard
- a document viewer with next/previous buttons

## Core Rules

### Rule 1: One slide, one visual claim

Every slide must answer one question:

- what is the single thing the audience should understand in three seconds?

Everything else is subordinate.

If a slide needs two equal-sized arguments, split it.

### Rule 2: Text is support, not the whole show

Text should explain, anchor, or label.
Text should not carry the entire burden of meaning.

Preferred order of communication:

1. structure
2. image or diagram
3. short labels
4. supporting sentence
5. optional detail

### Rule 3: Content pages must be quieter than title pages

Cover and section pages can be atmospheric.
Argument, evidence, and process pages must be clearer and more restrained.

We should not give every slide the same decorative intensity.

### Rule 4: Proximity beats boxes

Use spacing, alignment, rhythm, and size before adding another rounded card.

Cards are allowed when they create real grouping, not when they merely compensate for weak composition.

### Rule 5: A slide must fit safely at presentation size

If a slide only works on a tall monitor or after scrolling, it fails.

All important content must fit in a 16:9 presentation frame without clipping at the project target size.

## Slide Archetypes

The deck should be built from a small number of recurring archetypes.

### 1. Cover

Purpose:

- establish tone
- establish title hierarchy
- establish deck identity

Characteristics:

- strongest atmosphere
- largest typography
- one dominant visual object
- very little body copy

Should use:

- custom composition
- image, abstract form, or strong graphic motif

Should avoid:

- multiple equal-weight modules
- explanatory bullet lists

### 2. Section Divider

Purpose:

- mark a transition
- reset audience attention
- restate the new section idea

Characteristics:

- short verbal payload
- strong title
- repeated deck motif from cover

Should use:

- large type
- one supporting line or small label

### 3. Argument Slide

Purpose:

- land a conceptual shift
- make a distinction memorable

Characteristics:

- one thesis
- one dominant visual contrast
- minimal supporting copy

Best examples:

- "search vs interface"
- "tool list vs task system"
- "ask for answers vs assign a task"

Should use:

- comparison diagrams
- before/after structures
- spatial contrast

Should avoid:

- dense paragraphs
- many secondary claims

### 4. Evidence Slide

Purpose:

- prove a point
- add credibility

Characteristics:

- evidence is visually prominent
- claim and evidence are explicitly linked

Should use:

- screenshots
- report figures
- quotations
- callout annotations

Should avoid:

- evidence shown without interpretation

### 5. Process Slide

Purpose:

- explain sequence
- show flow or transformation

Characteristics:

- explicit order
- clear movement

Should use:

- ladders
- timelines
- input/output flows
- layered diagrams

Should avoid:

- generic three-card rows with no directional logic

### 6. Mechanism Slide

Purpose:

- explain how something works internally

Characteristics:

- layered system view
- simplified but intentional structure

Should use:

- custom SVG
- componentized diagrams
- progressive highlighting where useful

Should avoid:

- decorative shapes that do not explain mechanism

### 7. Resource / Closing Slide

Purpose:

- transition from talk to action
- give the audience a next step

Characteristics:

- lower intensity than cover
- stronger clarity than mood

Should use:

- compact navigation
- grouped actions
- resource hierarchy

## Visual Language

### Typography

Typography should produce hierarchy through restraint, not inflation.

Rules:

- One display voice for titles.
- One readable sans voice for support text.
- Title size is not the only emphasis tool.
- Body copy should rarely exceed two short paragraphs on one slide.
- Supporting text should usually be one layer weaker than the main claim.

Repository guidance:

- `slides-tokens.css` defines the global scale.
- Do not solve layout failure by only shrinking everything globally.
- Prefer slide-specific overrides when a slide has exceptional needs.

### Color

Color should encode structure and emphasis.

Rules:

- one primary accent family
- one muted support palette
- one background system
- use contrast to identify hierarchy, not decoration for its own sake

Allowed uses:

- section accents
- comparison polarity
- annotation emphasis

Avoid:

- too many unrelated gradients
- multiple competing highlight colors on one slide

### Spacing

Spacing is a primary design tool in this repo.

Rules:

- related things stay close
- unrelated things separate clearly
- margins should feel systematic across the deck
- spacing changes should create rhythm between sections of a slide

### Shape Language

Rounded rectangles are part of the current deck vocabulary, but they should not dominate every content decision.

Use cards when:

- a block truly needs grouping
- a screenshot needs containment
- an evidence annotation needs anchoring

Do not use cards when:

- spacing alone can separate content
- the card does not add meaning

## Diagram Strategy

### Preferred ladder

When designing a diagram, use the simplest medium that communicates well:

1. layout and typography only
2. structured HTML + CSS
3. SVG
4. Astro component with reusable diagram logic
5. canvas or interactive layer

### When to use plain HTML/CSS

Use for:

- simple comparison layouts
- icon + label systems
- short process diagrams

Do not use plain HTML/CSS when:

- the visual needs precise geometry
- line relationships matter
- composition depends on irregular shapes

### When to use SVG

Use for:

- mechanism diagrams
- conceptual maps
- layered systems
- precise arrow and connector structures

SVG should be the default upgrade path before canvas.

### When to use canvas

Use canvas only when motion or density materially improves understanding:

- dynamic relationship maps
- animated transformations
- progressive state demonstrations

Do not use canvas only to look advanced.

## Content Density Rules

### A slide is overloaded when:

- there are more than three equal-weight blocks
- body copy becomes the main texture of the page
- the title and the visual fight for attention
- the audience must read linearly to understand the point

### When overloaded, do one of these:

- cut detail
- move detail to speaker notes
- split into two slides
- replace words with a diagram
- move evidence into a separate evidence slide

## MDX vs Component Rules

### Use plain MDX when:

- the slide is mostly editorial
- layout needs are standard
- the visual structure is already supported by existing patterns

### Use custom Astro components when:

- the slide is strategically important
- the page needs a custom composition
- the same visual pattern will recur
- the structure is more visual than textual

### Use custom SVG assets or inline SVG when:

- lines, geometry, or precise spatial logic are central to understanding

## Repository-Level Implementation Guidance

### Current architecture

Right now we have:

- content in `src/content/slides/*.mdx`
- shared shell in `src/components/SlideFrame.astro`
- global style system in `src/styles/slides.css`
- targeted overrides in `src/styles/slides-overrides.css`

This is enough for maintenance, but not enough for strong key slides unless we add more dedicated components.

### Recommended evolution

We should move toward:

- `MDX` for normal content slides
- custom slide components for high-importance pages
- a small set of reusable visual primitives:
  - comparison frame
  - evidence callout block
  - process ladder
  - mechanism diagram shell
  - section divider

## Review Checklist

Before a slide is considered done, ask:

- Can the audience get the main idea in three seconds?
- Is there exactly one dominant visual center?
- Does the visual system feel consistent with the rest of the deck?
- Is the text amount appropriate for a live presentation?
- Does the slide fit without clipping on the target presentation frame?
- Is the diagram actually clarifying something?
- Would removing one third of the copy make the slide stronger?
- Does the page look designed even before reading body text?

## Current Priorities For This Repository

### Priority 1

Rebuild the strongest conceptual slides first:

- cover
- search vs AI
- how AI works

### Priority 2

Define reusable archetype components for:

- comparison
- evidence
- process
- divider

### Priority 3

Reduce generic card overuse across content pages.

### Priority 4

Create a presentation-safe density standard so slides stop overflowing vertically.

## Non-Goals

This system does not aim for:

- decoration for decoration's sake
- maximal motion on every page
- novelty without clarity
- a different visual language on every slide

## Relationship To The Knowledge Base

`docs/slide-design-knowledge-base.md` explains why these ideas matter.

This document explains how we should apply them in this repo.
