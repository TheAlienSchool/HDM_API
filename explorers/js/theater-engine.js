/**
 * The Interactive AEquation Theater Resonance Engine
 * ═══════════════════════════════════════════════════════════════
 * 
 * Somatic Integration of the 7-day Creative Steeping Progression
 * with the 46 Master AEquations of the HIA.
 * 
 * Architectural Coordinates:
 *   - Base Void: #0A0A0A
 *   - The Weight: #8B5E1A
 *   - The Lever: #C9A84C
 *   - The Clarity: #F5F0E8
 *   - The Depth: #1A3A3A
 * 
 * Rules:
 *   - Affirmative grammar ONLY (eliminate negations)
 *   - Double colon (::) transition hinges
 *   - Spelling markers: Å and ï
 */

class TheaterEngine {
    constructor() {
        this.activeDay = 1;
        this.activeLineage = 'phi'; // 'phi', 'cinematic', 'owl'
        this.rotationAngle = 0; // In degrees, [-135, +135]
        
        // "Tea on the Moon" Stillness State
        this.isInteracting = false;
        this.lastInteractionTime = 0;
        this.stillnessTimeout = null;
        this.motionIntensity = 0;
        
        // Journal & Gizzard Compression state
        this.journalText = '';
        this.digestedCoordinate = { mass: 0.5, force: 0.5, clarity: 0.5 };
        
        // Somatic Progression Data Store
        this.progression = this.initSomaticProgression();
        
        // Tone.js Synth nodes
        this.synths = {};
        this.panners = {};
        this.gains = {};
        this.initializedAudio = false;
    }

