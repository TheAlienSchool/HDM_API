/**
 * Sonification Engine — Tone.js Edition
 * ═══════════════════════════════════════════════════════════════
 * 
 * Transforms resonance metrics into audible frequencies and tonal qualities.
 * Mathematics → Frequencies → Human Ear → Felt Understanding
 * 
 * Principle: The nervous system learns through vibration.
 * High alignment = harmonic (consonant) sound
 * Low alignment = dissonant (tritone) sound
 * 
 * Features:
 *  - Real-time frequency modulation following alignment
 *  - Harmonic vs. dissonant quality based on phase
 *  - Biotexture layer (LFO jitter, organic qualities)
 *  - Stereo separation (practitioner L, client R)
 *  - Fade-in/fade-out (no electronic clicks)
 *  - Tone.js architecture (automatic memory management, Transport integration)
 */

class SonificationEngineTone {
    constructor(options = {}) {
        // Initialization flag
        this.initialized = false;
        this.isPlaying = false;

        // Core parameters
        this.masterVolume = options.masterVolume || 0.15;
        this.baseFrequency = options.baseFrequency || 110;
        this.frequencyMultiplier = options.frequencyMultiplier || 4;
        this.biotextureAmount = options.biotextureAmount || 0.05;
        this.biotextureFrequency = options.biotextureFrequency || 3.5;

        // State
        this.currentAlignment = 0;
        this.practitionerFreqTarget = this.baseFrequency;
        this.clientFreqTarget = this.baseFrequency * 1.5;

        // Overtone configuration
        this.overtoneActive = options.overtoneActive !== false;

        // Tone.js containers (initialized on first start)
        this.synths = {};
        this.lfos = {};
        this.panners = {};
        this.masterGain = null;
        this.mainMix = null;

        // Flag to trigger initialization on first note
        this.initPromise = null;
    }

    /**
     * Initialize Tone.js elements (lazy initialization)
     */
    async initialize() {
        if (this.initialized) return;

        // Start Tone.js context
        await Tone.start();

        // Master output chain
        this.masterGain = new Tone.Gain(this.masterVolume);
        this.mainMix = new Tone.Gain(1);
        this.mainMix.connect(this.masterGain);
        this.masterGain.toDestination();

        // ═══════════════════════════════════════════════════════════════
        // PRACTITIONER VOICE (Left Channel)
        // ═══════════════════════════════════════════════════════════════
        this.synths.practitioner = new Tone.Synth({
            oscillator: { type: 'sine' },
            envelope: {
                attack: 0.05,
                decay: 0.1,
                sustain: 0.5,
                release: 0.2
            }
        });

        this.panners.practitioner = new Tone.Panner(-0.7);
        this.synths.practitioner.connect(this.panners.practitioner);
        this.panners.practitioner.connect(this.mainMix);

        // ═══════════════════════════════════════════════════════════════
        // CLIENT VOICE (Right Channel)
        // ═══════════════════════════════════════════════════════════════
        this.synths.client = new Tone.Synth({
            oscillator: { type: 'sine' },
            envelope: {
                attack: 0.05,
                decay: 0.1,
                sustain: 0.5,
                release: 0.2
            }
        });

        this.panners.client = new Tone.Panner(0.7);
        this.synths.client.connect(this.panners.client);
        this.panners.client.connect(this.mainMix);

        // ═══════════════════════════════════════════════════════════════
        // BIOTEXTURE LFO LAYER (Tremolo + Frequency Modulation)
        // ═══════════════════════════════════════════════════════════════
        this.lfos.biotexture = new Tone.LFO({
            frequency: this.biotextureFrequency,
            min: -this.biotextureAmount * 50,
            max: this.biotextureAmount * 50,
            phase: Math.random() * 360
        });

        this.lfos.biotexture.start();
        this.lfos.biotexture.connect(this.synths.practitioner.frequency);
        this.lfos.biotexture.connect(this.synths.client.frequency);

        // ═══════════════════════════════════════════════════════════════
        // OVERTONE LAYER
        // ═══════════════════════════════════════════════════════════════
        this.overtones = [];
        if (this.overtoneActive) {
            this.setupOvertones();
        }

        this.initialized = true;
    }

