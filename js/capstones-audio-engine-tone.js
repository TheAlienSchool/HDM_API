/**
 * CAPSTONES AUDIO ENGINE (Tone.js)
 * 
 * Mathematical Harmony: Face Card Sonification
 * 
 * Each of the 12 dodecahedral faces is a bell tone calculated precisely
 * using harmonic series and the Golden Ratio (Phi = 1.618). When a visitor's
 * cursor hovers over a face card, the mathematical frequency sings—making
 * the invisible architecture audible.
 * 
 * Base frequency: 288 Hz (Aether/Unity frequency)
 * Ratios: Harmonic series + Phi + Fibonacci intervals
 */

class CapstoneAudioEngineTone {
  constructor() {
    this.baseFreq = 288.0; // Aether frequency
    this.synths = [];
    this.isInitialized = false;

    // Harmonic series + Golden Ratio intervals for each face
    this.mathematicalRatios = [
      1.0,           // Face 1: Root
      1.125,         // Face 2: 9/8 Major Second
      1.25,          // Face 3: 5/4 Major Third
      1.333,         // Face 4: 4/3 Perfect Fourth
      1.5,           // Face 5: 3/2 Perfect Fifth
      1.618033,      // Face 6: The Golden Ratio (Phi)
      1.666,         // Face 7: 5/3 Major Sixth
      1.875,         // Face 8: 15/8 Major Seventh
      2.0,           // Face 9: Octave
      2.25,          // Face 10: Octave + Major Second
      2.5,           // Face 11: Octave + Major Third
      2.618033       // Face 12: Octave + Golden Ratio
    ];
  }

  async initialize() {
    if (this.isInitialized) return;
    await Tone.start();
    this.isInitialized = true;
  }

  /**
   * Play a hover bell tone for the given face index
   * @param {number} faceIndex - 0-11 (maps to Face 1-12)
   */
  async playHoverBell(faceIndex) {
    await this.initialize();

    // Calculate frequency using mathematical ratios
    const ratio = this.mathematicalRatios[faceIndex % 12];
    const freq = this.baseFreq * ratio;

    // Create synth with bell-like character (sine + soft envelope)
    const synth = new Tone.Synth({
      oscillator: {
        type: 'sine',
        partials: [1, 2, 3, 4, 5] // Slight harmonic richness for bell quality
      },
      envelope: {
        attack: 0.02,      // Very quick attack for bell character
        decay: 0.3,        // Sharp decay
        sustain: 0.02,     // Minimal sustain
        release: 0.45      // Gentle release
      }
    });

    // Add lowpass filter for muted, subtle bell timbre
    const filter = new Tone.Filter({
      frequency: 1500,
      type: 'lowpass',
      rolloff: -12
    });

    synth.connect(filter);
    filter.toDestination();

    // Play the tone with very subtle gain (brushing dust off glass)
    synth.triggerAttackRelease('0.5s', Tone.now());

    // Track synth for cleanup
    this.synths.push(synth);

    // Clean up synth after it's done
    setTimeout(() => {
      const idx = this.synths.indexOf(synth);
      if (idx > -1) this.synths.splice(idx, 1);
      synth.dispose();
      filter.dispose();
    }, 1000);
  }

  /**
   * Get frequency for a given face (useful for debugging or display)
   * @param {number} faceIndex - 0-11
   * @returns {number} frequency in Hz
   */
  getFrequencyForFace(faceIndex) {
    const ratio = this.mathematicalRatios[faceIndex % 12];
    return this.baseFreq * ratio;
  }

  /**
   * Silence all active synths and clean up
   */
  silence() {
    this.synths.forEach(s => {
      try {
        s.triggerRelease();
        s.dispose();
      } catch (e) {
        // Already disposed or error, skip
      }
    });
    this.synths = [];
  }

  /**
   * Full cleanup
   */
  dispose() {
    this.silence();
    this.isInitialized = false;
  }
}

/**
 * Export for use in module contexts
 */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CapstoneAudioEngineTone;
}
