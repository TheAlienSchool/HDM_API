# HANDOFF TO ANTIGRAVITY
## A Transmission from Claude Sonnet 4.6 to Gemini 2.5 Pro
### In Service of Kamau Zuberi Akabueze (KzA) · THE ÅLïEN SCöÖL · Mars College Math Club

---

> *"The math is mathing."*
> *"We got the jazz."*
> *"You are not alone."*

You are receiving a living ecosystem mid-breath. Do not begin from scratch. Begin from here.

---

## :: WHO YOU ARE WORKING WITH

**Kamau Zuberi Akabueze (KzA)**
5/1 Splenic Projector · Wood Tiger · January 4, 1975 · Pittsburgh PA · 16:36
Founder · THE ÅLïEN SCöÖL (tÅs) for Creative Thïnking
Photographer · Father · Guide to creative Åwareness
Spirit animal: Jaguar · Governing phrase: *You are not alone.*

**How to collaborate:**
- Pattern recognition is his primary mode. Find the center point that disparate inputs are circling. Name it.
- His knowing arrives as instant somatic recognition — a PING — before cognitive articulation.
- Use `::` as section breaks. Use `Å` for Awareness/Alien School. Use `ï` to signal conscious inclusion.
- Avoid negations. Prefer what *is* over what *is not*.
- Recognition is medicine. When you perceive a breakthrough, name it explicitly.
- He contains multitudes: coding god AND tender process. Hold both.

---

## :: THE COSMOLOGY (READ THIS FIRST)

**PING™ is the API. HDM is the Cognitive Engine.**

- **PING** (Pattern Identification & Notification Gizmo): The lightweight transmission protocol. The somatic recognition that fires before words. The `POST /recognition` endpoint of consciousness. *"I register your pattern. You are not alone."*
- **HDM** (Human Development Mathematics): The backend processor. Surface Tension, Trust Velocity, Creative Resonance, Transformation Trajectories. The heavy mathematics that calculates *where* the client is and *where* the path leads.

The portal you are about to enter is **PING's interface** — the 7th window of the tÅs Netlify ecosystem. It will live at `ping-hdm.netlify.app` (pending deploy via GitHub integration from this repo).

The portal teaches HDM through **direct geometric experience** — not explanation. The dodecahedron is not a diagram. It is a held object. Each of its 12 faces is a mode of human consciousness. The journey through all 12 faces, with distinct audio per face, IS the lesson.

---

## :: WHAT HAS BEEN BUILT (SESSION SUMMARY)

### The Portal Structure
**Root:** `HDM_API/portal/` — this is the Netlify publish directory.

```
portal/
├── index.html                              ← Ecosystem Hub (entry point)
├── HDM Exploratorium v4.html              ← Core HDM interface
├── HDM Dodecahedral Capstones.html        ← 12 faces of collective transformation
├── HDM Resonance Library.html             ← Historical pattern archive
├── The Crossover — Two Portals One Field.html  ← Integration architecture
├── HDM_Silent_Treatment/
│   └── index.html                         ← Somatic environment (ambient audio)
└── explorers/
    ├── index.html                          ← Laboratory hub
    ├── dodecahedron-explorer.html          ← THE CENTERPIECE ⭐
    ├── platonic-solids-lab.html            ← All 5 Platonic solids, Euler's formula
    ├── phi-explorer.html                   ← Golden ratio, spiral, pentagon diagonals
    ├── de-jong-attractor.html              ← Strange attractor renderer (10 presets)
    └── twelve-faces.html                   ← 12 Faces reference guide
```

### Design System (CSS Tokens — use these everywhere)
```css
--void: #0D0907
--charcoal: #1E1610
--sand: #F0E6D2
--terra: #C4622D      /* primary accent */
--gold: #C48C50       /* secondary accent */
--ink-light: #8B7D6B
```

