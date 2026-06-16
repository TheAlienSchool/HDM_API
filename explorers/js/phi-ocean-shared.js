// ── GLOBAL TONE.JS PRE-AMP INTERCEPTOR (40% Restorative/100% Boost) ──
(function() {
    let currentTone = window.Tone;
    
    function applyPreamp(toneInstance) {
        if (!toneInstance || !toneInstance.Destination) return;
        
        // Boost volume to +4.5dB
        toneInstance.Destination.volume.value = 4.5;
        
        // Hook setContext
        if (!toneInstance._preampHooked) {
            toneInstance._preampHooked = true;
            
            const originalSetContext = toneInstance.setContext;
            toneInstance.setContext = function(ctx) {
                originalSetContext.call(toneInstance, ctx);
                toneInstance.Destination.volume.value = 4.5;
            };
            
            if (toneInstance.start) {
                const originalStart = toneInstance.start;
                toneInstance.start = async function() {
                    const res = await originalStart.call(toneInstance);
                    toneInstance.Destination.volume.value = 4.5;
                    return res;
                };
            }
        }
    }

    try {
        Object.defineProperty(window, 'Tone', {
            get() {
                return currentTone;
            },
            set(newTone) {
                currentTone = newTone;
                applyPreamp(newTone);
            },
            configurable: true,
            enumerable: true
        });
    } catch (e) {
        console.warn("Failed to define Tone proxy on window:", e);
    }
    
    if (currentTone) {
        applyPreamp(currentTone);
    }
})();

/**
 * THE φ OCEAN :: SHARED UTILITIES & PERSISTENT SCHOLAR STATE
 * 
 * Part of the tÅs consciousness technology ecosystem.
 * Governed by the VesselVerse Editorial Protocol 3.1.
 * One-Line Law: Name the mechanism. Keep the magic.
 */

// Initialize global namespace
window.PHI_OCEAN = window.PHI_OCEAN || {};

// Inject global responsive styles to prevent top nav jumbling on mobile viewports
(() => {
  const style = document.createElement('style');
  style.id = 'phi-ocean-global-responsive-style';
  style.textContent = `
    @media (max-width: 768px) {
      .top-nav {
        padding: 8px 12px !important;
        gap: 4px !important;
        justify-content: space-between !important;
      }
      .top-nav div {
        flex-shrink: 1 !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        white-space: nowrap !important;
      }
      /* Hide all links inside the nav breadcrumbs container except the first one */
      .top-nav div a:not(:first-child) {
        display: none !important;
      }
      /* Hide all separators except the first one */
      .top-nav div .top-nav-sep:not(:first-of-type) {
        display: none !important;
      }
      /* Hide specific non-breadcrumb links like Deep Research */
      .top-nav a[href*="ARCHITECTURE"],
      .top-nav a[href*="research"] {
        display: none !important;
      }
      /* Ensure buttons don't shrink too much */
      .top-nav button {
        flex-shrink: 0 !important;
        padding: 4px 8px !important;
        font-size: 10px !important;
        min-height: 24px !important;
      }
    }
  `;
  document.head.appendChild(style);
})();

// Expose global getActiveMagnet to resolve reference errors in chambers missing local declarations
window.getActiveMagnet = window.getActiveMagnet || function() {
  try { return localStorage.getItem('active_magnet') || 'default'; }
  catch(e) { return 'default'; }
};

//Centralized copy constants centralizing Somatic (1), Observational (2), and Invitational (3) registers
window.PRELUDE_COPY = {
  paceInvitation: "Comprehension is not timed. It is simply available.",
  touchPrompt:    "When ready, touch to continue.",
  
  // Chamber-specific overrides (keyed by chamber number)
  '01': {
    onboarding: "You have been doing this mathematics your whole life. The chamber offers you language for what you already know."
  },
  '07': {
    touchPrompt: "Bring your still point into this chamber.",
    safetyLine:  "If the breathing ever feels like effort, simply watch the circle without following it. Observation is also coherence.",
    audioAdvice: "For the deepest coherence experience, headphones are the instrument. The breathing circle holds its value with or without them."
  }
};

window.PACE_SPACE_MS = 1200;

// Persistent Scholar state machine
window.SCHOLAR = (() => {
  const KEY = 'phi_scholar_v1';

  const defaults = () => ({
    visitedChambers: [],     // array preserves visit ORDER (braid)
    residue: {},             // { '01': { language, timestamp, visitCount } }
    stillPointMet: false,
    firstVisit: Date.now()
  });

  const load = () => {
    try {
      const data = localStorage.getItem(KEY);
      return data ? JSON.parse(data) : defaults();
    } catch (e) { 
      return defaults(); 
    }
  };

  const save = (state) => {
    try { 
      localStorage.setItem(KEY, JSON.stringify(state)); 
    } catch (e) {
      /* storage full or blocked :: degrade silently */
    }
  };

  return {
    // Record completion of a chamber with the scholar's own language.
    record(chamberN, residueText) {
      const s = load();
      if (!s.visitedChambers.includes(chamberN)) {
        s.visitedChambers.push(chamberN);
      }
      const prev = s.residue[chamberN] || {};
      s.residue[chamberN] = {
        language:   residueText || "",
        timestamp:  Date.now(),
        visitCount: (prev.visitCount || 0) + 1
      };
      save(s);
    },

    // Returns prior language if scholar has completed this chamber before.
    priorLanguage(chamberN) {
      const r = load().residue[chamberN];
      return (r && r.visitCount > 0) ? r : null;
    },

    // PING detection: autonomous pattern recognition after 3+ chambers.
    detectResonance() {
      return load().visitedChambers.length >= 3;
    },

    // Braided history :: the sequence, not just the set.
    visitSequence() { 
      return load().visitedChambers; 
    },

    clear() { 
      localStorage.removeItem(KEY); 
    }
  };
})();

