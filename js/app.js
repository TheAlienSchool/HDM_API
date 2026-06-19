// Ecosystem Root (app.js)
// Responsible for initializing the global Audio Context, orchestrating PJAX state transitions,
// and preserving liveness across the different explorers.

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

if (!window._hdmTransientListeners) {
    window._hdmTransientListeners = [];
    window._hdmTrackingTransient = false;

    // ── UNIVERSAL SCROLL PROTECTION ──────────────────────────────────
    // No page in the HIA should have native scroll prevented unless the
    // event targets an interactive element (canvas with zoom, drag handle,
    // form control). This is path-agnostic — it protects every page.
    const _originalPreventDefault = Event.prototype.preventDefault;
    const _scrollEventTypes = new Set([
        'wheel', 'mousewheel', 'dommousescroll', 'DOMMouseScroll',
        'touchmove', 'touchstart', 'touchend',
        'pointermove', 'pointerdown', 'pointerup'
    ]);
    Event.prototype.preventDefault = function() {
        if (_scrollEventTypes.has(this.type)) {
            let isInteractiveTarget = false;
            try {
                if (this.target && this.target.closest) {
                    isInteractiveTarget = !!(
                        this.target.closest('.interactive-canvas') ||
                        this.target.closest('#magnet-selector') ||
                        this.target.closest('[data-scroll-lock]')
                    );
                }
            } catch (e) {}
            if (!isInteractiveTarget) return;
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

        if (typeof window._hasPinged === 'undefined') {
            window._hasPinged = false;
        }

        // Wait for DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.cleanupStillness();
                this.createPingRadar();
                this.applyActiveMagnet();
                this.initMagnetPortal();
                this.enhanceClarityBridge();
                document.body.classList.add('is-loaded');

                const forceGate = window.location.search.includes('gate=true') || window.location.search.includes('welcome=true');
                if (forceGate) {
                    this.showReciprocalDialogue({ isEntryGate: true });
                }
            });
        } else {
            this.cleanupStillness();
            this.createPingRadar();
            this.applyActiveMagnet();
            this.initMagnetPortal();
            this.enhanceClarityBridge();
            document.body.classList.add('is-loaded');

            const forceGate = window.location.search.includes('gate=true') || window.location.search.includes('welcome=true');
            if (forceGate) {
                this.showReciprocalDialogue({ isEntryGate: true });
            }
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
        window._hasPinged = true;
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
            window.Tone.Destination.volume.value = 4.5; // preamp boost
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
        } else if (path.includes('bloom')) {
            targetFreq = 144; // BLOOM IS the drone — the ground state comes forward
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
                } else if (path.includes('magnet-theater')) {
                    targetFreq = 144;
                } else if (path.includes('bloom')) {
                    targetFreq = 144;
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

        // Enhance clarity bridge footer
        this.enhanceClarityBridge();

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

                var tripleTapCount = 0;
                var tripleTapTimer = null;
                var TRIPLE_TAP_WINDOW = 600;

                var handleTap = (e) => {
                    if (document.body.classList.contains('magnet-resonance-established')) return;
                    e.stopPropagation();
                    e.preventDefault();

                    tripleTapCount++;
                    if (tripleTapTimer) clearTimeout(tripleTapTimer);

                    if (tripleTapCount >= 3) {
                        tripleTapCount = 0;
                        this.showMagnetSelector();
                        return;
                    }

                    tripleTapTimer = setTimeout(() => {
                        if (tripleTapCount > 0 && tripleTapCount < 3) {
                            this.showMagnetPromptModal();
                        }
                        tripleTapCount = 0;
                    }, TRIPLE_TAP_WINDOW);
                };

                field.addEventListener('click', handleTap);
                field.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    handleTap(e);
                }, { passive: false });

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
        this.targetMouseX = this.mouseX || window.innerWidth / 2;
        this.targetMouseY = this.mouseY || window.innerHeight / 2;
        this.smoothMouseX = this.targetMouseX;
        this.smoothMouseY = this.targetMouseY;

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

            // Decouple loop animation mouse tracking to prevent high-frequency write conflicts
            if (this.smoothMouseX === undefined) this.smoothMouseX = this.mouseX || window.innerWidth / 2;
            if (this.smoothMouseY === undefined) this.smoothMouseY = this.mouseY || window.innerHeight / 2;
            this.smoothMouseX += (this.targetMouseX - this.smoothMouseX) * 0.1;
            this.smoothMouseY += (this.targetMouseY - this.smoothMouseY) * 0.1;

            // Interpolate device orientation tilt coordinates smoothly for physical magnetometer drift
            if (this.targetTiltX === undefined) this.targetTiltX = 0;
            if (this.targetTiltY === undefined) this.targetTiltY = 0;
            if (this.tiltX === undefined) this.tiltX = 0;
            if (this.tiltY === undefined) this.tiltY = 0;
            this.tiltX += (this.targetTiltX - this.tiltX) * 0.1;
            this.tiltY += (this.targetTiltY - this.tiltY) * 0.1;

            const activeMagnet = localStorage.getItem('active_magnet');

            // Find closest hub-card to mouse for context-aware shape adjustments
            const cards = Array.from(document.querySelectorAll('.hub-card'));
            let closestCard = null;
            let minDist = Infinity;
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const dist = Math.hypot(this.smoothMouseX - cx, this.smoothMouseY - cy);
                if (dist < minDist) {
                    minDist = dist;
                    closestCard = card;
                }
            });

            if (activeMagnet === 'ellian') {
                // Ellian: Warm gold-amber light spirals gently pulled by physical device tilt and nearby cards
                ctx.save();
                
                let pullX = 0;
                let pullY = 0;
                if (closestCard && minDist < 600) {
                    const rect = closestCard.getBoundingClientRect();
                    const cx = rect.left + rect.width / 2;
                    const cy = rect.top + rect.height / 2;
                    const angleToCard = Math.atan2(cy - this.smoothMouseY, cx - this.smoothMouseX);
                    // Proximity-based gravitational pull vector to extend the reach
                    const pullStrength = (1.0 - minDist / 600) * 90;
                    pullX = Math.cos(angleToCard) * pullStrength;
                    pullY = Math.sin(angleToCard) * pullStrength;
                }

                this.particles.forEach((p, idx) => {
                    p.angle += p.speed;
                    const currentDist = p.baseDistance + Math.sin(timestamp * 0.001 + idx) * 10;
                    // Integrate physical tilt offsets and card gravity pull
                    const ox = this.smoothMouseX + this.tiltX + pullX;
                    const oy = this.smoothMouseY + this.tiltY + pullY;
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
                // Curator: Concentric golden rectangles, snapping wireframes, and vector grids linking to closest cards
                ctx.save();
                
                // Blueprint context alignment: project wireframe guides to nearest card
                if (closestCard && minDist < 500) {
                    const rect = closestCard.getBoundingClientRect();
                    const blendRatio = 1.0 - minDist / 500;
                    ctx.strokeStyle = `rgba(196, 140, 80, ${0.2 * blendRatio})`;
                    ctx.lineWidth = 1.0;
                    ctx.strokeRect(rect.left, rect.top, rect.width, rect.height);
                    
                    // Draw alignment vector lines from cursor coordinates to card boundaries
                    ctx.beginPath();
                    ctx.moveTo(this.smoothMouseX, this.smoothMouseY);
                    ctx.lineTo(rect.left, rect.top);
                    ctx.moveTo(this.smoothMouseX, this.smoothMouseY);
                    ctx.lineTo(rect.right, rect.top);
                    ctx.moveTo(this.smoothMouseX, this.smoothMouseY);
                    ctx.lineTo(rect.left, rect.bottom);
                    ctx.moveTo(this.smoothMouseX, this.smoothMouseY);
                    ctx.lineTo(rect.right, rect.bottom);
                    ctx.stroke();
                }

                ctx.strokeStyle = 'rgba(196, 140, 80, 0.25)';
                ctx.lineWidth = 1.5;

                let size = 20;
                for (let i = 0; i < 6; i++) {
                    const w = size * Math.pow(phi, i);
                    const h = w / phi;
                    ctx.strokeStyle = `rgba(196, 140, 80, ${0.35 * Math.pow(phi, -i)})`;
                    // Holographic parallax effect: offset concentric frames based on depth index i and device tilt
                    const ox = this.smoothMouseX + this.tiltX * (i * 0.4);
                    const oy = this.smoothMouseY + this.tiltY * (i * 0.4);
                    ctx.strokeRect(ox - w / 2, oy - h / 2, w, h);
                }

                ctx.strokeStyle = 'rgba(196, 98, 45, 0.3)';
                ctx.beginPath();
                this.particles.forEach((p, idx) => {
                    p.angle += p.speed * 0.5;
                    const ox = this.smoothMouseX + this.tiltX;
                    const oy = this.smoothMouseY + this.tiltY;
                    const x = ox + Math.cos(p.angle) * p.baseDistance;
                    const y = oy + Math.sin(p.angle) * p.baseDistance;

                    ctx.moveTo(this.smoothMouseX, this.smoothMouseY);
                    ctx.lineTo(x, y);

                    const cs = 4;
                    ctx.moveTo(x - cs, y); ctx.lineTo(x + cs, y);
                    ctx.moveTo(x, y - cs); ctx.lineTo(x, y + cs);
                });
                ctx.stroke();
                ctx.restore();

            } else if (activeMagnet === 'gleam') {
                // Gleam: Translucent lavender-silver plucking wave ripples on 12 vertical harp strings, bending with physical tilt and warping near cards
                ctx.save();
                const stringSpacing = canvas.width / 13;
                
                for (let i = 0; i < 12; i++) {
                    const s = this.harpStrings[i];
                    s.x = stringSpacing * (i + 1);

                    const distToMouse = Math.abs(this.smoothMouseX - s.x);
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
                            const yDist = Math.abs(y - this.smoothMouseY);
                            const taper = Math.max(0, 1 - yDist / (canvas.height * 0.3));
                            dx = s.amplitude * Math.sin(y * 0.05 + s.phase) * taper;
                        }
                        
                        // Gravitational sag: strings physically bend based on physical device orientation/tilt
                        const tiltBend = this.tiltX * Math.sin((y / canvas.height) * Math.PI);
                        
                        // Dynamic warping towards nearest card center to represent context attraction
                        let cardPull = 0;
                        if (closestCard && minDist < 500) {
                            const rect = closestCard.getBoundingClientRect();
                            const cx = rect.left + rect.width / 2;
                            const cardDistToString = Math.abs(cx - s.x);
                            if (cardDistToString < 300) {
                                const pullFactor = (1.0 - cardDistToString / 300) * (1.0 - minDist / 500) * 35;
                                const direction = cx > s.x ? 1 : -1;
                                cardPull = direction * pullFactor * Math.sin((y / canvas.height) * Math.PI);
                            }
                        }

                        if (y === 0) ctx.moveTo(s.x + dx + tiltBend + cardPull, y);
                        else ctx.lineTo(s.x + dx + tiltBend + cardPull, y);
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
                        ctx.arc(this.smoothMouseX, this.smoothMouseY, rippleRadius, 0, Math.PI * 2);
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

    enhanceClarityBridge() {
        const navs = document.querySelectorAll('.clarity-bridge-nav');
        navs.forEach(nav => {
            if (nav.querySelector('#clarity-bridge-dialogue-btn')) return;
            const dialogueBtn = document.createElement('a');
            dialogueBtn.id = 'clarity-bridge-dialogue-btn';
            dialogueBtn.href = '#';
            dialogueBtn.textContent = 'Dialogue';
            dialogueBtn.style.color = '#c48c50';
            dialogueBtn.style.borderBottom = '1px dotted #c48c50';
            dialogueBtn.style.cursor = 'pointer';
            dialogueBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showReciprocalDialogue({ isEntryGate: false });
            });
            nav.appendChild(dialogueBtn);
        });
    }

    showReciprocalDialogue(options = {}) {
        const existing = document.getElementById('reciprocal-dialogue-overlay');
        if (existing) {
            existing.remove();
        }

        // 1. Inject custom scrollbar style tag if not present
        let styleTag = document.getElementById('reciprocal-dialogue-styles');
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'reciprocal-dialogue-styles';
            styleTag.textContent = `
                #reciprocal-dialogue-scroll-wrapper::-webkit-scrollbar {
                    width: 6px;
                }
                #reciprocal-dialogue-scroll-wrapper::-webkit-scrollbar-track {
                    background: rgba(10, 10, 10, 0.8);
                }
                #reciprocal-dialogue-scroll-wrapper::-webkit-scrollbar-thumb {
                    background: rgba(196, 140, 80, 0.3);
                    border-radius: 3px;
                }
                #reciprocal-dialogue-scroll-wrapper::-webkit-scrollbar-thumb:hover {
                    background: rgba(196, 140, 80, 0.6);
                }

                #reciprocal-dialogue-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 100000;
                    background: #0a0a0a;
                    overflow: hidden;
                    opacity: 0;
                    transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1);
                    font-family: 'Inter', system-ui, -apple-system, sans-serif;
                    color: #f0ead8;
                    box-sizing: border-box;
                }

                #reciprocal-resonance-canvas {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 0;
                    pointer-events: none;
                    transition: transform 0.1s ease-out;
                }

                #reciprocal-dialogue-scroll-wrapper {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1;
                    overflow-y: auto;
                    overflow-x: hidden;
                    display: flex;
                    box-sizing: border-box;
                    padding: 60px 20px;
                    align-items: flex-start; /* CRITICAL: prevent top decapitation when child height exceeds viewport */
                }

                #reciprocal-dialogue-modal {
                    width: 100%;
                    background: rgba(18, 18, 18, 0.95);
                    border: 1px solid rgba(196, 140, 80, 0.25);
                    border-radius: 21px;
                    padding: 55px 34px;
                    box-sizing: border-box;
                    box-shadow: 0 21px 55px rgba(0, 0, 0, 0.95), inset 0 1px 1px rgba(255, 255, 255, 0.05);
                    position: relative;
                    transform: scale(0.93);
                    transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.15s ease-out;
                }

                #somatic-lesson-panel {
                    width: 100%;
                    background: rgba(18, 18, 18, 0.95);
                    border: 1px solid rgba(196, 140, 80, 0.2);
                    border-radius: 21px;
                    padding: 40px 30px;
                    box-sizing: border-box;
                    box-shadow: 0 21px 55px rgba(0, 0, 0, 0.95), inset 0 1px 1px rgba(255, 255, 255, 0.05);
                    position: relative;
                    transform: scale(0.93);
                    transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.15s ease-out;
                    text-align: left;
                }

                /* Responsive Desktop Split Layout (Centers the Golden Spiral on the right, modal on the left) */
                @media (min-width: 1100px) {
                    #reciprocal-dialogue-scroll-wrapper {
                        flex-direction: row;
                        align-items: flex-start; /* CRITICAL: prevent top decapitation when row scrolls */
                        justify-content: center;
                        padding-left: 0;
                    }
                    #reciprocal-dialogue-modal {
                        max-width: 580px;
                        margin-top: auto;
                        margin-bottom: auto;
                        margin-left: 0;
                        margin-right: 0;
                    }
                    #somatic-lesson-panel {
                        max-width: 420px;
                        margin-top: auto;
                        margin-bottom: auto;
                        margin-left: 60px;
                        margin-right: 0;
                    }
                }

                /* Responsive Tablet/Mobile Layout (Stacked layout, normal centered background) */
                @media (max-width: 1099px) {
                    #reciprocal-dialogue-scroll-wrapper {
                        flex-direction: column;
                        align-items: center;
                        justify-content: flex-start;
                    }
                    #reciprocal-dialogue-modal {
                        max-width: 890px;
                        margin-top: auto;
                        margin-bottom: auto;
                    }
                    #somatic-lesson-panel {
                        max-width: 890px;
                        margin-top: 28px;
                        margin-bottom: auto;
                    }
                }
            `;
            document.head.appendChild(styleTag);
        }

        const overlay = document.createElement('div');
        overlay.id = 'reciprocal-dialogue-overlay';

        // Strict cross-browser scroll lock for both HTML and Body
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        // 2. Dynamic Canvas Setup (Phi in Action - Golden Spiral / Phyllotaxis)
        const canvas = document.createElement('canvas');
        canvas.id = 'reciprocal-resonance-canvas';
        overlay.appendChild(canvas);

        // 3. Scrollable Wrapper (isolates scrolling, prevents top truncation and double scrollbar clashes)
        const scrollWrapper = document.createElement('div');
        scrollWrapper.id = 'reciprocal-dialogue-scroll-wrapper';

        const modal = document.createElement('div');
        modal.id = 'reciprocal-dialogue-modal';

        if (!options.isEntryGate) {
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '&times;';
            closeBtn.style.cssText = `
                position: absolute;
                top: 25px;
                right: 34px;
                background: none;
                border: none;
                color: rgba(196, 140, 80, 0.6);
                font-size: 34px;
                cursor: pointer;
                transition: color 0.3s ease;
                padding: 0;
                line-height: 1;
                z-index: 10;
            `;
            closeBtn.addEventListener('mouseenter', () => closeBtn.style.color = '#c48c50');
            closeBtn.addEventListener('mouseleave', () => closeBtn.style.color = 'rgba(196, 140, 80, 0.6)');
            closeBtn.addEventListener('click', () => this.hideReciprocalDialogue());
            modal.appendChild(closeBtn);
        }

        const content = document.createElement('div');
        content.style.cssText = `
            display: flex;
            flex-direction: column;
            gap: 34px;
        `;

        const header = document.createElement('div');
        header.style.cssText = `
            text-align: center;
            border-bottom: 1px solid rgba(196, 140, 80, 0.15);
            padding-bottom: 21px;
            margin-bottom: 8px;
        `;

        const title = document.createElement('h2');
        title.textContent = 'WELCOME TO THE HUMAN DEVELOPMENT MATHEMATICS INSIGHTS ACADEMY';
        title.style.cssText = `
            font-family: var(--font-display);
            font-size: clamp(18px, 3.5vw, 25px);
            font-weight: 700;
            letter-spacing: 0.14em;
            color: #e4a86a;
            margin: 0 0 13px 0;
            line-height: 1.3;
            text-shadow: 0 0 1px rgba(196, 140, 80, 0.8), 0 0 15px rgba(196, 140, 80, 0.4), 0 0 35px rgba(196, 140, 80, 0.2);
            text-align: center;
        `;

        const urlSubtitle = document.createElement('div');
        urlSubtitle.textContent = 'hdmathematics.netlify.app';
        urlSubtitle.style.cssText = `
            font-size: 10px;
            letter-spacing: 0.25em;
            color: rgba(196, 140, 80, 0.5);
            text-transform: uppercase;
        `;

        header.appendChild(title);
        header.appendChild(urlSubtitle);
        content.appendChild(header);

        const bodyText = document.createElement('div');
        bodyText.style.cssText = `
            font-size: 15px;
            line-height: 2.0;
            color: rgba(240, 234, 216, 0.85);
            display: flex;
            flex-direction: column;
            text-align: center;
        `;

        bodyText.innerHTML = `
            <p style="margin: 0 0 21px 0; font-family: var(--font-display); font-size: clamp(18px, 3vw, 22px); font-weight: 400; line-height: 1.8; letter-spacing: 0.02em; color: rgba(240, 234, 216, 0.98); text-wrap: balance; text-align: center;">
                Discovery, in human experience, operates as two simultaneous events.
            </p>
            
            <div style="display: flex; flex-direction: column; gap: 24px; padding: 28px 34px; background: rgba(0,0,0,0.3); border-left: 3px solid #c48c50; border-radius: 6px; margin: 24px 0; text-align: left;">
                <p style="margin: 0; font-family: var(--font-display); font-size: 16px; line-height: 1.8; font-weight: 400; color: rgba(240, 234, 216, 0.9); text-wrap: pretty;">
                    <span style="color: #c48c50; font-weight: 600; letter-spacing: 0.08em; display: block; margin-bottom: 8px; font-family: var(--font-body); font-size: 12px;">ABSTRACT SUBTRACTION</span>
                    The sensation that familiar coordinates have shifted.<br>
                    The ground underfoot has silently changed shape.
                </p>
                <p style="margin: 0; font-family: var(--font-display); font-size: 16px; line-height: 1.8; font-weight: 400; color: rgba(240, 234, 216, 0.9); text-wrap: pretty;">
                    <span style="color: #c48c50; font-weight: 600; letter-spacing: 0.08em; display: block; margin-bottom: 8px; font-family: var(--font-body); font-size: 12px;">OUTRAGEOUS ADVENTURE</span>
                    The same sensation, recognized as a moment inside potential, a.k.a., a superposition.
                </p>
            </div>
            
            <p style="margin: 0 0 28px 0; font-family: var(--font-display); font-size: clamp(16px, 2.8vw, 19px); line-height: 1.9; font-weight: 400; color: rgba(240, 234, 216, 0.95); text-align: center; letter-spacing: 0.01em;">
                This is the weird science of Human Development Mathematics, mathematically.<br>
                You are landing at the home of the abstract adventure, and you are more than welcome to be a choose-your-own-adventure&nbsp;explorer.
            </p>
            
            <p style="margin: 0 0 28px 0; font-family: var(--font-display); font-size: clamp(16px, 2.8vw, 19px); line-height: 1.9; font-weight: 400; color: rgba(240, 234, 216, 0.95); text-align: center; letter-spacing: 0.01em;">
                You built this.<br>
                Somewhere in your practice ::<br>
                in the movement between seeking and growing ::<br>
                you crossed the same curiosity bridge that generated these explorations.
            </p>
            
            <p style="margin: 0 0 38px 0; font-family: var(--font-display); font-size: clamp(16px, 2.8vw, 19px); line-height: 1.9; font-weight: 400; color: rgba(240, 234, 216, 0.95); text-align: center; letter-spacing: 0.01em;">
                The HDM Insights Academy exists because<br>
                magnetism involves much more than&nbsp;objects,
            </p>
        `;
        content.appendChild(bodyText);

        if (options.isEntryGate) {
            const actionContainer = document.createElement('div');
            actionContainer.style.cssText = `
                display: flex;
                justify-content: center;
                margin: 8px 0;
            `;

            const enterBtn = document.createElement('button');
            enterBtn.textContent = 'RESONATE TO ENTER →';
            enterBtn.style.cssText = `
                background: rgba(196, 140, 80, 0.08);
                border: 1px solid #c48c50;
                color: #c48c50;
                padding: 18px 34px;
                font-size: 12px;
                font-weight: 700;
                letter-spacing: 0.25em;
                border-radius: 34px;
                cursor: pointer;
                transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                box-shadow: 0 0 21px rgba(196, 140, 80, 0.1);
            `;
            enterBtn.addEventListener('mouseenter', () => {
                enterBtn.style.background = '#c48c50';
                enterBtn.style.color = '#0e0e0e';
                enterBtn.style.boxShadow = '0 0 34px rgba(196, 140, 80, 0.35)';
                enterBtn.style.transform = 'translateY(-2px)';
            });
            enterBtn.addEventListener('mouseleave', () => {
                enterBtn.style.background = 'rgba(196, 140, 80, 0.08)';
                enterBtn.style.color = '#c48c50';
                enterBtn.style.boxShadow = '0 0 21px rgba(196, 140, 80, 0.1)';
                enterBtn.style.transform = 'translateY(0)';
            });
            enterBtn.addEventListener('click', () => {
                this.isExploding = true;
                setTimeout(() => {
                    if (typeof window.triggerThresholdUnlock === 'function') {
                        window.triggerThresholdUnlock();
                    } else {
                        this.ensureAudioReady();
                    }
                    this.hideReciprocalDialogue();
                }, 400); // Let shockwave develop
            });

            actionContainer.appendChild(enterBtn);
            content.appendChild(actionContainer);
        }

        const glyphDivider = document.createElement('div');
        glyphDivider.textContent = '⊙ · ⟁ · ◈ · ⬡ · ✦ · ⊕ · ⟡ · ◐ · ⊗ · ⌘ · ⊛ · ◉';
        glyphDivider.style.cssText = `
            font-size: 12px;
            letter-spacing: 0.2em;
            color: rgba(196, 140, 80, 0.5);
            text-align: center;
            margin: 8px 0;
            border-top: 1px solid rgba(196, 140, 80, 0.1);
            padding-top: 34px;
        `;
        content.appendChild(glyphDivider);

        const portalsHeader = document.createElement('h3');
        portalsHeader.textContent = 'CHANNELS OF RECIPROCITY & DIALOGUE';
        portalsHeader.style.cssText = `
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.2em;
            color: rgba(196, 140, 80, 0.8);
            margin: 0;
            text-align: center;
        `;
        content.appendChild(portalsHeader);

        const grid = document.createElement('div');
        grid.style.cssText = `
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 21px;
            margin-top: 8px;
        `;

        const portals = [
            {
                name: 'Kamau Zuberi Akabueze on LinkedIn',
                url: 'https://linkedin.com/in/thekza',
                desc: 'Connect on LinkedIn to engage in professional dialogue, cohort updates, and brand science strategy.',
                label: '⊕ CONNECT',
                freq: 432
            },
            {
                name: 'THE FREQUENCY OF ALIENATION',
                url: 'https://frequency.thealienschool.com',
                desc: 'The Synthesis Archive of insights from the emergence of THE ÅĻÏEN SCÖÕL FOR CREÅTIVE THÏNKÏNG.',
                label: '⟡ TUNE IN',
                freq: 486
            },
            {
                name: 'Share Your Reflections',
                url: '#',
                isForm: true,
                desc: 'We welcome dialogue about your experiences within the HIA. Share your reflections, shifts in perspective, or creative insights to help shape our collective journey.',
                label: '⊛ WRITE',
                freq: 540
            },
            {
                name: 'CREÅTIVE STEEPING',
                url: 'https://creativesteeping.com',
                desc: 'A space for the paced integration of insights explored at the HIA, designed for the immersive value of intentional contemplation and harmonic resonance.',
                label: '◈ SINK IN',
                freq: 576
            },
            {
                name: "The Stone Forger's Way",
                url: 'https://wayof.netlify.app',
                desc: 'A sanctuary where the deep understanding of a Stone is actively explored through archetypal embodiment and structural grounding.',
                label: '⬡ WITNESS',
                freq: 648
            }
        ];

        // Interactive Email Reflection Form Modal
        const showReflectionForm = () => {
            const playArpeggio = (freqs, duration = '8n', delayOffset = 120) => {
                if (window.Tone && this.toneReady) {
                    try {
                        freqs.forEach((freq, idx) => {
                            setTimeout(() => {
                                try {
                                    if (!window.Tone) return;
                                    const synth = new window.Tone.Synth({
                                        oscillator: { type: 'sine' },
                                        envelope: { attack: 0.02, decay: 0.25, sustain: 0, release: 0.2 }
                                    }).toDestination();
                                    synth.volume.value = -20;
                                    synth.triggerAttackRelease(freq, duration);
                                } catch (err) {}
                            }, idx * delayOffset);
                        });
                    } catch (e) {}
                }
            };

            // Play welcoming chime
            playArpeggio([432, 540, 648], '8n', 120);

            // Inject shake keyframes if not already present
            if (!document.getElementById('hia-form-style')) {
                const style = document.createElement('style');
                style.id = 'hia-form-style';
                style.textContent = `
                    @keyframes formShake {
                        0%, 100% { transform: scale(1) translateX(0); }
                        20%, 60% { transform: scale(1) translateX(-6px); }
                        40%, 80% { transform: scale(1) translateX(6px); }
                    }
                `;
                document.head.appendChild(style);
            }

            const formOverlay = document.createElement('div');
            formOverlay.id = 'reflection-form-overlay';
            formOverlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 110000;
                background: radial-gradient(circle at center, rgba(16, 12, 10, 0.9) 0%, rgba(6, 5, 4, 0.96) 100%);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                padding: 20px;
                box-sizing: border-box;
            `;

            const formModal = document.createElement('div');
            formModal.style.cssText = `
                max-width: 580px;
                width: 100%;
                background: linear-gradient(135deg, rgba(24, 20, 18, 0.85) 0%, rgba(14, 12, 10, 0.95) 100%);
                border: 1px solid rgba(196, 140, 80, 0.3);
                border-radius: 28px;
                padding: 40px 36px;
                box-sizing: border-box;
                box-shadow: 
                    0 30px 70px rgba(0,0,0,0.9), 
                    0 0 50px rgba(196, 140, 80, 0.05),
                    inset 0 1px 0 rgba(255,255,255,0.05);
                display: flex;
                flex-direction: column;
                gap: 24px;
                transform: scale(0.92) translateY(15px);
                transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                color: #f3ede0;
                font-family: 'Inter', system-ui, -apple-system, sans-serif;
                position: relative;
            `;

            const formHeader = document.createElement('div');
            formHeader.style.cssText = `
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid rgba(196, 140, 80, 0.15);
                padding-bottom: 16px;
            `;

            const formTitle = document.createElement('h3');
            formTitle.textContent = 'Share Your Reflections';
            formTitle.style.cssText = `
                font-family: var(--font-display);
                font-size: 22px;
                font-weight: 700;
                color: #e4a86a;
                margin: 0;
                letter-spacing: 0.04em;
                text-shadow: 0 0 15px rgba(196, 140, 80, 0.25);
            `;

            const formClose = document.createElement('button');
            formClose.innerHTML = `
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            `;
            formClose.style.cssText = `
                background: rgba(196, 140, 80, 0.05);
                border: 1px solid rgba(196, 140, 80, 0.15);
                width: 36px;
                height: 36px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: rgba(196, 140, 80, 0.7);
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                padding: 0;
            `;
            formClose.addEventListener('mouseenter', () => {
                formClose.style.color = '#e4a86a';
                formClose.style.background = 'rgba(196, 140, 80, 0.15)';
                formClose.style.borderColor = 'rgba(196, 140, 80, 0.4)';
                formClose.style.transform = 'rotate(90deg) scale(1.05)';
            });
            formClose.addEventListener('mouseleave', () => {
                formClose.style.color = 'rgba(196, 140, 80, 0.7)';
                formClose.style.background = 'rgba(196, 140, 80, 0.05)';
                formClose.style.borderColor = 'rgba(196, 140, 80, 0.15)';
                formClose.style.transform = 'rotate(0deg) scale(1)';
            });
            formClose.addEventListener('click', () => {
                formOverlay.style.opacity = '0';
                formModal.style.transform = 'scale(0.92) translateY(15px)';
                setTimeout(() => formOverlay.remove(), 500);
            });

            formHeader.appendChild(formTitle);
            formHeader.appendChild(formClose);
            formModal.appendChild(formHeader);

            const formIntro = document.createElement('p');
            formIntro.textContent = 'We invite you to share your journey. Your reflections, questions, and insights are a valued part of the collective field.';
            formIntro.style.cssText = `
                font-size: 13px;
                line-height: 1.6;
                color: rgba(243, 237, 224, 0.75);
                margin: -8px 0 4px 0;
            `;
            formModal.appendChild(formIntro);

            // Dropdown select
            const selectContainer = document.createElement('div');
            selectContainer.style.cssText = `
                display: flex;
                flex-direction: column;
                gap: 8px;
            `;
            const selectLabel = document.createElement('label');
            selectLabel.textContent = 'Which HIA experience would you like to reflect on?';
            selectLabel.style.cssText = `
                font-size: 11px;
                font-weight: 700;
                letter-spacing: 0.08em;
                color: rgba(196, 140, 80, 0.85);
            `;
            const selectWrapper = document.createElement('div');
            selectWrapper.style.cssText = `
                position: relative;
                display: flex;
                width: 100%;
            `;
            const select = document.createElement('select');
            select.style.cssText = `
                width: 100%;
                background: rgba(14, 12, 10, 0.8);
                border: 1px solid rgba(196, 140, 80, 0.2);
                color: #f3ede0;
                padding: 14px 16px;
                border-radius: 8px;
                font-family: inherit;
                font-size: 14px;
                outline: none;
                cursor: pointer;
                transition: all 0.3s ease;
                appearance: none;
                -webkit-appearance: none;
                box-shadow: inset 0 1px 3px rgba(0,0,0,0.5);
            `;
            select.addEventListener('focus', () => {
                select.style.borderColor = '#c48c50';
                select.style.boxShadow = '0 0 12px rgba(196, 140, 80, 0.2), inset 0 1px 3px rgba(0,0,0,0.5)';
            });
            select.addEventListener('blur', () => {
                select.style.borderColor = 'rgba(196, 140, 80, 0.2)';
                select.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.5)';
            });
            select.addEventListener('change', () => {
                playArpeggio([576], '16n');
            });

            const optionsList = [
                'The Resonance Map',
                'The Phase-State Laboratory',
                'The Dodecahedral Capstones',
                'The Stoneware Builder',
                'The Somatic Blog Gateways',
                'General HIA Dialogue / Other'
            ];
            optionsList.forEach(opt => {
                const option = document.createElement('option');
                option.value = opt;
                option.textContent = opt;
                select.appendChild(option);
            });

            const arrow = document.createElement('div');
            arrow.innerHTML = '▾';
            arrow.style.cssText = `
                position: absolute;
                right: 16px;
                top: 50%;
                transform: translateY(-50%);
                color: rgba(196, 140, 80, 0.7);
                pointer-events: none;
                font-size: 12px;
            `;

            selectWrapper.appendChild(select);
            selectWrapper.appendChild(arrow);
            selectContainer.appendChild(selectLabel);
            selectContainer.appendChild(selectWrapper);
            formModal.appendChild(selectContainer);

            // Message input
            const textContainer = document.createElement('div');
            textContainer.style.cssText = `
                display: flex;
                flex-direction: column;
                gap: 10px;
            `;
            const textLabel = document.createElement('label');
            textLabel.textContent = 'Share your thoughts and reflections:';
            textLabel.style.cssText = `
                font-size: 11px;
                font-weight: 700;
                letter-spacing: 0.08em;
                color: rgba(196, 140, 80, 0.85);
            `;
            const promptsTip = document.createElement('div');
            promptsTip.style.cssText = `
                font-size: 11.5px;
                line-height: 1.6;
                color: rgba(243, 237, 224, 0.65);
                background: rgba(196, 140, 80, 0.03);
                border-left: 2px solid rgba(196, 140, 80, 0.3);
                padding: 8px 14px;
                margin-bottom: 4px;
                border-radius: 0 6px 6px 0;
            `;
            promptsTip.innerHTML = `
                <span style="color:#c48c50; font-weight:600;">Reflective Guidelines:</span><br>
                • What coordinates shifted or became clearer during your HIA exploration?<br>
                • How did the pace of the interaction affect your learning and awareness?<br>
                • What insights or creative questions are you carrying forward?
            `;

            const textarea = document.createElement('textarea');
            textarea.placeholder = 'Write your reflections here...';
            textarea.style.cssText = `
                background: rgba(14, 12, 10, 0.8);
                border: 1px solid rgba(196, 140, 80, 0.2);
                color: #f3ede0;
                padding: 16px;
                border-radius: 8px;
                font-family: inherit;
                font-size: 14px;
                min-height: 140px;
                resize: vertical;
                outline: none;
                line-height: 1.6;
                transition: all 0.3s ease;
                box-shadow: inset 0 1px 3px rgba(0,0,0,0.5);
            `;
            textarea.addEventListener('focus', () => {
                textarea.style.borderColor = '#c48c50';
                textarea.style.boxShadow = '0 0 12px rgba(196, 140, 80, 0.2), inset 0 1px 3px rgba(0,0,0,0.5)';
            });
            textarea.addEventListener('blur', () => {
                textarea.style.borderColor = 'rgba(196, 140, 80, 0.2)';
                textarea.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.5)';
            });

            const validationError = document.createElement('div');
            validationError.style.cssText = `
                font-size: 12px;
                color: #ff6b6b;
                display: none;
                margin-top: -4px;
                font-weight: 500;
            `;

            textContainer.appendChild(textLabel);
            textContainer.appendChild(promptsTip);
            textContainer.appendChild(textarea);
            textContainer.appendChild(validationError);
            formModal.appendChild(textContainer);

            // Submit button
            const submitBtn = document.createElement('button');
            submitBtn.textContent = 'Share Your Reflections →';
            submitBtn.style.cssText = `
                background: linear-gradient(135deg, rgba(196, 140, 80, 0.06), rgba(196, 140, 80, 0.15));
                border: 1px solid #c48c50;
                color: #e4a86a;
                padding: 16px;
                font-size: 12px;
                font-weight: 700;
                letter-spacing: 0.12em;
                border-radius: 30px;
                cursor: pointer;
                transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                margin-top: 10px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            `;
            submitBtn.addEventListener('mouseenter', () => {
                submitBtn.style.background = '#c48c50';
                submitBtn.style.color = '#0e0e0e';
                submitBtn.style.boxShadow = '0 6px 20px rgba(196, 140, 80, 0.2)';
                submitBtn.style.transform = 'translateY(-1px)';
            });
            submitBtn.addEventListener('mouseleave', () => {
                submitBtn.style.background = 'linear-gradient(135deg, rgba(196, 140, 80, 0.06), rgba(196, 140, 80, 0.15))';
                submitBtn.style.color = '#e4a86a';
                submitBtn.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
                submitBtn.style.transform = 'translateY(0)';
            });

            submitBtn.addEventListener('click', () => {
                const experience = select.value;
                const msg = textarea.value.trim();
                
                if (!msg) {
                    validationError.textContent = 'A reflection is required to proceed.';
                    validationError.style.display = 'block';
                    textarea.style.borderColor = '#ff6b6b';
                    textarea.style.boxShadow = '0 0 12px rgba(255, 107, 107, 0.2)';
                    
                    formModal.style.animation = 'none';
                    setTimeout(() => {
                        formModal.style.animation = 'formShake 0.4s ease';
                    }, 10);
                    return;
                }

                validationError.style.display = 'none';

                // Play attunement chime before sending
                playArpeggio([540, 720, 1080], '8n', 150);

                setTimeout(() => {
                    const subject = `HIA Reflection: ${experience}`;
                    const body = `Selected HIA Experience: ${experience}\n\nReflection/Dialogue:\n${msg}\n\n---\nSent from HDM Insights Academy Dialogue Portal`;
                    const mailtoUrl = `mailto:thoughts@thealienschool.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                    
                    window.location.href = mailtoUrl;

                    // Close form modal
                    formOverlay.style.opacity = '0';
                    formModal.style.transform = 'scale(0.92) translateY(15px)';
                    setTimeout(() => formOverlay.remove(), 500);
                }, 500);
            });

            formModal.appendChild(submitBtn);
            formOverlay.appendChild(formModal);
            document.body.appendChild(formOverlay);

            setTimeout(() => {
                formOverlay.style.opacity = '1';
                formModal.style.transform = 'scale(1) translateY(0)';
            }, 50);
        };

        // Pythagorean synth trigger
        const playHoverTone = (freq) => {
            if (window.Tone && this.toneReady) {
                try {
                    const synth = new window.Tone.Synth({
                        oscillator: { type: 'sine' },
                        envelope: { attack: 0.005, decay: 0.18, sustain: 0, release: 0.12 }
                    }).toDestination();
                    synth.volume.value = -20; // Soft and micro-tonal
                    synth.triggerAttackRelease(freq, '16n');
                } catch (e) {}
            }
        };

        portals.forEach(portal => {
            const card = document.createElement('a');
            card.href = portal.url;
            if (!portal.isForm) {
                card.target = '_blank';
                card.rel = 'noopener';
            }
            card.style.cssText = `
                display: flex;
                flex-direction: column;
                gap: 10px;
                padding: 21px;
                background: rgba(14, 14, 14, 0.4);
                border: 1px solid rgba(196, 140, 80, 0.15);
                border-radius: 8px;
                text-decoration: none;
                color: inherit;
                transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            `;
            
            card.addEventListener('mouseenter', () => {
                card.style.background = 'rgba(196, 140, 80, 0.05)';
                card.style.borderColor = 'rgba(196, 140, 80, 0.4)';
                card.style.transform = 'translateY(-2px)';
                playHoverTone(portal.freq);
            });
            card.addEventListener('mouseleave', () => {
                card.style.background = 'rgba(14, 14, 14, 0.4)';
                card.style.borderColor = 'rgba(196, 140, 80, 0.15)';
                card.style.transform = 'translateY(0)';
            });
            card.addEventListener('click', (e) => {
                if (portal.isForm) {
                    e.preventDefault();
                    showReflectionForm();
                }
            });

            const cardHeader = document.createElement('div');
            cardHeader.style.cssText = `
                display: flex;
                justify-content: space-between;
                align-items: center;
            `;

            const cardTitle = document.createElement('h4');
            cardTitle.textContent = portal.name;
            cardTitle.style.cssText = `
                font-size: 13px;
                font-weight: 600;
                color: #f0ead8;
                margin: 0;
                letter-spacing: 0.05em;
            `;

            const cardTag = document.createElement('span');
            cardTag.textContent = portal.label;
            cardTag.style.cssText = `
                font-size: 8px;
                font-weight: 700;
                letter-spacing: 0.12em;
                color: #c48c50;
                border: 1px solid rgba(196, 140, 80, 0.25);
                padding: 3px 8px;
                border-radius: 4px;
                background: rgba(196, 140, 80, 0.05);
            `;

            cardHeader.appendChild(cardTitle);
            cardHeader.appendChild(cardTag);

            const cardDesc = document.createElement('p');
            cardDesc.textContent = portal.desc;
            cardDesc.style.cssText = `
                font-size: 11px;
                line-height: 1.6;
                color: rgba(240, 234, 216, 0.6);
                margin: 0;
            `;

            card.appendChild(cardHeader);
            card.appendChild(cardDesc);
            grid.appendChild(card);
        });

        content.appendChild(grid);
        modal.appendChild(content);
        scrollWrapper.appendChild(modal);

        // --- Somatic Lesson Panel Setup ---
        const lessonPanel = document.createElement('div');
        lessonPanel.id = 'somatic-lesson-panel';
        lessonPanel.innerHTML = `
            <h3 style="color: #e4a86a; font-family: var(--font-display); font-size: clamp(18px, 2.8vw, 23px); margin: 0 0 20px 0; letter-spacing: 0.08em; font-weight: 700; border-bottom: 1px solid rgba(196, 140, 80, 0.25); padding-bottom: 18px; line-height: 1.3; text-shadow: 0 0 1px rgba(196, 140, 80, 0.8), 0 0 15px rgba(196, 140, 80, 0.35); text-align: center;">
                PHYLLOTAXIS<br>
                <span style="font-size: 10px; color: rgba(196, 140, 80, 0.6); display: block; margin: 6px 0; letter-spacing: 0.3em;">&bull;</span>
                THE GEOMETRY OF CONTACT
            </h3>
            <p style="font-size: 13px; line-height: 1.8; color: rgba(240, 234, 216, 0.85); margin: 0 0 20px 0; font-family: var(--font-display); font-weight: 300;">
                Phyllotaxis is the natural arrangement of seeds and leaves around a stem. Each node emerges at the Golden Angle (137.5&deg;), enabling spacing that prevents overlap and maximizes contact with the light.
            </p>
            <p style="font-size: 13px; line-height: 1.8; color: rgba(240, 234, 216, 0.95); margin: 0 0 24px 0; font-family: var(--font-display); font-weight: 300; border-left: 2px solid #c48c50; padding-left: 14px;">
                <strong>Somatic Lesson:</strong><br>
                Move your cursor slowly through the spiral. Rapid scanning disperses the field; a deliberate, interested pace integrates it. Contact matters.
            </p>
            <div style="background: rgba(0,0,0,0.35); border: 1px solid rgba(196, 140, 80, 0.15); border-radius: 8px; padding: 18px 21px; font-family: monospace; font-size: 11px; display: flex; flex-direction: column; gap: 10px;">
                <div style="display: flex; justify-content: space-between;">
                    <span style="color: rgba(196, 140, 80, 0.65); letter-spacing: 0.05em;">PACE STATUS:</span>
                    <span id="lesson-pace-status" style="font-weight: bold; color: #ff5555; letter-spacing: 0.05em;">FAST (SCANNING)</span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 6px; border-top: 1px solid rgba(196, 140, 80, 0.1); padding-top: 10px;">
                    <span style="color: rgba(196, 140, 80, 0.65); letter-spacing: 0.05em;">INTEGRATED INSIGHT:</span>
                    <span id="lesson-truth-display" style="color: rgba(240, 234, 216, 0.5); font-style: normal; line-height: 1.5; word-break: break-word; font-family: var(--font-display); font-size: 13px;">Move slowly to make contact with a node...</span>
                </div>
            </div>
        `;
        scrollWrapper.appendChild(lessonPanel);
        overlay.appendChild(scrollWrapper);
        document.body.appendChild(overlay);

        // Pacing & Contact Logic Variables (lexically scoped for access by animateParticles)
        let lastMoveTime = Date.now();
        let lastX = null;
        let lastY = null;
        let speed = 0;
        let currentPace = 'fast';
        let lastContactedIdx = -1;

        const educationalTruths = [
            "Contact precedes resonance. Growth demands an interested pace.",
            "The observer alters the field through presence. Slow inquiry integrates it.",
            "Spacing is the architecture of contact. Each seed maintains a right to the light.",
            "Attention is the currency of attunement. Real learning requires a settled focus instead of scan-scrolled urgency.",
            "Truth bends time. In the movement between seeking and growing, coordinates shift.",
            "Superposition collapses into relation. Active contact transforms potential into insight."
        ];

        const revealEducationalTruth = (idx) => {
            const display = document.getElementById('lesson-truth-display');
            if (display) {
                const truth = educationalTruths[idx % educationalTruths.length];
                display.textContent = truth;
                display.style.color = '#f0ead8';
                display.style.textShadow = '0 0 8px rgba(196, 140, 80, 0.4)';
            }
            
            if (window.Tone && this.toneReady) {
                try {
                    const pitches = [288, 324, 384, 432, 486, 576, 648];
                    const pitch = pitches[idx % pitches.length];
                    const synth = new window.Tone.Synth({
                        oscillator: { type: 'sine' },
                        envelope: { attack: 0.05, decay: 0.4, sustain: 0, release: 0.5 }
                    }).toDestination();
                    synth.volume.value = -18;
                    synth.triggerAttackRelease(pitch, '8n');
                } catch (e) {}
            }
        };

        const handlePaceTracking = (e) => {
            const now = Date.now();
            const dt = now - lastMoveTime || 1;
            
            if (lastX !== null && lastY !== null) {
                const dx = e.clientX - lastX;
                const dy = e.clientY - lastY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                speed = dist / dt;
            }
            
            lastMoveTime = now;
            lastX = e.clientX;
            lastY = e.clientY;
            
            const paceStatus = document.getElementById('lesson-pace-status');
            if (paceStatus) {
                if (speed < 0.25) {
                    currentPace = 'slow';
                    paceStatus.textContent = 'ATTUNED (SLOW)';
                    paceStatus.style.color = '#c48c50';
                } else {
                    currentPace = 'fast';
                    paceStatus.textContent = 'FAST (SCANNING)';
                    paceStatus.style.color = '#ff5555';
                }
            }
        };

        window.addEventListener('mousemove', handlePaceTracking);

        // Canvas Setup (Golden Phyllotaxis Spiral particles)
        const ctx = canvas.getContext('2d');
        const particles = [];
        const count = 45;
        this.isExploding = false;
        this.explosionProgress = 0;

        const initCanvas = () => {
            canvas.width = overlay.clientWidth;
            canvas.height = overlay.clientHeight;
            
            let centerX = canvas.width / 2;
            let centerY = canvas.height / 2;
            if (canvas.width >= 1100) {
                centerX = canvas.width * 0.72;
            }
            
            const GOLDEN_ANGLE = 2.3999632; // Golden Angle in rads
            const phiScale = 22; // Fibonacci scaling base
            
            particles.length = 0;
            for (let i = 0; i < count; i++) {
                const theta = i * GOLDEN_ANGLE;
                const r = phiScale * Math.sqrt(i + 1);
                const spawnX = centerX + r * Math.cos(theta);
                const spawnY = centerY + r * Math.sin(theta);
                
                particles.push({
                    x: spawnX,
                    y: spawnY,
                    baseX: spawnX,
                    baseY: spawnY,
                    vx: 0,
                    vy: 0,
                    size: 1.618 * (1 + (i % 3)), // Golden sizing
                    angle: Math.random() * Math.PI * 2,
                    speed: 0.1 + Math.random() * 0.15,
                    amplitude: 8 + Math.random() * 8
                });
            }
        };

        initCanvas();
        window.addEventListener('resize', initCanvas);

        // Dynamic particle animation loop
        const animateParticles = () => {
            if (!overlay.parentNode) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            let centerX = canvas.width / 2;
            let centerY = canvas.height / 2;
            if (canvas.width >= 1100) {
                centerX = canvas.width * 0.72;
            }
            
            const curMouseX = this.mouseX;
            const curMouseY = this.mouseY;

            if (this.isExploding) {
                this.explosionProgress += 0.04;
                particles.forEach(p => {
                    const dx = p.x - centerX;
                    const dy = p.y - centerY;
                    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                    p.x += (dx / dist) * 20;
                    p.y += (dy / dist) * 20;
                });
            } else {
                particles.forEach((p, idx) => {
                    p.angle += 0.008;
                    const driftX = Math.cos(p.angle) * p.speed * p.amplitude;
                    const driftY = Math.sin(p.angle) * p.speed * p.amplitude;
                    
                    let targetX = p.baseX + driftX;
                    let targetY = p.baseY + driftY;
                    
                    // Somatic Mouse repulsion vs attraction based on pacing
                    const dx = curMouseX - p.x;
                    const dy = curMouseY - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < 180) {
                        const force = (180 - dist) / 180;
                        if (currentPace === 'slow') {
                            // Slow pace attracts particles slightly (integration)
                            const forceX = (dx / dist) * force * 15;
                            const forceY = (dy / dist) * force * 15;
                            targetX += forceX;
                            targetY += forceY;
                        } else {
                            // Fast pace repels particles strongly (dispersion)
                            const forceX = (dx / dist) * force * 45;
                            const forceY = (dy / dist) * force * 45;
                            targetX -= forceX;
                            targetY -= forceY;
                        }
                    }
                    
                    p.vx += (targetX - p.x) * 0.04;
                    p.vy += (targetY - p.y) * 0.04;
                    p.vx *= 0.85;
                    p.vy *= 0.85;
                    p.x += p.vx;
                    p.y += p.vy;
                });
            }

            // Check for node contact when speed is attuned (slow)
            let contactedIdx = -1;
            if (!this.isExploding) {
                particles.forEach((p, idx) => {
                    const dx = curMouseX - p.x;
                    const dy = curMouseY - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 34) {
                        contactedIdx = idx;
                    }
                });
            }

            if (contactedIdx !== -1) {
                if (currentPace === 'slow') {
                    if (lastContactedIdx !== contactedIdx) {
                        lastContactedIdx = contactedIdx;
                        revealEducationalTruth(contactedIdx);
                    }
                }
            }

            // Draw floating Nodes
            particles.forEach((p, idx) => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                
                const isContacted = (idx === lastContactedIdx && currentPace === 'slow');
                if (isContacted) {
                    ctx.fillStyle = '#c48c50';
                    ctx.shadowColor = '#c48c50';
                    ctx.shadowBlur = 12;
                } else {
                    ctx.fillStyle = `rgba(196, 140, 80, ${this.isExploding ? Math.max(0, 0.4 - this.explosionProgress) : 0.45})`;
                    ctx.shadowBlur = 0;
                }
                ctx.fill();
            });
            ctx.shadowBlur = 0; // Reset blur

            // Draw dynamic Connections
            ctx.beginPath();
            ctx.strokeStyle = `rgba(196, 140, 80, ${this.isExploding ? Math.max(0, 0.08 - this.explosionProgress) : 0.08})`;
            ctx.lineWidth = 0.5;
            
            for (let i = 0; i < count; i++) {
                for (let j = i + 1; j < count; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < 89) { // Fibonacci threshold
                        const isEndpointsContacted = (currentPace === 'slow' && (i === lastContactedIdx || j === lastContactedIdx));
                        if (isEndpointsContacted) {
                            ctx.stroke(); // Stroke prior buffer
                            ctx.beginPath();
                            ctx.strokeStyle = 'rgba(196, 140, 80, 0.45)';
                            ctx.lineWidth = 1.2;
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.stroke();
                            
                            // Re-bind base style
                            ctx.beginPath();
                            ctx.strokeStyle = `rgba(196, 140, 80, ${this.isExploding ? Math.max(0, 0.08 - this.explosionProgress) : 0.08})`;
                            ctx.lineWidth = 0.5;
                        } else {
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                        }
                    }
                }
            }
            ctx.stroke();
            requestAnimationFrame(animateParticles);
        };

        requestAnimationFrame(animateParticles);

        // Parallax Interaction Binding (moving the canvas, modal, and lessonPanel inside the scrollwrapper)
        const handleParallax = (e) => {
            const offsetX = e.clientX - window.innerWidth / 2;
            const offsetY = e.clientY - window.innerHeight / 2;
            
            canvas.style.transform = `translate(${offsetX * 0.04}px, ${offsetY * 0.04}px)`;
            modal.style.transform = `translate(${offsetX * -0.01}px, ${offsetY * -0.01}px) scale(1)`;
            lessonPanel.style.transform = `translate(${offsetX * -0.01}px, ${offsetY * -0.01}px) scale(1)`;
        };

        window.addEventListener('mousemove', handleParallax);

        setTimeout(() => {
            overlay.style.opacity = '1';
            modal.style.transform = 'translate(0px, 0px) scale(1)';
            lessonPanel.style.transform = 'translate(0px, 0px) scale(1)';
        }, 50);

        this._escListener = (e) => {
            if (e.key === 'Escape' && !options.isEntryGate) {
                this.hideReciprocalDialogue();
            }
        };
        document.addEventListener('keydown', this._escListener);

        const handleOverlayClick = (e) => {
            if (e.target === scrollWrapper && !options.isEntryGate) {
                this.hideReciprocalDialogue();
            }
        };
        scrollWrapper.addEventListener('click', handleOverlayClick);

        // Teardown listener registration for dynamic cleanup
        this._dialogueTeardown = () => {
            window.removeEventListener('resize', initCanvas);
            window.removeEventListener('mousemove', handleParallax);
            window.removeEventListener('mousemove', handlePaceTracking);
            scrollWrapper.removeEventListener('click', handleOverlayClick);
        };
    }

    hideReciprocalDialogue() {
        const overlay = document.getElementById('reciprocal-dialogue-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
            const modal = overlay.querySelector('#reciprocal-dialogue-scroll-wrapper > div');
            if (modal) {
                modal.style.transform = 'scale(0.93)';
            }
            if (this._dialogueTeardown) {
                this._dialogueTeardown();
                this._dialogueTeardown = null;
            }
            setTimeout(() => {
                overlay.remove();
            }, 600);
        }
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        if (this._escListener) {
            document.removeEventListener('keydown', this._escListener);
            this._escListener = null;
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