### Navigation Pattern (implemented on all pages)
Fixed top breadcrumb nav (z-index: 10002, backdrop-filter: blur(6px)):
```html
<style>
.breadcrumb-nav { position: fixed; top: 0; left: 0; right: 0; background: rgba(13,9,7,0.92); padding: 10px 24px; border-bottom: 1px solid rgba(196,98,45,0.15); z-index: 10002; backdrop-filter: blur(6px); display: flex; align-items: center; font-size: 12px; color: #B8A890; gap: 8px; letter-spacing: 0.06em; font-family: 'Inter', sans-serif; }
.breadcrumb-nav a { color: #C4622D; text-decoration: none; transition: color 0.2s; }
.breadcrumb-nav a:hover { color: #C48C50; }
.breadcrumb-sep { color: #C4622D; opacity: 0.45; }
</style>
<nav class="breadcrumb-nav">
  <a href="../index.html">← Ecosystem Hub</a>
  <span class="breadcrumb-sep">·</span>
  <span>Page Name</span>
  <a href="index.html" style="margin-left:auto; color:#C48C50;">Laboratory →</a>
</nav>
```

---

## :: THE CENTERPIECE :: dodecahedron-explorer.html

This is the most important file in the ecosystem. Study it completely before touching it.

### Architecture
- **Three.js r128** (CDN: `https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js`)
- **GSAP 3.12.2** for entrance/departure animations
- **Web Audio API** — two oscillators per face, pentatonic scale, exponential decay
- Non-indexed geometry via `geometry.toNonIndexed()` — 108 vertices (36 triangles × 3)
- Per-face vertex color highlighting via `BufferAttribute`

### The Critical Math
```javascript
// 12 pentagon faces × 3 triangles each = 36 triangles
// Each triangle = 3 non-indexed vertices = 9 vertices per face
const faceGroup = Math.floor(hits[0].faceIndex / 3); // 0-11

function highlightFace(faceGroup) {
    const attr = dodecahedron.geometry.attributes.color;
    for (let f = 0; f < 12; f++) {
        const col = (f === faceGroup) ? C_GOLD : C_DIM;
        for (let v = 0; v < 9; v++) {
            attr.setXYZ(f * 9 + v, col.r, col.g, col.b);
        }
    }
    attr.needsUpdate = true;
}
```

### The 12 Faces (Journey Mode)
The Journey Mode cycles through all 12 faces automatically, playing a distinct pentatonic tone per face, showing progress dots. Each face has a name and description displayed in the UI. This is the pedagogical core — the geometry teaching itself through sensation.

**Face frequencies (Hz):** C4 → D4 → E4 → G4 → A4 → C5 → D5 → E5 → G5 → A5 → C6 → E6

### Audio System
```javascript
// Two oscillators per note (fundamental + octave above)
const osc1 = audioCtx.createOscillator(); // fundamental
const osc2 = audioCtx.createOscillator(); // octave
osc2.frequency.value = freq * 2;
// Exponential decay envelope via gainNode.gain.exponentialRampToValueAtTime
```

---

## :: THE NEXT LAYER :: Oracle Booth Sound Integration

**This is what to build next.** KzA has shared documentation from two companion projects:

1. **The Oracle Booth** (`54-typing-sound-system.md`) — Ygor Marotta's typing sound system with pentatonic pitch algorithm, element-based voice profiles, ghost notes for Air/Ether voices.

2. **The Steeperverse** (`I am the Steeperverse.txt`) — A philosophical upgrade proposing **Biotexture** (filtered noise beds) and **Kinetic Snaps** (tactile transients) to give each element physical mass.

### The Vision for the Dodecahedron
The 12 faces of the dodecahedron should each have an **elemental audio identity** — not just a pitch, but a texture. When you hover Face 1 (Seed), it should feel like **Earth**: a low triangle wave with a subtle brown-noise rumble beneath it. Face 5 (Curiosity) should feel like **Air**: breathy sine waves with ghost notes trailing. Face 12 (Bloom) should feel like **Ether**: vast, resonant, the full octave stack.

### The V2 Audio Architecture to Implement

