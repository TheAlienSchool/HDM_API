/**
 * Sonification Engine
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
 *  - Biotexture layer (jitter, flutter, organic qualities)
 *  - Stereo separation (practitioner L, client R)
 *  - Fade-in/fade-out (no electronic clicks)
 */

class SonificationEngine {
    constructor(options = {}) {
        // Web Audio setup
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContext();

        // Master gain
        this.masterGain = this.audioContext.createGain();
        this.masterGain.gain.value = options.masterVolume || 0.15;
        this.masterGain.connect(this.audioContext.destination);

        // Practitioner oscillator (left channel)
        this.practitionerOsc = this.audioContext.createOscillator();
        this.practitionerOsc.type = 'sine';
        this.practitionerGain = this.audioContext.createGain();
        this.practitionerGain.gain.value = 0;

        // Client oscillator (right channel)
        this.clientOsc = this.audioContext.createOscillator();
        this.clientOsc.type = 'sine';
        this.clientGain = this.audioContext.createGain();
        this.clientGain.gain.value = 0;

        // Stereo setup
        const stereo = this.audioContext.createStereoPanner();
        this.practitionerOsc.connect(this.practitionerGain);
        this.clientOsc.connect(this.clientGain);
        this.practitionerGain.connect(stereo);
        this.clientGain.connect(stereo);
        stereo.pan.value = -0.7; // Left
        stereo.connect(this.masterGain);

        // Right channel
        const stereoPanR = this.audioContext.createStereoPanner();
        const dummyOsc = this.audioContext.createOscillator();
        stereoPanR.pan.value = 0.7; // Right
        stereoPanR.connect(this.masterGain);

        // Start oscillators
        this.practitionerOsc.start(0);
        this.clientOsc.start(0);

        // State
        this.isPlaying = false;
        this.currentAlignment = 0;
        this.baseFrequency = options.baseFrequency || 110;
        this.frequencyMultiplier = options.frequencyMultiplier || 4;
        this.biotextureAmount = options.biotextureAmount || 0.05;

        // Biotexture LFO (low-frequency oscillation)
        this.biotextureLFO = this.audioContext.createOscillator();
        this.biotextureLFO.frequency.value = options.biotextureFrequency || 3.5;
        this.biotextureLFO.type = 'sine';

        this.biotextureLFOGain = this.audioContext.createGain();
        this.biotextureLFOGain.gain.value = 0;
        this.biotextureLFO.connect(this.biotextureLFOGain);

        // Connect biotexture to frequency modulation
        this.biotextureLFOGain.connect(this.practitionerOsc.frequency);
        this.biotextureLFOGain.connect(this.clientOsc.frequency);

        this.biotextureLFO.start(0);

        // Frequency modulation targets
        this.practitionerFreqTarget = this.baseFrequency;
        this.clientFreqTarget = this.baseFrequency * 1.5;

        // Overtone layer (adds richness)
        this.overtoneActive = options.overtoneActive !== false;
        if (this.overtoneActive) {
            this.setupOvertones();
        }
    }

    /**
     * Setup harmonic overtone layer
     */
    setupOvertones() {
        this.overtones = [];

        for (let i = 0; i < 3; i++) {
            const osc = this.audioContext.createOscillator();
            osc.type = 'sine';
            osc.frequency.value = this.baseFrequency * (i + 2);

            const gain = this.audioContext.createGain();
            gain.gain.value = 0;

            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(0);

            this.overtones.push({ osc, gain, harmonics: i + 2 });
        }
    }

    /**
     * Start sonification
     */
    start() {
        if (this.isPlaying) return this;

        this.isPlaying = true;

        // Fade in (500ms)
        this.practitionerGain.gain.setTargetAtTime(0.1, this.audioContext.currentTime, 0.05);
        this.clientGain.gain.setTargetAtTime(0.1, this.audioContext.currentTime, 0.05);

        return this;
    }

    /**
     * Stop sonification
     */
    stop() {
        if (!this.isPlaying) return this;

        this.isPlaying = false;

        // Fade out (300ms)
        this.practitionerGain.gain.setTargetAtTime(0, this.audioContext.currentTime, 0.03);
        this.clientGain.gain.setTargetAtTime(0, this.audioContext.currentTime, 0.03);

        return this;
    }

    /**
     * Update with alignment score
     */
    updateAlignment(alignment) {
        this.currentAlignment = alignment;

        // Map alignment to frequencies
        // Alignment ranges from -1 (dissonant) to +1 (consonant)
        const normalized = (alignment + 1) / 2; // 0..1

        // Base frequency follows alignment exponentially
        const freqA = this.baseFrequency * Math.pow(normalized + 0.5, 2);

        // Second voice creates interval based on alignment
        // Consonant intervals when aligned
        const intervalsConsonant = [1.0, 1.125, 1.25, 1.33, 1.5, 1.67, 2.0]; // Harmonic series
        const intervalsDissonant = [1.0, 1.09, 1.22, 1.41, 1.6, 1.78]; // Dissonant intervals

        let intervalIndex;

        if (alignment > 0.3) {
            // Consonant territory
            intervalIndex = Math.floor(normalized * intervalsConsonant.length) % intervalsConsonant.length;
            const interval = intervalsConsonant[intervalIndex];
            this.clientFreqTarget = freqA * interval;
        } else {
            // Dissonant territory (including tritone ~ 1.41)
            const dissonanceIntensity = Math.max(0, 1 - normalized);
            intervalIndex = Math.floor(dissonanceIntensity * intervalsDissonant.length) % intervalsDissonant.length;
            const interval = intervalsDissonant[intervalIndex];
            this.clientFreqTarget = freqA * interval;
        }

        this.practitionerFreqTarget = freqA;

        // Update frequencies with smoothing (exponential ramp)
        const smoothTime = 0.1; // 100ms ramp
        this.practitionerOsc.frequency.setTargetAtTime(freqA, this.audioContext.currentTime, smoothTime);
        this.clientOsc.frequency.setTargetAtTime(this.clientFreqTarget, this.audioContext.currentTime, smoothTime);

        // Update biotexture intensity
        // More texture when dissonant (lower alignment)
        const biotextureIntensity = Math.abs(alignment) < 0.3 ? 1 : 0.3;
        this.biotextureLFOGain.gain.setTargetAtTime(
            this.biotextureAmount * biotextureIntensity,
            this.audioContext.currentTime,
            0.2
        );

        // Update overtone volumes
        if (this.overtoneActive) {
            for (const overtone of this.overtones) {
                const harmonicGain = Math.max(0, 1 - Math.abs(alignment)) * 0.08;
                const freqTarget = this.practitionerFreqTarget * overtone.harmonics;
                overtone.osc.frequency.setTargetAtTime(freqTarget, this.audioContext.currentTime, 0.1);
                overtone.gain.gain.setTargetAtTime(harmonicGain, this.audioContext.currentTime, 0.2);
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
     * Emergency panic button (silence everything)
     */
    silence() {
        this.practitionerGain.gain.value = 0;
        this.clientGain.gain.value = 0;
        this.biotextureLFOGain.gain.value = 0;

        if (this.overtoneActive) {
            for (const overtone of this.overtones) {
                overtone.gain.gain.value = 0;
            }
        }

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
            audioContextState: this.audioContext.state,
        };
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SonificationEngine;
}
