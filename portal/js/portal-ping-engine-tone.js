/**
 * PORTAL PING ENGINE (Tone.js)
 * 
 * The Global Threshold PING: When first consciousness touches the portal,
 * a harmonic wake illuminates the space. Two voices (432Hz + Perfect Fifth at 648Hz)
 * meet in resonance—the moment of recognition.
 * 
 * This is the sonic handshake: "You are not alone."
 */

class PortalPingEngineTone {
  constructor() {
    this.hasBeenActivated = false;
    this.synths = [];
    this.gain = null;
  }

  async initialize() {
    // Tone.js auto-initializes on first sound, but we ensure it's ready
    await Tone.start();
  }

  /**
   * Trigger the portal PING: dual harmonic wake
   * 432 Hz (Life frequency) + 648 Hz (Perfect Fifth)
   * Together they form the signature resonance of arrival.
   */
  async triggerGlobalPing() {
    if (this.hasBeenActivated) return;
    this.hasBeenActivated = true;

    await this.initialize();

    // Create master gain for smooth envelope
    this.gain = new Tone.Gain(0).toDestination();

    // Voice 1: 432 Hz (Fundamental - Life/Heart frequency)
    const synth1 = new Tone.Synth({
      oscillator: { type: 'sine' },
      envelope: {
        attack: 0.1,
        decay: 1.2,
        sustain: 0.3,
        release: 3.2
      }
    }).connect(this.gain);

    // Voice 2: 648 Hz (Perfect Fifth above 432)
    const synth2 = new Tone.Synth({
      oscillator: { type: 'sine' },
      envelope: {
        attack: 0.1,
        decay: 1.3,
        sustain: 0.25,
        release: 3.5
      }
    }).connect(this.gain);

    this.synths = [synth1, synth2];

    // Master envelope: gentle introduction, held presence, graceful fade
    const now = Tone.now();
    this.gain.gain.setValueAtTime(0, now);
    this.gain.gain.linearRampToValueAtTime(0.15, now + 0.1);
    this.gain.gain.exponentialRampToValueAtTime(0.001, now + 4.5);

    // Trigger both voices simultaneously
    synth1.triggerAttackRelease('432hz', '5s', now);
    synth2.triggerAttackRelease('648hz', '5s', now);

    // Clean up after duration
    setTimeout(() => {
      this.dispose();
    }, 5500);
  }

  dispose() {
    if (this.synths) {
      this.synths.forEach(s => s.dispose());
    }
    if (this.gain) {
      this.gain.dispose();
    }
    this.synths = [];
    this.gain = null;
  }
}

/**
 * Export for use in module contexts
 */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PortalPingEngineTone;
}
