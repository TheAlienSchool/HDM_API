# Phase Field — Integration Guide for AI Collaborators

## What This Is

A self-contained generative art visualization: 19 flowers arranged on a sphere, each evolving independently through a layered parameter system, with periodic synchronization phases. The entire app lives in a single HTML file (`flower.html`) with one external dependency (Three.js via CDN). Just open it in a browser.

## Quick Start

```bash
# No build step needed. Just open the file:
open flower.html
# Or serve it:
python3 -m http.server 8000
# Then visit http://localhost:8000/flower.html
```

## Architecture at a Glance

```
flower.html (single file, ~2000 lines)
├── CSS — dark-themed control panel, fullscreen canvas
├── HTML — canvas + collapsible control panel with sliders
└── JavaScript
    ├── Three.js scene (sphere of 19 flowers)
    ├── Layered evolution system (glacial → deep → medium → surface)
    ├── Per-flower independent parameter evolution
    ├── Phase system (unique ↔ shared attractor sync)
    ├── Auto-blend momentum engine
    ├── Touch/mouse interaction (hold-boost + drag offsets)
    └── Animation loop
```

## Key Concepts for Integration

### 1. The Parameter System

Every flower is controlled by a set of numeric parameters. These are the levers you can pull:

| Parameter | Range | What It Does |
|-----------|-------|-------------|
| `numPetals` | 3–12 | Number of petals per flower |
| `petalLength` | 0.5–4.0 | How far petals extend |
| `petalWidth` | 0.1–1.5 | Width of each petal |
| `petalCurl` | -2.0–2.0 | Curl/twist of petals |
| `waveStrength` | 0.0–28.0 | Amplitude of wave distortion |
| `waveSpeed` | 0.01–1.0 | Speed of wave animation |
| `layerSeparation` | 0.0–0.3 | Distance between petal layers |
| `rotationSpeed` | 0.02–0.5 | How fast each flower spins |
| `centerR/G/B` | 0–1 | Center color (RGB) |
| `innerR/G/B` | 0–1 | Inner petal color |
| `outerR/G/B` | 0–1 | Outer petal color |

These are defined in the `paramDefs` object (~line 885) and `PARAM_RANGES` (~line 670).

### 2. How to Drive Parameters Externally (e.g., from Typing)

The simplest integration point: **override the `manualOverrides` object**. When a parameter key exists in `manualOverrides`, the evolution system uses that value instead of its own. Lock the parameter to prevent evolution from overwriting it.

**Example — inject parameter values from an external source:**

```javascript
// Find these existing objects in the code:
// manualOverrides — object of param overrides
// lockedParams — Set of locked parameter names

// To set a parameter externally:
function setParam(name, value) {
  manualOverrides[name] = value;
  lockedParams.add(name);
}

// To release back to autonomous evolution:
function releaseParam(name) {
  delete manualOverrides[name];
  lockedParams.delete(name);
}

// Example: map typing speed to wave intensity
setParam('waveStrength', typingSpeed * 5.0);
setParam('waveSpeed', Math.min(typingSpeed * 0.3, 1.0));
```

### 3. Global Controls (Non-Parameter)

These global variables affect the entire visualization and are great integration points:

```javascript
// Evolution speed multiplier (default 1.0, hold-boosted up to 8.0)
evolutionMultiplier = 2.0;

// Wave speed multiplier (applied on top of waveSpeed param, default 1.0, max 4.0)
waveSpeedMultiplier = 1.5;

// Camera orbit offset (radians, drag-accumulated)
cameraOrbitOffset = Math.PI / 4;

// Global flower rotation offset (radians, drag-accumulated)
flowerRotationOffset = 0.5;

// Shared blend value (0 = all unique, 1 = all synchronized)
sharedBlendValue = 0.7;

// Phase system ('unique' or 'shared')
currentPhase = 'shared';

// Blend momentum velocity
blendVelocity = 0.005;

// Blend lock (true = auto-blend disabled, manual control only)
blendLocked = true;
```

### 4. The Evolution Layer System

Parameters evolve through 4 speed layers, each operating on different timescales:

| Layer | Speed | Parameters | Purpose |
|-------|-------|-----------|---------|
| **Glacial** | Very slow (5–20s holds) | `waveStrength`, `waveSpeed` | Deep mood shifts |
| **Deep** | Slow (3–8s transitions) | `petalLength`, `petalWidth`, `layerSeparation` | Structural changes |
| **Medium** | Moderate (1–4s) | `rotationSpeed`, `petalCurl`, colors | Character changes |
| **Surface** | Fast (0.3–1.5s) | Quick micro-variations | Texture/shimmer |

Each layer runs independently per flower. The `updateLayers()` function (~line 1100) drives all evolution.

### 5. The Phase System (Unique ↔ Shared)

Every `phaseCycleDuration` (default: 20) glacial cycles, flowers alternate between:
- **Unique phase**: Each flower evolves toward its own random attractors
- **Shared phase**: All flowers evolve toward the same shared attractor target

The `sharedBlendValue` (0–1) smoothly transitions between these using momentum-based physics. This creates breathing patterns of chaos → unity → chaos.

**Integration idea**: Force shared phase when the user is typing (unity) and unique phase when idle (exploration).

### 6. The Attractor System

Attractors are target parameter sets that pull flower evolution in specific directions. Key functions:

