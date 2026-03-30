# Portal Coherence Trace

## Plain English Documentation · HDM Portal Ecosystem

*This file is a living record. It traces what exists, what we are doing, and why — in plain English. It grows as the work grows.*

---

## What the Portal Ecosystem Is

The HDM portal is a collection of web pages that together form a single experience: a place to enter the ideas of Human Development Mathematics, feel their weight, and move between them.

Right now there are five pages:

| File | Short Description | Readiness |
| --- | --- | --- |
| `HDM Exploratorium v4.html` | The gold standard. The full experience — narrative, scroll animations, tooltip glossary, rich typography. | **Complete** |
| `HDM Resonance Library.html` | A concept sanctuary. Interactive constellation with 10 HDM concepts you can navigate one at a time. | **~80% aligned** |
| `The Crossover — Two Portals One Field.html` | A bridge page meant to connect the two main portals. Beautiful, but had no working links until Phase 1b. | **~75% aligned** |
| `HDM_Silent_Treatment/index.html` | An educational deep-dive into the Silent Treatment phenomenon — Crystal Silo Effect, Surface Tension, Diamond of The Self. | **~40% aligned** |
| `HDM Exploratorium.html` | The original v1 — a working interactive application with a completely different visual style. | **~20% aligned** |

---

## What "Coherence" Means Here

**v4 is the design standard.** Every other page should feel like it comes from the same world.

That world has specific properties.

**Colors** (these exact values, nowhere else):

- `--void: #0D0907` — near-black, warm, the background of everything
- `--sand: #F0E6D2` — warm off-white, the color of text
- `--terra: #C4622D` — burnt orange-red, accents and alerts
- `--gold: #C48C50` — warm gold, headings and highlights

**Fonts** (these four, no others):

- Playfair Display — for big headings
- IM Fell English — for subheadings, poetic text, the voice of the work
- Inter — for body text, labels, interface elements
- DM Serif Text — for pull quotes, emphasized moments

**Behaviors** (these interaction patterns):

- A 2px scroll progress bar fixed at the top of the page — it fills left to right as you read. Color: terra fading to gold.
- Elements that start invisible and fade in as you scroll down to them (`.reveal` animation system)
- A skip link at the top for keyboard users and screen readers
- Keyboard focus is always visible — a 2.5px terra-colored outline

Each page will gain these properties as we work through the phases. The content of each page stays exactly as it is — we are not rewriting anything. We are making the container consistent.

---

## The Phases

### Phase 1 — Interaction Layer (Resonance Library + The Crossover)

These two pages already have the right colors and fonts. They just need the interaction behaviors added.

- **1a: Resonance Library** — Complete
- **1b: The Crossover** — Complete

### Phase 2 — Typography Bridge (Silent Treatment)