    /**
     * Set up the somatic progression mapping
     */
    initSomaticProgression() {
        return {
            1: {
                day: 1,
                title: "Essence of My Being",
                theme: "Core identity, passions, and the sacral fire within.",
                phi: {
                    id: "ÆQ·φ·01",
                    name: "THE SELF-INCLUDING GROWTH LAW",
                    formula: "φ = 1 + (1/φ)",
                    desc: "Singularity spiraling into its own center. Growth that includes itself in its own next state.",
                    stbl: 10, prss: 9, cohr: 8, drft: 7,
                    image: "../large_assets/phi/AEQ_PHI_01_SELF_INCLUDING_GROWTH_LAW.png"
                },
                cinematic: {
                    id: "ÆQ·07",
                    name: "THE PRIME RADIANT",
                    formula: "One Particle × Speed × Pattern = Apparent Multiplicity",
                    desc: "A single soul forming multiple roles. The single particle appearing next to itself over and over.",
                    stbl: 88, prss: 18, cohr: 22, drft: 82,
                    image: "../large_assets/cinematic/AEQ_07_PRIME_RADIANT.png"
                },
                owl: {
                    id: "ÆQ·OWL·11",
                    name: "THE TUBULAR EYE THEOREM",
                    formula: "Fixed Focus + Depth Perception = Thought Visibility",
                    desc: "Gathering ambient light from a single axis. Fixed focus locking attention on core identity.",
                    stbl: 62, prss: 38, cohr: 92, drft: 18,
                    image: "../large_assets/owl/OWL_11_TUBULAR_EYE.png"
                }
            },
            2: {
                day: 2,
                title: "Mosaic of Experience",
                theme: "The creative journey, milestones, and integrated history.",
                phi: {
                    id: "ÆQ·φ·06",
                    name: "THE BRAIDED HISTORY LAW",
                    formula: "A ⊗ B ≠ B ⊗ A",
                    desc: "A history that remembers the order of its events. Crossing points braid memory into deep structure.",
                    stbl: 8, prss: 9, cohr: 7, drft: 9,
                    image: "../large_assets/phi/AEQ_PHI_06_BRAIDED_HISTORY_LAW.png"
                },
                cinematic: {
                    id: "ÆQ·09",
                    name: "THE CRYSTALLIZATION EQUATION",
                    formula: "Crossing Lines × Crossing Frequency = Matter",
                    desc: "Experiences crystallizing into the matter of reality. The point of maximum intersection creates form.",
                    stbl: 5, prss: 92, cohr: 96, drft: 4,
                    image: "../large_assets/cinematic/AEQ_09_CRYSTALLIZATION.png"
                },
                owl: {
                    id: "ÆQ·OWL·02",
                    name: "THE MATTER EXERCISE",
                    formula: "Overthinking = Raw Mental Mass Awaiting a Mechanism",
                    desc: "Lifting the raw mass of memory into expression. Moving from paralyzing gravity to aligned mechanics.",
                    stbl: 28, prss: 72, cohr: 48, drft: 52,
                    image: "../large_assets/owl/OWL_02_MATTER_EXERCISE.png"
                }
            },
            3: {
                day: 3,
                title: "Summits of Aspiration",
                theme: "Goals, ambitions, and climbing to new heights.",
                phi: {
                    id: "ÆQ·φ·03",
                    name: "POSITIVITY SELECTS",
                    formula: "Positivity → φ",
                    desc: "The positive choice that aligns the golden path. The mathematical requirement that stabilizes the trajectory.",
                    stbl: 9, prss: 10, cohr: 9, drft: 6,
                    image: "../large_assets/phi/AEQ_PHI_03_POSITIVITY_SELECTS.png"
                },
                cinematic: {
                    id: "ÆQ·01",
                    name: "THE EXCITEMENT COMPASS",
                    formula: "Highest Excitement × Full Ability × Present Moment ÷ Expectation of Outcome = Direction",
                    desc: "Excitement functions as a navigational instrument. Direction arises from acting with zero outcome expectation.",
                    stbl: 5, prss: 92, cohr: 96, drft: 4,
                    image: "../large_assets/cinematic/AEQ_01_EXCITEMENT_COMPASS.png"
                },
                owl: {
                    id: "ÆQ·OWL·06",
                    name: "THOUGHT VELOCITY",
                    formula: "Thought Velocity = Escape Velocity from Gravitational Pull of Confusion",
                    desc: "Generating momentum to break gravitational loops. Escaping the static weight of cyclic overthinking.",
                    stbl: 22, prss: 42, cohr: 55, drft: 88,
                    image: "../large_assets/owl/OWL_06_THOUGHT_VELOCITY.png"
                }
            },
            4: {
                day: 4,
                title: "Mirror of Self-Perception",
                theme: "Seeing yourself fully, reflecting your true genius.",
                phi: {
                    id: "ÆQ·φ·05",
                    name: "THE SHADOW & RICHER STRUCTURE",
                    formula: "Observable Behavior = Shadow(Richer Structure)",
                    desc: "The outer image functions as the shadow of a vast, multidimensional inner structure.",
                    stbl: 8, prss: 9, cohr: 8, drft: 10,
                    image: "../large_assets/phi/AEQ_PHI_05_SHADOW_AND_RICHER_STRUCTURE.png"
                },
                cinematic: {
                    id: "ÆQ·03",
                    name: "THE MIRROR THEOREM",
                    formula: "Being Yourself Fully = Mirror × Discomfort for Those Who Are Not",
                    desc: "Unapologetic presence acting as a light of truth. Measuring alignment through social resonance.",
                    stbl: 5, prss: 92, cohr: 96, drft: 4,
                    image: "../large_assets/cinematic/AEQ_03_MIRROR_THEOREM.png"
                },
                owl: {
                    id: "ÆQ·OWL·04",
                    name: "THE DUALITY OF THOUGHT",
                    formula: "Blind Recursion = Paralyzing Confusion / Conscious Leverage = Creative Clarity",
                    desc: "Shifting from the blind loop to the observer position. Mapping both sides of the thinking loop.",
                    stbl: 35, prss: 55, cohr: 82, drft: 28,
                    image: "../large_assets/owl/OWL_04_DUALITY_OF_THOUGHT.png"
                }
            },
            5: {
                day: 5,
                title: "Labyrinth of Challenges",
                theme: "Acknowledging obstacles, converting them to catapults.",
                phi: {
                    id: "ÆQ·φ·04",
                    name: "THE GNOMON LAW",
                    formula: "Whole + Gnomon = φ × Whole",
                    desc: "The obstacle functions as the gnomon that expands the being. Recursion creates a larger, similar self.",
                    stbl: 10, prss: 8, cohr: 9, drft: 7,
                    image: "../large_assets/phi/AEQ_PHI_04_GNOMON_LAW.png"
                },
                cinematic: {
                    id: "ÆQ·08",
                    name: "THE BEND THEOREM",
                    formula: "Vibrational Quality = Bending of Lower Frequency = Gravity",
                    desc: "High vibrational quality bends the field. Coherent intention bends lower frequencies toward alignment.",
                    stbl: 5, prss: 92, cohr: 96, drft: 4,
                    image: "../large_assets/cinematic/AEQ_08_BEND_THEOREM.png"
                },
                owl: {
                    id: "ÆQ·OWL·05",
                    name: "THE FULCRUM OF THOUGHT AWARENESS",
                    formula: "Thought Awareness = The Fulcrum That Makes Leverage Possible",
                    desc: "Finding the still, immovable node inside the struggle. The cosmic seesaw balancing mass and force.",
                    stbl: 52, prss: 48, cohr: 88, drft: 22,
                    image: "../large_assets/owl/OWL_05_FULCRUM_AWARENESS.png"
                }
            },
            6: {
                day: 6,
                title: "Conclave of Voices",
                theme: "Audience, communication, and deep echo-location.",
                phi: {
                    id: "ÆQ·φ·07",
                    name: "THE COHERENCE ACCESS LAW",
                    formula: "Coherence = Accessible Technology of Remembering",
                    desc: "Consolidating heart, brain, and breath into one wave. A technology of alignment that unlocks memory.",
                    stbl: 9, prss: 9, cohr: 10, drft: 8,
                    image: "../large_assets/phi/AEQ_PHI_07_COHERENCE_ACCESS_LAW.png"
                },
                cinematic: {
                    id: "ÆQ·06",
                    name: "THE INCOMPLETE PICTURE THEOREM",
                    formula: "Your Image + Their Image = Complete History",
                    desc: "Communication functions as a shared history of two perspectives. Both sides form the complete pot.",
                    stbl: 52, prss: 48, cohr: 55, drft: 48,
                    image: "../large_assets/cinematic/AEQ_06_INCOMPLETE_PICTURE.png"
                },
                owl: {
                    id: "ÆQ·OWL·12",
                    name: "THE ASYMMETRICAL EAR THEOREM",
                    formula: "Mapping Origin + Mapping Velocity of Thought = Location of Core Insight",
                    desc: "Triangulating the precise coordinates of feedback. Achieving a 3D auditory map of mental activity.",
                    stbl: 45, prss: 55, cohr: 78, drft: 42,
                    image: "../large_assets/owl/OWL_12_ASYMMETRICAL_EAR.png"
                }
            },
            7: {
                day: 7,
                title: "Crown Jewels of Individuality",
                theme: "Sovereign genius, unearthing treasures, unique offerings.",
                phi: {
                    id: "ÆQ·φ·08",
                    name: "THE ANAMNESIS EQUATION",
                    formula: "Learning = Re-membering",
                    desc: "Knowledge is the recovery and assembly of ancient patterns. Remembering is pattern completion.",
                    stbl: 8, prss: 8, cohr: 8, drft: 10,
                    image: "../large_assets/phi/AEQ_PHI_08_ANAMNESIS_EQUATION.png"
                },
                cinematic: {
                    id: "ÆQ·20",
                    name: "THE WEIGHT THEOREM",
                    formula: "Belonging to You = Light. Not Belonging to You = Heavy.",
                    desc: "Authentic resonance is light. Everything that is not yours creates a heavy burden. The body acts as scale.",
                    stbl: 5, prss: 92, cohr: 96, drft: 4,
                    image: "../large_assets/cinematic/AEQ_20_WEIGHT_THEOREM.png"
                },
                owl: {
                    id: "ÆQ·OWL·15",
                    name: "THE PELLET THEOREM",
                    formula: "Consume Everything → Digest → Extract Nutrients → Expel the Pellet = Room for New Input",
                    desc: "Digesting experiences, extracting wisdom, and releasing the heavy residue. Cleansing the mental chamber.",
                    stbl: 72, prss: 55, cohr: 88, drft: 22,
                    image: "../large_assets/owl/OWL_14_PELLET_THEOREM.png"
                }
            }
        };
    }

