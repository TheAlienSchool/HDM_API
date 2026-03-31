/**
 * RESONANCE FIELD VISUALIZER
 * ═══════════════════════════════════════════════════════════════
 * THE CORE MODULE FOR THE CANON
 * 
 * Philosophy: Mathematics emerges from lived experience.
 * Resonance is real and measurable.
 * Transformation happens in the relationships BETWEEN us, not within us.
 * 
 * This module visualizes two simultaneous state trajectories and their
 * alignment in real-time. It proves that the mathematics of transformation
 * lives in the SPACE BETWEEN observers, not in the observers themselves.
 */

class ResonanceFieldVisualizer {
  constructor(scene, config = {}) {
    this.scene = scene;

    // Two participants
    this.states = {
      practitioner: null,
      client: null,
    };

    this.trajectories = {
      practitioner: [],
      client: [],
    };

    this.alignmentHistory = [];
    this.connectionMesh = null;
    this.fieldVisualsEnabled = true;

    this.config = {
      maxHistoryLength: config.maxHistoryLength || 200,
      connectionColor: config.connectionColor || 0xC48C50, // tertiary gold
      harmonyColor: config.harmonyColor || 0x2ecc71, // green (resonance)
      dissonanceColor: config.dissonanceColor || 0xe74c3c, // red (misalignment)
      fieldColor: config.fieldColor || 0x4A90E2, // field blue
      ...config,
    };

    this.setup();
  }

  setup() {
    // Connection line material (updated in real-time)
    this.connectionMaterial = new THREE.LineBasicMaterial({
      color: this.config.connectionColor,
      linewidth: 3,
      opacity: 0.6,
      transparent: true,
      fog: false,
    });

    this.connectionGeometry = new THREE.BufferGeometry();
    this.connectionMesh = new THREE.Line(this.connectionGeometry, this.connectionMaterial);
    this.scene.add(this.connectionMesh);
  }

  // ───────────────────────────────────────────────────────────────
  // PUBLIC API
  // ───────────────────────────────────────────────────────────────

  setPractitionerTrajectory(stateEngine) {
    this.practitionerEngine = stateEngine;
    stateEngine.on('stateUpdated', (data) => {
      this.states.practitioner = data.currentState;
      this.trajectories.practitioner.push(data.currentState);

      if (this.trajectories.practitioner.length > this.config.maxHistoryLength) {
        this.trajectories.practitioner.shift();
      }

      this.updateResonanceField();
    });
  }

  setClientTrajectory(stateEngine) {
    this.clientEngine = stateEngine;
    stateEngine.on('stateUpdated', (data) => {
      this.states.client = data.currentState;
      this.trajectories.client.push(data.currentState);

      if (this.trajectories.client.length > this.config.maxHistoryLength) {
        this.trajectories.client.shift();
      }

      this.updateResonanceField();
    });
  }

  // ───────────────────────────────────────────────────────────────
  // CORE RESONANCE CALCULATION
  // ───────────────────────────────────────────────────────────────

  calculateResonance(practitionerState, clientState) {
    if (!practitionerState || !clientState) return 0;

    // Map HSM (HDM state model) parameters to relationship space
    const practitionerVector = [
      practitionerState.surfaceTension || 0.5,
      practitionerState.trustVelocity || 0.0,
      practitionerState.creativeResonance || 0.5,
    ];

    const clientVector = [
      clientState.surfaceTension || 0.5,
      clientState.trustVelocity || 0.0,
      clientState.creativeResonance || 0.5,
    ];

    // Cosine similarity: -1 (opposite) to +1 (aligned)
    const alignment = this.cosineSimilarity(practitionerVector, clientVector);

    return alignment;
  }

