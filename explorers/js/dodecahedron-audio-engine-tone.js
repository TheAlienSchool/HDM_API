/**
 * Dodecahedron Audio Engine — Tone.js Edition
 * ═══════════════════════════════════════════════════════════════
 * 
 * Element-based polyphonic voice system with kinetic snaps and biotexture.
 * Earth · Water · Fire · Air · Ether
 * 
 * Five distinct consciousness archetypes, each with:
 *  - Base oscillator (uniquely tuned)
 *  - Harmonic layers (2-3 overtones per voice)
 *  - Kinetic snap (percussive attack or transient)
 *  - Biotexture layer (noise modulation, organic quality)
 *  - Ghost echoes (probabilistic delays to other faces)
 *  - Stereo positioning and frequency detune
 */

class DodecahedronAudioEngineTone {
    constructor(options = {}) {
        this.initialized = false;
        this.soundEnabled = true;

        // Element voice profile definitions (immutable sonic specs)
        this.ELEMENT_VOICE_PROFILES = {
            Earth: {
                base: { osc: 'triangle', gain: 0.024, attack: 0.040, decay: 0.350, detuneCents: 12, wet: 0.45 },
                harmonics: [
                    { interval: -12, gain: 0.18, osc: 'sine', decayMult: 2.2 },
                    { interval: 7, gain: 0.10, osc: 'triangle', decayMult: 1.4 }
                ],
                biotexture: { enabled: true, type: 'brown', filterType: 'lowpass', filterCutoff: 120, gain: 0.012, modulationHz: 0.1 },
                kineticSnap: { enabled: true, osc: 'square', durationMs: 15, startFreq: 400, endFreq: 80, gain: 0.035 }
            },
            Fire: {
                base: { osc: 'sine', gain: 0.018, attack: 0.035, decay: 0.240, detuneCents: 18, wet: 0.60 },
                biotexture: { enabled: true, type: 'white', filterType: 'bandpass', filterCutoff: 2500, gain: 0.008, modulationHz: 8.0 },
                kineticSnap: { enabled: true, osc: 'white-noise', durationMs: 8, gain: 0.045 }
            },
            Water: {
                base: { osc: 'sine', gain: 0.022, attack: 0.015, decay: 0.280, detuneCents: 4, wet: 0.85 },
                biotexture: { enabled: false },
                kineticSnap: { enabled: true, osc: 'sine', durationMs: 25, startFreq: 2500, endFreq: 400, gain: 0.040 }
            },
            Air: {
                base: { osc: 'sine', gain: 0.018, attack: 0.080, decay: 0.450, detuneCents: 24, wet: 0.72 },
                biotexture: { enabled: true, type: 'pink', filterType: 'highpass', filterCutoff: 4000, gain: 0.005, modulationHz: 0.05 },
                kineticSnap: { enabled: false },
                ghostChance: 0.65, ghostStepOffset: 4, ghostDelayMs: 85
            },
            Ether: {
                base: { osc: 'sine', gain: 0.022, attack: 0.035, decay: 0.600, detuneCents: 30, wet: 0.95 },
                harmonics: [
                    { interval: 12, gain: 0.12, osc: 'sine', decayMult: 2.0 },
                    { interval: -24, gain: 0.20, osc: 'sine', decayMult: 3.0 }
                ],
                biotexture: { enabled: true, type: 'brown', filterType: 'bandpass', filterCutoff: 432, gain: 0.010, modulationHz: 4.0 },
                kineticSnap: { enabled: true, osc: 'triangle', durationMs: 40, startFreq: 8000, endFreq: 8000, gain: 0.025 },
                ghostChance: 0.85, ghostStepOffset: 7, ghostDelayMs: 110
            }
        };

        // Face-to-element mapping
        this.FACE_ELEMENTS = [
            'Earth',  // Face 1
            'Water',  // Face 2
            'Fire',   // Face 3
            'Air',    // Face 4
            'Earth',  // Face 5
            'Water',  // Face 6
            'Fire',   // Face 7
            'Air',    // Face 8
            'Ether',  // Face 9
            'Fire',   // Face 10
            'Water',  // Face 11
            'Ether',  // Face 12
        ];

        // Master output
        this.masterGain = null;
        this.mainMix = null;

        // Tone.js synth pool
        this.synths = [];
        this.noiseFilters = {};
        this.activeBiotextureNodes = {};
        this.lastToneTime = 0;
    }