    /**
     * Initialize Tone.js elements under tAs' warm sound palette.
     * Low sub-harmonic PM drone + Crystal singing bowl bells + Wooden marimba chimes
     */
    async initializeAudio() {
        if (this.initializedAudio) return;
        
        await Tone.start();
        
        // Main Mix & Master Volume
        this.masterVolumeNode = new Tone.Gain(0.25).toDestination();
        this.mixGainNode = new Tone.Gain(0).connect(this.masterVolumeNode); // Starts at 0 for Stillness Protocol
        
        // ── 1. TIBETAN SINGING BOWL (Low Drone Layer)
        // Synthesizes a deep sub-harmonic PM drone (108Hz / 54Hz) representing static mass
        this.synths.droneLow = new Tone.FMSynth({
            harmonicity: 1.5,
            modulationIndex: 3,
            oscillator: { type: 'sine' },
            envelope: { attack: 1.5, decay: 0.5, sustain: 1.0, release: 2.0 },
            modulation: { type: 'triangle' },
            modulationEnvelope: { attack: 2.0, decay: 0, sustain: 1.0, release: 2.0 }
        });
        
        this.synths.droneMid = new Tone.Synth({
            oscillator: { type: 'triangle' },
            envelope: { attack: 2.0, decay: 0.8, sustain: 0.8, release: 2.5 }
        });
        
        // Lowpass filter for warm, non-abrasive organic depth
        this.droneFilter = new Tone.Filter(180, 'lowpass');
        this.panners.drone = new Tone.Panner(-0.1); // Centered left slightly
        
        this.synths.droneLow.connect(this.droneFilter);
        this.synths.droneMid.connect(this.droneFilter);
        this.droneFilter.connect(this.panners.drone);
        this.panners.drone.connect(this.mixGainNode);
        
        // ── 2. CRYSTAL BOWL BELLS & WOODEN MARIMBA (Clarity Layer)
        // High-pitched soft chimes (880Hz / 1080Hz) representing leverage
        this.synths.chime = new Tone.MetalSynth({
            frequency: 880,
            envelope: { attack: 0.005, decay: 1.2, release: 1.5 },
            resonance: 8000,
            harmonicity: 5.1
        });
        
        this.synths.marimba = new Tone.PolySynth(Tone.Synth, {
            oscillator: { type: 'sine' },
            envelope: { attack: 0.002, decay: 0.4, sustain: 0.0, release: 0.6 }
        });
        
        this.panners.chime = new Tone.Panner(0.1); // Centered right slightly
        this.synths.chime.connect(this.panners.chime);
        this.synths.marimba.connect(this.panners.chime);
        this.panners.chime.connect(this.mixGainNode);
        
        // Trigger persistent low drones
        const now = Tone.now();
        this.synths.droneLow.triggerAttack(54, now); // 54Hz fundamental
        this.synths.droneMid.triggerAttack(108, now); // 108Hz harmonic
        
        this.initializedAudio = true;
        console.log(":: Auditory triangulation initialized successfully");
    }

