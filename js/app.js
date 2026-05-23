// Ecosystem Root (app.js)
// Responsible for initializing the global Audio Context, orchestrating PJAX state transitions,
// and preserving liveness across the different explorers.

if (!window._hdmTransientListeners) {
    window._hdmTransientListeners = [];
    window._hdmTrackingTransient = false;

    // ── BULLETPROOF PREVENTDEFAULT BYPASS FOR INDEX PAGE SCROLL RELEASE ──
    const _originalPreventDefault = Event.prototype.preventDefault;
    Event.prototype.preventDefault = function() {
        const path = window.location.pathname.toLowerCase();
        const isIndexPage = path.endsWith('/explorers/index.html') || 
                            path.endsWith('/explorers/') || 
                            path.endsWith('/explorers') ||
                            path === '/explorers/index.html' ||
                            path === '/explorers/' ||
                            path === '/explorers';
        
        let isMagnetActive = false;
        try {
            const activeMagnet = localStorage.getItem('active_magnet');
            isMagnetActive = activeMagnet && activeMagnet !== 'default';
        } catch (e) {}

        let isInteractiveTarget = false;
        try {
            if (this.target && this.target.closest) {
                isInteractiveTarget = !!(
                    this.target.closest('canvas') || 
                    this.target.closest('button') || 
                    this.target.closest('input') || 
                    this.target.closest('select') || 
                    this.target.closest('a') || 
                    this.target.closest('[role="button"]') ||
                    this.target.closest('.interactive-canvas') ||
                    this.target.closest('#magnet-selector')
                );
            }
        } catch (e) {}

        if ((isIndexPage || isMagnetActive) && !isInteractiveTarget && (
            this.type === 'wheel' || 
            this.type === 'mousewheel' || 
            this.type === 'dommousescroll' || 
            this.type === 'DOMMouseScroll' || 
            this.type === 'touchmove' || 
            this.type === 'touchstart' || 
            this.type === 'touchend' || 
            this.type === 'pointermove' || 
            this.type === 'pointerdown' || 
            this.type === 'pointerup'
        )) {
            // Silently bypass preventDefault on scroll events to release scroll lock
            return;
        }
        return _originalPreventDefault.apply(this, arguments);
    };

    const _originalAdd = EventTarget.prototype.addEventListener;
    const _originalRemove = EventTarget.prototype.removeEventListener;

    window._originalAddEventListener = _originalAdd;
    window._originalRemoveEventListener = _originalRemove;

    const customAddEventListener = function(type, listener, options) {
        if (window._hdmTrackingTransient && (
            this === window || 
            this === document || 
            (document && this === document.documentElement) ||
            (document && this === document.body) ||
            (window.visualViewport && this === window.visualViewport) ||
            (typeof Window !== 'undefined' && this instanceof Window) ||
            (typeof Document !== 'undefined' && this instanceof Document)
        )) {
            window._hdmTransientListeners.push({ target: this, type, listener, options });
        }
        return _originalAdd.call(this, type, listener, options);
    };

    const customRemoveEventListener = function(type, listener, options) {
        if (window._hdmTrackingTransient && (
            this === window || 
            this === document || 
            (document && this === document.documentElement) ||
            (document && this === document.body) ||
            (window.visualViewport && this === window.visualViewport) ||
            (typeof Window !== 'undefined' && this instanceof Window) ||
            (typeof Document !== 'undefined' && this instanceof Document)
        )) {
            window._hdmTransientListeners = window._hdmTransientListeners.filter(item => 
                !(item.target === this && item.type === type && item.listener === listener)
            );
        }
        return _originalRemove.call(this, type, listener, options);
    };

    // Apply to EventTarget prototype
    EventTarget.prototype.addEventListener = customAddEventListener;
    EventTarget.prototype.removeEventListener = customRemoveEventListener;

    // Overwrite directly on window and document to bypass any prototype shadowing/caching issues
    window.addEventListener = customAddEventListener;
    window.removeEventListener = customRemoveEventListener;
    document.addEventListener = customAddEventListener;
    document.removeEventListener = customRemoveEventListener;

    // Apply directly to Window, Document, and Element prototypes if they override addEventListener
    const prototypesToPatch = [];
    if (typeof Window !== 'undefined' && Window.prototype) prototypesToPatch.push(Window.prototype);
    if (typeof Document !== 'undefined' && Document.prototype) prototypesToPatch.push(Document.prototype);
    if (typeof Element !== 'undefined' && Element.prototype) prototypesToPatch.push(Element.prototype);

    prototypesToPatch.forEach(proto => {
        if (proto.hasOwnProperty('addEventListener')) {
            proto.addEventListener = customAddEventListener;
        }
        if (proto.hasOwnProperty('removeEventListener')) {
            proto.removeEventListener = customRemoveEventListener;
        }
    });
}


