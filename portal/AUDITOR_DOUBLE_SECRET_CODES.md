# AUDITOR'S DOUBLE-SECRET CODES: IMPLEMENTATION GUIDE
## The Hidden Algorithmic Principles for Living Audio Systems

---

## EXECUTIVE SUMMARY

The five codes transform audio engines from *responsive* to *alive*. They are already baked into:
- **GrooveReferenceLayer** (shared infrastructure)
- **LabUtilityTone** (foundation engine)

When building the remaining four engines (MandalaAudioTone, ChaosAudioTone, DeJongExplorerTone, TwelveFacesAudioTone), you must weave these codes into each one. This document explains what each code does and how to use it.

---

## THE SIX CODES

### **1. GHOST NOTES (Invisible Syncopation)**

**What It Does:**  
Creates natural groove by *intentionally skipping certain triggers*. Instead of playing every interaction, the system occasionally stays silent. This forces the listener's brain to anticipate and fills in the gap—the psychological root of groove.

**From GrooveReferenceLayer:**
```javascript
const isGhost = groove.shouldTriggerGhostNote(velocity);
if (isGhost) {
  return; // Don't play this trigger
}
// Play normally
```

**When to Use:**
- Any rapid series of interactions (hovers, clicks, drags)
- When you want to create "pocket" feeling (not mechanical)
- In MandalaAudioTone when rings are hovered rapidly
- In ChaosAudioTone when attractor is moving fast

**Effect:**
- User interacts 10 times
- System plays 8-9 times
- User's brain fills in the missing ones
- Feels like groove, not glitches

**Probability Calculation:**
```
trigger_probability = base_probability (15%) + 
                     velocity_factor (0-20%) + 
                     phase_adjustment (0-10%)
```

---

### **2. ENTROPY-TO-WARMTH (Algorave Tube Amp)**

**What It Does:**  
Maps system chaos/entropy to harmonic saturation. When the user is exploring erratically (high chaos), the system sounds "driven," "gritty," "hot." When they slow down, the signal cleans up.

**From GrooveReferenceLayer:**
```javascript
// In ChaosAudioEngineTone, when attractor updates:
groove.updateChaosMetrics(velocity, chaosEntropy);

// Query it anytime:
const saturation = groove.getGlobalSaturation(); // 0-1
```

**When to Use:**
- ChaosAudioEngineTone: Use attractor chaosVelocity + unpredictability
- DeJongExplorerTone: Map parameter-changing velocity
- Any engine where user input has "chaos" or "energy" dimension

**Effect:**
- Low saturation (0-0.02): Clean, crystalline, precise
- Mid saturation (0.02-0.05): Warm, organic, intentional
- High saturation (0.05+): Driven, pushed, energetic

**Implementation:**
```javascript
// Apply saturation to synth output (pseudo-code)
synth.chain(saturationEffect);
saturationEffect.drive = groove.getGlobalSaturation() * 100; // 0-5 drive amount
```

---

### **3. AEROSPACE TELEMETRY DECAY (Contextual Memory)**

**What It Does:**  
Implements "System Excitement"—a momentum variable that accumulates with interactions but decays very slowly (over ~2 minutes). When a user switches tools/pages, the previous energy "echoes" into the new context.

**From GrooveReferenceLayer:**
```javascript
// In any interaction:
groove.recordInteraction(element, type, { velocity });
// This automatically calls updateSystemExcitement()

// Query anytime:
const excitement = groove.getSystemExcitement(); // 0-1
```

**When to Use:**
- When a tool/page is activated (influence volume, presence)
- When transitioning between zones (carry energy forward)
- Zone transitions: Hub → Explorer (excitement carries over)
- Should affect reverb, filter, and presence

**Effect:**
- If user was exploring frantically in one page, tools on the next page start with boosted presence
- Creates narrative continuity ("the system is still buzzing from what we just did")
- Decays over 2 minutes, not instantly

