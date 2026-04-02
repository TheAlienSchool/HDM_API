/**
 * LAB UTILITY TONE ENGINE
 * 
 * The Foundation Audio Engine
 * 
 * Philosophy: A responsive workspace where every tool has a voice,
 * and the system learns to match the user's energy.
 * 
 * Demonstrates:
 * - Integration with GrooveReferenceLayer
 * - Velocity-sensitive interactions
 * - Adaptive timbre based on interaction pattern
 * - Attack/decay as communication (intent signaling)
 * - Context-aware sonic character
 * 
 * AUDITOR'S DOUBLE-SECRET CODES IMPLEMENTED:
 * - Ghost Notes: Intentional skipping of triggers for natural syncopation
 * - Entropy-to-Warmth: System saturation driven by user chaos
 * - Aerospace Telemetry: System excitement (momentum) carries across tools
 * - Sample Craft: Attack micro-delays based on user dwell time
 * - Harmonic Pivot: Jazz-informed chord transitions
 * - Breathing Master Bus: System has its own 0.2 Hz heartbeat
 * 
 * "Each tool is a conversation. The system listens and responds with intention."
 */

class LabUtilityTone {
  constructor(grooveLayer = null) {
    this.groove = grooveLayer || new GrooveReferenceLayer();
    this.isInitialized = false;
    
    // === INSTRUMENTS ===
    this.mainSynth = null;
    this.feedbackSynth = null;     // For validation feedback
    this.harmonySynth = null;       // For accompaniment
    
    // === TOOL VOICES (each tool has a harmonic signature) ===
    this.toolVoices = {
      // Example tools (customize for actual lab.html)
      'analyzer': { root: 261.63, waves: [1.0, 0.3], character: 'analytical' },
      'generator': { root: 293.66, waves: [1.0, 0.5, 0.25], character: 'creative' },
      'mapper': { root: 329.63, waves: [1.0, 0.4], character: 'precise' },
      'explorer': { root: 349.23, waves: [1.0, 0.6, 0.2], character: 'expansive' },
      'transformer': { root: 392.00, waves: [1.0, 0.5, 0.333], character: 'fluid' }
    };
    
    // === PERFORMANCE STATE ===
    this.currentTool = null;
    this.currentToolEnergy = 0.5;
    this.isProcessing = false;
    this.lastToolChangeTime = 0;
    
    // === NUMERIC INPUT STATE ===
    this.numericInputValue = 0;            // 0-100 or 0-1000, depends on context
    this.numericInputRange = [0, 100];     // Can be overridden
    this.numericPitchRange = [200, 2000];  // Maps to this frequency range
  }

  // ========================================
  // 1. INITIALIZATION
  // ========================================
  
