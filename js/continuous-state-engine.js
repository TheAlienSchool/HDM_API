/**
 * CONTINUOUS STATE ENGINE
 * ═══════════════════════════════════════════════════════════════
 * Core module for smooth, flowing mathematical transformations
 * Based on attractor curves instead of linear interpolation
 * 
 * Philosophy: Transformation is never a leap. It is a path.
 * Mathematics lives in the relationships between states,
 * not in the states themselves.
 */

class ContinuousStateEngine {
  constructor(config = {}) {
    this.currentState = {
      faceIndex: 0,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      scale: 1.0,
      surfaceTension: 0.5,
      trustVelocity: 0.0,
      creativeResonance: 0.5,
    };

    this.targetState = { ...this.currentState };
    this.trajectory = [this.currentState];
    this.animationStartTime = null;
    this.animationDuration = config.duration || 800;
    this.attractorType = config.attractorType || 'phi';
    this.isTransitioning = false;

    this.listeners = {
      stateUpdated: [],
      transitionStart: [],
      transitionComplete: [],
      trajectoryRecorded: [],
    };

    this.computedPath = [];
    this.currentPathIndex = 0;
  }

  // ───────────────────────────────────────────────────────────────
  // PUBLIC API
  // ───────────────────────────────────────────────────────────────

  transitionTo(newTargetState, duration = null) {
    if (this.isTransitioning) return Promise.reject('Already transitioning');

    this.targetState = { ...this.currentState, ...newTargetState };
    this.animationDuration = duration || this.animationDuration;
    this.isTransitioning = true;
    this.animationStartTime = performance.now();

    // Pre-compute the entire attractor path
    this.computedPath = this.generateAttractorPath(
      this.currentState,
      this.targetState,
      this.animationDuration
    );

    this.emit('transitionStart', { from: this.currentState, to: this.targetState });

    return new Promise((resolve) => {
      this.startAnimationLoop(resolve);
    });
  }

  setAttractorType(type) {
    this.attractorType = type;
  }

  getTrajectory() {
    return this.trajectory.slice();
  }

  getCurrentState() {
    return { ...this.currentState };
  }

  getTargetState() {
    return { ...this.targetState };
  }

  getPredictedPath(lookahead = 50) {
    const start = this.currentPathIndex;
    const end = Math.min(start + lookahead, this.computedPath.length);
    return this.computedPath.slice(start, end);
  }

  // ───────────────────────────────────────────────────────────────
  // ATTRACTOR MATHEMATICS
  // ───────────────────────────────────────────────────────────────

  generateAttractorPath(startState, endState, durationMs) {
    const framerate = 60;
    const steps = Math.floor((durationMs / 1000) * framerate);
    const path = [];

    for (let i = 0; i <= steps; i++) {
      const normalizedT = i / steps;
      const attractorT = this.applyAttractorCurve(normalizedT);

      const state = this.interpolateState(startState, endState, attractorT);
      path.push({
        state: state,
        t: normalizedT,
        attractorT: attractorT,
        curvature: this.calculateCurvature(normalizedT, steps),
        timestamp: i / framerate,
      });
    }

    return path;
  }

  applyAttractorCurve(t) {
    // t: 0 → 1 (normalized progress)
    const phi = 1.618033988749;

    switch (this.attractorType) {
      case 'phi': {
        // Fibonacci spiral progression — slow at start, accelerate, decelerate at end
        const fibStart = Math.pow(phi, -1);
        const fibEnd = Math.pow(phi, 1);
        return (Math.pow(phi, (t - 0.5) * 2) - fibStart) / (fibEnd - fibStart);
      }

      case 'fibonacci': {
        // Fibonacci-based easing with oscillation
        const fib = Math.sin(t * Math.PI * 2) * Math.cos(t * Math.PI);
        return Math.max(0, Math.min(1, t + fib * 0.12));
      }

      case 'lorenz': {
        // Smooth chaotic curve — deterministic but non-linear
        const chaos = Math.sin(t * Math.PI * 4) * 0.08;
        return Math.max(0, Math.min(1, t + chaos * Math.sin(t * Math.PI)));
      }

      case 'dejong': {
        // De Jong attractor — complex, smooth, beautiful
        const x = Math.sin(t * Math.PI * 3);
        const y = Math.cos(t * Math.PI * 2);
        const result = 0.5 + (x * y * 0.18) + (Math.sin(t * Math.PI) * 0.15);
        return Math.max(0, Math.min(1, result));
      }

      case 'smooth': {
        // Cubic easing
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      }

      default:
        return t; // Linear fallback
    }
  }