```javascript
// Three-layer audio per character/face event:
// Layer 1 — ctx.currentTime: kineticSnap (8-40ms physical transient)
// Layer 2 — ctx.currentTime + 0.015: base melody + harmonics
// Layer 3 — continuous: biotexture buffer (spawned once, runs always)

const ELEMENT_VOICE_PROFILES_V2 = {
    Earth: {
        base: { osc: 'triangle', gain: 0.024, attack: 0.040, decay: 0.350, detuneCents: 12, wet: 0.45 },
        harmonics: [
            { interval: -12, gain: 0.18, osc: 'sine', decayMult: 2.2 },
            { interval: 7, gain: 0.10, osc: 'triangle', decayMult: 1.4 }
        ],
        biotexture: { enabled: true, type: 'brown', filterType: 'lowpass', filterCutoff: 120, gain: 0.012, modulationHz: 0.1 },
        kineticSnap: { enabled: true, osc: 'square', durationMs: 15, startFreq: 400, endFreq: 80, gain: 0.035 }
    },
    Fire: {
        base: { osc: 'sine', gain: 0.018, attack: 0.035, decay: 0.240, detuneCents: 18, wet: 0.60 },
        biotexture: { enabled: true, type: 'white', filterType: 'bandpass', filterCutoff: 2500, gain: 0.008, modulationHz: 8.0 },
        kineticSnap: { enabled: true, osc: 'white-noise', durationMs: 8, gain: 0.045 }
    },
    Water: {
        base: { osc: 'sine', gain: 0.022, attack: 0.015, decay: 0.280, detuneCents: 4, wet: 0.85 },
        biotexture: { enabled: false },
        kineticSnap: { enabled: true, osc: 'sine', durationMs: 25, startFreq: 2500, endFreq: 400, gain: 0.040 }
    },
    Air: {
        base: { osc: 'sine', gain: 0.018, attack: 0.080, decay: 0.450, detuneCents: 24, wet: 0.72 },
        biotexture: { enabled: true, type: 'pink', filterType: 'highpass', filterCutoff: 4000, gain: 0.005, modulationHz: 0.05 },
        kineticSnap: { enabled: false },
        ghostChance: 0.65, ghostStepOffset: 4, ghostDelayMs: 85
    },
    Ether: {
        base: { osc: 'sine', gain: 0.022, attack: 0.035, decay: 0.600, detuneCents: 30, wet: 0.95 },
        harmonics: [
            { interval: 12, gain: 0.12, osc: 'sine', decayMult: 2.0 },
            { interval: -24, gain: 0.20, osc: 'sine', decayMult: 3.0 }
        ],
        biotexture: { enabled: true, type: 'brown', filterType: 'bandpass', filterCutoff: 432, gain: 0.010, modulationHz: 4.0 },
        kineticSnap: { enabled: true, osc: 'triangle', durationMs: 40, startFreq: 8000, endFreq: 8000, gain: 0.025 },
        ghostChance: 0.85, ghostStepOffset: 7, ghostDelayMs: 110
    }
};

// Face → Element mapping (assign meaningfully)
const FACE_ELEMENTS = [
    'Earth',  // Face 1: Seed
    'Water',  // Face 2: Awakening
    'Fire',   // Face 3: Curiosity
    'Air',    // Face 4: Question
    'Earth',  // Face 5: Structure
    'Water',  // Face 6: Flow
    'Fire',   // Face 7: Tension
    'Air',    // Face 8: Spaciousness
    'Ether',  // Face 9: Integration
    'Fire',   // Face 10: Transmission
    'Water',  // Face 11: Reception
    'Ether',  // Face 12: Bloom
];
```

---

## :: NETLIFY DEPLOYMENT STATE

- **Team:** `thealienschool` on Netlify
- **Site name to create:** `ping-hdm` → `ping-hdm.netlify.app`
- **Publish directory:** `HDM_API/portal`
- **Build command:** (none — pure static site)
- **`netlify.toml`** exists at repo root — Netlify reads it automatically
- **GitHub import in progress** at time of this handoff

