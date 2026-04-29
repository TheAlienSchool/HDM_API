/**
 * SONNET ENGINE (Tone.js)
 * 
 * HDM Insights Academy (HIA) Quanticized Sonification Architecture
 * 
 * Implements:
 * - Global Tooltip Hover Bells (Phi ratios)
 * - Click Chords (harmonic triads)
 * - Element-based voice profiles (Earth/Water/Fire/Air/Ether)
 * - Ambient biotexture foundation (optional)
 * 
 * "I would like every page, tooltip, hover surface, and interactive aspect 
 * to have quanticized sonification that maintains the strength of the sonnet 
 * engine all the way through the experience."
 */

class SonnetEngineTone {
  constructor() {
    this.isInitialized = false;
    this.synths = [];
    this.biotexture = null; // ambient layer — single instance guard
    this.baseFreq = 288.0; // Aether root
    
    // Harmonic Series + Golden Ratio (Phi = 1.618)
    this.mathematicalRatios = [
      1.0,           // Root
      1.125,         // 9/8 Major Second
      1.25,          // 5/4 Major Third
      1.333,         // 4/3 Perfect Fourth
      1.5,           // 3/2 Perfect Fifth
      1.618033,      // Golden Ratio (Phi)
      1.666,         // 5/3 Major Sixth
      1.875,         // 15/8 Major Seventh
      2.0,           // Octave
      2.25,          // Octave + Major Second
      2.5,           // Octave + Major Third
      2.618033       // Octave + Golden Ratio
    ];

    // Element voice profiles for semantic audio
    this.elementProfiles = {
      Earth: {
        freq: 196.0,  // Low, grounded
        waves: [1.0],
        attack: 0.04,
        decay: 0.35,
        detune: 12,
        characteristic: 'grounded, structural'
      },
      Water: {
        freq: 220.0,   // Flowing
        waves: [1.0, 1.5],
        attack: 0.02,
        decay: 0.28,
        detune: 4,
        characteristic: 'fluid, adaptive'
      },
      Fire: {
        freq: 246.94,  // Bright, active
        waves: [1.0, 2.0],
        attack: 0.03,
        decay: 0.24,
        detune: 18,
        characteristic: 'sharp, direct'
      },
      Air: {
        freq: 293.66,  // Ethereal, light
        waves: [1.0],
        attack: 0.08,
        decay: 0.45,
        detune: 24,
        characteristic: 'expansive, spacious'
      },
      Ether: {
        freq: 288.0,   // The base itself
        waves: [1.0, 1.5, 2.0],
        attack: 0.035,
        decay: 0.6,
        detune: 30,
        characteristic: 'whole, resonant'
      }
    };
  }

  async initialize() {
    if (this.isInitialized) return;
    await Tone.start();
    this.isInitialized = true;
  }

  // iOS Safari: AudioContext can slip to 'suspended' after backgrounding.
  // Call before any sound output to guarantee the context is running.
  async _ensureContext() {
    if (Tone.context.state !== 'running') {
      await Tone.context.resume();
    }
  }

  /**
   * Play a hover bell tone
   * @param {number} index - 0-11 (maps to Phi ratio)
   * @param {string} element - 'Earth'|'Water'|'Fire'|'Air'|'Ether' (optional)
   */
  async playHoverBell(index, element = null) {
    if (!this.isInitialized) {
      await this.initialize();
    }
    await this._ensureContext();

    const ratio = this.mathematicalRatios[index % 12];
    const freq = this.baseFreq * ratio;

    // Create synth with bell character
    const synth = new Tone.Synth({
      oscillator: { type: 'sine' },
      envelope: {
        attack: 0.02,
        decay: 0.7,
        sustain: 0.0,
        release: 0.1
      }
    });

    // Add filter for muted bell timbre
    const filter = new Tone.Filter({
      frequency: 1400,
      type: 'lowpass'
    });

    synth.connect(filter);
    filter.toDestination();

    // Play with subtle gain
    synth.volume.value = -12; // dB
    synth.triggerAttackRelease(freq, '0.75s', Tone.now());

    // Cleanup
    this.synths.push(synth);
    setTimeout(() => {
      const idx = this.synths.indexOf(synth);
      if (idx > -1) this.synths.splice(idx, 1);
      synth.dispose();
      filter.dispose();
    }, 800);
  }

