// Ecosystem Root (app.js)
// Responsible for initializing the global Audio Context, orchestrating PJAX state transitions,
// and preserving liveness across the different explorers.

class EcosystemApp {
    constructor() {
        this.audioCtx = null;
        this.cache = new Map();
        
        // Ensure Tone.js is ready if included via script tag globally
        this.toneReady = false;
        this.audioUnlocked = false;

        this.initPjax();
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

        this.delegationBound = true;
    }

    initPjax() {
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
        // Fade out body
        document.body.style.transition = 'opacity 0.4s ease-out';
        document.body.style.opacity = '0';

        // Fetch new content
        try {
            let html = "";
            if (this.cache.has(url)) {
                html = this.cache.get(url);
            } else {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                html = await response.text();
                this.cache.set(url, html);
            }

            // Update URL without reloading if this wasn't a back/forward action
            if (!isPopState) {
                window.history.pushState(null, "", url);
            }

            this.injectNewPage(html);
        } catch (err) {
            console.error("PJAX Error:", err);
            // Fallback to traditional navigation
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
        
        // Wait briefly for scripts to parse before fading back in
        setTimeout(() => {
            document.body.classList.add('is-loaded');
            document.body.style.opacity = '1';
        }, 100);

        // Emit an event so specific pages (like explorers) know they just loaded via PJAX
        document.dispatchEvent(new Event("hdm:page-loaded"));
        this.tuneAcousticChamber(); // Harmonize the chamber to the new path
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
