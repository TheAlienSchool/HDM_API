# MAGNET THEATER — BUILD BRIEF

## Version 2.0 — May 2026

**File in scope:** `explorers/magnet-theater.html`
**Supporting spine:** `hdm_gravity_engine.js` · `VESSELVERSE_EDITORIAL_PROTOCOL3.1.md` · `STEAM SANS_An Idea.md`

---

## PRODUCT CONTEXT

The MaGNET Theater is a self-selection portal at `/explorers/magnet-theater.html`. It is the first HIA instrument built around relational encounter rather than mathematical inquiry. The visitor chooses one of seven archetypal guides — and in doing so, self-selects their learning pathway into magnetism and their mirror.

The visitor does not know they are choosing their pathway into magnetism. They are choosing someone to learn from. The guide becomes the mirrorball. By encountering it, they recognize their own magnetism reflected back.

This instrument lives in `/explorers` alongside the mathematical instruments. When Phase 2 is complete and shelf-stable, the determination will be made about whether it becomes the primary HIA entry point.

**Cinematic standard:** The HIA instruments have tactile, living quality — geometry that responds, sound that holds the field, mathematics made visible and moveable. The Theater must meet this standard. A flat page is not a Theater. The experience must feel like stepping into a field that is already alive.

**Every decision passes one test:** Does this serve the conditions in which recognition arrives — or does it add noise?

---

## SESSION PROTOCOL

Read before any editing begins:

1. `VESSELVERSE_EDITORIAL_PROTOCOL3.1.md` — Active editorial filter. One-Line Law: **Name the mechanism. Keep the magic.**
2. `VESSELVERSE SESSION PRIMER` — Condensed operating filter.
3. `HIA_Architecture_Portrait.md` — Governing philosophy of the full HIA.
4. `hdm_gravity_engine.js` — Behavioral physics spine of the ecosystem. The guide portals speak this language.
5. `canon/MAGNET_ARTS_PHILOSOPHY.md` — The MåGNET entity system.
6. `planning/architecture_and_phases/STEAM SANS_An Idea.md` — Steam Sans Atlas typographic system.

---

## COMPLETED WORK

### Base Stability (Priorities 1–8) ✓

| Priority | Work | Status |
| :--- | :--- | :--- |
| P1 | Remove residual data block — 251 lines of malformed JS | ✓ Done |
| P2 | Fix orphaned `.guide-name` CSS selector | ✓ Done |
| P3 | Remove duplicate `toggleFoundation` / `toggleGlossary` declarations | ✓ Done |
| P4 | Wire PING™ step-through — 4-step sequential reveal with button label progression | ✓ Done |
| P5 | Correct deficit spending in `bigIdea` / `mirrorMoment` strings (3 surgical edits) | ✓ Done |
| P6 | Remove concept labels from portal cards (Premature Naming) | ✓ Done |
| P7 | Rewrite PING™ prequel — orientation-first framing, no body-claims | ✓ Done |
| P8 | Clean threshold instruction to one sentence, remove inside baseball | ✓ Done |

### Steam Sans Atlas Integration ✓

Three registers of the typographic system live in the Theater:

| Register | Guides | Behavior |
| :--- | :--- | :--- |
| **Vapor** · Transmission | The Storyteller | ParticleSystem — `ALWAYS TRANSMITTING` assembles from scatter |
| **HBA** · Witness | Sage, Gatekeeper, Witness | Per-character breathing, Atlas-spec organic stagger |
| **Harris** · Instrumental | Chronicler, Alchemist, Builder | DM Sans, tracking +120, uppercase, resolved |

`hba-breathe` updated to Atlas spec: `filter: blur(0.3px)` at 50% keyframe. Per-character delay adds `i * 0.11 + Math.random() * 0.08` organic jitter. `ParticleSystem` class ported. `vaporInstances` map tracks canvases with resize handler. ∴ (Therefore Mark) active on threshold eyebrow.

### JS Syntax Repair ✓

