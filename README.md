# AI Course Deck

An AI literacy slide deck for general workplace audiences, focused on:

- what AI is
- how LLMs work
- why hallucinations happen
- product landscape and tool selection
- prompting, prompt chains, and practical workflows
- real workplace and life use cases

## Project Structure

- `scripts/build-course-deck-v2.js`: PPT generator
- `materials/ai-cognition-course-v2.pptx`: current generated deck
- `materials/*.md`: supporting outlines and speaker materials
- `assets/diagrams`: custom SVG diagrams used in the slides
- `assets/reports`: report PDFs and extracted evidence images
- `assets/research`: supporting reference screenshots
- `assets/screens`: product screenshots

## Build

```bash
npm install
npm run build:deck
```

The generated deck is written to:

`materials/ai-cognition-course-v2.pptx`
