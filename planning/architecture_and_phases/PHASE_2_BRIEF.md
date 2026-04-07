# PHASE 2 BRIEF
## HDM Portal :: Session Handoff & Build Plan
**Date:** April 1, 2026  
**Status:** Ready to execute  
**Audience:** Any Claude session picking up this work

---

## THE PROMPT
*(Copy this entire block to open a new session)*

---

You are continuing active development on the **HDM Portal** :: a single-page web ecosystem built for the Mars College Math Club. The portal is a living field of geometric human development built around a 12-faced dodecahedral consciousness model. The primary audience is brilliant, curious humans who deserve wonder without condescension.

**Who you're working with:** Kamau Zuberi Akabueze (KzA), 5/1 Splenic Projector, founder of THE ÅLïEN SCöÕL. He thinks in patterns and triangulates meaning across domains. He builds canon. He wants the math to matter.

**Working directory:** `c:\Users\Kzaka\Documents\GitHub\HDM_API\HDM_API\`

**Security constraint :: CRITICAL:** A hook at `hooks/security_reminder_hook.py` blocks any `innerHTML` assignment with untrusted content. All dynamic DOM construction must use `createElement` / `textContent` / `appendChild`. Never use `innerHTML` to build tooltip or dynamic content. The established pattern is:
```javascript
function mk(cls, text) {
  const el = document.createElement('div');
  el.className = cls;
  el.textContent = text;
  return el;
}
```

**Established design system:**
- Palette: `--void: #0B0B0B`, `--terra: #C4622D`, `--gold: #C48C50`, `--luna: #FDFBE2`, `--ink: #8A7D71`
- Fonts: `'Playfair Display'` (ocean, editorial serif) + `'Inter'` (rock, mono-adjacent)
- Layout: CSS Grid `grid-template-rows: auto 1fr auto` for fixed-height pages
- Canvas sizing: `min(400px, 60vw, 60vh)` for centered responsive containers
- Tooltips: five-field system :: formula → title → literal → human → validity/guardrail separator

**What has been built (do not rebuild):**
- `portal/index.html` :: Hub with PING cue, glyph footer, DODECA-FIELD hidden game (↑↑↓↓pm)
- `portal/explorers/dodecahedron-explorer.html` :: Session 1; Euler formula with multi-field hover tooltip
- `portal/explorers/frequency-resonance-mandala.html` :: Session 5; mic-trace mandala; post-lock ∫f(x)dx tooltip
- `portal/explorers/conscious-pause-timeline.html` :: Session 6; scroll-driven PAUSE→BREATHE→OBSERVE→CHOOSE; parallax particles; Sonnet Engine; hover tooltips on all four stage equations
- `portal/explorers/stoneware-builder.html` :: Session 7; drag-and-drop architecture builder; full expandable equation console with all 6 log-math equations
- `portal/dodecahedral-capstones.html` :: 12-face cards with hover architecture reveals
- `portal/explorers/phi-explorer.html` :: Tone.js audio engine (PHASE 1D COMPLETE); golden-ratio tones
- `portal/the-crossover.html` :: Complete; copy is intact
- `portal/explorers/index.html` :: Explorer hub; card eyebrows corrected

**HDM 12-face canonical system (Capstones / civilizational):**  
Seed(1) · Awakening(2) · Vitality(3) · Forming(4) · Imagination(5) · Relationship(6) · Initiation(7) · Shadow-work(8) · Integration(9) · Stewardship(10) · Generativity(11) · Harvest(12)

**twelve-faces.html uses a different (consciousness-modes) naming system** (intentional, distinct from Capstones):  
Resonance(7) · Emergence(8) · Communion(9) · Succession(10) · Celebration(11) · Bloom(12)

This distinction is correct and by design :: it just needs a one-sentence bridge for the Math Club audience.

