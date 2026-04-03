/**
 * DEVELOPMENT STATE PROFILE DISPLAY
 * ═══════════════════════════════════════════════════════════════
 * Real-time visualization of HDM indices (Surface Tension, Trust Velocity, Creative Resonance)
 * 
 * Transforms abstract mathematics into perceivable form:
 * - Radar chart showing current state
 * - Time-series showing evolution
 * - Live updates as state changes
 */

class DSPDisplay {
  constructor(containerSelector, stateEngine) {
    this.container = document.querySelector(containerSelector);
    this.stateEngine = stateEngine;

    this.currentState = stateEngine.getCurrentState();
    this.stateHistory = [this.currentState];
    this.maxHistoryLength = 100;

    this.radarCtx = null;
    this.timeSeriesCtx = null;

    this.setup();
    this.attachListeners();
  }

  setup() {
    // Build HTML structure
    this.container.innerHTML = `
      <div class="dsp-display">
        <div class="dsp-section">
          <div class="dsp-label">LIVE DEVELOPMENT STATE</div>
          <div class="dsp-radar-container">
            <canvas id="dsp-radar" width="200" height="200"></canvas>
          </div>
        </div>
        <div class="dsp-section">
          <div class="dsp-metrics">
            <div class="dsp-metric">
              <div class="dsp-metric-label">Surface Tension</div>
              <div class="dsp-metric-value" id="st-value">0.50</div>
              <div class="dsp-metric-bar"><div class="dsp-bar-fill" id="st-bar"></div></div>
            </div>
            <div class="dsp-metric">
              <div class="dsp-metric-label">Trust Velocity</div>
              <div class="dsp-metric-value" id="tv-value">0.00</div>
              <div class="dsp-metric-bar"><div class="dsp-bar-fill" id="tv-bar"></div></div>
            </div>
            <div class="dsp-metric">
              <div class="dsp-metric-label">Creative Resonance</div>
              <div class="dsp-metric-value" id="cr-value">0.50</div>
              <div class="dsp-metric-bar"><div class="dsp-bar-fill" id="cr-bar"></div></div>
            </div>
          </div>
        </div>
        <div class="dsp-section">
          <div class="dsp-label">TRAJECTORY</div>
          <canvas id="dsp-timeseries" width="300" height="120"></canvas>
        </div>
      </div>
    `;

    // Get canvas contexts
    this.radarCtx = document.getElementById('dsp-radar').getContext('2d');
    this.timeSeriesCtx = document.getElementById('dsp-timeseries').getContext('2d');

    // Add CSS
    this.addStyles();

    // Initial render
    this.updateDisplay();
  }

  addStyles() {
    if (document.getElementById('dsp-styles')) return;

    const style = document.createElement('style');
    style.id = 'dsp-styles';
    style.textContent = `
      .dsp-display {
        font-family: 'Inter', sans-serif;
        color: #F0E6D2;
        background: rgba(13, 9, 7, 0.7);
        border: 1px solid rgba(196, 98, 45, 0.2);
        border-left: 3px solid #C4622D;
        padding: 20px;
        border-radius: 2px;
      }

      .dsp-section {
        margin-bottom: 24px;
      }
      .dsp-section:last-child {
        margin-bottom: 0;
      }

      .dsp-label {
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.32em;
        text-transform: uppercase;
        color: #C4622D;
        margin-bottom: 12px;
      }

      .dsp-radar-container {
        display: flex;
        justify-content: center;
      }

      .dsp-radar-container canvas {
        border: 1px solid rgba(196, 98, 45, 0.15);
        border-radius: 2px;
      }

      .dsp-metrics {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .dsp-metric {
        display: grid;
        grid-template-columns: 140px 1fr 80px;
        align-items: center;
        gap: 12px;
      }

      .dsp-metric-label {
        font-size: 12px;
        color: #B8A890;
      }

      .dsp-metric-value {
        font-size: 14px;
        font-weight: 600;
        color: #C48C50;
        text-align: right;
        min-width: 50px;
      }

      .dsp-metric-bar {
        height: 4px;
        background: rgba(196, 98, 45, 0.1);
        border-radius: 2px;
        overflow: hidden;
      }

      .dsp-bar-fill {
        height: 100%;
        background: linear-gradient(to right, #C4622D, #C48C50);
        border-radius: 2px;
        transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        width: 50%;
      }

      #dsp-timeseries {
        border: 1px solid rgba(196, 98, 45, 0.15);
        border-radius: 2px;
        width: 100%;
      }
    `;

    document.head.appendChild(style);
  }

  attachListeners() {
    this.stateEngine.on('stateUpdated', (data) => {
      this.currentState = data.currentState;
      this.stateHistory.push(data.currentState);

      if (this.stateHistory.length > this.maxHistoryLength) {
        this.stateHistory.shift();
      }

      this.updateDisplay();
    });
  }

  updateDisplay() {
    this.updateMetrics();
    this.drawRadar();
    this.drawTimeSeries();
  }

