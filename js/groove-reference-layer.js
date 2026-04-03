/**
 * GLOBAL GROOVE REFERENCE LAYER
 * 
 * The shared infrastructure that all audio engines tap into.
 * This is not just a clock—it's a breathing, responsive context
 * that makes all engines feel like they're performing together.
 * 
 * Principles from the Auditor:
 * - A master pulse that engines can quantize to or syncopate against
 * - Interaction memory that tracks user energy level (fast/slow, chaotic/deliberate)
 * - Contextual reverb/space that adjusts based on portal location
 * 
 * "The pocket is where the groove lives."
 */

class GrooveReferenceLayer {
  constructor() {
    this.isInitialized = false;
    this.baseFreq = 288.0; // Aether root (shared across all engines)
    
    // === THE AMBIENT PULSE (breathes, not clicks) ===
    this.ambientPulse = {
      tempo: 96,                    // bpm (can drift slightly for organic feel)
      subdivision: 8,               // 8th notes (swing can happen here)
      swing: 0.52,                  // Light swing (humanizes the timing)
      lastPulseTime: 0,
      isPlaying: false,
      synth: null,                  // Tone.js synth (very subtle)
      volume: -Infinity             // Silent by default (exists conceptually)
    };
    
    // === INTERACTION MEMORY (tracks user's current energy) ===
    this.interactionMemory = {
      currentEnergy: 0.5,           // 0 = contemplative, 1 = frenetic
      recentInteractions: [],       // Last 10 interactions with timestamps
      averageVelocity: 0,           // Pixel/ms or similar
      dwellTimeOnElement: 0,        // How long user hovers
      lastInteractionTime: 0,
      interactionPattern: 'exploring' // 'exploring' | 'focused' | 'rapid' | 'deliberate'
    };
    
    // === CONTEXTUAL SPACE (where are we in the portal?) ===
    this.contextualSpace = {
      currentZone: 'hub',           // 'hub' | 'explorer' | 'immersive' | 'utility'
      energyCarryover: 0,           // Tail energy from previous zone (decays over 3-5 seconds)
      ambientReverb: 0.25,          // Hub = 0.25, Explorers = 0.4, Immersive = 0.6
      filterCutoff: 8000,           // Adaptive filter based on zone
      lastZoneChangeTime: 0
    };
    
    // === PERFORMANCE STATE ===
    this.performance = {
      isActive: false,              // Has user interacted yet?
      startTime: 0,
      totalInteractions: 0,
      soundsPlaying: 0              // For polyphony management
    };

    // ========================================
    // AUDITOR'S DOUBLE-SECRET CODES
    // ========================================
    
    // 1. GHOST NOTE VARIABLE (Invisible Syncopation)
    // Probability matrix for intentionally muting triggers
    this.ghostNotes = {
      enabled: true,
      baseProbability: 0.15,        // 15% of rapid interactions get skipped
      groovePhase: 0,               // Current phase in groove cycle (0-1)
      lastCalculatedPhase: 0
    };
    
    // 2. ENTROPY-TO-WARMTH CONVERSION (The Algorave Tube Amp)
    // Map system chaos/entropy to harmonic saturation
    this.entropyWarmth = {
      globalSaturation: 0,          // 0-1 scale, affects entire mix
      chaosVelocity: 0,             // Derived from attractor/interaction chaos
      userUnpredictability: 0,      // How erratic are the user's interactions?
      saturationSmoothing: 0.95     // Low-pass filter for smooth transitions
    };
    
    // 3. AEROSPACE TELEMETRY DECAY (Contextual Memory)
    // Momentum variables that decay over minutes, not milliseconds
    this.systemMemory = {
      systemExcitement: 0,           // Accumulates with interactions, decays slowly
      excitementDecayRate: 0.0005,   // Decay per millisecond (~120 sec to zero)
      lastExcitementUpdate: Tone.now(),
      excitementHistory: []          // Track excitement over time
    };
    
    // 4. SAMPLE CRAFT ATTACK ENVELOPE (The Micro-Delay)
    // Algorithmic micro-delays based on interaction intent
    this.attackCraft = {
      enabled: true,
      minDelayMs: 0,                 // Instant (deliberate click)
      maxDelayMs: 15,                // 15ms (lazy/fleeting interaction)
      dwellThresholdMs: 500          // If hover > 500ms, trigger instantly
    };
    
    // 5. TENSION/RESOLUTION HARMONIC PIVOT (The Jazz Algorithm)
    // Will be referenced by TwelveFacesAudioTone
    this.harmonicFunction = {
      lastChordRoot: 261.63,         // Last played chord root (C4)
      tonalCenter: 261.63,           // Drifting tonal center
      harmonicDistance: 0,           // Semitones between chord A and B
      insertAltered: false           // Should we insert a passing tone?
    };
    
    // 6. BREATHING MASTER BUS (The System's Heartbeat)
    // Global imperceptible sine wave at ~0.2 Hz (5 second cycle)
    this.breathingLFO = {
      frequency: 0.2,                // Hz (one cycle every 5 seconds)
      phase: 0,                      // Current phase (0-1)
      amplitude: 0.5,                // How much the breathing affects things (0-1)
      reverbModulation: 0.02,        // ±2% of reverb decay
      filterModulation: 0.01,        // ±1% of filter cutoff
      widthModulation: 0.03          // ±3% of stereo width
    };
  }

