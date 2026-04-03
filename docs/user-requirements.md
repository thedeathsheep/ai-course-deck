# User Requirements

## Document Purpose

This document summarizes the user's requirements for the project based on the conversation so far.

It is meant to prevent future work from drifting back toward:

- PPT-first thinking
- text-heavy slide construction
- generic card-based layouts
- "clean but boring" presentation design

## Primary Goal

Build a strong **web slide presentation** for the AI course, not a PPT deck.

The project should be treated primarily as:

- a web-native presentation
- a designed visual experience
- a high-quality live talk deck

It should **not** be treated primarily as:

- a PPT generator
- a document viewer
- a markdown deck with navigation
- a paginated text handout

## Scope Priority

### In Scope

- web slide experience
- visual quality of the presentation
- slide design system
- better key slides
- diagram quality
- layout quality
- typography balance
- presentation aesthetics

### De-prioritized

- PPT export
- legacy PPT workflow
- PPT output quality

The user explicitly said:

- they do not want the PPT direction to be the focus
- they want focus on the web slide branch and web slide construction

## What The User Wants The Slides To Feel Like

The presentation should feel:

- designed
- intentional
- visually strong
- suitable for an audience
- worthy of being watched, not just read

The slides should not feel like:

- text split into pages
- an information dump
- a safe corporate training template
- a series of rounded cards
- "there is nothing to look at except words"

## Key Quality Expectations

### 1. Slides need real aesthetic design

The user explicitly stated that:

- slides are not just paginated language material
- presentation needs unique aesthetic design
- every display should be designed

This means:

- visual composition matters
- the deck needs artistic and editorial judgment
- layout and form are as important as content

### 2. Visuals must carry meaning

The user repeatedly emphasized:

- many pages currently have almost nothing to look at besides text
- ideas like "not search, but interface" should be strengthened through diagrams
- important conceptual pages should use graphic expression, not only text explanation

This means:

- diagrams should explain the point
- visuals should not be decorative afterthoughts
- key slides must have a strong visual center

### 3. Better-than-basic diagram quality

The user explicitly questioned whether the current Astro setup was limiting visual expression and raised the bar to:

- stronger than current static diagrams
- possibly better than simple Mermaid in some cases
- potentially using SVG, custom components, or canvas if needed

This means:

- plain boxed layouts are not enough
- diagrams should be designed to match the claim
- we should consider SVG-first or custom visual components for key concept slides

### 4. Stronger presentation craft

The user expects:

- better typography
- better spacing
- better hierarchy
- better balance
- less empty but meaningless whitespace
- less head-heavy / foot-light composition

This means:

- some text is currently too large
- some text is currently too small
- there is a hierarchy problem, not just a content problem

### 5. Move away from card-based layouts

The user explicitly asked why the designs kept becoming card-based and criticized this direction.

This means future key slides should avoid defaulting to:

- stacked cards
- dual-panel cards
- many bordered boxes
- information-grouping by container rather than composition

Instead, future work should prefer:

- layout-driven composition
- typography-driven hierarchy
- line / plane / shape relationships
- custom-designed diagrams
- grid and alignment systems

## User's Negative Feedback So Far

The user directly expressed the following dissatisfactions:

- the result was not "NB" enough
- for the audience there was almost nothing to see except text
- the deck lacked aesthetic quality as a presentation
- some pages were ugly
- some redesigned pages were not fully shown
- many designs still looked like cards
- font sizes felt unbalanced

These are not minor comments.
They are central acceptance criteria.

## What The User Values In Design References

The user introduced iSlide blog references and emphasized:

- presentation design should be treated as design, not formatting
- strong design references are valuable
- design background knowledge should be documented

This means future work should be informed by:

- presentation design principles
- graphic layout thinking
- hierarchy and composition
- slide-type distinctions

## Required Direction For Future Slide Work

### Key slides should be rebuilt first

The user agreed to first try key slide redesigns.
The most strategically important slides identified in the conversation are:

- cover
- "search vs interface"
- "how AI works"

These slides should be treated as:

- flagship slides
- visual standard-setters
- places where the deck proves its design quality

### Design must come before implementation convenience

The user implicitly rejected the idea that existing implementation patterns should define the design.

This means:

- current code architecture should not dictate weak visuals
- if needed, we should create custom slide compositions
- implementation should follow design intent, not the reverse

### The deck should become more web-native

The user questioned whether Astro limited design ability.
The answer established in the conversation is that Astro is not the limitation.

Therefore the future expectation is:

- use the web medium more fully
- allow stronger SVG / custom visual components
- use interactive or canvas-based approaches when they truly help

## Collaboration Preference Learned From Conversation

The conversation showed that the user is not satisfied with vague iteration or trial-and-error aesthetic guessing.

A better collaboration mode for this user is:

- clearly summarize requirements
- use strong design references
- document design rules
- create higher-confidence visual directions before implementation

The user also accepted creating documentation such as:

- design knowledge base
- slide design system
- requirement summary

## Acceptance Criteria

Future work is more likely to satisfy the user if it achieves the following:

- the deck is clearly web-slide-first
- key slides look designed rather than templated
- conceptual slides use diagrams or visual systems to make the point
- pages are balanced and readable in one screen
- typography hierarchy feels deliberate and comfortable
- card overuse is reduced
- the audience has more to look at than text
- the result feels like a presentation, not paginated notes

## Short Version

The user wants:

- a **web-first AI course presentation**
- with **real presentation design**
- stronger **visual communication**
- fewer **card-based layouts**
- better **diagrams, balance, hierarchy, and typography**
- and a result that feels **designed, watchable, and high quality**

The user does **not** want:

- a PPT-centered workflow
- a markdown document split into slides
- a deck where the audience mostly reads text
- a generic, safe, box-heavy layout system