  updateMetrics() {
    const st = this.currentState.surfaceTension || 0.5;
    const tv = this.currentState.trustVelocity || 0.0;
    const cr = this.currentState.creativeResonance || 0.5;

    // Update text values
    document.getElementById('st-value').textContent = st.toFixed(2);
    document.getElementById('tv-value').textContent = tv.toFixed(2);
    document.getElementById('cr-value').textContent = cr.toFixed(2);

    // Update bar widths
    document.getElementById('st-bar').style.width = (st * 100) + '%';
    document.getElementById('tv-bar').style.width = ((tv + 1) / 2 * 100) + '%'; // Normalize -1 to 1 → 0 to 1
    document.getElementById('cr-bar').style.width = (cr * 100) + '%';
  }

  drawRadar() {
    const ctx = this.radarCtx;
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    const center = { x: w / 2, y: h / 2 };
    const radius = Math.min(w, h) / 2 - 20;

    // Clear
    ctx.fillStyle = 'rgba(13, 9, 7, 0.9)';
    ctx.fillRect(0, 0, w, h);

    // Draw axes
    this.drawRadarAxes(ctx, center, radius);

    // Draw data
    this.drawRadarData(ctx, center, radius);

    // Draw labels
    this.drawRadarLabels(ctx, center, radius);
  }

  drawRadarAxes(ctx, center, radius) {
    ctx.strokeStyle = 'rgba(196, 98, 45, 0.2)';
    ctx.lineWidth = 1;

    // Draw concentric circles
    for (let i = 1; i <= 5; i++) {
      const r = (radius / 5) * i;
      ctx.beginPath();
      ctx.arc(center.x, center.y, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Draw radial lines (3 axes for 3 dimensions)
    for (let i = 0; i < 3; i++) {
      const angle = (Math.PI * 2 / 3) * i - Math.PI / 2;
      const x = center.x + Math.cos(angle) * radius;
      const y = center.y + Math.sin(angle) * radius;

      ctx.beginPath();
      ctx.moveTo(center.x, center.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }

  drawRadarData(ctx, center, radius) {
    const st = this.currentState.surfaceTension || 0.5;
    const tv = (this.currentState.trustVelocity || 0.0 + 1) / 2; // Normalize to 0-1
    const cr = this.currentState.creativeResonance || 0.5;

    const values = [st, tv, cr];
    const angles = [
      -Math.PI / 2,
      -Math.PI / 2 + (Math.PI * 2 / 3),
      -Math.PI / 2 + (Math.PI * 4 / 3),
    ];

    // Draw polygon
    ctx.fillStyle = 'rgba(196, 98, 45, 0.25)';
    ctx.strokeStyle = '#C4622D';
    ctx.lineWidth = 2;

    ctx.beginPath();
    angles.forEach((angle, idx) => {
      const r = radius * values[idx];
      const x = center.x + Math.cos(angle) * r;
      const y = center.y + Math.sin(angle) * r;

      if (idx === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw data points
    ctx.fillStyle = '#C48C50';
    angles.forEach((angle, idx) => {
      const r = radius * values[idx];
      const x = center.x + Math.cos(angle) * r;
      const y = center.y + Math.sin(angle) * r;

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  drawRadarLabels(ctx, center, radius) {
    const labels = ['ST', 'TV', 'CR'];
    const angles = [
      -Math.PI / 2,
      -Math.PI / 2 + (Math.PI * 2 / 3),
      -Math.PI / 2 + (Math.PI * 4 / 3),
    ];

    ctx.fillStyle = '#B8A890';
    ctx.font = '11px Inter';
    ctx.textAlign = 'center';

    angles.forEach((angle, idx) => {
      const x = center.x + Math.cos(angle) * (radius + 18);
      const y = center.y + Math.sin(angle) * (radius + 18);
      ctx.fillText(labels[idx], x, y);
    });
  }

  drawTimeSeries() {
    const ctx = this.timeSeriesCtx;
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    const padding = 10;
    const graphW = w - padding * 2;
    const graphH = h - padding * 2;

    // Clear
    ctx.fillStyle = 'rgba(13, 9, 7, 0.9)';
    ctx.fillRect(0, 0, w, h);

    // Draw axes
    ctx.strokeStyle = 'rgba(196, 98, 45, 0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, h - padding);
    ctx.lineTo(w - padding, h - padding);
    ctx.stroke();

    // Draw three time series (ST, TV, CR)
    const st = this.stateHistory.map((s) => s.surfaceTension || 0.5);
    const tv = this.stateHistory.map((s) => (s.trustVelocity || 0.0 + 1) / 2);
    const cr = this.stateHistory.map((s) => s.creativeResonance || 0.5);

    this.drawLine(ctx, st, '#C4622D', padding, graphW, graphH);
    this.drawLine(ctx, tv, '#C48C50', padding, graphW, graphH);
    this.drawLine(ctx, cr, '#B8A890', padding, graphW, graphH);
  }

  drawLine(ctx, values, color, xOffset, width, height) {
    if (values.length < 2) return;

    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.7;

    ctx.beginPath();
    values.forEach((v, idx) => {
      const x = xOffset + (idx / (values.length - 1)) * width;
      const y = 10 + (1 - v) * height;

      if (idx === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    ctx.globalAlpha = 1;
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DSPDisplay };
}
