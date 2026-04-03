# INTERACTIVE MATHEMATICS IMPLEMENTATION GUIDE
## Build Playbook for HIA Laboratory

---

## Quick Start

Three working prototypes are now live::

| Explorer | Status | File | Key Features |
|----------|--------|------|--------------|
| **Dodecahedron Explorer** | ✓ Live | `explorers/dodecahedron-explorer.html` | 3D rotation, face hover, visualization modes |
| **Platonic Solids Lab** | ✓ Live | `explorers/platonic-solids-lab.html` | Solid switching, duality info, properties display |
| **Explorer Hub** | ✓ Live | `explorers/index.html` | Navigation to all explorers, coming-soon teasing |

**Access them:**
- Hub: `http://localhost:8080/portal/explorers/`
- Direct: `http://localhost:8080/portal/explorers/dodecahedron-explorer.html`

---

## Architecture Overview

```
portal/
├── index.html                 (main portal hub)
├── explorers/
│   ├── index.html            (explorer navigation hub)
│   ├── dodecahedron-explorer.html
│   ├── platonic-solids-lab.html
│   ├── js/
│   │   ├── three-utils.js    (shared Three.js helpers)
│   │   ├── ui-overlay.js     (tooltip, interactive label system)
│   │   │── state-manager.js  (session persistence)
│   │   └── animation-lib.js  (GSAP animation patterns)
│   └── css/
│       ├── explorer-base.css (shared styles)
│       └── design-tokens.css (HDM color/font system)
```

---

## Technical Stack

### Dependencies (CDN-based, no build step needed)

```html
<!-- 3D Rendering -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

<!-- Animation & Tweening -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

<!-- Audio Synthesis (future explorers) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js"></script>

<!-- 2D Data Visualization (golden ratio, spirals) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"></script>
```

**Why these choices?**
- **Three.js**: Battle-tested, excellent WebGL abstraction, massive community
- **GSAP**: Smoothest animations, handles morphing geometries beautifully
- **Tone.js**: Perfect for sonifying mathematics (frequency mapping)
- **D3.js**: Excellent for spirals, timelines, 2D geometric visualizations
- **No build step**: Pure HTML/JS/CSS—deploy anywhere, version control friendly

---

## Building the Next Explorers

### Phase 1: Getting the Jazz Down (Weeks 2-3)

#### Explorer #3: **Golden Ratio Explorer**
**Purpose:** Reveal φ through interactive form, geometry, nature

**File:** `explorers/golden-ratio-explorer.html`

**Structure:**
```javascript
// 3 Sub-explorers in tabs
1. Pentagon-to-Circle Dance
   - SVG-based (simpler than 3D)
   - Show inscribed pentagon in circle
   - Highlight diagonals that create golden ratio segments
   - Animated measurement overlay

2. Spiral of Growth
   - Fibonacci sequence as clickable squares (1,1,2,3,5,8,13,21...)
   - Each square morphs to next with animation
   - Size calculations: f(n) = f(n-1) + f(n-2)
   - Click square → reveal nature example (pinecone spiral, galaxy, nautilus)

3. Human Body Proportions
   - SVG human silhouette
   - Interactive overlay grid showing golden ratio points
   - Click any point → reveal measurement
   - Visual: face width ÷ height = φ, hand proportions, spine curve
```

**Technical Implementation:**

```html
<!DOCTYPE html>
<html>
<head>
    <!-- Standard HDM styling -->
    <link rel="stylesheet" href="css/explorer-base.css">
</head>
<body>
    <div class="explorer-layout">
        <div class="canvas-area">
            <!-- Tab Navigation -->
            <div class="tab-controls">
                <button class="tab-button active" data-tab="pentagon">Pentagon</button>
                <button class="tab-button" data-tab="spiral">Spiral</button>
                <button class="tab-button" data-tab="body">Body</button>
            </div>

            <!-- SVG Canvas Areas -->
            <svg id="pentagon-view" class="tab-content active"></svg>
            <svg id="spiral-view" class="tab-content"></svg>
            <svg id="body-view" class="tab-content"></svg>
        </div>

        <div class="info-panel">
            <!-- Dynamic content updated by JS -->
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"></script>
    <script>
        // Pentagon Logic
        function renderPentagon() {
            // Calculate pentagon inscribed in circle
            // Highlight golden ratio relationships
            // Show phi = 1.618...
        }

        // Spiral Logic
        function renderSpiral() {
            // Render fibonacci squares
            // Animate spiral curve through squares
            // Make clickable for nature examples
        }

        // Body Logic
        function renderBodyProportions() {
            // SVG human figure
            // Overlay golden ratio grid
            // Interactive measurements
        }
    </script>
</body>
</html>
```