Silent Treatment has a white background by design (it's an educational document). We keep the white background. We add HDM fonts and terra accent color so it feels related.

### Phase 3 — Visual Overhaul (v1 Exploratorium)

The v1 Exploratorium uses a completely different color palette — blue/indigo tones instead of earth tones. This page needs the most work. We will rebuild its visual style while keeping its interactive mechanics.

### Phase 4 — Navigation Thread

Once all five pages are visually coherent, we add a shared navigation element — minimal, unobtrusive — so a visitor can move between portals without getting lost.

### Future — Dodecahedral Capstones

When the Dodecahedral Bloom material is ready, it enters the ecosystem here. The portal structure we are building now becomes its home.

---

## Change Log

### 2026-03-30 · Phase 1a · Resonance Library

**What the Resonance Library already had:**

- The right colors (earth palette from `:root`)
- Playfair Display and EB Garamond fonts
- A scroll progress bar — but 1px tall, gold-only, partially transparent
- A reading path breadcrumb bar at the bottom — unique, preserved exactly
- The interactive constellation engine — de Jong attractor, Lissajous curves, Decagram {10/3}. Preserved exactly.

**What we added:**

1. **Scroll bar upgrade** — from `height: 1px; background: var(--gold); opacity: 0.6` to `height: 2px; background: linear-gradient(to right, var(--terra), var(--gold)); opacity: 1`. Matches v4 exactly.

2. **Skip link** — hidden at top, reveals on keyboard tab. Jumps to `#library-index` (the concept index).

3. **`focus-visible` styles** — 2.5px terra outline, 4px offset. Every focusable element now shows keyboard state.

4. **Scroll reveal animations** — Entry content (glyph, title, subtitle, signal quote, body, resonance links) fades in and rises gently into view, staggered 80ms per element. Uses `IntersectionObserver`. The constellation engine is untouched.

---

### 2026-03-30 · Phase 1b · The Crossover

**What The Crossover already had:**

- `.reveal` CSS + IntersectionObserver — the most animation-ready page of the four
- Staggered delays `.rd1`, `.rd2`, `.rd3`
- Right fonts (Playfair Display, IM Fell English, Inter)
- Right color palette (--void, --terra, --gold, --sand)

**What was missing:**

- No scroll progress bar
- No skip link
- No `focus-visible` styles
- Two portal cards describing "HDM Exploratorium" and "The Digital Songline" with zero actual links

**What we added:**

1. **Scroll progress bar** — terra→gold gradient, 2px, fixed at top. HTML element + scroll listener.

2. **Skip link** — jumps to `#portals` (first content section below the cover).

3. **`focus-visible` outlines** — 2.5px terra, 4px offset. Matches v4 and Resonance Library.

4. **Portal entry links** — two buttons, one per portal card:
   - "Enter the Exploratorium →" links to `HDM Exploratorium v4.html`
   - "Enter the Resonance Library →" links to `HDM Resonance Library.html` (gold-colored)

   *Note: Portal Two on this page is named "The Digital Songline" — a future vision. The Resonance Library is the closest existing experience. When the Songline is built, this link updates to point there.*

**What was preserved:** The drift-line SVG background, full architectural map, phase blocks, bridge diagram, closing phrase. Nothing removed. Only additions.

**Phase 1 status: Complete.**

---

### 2026-03-30 · Phase 2 · Silent Treatment Typography Bridge

**What the Silent Treatment already had:**

- A strong educational structure: four steps (Recognition, Crystal Silo Effect, Surface Tension Dynamics, Diamond of The Self), animated geometry, an acknowledgments section
- Correct white background — it's an educational explainer, not an immersive portal
- Good content density — David Fleming, Ash R. Smith, Omar L. Harris, all properly credited

**What was missing:**

- System fonts (Avenir Next) + Bodoni Moda — neither part of the HDM font stack
- Gray accent colors throughout — no terra, no gold
- No scroll progress bar, no skip link, no focus-visible

**What we added:**

1. **Google Fonts** — Playfair Display + Inter. Bodoni Moda removed entirely.

2. **Font reassignment:** Body → Inter. All display headings → Playfair Display.

3. **Terra accent replacements:**
   - Section numbers (Step One / Two / etc.) — gray `#999` → terra `#C4622D`
   - Recognition card top-border gradient — gray → terra→gold `#C4622D→#C48C50`
   - CTA section — background deepened to void `#0D0907→#161008`, terra border-top added, title in gold

4. **Scroll progress bar** — terra→gold gradient, 2px. Matches all portals.

5. **Skip link** — jumps to `#content`.

6. **`focus-visible` styles** — 2.5px terra, 4px offset.

**What was preserved:** White background, all four educational sections, all animations (crystal silo barriers, wave flow, diamond facets), all content, all acknowledgment credits.

**Phase 2 status: Complete.**

---

### 2026-03-30 · Phase 3 · Visual Overhaul (v1 Exploratorium)

**What the v1 Exploratorium already had:**

- A grid layout: 190px sidebar, flex content area, 220px PING panel
- The Seven Zones navigation with specific octave colors (`--z1` to `--z7`) encoding the Seven Octaves
- Artifact cards, PING SVG engine, connection popup, JS interaction layer

**What was missing:**

- Design standard colors — used blue/indigo (`#08081A`, `#0F0F28`) instead of earth tones
- HDM fonts (used 'Georgia' and 'Arial' instead of 'Playfair Display' and 'Inter')
- The scroll progress bar, skip link, and focus-visible accessibility features

**What we added:**

1. **Colors replaced:** Swapped `--bg`, `--bg2`, `--bg3` to the warm void/charcoal earth tones (`#0D0907`, `#161008`, `#1E1408`). Updated `--gold` and `--cream` to match v4 standards. Added `--terra: #C4622D`.
2. **Typography bridge:** Linked Google Fonts for 'Playfair Display' and 'Inter', updating CSS text variables.
3. **Accessibility & tracking elements:** Added the HTML markup and CSS for a skip link, a 2px scroll progress bar (gradient from terra to gold) tracking the `#room` element, and `focus-visible` states.

**What was preserved:** The entire skeleton. Grid structure, JS logic, entry screen, PING SVG engine, and the Seven Zone colors. The mechanics were untouched while the skin was brought into coherence.

**Phase 3 status: Complete.**

---

### 2026-03-30 · Phase 4 · Navigation Thread

**What the ecosystem already had:**

- Five visually coherent and mathematically aligned portals across the same domain.

**What was missing:**

- No way to easily traverse from one portal to another without relying on back buttons or manual URL entries.

**What we added:**

1. **Ecosystem Navigation Component:** A shared, fixed navigation element inserted into all five portals.
2. **Positioning:** Placed at `bottom: 24px; right: 24px` for most portals to avoid layout conflicts (such as the header ping-status in the v1 Exploratorium), and offset to `bottom: 56px` specifically in the Resonance Library to clear the reading path bar at the bottom.
3. **CSS-Only Interactions:** A discrete nav marker (styled with our charcoal and gold tokens) that expands on hover (`focus-within` for keyboard accessibility) to reveal direct links to all five portals. Built for smooth, JavaScript-free, accessible traversal.
4. **Subdirectory Routing:** Accounted for relative paths in `HDM_Silent_Treatment/index.html` to maintain unified cross-linking.

**Phase 4 status: Complete.**

---

### 2026-03-30 · Phase 5 · Dodecahedral Capstones Integration

**What was missing:**

- A coherent visual rendering of the Dodecahedral Bloom concepts (`dodecahedral_bloom` content).
- A unified entry point in the HDM portal ecosystem for exploring the Twelve Faces of civilization.

**What we created:**

1. **New Portal (`HDM Dodecahedral Capstones.html`):** Transformed the Markdown text on civilizational maturation, the elemental grammar of archetypes, and deep time/multigenerational consciousness into a beautifully structured UI aligned with the current ecosystem.
2. **Visual Continuity:** Used the identical CSS tokens, typography standards (`Playfair Display`, `Inter`, `IM Fell English`), `.scene` structure, and `.reveal` scroll behaviors established in `v4`.
3. **Ecosystem Linking:** Updated the `.eco-nav` component across all six portals (Exploratorium v1, v4, Resonance Library, The Crossover, Silent Treatment, and Capstones) to weave the new page seamlessly into the global HDM architecture.

**Phase 5 status: Complete.**

---

## Still Ahead

- Phase 1 of the formal API scaffold (Interactive DSP Calculation) to transform the v4 portal from a static demonstration into a live application.

---

*More phases will be logged here as work is completed.*
