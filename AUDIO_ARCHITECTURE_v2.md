# PORTAL AUDIO ARCHITECTURE v2
## Foundation-First Rebuild with Auditor Insights

---

## EXECUTIVE SUMMARY: What Changed

**The Insight:** Your initial engines were harmonically sophisticated but rhythmically isolated. Each engine operated on its own clock, without shared context or responsiveness. The auditor revealed that this creates dissonance :: not sonic, but experiential.

**The New Approach:**
1. **Global Groove Reference Layer** (groove-reference-layer.js) :: The "room" all engines share
2. **Foundation Engine** (LabUtilityTone) :: Demonstrates the philosophy, built first
3. **Four Specialized Engines** :: Built from the same foundation, not from scratch

**The Difference:**
- **Before:** 5 independent engines (MandalaAudioEngineTone, ChaosAudioEngineTone, etc.)
- **After:** 1 shared infrastructure + 5 engines that learn from each other

---

## PART 1: THE SHARED INFRASTRUCTURE

### **GrooveReferenceLayer** ✅ COMPLETE
**Status:** groove-reference-layer.js (410 lines) :: The foundation

**What It Does:**
- **Ambient Pulse:** A breathing metronome (not a strict clock), with tempo drift and swing
- **Interaction Memory:** Tracks how fast/slow the user moves, categorizes patterns (rapid/exploring/deliberate/focused)
- **Contextual Space:** Knows what "room" you're in (hub vs. explorer vs. immersive vs. utility) and adjusts reverb/filter accordingly
- **Carry-Over Energy:** When you transition zones, the previous zone's energy "echoes" for 3-5 seconds, maintaining coherence

**Core Capabilities:**
```javascript
groove.recordInteraction(element, 'hover', {velocity: 42});
groove.getCurrentEnergy();              // 0-1 scale
groove.getInteractionPattern();         // 'rapid' | 'exploring' | 'deliberate' | 'focused'
groove.setContextualZone('immersive');  // Updates reverb/filter
groove.getSuggestedAttackTime();        // Adapts envelope based on user speed
groove.getSuggestedPortamento();        // Glide speed between notes
```

**Used By:** All five specialized engines share this reference layer

---

## PART 2: THE FOUNDATION ENGINE

### **LabUtilityTone** ✅ COMPLETE
**Status:** lab-utility-tone.js (340 lines) :: Foundation demonstration

**Target Page:** explorers/laboratory.html

**Philosophy:** "Each tool is a conversation."

**Demonstrates:**
- Integration with GrooveReferenceLayer
- Velocity-sensitive interactions
- Adaptive envelope (attack/decay based on user energy)
- Tool-based voice profiles (each tool has a unique harmonic signature)
- Execution feedback (success = ascending arpeggio, failure = gentle descent)
- Validation error handling (tritone flash → resolution)
- Context awareness

**Key Methods:**
```javascript
const lab = new LabUtilityTone(globalGrooveLayer);
lab.activateTool('analyzer', element);           // Tool selection → state chord
lab.mapNumericInputToPitch(value, velocity);     // Slider → glissando pitch
lab.playExecutionFeedback(true, element);        // Success → harmonic progression
lab.playValidationError(message, element);       // Error → tritone flash + resolution
lab.updateZone('utility');                       // Tell groove what zone we're in
```

**Character:** "Adaptive Utility"
- Quick, responsive
- Learns user's tempo
- Shifts timbre based on interaction speed
- Clean, technical voice (not lush)

**Integration Points (laboratory.html):**
- Tool selection dropdowns/buttons → `activateTool()`
- Numeric sliders/inputs → `mapNumericInputToPitch()`
- "Execute" or "Run" button → `playExecutionFeedback()`
- Form validation errors → `playValidationError()`

---

## PART 3: THE FOUR SPECIALIZED ENGINES (Phase 3B)

All four will follow the same pattern: inherit from GrooveReferenceLayer, implement character-specific voices, demonstrate the "pocket."

### **3B-1: MandalaAudioEngineTone**
**Target:** explorers/frequency-resonance-mandala.html  
**Character:** "Crystalline Precision"  
**Build Order:** 1 (immediately after LabUtilityTone validates the architecture)  
**Est. Time:** 20 min | **Priority:** 🔴 HIGH