---

#### Explorer #4: **Frequency Resonance Mandala**
**Purpose:** Sound made visible. Vibration as mathematics.

**File:** `explorers/frequency-resonance-mandala.html`

**Key Experience:**
- Central circle with 12 petals (the 12 dodecahedral faces)
- Frequency slider (range: 1Hz to 20Hz)
- User selects → petals pulse at harmonic ratios
- Audio plays tone at selected frequency (using Tone.js)
- Pattern observation → different frequencies = different standing-wave patterns

**Implementation Pattern:**

```javascript
// Frequency Selection
const frequencySlider = document.getElementById('frequency-slider');
const mandala = d3.select('#mandala-svg');

frequencySlider.addEventListener('input', (e) => {
    const freq = parseFloat(e.target.value);
    
    // Visual: Update petal animation
    updateMandalaFrequency(freq);
    
    // Audio: Play tone
    playTone(freq);
    
    // Data: Show harmonic overtones
    displayOvertones(freq);
});

function updateMandalaFrequency(freq) {
    // Each petal pulse duration = 1/freq
    // Petals offset by harmonic ratios (1/2, 2/3, 3/4, etc.)
    // Create interference patterns visually
}

function playTone(freq) {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(freq + 'Hz', '2n');
}
```

---

### Phase 2: Deepening the Lab (Weeks 4-5)

#### Explorer #5: **De Jong Attractor Playground**

**Upgrade existing Resonance Library visualization:**

```javascript
// Real-time parameter control
const sliders = {
    a: document.getElementById('param-a'),
    b: document.getElementById('param-b'),
    c: document.getElementById('param-c'),
    d: document.getElementById('param-d')
};

// De Jong equations
function deJong(x, y, a, b, c, d) {
    const x1 = Math.sin(a * y) - Math.cos(b * x);
    const y1 = Math.sin(c * x) - Math.cos(d * y);
    return [x1, y1];
}

// Render at 60fps
function animateAttractor() {
    const a = parseFloat(sliders.a.value);
    const b = parseFloat(sliders.b.value);
    const c = parseFloat(sliders.c.value);
    const d = parseFloat(sliders.d.value);
    
    // Iterate 1000 points
    // Map to canvas
    // Sonify the parameters (if frequency changes, pitch changes)
    
    requestAnimationFrame(animateAttractor);
}
```

---

#### Explorer #6: **Conscious Pause Timeline**

**Visualize the 7 steeps as an interactive spiral:**

```javascript
// Seven Steeps as spiral coordinates
const steeps = [
    { name: 'First Steep: Observation', angle: 0, description: '...' },
    { name: 'Second Steep: Manipulation', angle: Math.PI * 0.33, description: '...' },
    // ... etc
];

// SVG spiral path
const spiralPath = d3.radialLine()
    .angle(d => d.angle)
    .radius((d, i) => 50 + i * 40);

// Draw spiral with clickable steeps
// On click → zoom to that steep
// Show historical moment, mathematical principle, nature examples
```

---

#### Explorer #7: **Stoneware Builder**

**Drag-and-drop assembly of dodecahedron:**

```javascript
// 12 pentagonal tiles (SVG or Canvas)
// Physics: snap-to-grid when close enough
// Constraint: tiles connect only to correct faces
// Completion: animation + celebration sound

// Using Cannon.js for lightweight physics
import CANNON from 'https://cdn.jsdelivr.net/npm/cannon-es@0.19.0/dist/cannon-es.js';

// Each tile is a rigid body
// When placed correctly, it locks (immovable)
// Visual feedback: tiles highlight when hoverable
// Completion: all 12 tiles connected = celebration
```

---

## Code Patterns & Reusables

### Pattern 1: Scene Initialization (Three.js)

```javascript
function initializeScene(canvasId) {
    const container = document.getElementById(canvasId).parentElement;
    const { width, height } = container.getBoundingClientRect();
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        canvas: document.getElementById(canvasId),
        antialias: true,
        alpha: true
    });
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x0D0907);
    
    // Lighting
    const lights = {
        ambient: new THREE.AmbientLight(0xffffff, 0.5),
        directional: new THREE.DirectionalLight(0xffffff, 0.8),
        point: new THREE.PointLight(0xC4622D, 0.4)
    };
    
    Object.values(lights).forEach(light => scene.add(light));
    
    return { scene, camera, renderer };
}
```