  // ========================================
  // 1. INITIALIZE & CONTROL
  // ========================================
  
  async initialize() {
    if (this.isInitialized) return;
    try {
      await Tone.start();
      this.ambientPulse.synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'sine' },
        envelope: { attack: 0.008, decay: 0.1, sustain: 0, release: 0.1 }
      }).toDestination();
      this.ambientPulse.synth.volume.value = this.ambientPulse.volume;
      
      // Start the breathing LFO update loop
      this.startBreathingLFO();
      
      this.isInitialized = true;
    } catch (e) {
      console.warn('GrooveReferenceLayer init failed:', e);
    }
  }

  // ========================================
  // BREATHING LFO (The System's Heartbeat)
  // ========================================
  
  startBreathingLFO() {
    if (this.breathingLFOInterval) clearInterval(this.breathingLFOInterval);
    
    this.breathingLFOInterval = setInterval(() => {
      this.updateBreathingLFO();
    }, 50); // Update every 50ms (20 FPS equivalent)
  }
  
  updateBreathingLFO() {
    const now = Tone.now();
    // Sine wave at 0.2 Hz: period = 5 seconds
    this.breathingLFO.phase = (now * this.breathingLFO.frequency) % 1;
    const sineValue = Math.sin(this.breathingLFO.phase * Math.PI * 2);
    
    // This value (-1 to 1) can be used by other systems
    this.breathingLFO.currentValue = sineValue;
  }
  
  /**
   * Get the current breathing effect (for reverb, filter, width)
   * @param {string} target - 'reverb' | 'filter' | 'width'
   */
  getBreathingModulation(target = 'reverb') {
    if (!this.breathingLFO.currentValue) return 0;
    
    const modAmount = {
      'reverb': this.breathingLFO.reverbModulation,
      'filter': this.breathingLFO.filterModulation,
      'width': this.breathingLFO.widthModulation
    }[target] || 0;
    
    return this.breathingLFO.currentValue * modAmount;
  }

  // ========================================
  // GHOST NOTES (Invisible Syncopation)
  // ========================================
  
  /**
   * Determine if this trigger should be muted (ghost note)
   * Creates natural syncopation by intentionally skipping beats
   */
  shouldTriggerGhostNote(interactionVelocity = 0) {
    if (!this.ghostNotes.enabled) return false;
    
    // Update groove phase
    this.ghostNotes.groovePhase = (Tone.now() * 0.5) % 1; // Slow phase cycle
    
    // Higher velocity interactions are more likely to skip
    const velocityFactor = Math.min(interactionVelocity / 500, 1); // 0-1
    
    // Probability increases if we're on an off-beat (phase > 0.5)
    const phaseAdjustment = this.ghostNotes.groovePhase > 0.5 ? 0.1 : 0;
    
    // Calculate final probability
    const triggerProbability = this.ghostNotes.baseProbability + velocityFactor * 0.2 + phaseAdjustment;
    
    // Return true if the trigger should be SKIPPED (ghost note)
    return Math.random() < triggerProbability;
  }

  // ========================================
  // ENTROPY-TO-WARMTH (Algorave Tube Amp)
  // ========================================
  
  /**
   * Update chaos/entropy metrics
   * Called by ChaosAudioEngineTone when attractor updates
   * @param {number} velocity - How fast the attractor is moving
   * @param {number} chaos - Chaos entropy value (0-1)
   */
  updateChaosMetrics(velocity, chaos) {
    this.entropyWarmth.chaosVelocity = velocity;
    this.entropyWarmth.userUnpredictability = chaos;
    this.recalculateGlobalSaturation();
  }
  
  /**
   * Recalculate global saturation based on current entropy
   */
  recalculateGlobalSaturation() {
    const targetSaturation = (this.entropyWarmth.chaosVelocity * 0.3 + 
                             this.entropyWarmth.userUnpredictability * 0.3 + 
                             this.interactionMemory.currentEnergy * 0.2) * 0.05; // Max 0.05
    
    // Smooth transition to target
    this.entropyWarmth.globalSaturation = (this.entropyWarmth.globalSaturation * this.entropyWarmth.saturationSmoothing) + 
                                          (targetSaturation * (1 - this.entropyWarmth.saturationSmoothing));
  }
  
  /**
   * Get current global saturation (0-1)
   * "The system is getting gritty and warm"
   */
  getGlobalSaturation() {
    return Math.max(0, Math.min(1, this.entropyWarmth.globalSaturation));
  }

  // ========================================
  // AEROSPACE TELEMETRY (Contextual Memory)
  // ========================================
  
  /**
   * Update system excitement (accumulates with interactions, decays slowly)
   * This is THE hidden variable that gives the system momentum
   */
  updateSystemExcitement(interactionIntensity = 0.5) {
    const now = Tone.now();
    const timeDelta = Math.max(0, now - this.systemMemory.lastExcitementUpdate);
    
    // Accumulate excitement from interaction
    this.systemMemory.systemExcitement += interactionIntensity * 0.1;
    
    // Decay excitement over time (very slowly)
    this.systemMemory.systemExcitement = Math.max(
      0,
      this.systemMemory.systemExcitement - (timeDelta * this.systemMemory.excitementDecayRate)
    );
    
    // Cap at 1.0
    this.systemMemory.systemExcitement = Math.min(1, this.systemMemory.systemExcitement);
    
    // Record history (keep last 20 samples)
    this.systemMemory.excitementHistory.push({
      time: now,
      value: this.systemMemory.systemExcitement
    });
    if (this.systemMemory.excitementHistory.length > 20) {
      this.systemMemory.excitementHistory.shift();
    }
    
    this.systemMemory.lastExcitementUpdate = now;
  }
  
  /**
   * Get current system excitement (0-1)
   * Machines that came before carry momentum into the present
   */
  getSystemExcitement() {
    return Math.min(1, this.systemMemory.systemExcitement);
  }

  // ========================================
  // SAMPLE CRAFT ATTACK (The Micro-Delay)
  // ========================================
  
  /**
   * Calculate attack delay based on user dwell time
   * @param {number} dwellTimeMs - How long the user has been hovering
   * @returns {number} Delay in milliseconds (0-15ms typically)
   */
  getAttackDelay(dwellTimeMs = 0) {
    if (!this.attackCraft.enabled) return 0;
    
    // If dwell time exceeds threshold, trigger instantly (deliberate)
    if (dwellTimeMs >= this.attackCraft.dwellThresholdMs) {
      return 0;
    }
    
    // Map dwell time to delay: less dwell = more delay (lazy response)
    const normalized = dwellTimeMs / this.attackCraft.dwellThresholdMs;
    const delay = this.attackCraft.maxDelayMs * (1 - normalized);
    
    return Math.max(this.attackCraft.minDelayMs, delay);
  }

  // ========================================
  // HARMONIC FUNCTION (Jazz Algorithm)
  // ========================================
  
  /**
   * Calculate harmonic relationship between two chords
   * Returns info needed to insert passing tones or transitions
   * @param {number} currentRoot - Current chord root frequency
   * @param {number} targetRoot - Target chord root frequency
   */
  calculateHarmonicFunction(currentRoot, targetRoot) {
    this.harmonicFunction.lastChordRoot = currentRoot;
    
    // Calculate semitone distance
    const ratio = targetRoot / currentRoot;
    const semitones = Math.round(12 * Math.log2(ratio));
    
    this.harmonicFunction.harmonicDistance = semitones;
    
    // If distance is large (more than a major 3rd), suggest altered tone
    this.harmonicFunction.insertAltered = Math.abs(semitones) > 4;
    
    // Drift tonal center toward target (slow evolution)
    const driftRate = 0.1;
    this.harmonicFunction.tonalCenter = (this.harmonicFunction.tonalCenter * (1 - driftRate)) + 
                                        (currentRoot * driftRate);
    
    return {
      distance: semitones,
      shouldInsertPassing: this.harmonicFunction.insertAltered,
      tonalCenter: this.harmonicFunction.tonalCenter
    };
  }
  
  /**
   * Get a "passing tone" frequency between two chords
   * Used to smooth jazz transitions
   */
  getPassingTone() {
    // Insert a diminished or altered dominant between the chords
    // For now, return a tone 6 semitones (tritone) from tonal center
    const tritoneRatio = Math.pow(2, 6 / 12); // 6 semitones = tritone
    return this.harmonicFunction.tonalCenter * tritoneRatio;
  }

  // ========================================
  // 2. PULSE GENERATION
  // ========================================
  
  /**
   * Get the next quantized time (for engines to sync to)
   * Returns the time in milliseconds when the next pulse hits
   */
  getNextPulseTime() {
    const beatDuration = (60 / this.ambientPulse.tempo) * 1000; // ms per beat
    const subdivisionDuration = beatDuration / this.ambientPulse.subdivision;
    const now = Tone.now() * 1000;
    const nextPulse = Math.ceil(now / subdivisionDuration) * subdivisionDuration;
    return nextPulse;
  }

  /**
   * Get swing offset (for humanized timing)
   * On-beat notes stay on beat; off-beat notes shift slightly later
   */
  getSwingOffset(subdivision) {
    const isOffBeat = subdivision % 2 === 1;
    return isOffBeat ? (this.ambientPulse.swing - 0.5) * 0.1 : 0;
  }

  /**
   * Drift the tempo slightly for organic feel
   * Tempo gently oscillates around base (96 ± 2 bpm)
   */
  updateTempoDrift() {
    const drift = Math.sin(Tone.now() / 10) * 2; // ±2 bpm oscillation
    this.ambientPulse.tempo = 96 + drift;
  }

  // ========================================
  // 3. INTERACTION TRACKING
  // ========================================
  
  /**
   * Record a user interaction (from any interactive element)
   * @param {HTMLElement} element - The element that was interacted with
   * @param {string} type - 'hover' | 'click' | 'drag' | 'scroll'
   * @param {Object} metadata - { velocity, dwell, x, y, etc. }
   */
  recordInteraction(element, type, metadata = {}) {
    const now = Date.now();
    
    // Add to recent interactions (keep last 10)
    this.interactionMemory.recentInteractions.push({
      type,
      timestamp: now,
      velocity: metadata.velocity || 0,
      dwell: metadata.dwell || 0,      // How long hovering before click
      element: element.className || 'unknown'
    });
    
    if (this.interactionMemory.recentInteractions.length > 10) {
      this.interactionMemory.recentInteractions.shift();
    }
    
    // Update average velocity
    const velocities = this.interactionMemory.recentInteractions.map(i => i.velocity);
    this.interactionMemory.averageVelocity = velocities.reduce((a, b) => a + b, 0) / velocities.length;
    
    // Update interaction time
    this.interactionMemory.lastInteractionTime = now;
    
    // === AUDITOR'S CODE: Update system excitement (momentum variable) ===
    this.updateSystemExcitement(metadata.velocity || 0.5);
    
    // Classify interaction pattern
    this.updateInteractionPattern();
    
    // Update energy (fast interactions = higher energy)
    this.updateCurrentEnergy();
    
    // === AUDITOR'S CODE: Check for ghost notes ===
    metadata.isGhostNote = this.shouldTriggerGhostNote(metadata.velocity || 0);
    
    this.performance.totalInteractions++;
    this.performance.isActive = true;
  }

  /**
   * Classify the current interaction pattern
   */
  updateInteractionPattern() {
    const recent = this.interactionMemory.recentInteractions.slice(-5);
    if (recent.length < 2) return;
    
    // Calculate average time between interactions
    let totalTime = 0;
    for (let i = 1; i < recent.length; i++) {
      totalTime += recent[i].timestamp - recent[i - 1].timestamp;
    }
    const avgInterval = totalTime / (recent.length - 1);
    
    // Classify based on interval
    if (avgInterval < 200) {
      this.interactionMemory.interactionPattern = 'rapid';
    } else if (avgInterval < 500) {
      this.interactionMemory.interactionPattern = 'exploring';
    } else if (avgInterval < 1500) {
      this.interactionMemory.interactionPattern = 'deliberate';
    } else {
      this.interactionMemory.interactionPattern = 'focused';
    }
  }

  /**
   * Update current energy based on recent activity
   * High velocity & rapid interactions = high energy
   * Slow, deliberate interactions = low energy
   */
  updateCurrentEnergy() {
    const velocityFactor = Math.min(this.interactionMemory.averageVelocity / 500, 1);
    
    const patternFactor = {
      'rapid': 0.9,
      'exploring': 0.6,
      'deliberate': 0.4,
      'focused': 0.2
    }[this.interactionMemory.interactionPattern] || 0.5;
    
    // Smooth transition to new energy (not abrupt)
    const targetEnergy = (velocityFactor * 0.5) + (patternFactor * 0.5);
    this.interactionMemory.currentEnergy = this.interactionMemory.currentEnergy * 0.8 + targetEnergy * 0.2;
  }

  /**
   * Get current energy (0-1 scale)
   * Engines use this to adjust their character
   */
  getCurrentEnergy() {
    return Math.min(Math.max(this.interactionMemory.currentEnergy, 0), 1);
  }

  /**
   * Get interaction pattern name
   */
  getInteractionPattern() {
    return this.interactionMemory.interactionPattern;
  }

  // ========================================
  // 4. CONTEXTUAL SPACE MANAGEMENT
  // ========================================
  
  /**
   * Update contextual zone (where is user in the portal?)
   * @param {string} zone - 'hub' | 'explorer' | 'immersive' | 'utility'
   */
  setContextualZone(zone) {
    if (zone === this.contextualSpace.currentZone) return; // No change
    
    // Capture energy from previous zone (carry it over for 3-5 seconds)
    this.contextualSpace.energyCarryover = this.interactionMemory.currentEnergy;
    
    // Update zone & parameters
    this.contextualSpace.currentZone = zone;
    this.contextualSpace.lastZoneChangeTime = Tone.now();
    
    // Adjust ambient reverb & filter based on zone
    switch (zone) {
      case 'hub':
        this.contextualSpace.ambientReverb = 0.25;
        this.contextualSpace.filterCutoff = 8000;
        break;
      case 'explorer':
        this.contextualSpace.ambientReverb = 0.4;
        this.contextualSpace.filterCutoff = 9000;
        break;
      case 'immersive':
        this.contextualSpace.ambientReverb = 0.6;
        this.contextualSpace.filterCutoff = 10000;
        break;
      case 'utility':
        this.contextualSpace.ambientReverb = 0.2;
        this.contextualSpace.filterCutoff = 7000;
        break;
    }
  }

  /**
   * Get current contextual reverb amount
   * Decays the energy carryover over 3-5 seconds
   */
  getContextualReverb() {
    const secondsSinceZoneChange = Tone.now() - this.contextualSpace.lastZoneChangeTime;
    const carryoverRemaining = Math.max(0, 1 - (secondsSinceZoneChange / 5)); // 5 second decay
    return this.contextualSpace.ambientReverb + (this.contextualSpace.energyCarryover * 0.1 * carryoverRemaining);
  }

  /**
   * Get filter cutoff (adaptive based on zone & energy)
   */
  getFilterCutoff() {
    const energy = this.getCurrentEnergy();
    const baseFreq = this.contextualSpace.filterCutoff;
    // Higher energy = slightly higher cutoff (more presence)
    return baseFreq + (energy * 2000);
  }

  // ========================================
  // 5. PERFORMANCE UTILITIES
  // ========================================
  
  /**
   * Get a synchronized frequency based on current energy
   * Engines use this for pitch mapping
   */
  getEnergyMappedFrequency(baseFreq = this.baseFreq) {
    const energy = this.getCurrentEnergy();
    // Low energy = lower octaves, high energy = higher octaves
    const transposition = Math.round(energy * 12); // 0-12 semitones
    return baseFreq * Math.pow(2, transposition / 12);
  }

  /**
   * Suggest an attack time based on interaction pattern
   * Quick interactions = fast attack
   * Deliberate interactions = slower attack (entry ceremony)
   */
  getSuggestedAttackTime() {
    const pattern = this.getInteractionPattern();
    switch (pattern) {
      case 'rapid': return 0.01;        // 10ms (snappy)
      case 'exploring': return 0.035;   // 35ms (moderate)
      case 'deliberate': return 0.08;   // 80ms (ceremonial)
      case 'focused': return 0.12;      // 120ms (contemplative)
      default: return 0.04;
    }
  }

  /**
   * Suggest a decay time (how long the note lingers)
   */
  getSuggestedDecayTime() {
    const pattern = this.getInteractionPattern();
    switch (pattern) {
      case 'rapid': return 0.15;
      case 'exploring': return 0.3;
      case 'deliberate': return 0.5;
      case 'focused': return 1.0;
      default: return 0.25;
    }
  }

  /**
   * Get suggested portamento (glide between notes)
   * Higher energy = quicker transitions
   */
  getSuggestedPortamento() {
    const energy = this.getCurrentEnergy();
    // Low energy (contemplative) = slower glide, high energy = faster
    return 0.05 + ((1 - energy) * 0.3); // 0.05 to 0.35 seconds
  }

  // ========================================
  // 6. STATE QUERIES
  // ========================================
  
  getState() {
    return {
      pulse: {
        tempo: this.ambientPulse.tempo,
        swing: this.ambientPulse.swing
      },
      interaction: {
        currentEnergy: this.getCurrentEnergy(),
        pattern: this.getInteractionPattern(),
        totalInteractions: this.performance.totalInteractions
      },
      space: {
        zone: this.contextualSpace.currentZone,
        reverb: this.getContextualReverb(),
        filterCutoff: this.getFilterCutoff()
      }
    };
  }

  // ========================================
  // 7. CLEANUP
  // ========================================
  
  dispose() {
    if (this.ambientPulse.synth) {
      this.ambientPulse.synth.dispose();
    }
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GrooveReferenceLayer;
}