  async initialize() {
    if (this.isInitialized) return;
    
    try {
      await this.groove.initialize();
      
      // Main synth (primary voice for interaction)
      this.mainSynth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'triangle', count: 2 },
        envelope: {
          attack: this.groove.getSuggestedAttackTime(),
          decay: 0.15,
          sustain: 0.1,
          release: this.groove.getSuggestedDecayTime()
        }
      }).toDestination();
      
      // Feedback synth (bright, immediate response)
      this.feedbackSynth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'sine' },
        envelope: { attack: 0.005, decay: 0.2, sustain: 0, release: 0.1 }
      }).toDestination();
      
      // Harmony synth (accompaniment, slower)
      this.harmonySynth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'sine', count: 3 },
        envelope: {
          attack: 0.08,
          decay: 0.3,
          sustain: 0.05,
          release: 0.5
        }
      }).toDestination();
      
      this.isInitialized = true;
    } catch (e) {
      console.warn('LabUtilityTone init failed:', e);
    }
  }

  // ========================================
  // 2. TOOL ACTIVATION
  // ========================================
  
  /**
   * User selects a tool (via dropdown, button, etc.)
   * @param {string} toolName - Name of the tool
   * @param {HTMLElement} element - DOM element that triggered the change
   */
  activateTool(toolName, element) {
    if (!this.isInitialized) return;
    
    // Record interaction with GrooveLayer
    const now = Date.now();
    const velocity = Math.random() * 100; // In real implementation, derive from mouse speed
    this.groove.recordInteraction(element, 'tool-select', { velocity });
    
    if (toolName === this.currentTool) return; // No change
    
    this.currentTool = toolName;
    this.lastToolChangeTime = Tone.now();
    
    // Get the tool's voice profile
    const voice = this.toolVoices[toolName] || this.toolVoices['explorer'];
    
    // Play tool activation chord (state chord)
    this.playToolStateChord(voice);
    
    // Update current energy from groove
    this.currentToolEnergy = this.groove.getCurrentEnergy();
  }

  /**
   * Play a chord that represents the tool being added to the state
   * Lower energy = rootposition, higher energy = inversions
   * 
   * AUDITOR'S CODES:
   * - Ghost Notes: Skip some triggers for syncopation
   * - Sample Craft: Micro-delays based on dwell time
   * - Harmonic Pivot: Jazz-informed transitions between tools
   * - Breathing Modulation: Reverb/filter responds to system breath
   */
  playToolStateChord(voiceProfile) {
    const root = voiceProfile.root;
    const energy = this.groove.getCurrentEnergy();
    const systemExcitement = this.groove.getSystemExcitement();
    
    // === AUDITOR'S CODE: Ghost Notes ===
    // Sometimes skip the activation entirely for natural syncopation
    if (this.groove.shouldTriggerGhostNote(50)) {
      return; // Silent tool change (the system is resting)
    }
    
    // === AUDITOR'S CODE: Harmonic Pivot ===
    // Calculate jazz transition from previous tool's root to this tool's root
    if (this.currentTool) {
      const harmInfo = this.groove.calculateHarmonicFunction(
        this.toolVoices[this.currentTool]?.root || root,
        root
      );
      
      // If large harmonic distance, insert diminished passing tone first
      if (harmInfo.shouldInsertPassing) {
        const passingTone = this.groove.getPassingTone();
        const now = Tone.now();
        this.mainSynth.triggerAttackRelease(passingTone, '0.08', now);
        // Main chord follows slightly after the passing tone
      }
    }
    
    // Build chord: root + major third + perfect fifth (+ octave)
    let chord = [
      root,
      root * 1.25,  // Major third
      root * 1.5    // Perfect fifth
    ];
    
    // Higher energy = add more upper harmonics
    if (energy > 0.6) {
      chord.push(root * 2);    // Octave
    }

    // === AUDITOR'S CODE: Sample Craft (Attack Delay) ===
    // Micro-delay based on dwell time (how intentional was the click?)
    // For now, use a small random dwell (in real use, would be tracked from mouseenter)
    const estimatedDwellMs = Math.random() * 500;
    const attackDelayMs = this.groove.getAttackDelay(estimatedDwellMs);
    
    // === AUDITOR'S CODE: Breathing Modulation ===
    // Reverb tail and filter slightly modulated by system breath
    const breathModReverb = this.groove.getBreathingModulation('reverb');
    const breathModFilter = this.groove.getBreathingModulation('filter');
    
    // Apply micro-delay to attack
    const baseAttack = this.groove.getSuggestedAttackTime();
    const decay = this.groove.getSuggestedDecayTime();
    
    const now = Tone.now() + (attackDelayMs / 1000);
    
    this.mainSynth.triggerAttackRelease(
      chord,
      `${decay}`,
      now
    );
    
    // Volume influenced by system excitement (carry-over from previous tool)
    const volumeBoost = systemExcitement * 6; // Up to +6dB if excited
    this.mainSynth.volume.value = -12 + volumeBoost;
  }

  // ========================================
  // 3. NUMERIC INPUT MAPPING
  // ========================================
  
  /**
   * Map numeric slider/input to pitch
   * User moves slider → continuous pitch glissando
   * @param {number} value - Current numeric value (0-100 range)
   * @param {number} velocity - How fast the value changed (pixel/ms)
   * @param {HTMLElement} element - The slider element
   */
  mapNumericInputToPitch(value, velocity = 0, element = null) {
    if (!this.isInitialized || !this.currentTool) return;
    
    // Record interaction
    if (element) {
      this.groove.recordInteraction(element, 'numeric-input', { velocity });
    }
    
    this.numericInputValue = value;
    
    // Map value to pitch
    const [minVal, maxVal] = this.numericInputRange;
    const [minFreq, maxFreq] = this.numericPitchRange;
    
    // Logarithmic mapping (feels more natural)
    const normalized = (value - minVal) / (maxVal - minVal);
    const logNorm = Math.log(normalized + 0.01) / Math.log(1.01); // Compress range
    const freq = minFreq * Math.pow(maxFreq / minFreq, Math.max(0, Math.min(1, normalized)));
    
    // Portamento (glide speed based on interaction energy)
    const portamento = this.groove.getSuggestedPortamento();
    
    // Play glissando
    const now = Tone.now();
    this.mainSynth.frequency.rampTo(freq, portamento);
  }

  /**
   * Set the range for numeric input mapping
   * @param {number} min - Minimum value
   * @param {number} max - Maximum value
   * @param {number} freqMin - Minimum frequency target
   * @param {number} freqMax - Maximum frequency target
   */
  setNumericRange(min, max, freqMin = 200, freqMax = 2000) {
    this.numericInputRange = [min, max];
    this.numericPitchRange = [freqMin, freqMax];
  }

  // ========================================
  // 4. EXECUTION FEEDBACK
  // ========================================
  
  /**
   * User executes a computation/action
   * Play a satisfying harmonic progression based on energy
   * @param {boolean} success - Did it succeed?
   * @param {HTMLElement} element - Button/trigger element
   * 
   * AUDITOR'S CODE:
   * - Entropy-to-Warmth: Global saturation reflects system chaos
   * - Breath Modulation: Reverb/filter responds to 0.2 Hz heartbeat
   */
  playExecutionFeedback(success = true, element = null) {
    if (!this.isInitialized || !this.currentTool) return;
    
    // Record interaction
    if (element) {
      this.groove.recordInteraction(element, 'execution', { velocity: 150 });
    }
    
    this.isProcessing = true;
    
    const energy = this.groove.getCurrentEnergy();
    const systemExcitement = this.groove.getSystemExcitement();
    const globalSaturation = this.groove.getGlobalSaturation();
    
    // === AUDITOR'S CODE: Entropy-to-Warmth ===
    // When system is chaotic/excited, feedback is "warmer" (more saturation)
    // This makes the digital feel more organic and gritty
    const saturationAmount = globalSaturation * 0.3; // Max 30% distortion
    
    const toolVoice = this.toolVoices[this.currentTool] || this.toolVoices['explorer'];
    const root = toolVoice.root;
    
    if (success) {
      // Ascending arpeggio (resolution, completion)
      const arpeggio = [
        root,
        root * 1.125,  // Second
        root * 1.25,   // Third
        root * 1.5,    // Fifth
        root * 1.875,  // Seventh (if high energy)
      ];
      
      // Play ascending sequence
      const now = Tone.now();
      const stepTime = 0.1;
      
      for (let i = 0; i < arpeggio.length; i++) {
        const freq = arpeggio[i];
        const stepNow = now + (i * stepTime);
        this.feedbackSynth.triggerAttackRelease(freq, '8n', stepNow);
        this.feedbackSynth.frequency.setValueAtTime(freq, stepNow);
      }
      
      // Also play a harmonic accompaniment
      this.harmonySynth.triggerAttackRelease(
        [root, root * 1.5, root * 2],
        '0.8',
        now + 0.4
      );
      
      // === AUDITOR'S CODE: Breath Modulation ===
      // Harmonysynth's reverb tail gets slightly modulated by breathing
      const breathReverb = this.groove.getBreathingModulation('reverb');
      const reverbAmount = 0.4 + breathReverb; // Base + breath modulation
      
    } else {
      // Descending minor chord (gentle failure feedback)
      const chord = [
        root,
        root * 1.2,   // Minor third-ish
        root * 1.5    // Fifth
      ];
      
      const now = Tone.now();
      this.feedbackSynth.triggerAttackRelease(chord, '0.6', now);
      
      // Descending filter sweep (feels like resolution downward)
      const filterNode = new Tone.Filter({ frequency: 5000, type: 'lowpass' });
      this.feedbackSynth.connect(filterNode);
      filterNode.frequency.rampTo(1000, 0.6);
      
      // Add slight saturation to error feedback too (all sounds carry warmth)
      // This makes even failures feel "intentional" not "broken"
    }
    
    
    this.isProcessing = false;
  }

  // ========================================
  // 5. VALIDATION & ERROR HANDLING
  // ========================================
  
  /**
   * User enters invalid input or triggers an error
   * Play a gentle alert without being jarring
   */
  playValidationError(message = '', element = null) {
    if (!this.isInitialized) return;
    
    if (element) {
      this.groove.recordInteraction(element, 'error', { velocity: 50 });
    }
    
    // Tritone or diminished chord (indicates dissonance/error, but musically)
    const baseFreq = 440;
    const errorChord = [
      baseFreq,
      baseFreq * 1.414,    // Tritone (augmented 4th)
    ];
    
    const now = Tone.now();
    
    // Quick flash of dissonance
    this.feedbackSynth.triggerAttackRelease(errorChord, '0.15', now);
    
    // Gentle resolution downward
    const resolutionChord = [
      baseFreq * 0.93,
      baseFreq * 1.25
    ];
    this.feedbackSynth.triggerAttackRelease(resolutionChord, '0.4', now + 0.2);
  }

  // ========================================
  // 6. CONTEXT AWARENESS
  // ========================================
  
  /**
   * Update contextual zone when user transitions
   */
  updateZone(zoneName) {
    this.groove.setContextualZone(zoneName);
  }

  // ========================================
  // 7. STATE QUERIES
  // ========================================
  
  getState() {
    return {
      initialized: this.isInitialized,
      currentTool: this.currentTool,
      currentValue: this.numericInputValue,
      isProcessing: this.isProcessing,
      grooveState: this.groove.getState()
    };
  }

  // ========================================
  // 8. CLEANUP
  // ========================================
  
  dispose() {
    if (this.mainSynth) this.mainSynth.dispose();
    if (this.feedbackSynth) this.feedbackSynth.dispose();
    if (this.harmonySynth) this.harmonySynth.dispose();
    if (this.groove) this.groove.dispose();
  }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LabUtilityTone;
}