    /**
     * Setup harmonic overtone layer (using Synth nodes)
     */
    setupOvertones() {
        // Create 3 harmonic layers at 2x, 3x, and 4x the base frequency
        for (let i = 0; i < 3; i++) {
            const harmonicMultiplier = i + 2;

            const synth = new Tone.Synth({
                oscillator: { type: 'sine' },
                envelope: {
                    attack: 0.05,
                    decay: 0.15,
                    sustain: 0.3,
                    release: 0.2
                }
            });

            const panner = new Tone.Panner(0); // Center
            synth.connect(panner);
            panner.connect(this.mainMix);

            this.overtones.push({
                synth,
                panner,
                harmonicMultiplier,
                isPlaying: false
            });
        }
    }

    /**
     * Start sonification (continuous mode with sustain)
     */
    async start() {
        if (this.isPlaying) return this;

        await this.initialize();

        this.isPlaying = true;

        // Trigger synthesis at current target frequencies
        const now = Tone.now();
        this.synths.practitioner.triggerAttack(this.practitionerFreqTarget, now);
        this.synths.client.triggerAttack(this.clientFreqTarget, now);

        // Start overtones if enabled
        if (this.overtoneActive) {
            for (const overtone of this.overtones) {
                const harmFreq = this.practitionerFreqTarget * overtone.harmonicMultiplier;
                overtone.synth.triggerAttack(harmFreq, now);
                overtone.isPlaying = true;
            }
        }

        // Fade in master gain over 500ms
        this.masterGain.gain.rampTo(this.masterVolume, 0.5);

        return this;
    }

    /**
     * Stop sonification (release all voices)
     */
    stop() {
        if (!this.isPlaying) return this;

        this.isPlaying = false;

        const now = Tone.now();

        // Release all voices
        this.synths.practitioner.triggerRelease(now);
        this.synths.client.triggerRelease(now);

        if (this.overtoneActive) {
            for (const overtone of this.overtones) {
                if (overtone.isPlaying) {
                    overtone.synth.triggerRelease(now);
                    overtone.isPlaying = false;
                }
            }
        }

        // Fade out master gain over 300ms
        this.masterGain.gain.rampTo(0, 0.3);

        return this;
    }

