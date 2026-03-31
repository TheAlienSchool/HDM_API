/**
 * TRAJECTORY VISUALIZATION ENGINE
 * ═══════════════════════════════════════════════════════════════
 * Renders the path through state space as visible trails
 * Creates the "wake" of transformation — proof that change happened
 * 
 * Philosophy: The path is more important than the destination.
 * Show the journey, not just the arrival.
 */

class TrajectoryVisualizer {
  constructor(scene, stateEngine, config = {}) {
    this.scene = scene;
    this.stateEngine = stateEngine;

    this.trailMesh = null;
    this.trailGeometry = null;
    this.trailMaterial = null;
    this.trailFadeOutTime = config.fadeOutTime || 3000; // ms
    this.maxTrailLength = config.maxTrailLength || 120;
    this.enabled = true;

    this.trajectoryPoints = [];
    this.trajectoryLineSegments = [];

    this.setup();
    this.attachListeners();
  }

  setup() {
    // Material for trail lines (gold with transparency)
    this.trailMaterial = new THREE.LineBasicMaterial({
      color: 0xC48C50, // gold
      linewidth: 2,
      opacity: 0.6,
      transparent: true,
      fog: false,
    });

    // Initial geometry
    this.trailGeometry = new THREE.BufferGeometry();
    this.trailMesh = new THREE.Line(this.trailGeometry, this.trailMaterial);
    this.scene.add(this.trailMesh);
  }

  attachListeners() {
    this.stateEngine.on('stateUpdated', (data) => {
      if (this.enabled) {
        this.recordTrajectoryPoint(data.pathPoint);
      }
    });

    this.stateEngine.on('transitionStart', () => {
      // Reset trajectory for new transition
      this.trajectoryPoints = [];
      this.trajectoryLineSegments = [];
    });
  }

  recordTrajectoryPoint(pathPoint) {
    const { state } = pathPoint;

    // Convert state to 3D position
    // Using rotation angles as position (treating state space as 3D)
    const pos = new THREE.Vector3(
      state.rotationX * 2,
      state.rotationY * 2,
      state.rotationZ * 2
    );

    this.trajectoryPoints.push({
      position: pos,
      state: state,
      timestamp: performance.now(),
      opacity: 1.0,
    });

    // Keep trail from getting too long
    if (this.trajectoryPoints.length > this.maxTrailLength) {
      this.trajectoryPoints.shift();
    }

    // Update visualization
    this.updateTrailVisualization();
  }

  updateTrailVisualization() {
    if (this.trajectoryPoints.length < 2) return;

    const positions = [];
    this.trajectoryPoints.forEach((point) => {
      positions.push(point.position.x, point.position.y, point.position.z);
    });

    const posAttr = new THREE.BufferAttribute(new Float32Array(positions), 3);
    this.trailGeometry.setAttribute('position', posAttr);

    // Color the trail with fading effect
    const colors = [];
    const now = performance.now();

    this.trajectoryPoints.forEach((point, idx) => {
      const age = now - point.timestamp;
      const fadeProgress = age / this.trailFadeOutTime;
      const opacity = Math.max(0, 1 - fadeProgress);

      // Blend color from gold to fade
      const brightness = 0.3 + opacity * 0.7;
      colors.push(brightness, brightness * 0.7, brightness * 0.3);
    });

    const colorAttr = new THREE.BufferAttribute(new Float32Array(colors), 3);
    this.trailGeometry.setAttribute('color', colorAttr);

    // Use a material that respects vertex colors
    if (!this.trailMaterial.vertexColors) {
      this.trailMaterial.dispose();
      this.trailMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        opacity: 0.7,
        transparent: true,
        fog: false,
        linewidth: 2,
      });
      this.trailMesh.material = this.trailMaterial;
    }

    this.trailGeometry.computeBoundingSphere();
  }

  clear() {
    this.trajectoryPoints = [];
    this.trailGeometry.dispose();
    this.trailGeometry = new THREE.BufferGeometry();
    this.trailMesh.geometry = this.trailGeometry;
  }

  setEnabled(enabled) {
    this.enabled = enabled;
    this.trailMesh.visible = enabled;
  }

  getTrajectoryLength() {
    return this.trajectoryPoints.length;
  }
}

// ═══════════════════════════════════════════════════════════════
// PREDICTIVE LOOKAHEAD TRAIL
// ═══════════════════════════════════════════════════════════════

class PredictiveTrail {
  constructor(scene, stateEngine, config = {}) {
    this.scene = scene;
    this.stateEngine = stateEngine;

    this.lookaheadMesh = null;
    this.lookaheadGeometry = null;
    this.lookaheadMaterial = null;
    this.lookaheadLength = config.lookaheadLength || 30;

    this.setup();
    this.attachListeners();
  }

  setup() {
    // Material for predictive trail (dimmer, more transparent)
    this.lookaheadMaterial = new THREE.LineBasicMaterial({
      color: 0xC48C50,
      linewidth: 1.5,
      opacity: 0.25,
      transparent: true,
      fog: false,
      dashed: false,
    });

    this.lookaheadGeometry = new THREE.BufferGeometry();
    this.lookaheadMesh = new THREE.Line(this.lookaheadGeometry, this.lookaheadMaterial);
    this.scene.add(this.lookaheadMesh);
  }

  attachListeners() {
    this.stateEngine.on('stateUpdated', (data) => {
      this.updateLookahead();
    });
  }

  updateLookahead() {
    const predictedPath = this.stateEngine.getPredictedPath(this.lookaheadLength);

    if (predictedPath.length < 2) {
      return; // Not enough data
    }

    const positions = [];
    predictedPath.forEach((point) => {
      const state = point.state;
      positions.push(
        state.rotationX * 2,
        state.rotationY * 2,
        state.rotationZ * 2
      );
    });

    const posAttr = new THREE.BufferAttribute(new Float32Array(positions), 3);
    this.lookaheadGeometry.setAttribute('position', posAttr);
    this.lookaheadGeometry.computeBoundingSphere();
  }

  setVisible(visible) {
    this.lookaheadMesh.visible = visible;
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TrajectoryVisualizer, PredictiveTrail };
}
