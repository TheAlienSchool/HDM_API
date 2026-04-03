/**
 * HIA SONNET ENGINE & TOOLTIP ARCHITECTURE
 * 
 * Implements:
 * 1. The Quanticized Sonification Engine (Golden Ratio / Harmonic Series)
 * 2. The Global Tooltip Architecture (Affirmational hover states)
 * 
 * "I would like every page, tooltip, hover surface, and interactive aspect to have some 
 * quanticized sonification that maintains the strength of the sonnet engine all the way 
 * through the experience."
 */

(function() {
    // ═════════════════════════════════════════════════════════════
    // 1. TOOLTIP ARCHITECTURE (Visual Membrane)
    // ═════════════════════════════════════════════════════════════
    let tipCard = document.getElementById('tooltip-card');
    
    // Inject the tooltip DOM if it doesn't exist
    if (!tipCard) {
        tipCard = document.createElement('div');
        tipCard.id = 'tooltip-card';
        tipCard.innerHTML = `
            <div class="tip-term" id="global-tip-term"></div>
            <div class="tip-def" id="global-tip-def"></div>
        `;
        document.body.appendChild(tipCard);

        // Inject styles
        const tipStyle = document.createElement('style');
        tipStyle.innerHTML = `
            /* Core Tooltip Interaction */
            .tip { border-bottom: 1px dashed currentColor; cursor: pointer; position: relative; transition: color 0.2s; }
            .tip:hover, .tip.active { color: var(--terra, #C4622D); border-bottom-color: var(--terra, #C4622D); }
            
            /* Tooltip Card Aesthetics (HIA Dark Mode) */
            #tooltip-card {
                position: absolute; z-index: 100000;
                max-width: 320px; min-width: 220px;
                background: var(--charcoal, #1E1610);
                border: 1px solid rgba(196, 98, 45, 0.3);
                border-left: 3px solid var(--terra, #C4622D);
                padding: 18px 20px;
                pointer-events: none;
                opacity: 0; transform: translateY(8px) scale(0.97);
                transition: opacity 0.15s cubic-bezier(0.16, 1, 0.3, 1), transform 0.15s cubic-bezier(0.16, 1, 0.3, 1);
                font-family: var(--font-body, 'Inter', sans-serif);
                box-shadow: 0 12px 40px rgba(0,0,0,0.6);
            }
            #tooltip-card.visible { opacity: 1; transform: translateY(0) scale(1); }
            #tooltip-card .tip-term {
                font-family: var(--font-display, 'Playfair Display', serif);
                font-size: 16px; font-weight: 500;
                color: var(--sand, #F0E6D2);
                margin-bottom: 8px; line-height: 1.2;
            }
            #tooltip-card .tip-def {
                font-size: 14px; font-weight: 300;
                color: var(--ink-light, #B8A890);
                line-height: 1.65;
            }
        `;
        document.head.appendChild(tipStyle);
    }

    const tipTerm = tipCard.querySelector('.tip-term') || document.getElementById('tip-term') || document.getElementById('global-tip-term');
    const tipDef = tipCard.querySelector('.tip-def') || document.getElementById('tip-def') || document.getElementById('global-tip-def');
    let tipTimeout;

    // ═════════════════════════════════════════════════════════════
    // 2. SONNET AUDIO ENGINE (Quanticized Resonance)
    // ═════════════════════════════════════════════════════════════
    let audioCtx = null;
    let unlocked = false;
    
    function initAudio() {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        unlocked = true;
    }

    // Aether root. The exact vibration of HDM Insights Academy (HIA) mathematically.
    const baseFreq = 288.0; 
    
    // Harmonic Series + Golden Ratio (Phi = 1.618) mathematical intervals for 12 faces
    const mathematicalRatios = [
        1.0,           // Root
        1.125,         // 9/8 Major Second
        1.25,          // 5/4 Major Third
        1.333,         // 4/3 Perfect Fourth
        1.5,           // 3/2 Perfect Fifth
        1.618033,      // The Golden Ratio (Phi)
        1.666,         // 5/3 Major Sixth
        1.875,         // 15/8 Major Seventh
        2.0,           // Octave
        2.25,          // Octave + Major Second
        2.5,           // Octave + Major Third
        2.618033       // Octave + Golden Ratio
    ];

    function playHoverBell(index) {
        if (!unlocked || !audioCtx) return;
        
        // Pitch calculated precisely using structural ratios
        const freq = baseFreq * mathematicalRatios[index % 12];
        
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();

        // Soft, resonant bell timbre
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, audioCtx.currentTime);
        
        // Muted envelope: brushing dust off glass
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.7);

        osc.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.75);
    }

    function playClickChord() {
        if (!unlocked || !audioCtx) return;
        // Triad based on Phi (1 - 1.5 - 1.618)
        [1.0, 1.5, 1.618033].forEach(ratio => {
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(baseFreq * ratio, audioCtx.currentTime);
            
            gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.02, audioCtx.currentTime + 0.015);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.9);
            
            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            osc.start();
            osc.stop(audioCtx.currentTime + 0.95);
        });
    }

    // ═════════════════════════════════════════════════════════════
    // 3. EVENT DELEGATOR & DOM PARSER
    // ═════════════════════════════════════════════════════════════
    let interactableCount = 0;

    function attachBeadwork(el) {
        if (el.dataset.sonnetAttached) return;
        el.dataset.sonnetAttached = 'true';
        
        const index = interactableCount++;

        // Visual Tooltip logic for .tip
        if (el.classList.contains('tip')) {
            ['mouseenter', 'touchstart'].forEach(evt => {
                el.addEventListener(evt, e => {
                    clearTimeout(tipTimeout);
                    document.querySelectorAll('.tip').forEach(t => t.classList.remove('active'));
                    el.classList.add('active');
                    
                    if(tipTerm) tipTerm.innerHTML = el.dataset.term || el.textContent;
                    if(tipDef) tipDef.innerHTML = el.getAttribute('data-tip');
                    
                    const rect = el.getBoundingClientRect();
                    let left = rect.left - 20;
                    let top = rect.bottom + window.scrollY + 12;
                    
                    if (left + 320 > window.innerWidth) left = window.innerWidth - 340;
                    if (left < 10) left = 10;
                    
                    tipCard.style.left = left + 'px';
                    tipCard.style.top = top + 'px';
                    tipCard.classList.add('visible');
                    
                    playHoverBell(index);
                });
            });
            ['mouseleave'].forEach(evt => {
                el.addEventListener(evt, () => {
                    tipTimeout = setTimeout(() => {
                        tipCard.classList.remove('visible');
                        el.classList.remove('active');
                    }, 150);
                });
            });
        } 
        // Generics (Links, buttons, cards)
        else {
            el.addEventListener('mouseenter', () => playHoverBell(index));
            el.addEventListener('mousedown', playClickChord);
        }
    }

    function parseEcosystem() {
        // Find all interactables: tips, links, buttons, hover cards.
        const selectors = '.tip, a, button, .face-card, .explorer-card, .hub-card, .eco-nav-marker, .cap-card';
        document.querySelectorAll(selectors).forEach(attachBeadwork);
    }

    // ═════════════════════════════════════════════════════════════
    // 4. INITIALIZATION
    // ═════════════════════════════════════════════════════════════
    window.addEventListener('load', () => {
        // Listeners for Audio Unlock
        document.addEventListener('click', initAudio, { once: true });
        document.addEventListener('touchstart', initAudio, { once: true });
        
        parseEcosystem();
        
        // Observe for newly injected elements
        const observer = new MutationObserver(mutations => {
            let DOMChanged = false;
            mutations.forEach(m => { if (m.addedNodes.length > 0) DOMChanged = true; });
            if (DOMChanged) parseEcosystem();
        });
        observer.observe(document.body, { childList: true, subtree: true });
    });
})();