    /**
     * Update with alignment score
     * Alignment ranges from -1 (dissonant) to +1 (consonant)
     */
    updateAlignment(alignment) {
        if (!this.isPlaying) return this;

        this.currentAlignment = alignment;
        const normalized = (alignment + 1) / 2; // 0..1

        // ═══════════════════════════════════════════════════════════════
        // FREQUENCY MAPPING: Alignment → Consonance/Dissonance
        // ═══════════════════════════════════════════════════════════════

        // Base frequency follows alignment exponentially
        const freqA = this.baseFrequency * Math.pow(normalized + 0.5, 2);

        // Interval selection based on alignment state
        const intervalsConsonant = [1.0, 1.125, 1.25, 1.33, 1.5, 1.67, 2.0];
        const intervalsDissonant = [1.0, 1.09, 1.22, 1.41, 1.6, 1.78]; // Tritone ≈ 1.41

        let freqB;

        if (alignment > 0.3) {
            // CONSONANT territory: harmonic intervals
            const intervalIndex = Math.floor(normalized * intervalsConsonant.length) % intervalsConsonant.length;
            const interval = intervalsConsonant[intervalIndex];
            freqB = freqA * interval;
        } else {
            // DISSONANT territory: tritone and dissonant intervals
            const dissonanceIntensity = Math.max(0, 1 - normalized);
            const intervalIndex = Math.floor(dissonanceIntensity * intervalsDissonant.length) % intervalsDissonant.length;
            const interval = intervalsDissonant[intervalIndex];
            freqB = freqA * interval;
        }

        this.practitionerFreqTarget = freqA;
        this.clientFreqTarget = freqB;

        // ═══════════════════════════════════════════════════════════════
        // SMOOTH FREQUENCY TRANSITIONS (100ms ramp)
        // ═══════════════════════════════════════════════════════════════

        const rampTime = 0.1;
        const now = Tone.now();

        this.synths.practitioner.frequency.rampTo(freqA, rampTime);
        this.synths.client.frequency.rampTo(freqB, rampTime);

        // ═══════════════════════════════════════════════════════════════
        // BIOTEXTURE MODULATION: Intensity follows dissonance
        // ═══════════════════════════════════════════════════════════════

        const biotextureIntensity = Math.abs(alignment) < 0.3 ? 1 : 0.3;
        const biotextureAmount = this.biotextureAmount * biotextureIntensity;

        // Update LFO depth dynamically
        if (this.lfos.biotexture) {
            this.lfos.biotexture.min = -biotextureAmount * 50;
            this.lfos.biotexture.max = biotextureAmount * 50;
        }

        // ═══════════════════════════════════════════════════════════════
        // OVERTONE UPDATES
        // ═══════════════════════════════════════════════════════════════

        if (this.overtoneActive) {
            for (const overtone of this.overtones) {
                const harmonicGain = Math.max(0, 1 - Math.abs(alignment)) * 0.08;
                const harmonicFreq = freqA * overtone.harmonicMultiplier;

                // Update frequency with smooth ramp
                overtone.synth.frequency.rampTo(harmonicFreq, rampTime);

                // Update gain via envelope sustain level
                overtone.synth.envelope.sustain = harmonicGain;
            }
        }

        return this;
    }

    /**
     * Get current playback frequency (for display)
     */
    getCurrentFrequency() {
        return {
            practitioner: this.practitionerFreqTarget.toFixed(1),
            client: this.clientFreqTarget.toFixed(1),
            interval: (this.clientFreqTarget / this.practitionerFreqTarget).toFixed(3),
        };
    }

    /**
     * Emergency silencer
     */
    silence() {
        const now = Tone.now();

        this.synths.practitioner.triggerRelease(now);
        this.synths.client.triggerRelease(now);

        if (this.overtoneActive) {
            for (const overtone of this.overtones) {
                if (overtone.isPlaying) {
                    overtone.synth.triggerRelease(now);
                    overtone.isPlaying = false;
                }
            }
        }

        this.masterGain.gain.value = 0;
        this.isPlaying = false;
        return this;
    }

    /**
     * Get quality assessment (debugging)
     */
    getQuality() {
        return {
            alignment: this.currentAlignment.toFixed(3),
            practitionerFreq: this.practitionerFreqTarget.toFixed(1),
            clientFreq: this.clientFreqTarget.toFixed(1),
            interval: (this.clientFreqTarget / this.practitionerFreqTarget).toFixed(3),
            biotextureAmount: this.biotextureAmount.toFixed(3),
            isPlaying: this.isPlaying,
            audioContextState: Tone.getContext().state,
            initialized: this.initialized
        };
    }

    /**
     * Dispose of all Tone.js nodes (cleanup)
     */
    dispose() {
        if (this.synths.practitioner) this.synths.practitioner.dispose();
        if (this.synths.client) this.synths.client.dispose();

        if (this.lfos.biotexture) this.lfos.biotexture.dispose();

        if (this.overtoneActive) {
            for (const overtone of this.overtones) {
                if (overtone.synth) overtone.synth.dispose();
                if (overtone.panner) overtone.panner.dispose();
            }
        }

        if (this.panners.practitioner) this.panners.practitioner.dispose();
        if (this.panners.client) this.panners.client.dispose();

        if (this.mainMix) this.mainMix.dispose();
        if (this.masterGain) this.masterGain.dispose();

        this.initialized = false;
        this.isPlaying = false;
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SonificationEngineTone;
}