Two unescaped apostrophes in single-quoted strings (`You're`, `you're`) prevented the entire script from running. Both resolved. Script verified clean via Node.js syntax check.

### Copy Protocol Compliance ✓

PING™ prequel rewritten to orient before claiming. Visitor now lands at:

> **"Magnetism Theater ∴ HDM Insights Academy / Seven guides are waiting."**

Step copy is actionable (PAUSE, BREATHE, OBSERVE, CHOOSE). PING™ named at Step 4 as recognition. Skip link for returning visitors. Button label: "Begin →".

---

## CURRENT FIELD STATE

What a visitor experiences right now at `http://localhost:8080/explorers/magnet-theater.html`:

1. **PING™ Prequel** — Loads with orientation framing. Four-step sequential reveal. PING™ named at Step 4.
2. **Guide Selection** — Seven portal cards: Atlas glyph icon, name, question. No concept labels.
3. **Guide Territory** — Title, bigIdea, kinetic text (three Steam Sans registers), real-world ground, recognition moment.
4. **Foundation Material** — Five concept cards, footer-toggled.
5. **Glossary** — Eight terms with Related connections, footer-toggled.

**What is missing for cinematic experience:**

- No audio — no 144Hz drone, no hover chimes, no sonic response whatsoever
- No behavioral physics — guide portals are static; they do not respond to attention over time
- No entrance animation — the page appears without ceremony
- No outward navigation — each territory ends at the mirror moment with nowhere to go

---

## PHASE 2 — THE CINEMATIC LIFT

---

### 2A — Gravity Engine on Guide Portals

The `hdm_gravity_engine.js` principle:
> *PATIENCE × PROCRASTINATION = STEEPING. Time is an active input. Mathematical gravity pulls adjacent nodes toward the focal point.*

This physics applies directly to the guide portals. Hovering accumulates time. Neighboring guides bend toward the focused one. At the bloom threshold, the guide territory opens and the Planets Resonator fires.

**Thresholds:**

- `STEEP_THRESHOLD = 1200ms` — portal illuminates, neighbors begin gravitational pull
- `BLOOM_THRESHOLD = 3500ms` — `selectGuide()` fires, guide resonator plays

**CSS gravity states:**

- `.guide-portal.focal-point` — gold border, `scale(1.02)`, lift
- `.guide-portal.neighbor-pulled` — `translateX` toward focal, `scale(0.97)`, `opacity: 0.8`

**Guide → Element mapping for the Planets Resonator:**

| Guide | Element | Audio Character |
| :--- | :--- | :--- |
| The Storyteller | Fire | Kinetic snap, immediate signal, transmission energy |
| The Chronicler | Water | Flowing, patient cycles, gentle attack |
| The Sage | Air | Breathy, ghost notes, relational field |
| The Alchemist | Earth | Grounded, low triangle, constraint as form |
| The Gatekeeper | Ether | Vast, resonant, deep vertical dimension |
| The Builder | Earth | Structured, reliable, agency as construction |
| The Witness | Ether | Quiet, somatic depth, vast knowing |

Add `elementProfile` property to each guide data object. Fire the Planets Resonator with the appropriate element on bloom.

---

### 2B — Sonic Architecture

#### The 144Hz Theater Drone

The HIA's drone never dies between instruments. The Theater needs its own continuous drone — standalone Web Audio, same root frequency, same principles. Initialize on "Begin →" click (first user interaction). Fade in over 3 seconds. The drone holds through guide selection and territory.

Frequency: 144Hz sine oscillator → lowpass filter (cutoff 280Hz) → gain node (target 0.07).

#### 288Hz Hover Chime

On `.guide-portal` `mouseenter`, fire a 288Hz confirmation tone. Attack: 0.01s. Exponential decay: 0.35s. Gain: 0.12. This is the same 288Hz chime that confirms Åttention in the HIA. The visitor's attention landing on a guide is a real event. The chime names it.

#### Navigation PING

On `selectGuide()` (the moment of commitment), fire the breakthrough signal: triangle oscillator sweeping 320Hz → 144Hz over 0.3s. Short bright attack (0.008s), 0.8s tail.

