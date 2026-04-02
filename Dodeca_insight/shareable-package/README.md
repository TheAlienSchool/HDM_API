# Evolving Squiggles — WebGL Animation System

A self-contained, single-file WebGL generative art system that produces continuously evolving abstract ribbon/squiggle patterns. Designed to be adapted for **realtime typing interaction**.

## Quick Start

Open `index.html` in any modern browser. That's it — no build tools, no dependencies, no server needed.

## How It Works

The system has three core layers:

### 1. Grammar-Based Attractor Generator

Random visual configurations are generated from 8 independent dimensions:

| Dimension | Options | Controls |
|---|---|---|
| `rotation_class` | parallel, fan, radial, hyper-radial | How ribbons rotate relative to each other |
| `wave_register` | subsonic, low, mid, high | Frequency range of wave oscillation |
| `count_class` | minimal (1-2), moderate (3-4), dense (7-9) | Number of ribbons |
| `character` | crystalline, neon_glow, atmospheric | Visual feel (sharp edges vs soft glow) |
| `color_mode` | prismatic, monoR/G/B, dualRG/RB/GB | Color palette |
| `amplitude_class` | subtle, moderate, extreme | How much ribbons wave |
| `edge_character` | solid, hollow, diffuse | Edge rendering style |
| `vignette_class` | tight, normal, wide | Focus/brightness falloff |

Combinations are filtered through **hard constraints** (invalid combos rejected) and **soft constraints** (unlikely combos deprioritized) to ensure visual quality.

A pool of 12 attractors is maintained. The interpolation system occasionally pulls parameters toward these attractors, creating coherent visual "moods" that shift over time.

### 2. Multi-Layer Parameter Interpolation

All 18 animation parameters are grouped into 5 timing layers that evolve independently:

| Layer | Parameters | Cycle Duration | Purpose |
|---|---|---|---|
| **glacial** | count, rotPer | ~60s | Structural changes (rare, dramatic) |
| **slow** | spacing, softInt, edgeDist | ~35s | Character shifts |
| **medium** | waveFreq, waveAmp, softRadius, edgeInt | ~20s | Motion quality changes |
| **fast** | rotSpeed, waveSpeed, chroma, edgeSharp | ~12s | Continuous subtle motion |
| **drift** | tintR/G/B, brightness, vignette | ~45s | Color and mood wandering |

Each layer independently interpolates between current and next parameter states using smoothstep easing. When a layer completes its cycle, it generates a new target (optionally pulled toward an attractor from the pool).

### 3. WebGL Fragment Shader

A single fragment shader renders all ribbons per-pixel:
- Each pixel tests distance to each ribbon's wave function
- Ribbons are composited additively with soft glow + sharp edge components
- Per-channel chromatic aberration creates prismatic color separation
- Tone mapping and gamma correction produce the final output

## Adapting for Typing Response

### Built-in Typing Support

The system already responds to keyboard input out of the box. Press keys while viewing the animation to see the effect. The built-in behavior:

- **Evolution speed boost** — typing accelerates parameter transitions
- **Momentum injection** — each character injects impulses into the fast/drift layers based on its char code
- **Color shifting** — characters shift R/G/B tint based on `charCode % 3`
- **Decay** — effects fade smoothly when typing stops

### JavaScript API

The global `SquiggleAPI` object provides full programmatic control:

```javascript
// Simulate a typing event (call this from your typing system)
SquiggleAPI.onTypingEvent('a');

// Directly set any parameter (overrides the interpolation system)
SquiggleAPI.setParam('waveFreq', 8.0);
SquiggleAPI.setParam('tintR', 1.5);

// Remove an override (returns to autonomous evolution)
SquiggleAPI.clearParam('waveFreq');
SquiggleAPI.clearAllOverrides();

// Get current parameter snapshot
const params = SquiggleAPI.getParams();
console.log(params.count, params.tintR, params.evolutionMultiplier);

// Control evolution speed directly (1.0 = normal)
SquiggleAPI.setEvolutionMultiplier(3.0);

// Trigger a one-shot speed burst (intensity 0–1)
SquiggleAPI.triggerBurst(0.7);

// Inject a custom attractor into the pool
SquiggleAPI.injectAttractor({
  rotation_class: 'hyper-radial',
  wave_register: 'high',
  count_class: 'minimal',
  character: 'neon_glow',
  color_mode: 'monoB',
  amplitude_class: 'moderate',
  edge_character: 'solid',
  vignette_class: 'tight'
});

// Force-refresh the entire attractor pool
SquiggleAPI.refreshPool();

// Get parameter definitions (min/max/layer for each param)
const defs = SquiggleAPI.getParamDefs();

// Get all grammar dimension options
const dims = SquiggleAPI.getGrammarDimensions();
```

