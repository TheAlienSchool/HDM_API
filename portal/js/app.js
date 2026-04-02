// Ecosystem Root (app.js)
// Responsible for initializing the global Audio Context, orchestrating PJAX state transitions,
// and preserving liveness across the different explorers.

class EcosystemApp {
    constructor() {
        this.audioCtx = null;
        this.cache = new Map();
        
        // Ensure Tone.js is ready if included via script tag globally
        this.toneReady = false;

        this.initPjax();
        console.log(":: Ecosystem Root Initialized");
        
        // Wait for DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.createPingRadar();
                document.body.classList.add('is-loaded');
            });
        } else {
            this.createPingRadar();
            document.body.classList.add('is-loaded');
        }
    }

    async ensureAudioReady() {
        if (!this.audioCtx) {
            // If Tone is globally available (it should be on index.html)
            if (window.Tone) {
                await window.Tone.start();
                this.audioCtx = window.Tone.context;
                this.toneReady = true;
                console.log(":: Global Audio Context Started");
            } else {
                // Fallback to standard AudioContext
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                this.audioCtx = new AudioContext();
            }
        }
        return this.audioCtx;
    }

    initPjax() {
        // Intercept clicks on internal links
        document.addEventListener("click", (e) => {
            const link = e.target.closest("a");
            if (!link || !link.href) return;
            
            // Allow external links, mailto, etc.
            if (link.href.startsWith("mailto:") || link.href.startsWith("tel:") || link.target === "_blank") return;

            const url = new URL(link.href);
            
            // Only intercept same-origin navigation
            if (url.origin === window.location.origin) {
                // Handle local hash links normally
                if (url.pathname === window.location.pathname && url.hash) return;
                
                e.preventDefault();
                this.navigateTo(url.href);
            }
        });

        // Handle back/forward buttons
        window.addEventListener("popstate", (e) => {
            this.navigateTo(window.location.href, true);
        });
    }

    async navigateTo(url, isPopState = false) {
        // Fade out body
        document.body.style.transition = 'opacity 0.4s ease-out';
        document.body.style.opacity = '0';

        // Fetch new content
        try {
            let html = "";
            if (this.cache.has(url)) {
                html = this.cache.get(url);
            } else {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                html = await response.text();
                this.cache.set(url, html);
            }

            // Update URL without reloading if this wasn't a back/forward action
            if (!isPopState) {
                window.history.pushState(null, "", url);
            }

            this.injectNewPage(html);
        } catch (err) {
            console.error("PJAX Error:", err);
            // Fallback to traditional navigation
            window.location.href = url;
        }
    }

    async injectNewPage(html) {
        // Parse the new HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Sync head tags: styles, CSS links, AND external scripts (Three.js, GSAP, etc.)
        const headNodes = Array.from(doc.head.children);

        // Load CSS
        headNodes.forEach(node => {
            if (node.tagName === 'STYLE' || (node.tagName === 'LINK' && node.rel === 'stylesheet')) {
                const existing = Array.from(document.head.children).some(el => el.outerHTML === node.outerHTML);
                if (!existing) document.head.appendChild(node.cloneNode(true));
            }
        });

        // Load external head scripts in order — ensures Three.js, GSAP, Tone.js
        // are available before body scripts run
        const headScripts = headNodes.filter(n => n.tagName === 'SCRIPT' && n.src);
        await Promise.all(headScripts.map(scriptNode => {
            const alreadyLoaded = Array.from(document.querySelectorAll('script[src]'))
                .some(el => el.src === scriptNode.src);
            if (alreadyLoaded) return Promise.resolve();
            return new Promise(resolve => {
                const s = document.createElement('script');
                s.src = scriptNode.src;
                s.onload = resolve;
                s.onerror = resolve;
                document.head.appendChild(s);
            });
        }));

        document.title = doc.title;
        document.body.innerHTML = doc.body.innerHTML;

        // Re-inject the global Ping Radar
        this.createPingRadar();

        // Re-execute body scripts in document order, awaiting each external
        // script before proceeding — ensures Three.js/GSAP are defined before
        // inline scenes try to use them
        const scripts = Array.from(document.body.querySelectorAll("script"));
        scripts.forEach(s => s.parentNode && s.parentNode.removeChild(s));

        for (const oldScript of scripts) {
            const newScript = document.createElement("script");
            if (oldScript.src) {
                const alreadyLoaded = Array.from(document.querySelectorAll('script[src]'))
                    .some(el => el.src === oldScript.src);
                if (!alreadyLoaded) {
                    await new Promise(resolve => {
                        newScript.src = oldScript.src;
                        newScript.onload = resolve;
                        newScript.onerror = resolve;
                        document.body.appendChild(newScript);
                    });
                }
            } else {
                newScript.textContent = oldScript.textContent;
                document.body.appendChild(newScript);
            }
        }

        // Trigger resize and scroll restoration
        window.scrollTo(0, 0);
        
        // Wait briefly for scripts to parse before fading back in
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);

        // Emit an event so specific pages (like explorers) know they just loaded via PJAX
        document.dispatchEvent(new Event("hdm:page-loaded"));
    }

    createPingRadar() {
        if (document.getElementById('global-ping-radar')) return;

        const radar = document.createElement('div');
        radar.id = 'global-ping-radar';
        radar.title = 'PING Radar actively resonating';
        radar.style.position = 'fixed';
        radar.style.bottom = '30px';
        radar.style.left = '30px'; // Move to left to stay out of the way of scrollbars and right-side controls
        radar.style.width = '8px';
        radar.style.height = '8px';
        radar.style.borderRadius = '50%';
        radar.style.backgroundColor = 'var(--terra, #c4622d)';
        radar.style.boxShadow = '0 0 10px rgba(196, 98, 45, 0.6)';
        radar.style.zIndex = '99999';
        radar.style.pointerEvents = 'none';

        if (!document.getElementById('ping-radar-style')) {
            const style = document.createElement('style');
            style.id = 'ping-radar-style';
            style.textContent = `
                @keyframes pingPulse {
                    0%   { transform: scale(0.8); opacity: 0.4; box-shadow: 0 0 0px var(--terra, #c4622d); }
                    50%  { transform: scale(1.2); opacity: 1; box-shadow: 0 0 16px var(--gold, #c48c50); background-color: var(--gold, #c48c50); }
                    100% { transform: scale(0.8); opacity: 0.4; box-shadow: 0 0 0px var(--terra, #c4622d); }
                }
                #global-ping-radar {
                    animation: pingPulse 4.5s infinite ease-in-out;
                }
                #global-ping-radar::after {
                    content: '';
                    position: absolute;
                    top: -150%; left: -150%; right: -150%; bottom: -150%;
                    border: 1px solid var(--terra, #c4622d);
                    border-radius: 50%;
                    animation: pingRadiate 4.5s infinite ease-out;
                    opacity: 0;
                }
                @keyframes pingRadiate {
                    0%   { transform: scale(0.3); opacity: 0.8; }
                    80%  { transform: scale(3.5); opacity: 0; }
                    100% { transform: scale(3.5); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(radar);
    }
}

// Instantiate globally
window.hdmApp = new EcosystemApp();