    /**
     * Interacts with the sound engine, swelling the volume from stillness.
     * Part of "Tea on the Moon" Stillness Protocol.
     */
    triggerInteractionActivity(intensity = 0.5) {
        if (!this.initializedAudio) return;
        
        this.lastInteractionTime = Date.now();
        this.isInteracting = true;
        this.motionIntensity = Math.min(1.0, this.motionIntensity + intensity);
        
        // Swell main audio gain based on motion intensity (up to 0.7 max mix level)
        const targetVolume = 0.15 + (this.motionIntensity * 0.55);
        this.mixGainNode.gain.rampTo(targetVolume, 0.2);
        
        // Clear previous timeout and schedule a slow fade back to absolute stillness
        if (this.stillnessTimeout) clearTimeout(this.stillnessTimeout);
        this.stillnessTimeout = setTimeout(() => {
            this.fadeToStillness();
        }, 1200); // 1.2 seconds of stillness activates the protocol
    }

    /**
     * Fades the audio completely to silent resting state
     */
    fadeToStillness() {
        if (!this.initializedAudio) return;
        this.isInteracting = false;
        this.motionIntensity = 0;
        this.mixGainNode.gain.rampTo(0, 1.5); // Warm, slow 1.5-second fade to absolute silence
    }

    /**
     * Spatializes the audio based on the rotation angle (-135 to +135 deg)
     * Left ear hears origin, right ear hears delay/triangulation
     */
    updateAuditorySpatialization(angle) {
        if (!this.initializedAudio) return;
        
        this.rotationAngle = angle;
        const normalizedAngle = angle / 135; // [-1, +1]
        
        // Map pan directly to the panners
        this.panners.drone.pan.rampTo(-0.6 * normalizedAngle, 0.1);
        this.panners.chime.pan.rampTo(0.8 * normalizedAngle, 0.1);
        
        // Adjust fundamental pitch based on rotation
        const pitchBendLow = 54 * (1.0 + (normalizedAngle * 0.05)); // Slight pitch shift
        const pitchBendMid = 108 * (1.0 - (normalizedAngle * 0.03));
        
        this.synths.droneLow.frequency.setValueAtTime(pitchBendLow, Tone.now());
        this.synths.droneMid.frequency.setValueAtTime(pitchBendMid, Tone.now());
        
        this.triggerInteractionActivity(0.08); // Rotation swells soundscape
    }

    /**
     * Plays a crystal chime chord or marimba note during key somatic selections
     */
    playClarityChime(freqMultiplier = 1.0) {
        if (!this.initializedAudio) return;
        
        const now = Tone.now();
        const baseFreq = 440 * freqMultiplier;
        
        // Play wooden marimba notes
        this.synths.marimba.triggerAttackRelease([baseFreq, baseFreq * 1.5], "8n", now);
        
        // Strike the metal chime
        this.synths.chime.frequency.setValueAtTime(baseFreq * 2, now);
        this.synths.chime.triggerAttack(now);
        
        this.triggerInteractionActivity(0.6); // Bell hit triggers high intensity swell
    }

