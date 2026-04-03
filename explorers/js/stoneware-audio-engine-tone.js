/**
 * Stoneware Builder Audio Engine — Tone.js Edition
 * ═══════════════════════════════════════════════════════════════
 * 
 * Consciousness crystallization through harmonic piece assembly.
 * Element-based tones: Stewardship, Communion, Legacy, Bloom
 * 
 * Stewardship (396Hz):  Care for continuation
 * Communion (528Hz):    Unity without merger
 * Legacy (639Hz):       Generation received from generation
 * Bloom (432/648/864):  All capacities illuminated in harmony
 */

class StonewareAudioEngineTone {
    constructor(options = {}) {
        this.initialized = false;
        this.soundEnabled = true;

        // Piece-specific harmonic frequencies
        this.PIECES = {
            stewardship: {
                name: 'Stewardship',
                freq: 396,
                type: 'sine',
                duration: 1.3,
                gain: 0.2
            },
            communion: {
                name: 'Communion',
                frequencies: [528, 792],  // 528 + hidden 792
                types: ['triangle', 'sine'],
                durations: [1.4, 0.8],
                gains: [0.2, 0.07],
                delayMs: 180  // Secondary tone onset
            },
            legacy: {
                name: 'Legacy',
                frequencies: [639, 852],
                types: ['sine', 'sine'],
                durations: [1.6, 1.0],
                gains: [0.2, 0.06],
                delayMs: 260
            },
            bloom: {
                name: 'Bloom',
                frequencies: [432, 648, 864],  // Triad cascade
                types: ['sine', 'sine', 'sine'],
                durations: [2.0, 2.0, 1.8],
                gains: [0.2, 0.11, 0.07]
            }
        };

        // Bloom chord (polyphonic crystallization)
        this.BLOOM_CHORD = [396, 432, 528, 639];

        // Master output
        this.masterGain = null;
        this.mainMix = null;

        // Synth pool
        this.synths = [];
        this.activeNotes = {};
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
     * Play a simple tone (frequency, type, duration, gain)
     */
    async playTone(frequency, type = 'sine', duration = 1.0, gain = 0.2) {
        if (!this.soundEnabled) return;
        await this.initialize();

        const synth = new Tone.Synth({
            oscillator: { type },
            envelope: {
                attack: 0.08,
                decay: Math.max(duration - 0.08, 0.05),
                sustain: 0,
                release: 0.05
            }
        });

        synth.connect(this.mainMix);
        synth.volume.value = Tone.Decibels.toDb(gain);
        synth.triggerAttackRelease(frequency, `${duration}s`, Tone.now());

        // Store for cleanup
        this.synths.push(synth);

        return synth;
    }

    /**
     * Play a consciousness piece (stewardship, communion, legacy, bloom)
     */
    async playPiece(pieceId) {
        if (!this.soundEnabled) return;
        await this.initialize();

        const piece = this.PIECES[pieceId];
        if (!piece) {
            console.warn(`Unknown piece: ${pieceId}`);
            return;
        }

        if (pieceId === 'stewardship') {
            // Single grounded tone
            this.playTone(piece.freq, piece.type, piece.duration, piece.gain);

        } else if (pieceId === 'communion') {
            // Primary tone + delayed secondary
            this.playTone(piece.frequencies[0], piece.types[0], piece.durations[0], piece.gains[0]);
            
            setTimeout(() => {
                this.playTone(piece.frequencies[1], piece.types[1], piece.durations[1], piece.gains[1]);
            }, piece.delayMs);

        } else if (pieceId === 'legacy') {
            // Primary tone + delayed echo
            this.playTone(piece.frequencies[0], piece.types[0], piece.durations[0], piece.gains[0]);
            
            setTimeout(() => {
                this.playTone(piece.frequencies[1], piece.types[1], piece.durations[1], piece.gains[1]);
            }, piece.delayMs);

        } else if (pieceId === 'bloom') {
            // Triad cascade: 432→648→864 (all simultaneous)
            for (let i = 0; i < piece.frequencies.length; i++) {
                this.playTone(
                    piece.frequencies[i],
                    piece.types[i],
                    piece.durations[i],
                    piece.gains[i]
                );
            }
        }
    }

    /**
     * Trigger full bloom crystallization (polyphonic chord cascade)
     * 396→432→528→639 over 560ms with 140ms spacing
     */
    async triggerBloom() {
        if (!this.soundEnabled) return;
        await this.initialize();

        const bloomNotes = this.BLOOM_CHORD;
        const spacing = 140;  // ms between each note onset
        const duration = 4.2;  // Total sustain duration
        const totalLength = 4.8;  // Silence window

        for (let i = 0; i < bloomNotes.length; i++) {
            const delayMs = i * spacing;
            const freq = bloomNotes[i];

            setTimeout(async () => {
                // Dual-oscillator sine+sawtooth blend for richness
                const synth = new Tone.PolySynth(Tone.Synth, {
                    oscillator: { type: 'sawtooth' },
                    envelope: {
                        attack: 0.4,
                        decay: duration - 0.4,
                        sustain: 0,
                        release: 0.05
                    }
                }).connect(this.mainMix);

                synth.volume.value = Tone.Decibels.toDb(0.12);

                // Trigger sawtooth with slight detuning
                const now = Tone.now();
                synth.triggerAttackRelease(freq, `${duration}s`, now);

                // Layer in sine wave at +0.1% detuning
                const fineTunedFreq = freq * 1.001;
                const sineSynth = new Tone.Synth({
                    oscillator: { type: 'sine' },
                    envelope: {
                        attack: 0.4,
                        decay: duration - 0.4,
                        sustain: 0,
                        release: 0.05
                    }
                }).connect(this.mainMix);

                sineSynth.volume.value = Tone.Decibels.toDb(0.06); // Quieter sine layer
                sineSynth.triggerAttackRelease(fineTunedFreq, `${duration}s`, now);

                this.synths.push(synth);
                this.synths.push(sineSynth);
            }, delayMs);
        }
    }

    /**
     * Silence all active notes
     */
    silence() {
        const now = Tone.now();
        for (const synth of this.synths) {
            if (synth && synth.triggerRelease) {
                synth.triggerRelease(now);
            }
        }
        this.synths = [];
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
    module.exports = StonewareAudioEngineTone;
}