class EcosystemApp {
    constructor() {
        this.audioCtx = null;
        this.cache = new Map();
        this.supabase = null;

        // Ensure Tone.js is ready if included via script tag globally
        this.toneReady = false;
        this.audioUnlocked = false;

        // Tracking cursor coordinates for Biophilic canvas and Ellian Lantern
        this.mouseX = window.innerWidth / 2;
        this.mouseY = window.innerHeight / 2;

        this.initPjax();
        this.initSupabase();
        this.injectMagnetStyles();
        console.log(":: Ecosystem Root Initialized");

        // Protect global stillness engine from duplicate page overrides
        Object.defineProperty(window, 'initiateStillness', {
            value: this.initiateStillness.bind(this),
            writable: false,
            configurable: true
        });

        // Bind global audio unlock properly to the first synchronous touch
        const unlockAudio = () => {
            if (!this.audioUnlocked) {
                this.audioUnlocked = true;
                this.ensureAudioReady();
            }
            document.removeEventListener('pointerdown', unlockAudio);
            document.removeEventListener('keydown', unlockAudio);
        };
        document.addEventListener('pointerdown', unlockAudio);
        document.addEventListener('keydown', unlockAudio);

        // Global mouse & touch coordinate tracking
        window.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            document.body.style.setProperty('--mouse-x', `${e.clientX}px`);
            document.body.style.setProperty('--mouse-y', `${e.clientY}px`);
        });
        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                this.mouseX = e.touches[0].clientX;
                this.mouseY = e.touches[0].clientY;
                document.body.style.setProperty('--mouse-x', `${e.touches[0].clientX}px`);
                document.body.style.setProperty('--mouse-y', `${e.touches[0].clientY}px`);
            }
        }, { passive: true });

        // Wait for DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.cleanupStillness();
                this.createPingRadar();
                this.applyActiveMagnet();
                this.initMagnetPortal();
                document.body.classList.add('is-loaded');
            });
        } else {
            this.cleanupStillness();
            this.createPingRadar();
            this.applyActiveMagnet();
            this.initMagnetPortal();
            document.body.classList.add('is-loaded');
        }
        window._hdmTrackingTransient = true;
    }

    async initSupabase() {
        const supabaseUrl = 'https://zkjobgypxihqpkhigsjr.supabase.co';
        const supabaseAnonKey = 'sb_publishable_D4-FAVTH9dLJixlB5MALEw_QNkA1ukt';

        if (supabaseUrl === 'YOUR_SUPABASE_URL') {
            console.warn(":: HONEST ENGINE :: Awaiting Supabase Keys in app.js");
            return;
        }

        try {
            // Dynamically import the ESM module for Supabase Client
            const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm');
            this.supabase = createClient(supabaseUrl, supabaseAnonKey);

            // Check if the HonestFramingSystem script was loaded in this page
            if (window.HonestFramingSystem) {
                window.HonestFramingSystem.initialize(this.supabase);
            }
        } catch (e) {
            console.error(":: HONEST ENGINE :: Failed to connect to Supabase Network", e);
        }
    }

    async loadToneJS() {
        if (window.Tone) return true;
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js";
            script.onload = () => resolve(true);
            script.onerror = () => { console.error("Tone.js could not be loaded globally."); resolve(false); };
            document.head.appendChild(script);
        });
    }

    async ensureAudioReady() {
        if (this.toneReady) return;

        // 1. Create native audio context synchronously to bypass autoplay policy
        if (!this.audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioCtx = new AudioContext();
            if (this.audioCtx.state === 'suspended') {
                this.audioCtx.resume();
            }
        }

        // 2. Safely load Tone.js
        await this.loadToneJS();

        if (window.Tone) {
            window.Tone.setContext(this.audioCtx);
            await window.Tone.start();
            this.toneReady = true;
            console.log(":: Global Audio Context Awakened");
            this.buildSonicArchitecture();
        }
        return this.audioCtx;
    }

    buildSonicArchitecture() {
        if (this.globalDrone) return;

        // 1. Ecosystem Drone (144Hz Continuous Foundation)
        this.globalDrone = new Tone.Oscillator({
            frequency: 144,
            type: "sine",
            volume: -Infinity
        }).start();

        this.globalFilter = new Tone.Filter(200, "lowpass");
        this.globalFilterLFO = new Tone.LFO(0.1, 140, 300).start();
        this.globalFilterLFO.connect(this.globalFilter.frequency);

        this.globalReverb = new Tone.Reverb({ decay: 5, wet: 0.6 }).toDestination();
        this.globalDrone.chain(this.globalFilter, this.globalReverb);

        // Gently fade the room in
        this.globalDrone.volume.rampTo(-34, 4);

        // 2. Trans-dimensional Navigation PING
        this.navPing = new Tone.MembraneSynth({
            pitchDecay: 0.05,
            octaves: 4,
            oscillator: { type: "sine" },
            envelope: { attack: 0.005, decay: 0.6, sustain: 0.1, release: 1 },
            volume: -18
        }).connect(this.globalReverb);

        // 3. Tactile Golden Chime - Attuned to pure phi-ratio proportions
        const phi = 1.61803398875;
        this.hoverChime = new Tone.FMSynth({
            harmonicity: phi, // pure Golden Ratio
            modulationIndex: phi * phi, // phi^2
            oscillator: { type: "sine" },
            envelope: { 
                attack: 0.1618, 
                decay: 0.618, 
                sustain: 0.382, 
                release: 1.618 
            },
            modulation: { type: "triangle" },
            modulationEnvelope: { attack: 0.02, decay: 0.5, sustain: 0, release: 0.1 },
            volume: -24
        }).connect(this.globalReverb);

        // 4. Slider Sweep Engine - Continuous geometric mapping for adjustments
        this.sliderSweepSynth = new Tone.Synth({
            oscillator: { type: "triangle" },
            envelope: { attack: 0.05, decay: 0.1, sustain: 1, release: 0.4 },
            volume: -Infinity
        }).connect(this.globalReverb);

        console.log(":: Semantic Acoustic Chamber Active");
        this.bindGlobalSonics();
        this.tuneAcousticChamber();
    }

    tuneAcousticChamber() {
        if (!this.toneReady || !this.hoverChime) return;

        const path = window.location.pathname.toLowerCase();
        let targetFreq = 288; // Default Root Octave
        const phi = 1.61803398875;

        // Mathematical shifts in register based on instrument context
        if (path.includes('phase-state')) {
            targetFreq = 216; // Perfect 5th below 288
        } else if (path.includes('resonance-library')) {
            targetFreq = 432; // Perfect 5th above 288
        } else if (path.includes('dodecahedron')) {
            targetFreq = 360; // Major 3rd above 288 (Golden resonance)
        } else if (path.includes('phi-explorer')) {
            targetFreq = 144 * phi; // phi frequency (approx 233Hz)
        } else if (path.includes('stoneware-builder')) {
            targetFreq = 180; // Major 3rd (Tactile and grounded)
        } else if (path.includes('conscious-pause')) {
            targetFreq = 144; // Merges exactly into the drone
        } else if (path.includes('crossover') || path.includes('capstones')) {
            targetFreq = 576; // Double octave (Synthesis/Overview)
        }

        // Smoothly glide to the new resonance register over 1.618s
        this.hoverChime.frequency.rampTo(targetFreq, 1.618);
    }

    bindGlobalSonics() {
        if (!this.toneReady) return;
        if (this.delegationBound) return; // Only process once globally!

        const INTERACTIVES = 'a, button, input, select, [role="button"], .explorer-card, .equation-block, .cycler-btn, .audio-trigger, .control-btn, .lens-select, .resonance-link';

        // Global Event Delegation natively supports PJAX page swaps
        document.body.addEventListener('mouseover', (e) => {
            if (e.target.closest(INTERACTIVES)) {
                const currentFreq = this.hoverChime ? this.hoverChime.frequency.value : 288;
                if (this.hoverChime) this.hoverChime.triggerAttackRelease(currentFreq, "4n");
                if (this.globalFilterLFO) this.globalFilterLFO.max = 500;
                if (this.globalDrone) this.globalDrone.volume.rampTo(-30, 0.5);
            }
        });

        document.body.addEventListener('mouseout', (e) => {
            if (e.target.closest(INTERACTIVES)) {
                if (this.globalFilterLFO) this.globalFilterLFO.max = 300;
                if (this.globalDrone) this.globalDrone.volume.rampTo(-34, 2);
            }
        });

        document.body.addEventListener('mousedown', (e) => {
            if (e.target.closest(INTERACTIVES)) {
                if (this.navPing) this.navPing.triggerAttackRelease("C2", "8n");
                if (this.globalFilter) {
                    this.globalFilter.frequency.rampTo(800, 0.1);
                    setTimeout(() => this.globalFilter.frequency.rampTo(200, 2), 100);
                }
            }
        });

        let sliderActive = false;
        let sliderTimeout;

        // Dynamically bind to ALL functional sliders across the HIA
        document.body.addEventListener('input', (e) => {
            if (e.target.matches('input[type="range"]')) {
                if (!this.sliderSweepSynth) return;

                const min = parseFloat(e.target.min) || 0;
                const max = parseFloat(e.target.max) || 100;
                const val = parseFloat(e.target.value) || 0;
                let percent = (val - min) / (max - min);
                if (isNaN(percent)) percent = 0.5;

                // Map 0-1 spatially across the double harmonic octave (144Hz - 576Hz)
                const hz = 144 + (percent * (576 - 144));

                // Smoothly modulate pitch as the slider is dragged
                this.sliderSweepSynth.frequency.rampTo(hz, 0.05);

                if (!sliderActive) {
                    sliderActive = true;
                    this.sliderSweepSynth.triggerAttack(hz);
                    this.sliderSweepSynth.volume.rampTo(-26, 0.1);
                }

                // Debounce the release
                clearTimeout(sliderTimeout);
                sliderTimeout = setTimeout(() => {
                    this.sliderSweepSynth.volume.rampTo(-Infinity, 0.3);
                    setTimeout(() => {
                        if (!sliderActive) this.sliderSweepSynth.triggerRelease();
                    }, 300);
                    sliderActive = false;
                }, 150);
            }
        });

        this.delegationBound = true;
    }

    // ── CONSCIOUS PAUSE OVERLAY ──────────────────────────────────────────────
    showConsciousPause() {
        if (document.getElementById('conscious-pause-overlay')) return;

        if (!document.getElementById('conscious-pause-style')) {
            const style = document.createElement('style');
            style.id = 'conscious-pause-style';
            style.textContent = `
                #conscious-pause-overlay {
                    position: fixed; inset: 0;
                    z-index: 99990;
                    display: flex; align-items: center; justify-content: center;
                    background: rgba(13, 9, 7, 0);
                    pointer-events: none;
                    transition: background 0.6s ease-out;
                }
                #conscious-pause-overlay.visible {
                    background: rgba(13, 9, 7, 0.55);
                }
                .pause-ring {
                    position: absolute;
                    width: 120px; height: 120px;
                    border-radius: 50%;
                    border: 1px solid rgba(196, 140, 80, 0.25);
                    animation: pauseBreath 2s ease-in-out infinite;
                }
                .pause-ring-outer {
                    width: 180px; height: 180px;
                    border-color: rgba(196, 98, 45, 0.12);
                    animation-delay: 0.4s;
                }
                .pause-text {
                    font-family: 'Inter', 'Helvetica Neue', sans-serif;
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: 0.38em;
                    text-transform: uppercase;
                    color: rgba(196, 140, 80, 0);
                    transition: color 0.8s ease-out 0.3s;
                    position: relative; z-index: 1;
                }
                #conscious-pause-overlay.visible .pause-text {
                    color: rgba(196, 140, 80, 0.65);
                }
                @keyframes pauseBreath {
                    0%   { transform: scale(0.88); opacity: 0.3; }
                    50%  { transform: scale(1.12); opacity: 0.85; }
                    100% { transform: scale(0.88); opacity: 0.3; }
                }
            `;
            document.head.appendChild(style);
        }

        const overlay = document.createElement('div');
        overlay.id = 'conscious-pause-overlay';

        const ring = document.createElement('div');
        ring.className = 'pause-ring';

        const ringOuter = document.createElement('div');
        ringOuter.className = 'pause-ring pause-ring-outer';

        const text = document.createElement('div');
        text.className = 'pause-text';
        text.textContent = '[ Tuning Resonance ]';

        overlay.appendChild(ring);
        overlay.appendChild(ringOuter);
        overlay.appendChild(text);
        document.body.appendChild(overlay);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => overlay.classList.add('visible'));
        });
    }

    hideConsciousPause() {
        const overlay = document.getElementById('conscious-pause-overlay');
        if (!overlay) return;
        overlay.classList.remove('visible');
        setTimeout(() => overlay.remove(), 700);
    }

    initPjax() {
        this.transitioning = false;

        // Intercept clicks on internal links
        document.addEventListener("click", (e) => {
            const link = e.target.closest("a");
            if (!link || !link.href) return;

            // Allow external links, mailto, etc.
            if (link.href.startsWith("mailto:") || link.href.startsWith("tel:") || link.target === "_blank") return;

            const url = new URL(link.href);

            // Only intercept same-origin navigation
            if (url.origin === window.location.origin) {
                const normTarget = url.pathname.toLowerCase().replace(/\.html$/, '').replace(/\/$/, '');
                const normCurrent = window.location.pathname.toLowerCase().replace(/\.html$/, '').replace(/\/$/, '');

                if (normTarget === normCurrent) {
                    if (url.hash) {
                        const target = document.getElementById(url.hash.slice(1));
                        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    } else {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                    e.preventDefault();
                    return;
                }

                e.preventDefault();
                this.navigateTo(url.href);
            }
        });

        // ── PRE-COGNITIVE MYCELIAL PJAX HOVER PRE-FETCH & SONIC AURA ──
        const handleHover = async (e) => {
            const link = e.target.closest("a");
            if (!link || !link.href) return;
            if (link.href.startsWith("mailto:") || link.href.startsWith("tel:") || link.target === "_blank") return;

            const url = new URL(link.href);
            if (url.origin !== window.location.origin) return;

            const normTarget = url.pathname.toLowerCase().replace(/\.html$/, '').replace(/\/$/, '');
            const normCurrent = window.location.pathname.toLowerCase().replace(/\.html$/, '').replace(/\/$/, '');
            if (normTarget === normCurrent) return;

            const href = url.href;

            // 1. Asynchronous pre-fetch into this.cache
            if (!this.cache.has(href)) {
                try {
                    let fetchUrl = href;
                    const parsed = new URL(href);
                    if (!parsed.pathname.match(/\.[a-zA-Z0-9]+$/) && !parsed.pathname.endsWith('/')) {
                        // Map clean URL to physical .html file for simple local dev server compatibility
                        fetchUrl = `${parsed.origin}${parsed.pathname}.html${parsed.search}${parsed.hash}`;
                    }
                    fetch(fetchUrl).then(response => {
                        if (response.ok) return response.text();
                    }).then(html => {
                        if (html) {
                            this.cache.set(href, html);
                            console.log(`:: Pre-cognitive pre-fetch cached: ${url.pathname}`);
                        }
                    }).catch(() => {});
                } catch(err){}
            }

            // 2. Pre-resonance Sonic Aura
            if (this.hoverChime && this.toneReady) {
                const path = url.pathname.toLowerCase();
                let targetFreq = 288;
                const phi = 1.61803398875;
                if (path.includes('phase-state')) {
                    targetFreq = 216;
                } else if (path.includes('resonance-library')) {
                    targetFreq = 432;
                } else if (path.includes('dodecahedron')) {
                    targetFreq = 360;
                } else if (path.includes('phi-explorer')) {
                    targetFreq = 144 * phi;
                } else if (path.includes('stoneware-builder')) {
                    targetFreq = 180;
                } else if (path.includes('conscious-pause')) {
                    targetFreq = 144;
                } else if (path.includes('crossover') || path.includes('capstones')) {
                    targetFreq = 576;
                }

                // Microtonal envelope glide over exactly 1.618 seconds
                this.hoverChime.frequency.rampTo(targetFreq, 1.618);
            }
        };

        document.body.addEventListener('mouseenter', handleHover, { capture: true });
        document.body.addEventListener('touchstart', handleHover, { capture: true, passive: true });

        // Handle back/forward buttons
        window.addEventListener("popstate", (e) => {
            this.navigateTo(window.location.href, true);
        });
    }

    async navigateTo(url, isPopState = false) {
        if (this.transitioning) return;
        this.transitioning = true;

        // Instant stillness cleanup to release any capturing event listeners
        this.cleanupStillness();

        // Show breathing overlay
        this.showConsciousPause();

        // Swell the drone into the silence
        if (this.globalDrone) this.globalDrone.volume.rampTo(-28, 1);

        // Fade current page content
        document.body.style.transition = 'opacity 0.7s ease-out';
        document.body.style.opacity = '0';

        try {
            const results = await Promise.all([
                (async () => {
                    if (this.cache.has(url)) return this.cache.get(url);
                    
                    let fetchUrl = url;
                    const parsed = new URL(url);
                    if (!parsed.pathname.match(/\.[a-zA-Z0-9]+$/) && !parsed.pathname.endsWith('/')) {
                        // Map clean URL to physical .html file for simple local dev server compatibility
                        fetchUrl = `${parsed.origin}${parsed.pathname}.html${parsed.search}${parsed.hash}`;
                    }

                    const response = await fetch(fetchUrl);
                    if (!response.ok) throw new Error(`HTTP ${response.status}`);
                    const text = await response.text();
                    this.cache.set(url, text);
                    return text;
                })(),
                new Promise(resolve => setTimeout(resolve, 1750))
            ]);

            const html = results[0];

            if (!isPopState) {
                window.history.pushState(null, "", url);
            }

            await this.injectNewPage(html);

        } catch (err) {
            console.error("PJAX Error:", err);
            this.hideConsciousPause();
            this.transitioning = false;
            window.location.href = url;
        }
    }

    async injectNewPage(html) {
        // Invoke global page-unload lifecycle hook if registered to clean up WebGL or Tone.js loops
        if (typeof window.hdmPageUnload === 'function') {
            try {
                console.log(":: Ecosystem App :: Triggering global page unload teardown hook.");
                window.hdmPageUnload();
            } catch (e) {
                console.warn(":: Ecosystem App :: Error invoking hdmPageUnload teardown:", e);
            }
            window.hdmPageUnload = null;
        }

        // 1. Clean up active Lenis smooth scroll first to filter out its listeners naturally
        if (window.lenis) {
            try {
                window.lenis.destroy();
            } catch (e) {
                console.warn(":: Ecosystem App :: Error destroying Lenis:", e);
            }
            window.lenis = null;
        }

        // 2. Clean up transient event listeners registered by the previous page
        if (window._hdmTransientListeners && window._hdmTransientListeners.length > 0) {
            console.log(`:: Ecosystem App :: Purging ${window._hdmTransientListeners.length} transient event listeners.`);
            const listenersToPurge = [...window._hdmTransientListeners];
            
            // Temporarily pause tracking and clear list to avoid filtering overhead during removal
            window._hdmTrackingTransient = false;
            window._hdmTransientListeners = [];

            const originalRemove = window._originalRemoveEventListener || EventTarget.prototype.removeEventListener;
            listenersToPurge.forEach(({ target, type, listener, options }) => {
                try {
                    // Try with exact options
                    originalRemove.call(target, type, listener, options);
                    
                    // Aggressively try standard variations to ensure clean unbinding
                    originalRemove.call(target, type, listener, true);
                    originalRemove.call(target, type, listener, false);
                    originalRemove.call(target, type, listener, { capture: true });
                    originalRemove.call(target, type, listener, { capture: false });
                } catch (e) {
                    console.warn(":: Ecosystem App :: Error removing transient listener:", e);
                }
            });

            // Resume tracking
            window._hdmTrackingTransient = true;
        }


        // Parse HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Sync head styles and scripts
        const headNodes = Array.from(doc.head.children);

        Array.from(document.head.querySelectorAll('style, link[rel="stylesheet"]')).forEach(el => {
            if (el.id === 'ping-radar-style' || el.id === 'magnetic-personalities-global') return;
            if (el.href && el.href.includes("fonts")) return;
            el.remove();
        });

        headNodes.forEach(node => {
            if (node.tagName === 'STYLE' || (node.tagName === 'LINK' && node.rel === 'stylesheet')) {
                if (node.href && node.href.includes("fonts")) return;
                if (node.id === 'magnetic-personalities-global') return;
                document.head.appendChild(node.cloneNode(true));
            }
        });

        // Load external head scripts in order
        const headScripts = headNodes.filter(n => n.tagName === 'SCRIPT' && n.src);
        await Promise.all(headScripts.map(scriptNode => {
            const alreadyLoaded = Array.from(document.querySelectorAll('script[src]'))
                .some(el => el.src === scriptNode.src);
            if (alreadyLoaded) return Promise.resolve();
            return new Promise(resolve => {
                const s = document.createElement('script');
                s.src = scriptNode.src;
                s.onload = resolve;
                s.onerror = resolve;
                document.head.appendChild(s);
            });
        }));

        document.title = doc.title;
        document.body.className = doc.body.className;
        
        // Synced doc body/html classes, explicitly clearing Lenis locks
        document.documentElement.className = doc.documentElement.className || '';
        document.documentElement.style.cssText = doc.documentElement.style.cssText || '';
        
        document.body.classList.remove('lenis', 'lenis-stopped', 'lenis-scrolling');
        document.documentElement.classList.remove('lenis', 'lenis-stopped', 'lenis-scrolling');

        this.applyActiveMagnet();
        if (doc.body.id) document.body.id = doc.body.id;
        else document.body.removeAttribute('id');

        // Reset inline styles and structural locks
        document.body.style.backgroundColor = '';
        document.body.style.color = '';
        document.body.style.backgroundImage = '';
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        document.body.style.overflowY = '';
        document.documentElement.style.overflowY = '';
        document.body.style.height = '';
        document.documentElement.style.height = '';
        document.body.style.position = '';
        document.documentElement.style.position = '';
        document.body.style.touchAction = '';
        document.documentElement.style.touchAction = '';
        document.body.style.overscrollBehavior = '';
        document.documentElement.style.overscrollBehavior = '';

        document.body.innerHTML = doc.body.innerHTML;

        // Re-inject MåGNET DOM structures & re-initialize event loops
        this.initMagnetPortal();

        // Re-inject Ping Radar
        this.createPingRadar();

        // Re-execute body scripts
        const scripts = Array.from(document.body.querySelectorAll("script"));
        scripts.forEach(s => s.parentNode && s.parentNode.removeChild(s));

        for (const oldScript of scripts) {
            const newScript = document.createElement("script");
            if (oldScript.src) {
                const alreadyLoaded = Array.from(document.querySelectorAll('script[src]'))
                    .some(el => el.src === oldScript.src);
                if (!alreadyLoaded) {
                    await new Promise(resolve => {
                        newScript.src = oldScript.src;
                        newScript.onload = resolve;
                        newScript.onerror = resolve;
                        document.body.appendChild(newScript);
                    });
                }
            } else {
                // Skip any inline script containing document.write, as executing it on a parsed document
                // will clear/wipeout the document and result in a blank screen.
                if (oldScript.textContent.includes("document.write")) {
                    console.log(":: Ecosystem App :: Skipping inline script containing document.write to prevent document wipeout during PJAX navigation.");
                    continue;
                }
                newScript.textContent = oldScript.textContent;
                document.body.appendChild(newScript);
            }
        }

        // Restore scroll position
        const urlHash = window.location.hash;
        if (urlHash) {
            const target = document.getElementById(urlHash.slice(1));
            if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 350);
            else window.scrollTo(0, 0);
        } else {
            window.scrollTo(0, 0);
        }

        this.hideConsciousPause();

        setTimeout(() => {
            document.body.classList.add('is-loaded');
            document.body.style.transition = 'opacity 1s ease-in';
            document.body.style.opacity = '1';
            if (this.globalDrone) this.globalDrone.volume.rampTo(-34, 2);
            setTimeout(() => { this.transitioning = false; }, 1000);
        }, 100);

        document.dispatchEvent(new Event("hdm:page-loaded"));
        this.tuneAcousticChamber();

        if (window.HonestFramingSystem && this.supabase) {
            window.HonestFramingSystem.initialize(this.supabase);
            window.HonestFramingSystem.scanAndBind();
        }
    }

    createPingRadar() {
        if (document.getElementById('global-ping-radar')) return;

        const radar = document.createElement('div');
        radar.id = 'global-ping-radar';
        radar.title = 'PING Radar actively resonating';
        radar.style.position = 'fixed';
        radar.style.bottom = '30px';
        radar.style.left = '30px';
        radar.style.width = '8px';
        radar.style.height = '8px';
        radar.style.borderRadius = '50%';
        radar.style.backgroundColor = 'var(--terra, #c4622d)';
        radar.style.boxShadow = '0 0 10px rgba(196, 98, 45, 0.6)';
        radar.style.zIndex = '99999';
        radar.style.pointerEvents = 'none';

        if (!document.getElementById('ping-radar-style')) {
            const style = document.createElement('style');
            style.id = 'ping-radar-style';
            style.textContent = `
                @keyframes pingPulse {
                    0%   { transform: scale(0.8); opacity: 0.4; box-shadow: 0 0 0px var(--terra, #c4622d); }
                    50%  { transform: scale(1.2); opacity: 1; box-shadow: 0 0 16px var(--gold, #c48c50); background-color: var(--gold, #c48c50); }
                    100% { transform: scale(0.8); opacity: 0.4; box-shadow: 0 0 0px var(--terra, #c4622d); }
                }
                #global-ping-radar {
                    animation: pingPulse 4.5s infinite ease-in-out;
                }
                #global-ping-radar::after {
                    content: '';
                    position: absolute;
                    top: -150%; left: -150%; right: -150%; bottom: -150%;
                    border: 1px solid var(--terra, #c4622d);
                    border-radius: 50%;
                    animation: pingRadiate 4.5s infinite ease-out;
                    opacity: 0;
                }
                @keyframes pingRadiate {
                    0%   { transform: scale(0.5); opacity: 0; }
                    50%  { opacity: 0.25; }
                    100% { transform: scale(1.8); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(radar);
    }

    applyActiveMagnet() {
        const activeMagnet = localStorage.getItem('active_magnet');
        const isScholar = localStorage.getItem('scholar_authenticated') === 'true';
        
        window._scholarAuthenticated = isScholar;

        document.body.classList.remove('magnet-1-ellian', 'magnet-2-curator', 'magnet-3-gleam', 'magnet-resonance-established');

        if (activeMagnet && activeMagnet !== 'default') {
            document.body.classList.add('magnet-resonance-established');
            if (activeMagnet === 'ellian')  document.body.classList.add('magnet-1-ellian');
            if (activeMagnet === 'curator') document.body.classList.add('magnet-2-curator');
            if (activeMagnet === 'gleam')   document.body.classList.add('magnet-3-gleam');
        }
    }

    // ── CENTRALIZED 360-DEGREE STILLNESS ENGINE (TEA ON THE MOON) ──
    async initiateStillness() {
        if (this.stillnessActive) return;
        this.stillnessActive = true;
        this.stillnessCanExit = false;

        await this.ensureAudioReady();

        document.body.classList.add('stillness-active');

        // Play FM drone foundation
        if (window.Tone) {
            try {
                const phi = 1.61803398875;
                this.stillnessDrone = new Tone.FMSynth({
                    harmonicity: phi,
                    modulationIndex: phi * phi,
                    oscillator: { type: "sine" },
                    modulation: { type: "sine" },
                    envelope: { 
                        attack: 0.1618, 
                        decay: 0.618, 
                        sustain: 0.382, 
                        release: 1.618 
                    }
                }).toDestination();
                this.stillnessDrone.volume.value = -12;
                this.stillnessDrone.triggerAttack("E2");
            } catch (e) {
                console.warn(":: Stillness Drone Audio not initialized:", e);
            }
        }

        let count = 60;
        const cdEl = document.getElementById('stillnessTracker');
        if (cdEl) cdEl.innerText = "TEA ON THE MOON :: 60";

        let hintEl = document.getElementById('stillness-abort-hint');
        if (!hintEl) {
            hintEl = document.createElement('div');
            hintEl.id = 'stillness-abort-hint';
            hintEl.innerText = "⟨ TAP ANYWHERE OR PRESS ESC TO RETURN ⟩";
            document.body.appendChild(hintEl);
        }

        hintEl.style.cssText += '; opacity: 0 !important;';

        this.stillnessHintTimeout = setTimeout(() => {
            if (hintEl) {
                hintEl.style.cssText += '; opacity: 0.55 !important;';
            }
        }, 2000);

        this.stillnessExitTimeout = setTimeout(() => {
            this.stillnessCanExit = true;
        }, 500);

        const abortStillness = (e) => {
            if (!this.stillnessCanExit) return;
            if (e.type === 'keydown' && e.key !== 'Escape') return;

            e.preventDefault();
            e.stopPropagation();
            this.cleanupStillness();
        };

        this.stillnessAbortListeners = {
            click: abortStillness,
            touchstart: abortStillness,
            keydown: abortStillness
        };

        window.addEventListener('click', abortStillness, { capture: true });
        window.addEventListener('touchstart', abortStillness, { capture: true, passive: false });
        window.addEventListener('keydown', abortStillness, { capture: true });

        this.stillnessInterval = setInterval(() => {
            count--;
            if (cdEl) cdEl.innerText = "TEA ON THE MOON :: " + count;
            if (count <= 0) {
                this.cleanupStillness();
            }
        }, 1000);
    }

    cleanupStillness() {
        document.body.classList.remove('stillness-active');
        const hintEl = document.getElementById('stillness-abort-hint');
        if (hintEl && hintEl.parentNode) {
            hintEl.parentNode.removeChild(hintEl);
        }
        if (!this.stillnessActive) return;

        clearInterval(this.stillnessInterval);
        clearTimeout(this.stillnessHintTimeout);
        clearTimeout(this.stillnessExitTimeout);
        this.stillnessInterval = null;
        this.stillnessHintTimeout = null;
        this.stillnessExitTimeout = null;

        document.body.classList.remove('stillness-active');

        if (this.stillnessDrone) {
            try {
                this.stillnessDrone.triggerRelease();
                const drone = this.stillnessDrone;
                setTimeout(() => {
                    try { drone.dispose(); } catch (err){}
                }, 8000);
            } catch (e) {
                console.warn("Drone disposal bypassed:", e);
            }
            this.stillnessDrone = null;
        }

        const activeHint = document.getElementById('stillness-abort-hint');
        if (activeHint) {
            activeHint.style.cssText += '; opacity: 0 !important;';
            setTimeout(() => {
                if (activeHint.parentNode) activeHint.parentNode.removeChild(activeHint);
            }, 1500);
        }

        if (this.stillnessAbortListeners) {
            window.removeEventListener('click', this.stillnessAbortListeners.click, { capture: true });
            window.removeEventListener('touchstart', this.stillnessAbortListeners.touchstart, { capture: true });
            window.removeEventListener('keydown', this.stillnessAbortListeners.keydown, { capture: true });
            this.stillnessAbortListeners = null;
        }

        this.stillnessActive = false;
        this.stillnessCanExit = false;
        console.log(":: Stillness state cleared and returned to pattern");
    }

    injectMagnetStyles() {
        if (document.getElementById('magnetic-personalities-global')) return;

        const style = document.createElement('style');
        style.id = 'magnetic-personalities-global';
        style.textContent = `
    /* --- THE ARTIFACT FORGE (MåGNETIC ATTRACTION) --- */
    #artifact-dropzone {
      position: fixed;
      inset: 0;
      z-index: 99999;
      background: rgba(10, 8, 7, 0.95);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transition: opacity 0.5s ease, visibility 0.5s ease;
    }

    #artifact-dropzone.dragging,
    #artifact-dropzone.activating {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }

    .artifact-crucible {
      width: 320px;
      height: 320px;
      border-radius: 50%;
      border: 2px dashed rgba(196, 98, 45, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
    }

    #artifact-dropzone.dragging .artifact-crucible {
      transform: scale(1.05);
      border-color: var(--gold, #C48C50);
      box-shadow: 0 0 60px rgba(196, 98, 45, 0.2);
    }

    #artifact-dropzone.activating .artifact-crucible {
      border: 2px solid var(--terra, #C4622D);
      transform: scale(0.9);
      background: rgba(196, 98, 45, 0.1);
      animation: artifactPulse 1.5s infinite;
    }

    .artifact-text {
      font-family: var(--font-display);
      font-size: 24px;
      color: var(--gold, #C48C50);
      text-align: center;
      position: absolute;
      width: 100%;
    }

    .artifact-subtext {
      font-family: var(--font-body);
      font-size: 11px;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: var(--ink-light, #8A7D71);
      margin-top: 140px;
      text-align: center;
    }

    @keyframes artifactPulse {
      0% {
        box-shadow: 0 0 0 0 rgba(196, 98, 45, 0.6);
      }
      70% {
        box-shadow: 0 0 0 80px rgba(196, 98, 45, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(196, 98, 45, 0);
      }
    }

    /* Hide dropzone after resonance established */
    body.magnet-resonance-established #artifact-dropzone {
      opacity: 0 !important;
      pointer-events: none !important;
      z-index: -1 !important;
      transition: opacity 0.6s ease, z-index 0s ease 0.6s;
    }

    body.magnet-resonance-established #artifact-dropzone.dragging,
    body.magnet-resonance-established #artifact-dropzone.activating {
      opacity: 1 !important;
      pointer-events: auto !important;
      z-index: 99999 !important;
    }

    /* --- MåGNETIC RESONANCE FIELDS --- */
    @keyframes dormantPulse {
      0%, 100% {
        opacity: 0.35;
        filter: grayscale(100%) brightness(0.95);
        box-shadow: 0 0 0 0 rgba(196, 140, 80, 0);
      }
      50% {
        opacity: 0.55;
        filter: grayscale(90%) brightness(1.05);
        box-shadow: 0 0 12px rgba(196, 140, 80, 0.15);
      }
    }

    .dormant-field {
      position: relative;
      opacity: 0.4;
      filter: grayscale(100%);
      pointer-events: auto;
      transition: all 1.2s ease;
      cursor: pointer;
      animation: dormantPulse 4s ease-in-out infinite;
    }

    .dormant-field:hover {
      animation: dormantPulse 2.5s ease-in-out infinite;
      filter: grayscale(50%) brightness(1.1) !important;
    }

    .dormant-field::after {
      content: 'AWAITING MåGNET';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 10px;
      letter-spacing: 0.4em;
      color: var(--charcoal, #1C1613);
      background: var(--sand, #F0E6D2);
      padding: 6px 12px;
      font-weight: 700;
      z-index: 2;
    }

    body.magnet-resonance-established .dormant-field {
      opacity: 1;
      filter: grayscale(0%);
      pointer-events: auto;
    }

    body.magnet-resonance-established .dormant-field::after {
      display: none;
    }

    body.magnet-resonance-established .dormant-field::before {
      content: '';
      position: absolute;
      inset: -4px;
      border: 1px solid var(--gold, #C48C50);
      z-index: -1;
      animation: gateGlow 3s infinite;
    }

    @keyframes gateGlow {
      0%   { opacity: 0.3; box-shadow: 0 0 0 rgba(196, 140, 80, 0); }
      50%  { opacity: 1.0; box-shadow: 0 0 18px rgba(196, 140, 80, 0.25); }
      100% { opacity: 0.3; box-shadow: 0 0 0 rgba(196, 140, 80, 0); }
    }

    /* --- LEGENDARY ALGORAVE & TOOLTIP --- */
    #algorave-flash {
      position: fixed;
      inset: 0;
      background: #fff;
      z-index: 100000;
      opacity: 0;
      pointer-events: none;
      mix-blend-mode: overlay;
    }

    #magnet-resonance-tooltip {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(13, 9, 7, 0.98);
      border: 1px solid var(--terra, #C4622D);
      padding: 40px;
      width: 500px;
      max-width: 90%;
      z-index: 100001;
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      backdrop-filter: blur(15px);
      -webkit-backdrop-filter: blur(15px);
      transition: opacity 0.6s ease, visibility 0.6s ease;
      display: flex;
      flex-direction: column;
      box-shadow: 0 40px 100px rgba(0, 0, 0, 0.8);
    }

    #magnet-resonance-tooltip.visible {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }

    .tt-header {
      font-family: var(--font-display);
      font-size: 32px;
      color: var(--gold, #C48C50);
      margin-bottom: 20px;
    }

    .tt-body {
      font-family: var(--font-body);
      font-size: 15px;
      color: var(--ink-light, #8A7D71);
      line-height: 1.8;
      margin-bottom: 24px;
    }

    .tt-button {
      background: transparent;
      border: 1px solid var(--terra, #C4622D);
      color: var(--sand, #F0E6D2);
      padding: 12px 24px;
      font-size: 11px;
      letter-spacing: 0.2em;
      cursor: pointer;
      transition: all 0.2s;
      align-self: center;
      text-transform: uppercase;
    }

    .tt-button:hover {
      background: var(--terra, #C4622D);
      color: #fff;
    }

    /* ── MåGNET ACTIVE HUD :: Floating Status Indicator ── */
    #magnet-active-hud {
      position: fixed;
      top: 76px;
      right: 24px; /* Dropped below the top right controls to prevent overlap */
      left: auto !important; /* Force override top-left alignment */
      z-index: 10001; /* Match or sit safely with stillness node */
      display: none;
      align-items: center;
      gap: 10px;
      padding: 10px 18px;
      background: rgba(10, 8, 6, 0.7);
      backdrop-filter: blur(12px) saturate(180%);
      -webkit-backdrop-filter: blur(12px) saturate(180%);
      border: 1px solid rgba(196, 140, 80, 0.2);
      border-radius: 30px;
      cursor: pointer;
      color: var(--sand, #F0E6D2);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
      user-select: none;
    }

    body:has(.breadcrumb-nav) #magnet-active-hud,
    body:has(.top-nav) #magnet-active-hud,
    body:has(.nav-top) #magnet-active-hud {
      top: 76px !important;
      right: 24px !important;
      left: auto !important;
    }


    #magnet-active-hud:hover {
      background: rgba(196, 140, 80, 0.12);
      border-color: var(--gold, #C48C50);
      box-shadow: 0 0 16px rgba(196, 140, 80, 0.35);
      transform: translateY(-1px) scale(1.03);
    }

    #magnet-active-hud:active {
      transform: translateY(1px) scale(0.98);
    }

    #magnet-active-hud .hud-sigil {
      font-size: 1.3rem;
      line-height: 1;
      display: inline-block;
      transition: transform 0.3s ease;
    }

    #magnet-active-hud:hover .hud-sigil {
      transform: rotate(15deg);
    }

    #magnet-active-hud .hud-name {
      font-family: var(--font-display);
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--sand, #F0E6D2);
      opacity: 0.95;
    }

    #magnet-active-hud .hud-arrow {
      font-size: 8px;
      opacity: 0.5;
      transition: transform 0.3s ease;
    }

    #magnet-active-hud:hover .hud-arrow {
      opacity: 1;
      transform: translateX(2px);
    }

    /* In resonance, display the HUD! */
    body.magnet-resonance-established #magnet-active-hud {
      display: flex !important;
    }

    /* Distinct glow outlines depending on active magnet */
    body.magnet-1-ellian #magnet-active-hud {
      border-color: rgba(196, 98, 45, 0.4);
      box-shadow: 0 4px 20px rgba(196, 98, 45, 0.15);
    }
    body.magnet-1-ellian #magnet-active-hud:hover {
      box-shadow: 0 0 20px rgba(196, 98, 45, 0.45);
      border-color: var(--terra, #C4622D);
    }

    body.magnet-2-curator #magnet-active-hud {
      border-color: rgba(196, 140, 80, 0.4);
      box-shadow: 0 4px 20px rgba(196, 140, 80, 0.15);
    }
    body.magnet-2-curator #magnet-active-hud:hover {
      box-shadow: 0 0 20px rgba(196, 140, 80, 0.45);
      border-color: var(--gold, #C48C50);
    }

    body.magnet-3-gleam #magnet-active-hud {
      border-color: rgba(200, 200, 255, 0.3);
      box-shadow: 0 4px 20px rgba(200, 200, 255, 0.15);
    }
    body.magnet-3-gleam #magnet-active-hud:hover {
      box-shadow: 0 0 20px rgba(200, 200, 255, 0.45);
      border-color: #E6E6FA;
    }

    /* ── MåGNET SELECTOR :: Mobile Touch Pathway ── */
    #magnet-selector {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(10, 8, 6, 0.98);
      border-top: 1px solid rgba(196, 98, 45, 0.4);
      padding: 16px 20px env(safe-area-inset-bottom, 32px);
      z-index: 100002;
      transform: translateY(100%);
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      max-height: 90vh;
      overflow-y: auto;
      touch-action: pan-y;
      overscroll-behavior: contain;
      pointer-events: none;
    }

    #magnet-selector.open {
      transform: translateY(0);
      pointer-events: auto;
    }

    .ms-handle {
      width: 36px;
      height: 4px;
      background: rgba(196, 140, 80, 0.25);
      border-radius: 2px;
      margin: 0 auto 20px;
    }

    .ms-eyebrow {
      font-size: 10px;
      letter-spacing: 0.4em;
      text-transform: uppercase;
      color: var(--gold, #C48C50);
      text-align: center;
      margin-bottom: 20px;
      font-family: var(--font-body);
    }

    .ms-cards {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 4px;
    }

    .ms-card {
      background: var(--charcoal-light, #1C1613);
      border: 1px solid rgba(196, 140, 80, 0.2);
      border-radius: 4px;
      padding: 18px 20px;
      text-align: left;
      cursor: pointer;
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
      transition: border-color 0.25s ease, background 0.25s ease;
      display: flex;
      align-items: center;
      gap: 16px;
      width: 100%;
      box-sizing: border-box;
      min-height: 72px;
      font-family: var(--font-body);
    }

    .ms-card:active,
    .ms-card:focus {
      background: rgba(196, 98, 45, 0.08);
      border-color: var(--terra, #C4622D);
      outline: none;
    }

    .ms-sigil {
      font-size: 26px;
      line-height: 1;
      color: var(--gold, #C48C50);
      opacity: 0.65;
      flex-shrink: 0;
      width: 32px;
      text-align: center;
      font-style: normal;
    }

    .ms-info {
      flex: 1;
    }

    .ms-name {
      font-family: var(--font-display);
      font-size: 19px;
      color: var(--sand, #F0E6D2);
      margin-bottom: 5px;
      line-height: 1.15;
    }

    .ms-desc {
      font-size: 10px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--ink-light, #8A7D71);
      line-height: 1.5;
    }

    .ms-type {
      font-size: 8px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--ink-light, #8A7D71);
      opacity: 0.7;
      margin-top: 8px;
      font-style: italic;
    }

    /* Redesigned Luminescent Close Indicator */
    .ms-close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, hsl(36, 75%, 55%), hsl(19, 75%, 40%));
      border: 1px solid rgba(255, 215, 0, 0.5);
      box-shadow: 0 0 15px rgba(196, 98, 45, 0.6), inset 0 0 10px rgba(255, 255, 255, 0.25);
      color: #fff !important;
      font-size: 22px;
      font-weight: bold;
      cursor: pointer;
      margin: 20px auto 10px;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      box-sizing: border-box;
      text-align: center;
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
      animation: bounceClose 1.618s infinite ease-in-out;
    }

    .ms-close:hover {
      transform: scale(1.15);
      box-shadow: 0 0 25px rgba(255, 215, 0, 0.8), inset 0 0 12px rgba(255, 255, 255, 0.4);
      background: radial-gradient(circle at 35% 35%, hsl(36, 85%, 60%), hsl(19, 85%, 45%));
    }

    @keyframes bounceClose {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-8px);
      }
    }

    /* Subtle long-press hint on mobile — only on true touch devices */
    @media (hover: none) and (pointer: coarse) {
      .stillness-node::after {
        content: 'hold';
        display: block;
        font-size: 6px;
        letter-spacing: 0.28em;
        color: rgba(196, 140, 80, 0.2);
        text-transform: uppercase;
        margin-top: 3px;
        font-family: var(--font-body);
        line-height: 1;
      }
    }

    /* ── Hub Specific Override Styles (Grafted from static index.html) ── */
    body.magnet-1-ellian .hub-title, body.magnet-1-ellian .hub-card-title {
      color: var(--gold) !important;
      text-shadow: 0 0 14px rgba(196,140,80, 0.5);
    }
    body.magnet-1-ellian .hub-card {
      border-color: rgba(196, 140, 80, 0.3) !important;
      transition: all 0.6s ease;
    }
    #magnet-lantern-overlay {
      position: fixed;
      inset: 0;
      z-index: 9999;
      pointer-events: none !important;
      background: radial-gradient(circle 450px at var(--mouse-x, 50vw) var(--mouse-y, 50vh), 
                    rgba(224, 153, 36, 0.18) 0%, 
                    rgba(196, 98, 45, 0.05) 50%, 
                    rgba(0, 0, 0, 0) 100%);
      mix-blend-mode: screen;
      transition: opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1);
      opacity: 0;
    }
    body.magnet-1-ellian #magnet-lantern-overlay {
      opacity: 1;
    }

    body.magnet-2-curator {
      background-image: linear-gradient(rgba(196, 140, 80, 0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(196, 140, 80, 0.08) 1px, transparent 1px);
      background-size: 40px 40px;
    }
    body.magnet-2-curator #instruments {
      border: 1px solid rgba(196, 140, 80, 0.3);
      padding: 2px;
    }
    body.magnet-2-curator .hub-card {
      border: 1px solid rgba(196, 140, 80, 0.5) !important;
      border-radius: 0 !important;
      background: rgba(10, 8, 7, 0.9) !important;
      margin: 1px;
    }

    body.magnet-3-gleam .hub-card {
      background: rgba(200, 200, 255, 0.03) !important;
      border-color: rgba(200, 200, 255, 0.1) !important;
      backdrop-filter: blur(12px) !important;
    }
    body.magnet-3-gleam .hub-title {
      color: #E6E6FA !important;
      filter: drop-shadow(0 0 12px rgba(230,230,250,0.6));
    }

    /* ── MåGNETVERSE PREMIUM CORNER OVERRIDES & BREATHING ROOM ── */
    .sound-toggle {
      bottom: 36px !important;
      left: 36px !important;
      width: 46px !important;
      height: 46px !important;
      background: rgba(18, 12, 9, 0.85) !important;
      border: 1px solid rgba(196, 140, 80, 0.35) !important;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5), 0 0 12px rgba(196, 140, 80, 0.15) !important;
      z-index: 10001 !important;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
    }
    .sound-toggle:hover {
      background: rgba(196, 140, 80, 0.18) !important;
      border-color: var(--gold, #C48C50) !important;
      box-shadow: 0 6px 24px rgba(0, 0, 0, 0.6), 0 0 20px rgba(196, 140, 80, 0.4) !important;
      transform: scale(1.08) translateY(-1px) !important;
    }
    .sound-toggle svg {
      width: 16px !important;
      height: 16px !important;
    }
    .sound-toggle .sound-label {
      left: 58px !important;
    }

    /* ── Dharma Wheel Alignment & Z-Index Tuning ── */
    .orbital-hub {
      z-index: 10002 !important;
    }
    body:has(.orbital-hub) #magnet-active-hud {
      left: auto !important;
      right: 24px !important;
    }
    body:has(.unified-sticky-nav) #magnet-active-hud {
      left: auto !important;
      right: 24px !important;
      top: 76px !important;
    }

    /* ── MåGNETVERSE MOBILE & TABLET LAYOUT RE-ANCHORING ── */
    @media (max-width: 1024px) {
      #magnet-active-hud {
        top: auto !important;
        bottom: 24px !important;
        right: 24px !important;
        left: auto !important;
      }
      body:has(.breadcrumb-nav) #magnet-active-hud,
      body:has(.top-nav) #magnet-active-hud,
      body:has(.nav-top) #magnet-active-hud,
      body:has(.orbital-hub) #magnet-active-hud,
      body:has(.unified-sticky-nav) #magnet-active-hud {
        top: auto !important;
        bottom: 24px !important;
        right: 24px !important;
        left: auto !important;
      }
      #magnet-selector {
        max-height: 75vh !important;
        touch-action: pan-y !important;
        overscroll-behavior: contain !important;
      }
    }
        `;
        document.head.appendChild(style);
    }

    // ── DYNAMIC MåGNET INJECTOR & PORTAL ENGINE ──
    injectMagnetHtml() {
        if (window.self !== window.top) return; // Skip MåGNET injection inside iframes
        if (!document.getElementById('biophilic-magnet-canvas')) {
            const canvas = document.createElement('canvas');
            canvas.id = 'biophilic-magnet-canvas';
            canvas.style.cssText = 'position: fixed; inset: 0; pointer-events: none !important; z-index: 99998;';
            document.body.appendChild(canvas);
        }

        if (!document.getElementById('magnet-lantern-overlay')) {
            const overlay = document.createElement('div');
            overlay.id = 'magnet-lantern-overlay';
            document.body.appendChild(overlay);
        }

        if (!document.getElementById('artifact-dropzone')) {
            const dz = document.createElement('div');
            dz.id = 'artifact-dropzone';
            dz.innerHTML = `
                <div class="artifact-crucible" style="cursor: pointer;">
                  <div class="artifact-text">Draw the MåGNET</div>
                  <div class="artifact-subtext" id="artifact-status">AWAITING ARTIFACT<br><span style="font-size: 8px; opacity: 0.6; letter-spacing: 0.1em; display: block; margin-top: 8px;">⟨ OR TAP TO CHOOSE FILE ⟩</span></div>
                </div>
                <input type="file" id="magnet-file-input" accept="image/*" style="display: none;" />
                <button id="dropzone-cancel-btn" style="background: rgba(15, 12, 10, 0.6); border: 1px solid rgba(196, 140, 80, 0.25); font-family: var(--font-body); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer; color: var(--gold); padding: 10px 20px; margin-top: 40px; transition: all 0.3s ease; border-radius: 4px; backdrop-filter: blur(10px); z-index: 100002;">⟨ CLOSE GATEWAY ⟩</button>
            `;
            document.body.appendChild(dz);
        }

        if (!document.getElementById('algorave-flash')) {
            const flash = document.createElement('div');
            flash.id = 'algorave-flash';
            document.body.appendChild(flash);
        }

        if (!document.getElementById('magnet-resonance-tooltip')) {
            const tip = document.createElement('div');
            tip.id = 'magnet-resonance-tooltip';
            tip.innerHTML = `
                <div class="hud-sub">CO-RESONANCE ESTABLISHED</div>
                <div class="tt-header">PING Confirmed.</div>
                <div class="tt-body">
                  You have introduced a MåGNET into the environment.<br><br>
                  <b>What has transpired:</b><br>
                  The architecture has recognized your specific center of gravity. The PING has swept the field. What was previously dormant across the Academy is now active. Your MåGNET acts as an Attractor—simultaneously opening the field and drawing it into an inevitable orbit around you.<br><br>
                  <b>How to navigate:</b><br>
                  Follow the glowing signatures. The environment now physically reflects the personality of your MåGNET. Move through the field and observe what arrives.
                </div>
                <button class="tt-button" onclick="document.getElementById('magnet-resonance-tooltip').classList.remove('visible')">Enter the Architecture</button>
            `;
            document.body.appendChild(tip);
        }

        if (!document.getElementById('magnet-prompt-modal')) {
            const modal = document.createElement('div');
            modal.id = 'magnet-prompt-modal';
            modal.setAttribute('role', 'dialog');
            modal.setAttribute('aria-label', 'Awaiting MaGNET');
            modal.setAttribute('aria-modal', 'true');
            modal.style.cssText = 'display: none; position: fixed; inset: 0; background: rgba(8, 5, 4, 0.96); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); z-index: 100005; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1); padding: 20px;';
            modal.innerHTML = `
                <div class="mpm-content">
                  <div style="font-family: var(--font-display); font-size: 24px; color: var(--gold); letter-spacing: 0.12em; margin-bottom: 18px; text-shadow: 0 0 10px rgba(196,140,80,0.3);">⊙ AWAITING MåGNET ⊙</div>
                  <div style="font-family: var(--font-body); font-size: 13px; line-height: 1.6; color: var(--sand); opacity: 0.85; margin-bottom: 30px; letter-spacing: 0.03em;">
                    This pathway is currently dormant. To activate its mathematical resonance and inhabit this atmosphere, you must introduce a MåGNET cartridge.
                  </div>
                  <div style="display: flex; flex-direction: column; gap: 12px; align-items: center;">
                    <button id="mpm-select-btn" class="mpm-btn mpm-btn-primary">
                      ⟨ SELECT CARTRIDGE ⟩
                    </button>
                    <button id="mpm-upload-btn" class="mpm-btn mpm-btn-secondary">
                      ⟨ INTRODUCE CARTRIDGE FILE ⟩
                    </button>
                    <button id="mpm-close-btn" class="mpm-btn-cancel">
                      ⟨ CANCEL ⟩
                    </button>
                  </div>
                </div>
            `;
            document.body.appendChild(modal);
        }

        if (!document.getElementById('magnet-selector')) {
            const sel = document.createElement('div');
            sel.id = 'magnet-selector';
            sel.setAttribute('role', 'dialog');
            sel.setAttribute('aria-label', 'Introduce a MaGNET');
            sel.setAttribute('aria-modal', 'true');
            sel.innerHTML = `
                <div class="ms-handle" aria-hidden="true"></div>
                <div class="ms-eyebrow">Introduce a MåGNET</div>
                <div class="ms-cards">
                  <button class="ms-card" data-magnet="ellian" aria-label="The Ellian — Luminescent. Building warmth, grounding in gratitude, creating safety.">
                    <span class="ms-sigil" aria-hidden="true">◉</span>
                    <div class="ms-info">
                      <div class="ms-name">The Ellian</div>
                      <div class="ms-desc">Warmth · Gratitude · The Lantern</div>
                      <div class="ms-type">Luminescent</div>
                    </div>
                  </button>
                  <button class="ms-card" data-magnet="curator" aria-label="The Curator — Structural. Strategic thinking, seeing patterns, understanding architecture.">
                    <span class="ms-sigil" aria-hidden="true">⊞</span>
                    <div class="ms-info">
                      <div class="ms-name">The Curator</div>
                      <div class="ms-desc">Foresight · Blueprint · The Grid</div>
                      <div class="ms-type">Structural</div>
                    </div>
                  </button>
                  <button class="ms-card" data-magnet="gleam" aria-label="The Dragonfly's Gleam — Sensorial. Subtle perception, cross-modal sensing, mystery.">
                    <span class="ms-sigil" aria-hidden="true">◇</span>
                    <div class="ms-info">
                      <div class="ms-name">The Dragonfly's Gleam</div>
                      <div class="ms-desc">Transparency · Essential Creativity · Uplifting The Creative Experience</div>
                      <div class="ms-type">Sensorial</div>
                    </div>
                  </button>
                  <button class="ms-card" data-magnet="default" aria-label="Return to the Center — Clear Attractor. Reset established resonance, restore default orbit.">
                    <span class="ms-sigil" aria-hidden="true" style="color: var(--gold); text-shadow: 0 0 8px rgba(196, 140, 80, 0.5);">⊙</span>
                    <div class="ms-info">
                      <div class="ms-name">Return to the Center</div>
                      <div class="ms-desc">Clear Attractor · Restore Default Orbit</div>
                      <div class="ms-type">Emanation</div>
                    </div>
                  </button>
                </div>
                <div style="width: 100%; display: flex; justify-content: center; margin-bottom: 24px; margin-top: 10px;">
                  <button id="upload-cartridge-btn" style="border: 1px solid rgba(196, 98, 45, 0.45); background: rgba(196, 98, 45, 0.08); padding: 10px 24px; font-family: var(--font-body); font-size: 10px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; cursor: pointer; color: var(--sand); transition: all 0.2s; border-radius: 1px;">
                    ⟨ INTRODUCE CARTRIDGE FILE ⟩
                  </button>
                </div>
                <button class="ms-close" aria-label="Close">↓</button>
            `;
            document.body.appendChild(sel);
        }

        if (!document.getElementById('magnet-active-hud')) {
            const hud = document.createElement('div');
            hud.id = 'magnet-active-hud';
            hud.setAttribute('role', 'button');
            hud.setAttribute('tabindex', '0');
            hud.setAttribute('title', 'Active MåGNET Resonance · Tap to Swap or Exit');
            hud.innerHTML = `
                <span class="hud-sigil" aria-hidden="true">◉</span>
                <span class="hud-name">The Ellian</span>
                <span class="hud-arrow" aria-hidden="true">→</span>
            `;
            document.body.appendChild(hud);
        }
    }

    initMagnetPortal() {
        if (window.self !== window.top) return; // Skip MåGNET portal initialization inside iframes
        this.injectMagnetHtml();

        const dropzone  = document.getElementById('artifact-dropzone');
        const statusText = document.getElementById('artifact-status');
        const selector  = document.getElementById('magnet-selector');
        const activeHud = document.getElementById('magnet-active-hud');
        const fileInput = document.getElementById('magnet-file-input');

        if (!dropzone || !selector || !activeHud) return;

        // Prevent duplicate listener bindings on the current elements
        if (dropzone.dataset.magnetBound) return;
        dropzone.dataset.magnetBound = "true";

        activeHud.addEventListener('click', (e) => {
            e.stopPropagation();
            this.authenticateScholar();
            this.showMagnetSelector();
        });

        // ── DESKTOP & MOBILE GLOBAL EVENT LISTENERS (BOUND ONLY ONCE) ──
        if (!this.globalListenersBound) {
            this.globalListenersBound = true;
            let dragCounter = 0;

            window.addEventListener('dragenter', (e) => {
                const dz = document.getElementById('artifact-dropzone');
                if (!dz) return;
                e.preventDefault();
                dragCounter++;
                if (dragCounter === 1) {
                    dz.classList.add('dragging');
                }
            });

            window.addEventListener('dragleave', (e) => {
                const dz = document.getElementById('artifact-dropzone');
                if (!dz) return;
                e.preventDefault();
                dragCounter--;
                if (dragCounter === 0) {
                    if (!dz.classList.contains('activating')) {
                        dz.classList.remove('dragging');
                    }
                }
            });

            window.addEventListener('dragover', (e) => {
                e.preventDefault();
            });

            window.addEventListener('drop', (e) => {
                const dz = document.getElementById('artifact-dropzone');
                const st = document.getElementById('artifact-status');
                if (!dz) return;
                e.preventDefault();
                dragCounter = 0;
                dz.classList.remove('dragging');
                if (!e.dataTransfer.files.length) return;
                dz.classList.add('activating');
                if (st) st.innerText = "ESTABLISHING MåGNETIC RESONANCE...";
                setTimeout(() => this.triggerMagnetPingResonance(e.dataTransfer.files[0].name), 1500);
            });

            document.addEventListener('keydown', (e) => {
                const dz = document.getElementById('artifact-dropzone');
                const st = document.getElementById('artifact-status');
                const fi = document.getElementById('magnet-file-input');

                if (e.key === 'Escape') {
                    if (dz && (dz.classList.contains('dragging') || dz.classList.contains('activating'))) {
                        dz.classList.remove('dragging', 'activating');
                        dragCounter = 0;
                        if (st) {
                            st.innerHTML = 'AWAITING ARTIFACT<br><span style="font-size: 8px; opacity: 0.6; letter-spacing: 0.1em; display: block; margin-top: 8px;">⟨ OR TAP TO CHOOSE FILE ⟩</span>';
                        }
                        if (fi) fi.value = '';
                    }
                    this.hideMagnetPromptModal();
                    this.hideMagnetSelector();
                    const tip = document.getElementById('magnet-resonance-tooltip');
                    if (tip && tip.classList.contains('visible')) {
                        tip.classList.remove('visible');
                    }
                }

                // Keyboard shortcut: Shift+M for scholar access
                if (e.shiftKey && (e.key === 'm' || e.key === 'M')) {
                    e.preventDefault();
                    this.authenticateScholar();
                }
            });

            document.addEventListener('click', (e) => {
                const tip = document.getElementById('magnet-resonance-tooltip');
                if (tip && tip.classList.contains('visible')) {
                    if (!tip.contains(e.target)) {
                        tip.classList.remove('visible');
                    }
                }
            });
        }

        const crucible = dropzone.querySelector('.artifact-crucible');
        if (crucible && fileInput) {
            crucible.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!dropzone.classList.contains('activating')) {
                    fileInput.click();
                }
            });
        }

        dropzone.addEventListener('click', (e) => {
            if (e.target === dropzone && !dropzone.classList.contains('activating')) {
                dropzone.classList.remove('dragging', 'activating');
                statusText.innerHTML = 'AWAITING ARTIFACT<br><span style="font-size: 8px; opacity: 0.6; letter-spacing: 0.1em; display: block; margin-top: 8px;">⟨ OR TAP TO CHOOSE FILE ⟩</span>';
                if (fileInput) fileInput.value = '';
            }
        });

        const dropzoneCancelBtn = document.getElementById('dropzone-cancel-btn');
        if (dropzoneCancelBtn) {
            dropzoneCancelBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                dropzone.classList.remove('dragging', 'activating');
                statusText.innerHTML = 'AWAITING ARTIFACT<br><span style="font-size: 8px; opacity: 0.6; letter-spacing: 0.1em; display: block; margin-top: 8px;">⟨ OR TAP TO CHOOSE FILE ⟩</span>';
                if (fileInput) fileInput.value = '';
            });
        }

        if (fileInput) {
            fileInput.addEventListener('change', () => {
                if (fileInput.files.length > 0) {
                    dropzone.classList.add('activating');
                    statusText.innerText = "ESTABLISHING MåGNETIC RESONANCE...";
                    setTimeout(() => this.triggerMagnetPingResonance(fileInput.files[0].name), 1500);
                }
            });
        }

        const uploadCartridgeBtn = document.getElementById('upload-cartridge-btn');
        if (uploadCartridgeBtn) {
            uploadCartridgeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.hideMagnetSelector();
                dropzone.classList.add('dragging');
                setTimeout(() => {
                    if (fileInput) fileInput.click();
                }, 100);
            });
        }

        // ── MOBILE: Long-press on ⊙ reveals the MaGNET selector ──
        let longPressTimer = null;
        let longPressFired = false;
        let touchStartPos = { x: 0, y: 0 };

        const bindStillnessNode = () => {
            const stillnessNode = document.querySelector('.stillness-node');
            if (!stillnessNode) return;
            if (stillnessNode.dataset.magnetBound) return;
            stillnessNode.dataset.magnetBound = "true";

            stillnessNode.addEventListener('touchstart', (e) => {
                if (e.touches.length > 0) {
                    touchStartPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
                }
                longPressFired = false;
                longPressTimer = setTimeout(() => {
                    longPressTimer = null;
                    longPressFired = true;
                    this.authenticateScholar();
                    this.showMagnetSelector();
                }, 500);
            }, { passive: true });

            stillnessNode.addEventListener('touchmove', (e) => {
                if (e.touches.length > 0 && longPressTimer) {
                    const dx = e.touches[0].clientX - touchStartPos.x;
                    const dy = e.touches[0].clientY - touchStartPos.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist > 15) {
                        clearTimeout(longPressTimer);
                        longPressTimer = null;
                    }
                }
            }, { passive: true });

            stillnessNode.addEventListener('touchend', () => {
                clearTimeout(longPressTimer);
                longPressTimer = null;
            }, { passive: true });

            stillnessNode.addEventListener('click', (e) => {
                if (e.shiftKey) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    this.authenticateScholar();
                    return;
                }
                if (longPressFired) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    longPressFired = false;
                    return;
                }
                this.initiateStillness();
            });
        };

        bindStillnessNode();

        // ── Title and dormant field clicks ──
        const bindCardClicks = () => {
            document.querySelector('.hub-title')?.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!window._scholarAuthenticated) {
                    this.showMagnetPromptModal();
                    return;
                }
                this.showMagnetSelector();
            });

            document.querySelectorAll('.dormant-field').forEach((field) => {
                if (field.dataset.clickBound) return;
                field.dataset.clickBound = "true";

                field.addEventListener('click', (e) => {
                    if (document.body.classList.contains('magnet-resonance-established')) return;
                    e.stopPropagation();
                    e.preventDefault();
                    this.showMagnetPromptModal();
                });

                field.addEventListener('mouseenter', () => {
                    if (!window._scholarAuthenticated) return;
                    if (window.sonnetEngine && window.sonnetEngine.isInitialized) {
                        window.sonnetEngine.playHoverBell(3, field, 0.6);
                    }
                });
            });
        };

        bindCardClicks();

        // ── Card elements inside selector ──
        let selectorCloseLockout = false;
        selector.querySelectorAll('.ms-card').forEach((card) => {
            const magnetKey = card.dataset.magnet;
            const previewIndex = { ellian: 2, curator: 5, gleam: 9 }[magnetKey] || 0;

            card.addEventListener('touchstart', (e) => {
                e.stopPropagation();
                selectorCloseLockout = true;
                if (window.sonnetEngine && window.sonnetEngine.isInitialized) {
                    window.sonnetEngine.playHoverBell(previewIndex);
                }
            }, { passive: true });

            card.addEventListener('mouseenter', () => {
                if (window.sonnetEngine && window.sonnetEngine.isInitialized) {
                    window.sonnetEngine.playHoverBell(previewIndex);
                }
            });

            card.addEventListener('click', (e) => {
                e.stopPropagation();
                selectorCloseLockout = true;
                this.hideMagnetSelector();
                dropzone.classList.add('activating');
                statusText.innerText = "ESTABLISHING MåGNETIC RESONANCE...";
                setTimeout(() => this.triggerMagnetPingResonance(magnetKey), 800);
            });
        });

        selector.querySelector('.ms-close')?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.hideMagnetSelector();
        });

        selector.addEventListener('click', (e) => {
            if (e.target === selector && !selectorCloseLockout) {
                this.hideMagnetSelector();
            }
            selectorCloseLockout = false;
        });

        const promptModal = document.getElementById('magnet-prompt-modal');
        document.getElementById('mpm-select-btn')?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.hideMagnetPromptModal();
            this.authenticateScholar();
            setTimeout(() => this.showMagnetSelector(), 300);
        });

        document.getElementById('mpm-upload-btn')?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.hideMagnetPromptModal();
            this.authenticateScholar();
            if (dropzone) {
                dropzone.classList.add('dragging');
                setTimeout(() => {
                    if (fileInput) fileInput.click();
                }, 150);
            }
        });

        document.getElementById('mpm-close-btn')?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.hideMagnetPromptModal();
        });

        promptModal?.addEventListener('click', (e) => {
            if (e.target === promptModal) {
                this.hideMagnetPromptModal();
            }
        });

        const savedMagnet = localStorage.getItem('active_magnet');
        if (savedMagnet && savedMagnet !== 'default') {
            setTimeout(() => {
                this.triggerMagnetPingResonance(savedMagnet, true);
            }, 500);
        }

        this.initBiophilicCanvas();
    }

    authenticateScholar(skipEffects = false) {
        window._scholarAuthenticated = true;
        localStorage.setItem('scholar_authenticated', 'true');
        console.log("Scholar Authenticated. MaGNET pathways now active.");

        if (skipEffects) return;

        const stillnessNode = document.querySelector('.stillness-node');
        if (stillnessNode) {
            stillnessNode.style.textShadow = '0 0 20px var(--gold)';
            stillnessNode.style.color = 'var(--gold)';
            setTimeout(() => {
                stillnessNode.style.textShadow = 'none';
                stillnessNode.style.color = 'var(--ash)';
            }, 600);
        }

        if (window.sonnetEngine && window.sonnetEngine.isInitialized) {
            const confirmIndices = [0, 3, 5];
            confirmIndices.forEach((idx, i) => {
                setTimeout(() => window.sonnetEngine.playHoverBell(idx, document.body, 0.7), i * 100);
            });
        }
    }

    showMagnetSelector() {
        const selector = document.getElementById('magnet-selector');
        if (!selector || selector.classList.contains('open')) return;
        selector.classList.add('open');
        selector.setAttribute('aria-hidden', 'false');

        if (window.sonnetEngine && window.sonnetEngine.isInitialized) {
            const awakingIndices = [7, 5, 3, 0];
            awakingIndices.forEach((idx, i) => {
                setTimeout(() => window.sonnetEngine.playHoverBell(idx, document.body, 0.8), i * 120);
            });
        } else if (window.Tone && window.Tone.context.state === 'running') {
            try {
                const now = window.Tone.now();
                const synth = new window.Tone.PolySynth(window.Tone.Synth, {
                    volume: -20,
                    envelope: { attack: 0.1, decay: 0.3, sustain: 0.2, release: 0.6 }
                }).toDestination();
                synth.triggerAttackRelease(["F1", "A1"], "1n", now);
            } catch (e) {}
        }
    }

    hideMagnetSelector() {
        const selector = document.getElementById('magnet-selector');
        if (selector) {
            selector.classList.remove('open');
            selector.setAttribute('aria-hidden', 'true');
        }
    }

    showMagnetPromptModal() {
        const promptModal = document.getElementById('magnet-prompt-modal');
        if (!promptModal || promptModal.classList.contains('visible')) return;
        promptModal.classList.add('visible');
        promptModal.setAttribute('aria-hidden', 'false');

        try {
            if (window.sonnetEngine) {
                if (!window.sonnetEngine.isInitialized) window.sonnetEngine.initialize();
                setTimeout(() => window.sonnetEngine.playHoverBell(0, promptModal, 0.4), 50);
            } else if (window.Tone && window.Tone.context.state === 'running') {
                const synth = new window.Tone.Synth({ volume: -15 }).toDestination();
                synth.triggerAttackRelease("C3", "1n");
            }
        } catch (e) {}
    }

    hideMagnetPromptModal() {
        const promptModal = document.getElementById('magnet-prompt-modal');
        if (promptModal) {
            promptModal.classList.remove('visible');
            promptModal.setAttribute('aria-hidden', 'true');
        }
    }

    // ── DYNAMIC CURSOR PARTICLE PHYSICS ──
    resizeCanvas() {
        const canvas = document.getElementById('biophilic-magnet-canvas');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }

    initBiophilicCanvas() {
        this.resizeCanvas();
        if (this.canvasLoopActive) return;
        this.canvasLoopActive = true;

        const phi = 1.61803398875;
        this.targetMouseX = this.mouseX;
        this.targetMouseY = this.mouseY;

        // Harp strings for Gleam
        this.harpStrings = [];
        for (let i = 0; i < 12; i++) {
            this.harpStrings.push({
                x: 0,
                amplitude: 0,
                phase: 0,
                lastCrossed: false
            });
        }

        // Particles for Ellian & Curator
        this.particles = [];
        for (let i = 0; i < 16; i++) {
            this.particles.push({
                angle: Math.random() * Math.PI * 2,
                distance: 50 + Math.random() * 200,
                speed: 0.02 * Math.pow(phi, -i), // omega_n = omega_0 * phi^-n
                size: 2 + Math.random() * 3,
                baseDistance: 40 + i * 15 * phi
            });
        }

        const loop = (timestamp) => {
            const canvas = document.getElementById('biophilic-magnet-canvas');
            if (!canvas) {
                requestAnimationFrame(loop);
                return;
            }
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Interpolate mouse coordinates smoothly
            this.mouseX += (this.targetMouseX - this.mouseX) * 0.1;
            this.mouseY += (this.targetMouseY - this.mouseY) * 0.1;

            // Interpolate device orientation tilt coordinates smoothly for physical magnetometer drift
            if (this.targetTiltX === undefined) this.targetTiltX = 0;
            if (this.targetTiltY === undefined) this.targetTiltY = 0;
            if (this.tiltX === undefined) this.tiltX = 0;
            if (this.tiltY === undefined) this.tiltY = 0;
            this.tiltX += (this.targetTiltX - this.tiltX) * 0.1;
            this.tiltY += (this.targetTiltY - this.tiltY) * 0.1;

            const activeMagnet = localStorage.getItem('active_magnet');

            if (activeMagnet === 'ellian') {
                // Ellian: Warm gold-amber light spirals gently pulled by physical device tilt
                ctx.save();
                this.particles.forEach((p, idx) => {
                    p.angle += p.speed;
                    const currentDist = p.baseDistance + Math.sin(timestamp * 0.001 + idx) * 10;
                    // Add physical tilt offsets to create a gravity/magnetic wind effect
                    const ox = this.mouseX + this.tiltX;
                    const oy = this.mouseY + this.tiltY;
                    const x = ox + Math.cos(p.angle) * currentDist;
                    const y = oy + Math.sin(p.angle) * currentDist;

                    const grad = ctx.createRadialGradient(x, y, 0, x, y, p.size * 3);
                    grad.addColorStop(0, 'rgba(212, 168, 112, 0.9)');
                    grad.addColorStop(0.5, 'rgba(196, 98, 45, 0.4)');
                    grad.addColorStop(1, 'rgba(196, 98, 45, 0)');
                    ctx.fillStyle = grad;
                    ctx.beginPath();
                    ctx.arc(x, y, p.size * 3, 0, Math.PI * 2);
                    ctx.fill();

                    ctx.strokeStyle = `rgba(212, 168, 112, ${0.1 * Math.pow(phi, -idx)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    for (let step = 0; step < 20; step++) {
                        const theta = p.angle - step * 0.05;
                        const dist = currentDist - step * 2;
                        if (dist > 0) {
                            const sx = ox + Math.cos(theta) * dist;
                            const sy = oy + Math.sin(theta) * dist;
                            if (step === 0) ctx.moveTo(sx, sy);
                            else ctx.lineTo(sx, sy);
                        }
                    }
                    ctx.stroke();
                });
                ctx.restore();

            } else if (activeMagnet === 'curator') {
                // Curator: Concentric golden rectangles and snapping copper vectors with dynamic holographic tilt parallax
                ctx.save();
                ctx.strokeStyle = 'rgba(196, 140, 80, 0.25)';
                ctx.lineWidth = 1.5;

                let size = 20;
                for (let i = 0; i < 6; i++) {
                    const w = size * Math.pow(phi, i);
                    const h = w / phi;
                    ctx.strokeStyle = `rgba(196, 140, 80, ${0.35 * Math.pow(phi, -i)})`;
                    // Holographic parallax effect: offset concentric frames based on depth index i and device tilt!
                    const ox = this.mouseX + this.tiltX * (i * 0.4);
                    const oy = this.mouseY + this.tiltY * (i * 0.4);
                    ctx.strokeRect(ox - w / 2, oy - h / 2, w, h);
                }

                ctx.strokeStyle = 'rgba(196, 98, 45, 0.3)';
                ctx.beginPath();
                this.particles.forEach((p, idx) => {
                    p.angle += p.speed * 0.5;
                    const ox = this.mouseX + this.tiltX;
                    const oy = this.mouseY + this.tiltY;
                    const x = ox + Math.cos(p.angle) * p.baseDistance;
                    const y = oy + Math.sin(p.angle) * p.baseDistance;

                    ctx.moveTo(this.mouseX, this.mouseY);
                    ctx.lineTo(x, y);

                    const cs = 4;
                    ctx.moveTo(x - cs, y); ctx.lineTo(x + cs, y);
                    ctx.moveTo(x, y - cs); ctx.lineTo(x, y + cs);
                });
                ctx.stroke();
                ctx.restore();

            } else if (activeMagnet === 'gleam') {
                // Gleam: Translucent lavender-silver plucking wave ripples on 12 vertical harp strings, bending with physical tilt
                ctx.save();
                const stringSpacing = canvas.width / 13;
                
                for (let i = 0; i < 12; i++) {
                    const s = this.harpStrings[i];
                    s.x = stringSpacing * (i + 1);

                    const distToMouse = Math.abs(this.mouseX - s.x);
                    const crossed = distToMouse < 8;
                    if (crossed && !s.lastCrossed) {
                        s.amplitude = 18;
                        s.phase = 0;
                        
                        if (this.hoverChime && this.toneReady) {
                            const root = 144 * phi;
                            const pluckFreq = root * Math.pow(phi, (i % 7) - 3);
                            this.hoverChime.triggerAttackRelease(pluckFreq, "8n");
                        }
                    }
                    s.lastCrossed = crossed;

                    ctx.strokeStyle = `rgba(216, 216, 250, ${0.1 + (s.amplitude / 18) * 0.4})`;
                    ctx.lineWidth = 1 + (s.amplitude / 18) * 2;
                    ctx.beginPath();

                    for (let y = 0; y <= canvas.height; y += 10) {
                        let dx = 0;
                        if (s.amplitude > 0) {
                            const yDist = Math.abs(y - this.mouseY);
                            const taper = Math.max(0, 1 - yDist / (canvas.height * 0.3));
                            dx = s.amplitude * Math.sin(y * 0.05 + s.phase) * taper;
                        }
                        // Gravitational sag: strings physically bend left/right based on physical device orientation/tilt
                        const tiltBend = this.tiltX * Math.sin((y / canvas.height) * Math.PI);
                        if (y === 0) ctx.moveTo(s.x + dx + tiltBend, y);
                        else ctx.lineTo(s.x + dx + tiltBend, y);
                    }
                    ctx.stroke();

                    if (s.amplitude > 0) {
                        s.amplitude *= 0.94;
                        s.phase += 0.3;
                        if (s.amplitude < 0.1) s.amplitude = 0;
                    }
                }

                if (this.particles.length > 0) {
                    ctx.lineWidth = 1.5;
                    this.particles.forEach((p, idx) => {
                        const rippleRadius = (timestamp * 0.05 + idx * 30) % 150;
                        ctx.strokeStyle = `rgba(230, 230, 250, ${Math.max(0, 1 - rippleRadius / 150) * 0.35})`;
                        ctx.beginPath();
                        ctx.arc(this.mouseX, this.mouseY, rippleRadius, 0, Math.PI * 2);
                        ctx.stroke();
                    });
                }
                ctx.restore();
            }

            requestAnimationFrame(loop);
        };

        window.addEventListener('mousemove', (e) => {
            this.targetMouseX = e.clientX;
            this.targetMouseY = e.clientY;
        });
        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                this.targetMouseX = e.touches[0].clientX;
                this.targetMouseY = e.touches[0].clientY;
            }
        }, { passive: true });

        // Physical magnetometer / device orientation listener for physical feedback
        this.targetTiltX = 0;
        this.targetTiltY = 0;
        window.addEventListener('deviceorientation', (e) => {
            if (e.beta !== null && e.gamma !== null) {
                // beta is tilt front-to-back (-180 to 180). comfy holding angle is ~60 deg.
                // gamma is tilt left-to-right (-90 to 90)
                this.targetTiltX = Math.max(-1, Math.min(1, e.gamma / 45)) * 40; // max 40px left-right drift
                this.targetTiltY = Math.max(-1, Math.min(1, (e.beta - 60) / 30)) * 40; // max 40px top-bottom drift
            }
        }, { passive: true });

        window.addEventListener('resize', () => this.resizeCanvas());
        this.resizeCanvas();

        requestAnimationFrame(loop);
    }

    playGoldenChord() {
        if (!this.toneReady) return;
        const root = 144;
        const phi = 1.61803398875;
        const freqs = [
            root,
            root * phi,
            root * Math.pow(phi, 2),
            root * Math.pow(phi, 3)
        ];

        const chordSynth = new Tone.PolySynth(Tone.FMSynth, {
            harmonicity: phi,
            modulationIndex: phi * phi,
            envelope: { attack: 0.1618, decay: 0.618, sustain: 0.382, release: 1.618 },
            volume: -28
        }).connect(this.globalReverb);

        chordSynth.triggerAttackRelease(freqs, "2n");
        setTimeout(() => {
            try { chordSynth.dispose(); } catch(e){}
        }, 4000);
    }

    async triggerMagnetPingResonance(identifier, skipEffects = false) {
        const dropzone = document.getElementById('artifact-dropzone');
        const statusText = document.getElementById('artifact-status');
        if (!dropzone) return;
        dropzone.classList.remove('activating');
        dropzone.classList.remove('dragging');

        const id = (identifier || '').toLowerCase();
        let magnetKey = 'default';
        if      (id.includes('6388') || id === 'ellian')                            magnetKey = 'ellian';
        else if (id.includes('6394') || id === 'curator')                           magnetKey = 'curator';
        else if (id.includes('6391') || id.includes('magnific') || id === 'gleam')  magnetKey = 'gleam';

        localStorage.setItem('active_magnet', magnetKey);

        const cascades = {
          ellian:  [0, 2, 4, 5, 7],
          curator: [0, 3, 5, 8, 10],
          gleam:   [5, 7, 9, 10, 11],
          default: [0, 1, 3, 5, 7, 9]
        };
        const indices = cascades[magnetKey] || cascades.default;

        if (!skipEffects) {
          (async () => {
            try {
              if (window.sonnetEngine) {
                if (!window.sonnetEngine.isInitialized) await window.sonnetEngine.initialize();
                if (typeof window.sonnetEngine._ensureContext === 'function') {
                  await window.sonnetEngine._ensureContext();
                }
                indices.forEach((idx, i) => {
                  setTimeout(() => {
                    try { window.sonnetEngine.playHoverBell(idx, document.body, 0); } catch(e){}
                  }, i * 80);
                });
                setTimeout(() => {
                  try { window.sonnetEngine.playClickChord(); } catch(e){}
                }, indices.length * 80);
              } else if (window.Tone) {
                await Tone.start();
                this.playGoldenChord();
              }
            } catch (audioError) {
              console.warn("⊙ Co-resonance audio establishment bypassed:", audioError);
            }
          })();

          const flash = document.getElementById('algorave-flash');
          if (flash) {
            flash.style.opacity = '1';
            flash.style.transition = 'opacity 0.05s ease';
            setTimeout(() => {
              flash.style.transition = 'opacity 2.5s cubic-bezier(0.16, 1, 0.3, 1)';
              flash.style.opacity = '0';
            }, 50);
          }
        }

        document.body.classList.remove('magnet-1-ellian', 'magnet-2-curator', 'magnet-3-gleam', 'magnet-resonance-established');
        
        if (magnetKey !== 'default') {
          document.body.classList.add('magnet-resonance-established');
          if (magnetKey === 'ellian')  document.body.classList.add('magnet-1-ellian');
          if (magnetKey === 'curator') document.body.classList.add('magnet-2-curator');
          if (magnetKey === 'gleam')   document.body.classList.add('magnet-3-gleam');
        }

        const activeHudElement = document.getElementById('magnet-active-hud');
        if (activeHudElement) {
          if (magnetKey !== 'default') {
            const sigilMap = { ellian: '◉', curator: '⊞', gleam: '◇' };
            const nameMap = { ellian: 'The Ellian', curator: 'The Curator', gleam: "The Dragonfly's Gleam" };
            
            const sigilEl = activeHudElement.querySelector('.hud-sigil');
            const nameEl = activeHudElement.querySelector('.hud-name');
            
            if (sigilEl) sigilEl.textContent = sigilMap[magnetKey] || '';
            if (nameEl) nameEl.textContent = nameMap[magnetKey] || '';
          }
        }

        const loreMap = {
          ellian:  "THE ELLIAN :: Gratitude / Warmth",
          curator: "THE CURATOR :: Strategic Foresight",
          gleam:   "THE DRAGONFLY'S GLEAM :: The Veil is a Harp"
        };

        if (!skipEffects && magnetKey !== 'default') {
          setTimeout(() => {
            const tip = document.getElementById('magnet-resonance-tooltip');
            if (tip) {
              tip.classList.add('visible');
              const hudSub = tip.querySelector('.hud-sub');
              if (hudSub && loreMap[magnetKey]) {
                hudSub.textContent = loreMap[magnetKey] + " — CO-RESONANCE ESTABLISHED";
              }
            }
          }, 800);
        }
    }
}

// Instantiate globally
if (window.self === window.top) {
    if (!window.hdmApp) {
        window.hdmApp = new EcosystemApp();
        window.triggerMagnetPingResonance = window.hdmApp.triggerMagnetPingResonance.bind(window.hdmApp);
    } else {
        console.log(":: Ecosystem Root already exists. Bypassing re-instantiation.");
    }
} else {
    console.log(":: MåGNETverse App sub-frame load. Orchestration bypassed.");
    // Safety fallback: Ensure sub-frames fade in and show their contents.
    const revealSubframe = () => {
        document.body.classList.add('is-loaded');
    };
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', revealSubframe);
    } else {
        revealSubframe();
    }
}
