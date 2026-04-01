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

    // Create synth with observation character:
    // - Slow attack (contemplative build-up)
    // - Extended sustain (holding awareness)
    // - Smooth decay (letting go gracefully)
    const synth = new Tone.Synth({
      oscillator: {
        type: 'sine'
      },
      envelope: {
        attack: 0.1,       // Build awareness slowly
        decay: 0.5,        // Transition to sustain
        sustain: 0.08,     // Hold the state
        release: 2.0       // Release the observation gradually
      }
    });

    // Add lowpass filter for rounded, soft character
    const filter = new Tone.Filter({
      frequency: 800,
      type: 'lowpass',
      rolloff: -12
    });

    synth.connect(filter);
    filter.toDestination();

    // Trigger with subtle gain (gentle presence)
    synth.triggerAttackRelease('2.5s', Tone.now());

    // Track synth
    this.synths.push(synth);

    // Clean up after tone completes
    setTimeout(() => {
      const idx = this.synths.indexOf(synth);
      if (idx > -1) this.synths.splice(idx, 1);
      try {
        synth.dispose();
        filter.dispose();
      } catch (e) {
        // Already disposed
      }
    }, 2700);
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
