// Ecosystem Root (app.js)
// Responsible for initializing the global Audio Context, orchestrating PJAX state transitions,
// and preserving liveness across the different explorers.

class EcosystemApp {
    constructor() {
        this.audioCtx = null;
        this.cache = new Map();
        this.supabase = null;
        
        // Ensure Tone.js is ready if included via script tag globally
        this.toneReady = false;
        this.audioUnlocked = false;

        this.initPjax();
        this.initSupabase();
        console.log(":: Ecosystem Root Initialized");

        // Bind global audio unlock properly to the first synchronous touch
        const unlockAudio = () => {
            if(!this.audioUnlocked) {
                this.audioUnlocked = true;
                this.ensureAudioReady();
            }
            document.removeEventListener('pointerdown', unlockAudio);
            document.removeEventListener('keydown', unlockAudio);
        };
        document.addEventListener('pointerdown', unlockAudio);
        document.addEventListener('keydown', unlockAudio);
        
        // Wait for DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.createPingRadar();
                document.body.classList.add('is-loaded');
            });
        } else {
            this.createPingRadar();
            document.body.classList.add('is-loaded');
        }
    }

    async initSupabase() {
        // [ REPLACE THESE WITH YOUR KEYS FROM THE SUPABASE DASHBOARD ]
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
        } catch(e) {
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

        // 3. Tactile Golden Chime - Attuned to harmonic mathematical geometry
        this.hoverChime = new Tone.FMSynth({
            harmonicity: 2, // Perfect octave modulation
            modulationIndex: 2.5, // Gentle shimmer, not harsh ringing
            oscillator: { type: "sine" },
            envelope: { attack: 0.015, decay: 0.4, sustain: 0.1, release: 1.2 },
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

        // Mathematical shifts in register based on instrument context
        if (path.includes('phase-state')) {
            targetFreq = 216; // Perfect 5th below 288
        } else if (path.includes('resonance-library')) {
            targetFreq = 432; // Perfect 5th above 288
        } else if (path.includes('dodecahedron')) {
            targetFreq = 360; // Major 3rd above 288 (Golden resonance)
        } else if (path.includes('phi-explorer')) {
            targetFreq = 144 * 1.6180339; // phi frequency (approx 233Hz)
        } else if (path.includes('stoneware-builder')) {
            targetFreq = 180; // Major 3rd (Tactile and grounded)
        } else if (path.includes('conscious-pause')) {
            targetFreq = 144; // Merges exactly into the drone
        } else if (path.includes('crossover') || path.includes('capstones')) {
            targetFreq = 576; // Double octave (Synthesis/Overview)
        }

        // Smoothly glide to the new resonance register over 1.5 seconds
        this.hoverChime.frequency.rampTo(targetFreq, 1.5);
    }

    bindGlobalSonics() {
        if (!this.toneReady) return;
        if (this.delegationBound) return; // Only process once globally!

        const INTERACTIVES = 'a, button, input, select, [role="button"], .explorer-card, .equation-block, .cycler-btn, .audio-trigger, .control-btn, .lens-select, .resonance-link';

        // Global Event Delegation natively supports PJAX page swaps
        document.body.addEventListener('mouseover', (e) => {
            if (e.target.closest(INTERACTIVES)) {
                // Read current frequency from the synth, giving life to the note
                const currentFreq = this.hoverChime ? this.hoverChime.frequency.value : "C4";
                if(this.hoverChime) this.hoverChime.triggerAttackRelease(currentFreq, "4n");
                if(this.globalFilterLFO) this.globalFilterLFO.max = 500;
                if(this.globalDrone) this.globalDrone.volume.rampTo(-30, 0.5);
            }
        });

        document.body.addEventListener('mouseout', (e) => {
            if (e.target.closest(INTERACTIVES)) {
                if(this.globalFilterLFO) this.globalFilterLFO.max = 300;
                if(this.globalDrone) this.globalDrone.volume.rampTo(-34, 2);
            }
        });

        document.body.addEventListener('mousedown', (e) => {
            if (e.target.closest(INTERACTIVES)) {
                if(this.navPing) this.navPing.triggerAttackRelease("C2", "8n");
                if(this.globalFilter) {
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
                
                // Debounce the release so it glides smoothly and only fades when adjustment completely ceases
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
    // Surfaces during PJAX transitions: a breathing radial field and the
    // phrase [ TUNING RESONANCE ] — communicating intentional pause, not lag.

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

        // Trigger visible state on next frame so CSS transition fires
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
                // Handle local hash links normally
                if (url.pathname === window.location.pathname && url.hash) return;
                
                e.preventDefault();
                this.navigateTo(url.href);
            }
        });

        // Handle back/forward buttons
        window.addEventListener("popstate", (e) => {
            this.navigateTo(window.location.href, true);
        });
    }

    async navigateTo(url, isPopState = false) {
        // ── NAVIGATION LOCK ─────────────────────────────────────────────────────
        // Rapid-click guard: ignore additional requests while a pause is executing.
        if (this.transitioning) return;
        this.transitioning = true;

        // ── CONSCIOUS PAUSE ─────────────────────────────────────────────────────
        // Show breathing overlay — user knows this is intentional, not a broken load.
        this.showConsciousPause();

        // Swell the drone into the silence
        if (this.globalDrone) this.globalDrone.volume.rampTo(-28, 1);

        // Fade current page content
        document.body.style.transition = 'opacity 0.7s ease-out';
        document.body.style.opacity = '0';

        // Fetch new content AND hold minimum pause in parallel
        try {
            const results = await Promise.all([
                // Fetch (resolves instantly on cache hit)
                (async () => {
                    if (this.cache.has(url)) return this.cache.get(url);
                    const response = await fetch(url);
                    if (!response.ok) throw new Error(`HTTP ${response.status}`);
                    const text = await response.text();
                    this.cache.set(url, text);
                    return text;
                })(),
                // Minimum pause duration — the space for breath
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
        // Parse the new HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Sync head tags: styles, CSS links, AND external scripts (Three.js, GSAP, etc.)
        const headNodes = Array.from(doc.head.children);

        // Load CSS intelligently: sweep old CSS out, bring new CSS in
        // Protect Google Fonts to prevent jitter, protect global PING radar style
        Array.from(document.head.querySelectorAll('style, link[rel="stylesheet"]')).forEach(el => {
            if (el.id === 'ping-radar-style') return;
            if (el.href && el.href.includes("fonts")) return;
            el.remove();
        });

        headNodes.forEach(node => {
            if (node.tagName === 'STYLE' || (node.tagName === 'LINK' && node.rel === 'stylesheet')) {
                if (node.href && node.href.includes("fonts")) return; // already protected
                document.head.appendChild(node.cloneNode(true));
            }
        });

        // Load external head scripts in order — ensures Three.js, GSAP, Tone.js
        // are available before body scripts run
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
        if (doc.body.id) document.body.id = doc.body.id;
        else document.body.removeAttribute('id');
        
        // Reset volatile inline styles to prevent cross-portal contamination
        document.body.style.backgroundColor = '';
        document.body.style.color = '';
        document.body.style.backgroundImage = '';
        
        document.body.innerHTML = doc.body.innerHTML;

        // Re-inject the global Ping Radar
        this.createPingRadar();

        // Re-execute body scripts in document order, awaiting each external
        // script before proceeding — ensures Three.js/GSAP are defined before
        // inline scenes try to use them
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
                newScript.textContent = oldScript.textContent;
                document.body.appendChild(newScript);
            }
        }

        // Trigger resize and scroll restoration
        window.scrollTo(0, 0);

        // Dismiss the Conscious Pause overlay
        this.hideConsciousPause();

        // Fade new page in, bring drone back to resting resonance
        setTimeout(() => {
            document.body.classList.add('is-loaded');
            document.body.style.transition = 'opacity 1s ease-in';
            document.body.style.opacity = '1';
            if (this.globalDrone) this.globalDrone.volume.rampTo(-34, 2);
            // Release navigation lock after fade completes
            setTimeout(() => { this.transitioning = false; }, 1000);
        }, 100);

        // Emit an event so specific pages (like explorers) know they just loaded via PJAX
        document.dispatchEvent(new Event("hdm:page-loaded"));
        this.tuneAcousticChamber(); // Harmonize the chamber to the new path
        
        // Re-bind the guardrails if they exist on the newly loaded page
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
        radar.style.left = '30px'; // Move to left to stay out of the way of scrollbars and right-side controls
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
                    0%   { transform: scale(0.3); opacity: 0.8; }
                    80%  { transform: scale(3.5); opacity: 0; }
                    100% { transform: scale(3.5); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(radar);
    }
}

// Instantiate globally
window.hdmApp = new EcosystemApp();
