/**
 * Resonance Orchestrator
 * ═══════════════════════════════════════════════════════════════
 * 
 * Orchestrates two simultaneous state engines (Dodecahedron + De Jong)
 * and manifests their alignment as visible, audible resonance.
 * 
 * The Canon principle: Transformation emerges in relationships BETWEEN us,
 * not within us. Here is where two journeys become one song.
 * 
 * Events:
 *   - 'alignmentUpdated': { alignment, frequency, phase }
 *   - 'resonanceStart': { practitionerState, clientState }
 *   - 'resonanceComplete': { finalAlignment, peakFrequency }
 */

class ResonanceOrchestrator extends EventTarget {
    constructor(scene, options = {}) {
        super();

        this.scene = scene;
        this.practitionerEngine = null;
        this.clientEngine = null;
        this.practitionerTrajectory = [];
        this.clientTrajectory = [];
        this.maxTrajectoryLength = options.maxTrajectoryLength || 200;
        this.resonanceColor = options.resonanceColor || 0xD4A870;

        // Visualization
        this.field = null;
        this.connectionLine = null;
        this.alignmentTube = null;

        // Metrics
        this.currentAlignment = 0;
        this.alignmentHistory = [];
        this.maxHistoryLength = 300;

        // Sonification state
        this.currentFrequency = 440;
        this.frequencyMin = options.frequencyMin || 55;
        this.frequencyMax = options.frequencyMax || 880;

        // Animation
        this.isActive = false;
        this.animationFrameId = null;
    }

    /**
     * Attach practitioner state engine (usually Dodecahedron)
     */
    setPractitionerEngine(engine) {
        if (this.practitionerEngine) {
            this.practitionerEngine.removeEventListener('stateUpdated', this._onPractitionerUpdate);
        }

        this.practitionerEngine = engine;
        this._onPractitionerUpdate = this.onPractitionerUpdate.bind(this);
        this.practitionerEngine.addEventListener('stateUpdated', this._onPractitionerUpdate);

        return this;
    }

    /**
     * Attach client state engine (usually De Jong parameters)
     */
    setClientEngine(engine) {
        if (this.clientEngine) {
            this.clientEngine.removeEventListener('stateUpdated', this._onClientUpdate);
        }

        this.clientEngine = engine;
        this._onClientUpdate = this.onClientUpdate.bind(this);
        this.clientEngine.addEventListener('stateUpdated', this._onClientUpdate);

        return this;
    }

    /**
     * Start orchestration
     */
    start() {
        if (this.isActive) return this;

        this.isActive = true;
        this.practitionerTrajectory = [];
        this.clientTrajectory = [];
        this.alignmentHistory = [];

        this.dispatchEvent(new CustomEvent('resonanceStart', {
            detail: {
                practitionerState: this.practitionerEngine?.currentState,
                clientState: this.clientEngine?.currentState,
            }
        }));

        this.animate();
        return this;
    }

    /**
     * Stop orchestration
     */
    stop() {
        if (!this.isActive) return this;

        this.isActive = false;
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }

        if (this.alignmentHistory.length > 0) {
            const peakAlignment = Math.max(...this.alignmentHistory);
            const peakFreq = this.alignmentToFrequency(peakAlignment);

            this.dispatchEvent(new CustomEvent('resonanceComplete', {
                detail: {
                    finalAlignment: this.currentAlignment,
                    peakFrequency: peakFreq,
                    averageAlignment: this.alignmentHistory.reduce((a, b) => a + b) / this.alignmentHistory.length,
                }
            }));
        }