### Integration Patterns

**Pattern A: Simple typing speed mapping**
```javascript
// Your typing system calls this on each keystroke
function handleKeystroke(char) {
  SquiggleAPI.onTypingEvent(char);
}
```

**Pattern B: WPM-based evolution speed**
```javascript
let keyTimes = [];
function handleKeystroke(char) {
  const now = Date.now();
  keyTimes.push(now);
  keyTimes = keyTimes.filter(t => now - t < 5000);
  const wpm = (keyTimes.length / 5) * 12; // rough WPM estimate
  SquiggleAPI.setEvolutionMultiplier(1 + wpm / 30);
  SquiggleAPI.onTypingEvent(char);
}
```

**Pattern C: Semantic content mapping**
```javascript
// Map different content types to different visual modes
function onSentenceComplete(sentence) {
  if (sentence.includes('!')) {
    SquiggleAPI.injectAttractor({
      rotation_class: 'hyper-radial', wave_register: 'high',
      count_class: 'moderate', character: 'crystalline',
      color_mode: 'prismatic', amplitude_class: 'extreme',
      edge_character: 'solid', vignette_class: 'tight'
    });
    SquiggleAPI.triggerBurst(0.8);
  }
  if (sentence.includes('?')) {
    SquiggleAPI.setParam('waveFreq', 10);
    SquiggleAPI.setParam('chroma', 0.15);
    setTimeout(() => {
      SquiggleAPI.clearParam('waveFreq');
      SquiggleAPI.clearParam('chroma');
    }, 3000);
  }
}
```

**Pattern D: Direct parameter control from external system**
```javascript
// If your system produces its own parameter values,
// bypass the grammar system entirely
function externalUpdate(data) {
  SquiggleAPI.setParam('waveFreq', data.frequency);
  SquiggleAPI.setParam('waveAmp', data.amplitude);
  SquiggleAPI.setParam('tintR', data.r);
  SquiggleAPI.setParam('tintG', data.g);
  SquiggleAPI.setParam('tintB', data.b);
}
```

## All Parameters

| Parameter | Min | Max | Description |
|---|---|---|---|
| `count` | 1 | 9 | Number of ribbons (integer) |
| `rotPer` | 0 | 1.8 | Rotation increment between ribbons |
| `spacing` | 0.02 | 0.35 | Vertical gap between ribbons |
| `waveFreq` | 0.3 | 12 | Wave oscillation frequency |
| `waveAmp` | 0.03 | 0.6 | Wave amplitude |
| `waveSpeed` | 0.15 | 2.5 | Wave animation speed |
| `rotSpeed` | -0.3 | 0.3 | Rotation animation speed |
| `softRadius` | 0.005 | 0.15 | Glow falloff radius |
| `softInt` | 0 | 0.5 | Glow intensity |
| `edgeDist` | 0 | 0.25 | Edge highlight offset |
| `edgeSharp` | 0.001 | 0.06 | Edge sharpness |
| `edgeInt` | 0.05 | 1.8 | Edge highlight intensity |
| `chroma` | 0 | 0.18 | Chromatic aberration |
| `tintR` | 0 | 1.5 | Red channel multiplier |
| `tintG` | 0 | 1.5 | Green channel multiplier |
| `tintB` | 0 | 1.5 | Blue channel multiplier |
| `brightness` | 0.9 | 2.8 | Overall brightness |
| `vignette` | 0.2 | 3.5 | Vignette radius (smaller = tighter) |

## File Structure

```
shareable-package/
  index.html   — Complete self-contained application (single file, ~400 lines)
  README.md    — This documentation
```

Everything is in one HTML file intentionally — no build step, no dependencies, easy to drop into any project.
