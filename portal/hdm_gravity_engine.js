/**
 * HDM Gravity Engine (Phase 3)
 * Equation: (Space & Time + Gravity) * Mars = The Instrument of Observation
 * 
 * Editorial Philosophy:
 * PATIENCE x PROCRASTINATION = STEEPING.
 * Time is an active input. The longer we rest on a dimensional node (Face), the deeper the steep.
 * As time aggregates, mathematical gravity pulls the adjacent faces toward the focal point.
 * We are visualizing Structural Empathy — the network bends to accommodate the focus.
 * Once critical mass is reached, it triggers the 'Mars Catalyst' - a physical Ping connecting
 * the node directly into the Open Mars Zine architecture.
 */

(function() {
  const cards = document.querySelectorAll('.face-card');
  if (cards.length === 0) return;

  const STEEP_THRESHOLD = 1500; // MS of non-doing before gravity begins to warp space
  const BLOOM_THRESHOLD = 4500; // MS before the Bloom catalyst fires the Ping
  
  let accumulatedTime = 0;
  let activeCardIndex = -1;
  let rafId = null;
  let lastTimestamp = 0;

  // Audio Context for Ygor's Planets Resonator (Sonic Bloom)
  let bloomAudioCtx = null;
  function initBloomAudio() {
    if (!bloomAudioCtx) {
      bloomAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }
  
  // Inject exactly calculated Gravity Physics Styles
  const gravityStyles = document.createElement('style');
  gravityStyles.innerHTML = `
    .face-card.focal-point {
      z-index: 10;
      border-color: var(--gold);
      box-shadow: 0 0 40px rgba(196,140,80,0.15);
      transform: scale(1.03) translateY(-6px) !important;
      transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .face-card.neighbor-pulled {
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease;
    }
    .bloom-ping {
      margin-top: 14px;
      padding: 8px 12px;
      background: rgba(196,98,45,0.1);
      border-left: 2px solid var(--terra);
      font-family: 'Inter', sans-serif;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.15em;
      color: var(--gold);
      text-transform: uppercase;
      opacity: 0;
      transform: translateY(8px);
      transition: opacity 0.4s ease, transform 0.4s ease;
      display: inline-block;
      text-decoration: none;
    }
    .bloom-ping.active {
      opacity: 1;
      transform: translateY(0);
    }
    .bloom-ping:hover {
      background: rgba(196,98,45,0.2);
      color: var(--terra);
    }
  `;
  document.head.appendChild(gravityStyles);

  function applyGravity(deltaTime) {
    accumulatedTime += deltaTime;
    
    // Stage 1: Gravitational Pull (Structural Empathy)
    // The nodes surrounding the focal point are pulled inward.
    if (accumulatedTime > STEEP_THRESHOLD && accumulatedTime < BLOOM_THRESHOLD) {
      const pullFactor = Math.min((accumulatedTime - STEEP_THRESHOLD) / 2000, 1);
      
      cards.forEach((card, idx) => {
        if (idx !== activeCardIndex) {
          const distance = Math.abs(idx - activeCardIndex);
          // Only pull immediate adjacent geometry (within 2 nodes mathematically)
          if (distance <= 2) { 
            card.classList.add('neighbor-pulled');
            const dirX = idx > activeCardIndex ? -1 : 1;
            const pxOffset = dirX * (18 * pullFactor);
            // Translate the neighbor closer, scale down slightly as it falls into orbit
            card.style.transform = `translateX(${pxOffset}px) scale(${1 - (0.03 * pullFactor)})`;
            card.style.opacity = 1 - (0.2 * pullFactor);
          }
        }
      });
    }

    // Stage 2: The Mars Catalyst (The Bloom)
    if (accumulatedTime >= BLOOM_THRESHOLD) {
      const activeCard = cards[activeCardIndex];
      if (!activeCard.dataset.bloomed) {
        activeCard.dataset.bloomed = "true";
        triggerBloom(activeCard, activeCardIndex);
      }
    }
  }

  function triggerBloom(card, idx) {
    const archInner = card.querySelector('.face-arch-inner');
    if (archInner) {
      initBloomAudio();
      firePlanetsResonator(idx);

      // Create the portal to the transcribed Zine
      const pingLocus = document.createElement('a');
      pingLocus.href = `../Dodeca_insight/Open_Mars_Zine_2026_Transcribed.md`;
      pingLocus.className = 'bloom-ping';
      pingLocus.innerHTML = `[ PING CATALYST :: EXPLORE OPEN MARS ]`;
      archInner.appendChild(pingLocus);
      
      // Force reflow
      void pingLocus.offsetWidth;
      pingLocus.classList.add('active');
      
      // Visual bloom burst
      card.animate([
        { backgroundColor: 'rgba(255,255,255,0.05)', boxShadow: '0 0 0px rgba(196,140,80,0)' },
        { backgroundColor: 'rgba(196,140,80,0.15)',  boxShadow: '0 0 60px rgba(196,140,80,0.4)' },
        { backgroundColor: 'rgba(255,255,255,0.05)', boxShadow: '0 0 40px rgba(196,140,80,0.15)' }
      ], { duration: 1200, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' });
    }
  }

  // YGOR'S PLANETS RESONATOR LOGIC
  function firePlanetsResonator(index) {
    if (!bloomAudioCtx) return;
    if (bloomAudioCtx.state === 'suspended') bloomAudioCtx.resume();

    // The Aether Root
    const baseFreq = 144.0; // Deep drone root (half of 288Hz)
    // Fibonacci/Phi Harmonic sequence
    const ratios = [ 1.0, 1.125, 1.25, 1.333, 1.5, 1.618, 1.666, 1.875, 2.0, 2.25, 2.5, 2.618 ];
    const freq = baseFreq * ratios[index % 12];

    const t = bloomAudioCtx.currentTime;

    // 1. **THE VOID** (Deep Drone Engine)
    const voidOsc = bloomAudioCtx.createOscillator();
    const voidGain = bloomAudioCtx.createGain();
    const voidFilter = bloomAudioCtx.createBiquadFilter();
    
    voidOsc.type = 'sine';
    voidOsc.frequency.setValueAtTime(freq / 2, t); // Sub-octave planet drone
    
    // Slow planetary LFO wobble
    const lfo = bloomAudioCtx.createOscillator();
    const lfoGain = bloomAudioCtx.createGain();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.5, t); // Half a cycle per second
    lfoGain.gain.setValueAtTime(5, t); // 5Hz pitch modulation
    lfo.connect(lfoGain);
    lfoGain.connect(voidOsc.frequency);

    voidFilter.type = 'lowpass';
    voidFilter.frequency.setValueAtTime(400, t);
    
    voidGain.gain.setValueAtTime(0, t);
    voidGain.gain.linearRampToValueAtTime(0.6, t + 1.5); // Slow swell
    voidGain.gain.exponentialRampToValueAtTime(0.001, t + 6.0); // 6 second tail

    voidOsc.connect(voidFilter);
    voidFilter.connect(voidGain);
    voidGain.connect(bloomAudioCtx.destination);

    // 2. **THE SPARK** (The Resonant Bloom Chord)
    const sparkOsc = bloomAudioCtx.createOscillator();
    const sparkGain = bloomAudioCtx.createGain();
    
    sparkOsc.type = 'triangle';
    sparkOsc.frequency.setValueAtTime(freq * 1.5, t); // Perfect fifth above root
    
    sparkGain.gain.setValueAtTime(0, t);
    sparkGain.gain.linearRampToValueAtTime(0.15, t + 0.1); // Immediate, bright attack
    sparkGain.gain.exponentialRampToValueAtTime(0.001, t + 4.0); // 4 second tail

    sparkOsc.connect(sparkGain);
    sparkGain.connect(bloomAudioCtx.destination);

    // Ignite the system
    lfo.start(t);
    voidOsc.start(t);
    sparkOsc.start(t);
    
    lfo.stop(t + 6.5);
    voidOsc.stop(t + 6.5);
    sparkOsc.stop(t + 6.5);
  }

  function engineLoop(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const deltaTime = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    if (activeCardIndex !== -1) {
      applyGravity(deltaTime);
      rafId = requestAnimationFrame(engineLoop);
    }
  }

  cards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
      initBloomAudio(); // Prime the audio engine silently on hover
      activeCardIndex = index;
      accumulatedTime = 0;
      lastTimestamp = 0;
      card.classList.add('focal-point');
      rafId = requestAnimationFrame(engineLoop);
    });

    card.addEventListener('mouseleave', () => {
      cancelAnimationFrame(rafId);
      activeCardIndex = -1;
      accumulatedTime = 0;
      
      // Release gravity (Snapshot to equilibrium)
      card.classList.remove('focal-point');
      cards.forEach(c => {
        c.classList.remove('neighbor-pulled');
        c.style.transform = '';
        c.style.opacity = '';
      });
    });
  });
})();