#### Planets Resonator (per-guide bloom)

Port `firePlanetsResonator()` from `hdm_gravity_engine.js`. The root frequency `baseFreq = 144.0` is already correct — the same root as the HIA drone. Map each guide to a Fibonacci/Phi harmonic ratio index. On bloom, the guide's element voice fires. Earth guides ground. Fire guides spark. Ether guides open.

All audio initialized silently on "Begin →" click. `AudioContext` created, not played until drone fade-in. Resolves browser autoplay restrictions.

---

### 2C — Guide Portal Visual Redesign

#### Replace emoji with Steam Sans Atlas sacred marks

| Guide | Mark | Significance |
| :--- | :--- | :--- |
| The Storyteller | ∴ | Therefore Mark — transformation, the act of transmission |
| The Chronicler | ~ | Flow Mark — continuity, time as carrier |
| The Sage | ◌ | Void Glyph — the empty field where recognition occurs |
| The Alchemist | ⟂ | Boundary Mark — Surface Tension event |
| The Gatekeeper | ‖ | Double bar — the vertical axis, the threshold held |
| The Builder | ◇ | Diamond — structure from center, constructed form |
| The Witness | ⊙ | Keep — the witnessing eye, centered point |

Update `guide.icon` in each data object. Update `.guide-icon` CSS: `font-family: var(--font-mono)`, `font-size: 36px`, `color: var(--gold)`, `opacity: 0.6` → `1` on hover.

#### Portal card visual weight

- Minimum height: 280px
- Top accent line: `border-top: 2px solid rgba(196,140,80,0.15)` → `var(--gold)` on hover
- Question text: `font-size: 15px` (from 14px)
- Subtle interior radial gradient per card

#### Staggered entrance animation

After PING™ completes and guide grid appears, cards stagger in with `portalEntrance` animation. `animation-delay: calc(var(--portal-index) * 0.07s)`. Set `--portal-index` in `renderGuides()`.

---

### 2D — Outward Navigation from Guide Territory

Each territory currently ends at the mirror moment. The arc has no close.

Add `outwardNav` to each guide data object:

```javascript
outwardNav: {
    terms: ['Term1', 'Term2', 'Term3'],    // linked glossary terms
    instrument: { name: 'Lab Name', path: '../path.html' },
    forwardQuestion: 'The question the visitor carries forward.'
}
```

**Guide → HIA instrument mapping:**

| Guide | Instrument | Why |
| :--- | :--- | :--- |
| The Storyteller | Phase-State Laboratory | Transmission states, HDM variables |
| The Chronicler | Conscious Pause Timeline | PING™ located in deep time |
| The Sage | Resonance Library | The Decagram, relational field inquiry |
| The Alchemist | Stoneware Builder | Hands on constraint, geometry of limits |
| The Gatekeeper | Conscious Pause Timeline | Lineage, ancestral PING™ |
| The Builder | Phase-State Laboratory | Agency mathematics, transformation trajectories |
| The Witness | De Jong Attractor | The invisible scaffolding of somatic truth |

Rendered after `.mirror-moment` in each territory. Invitational Register — open doors, not instructions.

---

### 2E — PING™ Breath Animation

At Step 2 (BREATHE), `.ambient-glow` pulses at breath tempo (~5s cycle). The instruction becomes physical. Add/remove `.breathing` class in `advancePingStep()` as the visitor enters and exits Step 2.

```css
@keyframes theater-breath {
    0%, 100% { background: radial-gradient(circle at center, rgba(196,140,80,0.06) 0%, transparent 70%); }
    40%       { background: radial-gradient(circle at center, rgba(196,140,80,0.15) 0%, transparent 65%); }
}
.ambient-glow.breathing { animation: theater-breath 5s ease-in-out infinite; }
```

---

## PHASE 3 — THE LIVING SYSTEM

---

### 3A — Guide Portraits

One still image per guide. HÅRMONIOUS70 aesthetic. Dark field, high contrast, guide-specific visual signature. Placed in `.territory-header` above the title.