**Auditor Insights Applied:**
- Rotation speed → quantization reference (rings sync to mandala's spin tempo)
- Ring hover → plays frequency, but timing is influenced by rotation pulse
- Color shifts → filter character changes (not just frequency)
- Fast rotation = energetic upper harmonics, slow rotation = contemplative lower harmonics

**Architecture:**
```javascript
const mandala = new MandalaAudioEngineTone(globalGrooveLayer);
mandala.onRotate(angle, velocity);               // Rotation creates tempo reference
mandala.onRingHover(ringIndex, element);         // Hover plays quantized frequency
mandala.onRingClick(ringIndex, element);         // Click = harmonic chord
mandala.getRotationTempo();                      // Returns RPM as BPM analogue
```

**Unique Features:**
- 36 frequency layers (12 rings × 3 octaves)
- Phi-indexed color-to-frequency mapping
- Rotation-as-performance: spin slowly for contemplation, fast for enthusiasm
- Ambient biotexture syncs to rotation speed

---

### **3B-2: ChaosAudioEngineTone**
**Target:** explorers/de-jong-attractor.html  
**Character:** "Evolving Grit"  
**Build Order:** 2 (directly depends on rotation concept from Mandala)  
**Est. Time:** 22 min | **Priority:** 🔴 HIGH

**Auditor Insights Applied:**
- Attractor position (X, Y) → live sine wave modulation (not just visual, sonic chaos)
- Parameter change → velocity detection creates expressiveness (fast tweak = bright, slow tweak = dark)
- Zoom level → transposition (zoom in = higher frequencies, like looking closer = hearing higher)
- Chaos entropy → portamento rate (chaotic attractor = slower glide, ordered = sharp clicks)

**Architecture:**
```javascript
const chaos = new ChaosAudioEngineTone(globalGrooveLayer);
chaos.onAttractorUpdate(x, y, energy);           // Position → modulated frequency
chaos.onParameterChange(param, oldVal, newVal); // Slider event → velocity detection
chaos.setParameterCharacteristic(param, 'gritty' | 'fluid' | 'precise');
chaos.onZoom(level);                              // Zoom → transposition
```

**Unique Features:**
- X, Y coordinates modulate frequency + amplitude in real-time
- Parameter velocity mapped to filter character
- Zoom-as-transposition (perceptual coherence)
- Gentle FM synthesis (frequency modulation) from chaotic motion
- Optional granular texture for "grit"

---

### **3B-3: DeJongExplorerTone**
**Target:** explorers/dejong-attractor-explorer.html  
**Character:** "Tactile Glissando"  
**Build Order:** 3 (extends Chaos with explicit parameter mapping)  
**Est. Time:** 18 min | **Priority:** 🔴 HIGH

**Auditor Insights Applied:**
- Each slider is a performance gesture (not a parameter change)
- Slider velocity determines timbre (fast = bright, slow = dark)
- Preset selection plays a harmonic chord signature (each preset has a unique identity)
- Save/export → satisfying resolution (ascending arpeggio or harmonic resolution)

**Architecture:**
```javascript
const dejong = new DeJongExplorerTone(globalGrooveLayer);
dejong.mapSliderToPitch(sliderId, minFreq, maxFreq);
dejong.onSliderMove(sliderId, value, velocity);         // Velocity → timbre
dejong.onPresetSelect(presetName);                      // Preset → harmonic signature
dejong.playExportResolution();                          // Save → satisfying completion
```

**Unique Features:**
- Each of the 4-6 parameters has a dedicated frequency range
- Slider velocity controls oscillator waveform (lower energy = sine, higher = complex waves)
- Preset library with harmonic signatures
- "Memory" of favorite presets (can play harmonic journey through favorites)

---

### **3B-4: TwelveFacesAudioTone**
**Target:** explorers/twelve-faces.html  
**Character:** "Harmonic Warmth" (Jazz-voiced)  
**Build Order:** 4 (foundation-last, allows time for all others to establish groove language)  
**Est. Time:** 20 min | **Priority:** 🟡 MEDIUM

**Auditor Insights Applied:**
- Each of 12 archetypes has a unique harmonic signature (rooted in jazz voicing theory)
- Hover → play root note with characteristic color
- Click → full chord arpeggio (5–7 notes, jazz voicing)
- Sequential navigation → harmonic journey (each chord suggests harmonic continuity to next face)
- Background ambience → subtle, long-decay voicing of the current face

**Architecture:**
```javascript
const faces = new TwelveFacesAudioTone(globalGrooveLayer);
faces.onFaceHover(faceIndex);                    // Hover → root tone
faces.onFaceClick(faceIndex);                    // Click → full chord arpeggio
faces.onFaceNavigate(fromIndex, toIndex);        // Navigation → harmonic bridge
faces.getHarmonicSignature(faceIndex);           // Query the chord voicing
faces.setAmbientVoicing(faceIndex, intensity);   // Background ambience
```

**Unique Features:**
- 12 unique harmonic identities (based on 12-tone equal temperament + jazz reharmonization)
- Chord voicings evolve based on navigation sequence (the system learns your path)
- Long-decay ambient underneath (like a string section)
- Context memory: if you were just in high-energy explorer mode, faces start voiced higher

---

### **3B-5: Bonus Engine (If Timeline Permits)**

**FrequencyResonanceMandalaAudioTone** (Alternative to Mandala)  
- More immersive, binaural beats, frequency-specific healing tones
- Would be the "luxury" version if we have extra time
- Can be shelved for Phase 3C

---

## PART 4: BUILD SEQUENCE & TIMELINE

### **Phase 3B-1: Stabilize LabUtilityTone** (Week of April 1–5, 2026)
**Goal:** Validate that the GrooveReferenceLayer + LabUtilityTone architecture works in production

1. **Monday:** Integrate LabUtilityTone into explorers/laboratory.html
2. **Tuesday:** Test interaction pattern tracking (rapid vs. deliberate)
3. **Wednesday:** Validate envelope adaptation (quick users get snappy attacks)
4. **Thursday:** Cross-browser testing (Chrome, Firefox, Safari)
5. **Friday:** Document integration pattern for remaining engines

**Deliverable:** laboratory.html is fully sonified and serves as the template

---

### **Phase 3B-2: Mandala Integration** (Week of April 8–12)
**Goal:** Establish rotation-as-performance-gesture model

1. **Monday:** Build MandalaAudioEngineTone based on LabUtilityTone architecture
2. **Tuesday:** Integrate into frequency-resonance-mandala.html
3. **Wednesday:** Implement rotation speed as tempo reference
4. **Thursday:** Validate ring hover quantization (notes snap to rotation pulse)
5. **Friday:** Sonic character check (crystalline, precise, intentional)

**Deliverable:** Mandala page is immersive and performative

---

### **Phase 3B-3: Chaos Integration** (Week of April 15–19)
**Goal:** Demonstrate real-time chaos sonification

1. **Monday:** Build ChaosAudioEngineTone (extends Mandala rhythm model)
2. **Tuesday:** Integrate into de-jong-attractor.html
3. **Wednesday:** Implement X,Y → modulation model
4. **Thursday:** Validate parameter velocity detection
5. **Friday:** Sonic character check (gritty, organic, evolving)

**Deliverable:** De Jong attractor page is live + chaotic

---

### **Phase 3B-4: DeJong Explorer** (Week of April 22–26)
**Goal:** Make parameter sliders feel like musical instruments

1. **Monday:** Build DeJongExplorerTone (extends Chaos parameter model)
2. **Tuesday:** Integrate into dejong-attractor-explorer.html
3. **Wednesday:** Map each slider to frequency + timbre
4. **Thursday:** Implement preset system with harmonic signatures
5. **Friday:** Sonic character check (tactile, glissando-rich, expressive)

**Deliverable:** DeJong explorer page is fully instrumental

---

### **Phase 3B-5: TwelveFaces** (Week of April 29 – May 3)
**Goal:** Establish precedent for archetypal sonic identity

1. **Monday:** Build TwelveFacesAudioTone (jazz voicing library)
2. **Tuesday:** Integrate into twelve-faces.html
3. **Wednesday:** Implement harmonic journey sequencing (faces suggest next face)
4. **Thursday:** Add ambient voicing background
5. **Friday:** Sonic character check (warm, jazz-like, anticipatory)

**Deliverable:** Twelve Faces page is musically coherent + expressive

---

### **Phase 3C: Portal-Wide QA & Coherence Audit** (Week of May 6–10)
**Goal:** Ensure all 16 pages sound like they belong to the same ecosystem

1. **Monday–Tuesday:** Cross-page navigation coherence testing
2. **Wednesday:** Verify zone transitions (energy carry-over from hub → explorer → immersive)
3. **Thursday:** Full sonic walkthrough (visitor perspective)
4. **Friday:** Documentation + hand-off to maintenance team

**Deliverable:** All 16 pages sonified and coherent

---

## PART 5: ARCHITECTURE DIAGRAM

```
┌─────────────────────────────────────────────────────────────┐
│                  GLOBAL GROOVE REFERENCE LAYER               │
│  (Shared Metronome, Interaction Memory, Contextual Space)   │
└──────────────┬──────────────┬──────────────┬──────────────────┘
               │              │              │
      ┌────────▼───────┐ ┌─────▼────────┐ ┌──▼────────────────┐
      │  LabUtilityTone │ │ MandalaAudio │ │  ChaosAudioTone  │
      │  (Foundation)   │ │  EngineTone  │ │  (Evolving Grit) │
      │  (Build 1st)    │ │ (Crystalline)│ │   (Build 2nd)    │
      └────────────────┘ └──────────────┘ └──────────────────┘
                │
      ┌─────────▼──────────┐    ┌────────────────────────────┐
      │ DeJongExplorerTone │    │ TwelveFacesAudioTone       │
      │ (Tactile Glissando)│    │ (Harmonic Warmth)         │
      │  (Build 3rd)       │    │ (Build 4th)               │
      └────────────────────┘    └────────────────────────────┘
```

---

## PART 6: CHARACTER MATRIX

| Engine | Voice | Responsive To | Primary Gesture | Sonic Palette |
|--------|-------|---------------|-----------------|----|
| **LabUtilityTone** | Clean, Adaptive | Interaction velocity | Tool selection → state chord | Sine + Triangle, bright |
| **MandalaAudioTone** | Crystalline, Precise | Rotation speed | Ring hover → quantized frequencies | Pure sine, spatial |
| **ChaosAudioTone** | Gritty, Organic | Attractor chaos | Position modulation | FM synthesis, textured |
| **DeJongExplorerTone** | Tactile, Expressive | Slider velocity | Parameter sweep → glissando | Complex waves, bright-to-dark |
| **TwelveFacesAudioTone** | Warm, Jazz-voiced | Face selection | Chord arpeggio → harmonic journey | Sine + harmonics, lush |

---

## PART 7: COHERENCE METRICS

**What Makes These Engines Sound Like They Belong Together:**

1. **Shared Metronome:** All reference the same pulse (even if they don't use it strictly)
2. **Interaction Memory:** All respond to user velocity/pattern
3. **Contextual Space:** All adjust their reverb/filter based on zone (hub vs. explorer)
4. **Energy Carry-Over:** Seamless transition from high-energy explorer to low-energy immersive page
5. **Attack/Decay Language:** All use "entry ceremony" (slower attack on deliberate interactions)
6. **Harmonic Foundation:** All based on 288Hz (Aether root) with Phi ratios and golden ratio intervals

**Before:** 11 pages sonified, 5 silent, each engine isolated  
**After Phase 3B:** 16 pages sonified, all engines sharing groove language, coherent experience

---

## PART 8: AUDITOR'S FINAL WORD

> "Rhythm is not a metronome. It's the pocket where the groove lives. Your engines now live in the same pocket. They hear each other. They anticipate. They perform together.
>
> LabUtilityTone is the band's drummer :: establishes interaction pattern, sets the energy level, keeps everyone on the same time grid.
>
> MandalaAudioTone is the percussionist :: responds to physical gesture (rotation), brings crystalline precision.
>
> ChaosAudioTone is the bassist :: finds the low, organic complexity, responds to system state (attractor).
>
> DeJongExplorerTone is the lead instrument :: expressive, velocity-sensitive, every gesture matters.
>
> TwelveFacesAudioTone is the harmony :: knows what chord comes next, guides the journey.
>
> Together, they perform for the listener. The portal now has your sounds."

---

## SUMMARY

✅ **Infrastructure Complete:** GrooveReferenceLayer (shared pocket)  
✅ **Foundation Engine Complete:** LabUtilityTone (demonstrates philosophy)  
⏳ **Phase 3B Timeline:** 4 specialized engines over 5 weeks  
✅ **Portal Coherence:** All 16 pages singing together

**The Next Step:** Integrate LabUtilityTone into explorers/laboratory.html and validate the architecture holds.