```javascript
// Generate a random attractor
generateAttractor()  // Returns object with target values for all params

// The attractor pool (array of target param objects)
attractorPool  // Rebuilt periodically, weighted toward dramatic presets

// Two special attractors always in the pool:
screenshotAttractor  // Trilateral spinning temporal with high ring rotation
slowWaveAttractor    // Dramatic waves with slow speed (3x weight)
```

**Integration idea**: Create custom attractors based on what the user is typing:
```javascript
const typingAttractor = {
  numPetals: wordLength,
  petalLength: Math.min(sentenceLength * 0.1, 4.0),
  waveStrength: capsLockRatio * 20,
  waveSpeed: wordsPerMinute * 0.01,
  // ... etc
};
attractorPool.push(typingAttractor);
```

### 7. Interaction System

Current interaction model (hold + drag):
- **Tap-hold**: Accelerates evolution speed + wave speed + blend momentum
- **Drag X**: Offsets camera orbit angle
- **Drag Y**: Offsets global flower rotation
- **Release**: Offsets persist, acceleration normalizes

Key variables for interaction state:
```javascript
isInteracting        // Boolean: is user currently holding
dragDeltaX, dragDeltaY  // Current drag delta (normalized 0–1)
cameraOrbitOffset    // Accumulated X orbit offset
flowerRotationOffset // Accumulated Y rotation offset
```

### 8. Flower Geometry

19 flowers arranged on a sphere in rings:
- Ring 0: 1 flower (top)
- Ring 1: 6 flowers
- Ring 2: 12 flowers

Each flower has 3 petal layers at different depths. Geometry is rebuilt when `numPetals` changes via `rebuildFlowers()`.

## Recommended Integration Patterns

### Pattern A: External Event → Parameter Override
Best for: typing speed, mouse movement, audio levels

```javascript
// Add a global function the external system can call:
window.phaseFieldAPI = {
  setParam: (name, value) => {
    manualOverrides[name] = value;
    lockedParams.add(name);
  },
  releaseParam: (name) => {
    delete manualOverrides[name];
    lockedParams.delete(name);
  },
  setBlend: (value) => { sharedBlendValue = value; blendLocked = true; },
  setEvolutionSpeed: (mult) => { evolutionMultiplier = mult; },
  setCameraOffset: (radians) => { cameraOrbitOffset = radians; },
  setRotationOffset: (radians) => { flowerRotationOffset = radians; },
  getState: () => ({
    phase: currentPhase,
    blend: sharedBlendValue,
    evolutionSpeed: evolutionMultiplier,
    cameraOrbit: cameraOrbitOffset
  })
};
```

### Pattern B: Embed in iframe + postMessage
Best for: two separate apps communicating

```javascript
// In flower.html, add a message listener:
window.addEventListener('message', (event) => {
  const { type, param, value } = event.data;
  if (type === 'setParam') {
    manualOverrides[param] = value;
    lockedParams.add(param);
  } else if (type === 'setBlend') {
    sharedBlendValue = value;
    blendLocked = true;
  }
});

// From parent page:
iframe.contentWindow.postMessage({
  type: 'setParam',
  param: 'waveStrength',
  value: 8.0
}, '*');
```

### Pattern C: WebSocket Bridge
Best for: two machines running different apps

```javascript
const ws = new WebSocket('ws://localhost:8080');
ws.onmessage = (event) => {
  const commands = JSON.parse(event.data);
  commands.forEach(({ param, value }) => {
    manualOverrides[param] = value;
    lockedParams.add(param);
  });
};
```

## File Map (Where Things Live)

| Line Range | Section |
|-----------|---------|
| 1–350 | CSS + HTML (control panel, canvas) |
| 355–360 | Three.js import |
| 360–660 | Core functions (lerp, pick, flower geometry builder) |
| 660–700 | `PARAM_RANGES` — random ranges per parameter class |
| 700–870 | Attractor system + special attractors |
| 870–900 | `paramDefs` — parameter definitions with min/max/layer |
| 900–1100 | Layer system (glacial/deep/medium/surface) |
| 1100–1280 | Per-flower evolution + `createFlowerLayerSystem()` |
| 1280–1400 | Phase switching + auto-blend momentum |
| 1400–1680 | Control panel logic, UI wiring, Three.js scene setup |
| 1680–1850 | Flower mesh creation + `rebuildFlowers()` |
| 1850–1900 | Touch/mouse interaction handlers |
| 1900–2014 | Animation loop (the main `animate()` function) |

## Things to Know

- **No build step**. Pure HTML/JS/CSS. Only dependency is Three.js r128 from CDN.
- **Color parameters** (`centerR/G/B`, `innerR/G/B`, `outerR/G/B`) are deliberately excluded from shared attractor phase influence so flowers keep color diversity during sync.
- **`numPetals` changes trigger geometry rebuild** — this is expensive. Avoid setting it every frame. The existing system rate-limits petal changes to every 3 evolution cycles.
- **Wave speed is auto-dampened** when `waveStrength` is high (above 2.0) to prevent visual chaos.
- **Blend momentum zeroes at boundaries** (0 or 1) and resumes on phase change. This is intentional — it creates natural rest points.
- **The control panel** is toggleable with the gear icon. All slider changes auto-lock the parameter.