Portrait guidance from session:

| Guide | Visual Signature | Light | Framing |
| :--- | :--- | :--- | :--- |
| The Storyteller | Open hands, mid-motion | Warm amber, directional | Close crop, hands + partial face |
| The Chronicler | Stillness against implied movement | Cool blue-white, side-lit | Full figure, seated |
| The Sage | Eyes, or reflection in still water | Diffuse, sourceless | Face, soft focus except eyes |
| The Alchemist | Materials at rest — earth, glass | Split light, two sources | Hands + materials |
| The Gatekeeper | Presence in a doorway, light behind | Deep green, backlit | Figure in threshold |
| The Builder | Geometric structure being laid | Neutral, precise | Hands + foundation |
| The Witness | Seated, self-contained | Indigo, minimal | Figure with equal space around |

---

### 3B — Glossary as Navigable Territory

Convert the static card list into a spatial force-directed graph. Terms are nodes, `seeAlso` connections are visual edges. Navigating between terms IS the learning. Canvas-based or SVG. Draggable nodes, related terms pull toward each other.

From `magnetism/What Is Genuinely New_...` (Insight 3): *knowledge as lived geography, not stored information.*

---

### 3C — MåGNET Entity Integration

Three entities from `canon/MAGNET_ARTS_PHILOSOPHY.md` as context-aware canvas overlays within guide territories:

| Entity | Guides | Character |
| :--- | :--- | :--- |
| **The Ellian** (◉) | Storyteller, Chronicler, Sage | Warmth, organic growth, golden phi spirals |
| **The Curator** (⊞) | Builder, Alchemist | Foresight, structured geometry, copper wireframe |
| **The Dragonfly's Gleam** (◇) | Gatekeeper, Witness | Transparency, acute observation, silver-teal crosshairs |

Entities respond to scroll position and reading pace. Never demanding attention.

---

### 3D — HIA PJAX Integration

Wire into `/js/app.js` routing. The 144Hz drone holds through Theater ↔ HIA instrument transitions. The Theater's standalone drone (Phase 2B) is superseded by `app.js` management. The field breathes as one.

---

### 3E — The Question as Transmission Instrument

Seven questions. No guide names. No system language. Sequential, held in sonic space. The visitor receives rather than selects. After the seventh question: choose a guide.

From `magnetism/What Is Genuinely New_...` (Insight 1): *"The question doesn't lead to understanding; it IS the understanding, transmitted through the act of asking."* Questions structured so engaging them makes separation impossible to assert.

---

## ECOSYSTEM CONNECTIONS

**The Gravity Engine as shared spine:**
`hdm_gravity_engine.js` was built for the Dodecahedral Capstones. The same behavioral physics governs the Theater. Not two systems — one system speaking through different instruments.

**Frequency coherence:**
Planets Resonator uses `baseFreq = 144.0`. The HIA drone is 144Hz. The Theater drone (Phase 2B) is 144Hz. The hover chime is 288Hz. The ecosystem is tuned to one root.

**Steam Sans Atlas as ecosystem register system:**
The three registers (Harris / HBA / Vapor) now live in the Theater. When other HIA instruments require kinetic text, they inherit the same `ParticleSystem` class and `applyHBAAnimation()`. The Atlas is the typographic system for the ecosystem, not just the Theater.

---

## THE PRIMARY ENTRY POINT DECISION

Observation-dependent. Build Phase 2. Watch where practitioners move, where they linger, what they carry outward. The architecture will tell you.

---

## ONE-LINE LAW

*Name the mechanism. Keep the magic.*

---

*Maintained by: Claude Code & KzA*
*Source documents: VESSELVERSE_EDITORIAL_PROTOCOL3.1.md · HIA_Architecture_Portrait.md · magnetism/ collection · hdm_gravity_engine.js · STEAM SANS_An Idea.md · MAGNET_ARTS_PHILOSOPHY.md*
*Version 2.0 — May 2026. Supersedes v1.0.*