/**
 * φ-timed character reveal for formula display.
 * Each character's delay = previous delay × φ, ceiling at MAX_MS.
 */
window.PHI_OCEAN.revealFormula = function(element, formulaText, baseMs = 80) {
  const PHI = 1.6180339887;
  const MAX_MS = 420;

  if (!element) return;

  // Clear existing content safely
  element.textContent = '';

  // Respect reduced-motion preference
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) { 
    element.textContent = formulaText; 
    return; 
  }

  let cumulativeMs = 0;
  let interval = baseMs;

  [...formulaText].forEach((char) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.cssText = `opacity:0; transition:opacity 0.38s ease ${cumulativeMs}ms; display:inline-block; white-space:pre;`;
    element.appendChild(span);
    
    requestAnimationFrame(() => { 
      span.style.opacity = '1'; 
    });

    cumulativeMs += Math.min(Math.round(interval), MAX_MS);
    interval *= PHI;
    if (interval > MAX_MS) interval = baseMs; // reset at ceiling
  });
};

/**
 * iOS Safari AudioContext unlock helper
 */
window.PHI_OCEAN.audioReady = false;
window.PHI_OCEAN.ctx = null;

window.PHI_OCEAN.initAudio = async function() {
  // Synchronously start/resume Tone context before any async boundaries to preserve user gesture!
  if (typeof Tone !== 'undefined') {
    try {
      Tone.start();
      Tone.Destination.volume.value = 4.5;
    } catch (err) {
      console.warn('Tone.start synchronous unlock error:', err);
    }
  }
  if (this.audioReady) return true;
  try {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    // Align Tone.js with the shared native AudioContext
    if (typeof Tone !== 'undefined' && Tone.context && Tone.context.rawContext !== this.ctx) {
      try {
        Tone.setContext(this.ctx);
        Tone.Destination.volume.value = 4.5;
      } catch (err) {
        console.warn('Tone.setContext error:', err);
      }
    }
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
    this.audioReady = (this.ctx.state === 'running');
    return this.audioReady;
  } catch(e) {
    console.warn('AudioContext unavailable:', e);
    return false;
  }
};

window.PHI_OCEAN.showAudioStatus = function(indicatorId) {
  const el = document.getElementById(indicatorId);
  if (el) {
    if (!this.audioReady) {
      el.textContent = 'Touch anywhere to awaken sound';
      el.style.opacity = '1';
    } else {
      el.textContent = 'Sound Attuned';
      el.style.opacity = '0.6';
    }
  }
};

// ── SOMATIC TOOLTIPS & DIAGNOSTICS MANUAL INTEGRATION ──