**Calculation:**
```
excitement = max(0, excitement + current_interaction_weight - (time_delta * decay_rate))
decay_rate = 0.0005 per millisecond ≈ 120 seconds to zero
```

**Usage in Engines:**
```javascript
// In playToolStateChord, DeJongExplorerTone, etc:
const systemExcitement = groove.getSystemExcitement();
const volumeBoost = systemExcitement * 6; // Up to +6dB
synth.volume.value = baseVolume + volumeBoost;
```

---

### **4. SAMPLE CRAFT ATTACK ENVELOPE (The Micro-Delay)**

**What It Does:**  
Introduces algorithmic micro-delays (0-15ms) on note attacks based on user dwell time. Quick clicks trigger immediately (sharp). Hovering-then-clicking triggers slightly delayed (lazy, laid-back).

**From GrooveReferenceLayer:**
```javascript
const dwellTimeMs = 500; // How long user hovered before clicking
const delayMs = groove.getAttackDelay(dwellTimeMs); // 0-15ms
```

**When to Use:**
- Every time a note is triggered
- Use dwell time from hover duration
- In MandalaAudioTone: Ring hover duration before click
- In DeJongExplorerTone: How long slider was touched before moving
- In TwelveFacesAudioTone: How long face card was inspected

**Effect:**
- Instant click: 0ms delay (sharp transient, "thwack")
- 100ms hover then click: 10ms delay (slightly lazy, "whomp")
- 500ms dwell then click: 0ms delay (deliberate, "shwing")

**Calculation:**
```
delay = maxDelay * (1 - normalized_dwell_time)
      = 15ms * (1 - current_dwell / threshold_dwell)
```

---

### **5. TENSION/RESOLUTION HARMONIC PIVOT (Jazz Algorithm)**

**What It Does:**  
Calculates harmonic relationships between chords and inserts passing tones automatically. When moving between two chords that are far apart, injects a diminished or altered tone to justify the movement.

**From GrooveReferenceLayer:**
```javascript
// When moving from chord A to chord B:
const harmInfo = groove.calculateHarmonicFunction(rootA, rootB);

if (harmInfo.shouldInsertPassing) {
  // Play passing tone first
  synth.triggerAttackRelease(groove.getPassingTone(), '0.08', now);
  // Then play target chord
}
```

**When to Use:**
- TwelveFacesAudioTone: When navigating between faces
- LabUtilityTone: When switching tools (already implemented)
- DeJongExplorerTone: When switching presets
- Anywhere you transition between harmonic centers

**Effect:**
- Small harmonic movement (2 semitones): No passing tone
- Large harmonic movement (>4 semitones): Tritone passing tone first
- Makes transitions feel composed, not abrupt

**Jazz Principle:**
- Without: C major → F# minor (jarring, disconnected)
- With: C major → B/C tritone → F# minor (smooth, intentional)

---

### **6. BREATHING MASTER BUS (The System's Heartbeat)**

**What It Does:**  
A global, imperceptible sine wave at 0.2 Hz (one cycle every 5 seconds). This modulates:
- Reverb decay (± 2%)
- Filter cutoff (± 1%)
- Stereo width (± 3%)

The system is *alive* even when the user does nothing.

**From GrooveReferenceLayer:**
```javascript
// Called automatically by GrooveReferenceLayer.startBreathingLFO()
// Every 50ms:
groove.updateBreathingLFO();

// Query the modulation:
const breathReverb = groove.getBreathingModulation('reverb');  // ±2%
const breathFilter = groove.getBreathingModulation('filter');  // ±1%
const breathWidth = groove.getBreathingModulation('width');    // ±3%
```

**When to Use:**
- Apply to all synths' output reverb/filter
- Subtle effect on master bus effects
- Creates imperceptible "aliveness"

**Effect:**
- Without: Dead, static, mechanical
- With: Alive, breathing, present

