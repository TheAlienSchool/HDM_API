/**
 * HONEST FRAMING PROTOCOL :: SUPABASE DESIGN SYSTEM
 * 
 * This module is the bridge between the Steeperverse front-end portals and the Supabase 
 * 'epistemological_guardrails' table. It scans the DOM for flagged terms, fetches their 
 * explicit definitions and mathematical/poetic guardrails, and renders a unified UI tooltip.
 * 
 * Usage:
 * Add `<span class="hdm-term" data-guardrail="Biotensegrity">Biotensegrity</span>` to any HTML.
 * Call `HonestFramingSystem.initialize(supabaseClient)` on load.
 */

class HonestFramingProtocol {
    constructor() {
        this.supabase = null;
        this.cache = new Map();
        this.tooltipEl = null;
        this.isInitialized = false;
        
        // Configuration: Unified Typography and Colors of the Steeperverse
        this.theme = {
            bg: 'rgba(8, 8, 8, 0.98)',
            border: 'rgba(196, 98, 45, 0.25)', // terra with opacity
            title: '#FDFBE2', // luna
            formula: '#C4622D', // terra
            literal: '#8A7D71', // ink
            human: 'rgba(253, 251, 226, 0.75)',
            validityText: 'rgba(196, 140, 80, 0.5)', // gold
            guardrailText: 'rgba(196, 98, 45, 0.55)' // terra
        };
    }

    /**
     * Initializes the design system and injects the unified CSS.
     */
    initialize(supabaseClient) {
        if (this.isInitialized) return;
        this.supabase = supabaseClient;
        
        this.injectStyles();
        this.createTooltipElement();
        this.scanAndBind();
        
        this.isInitialized = true;
        console.log(":: THE HONEST ENGINE :: Guardrail Design System Online.");
    }

    injectStyles() {
        const style = document.createElement('style');
        style.innerHTML = `
            /* --- HONEST FRAMING DESIGN SYSTEM CSS --- */
            .hdm-term {
                cursor: help;
                border-bottom: 1px dashed ${this.theme.validityText};
                transition: border-color 0.2s, color 0.2s;
                position: relative;
            }
            .hdm-term:hover {
                border-bottom-color: ${this.theme.formula};
                color: ${this.theme.title};
                outline: none;
            }

            #hdm-guardrail-tooltip {
                position: fixed; 
                z-index: 10000; 
                max-width: 360px;
                padding: 18px 20px; 
                background: ${this.theme.bg};
                border: 1px solid ${this.theme.border};
                box-shadow: 0 16px 48px rgba(0,0,0,0.8);
                pointer-events: none; 
                opacity: 0; 
                transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1);
                backdrop-filter: blur(12px);
                font-family: 'Inter', sans-serif;
            }
            
            #hdm-guardrail-tooltip.visible { 
                opacity: 1; 
            }

            .hft-formula { font-family: monospace; font-size: 0.65rem; color: ${this.theme.formula}; letter-spacing: 0.22em; text-transform: uppercase; margin-bottom: 6px; }
            .hft-title { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-style: italic; color: ${this.theme.title}; margin-bottom: 12px; }
            .hft-literal { font-size: 0.8rem; color: ${this.theme.literal}; line-height: 1.7; margin-bottom: 12px; }
            .hft-human { font-family: 'Playfair Display', serif; font-size: 0.95rem; font-style: italic; color: ${this.theme.human}; line-height: 1.8; margin-bottom: 12px; border-left: 1px solid rgba(196,140,80,0.25); padding-left: 14px; }
            
            .hft-validity, .hft-guardrail { font-family: monospace; font-size: 0.65rem; letter-spacing: 0.15em; line-height: 1.6; }
            .hft-validity { color: ${this.theme.validityText}; } 
            .hft-validity::before { content: '✓  '; }
            .hft-guardrail { color: ${this.theme.guardrailText}; margin-top: 6px; } 
            .hft-guardrail::before { content: '·  '; }
        `;
        document.head.appendChild(style);
    }

