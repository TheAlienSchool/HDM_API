/**
 * Platonic Solids Audio Engine — Tone.js Edition
 * ═══════════════════════════════════════════════════════════════
 * 
 * Pythagorean elemental tunings: Tetrahedron, Cube, Octahedron, Icosahedron, Dodecahedron
 * Each solid maps to an element and a harmonic frequency ratio.
 * 
 * Tetrahedron = Fire (triangle = 3 sides = frequency × 1.5)
 * Cube = Earth (4 sides/square base = frequency × 4/3)
 * Octahedron = Air (8 faces = frequency × 2)
 * Icosahedron = Water (20 faces = frequency ÷ 1.25)
 * Dodecahedron = Ether (12 faces = base frequency)
 */

class PlatonicSolidsAudioEngineTone {
    constructor(options = {}) {
        this.initialized = false;
        this.soundEnabled = true;

        // Platonic solid definitions with Pythagorean tunings
        this.PLATONIC_SOLIDS = {
            tetrahedron: {
                name: 'Tetrahedron',
                element: 'Fire',
                sides: 4,
                frequencyRatio: 1.5,
                color: '#FF6347',
                oscillatorType: 'triangle'
            },
            cube: {
                name: 'Cube',
                element: 'Earth',
                sides: 6,
                frequencyRatio: 4 / 3,
                color: '#8B4513',
                oscillatorType: 'square'
            },
            octahedron: {
                name: 'Octahedron',
                element: 'Air',
                sides: 8,
                frequencyRatio: 2,
                color: '#87CEEB',
                oscillatorType: 'sine'
            },
            icosahedron: {
                name: 'Icosahedron',
                element: 'Water',
                sides: 20,
                frequencyRatio: 0.8, // 1 ÷ 1.25
                color: '#1E90FF',
                oscillatorType: 'sine'
            },
            dodecahedron: {
                name: 'Dodecahedron',
                element: 'Ether',
                sides: 12,
                frequencyRatio: 1.0,
                color: '#DDA0DD',
                oscillatorType: 'sine'
            }
        };

        // Envelope specifications per solid (shape affects articulation)
        this.ENVELOPE_SPECS = {
            tetrahedron: { attack: 0.02, decay: 0.3, sustain: 0, release: 0.1 },
            cube: { attack: 0.04, decay: 0.4, sustain: 0.1, release: 0.15 },
            octahedron: { attack: 0.08, decay: 0.35, sustain: 0, release: 0.2 },
            icosahedron: { attack: 0.015, decay: 0.5, sustain: 0, release: 0.25 },
            dodecahedron: { attack: 0.035, decay: 0.6, sustain: 0, release: 0.3 }
        };

        // Master output
        this.masterGain = null;
        this.mainMix = null;

        // Tone.js synth pool
        this.synths = [];
        this.activeSynths = {}; // keyed by solid name for potential polyphony
        this.lastToneTime = 0;
    }

    /**
     * Initialize Tone.js context
     */
    async initialize() {
        if (this.initialized) return;

        await Tone.start();

        // Master output chain
        this.mainMix = new Tone.Gain(1);
        this.masterGain = new Tone.Gain(0.25);
        this.mainMix.connect(this.masterGain);
        this.masterGain.toDestination();

        this.initialized = true;
    }

    /**
     * Play a platonic solid tone
     * @param {string} solidName - Key from PLATONIC_SOLIDS (tetrahedron, cube, etc)
     * @param {number} baseFreq - Base frequency in Hz (e.g., 440 for A4)
     */
    async playSolidTone(solidName, baseFreq = 440) {
        if (!this.soundEnabled) return;

        const now = performance.now();
        if (now - this.lastToneTime < 100) return; // Throttle
        this.lastToneTime = now;

        await this.initialize();

        const solid = this.PLATONIC_SOLIDS[solidName.toLowerCase()];
        if (!solid) {
            console.warn(`Unknown platonic solid: ${solidName}`);
            return;
        }

        // Calculate frequency based on solid's harmonic ratio
        const playFreq = baseFreq * solid.frequencyRatio;

        // Get envelope spec for this solid
        const envelope = this.ENVELOPE_SPECS[solidName.toLowerCase()];

        // Create synth with solid-specific envelope
        const synth = new Tone.Synth({
            oscillator: { type: solid.oscillatorType },
            envelope
        });

        synth.connect(this.mainMix);

        // Trigger with smooth envelope
        const toneDuration = envelope.attack + envelope.decay + envelope.sustain + envelope.release;
        synth.triggerAttackRelease(playFreq, `${toneDuration}s`, Tone.now());

        // Store for cleanup
        this.synths.push(synth);
        this.activeSynths[solidName] = synth;

        return synth;
    }

    /**
     * Play sequence of all 5 solids (demonstration)
     */
    async playSequence(baseFreq = 440) {
        await this.initialize();

        const solidOrder = ['tetrahedron', 'cube', 'octahedron', 'icosahedron', 'dodecahedron'];
        let delayMs = 0;

        for (const solidName of solidOrder) {
            setTimeout(() => {
                this.playSolidTone(solidName, baseFreq);
            }, delayMs);

            const envelope = this.ENVELOPE_SPECS[solidName];
            const duration = (envelope.attack + envelope.decay + envelope.sustain + envelope.release) * 1000;
            delayMs += duration + 200; // 200ms gap between solids
        }
    }

    /**
     * Get information about a platonic solid
     */
    getSolidInfo(solidName) {
        const solid = this.PLATONIC_SOLIDS[solidName.toLowerCase()];
        if (!solid) return null;

        return {
            name: solid.name,
            element: solid.element,
            sides: solid.sides,
            frequency: 440 * solid.frequencyRatio,
            color: solid.color,
            oscillatorType: solid.oscillatorType,
            envelope: this.ENVELOPE_SPECS[solidName.toLowerCase()]
        };
    }

    /**
     * Silence all active synths
     */
    silence() {
        const now = Tone.now();
        for (const synth of this.synths) {
            synth.triggerRelease(now);
        }
        this.synths = [];
        this.activeSynths = {};
    }

    /**
     * Dispose all Tone.js nodes
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
    module.exports = PlatonicSolidsAudioEngineTone;
}