**Implementation:**
```javascript
// Pseudo-code
const baseReverb = 0.4;
const breathMod = groove.getBreathingModulation('reverb');
actualReverb = baseReverb + breathMod; // Sways between 0.39-0.41

const baseFilter = 8000;
const breathMod = groove.getBreathingModulation('filter');
actualFilter = baseFilter + breathMod; // Sways between 7992-8008 Hz
```

---

## INTEGRATION CHECKLIST FOR EACH ENGINE

When building a new engine, include:

- [ ] **Ghost Notes**: Implement `groove.shouldTriggerGhostNote()` in trigger methods
- [ ] **Entropy-to-Warmth**: Call `groove.updateChaosMetrics()` when system state changes
- [ ] **System Excitement**: Call `groove.recordInteraction()` (auto-tracks excitement)
- [ ] **Attack Delay**: Use `groove.getAttackDelay(dwellTime)` in note triggering
- [ ] **Harmonic Pivot**: Call `groove.calculateHarmonicFunction()` in chord transitions
- [ ] **Breathing LFO**: Apply `groove.getBreathingModulation()` to reverb/filter/width

---

## EXAMPLE: Building MandalaAudioEngineTone

```javascript
class MandalaAudioEngineTone {
  constructor(grooveLayer) {
    this.groove = grooveLayer;
    this.rings = [];
    this.lastRingRoot = 261.63;
  }

  onRingHover(ringIndex, event) {
    const velocity = event.clientX * 2; // Simplified velocity calc
    
    // === GHOST NOTES ===
    if (this.groove.shouldTriggerGhostNote(velocity)) {
      return; // Silent hover
    }

    // === SAMPLE CRAFT (ATTACK DELAY) ===
    const dwellTime = event.timeStamp - this.hoverStartTime;
    const delayMs = this.groove.getAttackDelay(dwellTime);

    // === Calculate frequency ===
    const frequency = this.getRingFrequency(ringIndex);
    
    // === HARMONIC PIVOT (if multi-ring interaction) ===
    if (this.lastRingInteraction && Math.abs(ringIndex - this.lastRingInteraction) > 2) {
      const harmInfo = this.groove.calculateHarmonicFunction(this.lastRingRoot, frequency);
      if (harmInfo.shouldInsertPassing) {
        const passingTone = this.groove.getPassingTone();
        this.synth.triggerAttackRelease(passingTone, '0.08', Tone.now());
      }
    }

    // === BREATHING LFO ===
    const breathReverb = this.groove.getBreathingModulation('reverb');
    const reverbAmount = 0.3 + breathReverb;

    // === Play with all optimizations ===
    const now = Tone.now() + (delayMs / 1000);
    this.synth.triggerAttackRelease(frequency, '0.4', now);
    
    this.lastRingRoot = frequency;
    this.lastRingInteraction = ringIndex;
  }

  onRotate(angle, velocity) {
    // === ENTROPY-TO-WARMTH ===
    // Rotation velocity is a form of "chaos"
    const chaosValue = Math.abs(velocity) / 500; // Normalize
    this.groove.updateChaosMetrics(velocity, chaosValue);

    // === SYSTEM EXCITEMENT ===
    // Fast rotation = exciting
    this.groove.recordInteraction(this.element, 'rotate', { velocity });
  }
}
```

---

## AUDITOR'S WISDOM

> "These codes work together. Ghost Notes provide groove. Entropy-to-Warmth provides character. System Excitement provides continuity. Attack Delay provides intentionality. Harmonic Pivot provides musicality. Breathing LFO provides life.
>
> Together, they make the system feel less like a machine and more like a performer that listens and responds.
>
> Use all six. Use them well."

---

## SUMMARY: Why This Matters

**Without these codes:** Engine sounds responsive but isolated, mechanical, and doesn't accumulate meaning.

**With these codes:**
- The system has rhythm (Ghost Notes)
- The system has temperature (Entropy-to-Warmth)
- The system has memory (System Excitement)
- The system has intentionality (Attack Delay)
- The system is musical (Harmonic Pivot)
- The system is alive (Breathing LFO)

**The result:** Listeners feel like they're performing *with* the system, not at it.