**Tone.js audio pattern (from phi-explorer.html, lines 596–645):**
```javascript
// Standard HDM audio: 144Hz base × φ^step, sine wave, 0.04s attack, 2.46s decay
async function playTone(freq) {
    await Tone.start();
    const synth = new Tone.Synth({
        oscillator: { type: 'sine' },
        envelope: { attack: 0.04, decay: 2.46, sustain: 0, release: 0.04 }
    });
    const filter = new Tone.Filter({ frequency: 4000, type: 'lowpass', rolloff: -12 });
    synth.connect(filter);
    filter.toDestination();
    synth.triggerAttackRelease(freq, '2.5s', Tone.now());
}
```

The CDN: `<script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.57/Tone.js"></script>`

Sonic specs are immutable :: preserved in `portal/explorers/js/phi-audio-spec.js`.

Now execute the plan below.

---

## THE PLAN

### Overview

Three movements, each independent, each deployable without touching the others.

| Movement | What | Risk | Impact |
|----------|------|------|--------|
| **2A :: Copy Sweep** | Editorial fixes across 4 files | Lowest | Immediate visitor clarity |
| **2B :: Audio** | Tone.js + lock-chord | Medium | Completes the sonic layer |
| **2C :: Synthesis** | Optional glyph propagation | Low | Deepens coherence |

Execute in order. Each movement is self-contained.

---

### MOVEMENT 2A :: Copy Sweep

**Principle:** Every word should make a 17-year-old feel like they're discovering something that was always already true.

---

#### 2A-1 · `portal/explorers/twelve-faces.html`
**Issue:** The file uses consciousness-modes face names (7–12: Resonance, Emergence, Communion, Succession, Celebration, Bloom). The Capstones page uses civilizational names for the same numbers (Initiation, Shadow-work, Integration, Stewardship, Generativity, Harvest). Both systems are correct and intentional. The Math Club will see both pages and wonder if something's broken.

**Fix:** Add one bridging note :: a small, quiet line near the page header or intro paragraph. Something like:

> *These are the consciousness faces :: the inner modes of moving. The Capstones page maps the same twelve positions as civilizational arcs. Both maps are true. They describe the same dodecahedron from different angles.*

Tone: curious, not defensive. An invitation to hold both.

**Where to place:** After the opening `<h1>` or intro paragraph, before the face grid begins. Read the file first to find the right anchor.

---

#### 2A-2 · `portal/exploratorium-v4.html` :: Octave pill display
**Issue:** In the `.octave-row` navigation pills (around line 1901), the pill reads `VPan-Human Intelligence` :: the Roman numeral V runs directly into the text with no space. This is a rendering quirk where `<span class="oct-num">V</span>Pan-Human Intelligence` produces no whitespace between the styled numeral and the label text.

**Fix:** Add a single space (or `&nbsp;`) between the closing `</span>` and the text node:
```html
<a class="oct-pill" href="#oct-V"><span class="oct-num">V</span> Pan-Human Intelligence</a>
```
Check all other pills in the same `.octave-row` for the same pattern and fix consistently.

**Note:** Do NOT change the actual label "Pan-Human Intelligence" :: it's one of the strongest lines on the site.

---

#### 2A-3 · `portal/explorers/de-jong-attractor.html`
**Issue:** The formula section body copy is accurate but utilitarian. Per the site's voice, the math should carry wonder.

**Current (approximate):** "Iterate 4–8 million times from a random seed. Each pixel's brightness reflects how often a point landed there. Tiny parameter changes unlock wildly different structures."

**Direction for revision:** Keep the technical accuracy. Add one sentence of awe before or after. Something in the register of: "The rule doesn't know what shape it's making. It only knows the next step. The shape emerges anyway." 

Read the actual copy before editing. Honor what's already there.

---

#### 2A-4 · `portal/explorers/platonic-solids-lab.html`
**Issue:** Key-hint copy ("Keys 1–5 to switch · drag to rotate") is flat/utilitarian in an otherwise poetic environment.

