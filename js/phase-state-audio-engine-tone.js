/**
 * PHASE STATE AUDIO ENGINE (Tone.js)
 * 
 * Observable Resonance: Hover Actions Make Sound
 * 
 * The Phase-State Laboratory is a space of observation and measurement.
 * When consciousness hovers over interactive elements, the state of the
 * universe responds sonically—each hover trigger produces a gentle tone
 * that reveals the frequency encoded in the element's data attribute.
 * 
 * This is the sound of reality responding to observation.
 */

class PhaseStateAudioEngineTone {
  constructor() {
    this.synths = [];
    this.isInitialized = false;
  }

  async initialize() {
    if (this.isInitialized) return;
    await Tone.start();
    this.isInitialized = true;
  }

  /**
   * Play a resonance tone for an observed element
   * @param {number} frequency - The element's frequency (Hz)
   */
  async playObservationTone(frequency = 144) {
    await this.initialize();

    // Ensure frequency is valid
    const freq = Math.max(20, Math.min(20000, parseFloat(frequency) || 144));

    // Create a rich, bell-like FMSynth to avoid the flat "error beep" of a pure sine wave,
    // - Gentle attack (avoid zero-crossing clicks)
    // - Smooth decay and extended release (mathemagical decay)
    const synth = new Tone.FMSynth({
      harmonicity: 1.5,
      modulationIndex: 2,
      oscillator: { type: 'sine' },
      modulation: { type: 'triangle' },
      envelope: {
        attack: 0.08,      // Slow enough to prevent harsh clicks
        decay: 0.4,
        sustain: 0.1,
        release: 2.5
      },
      modulationEnvelope: {
        attack: 0.1,
        decay: 0.2,
        sustain: 0.05,
        release: 2.0
      }
    });

    // Add lowpass filter for rounded, soft character
    const filter = new Tone.Filter({
      frequency: 1200,
      type: 'lowpass',
      rolloff: -24
    });

    // Employ a Master Gain node to prevent clipping 
    // (Accumulated sine waves quickly exceed 0dBFS causing clicking/distortion)
    const masterGain = new Tone.Gain(0.08).toDestination();

    synth.chain(filter, masterGain);

    // Trigger precisely on the frequency intended
    synth.triggerAttackRelease(freq, '2.5s', Tone.now());

    // Track synth
    this.synths.push(synth);

    // Clean up after tone completes to free up memory
    setTimeout(() => {
      const idx = this.synths.indexOf(synth);
      if (idx > -1) this.synths.splice(idx, 1);
      try {
        synth.dispose();
        filter.dispose();
        masterGain.dispose();
      } catch (e) {
        // Already disposed
      }
    }, 3000);
  }

  /**
   * Play a frequency from an element attribute
   * Reads data-freq attribute or defaults to 144Hz
   * @param {HTMLElement} element - The element with data-freq attribute
   */
  async playElementFrequency(element) {
    const freqStr = element.getAttribute('data-freq');
    const freq = parseFloat(freqStr) || 144;
    await this.playObservationTone(freq);
  }

  /**
   * Silence all active tones
   */
  silence() {
    this.synths.forEach(s => {
      try {
        s.triggerRelease();
        s.dispose();
      } catch (e) {
        // Already disposed
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
  module.exports = PhaseStateAudioEngineTone;
}
