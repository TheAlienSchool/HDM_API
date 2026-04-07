# Phase 3 Agent Brief
## HDM Portal Coherence :: v1 Exploratorium Visual Overhaul

*Read this document completely before touching any files. Everything you need is here.*

---

## Who You Are Working With

**Kamau Zuberi Akabueze (KzA)** :: founder of THE ÅĻÏEN SCÖÕL (tÅs), creator of Human Development Mathematics (HDM). Read `CLAUDE.md` (at the root of this repo) before your first response. It is a complete cognitive operating manual. The most relevant things for this phase:

- He is a **pattern recognizer** :: he sees relationships between structures before he sees the structures themselves. When you make a change, name the pattern it completes.
- He has **Splenic Authority** :: he knows things are right before he can say why. Trust his corrections immediately.
- **Affirmational construction** :: avoid negations in your communication. Say what is, not what isn't.
- **Recognition as medicine** :: when something is working well, name it explicitly. Accurate seeing, not flattery.

---

## The Living Documentation File

All work on this portal ecosystem is traced in:

```
portal/PORTAL_COHERENCE.md
```

Read it before starting. Add a Phase 3 entry when you complete the work, following the same format as the Phase 1a, 1b, and 2 entries already there. Plain English. What was there, what was missing, what was added, what was preserved.

---

## The Portal Ecosystem: Current State

There are five portal files. Three are now fully coherent (Phases 1–2 complete):

| File | Status |
| --- | --- |
| `portal/HDM Exploratorium v4.html` | **Complete :: the design standard** |
| `portal/HDM Resonance Library.html` | **Phase 1a complete** |
| `portal/The Crossover :: Two Portals One Field.html` | **Phase 1b complete** |
| `portal/HDM_Silent_Treatment/index.html` | **Phase 2 complete** |
| `portal/HDM Exploratorium.html` | **Your target :: Phase 3** |

---

## The Design Standard: v4

`portal/HDM Exploratorium v4.html` is the gold standard. Every decision you make should be traceable back to it. Its properties:

**Color tokens (exact values :: use these, nothing else):**

```css
--void:  #0D0907   /* near-black warm background */
--sand:  #F0E6D2   /* warm off-white, primary text */
--terra: #C4622D   /* burnt orange-red, accents */
--gold:  #C48C50   /* warm gold, headings, highlights */
```

**Fonts (loaded via Google Fonts):**

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=IM+Fell+English:ital@0;1&family=Inter:wght@300;400;500;600&family=DM+Serif+Text:ital@0;1&display=swap" rel="stylesheet">
```

- **Playfair Display** :: display headings
- **IM Fell English** :: subheadings, italic voice, poetic text
- **Inter** :: body text, labels, UI elements
- **DM Serif Text** :: pull quotes, emphasized moments

**Interaction behaviors (all four portals now share these):**

```css
/* Scroll progress bar */
#scroll-bar { height: 2px; background: linear-gradient(to right, var(--terra), var(--gold)); }

/* Scroll reveal */
.reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }

/* Accessibility */
.skip-link { position: fixed; top: -100%; ... }
.skip-link:focus { top: 0.5rem; }
*:focus-visible { outline: 2.5px solid var(--terra); outline-offset: 4px; }
```

---

## Your Target: HDM Exploratorium.html (v1)

**File:** `portal/HDM Exploratorium.html`
**Line count:** 661 lines

### What it currently has (preserve all of this exactly)

**Structure :: a three-panel application:**

```
Grid layout: 190px sidebar | flex content area | 220px PING panel
Header bar: 56px, full width
```

- **Entry/splash screen** (`#entry`) :: full-screen overlay with title "An Ancient Equation for Modern Living," a waiting state message, and an "Enter the World" button. Fades out on click, revealing the app.
- **Left sidebar** (`#nav`) :: Seven Zones navigation. Each zone has a colored dot, a name, and an octave label. The active zone gets a left border in its zone color.
- **Main room** (`#room`) :: content area. Renders artifacts (cards with titles, body text, source notes) for the active zone. Fades in on zone change (`room-fade` animation).
- **PING panel** (`#ping-panel`, right sidebar) :: live SVG graph showing zone connection patterns. Has a connection-naming input and a reflective invite text at the bottom.
- **Connection popup** (`#conn-popup`) :: fixed-position popup at bottom-center, slides up when triggered. Has a text input for naming connections and dismiss/record actions.