  /**
   * Play a click chord (tri-note harmonic response)
   * Used for buttons and decisive interactions
   */
  async playClickChord() {
    if (!this.isInitialized) {
      await this.initialize();
    }
    await this._ensureContext();

    // Phi-based triad: 1 - 1.5 - 1.618
    [1.0, 1.5, 1.618033].forEach((ratio, i) => {
      const synth = new Tone.Synth({
        oscillator: { type: 'sine' },
        envelope: {
          attack: 0.015,
          decay: 0.9,
          sustain: 0.0,
          release: 0.1
        }
      });

      const filter = new Tone.Filter({
        frequency: 1200,
        type: 'lowpass'
      });

      synth.connect(filter);
      filter.toDestination();

      const freq = this.baseFreq * ratio;
      synth.volume.value = -14; // dB

      // Slight stagger for richness
      synth.triggerAttackRelease(freq, '0.95s', Tone.now() + i * 0.005);

      this.synths.push(synth);
      setTimeout(() => {
        const idx = this.synths.indexOf(synth);
        if (idx > -1) this.synths.splice(idx, 1);
        synth.dispose();
        filter.dispose();
      }, 1000);
    });
  }

  /**
   * Play an element-based voice
   * Each element has unique characteristics for semantic audio
   */
  async playElementVoice(element) {
    if (!this.isInitialized) {
      await this.initialize();
    }
    await this._ensureContext();

    const profile = this.elementProfiles[element];
    if (!profile) return;

    // Play the base frequency with element-specific character
    const synth = new Tone.Synth({
      oscillator: {
        type: 'sine',
        partials: profile.waves
      },
      envelope: {
        attack: profile.attack,
        decay: profile.decay,
        sustain: 0.05,
        release: 0.15
      }
    });

    const filter = new Tone.Filter({
      frequency: 1200,
      type: 'lowpass'
    });

    synth.connect(filter);
    filter.toDestination();

    synth.volume.value = -14; // dB
    synth.triggerAttackRelease(
      profile.freq,
      `${profile.attack + profile.decay + 0.15}s`,
      Tone.now()
    );

    this.synths.push(synth);
    setTimeout(() => {
      const idx = this.synths.indexOf(synth);
      if (idx > -1) this.synths.splice(idx, 1);
      synth.dispose();
      filter.dispose();
    }, (profile.attack + profile.decay + 0.15) * 1000);
  }

  /**
   * Play an ambient biotexture loop (very subtle background)
   * Optional for pages that should have continuous presence
   */
  async startAmbientBiotexture() {
    if (this.biotexture) return; // already breathing — don't double-layer
    if (!this.isInitialized) {
      await this.initialize();
    }
    await this._ensureContext();

    // Brown noise filtered to sub-200 Hz, breathing at 0.3 Hz — the room alive
    const noise = new Tone.Noise('brown');
    const filter = new Tone.Filter({
      frequency: 200,
      type: 'lowpass'
    });

    const lfo = new Tone.LFO({
      frequency: 0.3,
      min: 80,
      max: 300
    });

    // 0.02 linear gain ≈ -34 dB — barely perceptible, felt more than heard
    // (Tone.Gain takes linear scale; -30 as a raw value would be phase-inverted 30× amplification)
    const gain = new Tone.Gain(0.02);

    noise.connect(filter);
    filter.connect(gain);
    gain.toDestination();

    lfo.connect(filter.frequency);
    lfo.start();
    noise.start();

    this.biotexture = { noise, filter, lfo, gain };
    return this.biotexture;
  }

  /**
   * Silence all active synths
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
    if (this.biotexture) {
      try {
        this.biotexture.lfo.stop();
        this.biotexture.noise.stop();
        this.biotexture.lfo.dispose();
        this.biotexture.noise.dispose();
        this.biotexture.filter.dispose();
        this.biotexture.gain.dispose();
      } catch (e) { /* already disposed */ }
      this.biotexture = null;
    }
    this.isInitialized = false;
  }
}

/**
 * Export for use
 */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SonnetEngineTone;
}

/**
 * iOS Safari AudioContext pre-unlock.
 *
 * iOS requires AudioContext.resume() to be called synchronously inside
 * a user gesture handler. If the first sound fires inside an async
 * function (after any await), the unlock window may have closed.
 * This listener fires synchronously on the first touch anywhere on the
 * page — before any async init code runs — guaranteeing the context is
 * ready when the first note is requested.
 */
(function () {
  function unlockAudio() {
    if (typeof Tone !== 'undefined' && Tone.context && Tone.context.state !== 'running') {
      Tone.context.resume();
    }
  }
  document.addEventListener('touchstart', unlockAudio, { once: true, passive: true });
  document.addEventListener('touchend',   unlockAudio, { once: true, passive: true });
})();