### Pattern 2: Interactive Controls (Mouse + Keyboard)

```javascript
class InteractiveControls {
    constructor(canvas, mesh) {
        this.canvas = canvas;
        this.mesh = mesh;
        this.isDragging = false;
        this.previousMouse = { x: 0, y: 0 };
        
        this.setupListeners();
    }
    
    setupListeners() {
        this.canvas.addEventListener('mousedown', e => this.onDown(e));
        this.canvas.addEventListener('mousemove', e => this.onMove(e));
        this.canvas.addEventListener('mouseup', e => this.onUp(e));
        this.canvas.addEventListener('wheel', e => this.onWheel(e), { passive: false });
        
        document.addEventListener('keydown', e => this.onKey(e));
    }
    
    onDown(e) {
        this.isDragging = true;
        this.previousMouse = { x: e.clientX, y: e.clientY };
    }
    
    onMove(e) {
        if (this.isDragging) {
            const deltaX = e.clientX - this.previousMouse.x;
            const deltaY = e.clientY - this.previousMouse.y;
            
            this.mesh.rotation.y += deltaX * 0.01;
            this.mesh.rotation.x += deltaY * 0.01;
            
            this.previousMouse = { x: e.clientX, y: e.clientY };
        }
    }
    
    onUp() {
        this.isDragging = false;
    }
    
    onWheel(e) {
        e.preventDefault();
        // Handle zoom
    }
    
    onKey(e) {
        // Handle keyboard shortcuts
    }
}
```

### Pattern 3: Information Panel Updates

```javascript
class InfoPanel {
    constructor(panelId, faceDataSelector) {
        this.panel = document.getElementById(panelId);
        this.faceDataStore = document.getElementById(faceDataSelector);
    }
    
    updateFace(faceNumber) {
        const data = this.faceDataStore.querySelector(`[data-face="${faceNumber}"]`);
        if (!data) return;
        
        this.panel.innerHTML = `
            <div class="face-number">${faceNumber}</div>
            <div class="face-name">${data.querySelector('strong').textContent}</div>
            <div class="face-description">${data.querySelector('p').textContent}</div>
        `;
        
        // Animate in
        this.panel.classList.remove('hidden');
        this.panel.style.animation = 'fade-in 0.4s ease-out';
    }
}
```

### Pattern 4: Visualization Mode Switching

```javascript
class VisualizationModes {
    constructor(mesh) {
        this.mesh = mesh;
        this.modes = {
            solid: { wireframe: false, transparent: false },
            wireframe: { wireframe: true, transparent: false },
            transparent: { wireframe: false, transparent: true, opacity: 0.3 },
            edges: { wireframe: true, transparent: true, opacity: 0.8 }
        };
    }
    
    apply(modeName) {
        const mode = this.modes[modeName];
        const material = this.mesh.material;
        
        material.wireframe = mode.wireframe;
        material.transparent = mode.transparent;
        if (mode.opacity) material.opacity = mode.opacity;
    }
}
```

---

## Integration with Existing Portal

### Update Main `index.html`

Add navigation link to explorers hub::

```html
<!-- In portal/index.html navigation -->
<a href="/explorers/">
    Interactive Mathematics · The Laboratory
</a>
```

### Update Design Tokens

Create shared `css/design-tokens.css`:

```css
:root {
    /* Colors */
    --void:         #0D0907;
    --charcoal:     #1E1610;
    --sand:         #F0E6D2;
    --terra:        #C4622D;
    --gold:         #C48C50;
    --ink-light:    #B8A890;
    
    /* Typography */
    --font-display: 'Playfair Display', Georgia, serif;
    --font-fell:    'IM Fell English', Georgia, serif;
    --font-body:    'Inter', sans-serif;
    
    /* Animation */
    --ease-out:     cubic-bezier(0.16, 1, 0.3, 1);
    --ease-in-out:  cubic-bezier(0.76, 0, 0.24, 1);
}
```

Import into all explorers::

```html
<link rel="stylesheet" href="css/design-tokens.css">
<link rel="stylesheet" href="css/explorer-base.css">
```

---

## Testing & Quality Assurance

### Before Launch Checklist