  calculateCurvature(t, totalSteps) {
    // First derivative of attractor curve
    const dt = 0.001;
    const t1 = this.applyAttractorCurve(t - dt);
    const t2 = this.applyAttractorCurve(t + dt);
    return (t2 - t1) / (2 * dt);
  }

  interpolateState(startState, endState, t) {
    // Smooth interpolation through state space
    const interpolated = {};

    Object.keys(startState).forEach((key) => {
      const start = startState[key];
      const end = endState[key];

      if (typeof start === 'number' && typeof end === 'number') {
        interpolated[key] = start + (end - start) * t;
      } else {
        interpolated[key] = start;
      }
    });

    return interpolated;
  }

  // ───────────────────────────────────────────────────────────────
  // ANIMATION LOOP
  // ───────────────────────────────────────────────────────────────

  startAnimationLoop(onComplete) {
    const animate = (now) => {
      if (!this.animationStartTime) {
        this.animationStartTime = now;
      }

      const elapsed = now - this.animationStartTime;
      const progress = Math.min(elapsed / this.animationDuration, 1.0);

      // Get current state from pre-computed path
      const pathIndex = Math.floor(progress * (this.computedPath.length - 1));
      this.currentPathIndex = pathIndex;
      const pathPoint = this.computedPath[pathIndex];

      this.currentState = pathPoint.state;
      this.trajectory.push(pathPoint);

      // Emit state update event
      this.emit('stateUpdated', {
        currentState: this.currentState,
        pathPoint: pathPoint,
        progress: progress,
      });

      if (progress < 1.0) {
        requestAnimationFrame(animate);
      } else {
        this.isTransitioning = false;
        this.emit('transitionComplete', {
          finalState: this.currentState,
          trajectoryLength: this.trajectory.length,
        });

        if (onComplete) onComplete();
      }
    };

    requestAnimationFrame(animate);
  }

  // ───────────────────────────────────────────────────────────────
  // EVENT SYSTEM
  // ───────────────────────────────────────────────────────────────

  on(eventName, callback) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].push(callback);
    }
  }

  off(eventName, callback) {
    if (this.listeners[eventName]) {
      this.listeners[eventName] = this.listeners[eventName].filter(
        (cb) => cb !== callback
      );
    }
  }

  emit(eventName, data) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach((callback) => callback(data));
    }
  }
}

// ═══════════════════════════════════════════════════════════════
// RESONANCE FIELD CALCULATOR
// ═══════════════════════════════════════════════════════════════

class ResonanceField {
  constructor(practitionerState, clientState) {
    this.practitioner = practitionerState;
    this.client = clientState;
    this.alignmentHistory = [];
  }

  calculateResonance() {
    // Compare the trajectories of two states
    // Return alignment score from -1 to +1

    const cosine = this.cosineSimilarity(
      [
        this.practitioner.surfaceTension,
        this.practitioner.trustVelocity,
        this.practitioner.creativeResonance,
      ],
      [
        this.client.surfaceTension,
        this.client.trustVelocity,
        this.client.creativeResonance,
      ]
    );

    return cosine;
  }

  cosineSimilarity(vecA, vecB) {
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));

    if (magA === 0 || magB === 0) return 0;
    return dotProduct / (magA * magB);
  }

  getResonanceType() {
    const score = this.calculateResonance();

    if (score > 0.7) return 'harmonic';
    if (score > 0.4) return 'aligned';
    if (score > -0.4) return 'neutral';
    if (score > -0.7) return 'dissonant';
    return 'chaotic';
  }

  getResonanceFrequency() {
    const score = this.calculateResonance();
    const baseFreq = 440; // A4
    return baseFreq * Math.pow(2, score * 2);
  }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ContinuousStateEngine, ResonanceField };
}
