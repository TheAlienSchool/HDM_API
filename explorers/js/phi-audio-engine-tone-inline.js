/**
 * PHI-EXPLORER AUDIO SYSTEM :: TONE.JS PARALLEL VERSION
 * 
 * Drop-in replacement for Web Audio playPhiTone() function
 * Preserves sonic specs from phi-audio-spec.js
 * For A/B comparison on funder review builds
 * 
 * INSTALLATION:
 * 1. Include Tone.js CDN before this file
 * 2. Replace the playPhiTone() function
 * 3. Replace initAudio() function
 * 4. Keep everything else identical
 */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TONE.JS AUDIO ENGINE FOR PHI-EXPLORER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const PHI = (1 + Math.sqrt(5)) / 2;

// State management
let soundEnabled = true;
let toneInitialized = false;
let activeSynth = null; // Only one voice at a time (like phi-explorer)

/**
 * Initialize Tone.js audio context
 * Mirrors Web Audio initAudio() behavior
 */
async function initAudio() {
    if (toneInitialized) return;
    
    try {
        // Tone.start() uses AudioContext.resume() under the hood
        await Tone.start();
        toneInitialized = true;
        console.log('✦ Tone.js Audio Engine initialized');
        
        // Log sonic characterization
        console.log(`
╔═══════════════════════════════════════════════════════════╗
║          PHI-EXPLORER TONE.JS AUDIO ENGINE               ║
╠═══════════════════════════════════════════════════════════╣
║ Base Frequency: 144 Hz  (12th Fibonacci)                 ║
║ Progression: Freq × φ^step                               ║
║ Waveform: Sine (pristine)                                ║
║ Filter: Lowpass @ 4000 Hz  (–12 dB/octave)              ║
║ Attack: 40 ms (linear ramp)                              ║
║ Decay: 2.5 s (exponential tail)                          ║
║ Character: Celestial, meditative, timeless               ║
║ Status: Ready for funder review                          ║
╚═══════════════════════════════════════════════════════════╝
        `);
    } catch (err) {
        console.warn('Audio deferred (awaiting user interaction):', err.message);
    }
}

/**
 * Play a phi-derived tone
 * Tone.js implementation matching Web Audio sonic spec exactly
 * 
 * @param {number} step - Fibonacci step index (0, 1, 2, ...)
 */
async function playPhiTone(step) {
    if (!soundEnabled) return;
    
    // Ensure audio context is initialized
    if (!toneInitialized) await initAudio();
    
    // BASE FREQUENCY (immutable)
    const baseFreq = 144.0; // 12th Fibonacci number
    const frequency = baseFreq * Math.pow(PHI, step);
    
    // Stop any previous synth (phi-explorer plays one note at a time)
    if (activeSynth) {
        try {
            activeSynth.triggerRelease();
            // Wait for release envelope to complete
            await new Promise(resolve => setTimeout(resolve, 100));
        } catch (e) {
            // Synth already disposed
        }
    }
    
    // CREATE SYNTH with spec from phi-audio-spec.js
    const synth = new Tone.Synth({
        oscillator: {
            type: 'sine',        // Pristine sine wave
            partials: [1],       // No harmonics/overtones
            count: 1
        },
        envelope: {
            attack: 0.04,        // 40ms — swift organic attack
            decay: 2.46,         // ~2.5s total including sustain release
            sustain: 0,          // No sustain plateau
            release: 0.04        // Quick final release
        }
    });
    
    // CREATE FILTER (lowpass @ 4000 Hz)
    const filter = new Tone.Filter({
        type: 'lowpass',
        frequency: 4000,         // Hz — softly rounded high-frequency cutoff
        rolloff: -12             // –12 dB/octave (subtle Butterworth)
    });
    
    // CREATE MASTER GAIN for volume control
    const masterGain = new Tone.Gain(0.18); // 0.18 = peak volume from Web Audio spec
    
    // CONNECT CHAIN: synth → filter → masterGain → destination
    synth.connect(filter);
    filter.connect(masterGain);
    masterGain.toDestination();
    
    // PLAY NOTE
    // Duration: 2.5 seconds (0.04 attack + 2.46 decay = 2.5 total)
    const now = Tone.now();
    synth.triggerAttackRelease(frequency, '2.5s', now);
    
    // Track this synth for cleanup
    activeSynth = synth;
    
    // Auto-dispose after sound completes (prevents memory leak)
    setTimeout(() => {
        try {
            synth.dispose();
            if (activeSynth === synth) activeSynth = null;
        } catch (e) {
            // Already disposed or errored
        }
    }, 2600);
    
    return synth;
}

/**
 * Toggle audio on/off
 */
function toggleSound() {
    soundEnabled = !soundEnabled;
    return soundEnabled;
}

/**
 * Cleanup on page unload
 */
window.addEventListener('beforeunload', () => {
    if (activeSynth) {
        try {
            activeSynth.triggerRelease();
            activeSynth.dispose();
        } catch (e) {}
    }
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TONE.JS INITIALIZATION HOOK
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Initialize on first user interaction (browser autoplay policy)
document.addEventListener('click', initAudio, { once: true });

// Unlock audio on DOMContentLoaded if possible
document.addEventListener('DOMContentLoaded', () => {
    initAudio().catch(err => console.log('Audio unlock deferred:', err.message));
});

// Initialize sound button behavior
document.addEventListener('DOMContentLoaded', () => {
    const soundBtn = document.getElementById('sound-toggle');
    if (soundBtn) {
        soundBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent click from triggering other handlers
            soundEnabled = toggleSound();
            soundBtn.textContent = soundEnabled ? '♪ Sound' : '♪ Mute';
            soundBtn.classList.toggle('active', soundEnabled);
            if (soundEnabled) initAudio().catch(err => console.log('Audio failed:', err.message));
        });
        soundBtn.classList.add('active');
    }
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// END TONE.JS ENGINE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
