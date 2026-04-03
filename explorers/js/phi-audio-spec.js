/**
 * PHI-EXPLORER AUDIO SPECIFICATIONS
 * Extracted from current Web Audio implementation
 * 
 * These are the IMMUTABLE sonic characteristics that make phi-explorer
 * the "golden" experience. Any Tone.js implementation must preserve these exactly.
 */

const PHI_AUDIO_SPEC = {
  // BASE FREQUENCY ARCHITECTURE
  baseFrequency: 144.0,          // 12th Fibonacci number — cosmological grounding
  frequencyProgression: 'golden-ratio',  // each step: freq = baseFreq * Math.pow(PHI, step)
  
  // OSCILLATOR CHARACTER
  waveform: 'sine',              // "Pristine sine wave, softly rounded"
  
  // FILTER ARCHITECTURE
  filter: {
    type: 'lowpass',
    frequency: 4000,             // Hz — the "high-frequency cutoff" that creates softness
    resonance: 'minimal'         // subtle rolloff, not pronounced
  },
  
  // ENVELOPE DYNAMICS
  envelope: {
    attack: {
      duration: 0.04,            // 40ms — "swift organic attack"
      curve: 'linear',           // linearRampToValueAtTime
      targetGain: 0.18           // peak volume
    },
    decay: {
      duration: 2.5,             // 2.5s — "long golden reverberation"
      curve: 'exponential',      // exponentialRampToValueAtTime
      finalGain: 0.001           // soft tail to silence
    }
  },
  
  // TIMING PRECISION
  timing: {
    totalDuration: 2.5,          // exact (attack + decay = 0.04 + 2.46 ≈ 2.5)
    retriggerMinInterval: 0.1    // prevent overlapping notes (human-click safety)
  },
  
  // AUDITORY PERCEPTION TARGETS
  // These describe what a funder *hears* (not technical specs)
  perceptual: {
    character: 'celestial, meditative, mathematical',
    emotional: 'contemplative, uplifting, timeless',
    spatial: 'intimate (not stereo), centered presence',
    drift: 'smooth exponential fade, no artifacts'
  },

  // IMPLEMENTATION NOTES
  notes: `
    The current Web Audio implementation uses:
    - osc.connect(filter).connect(gainNode).connect(audioCtx.destination)
    - linearRampToValueAtTime for attack (0 → 0.18 in 0.04s)
    - exponentialRampToValueAtTime for decay (0.18 → 0.001 in 2.5s)
    
    Tone.js equivalent must:
    - Use Tone.Synth with envelope configuration
    - NOT add reverb, delay, or other effects (keep pristine)
    - Maintain sample-accurate timing for PHI progression
    - Preserve perceptual "feel" of digital purity
  `
};

export default PHI_AUDIO_SPEC;