    /**
     * Initialize Tone.js context and create output chain
     */
    async initialize() {
        if (this.initialized) return;

        await Tone.start();

        // Master output chain
        this.mainMix = new Tone.Gain(1);
        this.masterGain = new Tone.Gain(0.2);
        this.mainMix.connect(this.masterGain);
        this.masterGain.toDestination();

        this.initialized = true;
    }

    /**
     * Calculate frequency from interval (semitones)
     */
    getFreqFromInterval(baseFreq, semitones) {
        return baseFreq * Math.pow(2, semitones / 12);
    }

    /**
     * Play a single oscillator with envelope
     */
    playOscillator(type, startFreq, gain, attack, decay, detuneCents, wet, isGhost = false) {
        const synth = new Tone.Synth({
            oscillator: { type },
            envelope: {
                attack,
                decay,
                sustain: 0,
                release: 0.05
            }
        });

        // Apply detune if specified
        if (detuneCents) {
            synth.oscillator.detune.value = detuneCents;
        }

        // Connect to output
        synth.connect(this.mainMix);

        // Trigger with scaled gain
        const scaledGain = isGhost ? gain * 0.4 : gain;
        const now = Tone.now();

        synth.volume.value = Tone.Decibels.toDb(scaledGain * wet);
        synth.triggerAttackRelease(startFreq, `${decay}s`, now);

        // Store for cleanup if needed
        this.synths.push(synth);

        return synth;
    }

    /**
     * Create kinetic snap (percussive attack)
     */
    playKineticSnap(element, baseFreq, isGhost = false) {
        const snap = this.ELEMENT_VOICE_PROFILES[element]?.kineticSnap;
        if (!snap || !snap.enabled) return;

        const duration = snap.durationMs / 1000;
        const now = Tone.now();

        if (snap.osc === 'white-noise') {
            // White noise snap
            const noise = new Tone.Synth({
                oscillator: { type: 'sine' },
                envelope: { attack: 0.005, decay: duration, sustain: 0, release: 0.01 }
            });
            noise.connect(this.mainMix);
            noise.volume.value = Tone.Decibels.toDb(snap.gain * 0.4);
            noise.triggerAttackRelease(baseFreq * 4, `${duration}s`, now); // Pitched white noise approximation
            this.synths.push(noise);
        } else {
            // Oscillator sweep
            const sweeper = new Tone.Synth({
                oscillator: { type: snap.osc },
                envelope: { attack: 0.005, decay: duration, sustain: 0, release: 0.01 }
            });
            sweeper.connect(this.mainMix);
            sweeper.volume.value = Tone.Decibels.toDb(snap.gain * (isGhost ? 0.3 : 1));

            // Frequency sweep from startFreq to endFreq
            const startFreq = snap.startFreq || baseFreq;
            const endFreq = snap.endFreq || baseFreq;

            sweeper.frequency.setValueAtTime(startFreq, now);
            sweeper.frequency.exponentialRampToValueAtTime(endFreq, now + duration);
            sweeper.triggerAttack(now);
            sweeper.triggerRelease(now + duration);

            this.synths.push(sweeper);
        }
    }