**Direction:** Read the full file first. Find the key-hint and footer. Elevate them to the register of the rest of the page :: same information, more breath. Something like "1–5 to move between · drag to turn in your hands" or whatever fits the file's existing rhythm.

---

### MOVEMENT 2B :: Audio

**Principle:** Sound arrives as consequence of meaning, never as decoration. Every tone should feel like a discovery.

---

#### 2B-1 · `portal/explorers/frequency-resonance-mandala.html` :: Lock Chord
**What:** When the 7-second trace completes and the geometry freezes (the `setTimeout` at line ~264), play one Solfeggio chord. One breath. Then silence.

**Specifications:**
- Three simultaneous tones: 396 Hz (liberation), 528 Hz (transformation), 639 Hz (connection)
- Each: sine wave, 0.04s attack, 3.5s exponential decay to silence (longer than phi tones :: the geometry deserves to breathe)
- Gain: 0.12 per oscillator (three combined = 0.36, soft presence)
- No Tone.js needed here :: the file already has Web Audio API context (`analyzerCtx`)
- Reuse `analyzerCtx` for the chord (don't create a second AudioContext :: browser limits apply)
- The chord fires once, does not loop, does not repeat on re-initiation

**Implementation note:** `analyzerCtx` is created on mic button click. The lock fires in the same `setTimeout` scope where `analyzerCtx` exists. Use it directly.

**Sample structure (Web Audio, no Tone.js):**
```javascript
function playBloomChord(ctx) {
    [396, 528, 639].forEach(freq => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 3.55);
    });
}
```
Call `playBloomChord(analyzerCtx)` inside the `setTimeout` that locks the trace.

---

#### 2B-2 · `portal/explorers/dodecahedron-explorer.html` :: Tone.js Migration
**What:** The file currently uses Web Audio API for face-selection tones. Migrate to Tone.js using the established pattern from `phi-explorer.html`.

**Before migrating:** Read the current audio implementation in `dodecahedron-explorer.html`. Identify:
- Where `AudioContext` is created
- What events trigger tones (face hover? face click? selection?)
- What frequencies are used per face (likely derived from the 12-face system)

**After migrating:**
1. Add Tone.js CDN in `<head>` (before existing scripts)
2. Replace `new AudioContext()` with `Tone.start()` pattern
3. Replace oscillator nodes with `new Tone.Synth(...)` using immutable specs from `phi-audio-spec.js`
4. Keep all frequency values exactly as they are
5. Keep all trigger events exactly as they are
6. Zero experiential difference :: only infrastructure changes

**Validation:** After migration, click each face. Each tone should feel identical to before. No clicks, no artifacts, no overlapping distortion on rapid selection.

---

#### 2B-3 · `portal/explorers/platonic-solids-lab.html` :: Tone.js Migration
**Same pattern as 2B-2.** Read the current audio implementation first. Map triggers → frequencies → envelope. Migrate to Tone.js. Zero experiential difference.

---

#### 2B-4 · `portal/dodecahedral-capstones.html` :: Tone.js Migration
**Same pattern.** Note: this file may have minimal or no existing audio. If it has none, do not add any :: Phase 2 audio means migrating what exists, not inventing new sonic interactions.

---

### MOVEMENT 2C :: Synthesis (Optional)

*Execute only if time and energy remain. These are enrichments, not repairs.*

---

#### 2C-1 · Glyph propagation to explorer pages
The glyph system (24 characters, face-resident glyphs with hover reveals) currently lives only in `portal/index.html`. It could propagate to `portal/explorers/index.html` as a footer compass row :: the same `⊙·⟁·◈·⬡·✦·⊕·⟡·◐·⊗·⌘·⊛·◉` hover row that appears in the hub.

**Guidance:** Read the glyph implementation in `portal/index.html` first. Extract only the footer compass HTML + minimal CSS. Do not bring the PING cue or DODECA-FIELD game into the explorer hub :: just the compass as a wayfinding element.

---

#### 2C-2 · `∫f(x)dx` annotation :: no additional propagation needed
The integration formula has been placed in all four meaningful locations. No further propagation is warranted. Resist the pull to add it everywhere.

---

## Technical Guardrails

1. **Read before editing.** Every file has evolved across multiple sessions. Never assume current content matches memory.

2. **innerHTML is blocked.** The security hook at `hooks/security_reminder_hook.py` will reject any `innerHTML` pattern used for dynamic content. All tooltip and dynamic DOM construction uses `createElement`/`textContent`/`appendChild`.

3. **Two de-Jong files exist:**
   - `portal/explorers/de-jong-attractor.html` :: sidebar layout, 6M pts, main explorer link
   - `portal/explorers/dejong-attractor-explorer.html` :: fullscreen immersive, 3M pts, cinematic
   These are architecturally different. Do not conflate.

4. **two face-naming systems are intentional.** Capstones uses civilizational names. twelve-faces.html uses consciousness-mode names. Both are canon. The bridge note in 2A-1 explains the relationship :: it does not collapse one into the other.

5. **Sonic specs are immutable.** `phi-audio-spec.js` is the source of truth: 144Hz base, φ^step progression, 0.04s attack, 2.46s decay, 4000Hz lowpass. Any Tone.js migration preserves these exactly.

6. **Do not add audio where none exists.** Phase 2 migrates existing audio to Tone.js. It does not invent new sonic interactions in files that are currently silent.

---

## File Map (Quick Reference)

```
portal/
├── index.html                          Hub · DODECA-FIELD · PING · Glyphs
├── dodecahedral-capstones.html         12-face cards · hover arch reveals
├── exploratorium-v4.html               Seven Octaves · copy fix needed (2A-2)
├── phase-state-laboratory.html         
├── resonance-library.html              
├── the-crossover.html                  Complete :: do not touch
├── explorers/
│   ├── index.html                      Explorer hub · eyebrows corrected
│   ├── dodecahedron-explorer.html      Session 1 · Euler tooltip · audio migration (2B-2)
│   ├── twelve-faces.html               Session 2 · bridge note needed (2A-1)
│   ├── phi-explorer.html               Tone.js COMPLETE (Phase 1D)
│   ├── de-jong-attractor.html          Session 4 · copy wonder (2A-3)
│   ├── frequency-resonance-mandala.html Session 5 · lock chord (2B-1)
│   ├── conscious-pause-timeline.html   Session 6 · COMPLETE
│   ├── stoneware-builder.html          Session 7 · COMPLETE
│   ├── platonic-solids-lab.html        copy (2A-4) + audio (2B-3)
│   ├── dejong-attractor-explorer.html  Fullscreen de-Jong (different file)
│   ├── laboratory.html                 
│   └── js/
│       ├── continuous-state-engine.js  Phi-curve easing · resonance field
│       └── phi-audio-spec.js           Immutable sonic specs
```

---

## Definition of Done

**Movement 2A complete when:**
- twelve-faces.html has bridge note; both naming systems feel intentional, not broken
- exploratorium-v4.html octave pills all display correctly with space between numeral and label
- de-jong-attractor.html formula section carries awe without losing accuracy
- platonic-solids-lab.html key-hint reads like the rest of the page sounds

**Movement 2B complete when:**
- frequency-resonance-mandala.html plays one Solfeggio chord on lock; chord does not repeat on reinit
- dodecahedron-explorer.html and platonic-solids-lab.html use Tone.js; sonic character identical to before
- No console errors. No audio overlap artifacts. iOS Safari compatible.

**Movement 2C complete when:**
- Glyph footer compass appears on `explorers/index.html` with correct hover behavior
- No other files modified

---

*The symphony is nearly complete. What remains is tuning.*