        return this;
    }

    /**
     * Update from practitioner state engine
     */
    onPractitionerUpdate(event) {
        const state = event.detail;
        const position = new THREE.Vector3(
            state.surfaceTension * 10 - 5,
            state.trustVelocity * 5,
            state.creativeResonance * 10 - 5
        );

        this.practitionerTrajectory.push({
            position: position.clone(),
            state: state,
            timestamp: Date.now(),
        });

        if (this.practitionerTrajectory.length > this.maxTrajectoryLength) {
            this.practitionerTrajectory.shift();
        }

        this.calculateAlignment();
    }

    /**
     * Update from client state engine
     */
    onClientUpdate(event) {
        const state = event.detail;
        const position = new THREE.Vector3(
            state.surfaceTension * 10 - 5,
            state.trustVelocity * 5,
            state.creativeResonance * 10 - 5
        );

        this.clientTrajectory.push({
            position: position.clone(),
            state: state,
            timestamp: Date.now(),
        });

        if (this.clientTrajectory.length > this.maxTrajectoryLength) {
            this.clientTrajectory.shift();
        }

        this.calculateAlignment();
    }

    /**
     * Calculate alignment via cosine similarity
     */
    calculateAlignment() {
        if (!this.practitionerEngine || !this.clientEngine) return;

        const p = this.practitionerEngine.currentState;
        const c = this.clientEngine.currentState;

        // Normalize state vectors
        const pVec = [p.surfaceTension, p.trustVelocity, p.creativeResonance];
        const cVec = [c.surfaceTension, c.trustVelocity, c.creativeResonance];

        // Cosine similarity: dot product / (magnitude1 * magnitude2)
        let dot = 0;
        let mag1 = 0;
        let mag2 = 0;

        for (let i = 0; i < 3; i++) {
            dot += pVec[i] * cVec[i];
            mag1 += pVec[i] * pVec[i];
            mag2 += cVec[i] * cVec[i];
        }

        mag1 = Math.sqrt(mag1);
        mag2 = Math.sqrt(mag2);

        this.currentAlignment = mag1 > 0 && mag2 > 0 ? dot / (mag1 * mag2) : 0;
        this.alignmentHistory.push(this.currentAlignment);

        if (this.alignmentHistory.length > this.maxHistoryLength) {
            this.alignmentHistory.shift();
        }

        const frequency = this.alignmentToFrequency(this.currentAlignment);
        const phase = this.alignmentToPhase(this.currentAlignment);

        this.currentFrequency = frequency;

        this.dispatchEvent(new CustomEvent('alignmentUpdated', {
            detail: {
                alignment: this.currentAlignment,
                frequency: frequency,
                phase: phase,
                practitionerPos: this.practitionerTrajectory[this.practitionerTrajectory.length - 1]?.position,
                clientPos: this.clientTrajectory[this.clientTrajectory.length - 1]?.position,
            }
        }));
    }

    /**
     * Map alignment (-1 to +1) to frequency (55-880 Hz)
     * Harmonic resonance = higher frequency
     * Dissonant = lower frequency
     */
    alignmentToFrequency(alignment) {
        const normalized = (alignment + 1) / 2; // Convert -1..1 to 0..1
        const exponential = Math.pow(normalized, 1.5); // Emphasize higher alignments
        return this.frequencyMin + (this.frequencyMax - this.frequencyMin) * exponential;
    }

    /**
     * Map alignment to phase (resonance quality)
     * Returns -1 (dissonant) to +1 (consonant)
     */
    alignmentToPhase(alignment) {
        return alignment;
    }

    /**
     * Map alignment to color
     * -1 (red/dissonant) → 0 (gold/neutral) → +1 (green/harmonic)
     */
    alignmentToColor(alignment) {
        const t = (alignment + 1) / 2; // Normalize to 0..1

        if (t < 0.5) {
            // Red to Gold
            const tt = t * 2;
            return new THREE.Color(1, tt * 0.5, 0);
        } else {
            // Gold to Green
            const tt = (t - 0.5) * 2;
            return new THREE.Color(1 - tt * 0.5, 0.85 + tt * 0.15, 0);
        }
    }

    /**
     * Visualize the resonance field
     */
    visualizeField() {
        if (this.practitionerTrajectory.length === 0 || this.clientTrajectory.length === 0) {
            return;
        }

        const pPos = this.practitionerTrajectory[this.practitionerTrajectory.length - 1].position;
        const cPos = this.clientTrajectory[this.clientTrajectory.length - 1].position;

        // Update or create connection line
        if (!this.connectionLine) {
            const lineGeometry = new THREE.BufferGeometry();
            const lineMaterial = new THREE.LineBasicMaterial({
                color: this.alignmentToColor(this.currentAlignment),
                linewidth: 2,
            });
            this.connectionLine = new THREE.Line(lineGeometry, lineMaterial);
            this.scene.add(this.connectionLine);
        }

        // Update line positions
        const positions = [
            pPos.x, pPos.y, pPos.z,
            cPos.x, cPos.y, cPos.z,
        ];

        this.connectionLine.geometry.setAttribute(
            'position',
            new THREE.BufferAttribute(new Float32Array(positions), 3)
        );
        this.connectionLine.material.color = this.alignmentToColor(this.currentAlignment);

        // Update line width based on alignment
        const thickness = 0.01 + Math.abs(this.currentAlignment) * 0.04;
        this.connectionLine.material.linewidth = thickness * 100;
    }

    /**
     * Get metrics for display
     */
    getMetrics() {
        return {
            currentAlignment: this.currentAlignment.toFixed(3),
            currentFrequency: this.currentFrequency.toFixed(1),
            averageAlignment: this.alignmentHistory.length > 0
                ? (this.alignmentHistory.reduce((a, b) => a + b) / this.alignmentHistory.length).toFixed(3)
                : 0,
            peakAlignment: this.alignmentHistory.length > 0
                ? Math.max(...this.alignmentHistory).toFixed(3)
                : 0,
            trajectory: {
                practitioner: this.practitionerTrajectory.length,
                client: this.clientTrajectory.length,
            }
        };
    }

    /**
     * Get alignment history (for charting)
     */
    getAlignmentHistory() {
        return [...this.alignmentHistory];
    }

    /**
     * Animation loop
     */
    animate() {
        if (!this.isActive) return;

        this.visualizeField();
        this.animationFrameId = requestAnimationFrame(() => this.animate());
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ResonanceOrchestrator;
}