    /**
     * Play audio stack for a face (base + harmonics + snap + biotexture management)
     */
    async playAudioStack(faceNum, isGhost = false) {
        if (!this.soundEnabled) return;

        const now = performance.now();
        if (now - this.lastToneTime < 120) return; // Throttle
        this.lastToneTime = now;

        await this.initialize();

        const element = this.FACE_ELEMENTS[faceNum - 1] || 'Earth';
        const profile = this.ELEMENT_VOICE_PROFILES[element];
        const faceData = window.faceData?.[faceNum] || { freq: 440 };
        const baseFreq = faceData.freq || 440;

        // Fade biotexture to this element
        this.fadeToBiotexture(element);

        // Play kinetic snap (if enabled)
        this.playKineticSnap(element, baseFreq, isGhost);

        // Play base oscillator
        const baseDef = profile.base;
        this.playOscillator(
            baseDef.osc,
            baseFreq,
            baseDef.gain,
            baseDef.attack,
            baseDef.decay,
            baseDef.detuneCents,
            baseDef.wet,
            isGhost
        );

        // Play harmonics if defined
        if (profile.harmonics) {
            for (const harmonic of profile.harmonics) {
                const harmonicFreq = this.getFreqFromInterval(baseFreq, harmonic.interval);
                this.playOscillator(
                    harmonic.osc,
                    harmonicFreq,
                    harmonic.gain,
                    baseDef.attack,
                    baseDef.decay * harmonic.decayMult,
                    0,
                    baseDef.wet,
                    isGhost
                );
            }
        }

        // Ghost echo (probabilistic delayed note on another face)
        if (!isGhost && profile.ghostChance && Math.random() < profile.ghostChance) {
            const ghostDelayMs = profile.ghostDelayMs || 85;
            setTimeout(() => {
                const stepOffset = profile.ghostStepOffset || 4;
                const nextFace = ((faceNum - 1 + stepOffset) % 12) + 1;
                this.playAudioStack(nextFace, true);
            }, ghostDelayMs);
        }
    }

    /**
     * Fade biotexture (noise) layer to a specific element
     */
    fadeToBiotexture(elementName) {
        if (!this.soundEnabled || !this.mainMix) return;

        // Fade out all other elements
        for (const [el, gain] of Object.entries(this.activeBiotextureNodes)) {
            if (el !== elementName) {
                gain.gain.rampTo(0, 0.5);
            }
        }

        // Fade in target element if biotexture enabled
        if (elementName) {
            const profile = this.ELEMENT_VOICE_PROFILES[elementName];
            if (profile.biotexture && profile.biotexture.enabled) {
                if (!this.activeBiotextureNodes[elementName]) {
                    // Create noise source for this element
                    const noise = new Tone.Noise('white');
                    const filter = new Tone.Filter({
                        type: profile.biotexture.filterType || 'lowpass',
                        frequency: profile.biotexture.filterCutoff || 1000
                    });
                    const gain = new Tone.Gain(0);

                    noise.connect(filter);
                    filter.connect(gain);
                    gain.connect(this.mainMix);

                    noise.start();

                    this.activeBiotextureNodes[elementName] = { gain, noise, filter };
                }

                const node = this.activeBiotextureNodes[elementName];
                const targetGain = profile.biotexture.gain || 0.01;
                node.gain.gain.rampTo(targetGain, 0.5);

                // Optional: LFO modulation on cutoff frequency
                if (profile.biotexture.modulationHz) {
                    // Simple tremolo via gain modulation
                    const lfo = new Tone.LFO(profile.biotexture.modulationHz, 0.5, 1.0);
                    lfo.connect(node.gain.gain);
                    lfo.start();
                }
            }
        }
    }

    /**
     * Ensure audio context is active (user interaction required)
     */
    ensureAudio() {
        if (!this.initialized) {
            this.initialize();
        }
    }

    /**
     * Play a face tone (main entry point)
     */
    async playFaceTone(faceNum) {
        await this.playAudioStack(faceNum, false);
    }

    /**
     * Silence all active notes
     */
    silence() {
        for (const synth of this.synths) {
            synth.triggerRelease();
        }
        this.synths = [];

        for (const node of Object.values(this.activeBiotextureNodes)) {
            if (node.noise) node.noise.stop();
            if (node.gain) node.gain.dispose();
            if (node.filter) node.filter.dispose();
        }
        this.activeBiotextureNodes = {};
    }

    /**
     * Dispose all Tone.js nodes (cleanup)
     */
    dispose() {
        this.silence();

        if (this.masterGain) this.masterGain.dispose();
        if (this.mainMix) this.mainMix.dispose();

        this.initialized = false;
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DodecahedronAudioEngineTone;
}