  cosineSimilarity(vecA, vecB) {
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));

    if (magA === 0 || magB === 0) return 0;
    return dotProduct / (magA * magB);
  }

  // ───────────────────────────────────────────────────────────────
  // VISUALIZATION UPDATE
  // ───────────────────────────────────────────────────────────────

  updateResonanceField() {
    if (!this.states.practitioner || !this.states.client) return;

    // Calculate alignment
    const alignment = this.calculateResonance(
      this.states.practitioner,
      this.states.client
    );

    this.alignmentHistory.push({
      alignment: alignment,
      timestamp: performance.now(),
      practitionerState: { ...this.states.practitioner },
      clientState: { ...this.states.client },
    });

    // Keep history bounded
    if (this.alignmentHistory.length > this.config.maxHistoryLength) {
      this.alignmentHistory.shift();
    }

    // Update connection line
    this.updateConnectionLine(alignment);

    // Emit event for external listeners (sonification, UI updates, etc.)
    this.emit('resonanceUpdated', {
      alignment: alignment,
      type: this.getResonanceType(alignment),
      frequency: this.getResonanceFrequency(alignment),
    });
  }

  updateConnectionLine(alignment) {
    const practitionerPos = this.stateToPosition(this.states.practitioner);
    const clientPos = this.stateToPosition(this.states.client);

    if (!practitionerPos || !clientPos) return;

    // Positions
    const positions = new Float32Array([
      practitionerPos.x, practitionerPos.y, practitionerPos.z,
      clientPos.x, clientPos.y, clientPos.z,
    ]);

    this.connectionGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Color based on alignment
    const color = this.alignmentToColor(alignment);
    this.connectionMaterial.color.setHex(color);

    // Opacity based on alignment strength
    this.connectionMaterial.opacity = 0.3 + Math.abs(alignment) * 0.4;
  }

  stateToPosition(state) {
    if (!state) return null;

    return new THREE.Vector3(
      state.rotationX * 2,
      state.rotationY * 2,
      state.rotationZ * 2
    );
  }

  // ───────────────────────────────────────────────────────────────
  // ALIGNMENT INTERPRETATION
  // ───────────────────────────────────────────────────────────────

  getResonanceType(alignment) {
    if (alignment > 0.7) return 'harmonic';
    if (alignment > 0.4) return 'aligned';
    if (alignment > -0.4) return 'neutral';
    if (alignment > -0.7) return 'dissonant';
    return 'chaotic';
  }

  alignmentToColor(alignment) {
    // Harmonic (green) ↔ Neutral (gold) ↔ Dissonant (red)
    if (alignment >= 0) {
      // Green to gold
      const t = alignment; // 0 → 1
      const r = Math.round(196 + (46 - 196) * t); // terra to green R
      const g = Math.round(140 + (204 - 140) * t); // gold to green G
      const b = Math.round(80 + (113 - 80) * t); // gold to green B
      return (r << 16) | (g << 8) | b;
    } else {
      // Red to gold
      const t = -alignment; // 0 → 1
      const r = Math.round(196 + (231 - 196) * t); // terra to red R
      const g = Math.round(140 + (76 - 140) * t); // gold to red G
      const b = Math.round(80 + (60 - 80) * t); // gold to red B
      return (r << 16) | (g << 8) | b;
    }
  }

  getResonanceFrequency(alignment) {
    // Map alignment to audible frequency range
    const baseFreq = 220; // A3
    // -1 (opposite) → low frequency
    // 0 (neutral) → mid frequency
    // +1 (aligned) → high frequency
    const frequency = baseFreq * Math.pow(2, alignment * 2);
    return Math.max(55, Math.min(880, frequency));
  }

  // ───────────────────────────────────────────────────────────────
  // FIELD VISUALIZATION (Advanced)
  // ───────────────────────────────────────────────────────────────

  visualizeFieldOfResonance() {
    // Create a visible field around the connection line showing resonance quality
    if (!this.states.practitioner || !this.states.client) return;

    const alignment = this.calculateResonance(
      this.states.practitioner,
      this.states.client
    );

    const practPos = this.stateToPosition(this.states.practitioner);
    const clientPos = this.stateToPosition(this.states.client);

    // Create a tube/ribbon between the two positions
    // Thickness and color indicate alignment strength
    const tubeMesh = this.createResonanceTube(practPos, clientPos, alignment);

    if (this.currentFieldMesh) {
      this.scene.remove(this.currentFieldMesh);
    }
    this.currentFieldMesh = tubeMesh;
    this.scene.add(tubeMesh);
  }

  createResonanceTube(startPos, endPos, alignment) {
    const curve = new THREE.LineCurve3(startPos, endPos);
    const tubeGeometry = new THREE.TubeGeometry(curve, 20, 0.1 + Math.abs(alignment) * 0.1, 8, false);

    const color = new THREE.Color();
    color.setHex(this.alignmentToColor(alignment));

    const material = new THREE.MeshPhongMaterial({
      color: color,
      emissive: color,
      emissiveIntensity: 0.3,
      opacity: 0.5 + Math.abs(alignment) * 0.3,
      transparent: true,
      side: THREE.DoubleSide,
    });

    return new THREE.Mesh(tubeGeometry, material);
  }

  // ───────────────────────────────────────────────────────────────
  // QUERY & EXPORT
  // ───────────────────────────────────────────────────────────────

  getAlignmentHistory() {
    return this.alignmentHistory.slice();
  }

  getCurrentAlignment() {
    if (this.alignmentHistory.length === 0) return 0;
    return this.alignmentHistory[this.alignmentHistory.length - 1].alignment;
  }

  getAverageAlignment(windowSize = 20) {
    const recent = this.alignmentHistory.slice(-windowSize);
    if (recent.length === 0) return 0;
    const sum = recent.reduce((acc, h) => acc + h.alignment, 0);
    return sum / recent.length;
  }

  getResonanceMetrics() {
    const recent = this.alignmentHistory.slice(-50);
    const current = this.getCurrentAlignment();
    const average = this.getAverageAlignment();
    const trend = recent.length > 1 
      ? (recent[recent.length - 1].alignment - recent[0].alignment) / recent.length
      : 0;

    return {
      current: current,
      average: average,
      trend: trend,
      type: this.getResonanceType(current),
      frequency: this.getResonanceFrequency(current),
    };
  }

  // ───────────────────────────────────────────────────────────────
  // EVENT SYSTEM
  // ───────────────────────────────────────────────────────────────

  on(eventName, callback) {
    if (!this.listeners) this.listeners = {};
    if (!this.listeners[eventName]) this.listeners[eventName] = [];
    this.listeners[eventName].push(callback);
  }

  emit(eventName, data) {
    if (!this.listeners || !this.listeners[eventName]) return;
    this.listeners[eventName].forEach((cb) => cb(data));
  }

  // ───────────────────────────────────────────────────────────────
  // CLEANUP
  // ───────────────────────────────────────────────────────────────

  dispose() {
    if (this.connectionGeometry) this.connectionGeometry.dispose();
    if (this.connectionMaterial) this.connectionMaterial.dispose();
    if (this.connectionMesh) this.scene.remove(this.connectionMesh);
    if (this.currentFieldMesh) this.scene.remove(this.currentFieldMesh);
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ResonanceFieldVisualizer };
}