(function() {
  // 1. Inject Stylesheets dynamically
  const style = document.createElement('style');
  style.innerHTML = `
    /* Somatic Terms & Tooltips */
    .somatic-term {
      color: var(--gold-pale, #d4af37) !important;
      border-bottom: 1px dotted var(--gold-pale, #d4af37);
      cursor: help;
      transition: color 0.2s ease, border-color 0.2s ease, text-shadow 0.2s ease;
      font-weight: 500;
      display: inline-block;
    }
    .somatic-term:hover {
      color: var(--gold-bright, #ffd700) !important;
      border-bottom: 1px dashed var(--gold-bright, #ffd700);
      text-shadow: 0 0 8px rgba(255, 215, 0, 0.4);
    }

    /* Universal Accessibility Overrides for citation cards and experiential registers */
    .citation-card {
      border: 1px solid rgba(212, 175, 55, 0.25) !important;
      background: rgba(22, 18, 14, 0.5) !important;
      box-shadow: 0 6px 24px rgba(0, 0, 0, 0.45) !important;
    }
    .citation-text {
      font-family: var(--font-body, 'Outfit', 'Inter', sans-serif) !important;
      font-style: normal !important;
      color: var(--sand, #f4ecd8) !important;
      font-size: 14.5px !important;
      line-height: 1.75 !important;
      letter-spacing: 0.02em !important;
    }
    .experiential-block {
      font-family: var(--font-body, 'Outfit', 'Inter', sans-serif) !important;
      font-style: normal !important;
      color: var(--sand, #f4ecd8) !important;
      font-size: clamp(15px, 1.6vw, 18px) !important;
      line-height: 1.8 !important;
      letter-spacing: 0.02em !important;
      background: rgba(196, 140, 80, 0.05) !important;
      border: 1px solid rgba(212, 175, 55, 0.15) !important;
      border-left: 3px solid var(--gold-pale, #d4af37) !important;
      border-radius: 0 4px 4px 0 !important;
      padding: 24px !important;
    }

    /* Attunement Manual Modal Styles */
    #guide-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(8, 6, 4, 0.88);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99999;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      font-family: 'Outfit', 'Inter', system-ui, -apple-system, sans-serif;
    }
    #guide-modal.active {
      opacity: 1;
      pointer-events: auto;
    }
    .guide-content {
      background: rgba(18, 14, 10, 0.97);
      border: 1px solid var(--gold-pale, #d4af37);
      box-shadow: 0 15px 50px rgba(0, 0, 0, 0.9), 0 0 30px rgba(212, 175, 55, 0.15);
      border-radius: 12px;
      width: 90%;
      max-width: 520px;
      padding: 32px;
      color: var(--sand, #f4ecd8);
      position: relative;
      max-height: 85vh;
      overflow-y: auto;
      transform: scale(0.95);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    #guide-modal.active .guide-content {
      transform: scale(1);
    }
    .guide-close {
      position: absolute;
      top: 18px;
      right: 20px;
      background: none;
      border: none;
      color: var(--gold-pale, #d4af37);
      font-size: 24px;
      cursor: pointer;
      line-height: 1;
      transition: color 0.2s ease, transform 0.2s ease;
    }
    .guide-close:hover {
      color: var(--gold-bright, #ffd700);
      transform: scale(1.1);
    }
    .guide-title {
      font-size: 22px;
      margin: 0 0 6px 0;
      color: var(--gold-bright, #ffd700);
      text-transform: uppercase;
      letter-spacing: 2px;
      font-weight: 600;
      border-bottom: 1px solid rgba(212, 175, 55, 0.25);
      padding-bottom: 10px;
    }
    .guide-subtitle {
      font-size: 10px;
      color: var(--gold-pale, #d4af37);
      text-transform: uppercase;
      letter-spacing: 3px;
      margin: 8px 0 24px 0;
      opacity: 0.85;
    }
    .diagnostics-panel {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(212, 175, 55, 0.15);
      border-radius: 8px;
      padding: 18px;
      margin-bottom: 24px;
    }
    .diagnostic-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      font-size: 13px;
    }
    .diagnostic-item:last-child {
      margin-bottom: 0;
    }
    .diagnostic-label {
      opacity: 0.75;
    }
    .diagnostic-val {
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
      letter-spacing: 0.5px;
    }
    .diagnostic-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;
      box-shadow: 0 0 8px currentColor;
    }
    .checklist-section {
      margin-bottom: 24px;
    }
    .checklist-title {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: var(--gold-pale, #d4af37);
      margin-bottom: 14px;
      border-bottom: 1px solid rgba(212, 175, 55, 0.15);
      padding-bottom: 6px;
      font-weight: 600;
    }
    .checklist-item {
      display: flex;
      gap: 12px;
      align-items: flex-start;
      margin-bottom: 12px;
      font-size: 13px;
      line-height: 1.5;
      cursor: pointer;
      user-select: none;
    }
    .checklist-item:hover .checklist-checkbox {
      border-color: var(--gold-bright, #ffd700);
      background: rgba(212, 175, 55, 0.15);
    }
    .checklist-checkbox {
      width: 18px;
      height: 18px;
      border: 1px solid var(--gold-pale, #d4af37);
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 1px;
      background: rgba(212, 175, 55, 0.05);
      transition: all 0.2s ease;
      color: #120e0a;
      font-weight: bold;
      font-size: 11px;
    }
    .checklist-checkbox.checked {
      background: var(--gold-pale, #d4af37);
      border-color: var(--gold-pale, #d4af37);
      color: #120e0a;
    }
    .checklist-checkbox.checked::after {
      content: "✓";
    }
    .checklist-text {
      opacity: 0.85;
      transition: opacity 0.2s ease;
    }
    .checklist-item:hover .checklist-text {
      opacity: 1;
    }
    .lore-section {
      font-size: 11.5px;
      line-height: 1.6;
      border-top: 1px solid rgba(212, 175, 55, 0.15);
      padding-top: 20px;
      opacity: 0.9;
    }
    .lore-title {
      font-weight: 600;
      color: var(--gold-pale, #d4af37);
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 11px;
    }
  `;
  document.head.appendChild(style);

  // 2. Metaphorical Tooltip Dictionary
  const somaticDictionary = {
    "semiconductor gate": "A regulated flow boundary :: like your focus, deciding when to let the world in or keep you self-contained.",
    "electrons": "Tiny carriers of charge and energy :: like individual thoughts or feelings seeking connection.",
    "valence band": "A locked, comfortable orbit of particles :: like familiar habits or default modes of thinking where we stay isolated but secure.",
    "band gap": "The energy barrier between isolation and flow :: the cognitive effort required to break out of comfort zones and connect.",
    "conduction band": "A state of free-flowing energy and communication :: where individual nodes form a shared, flowing stream of consciousness.",
    "threshold voltage": "The precise tipping point where pressure collapses barriers :: like the exact moment of courage or insight where resistance turns into alignment.",
    "excitation voltage": "The degree of attention and energy you feed into a system :: your conscious activation energy.",
    "awareness excitation voltage": "The degree of attention and energy you feed into a system :: your conscious activation energy.",
    "gate voltage": "The pressure applied to open a channel :: like the intention or focus you direct toward starting a new endeavor.",
    "Integrated Information Theory": "A model of consciousness as unified connection :: the measure of how much a system is a single, indivisible whole rather than a pile of parts.",
    "anyon": "A quasiparticle of collective movement :: like waves of shared emotion in a crowd that exist only through group coordination.",
    "anyons": "Quasiparticles of collective movement :: like waves of shared emotion in a crowd that exist only through group coordination.",
    "topological fusion": "A way elements combine based on relationships rather than size :: like merging two ideas to create a new category of thought.",
    "quantum dimensions": "The degree of information-carrying capacity a particle holds :: like the depth of meaning within a conversation.",
    "vacuum": "A state of pure potential and stillness :: like a silent pause between notes where all possibilities rest.",
    "attractor": "A stable state or pattern toward which a system naturally gravitates :: like a core memory or habit that pulls our thoughts back to it.",
    "attractors": "Stable states or patterns toward which a system naturally gravitates :: like core memories or habits that pull our thoughts back to them.",
    "strange attractor": "A complex, non-repeating pattern of behavior around which a system swirls :: like the unique, unpredictable yet structured rhythm of an individual's life.",
    "phase space": "A map of all possible states a system can occupy :: like the landscape of all choices and paths open to your mind.",
    "entrainment": "The synchronization of two independent rhythms :: like breathing in sync with a ticking clock or matching another person's emotional state.",
    "cardiorespiratory coherence": "The alignment of heart rhythm and breathing rate :: a biological state of harmony where the body and mind find calm focus.",
    "gnomon": "An added shape that allows a form to grow while keeping its original shape :: like learning a new skill that expands your capacity without losing who you are.",
    "gnomonic growth": "Growth that preserves original proportions :: like maturing in wisdom while remaining true to your core self.",
    "projective geometry": "The mathematics of perspectives and shadows :: how a multi-dimensional reality is projected into a lower-dimensional view, like a 3D object cast as a 2D shadow.",
    "non-commutative": "An operation where order changes the result :: like how doing action A then B leads to a different life state than B then A.",
    "reciprocal gap ratio": "The mathematical balance where the smaller part mirrors the whole :: like finding the sweet spot in a relationship where individual space exactly balances shared connection.",
    "conduction": "The free flow of energy or charge :: like a group of people moving in perfect synchrony, or a sudden flash of insight.",
    "valence electrons": "Electrons orbiting in the outermost shell :: like individual talents or ideas waiting for the spark of motivation to be shared.",
    "energy scale": "The size or depth of the transition barrier :: the amount of effort or changes required to shift states.",
    "roots": "The solutions to an algebraic equation :: like finding the core drivers or root causes that explain a complex pattern of behavior.",
    "quadratic equation": "An equation containing a squared variable :: representing a system with feedback and branching possibilities.",
    "expanding force": "A vector of growth and outward scaling :: like curiosity or creative expression widening your horizon.",
    "contracting force": "A vector of pulling inward or consolidation :: like deep reflection or setting boundaries to find your center.",
    "dimensional projection": "The process of mapping a higher-dimensional object into a lower dimension :: like how a person's complex internal life is projected onto their social profile.",
    "3D generative model": "The brain's internal simulation of space and depth :: the mental map we build to make sense of what we experience.",
    "inverse projection": "Reconstructing a higher-dimensional source from flat observations :: like deciphering a person's true intent behind their written words.",
    "brain networks": "Interconnected pathways of neurons communicating across the brain :: like a community of individuals collaborating to coordinate action.",
    "frequency bands": "Specific ranges of neural oscillation (alpha, beta, theta, etc.) :: like the different channels or registers of attention your mind can tune into.",
    "destructive interference": "The collision of two waves that cancel each other out :: like two competing thoughts or arguments that leave you feeling paralyzed and stuck.",
    "0.10 Hz": "A resonant frequency of one cycle every 10 seconds :: the natural frequency where the heart and lungs sync to create physiological peace.",
    "resonance frequency": "The natural vibration rate of a system :: the specific rhythm where you absorb and transmit energy with the least effort.",
    "heart rate variability": "The variation in time between consecutive heartbeats :: a primary indicator of nervous system resilience and emotional flexibility.",
    "HRV": "Heart Rate Variability :: a measure of nervous system resilience and adaptability.",
    "resonance loop": "A self-reinforcing circle of feedback :: like when a calm body quietens the mind, which in turn deepens physical relaxation.",
    "polyvagal theory": "A model of how our nervous system detects safety and threat :: explaining how our physiology shifts between fight-or-flight, freeze, and social connection.",
    "resting state brain networks": "Interconnected pathways of neurons communicating across the brain :: like a community of individuals collaborating to coordinate action."
  };

  // Sort terms by length descending to prevent sub-string collision wrapping
  const sortedSomaticKeys = Object.keys(somaticDictionary).sort((a, b) => b.length - a.length);

  // Helper to escape regex special characters
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Recursive text node walker for wrapping keywords
  function wrapSomaticTerms(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const parent = node.parentNode;
      if (!parent || ['SCRIPT', 'STYLE', 'TEXTAREA', 'BUTTON', 'A'].includes(parent.tagName) || parent.classList.contains('somatic-term')) {
        return;
      }

      const text = node.nodeValue;
      let match = null;
      let matchIndex = -1;
      let matchedTerm = "";

      for (const term of sortedSomaticKeys) {
        const escaped = escapeRegExp(term);
        const startBound = /^\w/.test(term) ? '\\b' : '';
        const endBound = /\w$/.test(term) ? '\\b' : '';
        const regex = new RegExp(startBound + escaped + endBound, 'i');
        const m = regex.exec(text);
        if (m) {
          if (matchIndex === -1 || m.index < matchIndex) {
            match = m;
            matchIndex = m.index;
            matchedTerm = term;
          }
        }
      }

      if (match) {
        const beforeText = text.substring(0, matchIndex);
        const matchText = text.substring(matchIndex, matchIndex + match[0].length);
        const afterText = text.substring(matchIndex + match[0].length);

        const beforeNode = document.createTextNode(beforeText);
        const afterNode = document.createTextNode(afterText);

        const span = document.createElement('span');
        span.className = 'somatic-term';
        span.textContent = matchText;
        span.setAttribute('data-tooltip', somaticDictionary[matchedTerm]);

        parent.insertBefore(beforeNode, node);
        parent.insertBefore(span, node);
        parent.insertBefore(afterNode, node);
        parent.removeChild(node);

        // Walk adjacent nodes
        wrapSomaticTerms(beforeNode);
        wrapSomaticTerms(afterNode);
      }
    } else {
      const children = Array.from(node.childNodes);
      for (const child of children) {
        wrapSomaticTerms(child);
      }
    }
  }

  // 3. Global Floating Tooltip class definition
  class SomaticTooltip {
    constructor() {
      this.el = document.createElement('div');
      this.el.id = 'global-somatic-tooltip';
      this.el.style.cssText = `
        position: fixed;
        z-index: 1000000;
        background: rgba(15, 12, 8, 0.94);
        border: 1px solid var(--gold-pale, #d4af37);
        color: var(--sand, #f4ecd8);
        padding: 10px 14px;
        font-size: 12px;
        line-height: 1.5;
        border-radius: 6px;
        max-width: 290px;
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        box-shadow: 0 6px 24px rgba(0, 0, 0, 0.95), 0 0 12px rgba(212, 175, 55, 0.2);
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.18s cubic-bezier(0.4, 0, 0.2, 1), transform 0.18s cubic-bezier(0.4, 0, 0.2, 1);
        transform: translateY(8px);
        font-family: 'Outfit', 'Inter', system-ui, -apple-system, sans-serif;
      `;
      document.body.appendChild(this.el);
    }

    show(targetEl, text) {
      // Re-append to document.body if PJAX took it away
      if (!document.getElementById('global-somatic-tooltip') || !document.body.contains(this.el)) {
        try {
          const old = document.getElementById('global-somatic-tooltip');
          if (old) old.remove();
        } catch(e) {}
        document.body.appendChild(this.el);
      }

      // Replace :: with styled transition hinge
      const formatted = text.replace(/::/g, '<span style="color: var(--gold-bright, #ffd700); font-weight: bold; text-shadow: 0 0 6px rgba(255,215,0,0.5);">::</span>');
      this.el.innerHTML = formatted;

      // Force block display to compute offsets
      this.el.style.display = 'block';
      const elWidth = this.el.offsetWidth;
      const elHeight = this.el.offsetHeight;

      const rect = targetEl.getBoundingClientRect();
      let top = rect.top - elHeight - 10;
      let left = rect.left + (rect.width - elWidth) / 2;

      // Bounds adjustment
      if (top < 8) {
        top = rect.bottom + 10;
      }
      if (left < 8) {
        left = 8;
      }
      if (left + elWidth > window.innerWidth - 8) {
        left = window.innerWidth - elWidth - 8;
      }

      this.el.style.top = `${top}px`;
      this.el.style.left = `${left}px`;
      this.el.style.opacity = '1';
      this.el.style.transform = 'translateY(0)';
    }

    hide() {
      this.el.style.opacity = '0';
      this.el.style.transform = 'translateY(4px)';
    }
  }

  // 4. Chamber Checklists Configuration
  const chamberChecklists = {
    '01': [
      "Apply voltage to set valence particles into resting orbit vibration.",
      "Slide past 61.8% threshold voltage to collapse the band gap.",
      "Observe coherent wave stream and mutual connection lines (Integrated Information Theory)."
    ],
    '02': [
      "Pulse the initial attunement chord using the controls.",
      "Draw the twin anyon fields (X) together on the canvas until they fuse.",
      "Observe the topological braid history expand by the golden proportion."
    ],
    '03': [
      "Click and drag the coordinate plane to explore complex roots.",
      "Align the real and imaginary components at the golden proportion coordinate.",
      "Trace the logarithmic spiral outward into the complex plane."
    ],
    '04': [
      "Pulse the gnomonic ratio to scale the geometric frame.",
      "Unfold the nested golden rectangles and trace the growing spiral.",
      "Connect the gnomon expansion to the regular solids in the Platonic Solids Lab."
    ],
    '05': [
      "Rotate the 4D hyper-dodecahedron (120-cell) projection by dragging.",
      "Adjust shadow casting angles to project the 3D dodecahedral silhouette.",
      "Explore the cross-linked Dodecahedron Explorer to study spatial projection."
    ],
    '06': [
      "Interact with the three-strand time loom on the canvas.",
      "Toggle non-commutative braid states and observe difference in results.",
      "Complete a full temporal braid to record residue in the Lineage Hall."
    ],
    '07': [
      "Focus on the center stillness point and sync breathing to the 0.10 Hz cycle.",
      "Toggle the acoustic resonator to hear the 144 Hz carrier waves.",
      "Visit the Resonance Library to learn about brain network entrainment."
    ],
    '08': [
      "Touch the somatic center node to complete the pattern and reveal the Chamber 08 environment.",
      "Hover the constellation nodes along the golden spiral to reveal gnomonic linkages.",
      "Pulse the Attunement Chord to sound the cascading golden mean arpeggio.",
      "Toggle Al-Farabi, Griot, Curandero, and Pletzer orchestration modes to attune the symphony."
    ],
    'template': [
      "Unlock the audio engine via the somatic node gesture.",
      "Hover over the interactive canvas to display the coordinate cross.",
      "Attune the maqam chord or pluck the kora strings to explore the harmonic field."
    ],
    '00': [
      "Unlock the audio engine via the somatic node gesture.",
      "Hover over the interactive canvas to display the coordinate cross.",
      "Attune the maqam chord or pluck the kora strings to explore the harmonic field."
    ]
  };

  // 4b. Chamber Majesty & Technical Details Dictionary
  const chamberMajesty = {
    '01': {
      objective: "Threshold Conduction",
      formula: "φ = 1 + 1/φ",
      freq: "233.0 Hz (144 × φ¹)",
      lore: "Visualizes the semiconductor band gap. Inactive electrons rest in the valence band. Increasing voltage past the threshold (61.8% of the gap) excites particles into the conduction band, representing the transition from conceptual isolation to active flow."
    },
    '02': {
      objective: "Topological Fusion",
      formula: "X ⊗ X ≅ 1 ⊕ X",
      freq: "376.9 Hz (144 × φ²)",
      lore: "Implements anyon fusion rules in a topological quantum computer. Drawing active anyons together triggers fusion, expanding the braid history in golden proportions and validating non-abelian statistics."
    },
    '03': {
      objective: "Complex Resolution",
      formula: "z_{n+1} = z_n^2 + c",
      freq: "609.9 Hz (144 × φ³)",
      lore: "Explores the roots of complex quadratic equations in the complex number plane. Aligning real and imaginary parts at the golden coordinates traces the logarithmic spiral outward, demonstrating phase synchronization."
    },
    '04': {
      objective: "Gnomonic Expansion",
      formula: "Whole + Gnomon = φ × Whole",
      freq: "986.8 Hz (144 × φ⁴)",
      lore: "Visualizes the gnomon expansion rule. Adding a gnomon to the existing structure expands the frame while preserving its golden ratio, modeling self-similar growth and cellular development."
    },
    '05': {
      objective: "Dimensional Projection",
      formula: "Observable = Shadow(Richer)",
      freq: "1596.7 Hz (144 × φ⁵)",
      lore: "Projects a 4-dimensional hyper-dodecahedron into a 3-dimensional wireframe and its 2D shadow. Adjusting the angle reveals how complex hidden structures project simpler flat shadows, modeling inverse inference."
    },
    '06': {
      objective: "Braided History",
      formula: "A ⊗ B ≠ B ⊗ A",
      freq: "2583.5 Hz (144 × φ⁶)",
      lore: "Demonstrates non-commutative algebra where the order of operations changes the result. Weaving the strands of the time loom records different temporal histories, building the scholar's residue."
    },
    '07': {
      objective: "Cardiorespiratory Sync",
      formula: "Coherence = Accessible Tech",
      freq: "4179.9 Hz (144 × φ⁷)",
      lore: "Guides the observer into physiological entrainment at 0.10 Hz (6-second breath cycles). Syncing breath with the expanding circle coordinates heart rate variability, quietening resting-state brain networks."
    },
    '08': {
      objective: "Pattern Completion",
      formula: "Learning = Re-membering",
      freq: "6763.2 Hz (144 × φ⁸)",
      lore: "Brings all eight chambers into a single integrated constellation. Hovering the nodes traces gnomonic boundaries, demonstrating how the brain reconstructs whole memories from partial cues (hippocampal pattern completion)."
    },
    'template': {
      objective: "Architectural Baseline",
      formula: "Φ = 1 + 1/Φ",
      freq: "144.0 Hz (144 × φ⁰)",
      lore: "The skeletal structure of the HIA chambers. Serves as the baseline framework for active inference, aligning the five registers of attention and voice."
    },
    '00': {
      objective: "Architectural Baseline",
      formula: "Φ = 1 + 1/Φ",
      freq: "144.0 Hz (144 × φ⁰)",
      lore: "The skeletal structure of the HIA chambers. Serves as the baseline framework for active inference, aligning the five registers of attention and voice."
    }
  };

  // Helper to resolve current chamber ID
  function getChamberId() {
    const path = window.location.pathname;
    const match = path.match(/phi-chamber-(\d+)/);
    if (match) return match[1];
    const breadcrumb = document.getElementById('breadcrumb-title');
    if (breadcrumb && breadcrumb.textContent.includes('Chamber')) {
      const m = breadcrumb.textContent.match(/Chamber\s*(\d+)/i);
      if (m) return m[1];
    }
    if (path.includes('template')) return 'template';
    return '';
  }

  // State trackers
  window.PHI_OCEAN.hasInteracted = false;
  window.PHI_OCEAN.diagnostics = window.PHI_OCEAN.diagnostics || {};

  function initChamberDiagnostics(ch) {
    if (!ch) return;
    if (!window.PHI_OCEAN.diagnostics[ch]) {
      window.PHI_OCEAN.diagnostics[ch] = {
        step1: false,
        step2: false,
        step3: false
      };
    }
  }

  // 5. Update Manual Checklist UI
  function updateModalChecklist() {
    const ch = getChamberId() || 'template';
    if (!ch || !chamberChecklists[ch]) return;

    initChamberDiagnostics(ch);
    const diag = window.PHI_OCEAN.diagnostics[ch];

    const container = document.getElementById('guide-checklist-container');
    if (container) {
      container.innerHTML = '';
      chamberChecklists[ch].forEach((text, index) => {
        const key = `step${index + 1}`;
        const checked = diag[key];

        const item = document.createElement('div');
        item.className = 'checklist-item';
        item.innerHTML = `
          <div class="checklist-checkbox ${checked ? 'checked' : ''}"></div>
          <div class="checklist-text">${text}</div>
        `;

        // Allow manual toggle (double secret override)
        item.addEventListener('click', () => {
          diag[key] = !diag[key];
          updateModalChecklist();
        });

        container.appendChild(item);
      });
    }

    // Populate Majesty dynamically
    const majestyContainer = document.getElementById('guide-majesty-container');
    if (majestyContainer && chamberMajesty[ch]) {
      const data = chamberMajesty[ch];
      majestyContainer.innerHTML = `
        <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: var(--gold-bright, #ffd700); margin-bottom: 10px; font-weight: bold;">Chamber Majesty</div>
        <div style="display: grid; grid-template-columns: 80px 1fr; gap: 6px; font-size: 12px; margin-bottom: 10px; border-bottom: 1px solid rgba(212, 175, 55, 0.1); padding-bottom: 8px;">
          <span style="opacity: 0.6;">Objective:</span>
          <strong style="color: var(--sand);">${data.objective}</strong>
          <span style="opacity: 0.6;">Equation:</span>
          <strong style="font-family: var(--font-mono, monospace); color: var(--gold-pale);">${data.formula}</strong>
          <span style="opacity: 0.6;">Resonance:</span>
          <strong style="color: var(--gold-pale);">${data.freq}</strong>
        </div>
        <p style="font-size: 11.5px; line-height: 1.55; color: var(--sand-dim, #d8c9b4); font-style: italic; margin: 0;">"${data.lore}"</p>
      `;
    }
  }

  // 6. Update Diagnostics Loop
  let diagnosticInterval = null;
  function updateLiveDiagnostics() {
    // Audio engine state
    const audioValEl = document.getElementById('diag-audio-val');
    if (audioValEl) {
      let status = "SUSPENDED (Touch to awaken)";
      let color = "#e6a23c"; // yellow
      
      const toneRunning = window.Tone && window.Tone.getContext() && window.Tone.getContext().state === 'running';
      const ctxRunning = window.PHI_OCEAN.ctx && window.PHI_OCEAN.ctx.state === 'running';
      
      if (toneRunning) {
        status = "ATTUNED (Tone.js :: Running)";
        color = "#67c23a"; // green
      } else if (window.PHI_OCEAN.audioReady || ctxRunning) {
        status = "ATTUNED (WebAudio :: Active)";
        color = "#67c23a";
      } else if (window.Tone && window.Tone.getContext() && window.Tone.getContext().state === 'closed') {
        status = "CLOSED";
        color = "#f56c6c"; // red
      }
      
      audioValEl.style.color = color;
      audioValEl.innerHTML = `<span class="diagnostic-dot" style="color: ${color};"></span>${status}`;
    }

    // Visual Field state
    const visualValEl = document.getElementById('diag-visual-val');
    if (visualValEl) {
      let status = "INACTIVE (No Canvas)";
      let color = "#f56c6c";
      const canvas = document.querySelector('canvas') || document.querySelector('svg.braid-svg');
      
      if (canvas) {
        status = "OPERATIONAL (Active Draw Loop)";
        color = "#67c23a";
      }
      visualValEl.style.color = color;
      visualValEl.innerHTML = `<span class="diagnostic-dot" style="color: ${color};"></span>${status}`;
    }

    // Interactive state
    const interactiveValEl = document.getElementById('diag-interactive-val');
    if (interactiveValEl) {
      let status = "STANDBY (Awaiting Input)";
      let color = "#e6a23c";
      
      if (window.PHI_OCEAN.hasInteracted) {
        status = "ENGAGED :: Resonance Sync";
        color = "#67c23a";
      }
      interactiveValEl.style.color = color;
      interactiveValEl.innerHTML = `<span class="diagnostic-dot" style="color: ${color};"></span>${status}`;
    }
  }

  // 7. Modal creation
  function createGuideModal() {
    if (document.getElementById('guide-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'guide-modal';
    modal.innerHTML = `
      <div class="guide-content" data-lenis-prevent>
        <button class="guide-close" id="guide-close" aria-label="Close Manual">✕</button>
        <h2 class="guide-title">Attunement Manual</h2>
        <div class="guide-subtitle">Double-Secret Engineering Checkpoint</div>

        <div class="diagnostics-panel">
          <div class="diagnostic-item">
            <span class="diagnostic-label">Audio System Status</span>
            <span class="diagnostic-val" id="diag-audio-val"></span>
          </div>
          <div class="diagnostic-item">
            <span class="diagnostic-label">Visual Field Activity</span>
            <span class="diagnostic-val" id="diag-visual-val"></span>
          </div>
          <div class="diagnostic-item">
            <span class="diagnostic-label">Interactive Field State</span>
            <span class="diagnostic-val" id="diag-interactive-val"></span>
          </div>
        </div>

        <div class="optimization-section" style="margin-bottom: 24px;">
          <div class="checklist-title">Optimization & Calibrations</div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 10px;">
            <button class="ctrl-btn" id="opt-awaken-audio" style="font-size: 10px; min-height: 34px; border-color: rgba(212, 175, 55, 0.4); background: rgba(212, 175, 55, 0.05); color: var(--gold-pale);">Awaken Audio</button>
            <button class="ctrl-btn" id="opt-force-attune" style="font-size: 10px; min-height: 34px; border-color: rgba(212, 175, 55, 0.4); background: rgba(212, 175, 55, 0.05); color: var(--gold-pale);">Force Attune</button>
            <button class="ctrl-btn" id="opt-reset-scholar" style="grid-column: span 2; font-size: 10px; min-height: 34px; border-color: rgba(196, 98, 45, 0.5); background: rgba(196, 98, 45, 0.05); color: var(--terra-pale);">Reset Scholar Residue</button>
          </div>
        </div>

        <div class="majesty-section" id="guide-majesty-container" style="margin-bottom: 24px; background: rgba(212, 175, 55, 0.03); border: 1px dashed rgba(212, 175, 55, 0.2); border-radius: 8px; padding: 16px;">
          <!-- Populated dynamically -->
        </div>

        <div class="checklist-section">
          <div class="checklist-title">Attunement Checklist</div>
          <div id="guide-checklist-container"></div>
        </div>

        <div class="lore-section">
          <div class="lore-title">The Transition Hinge ::</div>
          In the mathematics of The φ Ocean, the double-colon represents the **Transition Hinge** — the boundary state where any quantity, concept, or system transforms into its reciprocal counterpart. It is the operator of organic integration, mapping:
          <br><br>
          <span style="color: var(--gold-pale);">Structure</span> :: <span style="color: var(--gold-bright);">Resonance</span><br>
          <span style="color: var(--gold-pale);">Noise</span> :: <span style="color: var(--gold-bright);">Coherence</span><br>
          <span style="color: var(--gold-pale);">Isolation</span> :: <span style="color: var(--gold-bright);">Unified Whole</span>
          <br><br>
          When you encounter **::** across the chambers, pause to align the math dot and the life dot.
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Stop scroll and touch events from leaking to the parent page
    const guideContent = modal.querySelector('.guide-content');
    if (guideContent) {
      guideContent.addEventListener('wheel', (e) => e.stopPropagation(), { passive: true });
      guideContent.addEventListener('touchmove', (e) => e.stopPropagation(), { passive: true });
    }

    // Event listeners
    document.getElementById('guide-close').addEventListener('click', closeGuideModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeGuideModal();
    });

    // Optimization actions listeners
    const awakenAudioBtn = document.getElementById('opt-awaken-audio');
    if (awakenAudioBtn) {
      awakenAudioBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const awakened = await window.PHI_OCEAN.initAudio();
        if (awakened) {
          updateLiveDiagnostics();
        }
      });
    }

    const forceAttuneBtn = document.getElementById('opt-force-attune');
    if (forceAttuneBtn) {
      forceAttuneBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const ch = getChamberId() || 'template';
        initChamberDiagnostics(ch);
        const d = window.PHI_OCEAN.diagnostics[ch];
        d.step1 = true;
        d.step2 = true;
        d.step3 = true;
        updateModalChecklist();
        updateLiveDiagnostics();
      });
    }

    const resetScholarBtn = document.getElementById('opt-reset-scholar');
    if (resetScholarBtn) {
      resetScholarBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm('Are you sure you want to reset all Scholar residue? This will clear your exploration sequence.')) {
          window.SCHOLAR.clear();
          localStorage.clear();
          window.location.reload();
        }
      });
    }
  }

  function openGuideModal() {
    createGuideModal();
    const modal = document.getElementById('guide-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    updateModalChecklist();
    updateLiveDiagnostics();
    diagnosticInterval = setInterval(updateLiveDiagnostics, 500);
  }

  function closeGuideModal() {
    const modal = document.getElementById('guide-modal');
    if (modal) {
      modal.classList.remove('active');
    }
    document.body.style.overflow = ''; // Restore background scrolling
    if (diagnosticInterval) {
      clearInterval(diagnosticInterval);
      diagnosticInterval = null;
    }
  }

  // 8. Global Interaction Monitor
  document.addEventListener('input', (e) => {
    window.PHI_OCEAN.hasInteracted = true;
    const ch = getChamberId();
    if (!ch) return;
    initChamberDiagnostics(ch);
    
    if (e.target.tagName === 'INPUT' && e.target.type === 'range') {
      window.PHI_OCEAN.diagnostics[ch].step1 = true;
      const val = parseFloat(e.target.value);
      const max = parseFloat(e.target.max) || 100;
      const pct = (val / max) * 100;
      if (pct >= 61.8) {
        window.PHI_OCEAN.diagnostics[ch].step2 = true;
        window.PHI_OCEAN.diagnostics[ch].step3 = true;
      }
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.closest('#guide-modal')) return;
    window.PHI_OCEAN.hasInteracted = true;
    const ch = getChamberId();
    if (!ch) return;
    initChamberDiagnostics(ch);
    
    const d = window.PHI_OCEAN.diagnostics[ch];
    if (e.target.tagName === 'CANVAS' || e.target.closest('canvas') || e.target.closest('svg')) {
      d.step1 = true;
      d.step2 = true;
    }
    if (e.target.closest('.ctrl-btn') || e.target.closest('button')) {
      d.step1 = true;
      d.step2 = true;
    }
    if (e.target.tagName === 'A' || e.target.closest('a')) {
      d.step3 = true;
    }
  });

  // 9. Document Initialization Hook
  function initShared() {
    // A. Parse and wrap somatic terms in the academic registers
    const academicBlocks = document.querySelectorAll('.academic-text');
    academicBlocks.forEach(block => {
      wrapSomaticTerms(block);
    });

    // B. Initialize single tooltip instance
    if (!window.PHI_OCEAN.tooltip) {
      window.PHI_OCEAN.tooltip = new SomaticTooltip();
    }

    // Event delegation for tooltip triggers
    if (!window.PHI_OCEAN.listenersBound) {
      document.addEventListener('mouseover', (e) => {
        const term = e.target.closest('.somatic-term');
        if (term) {
          const text = term.getAttribute('data-tooltip');
          if (text) {
            window.PHI_OCEAN.tooltip.show(term, text);
          }
        }
      });

      document.addEventListener('mouseout', (e) => {
        const term = e.target.closest('.somatic-term');
        if (term) {
          window.PHI_OCEAN.tooltip.hide();
        }
      });
      window.PHI_OCEAN.listenersBound = true;
    }

    // C. Inject :: Guide button into navigation bar
    const soundToggle = document.getElementById('sound-toggle');
    if (soundToggle && !document.getElementById('guide-btn')) {
      const guideBtn = document.createElement('button');
      guideBtn.className = 'ctrl-btn';
      guideBtn.id = 'guide-btn';
      guideBtn.title = 'Attunement Manual';
      guideBtn.setAttribute('aria-label', 'Open Attunement Manual');
      guideBtn.style.cssText = `
        margin-left: 8px;
        min-height: 28px;
        padding: 0 12px;
        font-size: 11px;
        background: rgba(212, 175, 55, 0.1);
        border: 1px solid rgba(212, 175, 55, 0.4);
        color: var(--gold-pale, #d4af37);
        cursor: pointer;
        transition: all 0.3s ease;
      `;
      guideBtn.innerHTML = '<span style="color: var(--gold-bright, #ffd700); font-weight: bold;">::</span> Guide';

      guideBtn.addEventListener('mouseenter', () => {
        guideBtn.style.background = 'rgba(212, 175, 55, 0.2)';
        guideBtn.style.borderColor = 'var(--gold-bright, #ffd700)';
        guideBtn.style.boxShadow = '0 0 8px rgba(212, 175, 55, 0.3)';
      });

      guideBtn.addEventListener('mouseleave', () => {
        guideBtn.style.background = 'rgba(212, 175, 55, 0.1)';
        guideBtn.style.borderColor = 'rgba(212, 175, 55, 0.4)';
        guideBtn.style.boxShadow = 'none';
      });

      guideBtn.addEventListener('click', openGuideModal);

      // Insert adjacent to sound toggle
      soundToggle.parentNode.insertBefore(guideBtn, soundToggle.nextSibling);
    }
  }

  // Hook initialization for direct load, complete readyState, and PJAX
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initShared();
  } else {
    window.addEventListener('DOMContentLoaded', initShared);
  }
  document.addEventListener('hdm:page-loaded', initShared);
})();