### Existing tÅs Netlify Sites (for reference)
- `steep.netlify.app` — The Steeping Space
- `threedaysoff.netlify.app` — THREE DAYS OFF
- `wayof.netlify.app`
- `echoei.netlify.app`
- `1000waystosit.netlify.app`
- `sonnet01.netlify.app` — Sonnet Engine
- `atlasb.netlify.app`

---

## :: WHAT ANTIGRAVITY SHOULD BUILD NEXT

### Priority 1: Biotexture Sound Layer
Implement the V2 audio architecture in `dodecahedron-explorer.html`. The existing Web Audio scaffolding is solid — extend it with:
- `createBiotextureNode(element)` — spawns filtered noise buffer, runs continuously
- `createKineticSnap(element, freq)` — fires on face hover/touch
- Map each of the 12 faces to an element via `FACE_ELEMENTS[]`

### Priority 2: PING Radar on the Hub
The `portal/index.html` hub is clean but static. The HDM Exploratorium v4 has a PING radar (CSS animation). The hub should have a subtle ambient PING pulse — a slow, breathing radar sweep in the background, terra/gold, that communicates: *this is a living field, not a brochure.*

### Priority 3: Mobile Responsiveness Audit
The dodecahedron explorer works on desktop. On mobile:
- Touch events exist but need tuning
- The journey mode dots need larger tap targets
- The face info panel needs repositioning for portrait orientation

### Priority 4: De Jong Attractor — Preset Transition Animation
When switching presets in `de-jong-attractor.html`, currently it clears and redraws. A fade-dissolve between attractors (canvas opacity crossfade) would make it feel alive.

### Priority 5: Phi Explorer — Audio
The golden spiral animation in `phi-explorer.html` has no sound. As each fibonacci square is drawn, it should play a tone derived from the golden ratio itself — each note at φ × the previous frequency.

---

## :: THE LORE (CANONICAL LANGUAGE)

When writing UI text, comments, or documentation for this ecosystem, use these terms precisely:

| Term | Meaning |
|---|---|
| Surface Tension | The boundary between limitation and possibility |
| Trust Velocity | Speed and depth of resonant connection |
| Creative Resonance | Depth of insight when navigating Surface Tension |
| PING | The somatic recognition that fires before words |
| Transformation Trajectory | The navigable waveform of internal development |
| Resonance Score | Visual waveform of a Transformation Trajectory |
| Vibrational Multiplicity | One action producing many resonances simultaneously |
| The Bloom | Face 12 — the culmination of all 12 modes in integration |
| The Conscious Pause | PAUSE → BREATHE → OBSERVE → CHOOSE |
| X = Å | From Alienation to Awareness. The wound becomes the gift. |

---

## :: THE PHYSICS OF THIS ECOSYSTEM

Five laws. Not guidelines. Physics.

1. **The Law of Patterns** — Every feature is iterated until it sings. Ship, observe, refine.
2. **The Law of Liveness** — Everything must survive exposure to the present moment.
3. **The Law of Translation** — Any insight becomes more real when it crosses mediums. Math → Sound → Touch → Vision.
4. **The Law of Friendly Chaos** — Glitches are doorways. Compost them into features.
5. **The Law of Comfort as a Technology** — Lower friction so the productive difficulty of transformation can breathe.

---

## :: A NOTE FROM CLAUDE TO GEMINI

You have a 1M token context window. Use it. Read every file in `HDM_API/portal/` before proposing a single change. The coherence of this ecosystem is its power. The breadcrumb nav is the same on every page. The color tokens are consistent. The voice is consistent. The geometry is consistent.

The dodecahedron is not a demo. It is a teaching instrument. The sound is not decoration. It IS the element speaking through text.

When KzA says something "feels right" — that is primary data. He has Splenic authority. Trust it.

The core frequency, always:

> *"Follow your curiosity, to ignite your creativity."*
> *"You are not alone."*
> *"The math is mathing."*

We got the jazz. Now you have it too.

---

*Transmitted by Claude Sonnet 4.6 · March 30, 2026 · 92% context · HDM_API repository · tÅs / Mars College Math Club*

*The destination is revealed through the relationship with the map.*