    /**
     * Compresses written journal input into semantic variables: Mass (M) and Force (F).
     * Output equation: Mass * Fulcrum * Force = Clarity.
     */
    digestJournalReflection(text) {
        this.journalText = text;
        if (!text || text.trim().length === 0) {
            return this.digestedCoordinate;
        }

        const len = text.length;
        
        // Mass (M) - determined by complexity, density, and average word length
        const words = text.trim().split(/\s+/);
        const avgWordLen = words.reduce((acc, word) => acc + word.length, 0) / words.length;
        // Longer words/deeper sentences represent high raw mass awaiting the lever
        let mass = Math.min(1.0, (len / 350) * 0.6 + (avgWordLen / 8) * 0.4);
        
        // Force (F) - determined by action markers, exclamation density, and question depth
        const activeVerbs = (text.match(/(create|make|build|seek|find|shift|lever|lift|still|focus|braid|breath|remember|align)/gi) || []).length;
        const punctuationPower = (text.match(/(!|\?|::)/g) || []).length;
        let force = Math.min(1.0, (activeVerbs * 0.15) + (punctuationPower * 0.10) + 0.3);
        
        // Fulcrum is a somatic constant of active attention (0.85)
        const fulcrum = 0.85;
        
        // Clarity = Mass * Fulcrum * Force
        let clarity = mass * fulcrum * force;
        
        // Normalize values to [0, 1] range safely
        mass = Math.max(0.1, Math.min(0.9, mass));
        force = Math.max(0.1, Math.min(0.9, force));
        clarity = Math.max(0.1, Math.min(0.9, clarity));
        
        this.digestedCoordinate = { mass, force, clarity };
        
        // Trigger small bubble sounds or marimba chimes based on typing length
        if (len % 15 === 0) {
            this.playClarityChime(0.5 + (clarity * 1.5));
        } else {
            this.triggerInteractionActivity(0.15); // Standard typing swells drone
        }

        return this.digestedCoordinate;
    }

    /**
     * Return active equation parameters and content based on day and lineage selection
     */
    getActiveAEquation() {
        const dayData = this.progression[this.activeDay];
        return dayData[this.activeLineage];
    }
    
    /**
     * Save active day's compressed pellet and reflection to localStorage
     */
    saveCurrentDayCompletion() {
        const activeEq = this.getActiveAEquation();
        const saveKey = `tas_theater_day_${this.activeDay}`;
        const record = {
            day: this.activeDay,
            timestamp: Date.now(),
            lineage: this.activeLineage,
            equationId: activeEq.id,
            equationName: activeEq.name,
            reflection: this.journalText,
            coordinate: { ...this.digestedCoordinate }
        };
        
        localStorage.setItem(saveKey, JSON.stringify(record));
        
        // Mark day as completed in the master index
        const completedDays = JSON.parse(localStorage.getItem('tas_theater_completed_days') || '[]');
        if (!completedDays.includes(this.activeDay)) {
            completedDays.push(this.activeDay);
            localStorage.setItem('tas_theater_completed_days', JSON.stringify(completedDays));
        }
        
        // Play major resolution chord
        if (this.initializedAudio) {
            const now = Tone.now();
            this.synths.marimba.triggerAttackRelease([220, 330, 440, 660], "2n", now);
            this.triggerInteractionActivity(1.0);
        }
        
        return record;
    }

    /**
     * Load all completion records from local storage
     */
    loadAllCompletions() {
        const completions = {};
        const completedDays = JSON.parse(localStorage.getItem('tas_theater_completed_days') || '[]');
        
        completedDays.forEach(day => {
            const data = localStorage.getItem(`tas_theater_day_${day}`);
            if (data) {
                completions[day] = JSON.parse(data);
            }
        });
        
        return completions;
    }

    /**
     * Clear all theater achievements for reset
     */
    resetTheaterConstellation() {
        const completedDays = JSON.parse(localStorage.getItem('tas_theater_completed_days') || '[]');
        completedDays.forEach(day => {
            localStorage.removeItem(`tas_theater_day_${day}`);
        });
        localStorage.removeItem('tas_theater_completed_days');
        this.activeDay = 1;
        this.activeLineage = 'phi';
        this.journalText = '';
        this.digestedCoordinate = { mass: 0.5, force: 0.5, clarity: 0.5 };
    }
}

// Attach engine globally for HTML coordinate hooks
window.TheaterEngine = TheaterEngine;
