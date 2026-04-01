/**
 * PHI-EXPLORER AUDIO ENGINE :: TONE.JS IMPLEMENTATION
 * 
 * Under-the-hood refinement of phi-explorer sonic character.
 * Preserves all immutable specs from phi-audio-spec.js
 * Improves sonic clarity, warmth, and funder-appeal without architectural change.
 */

import PHI_AUDIO_SPEC from './phi-audio-spec.js';

// Golden ratio constant
const PHI = 1.6180339887;

class PhiAudioEngineTone {
  constructor(options = {}) {
    this.enabled = options.enabled !== false;
    this.baseFreq = PHI_AUDIO_SPEC.baseFrequency;
    this.audioContext = Tone.getContext();
    
    // Initialize Tone.js transport (ensures sample-accurate timing)
    Tone.Transport.bpm.value = 120; // arbitrary; we control timing explicitly
    
    // Synth configuration using spec
    this.synthConfig = {
      oscillator: {
        type: PHI_AUDIO_SPEC.waveform, // 'sine'
        partials: [1],                  // pure sine (no harmonics)
        count: 1
      },
      envelope: {
        attack: PHI_AUDIO_SPEC.envelope.attack.duration,      // 0.04
        decay: PHI_AUDIO_SPEC.envelope.decay.duration,        // 2.5
        sustain: 0,
        release: 0.1  // brief tail after note ends
      }
    };
    
    // Output filter (lowpass @ 4000 Hz)
    this.filter = new Tone.Filter({
      type: PHI_AUDIO_SPEC.filter.type,        // 'lowpass'
      frequency: PHI_AUDIO_SPEC.filter.frequency, // 4000
      rolloff: -12                              // -12dB/octave (subtle)
    });
    
    // Master gain control
    this.masterGain = new Tone.Gain(0.18); // peak volume from spec
    
    // Connect chain: synth → filter → masterGain → destination
    // (This mirrors Web Audio: osc → filter → gainNode → destination)
    this.filter.connect(this.masterGain);
    this.masterGain.connect(this.audioContext.destination);
    
    // Synth pool (to avoid voice collision)
    this.activeSynths = [];
    this.maxVoices = 1; // phi-explorer plays one note at a time
    
    // State tracking
    this.isInitialized = false;
    this.lastPlayTime = 0;
  }
  
  /**
   * Initialize audio context (handles browser autoplay restrictions)
   */
  async init() {
    if (this.isInitialized) return;
    
    try {
      await Tone.start();
      this.isInitialized = true;
      console.log('Φ Audio Engine initialized (Tone.js)');
    } catch (err) {
      console.warn('Audio initialization deferred (awaiting user interaction):', err.message);
    }
  }
  
  /**
   * Play a phi-derived tone at a given step
   * step: integer representing which phi power (0, 1, 2, 3, ...)
   */
  async playPhiTone(step) {
    if (!this.enabled) return;
    
    await this.init(); // Ensure audio context is ready
    
    // Calculate frequency: baseFreq * φ^step
    const frequency = this.baseFreq * Math.pow(PHI, step);
    
    // Safety: don't retrigger within 100ms (human click debounce)
    const now = performance.now();
    if (now - this.lastPlayTime < PHI_AUDIO_SPEC.timing.retriggerMinInterval * 1000) {
      return;
    }
    this.lastPlayTime = now;
    
    // Create synth for this note
    const synth = new Tone.Synth(this.synthConfig);
    synth.connect(this.filter);
    
    // Play: frequency (Hz), duration (as Tone notation), time
    const duration = `${PHI_AUDIO_SPEC.timing.totalDuration}s`; // "2.5s"
    const now_tone = Tone.now();
    
    synth.triggerAttackRelease(frequency, duration, now_tone);
    
    // Track for cleanup (optional; Tone handles most management)
    this.activeSynths.push(synth);
    if (this.activeSynths.length > this.maxVoices * 2) {
      const old = this.activeSynths.shift();
      old.dispose();
    }
    
    return synth;
  }
  
  /**
   * Toggle audio on/off
   */
  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }
  
  /**
   * Cleanup and dispose
   */
  dispose() {
    this.activeSynths.forEach(s => s.dispose());
    this.activeSynths = [];
    this.filter.dispose();
    this.masterGain.dispose();
    this.isInitialized = false;
  }
  
  /**
   * Log sonic characterization (for funder review)
   */
  logCharacterization() {
    console.log(`
      ╔═══════════════════════════════════════════════════════════╗
      ║            PHI-EXPLORER AUDIO CHARACTERIZATION            ║
      ╠═══════════════════════════════════════════════════════════╣
      ║ Engine: Tone.js (Web Audio underneath)                    ║
      ║ Waveform: ${PHI_AUDIO_SPEC.waveform.toUpperCase().padEnd(46)} ║
      ║ Base Frequency: ${this.baseFreq} Hz (12th Fibonacci)          ║
      ║ Filter: Lowpass @ ${PHI_AUDIO_SPEC.filter.frequency} Hz       ║
      ║ Attack: ${PHI_AUDIO_SPEC.envelope.attack.duration}s (${(PHI_AUDIO_SPEC.envelope.attack.duration * 1000).toFixed(0)}ms)              ║
      ║ Decay: ${PHI_AUDIO_SPEC.envelope.decay.duration}s total                        ║
      ║ Character: ${PHI_AUDIO_SPEC.perceptual.character}          ║
      ║ Emotional: ${PHI_AUDIO_SPEC.perceptual.emotional}        ║
      ╚═══════════════════════════════════════════════════════════╝
    `);
  }
}

export default PhiAudioEngineTone;