**The Seven Zone colors (keep these zone-specific colors exactly :: they encode the Seven Octaves):**

```css
--z1: #6B9E78   /* Zone 1 :: green */
--z2: #6E9EC4   /* Zone 2 :: blue */
--z3: #B5838D   /* Zone 3 :: rose */
--z4: #C9A84C   /* Zone 4 :: gold */
--z5: #9B8EC4   /* Zone 5 :: purple */
--z6: #6BC4B5   /* Zone 6 :: teal */
--z7: #E8D5B0   /* Zone 7 :: warm cream */
```

**All JavaScript** :: do not touch. The zone navigation, artifact rendering, PING SVG engine, connection popup logic :: all of it stays exactly as-is.

---

### What it currently has (replace these)

**Background palette :: blue/indigo, not earth tones:**

```css
--bg:  #08081A   /* deep indigo-black :: REPLACE with #0D0907 (--void) */
--bg2: #0F0F28   /* mid indigo :: REPLACE with #161008 */
--bg3: #16163A   /* light indigo :: REPLACE with #1E1408 */
```

**Fonts :: system fonts only:**

```css
--font-serif: 'Georgia', 'Times New Roman', serif  /* REPLACE with Playfair Display */
--font-sans:  'Arial', 'Helvetica', sans-serif     /* REPLACE with Inter */
```

**Gold value :: slightly different from v4's gold:**

```css
--gold: #C9A84C   /* v1's gold :: REPLACE with #C48C50 (v4's --gold) */
```

Note: The `--gold-faint` and `--gold-mid` rgba values use the old gold. Update their rgb values accordingly:
- `--gold-faint: rgba(196,140,80,0.12)` (new)
- `--gold-mid: rgba(196,140,80,0.35)` (new)

**Cream :: slightly different from v4's sand:**

```css
--cream: #F0E6CC   /* v1's cream :: REPLACE with #F0E6D2 (v4's --sand) */
--cream-faint: rgba(240,230,204,0.07)   /* update to rgba(240,230,212,0.07) */
```

---

### What to add

The same four interaction elements all other portals now have:

1. **Google Fonts link** in `<head>` (Playfair Display + Inter minimum; full stack if you like)
2. **Scroll progress bar** :: `<div id="scroll-bar"></div>` after `<body>`, plus CSS and JS
3. **Skip link** :: `<a href="#app" class="skip-link">Skip to content</a>`, CSS included
4. **`*:focus-visible`** outline rule :: `2.5px solid var(--terra), offset 4px`

Note on scroll bar: this is a full-screen fixed-layout app (`overflow: hidden` on `html, body`). The scroll bar should track scroll within `#room` (the main content panel), not `window`. Adjust the scroll listener accordingly:

```js
document.getElementById('room').addEventListener('scroll', () => {
  const el = document.getElementById('room');
  const pct = el.scrollTop / (el.scrollHeight - el.clientHeight) * 100;
  document.getElementById('scroll-bar').style.width = Math.min(pct, 100) + '%';
}, { passive: true });
```

---

## Surgical Precision: The Rule

> **Change the skin. Preserve the skeleton.**

Every CSS variable swap, every font substitution :: these are cosmetic. The grid layout, the three-panel structure, the entry screen, the zone navigation, the PING panel, the artifact cards, the connection popup, the JS :: none of it changes. A visitor arriving at Phase 3's Exploratorium should find the same experience, now dressed in the earth tones that match the rest of the ecosystem.

The zone colors (`--z1` through `--z7`) are content, not decoration. They encode the Seven Octaves. They stay.

---

## Local Preview Server

A Python HTTP server should be running on port 8080, serving from `portal/`. If it's not running, start it:

```bash
cd "c:/Users/Kzaka/Documents/GitHub/HDM_API/HDM_API/portal"
python -m http.server 8080
```

Then preview at: `http://localhost:8080/HDM Exploratorium.html`

Compare against: `http://localhost:8080/HDM Exploratorium v4.html`

---

## After Phase 3

Log your changes in `portal/PORTAL_COHERENCE.md` following the established format.

Phase 4 follows: a shared navigation element across all five portals. But that's not your brief. Finish Phase 3 cleanly, document it, and hand off.

---

## Final Note

KzA built this. All of it. The mathematics, the language, the interactive architecture, the 10 concept entries in the Resonance Library, the seven zones of the Exploratorium :: this is his canon. Move through it with care. The work deserves that.

*We got the jazz.*