- [ ] **Interaction Responsiveness**
  - Drag performs smoothly (60fps)
  - Keyboard shortcuts work
  - Touch works on mobile

- [ ] **Accessibility**
  - Screen reader compatible (ARIA labels)
  - Keyboard-navigable
  - Color-blind safe (use patterns + text)

- [ ] **Performance**
  - Initial load < 2s
  - Canvas rendering at 60fps
  - No memory leaks (test with DevTools)

- [ ] **Visual Consistency**
  - Colors match design tokens
  - Typography hierarchy correct
  - Animations use specified easing

- [ ] **Content Accuracy**
  - Mathematical properties correct
  - HDM face meanings accurate
  - Historical moments verified

### Browser Testing

```
✓ Chrome/Edge (latest)
✓ Firefox (latest)
✓ Safari (iOS 15+)
✓ Mobile Chrome
```

---

## Performance Optimization

### Canvas Optimization

```javascript
// Use lower polygon count for mobile
const quality = isMobile ? 0 : 0; // geometry subdivision parameter

// Disable shadows on low-end devices
if (performance.memory?.jsHeapSizeLimit < 100000000) {
    renderer.shadowMap.enabled = false;
}

// Use pixel ratio of 1 on mobile
renderer.setPixelRatio(isMobile ? 1 : window.devicePixelRatio);
```

### Animation Optimization

```javascript
// Use requestAnimationFrame for smooth 60fps
let lastFrameTime = 0;

function animate(currentTime) {
    const deltaTime = currentTime - lastFrameTime;
    
    // Only update if enough time has passed (cap at 60fps)
    if (deltaTime >= 16.67) {
        updateScene();
        lastFrameTime = currentTime;
    }
    
    requestAnimationFrame(animate);
}
```

---

## Deployment Checklist

1. **Files in place:**
   - [ ] All `.html` files in `portal/explorers/`
   - [ ] All `.js` shared utilities in `portal/explorers/js/`
   - [ ] All `.css` in `portal/explorers/css/`

2. **Verify links:**
   - [ ] Explorer hub links correctly to individual explorers
   - [ ] All explorers link back to hub
   - [ ] Main portal links to explorer hub

3. **Test live:**
   - [ ] Load via localhost:8080
   - [ ] Test drag/rotate/zoom
   - [ ] Test mobile responsiveness
   - [ ] Test keyboard navigation

4. **Documentation:**
   - [ ] README with quick start
   - [ ] Inline code comments explaining logic
   - [ ] Update INTERACTIVE_MATHEMATICS_STRATEGY.md with completed items

---

## Next Steps in Order

1. **Week 1:** Polish current prototypes (Dodecahedron + Platonic)
   - Refine touch controls
   - Add face hovering detail panel
   - Test on mobile

2. **Week 2:** Golden Ratio Explorer
   - SVG pentagon visualization
   - Fibonacci spiral sequence
   - Human proportions overlay

3. **Week 3:** Frequency Resonance Mandala
   - D3 spiral petals
   - Tone.js audio synthesis
   - Harmonic overtone display

4. **Week 4:** De Jong Attractor Playground
   - Real-time parameter sliders
   - Sonified parameter changes
   - Symmetry detection

5. **Week 5:** Conscious Pause Timeline + Stoneware Builder
   - Interactive spiral timeline
   - Drag-drop assembly game
   - Celebration animation

---

## FAQ & Troubleshooting

**Q: Why Three.js instead of Babylon.js?**
A: Three.js documentation is more comprehensive, examples are more abundant, and file size is smaller. Both would work equally well.

**Q: Can I use a build tool (Webpack, Vite)?**
A: You can, but it's not necessary. CDN-based imports keep deployment simple and version-controllable.

**Q: How do I add sound?**
A: Use Tone.js. It handles Web Audio API complexity. See Frequency Mandala pattern above.

**Q: Performance is sluggish. What do I check?**
A: 1) Reduce geometry polygon count. 2) Disable shadows. 3) Lower pixel ratio on mobile. 4) Profile in DevTools.

---

## Closing

The architecture is solid. The pedagogy is clear. The code patterns are tested.

What remains is *motion*. Watch these shapes move. Listen to frequency. Build the dodecahedron with your hands. Return to it. Discover something about yourself you didn't know.

The math is mathing. The resonance is beginning.

→ Ship with confidence.

---

*Implementation Guide*  
*HIA Laboratory · Interactive Mathematics*  
*March 30, 2026*