    createTooltipElement() {
        this.tooltipEl = document.createElement('div');
        this.tooltipEl.id = 'hdm-guardrail-tooltip';
        this.tooltipEl.innerHTML = `
            <div class="hft-formula" id="hft-term-label"></div>
            <div class="hft-title" id="hft-concept"></div>
            <div class="hft-literal" id="hft-literal"></div>
            <div class="hft-human" id="hft-human"></div>
            <div class="hft-validity" id="hft-validity"></div>
            <div class="hft-guardrail" id="hft-guardrail"></div>
        `;
        document.body.appendChild(this.tooltipEl);
    }

    /**
     * Scans the document for any element with `data-guardrail` and binds events.
     */
    scanAndBind() {
        const triggers = document.querySelectorAll('[data-guardrail]');
        // Pre-fetch all keys found on page to prevent delay on hover
        const termsToFetch = Array.from(triggers).map(t => t.getAttribute('data-guardrail'));
        if(termsToFetch.length > 0) this.prefetchDictionary(termsToFetch);

        triggers.forEach(el => {
            el.classList.add('hdm-term'); // Apply standard styling
            el.addEventListener('mouseenter', (e) => this.show(e, el.getAttribute('data-guardrail')));
            el.addEventListener('mouseleave', () => this.hide());
            el.addEventListener('focus', (e) => this.show(e, el.getAttribute('data-guardrail')));
            el.addEventListener('blur', () => this.hide());
        });
    }

    /**
     * Batch fetch terms from Supabase to load into memory.
     */
    async prefetchDictionary(terms) {
        if (!this.supabase) {
            console.warn("HonestFramingSystem: Supabase client not provided. Running in placeholder mode.");
            return;
        }
        
        try {
            // Uniquify terms
            const uniqueTerms = [...new Set(terms)];
            const { data, error } = await this.supabase
                .from('epistemological_guardrails')
                .select('*')
                .in('term', uniqueTerms);

            if (error) throw error;

            if (data) {
                data.forEach(entry => this.cache.set(entry.term, entry));
            }
        } catch (err) {
            console.error("Failed to prefetch Guardrails from Supabase:", err);
        }
    }

    async show(event, term) {
        // 1. Get Geometry mapping (where to popup)
        const rect = event.target.getBoundingClientRect();
        
        // 2. Fetch or load cached data
        let content = this.cache.get(term);
        
        if (!content) {
            if (this.supabase) {
                // Fetch dynamically if not cached
                const { data } = await this.supabase
                    .from('epistemological_guardrails')
                    .select('*')
                    .eq('term', term)
                    .single();
                
                if (data) {
                    content = data;
                    this.cache.set(term, data);
                }
            }
            
            // Fallback for missing data or offline mode
            if (!content) {
                content = {
                    term: term,
                    concept_title: "Awaiting Synthesis",
                    literal_translation: "This term has not yet been defined in the Supabase ledger.",
                    human_translation: "The mathematics are still processing.",
                    validity_check: "Unverified.",
                    guardrail: "Proceed observationally."
                };
            }
        }

        // 3. Populate DOM
        document.getElementById('hft-term-label').textContent = content.term;
        document.getElementById('hft-concept').textContent = content.concept_title;
        document.getElementById('hft-literal').textContent = content.literal_translation;
        document.getElementById('hft-human').textContent = content.human_translation;
        document.getElementById('hft-validity').textContent = content.validity_check;
        document.getElementById('hft-guardrail').textContent = content.guardrail;

        // 4. Position smartly
        let leftPos = rect.left - 180 + (rect.width / 2);
        let topPos = rect.bottom + 15;
        
        // Ensure it doesn't bleed off screen right
        if (leftPos + 360 > window.innerWidth) leftPos = window.innerWidth - 380;
        if (leftPos < 20) leftPos = 20;

        this.tooltipEl.style.left = leftPos + 'px';
        this.tooltipEl.style.top = topPos + 'px';
        this.tooltipEl.classList.add('visible');
    }

    hide() {
        this.tooltipEl.classList.remove('visible');
    }
}

// Attach globally
window.HonestFramingSystem = new HonestFramingProtocol();
