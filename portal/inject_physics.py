import os
import glob

html_files = glob.glob('*.html') + glob.glob('explorers/*.html')

css_injector = """
  <!-- PHYSICS ENGINE CSS -->
  <style>
    body { opacity: 0; transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
    body.is-loaded { opacity: 1; }
    html.lenis { height: auto; }
    .lenis.lenis-smooth { scroll-behavior: auto; }
    .lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
    .lenis.lenis-stopped { overflow: hidden; }
    .lenis.lenis-scrolling iframe { pointer-events: none; }
  </style>
"""

js_injector = """
<!-- PHYSICS ENGINE JS (Lenis + Page Transitions) -->
<script src="https://unpkg.com/@studio-freight/lenis@1.0.35/dist/lenis.min.js"></script>
<script>
  (function() {
    // 1. Page Load Fade In & BFCache Handling
    function reveal() { document.body.classList.add('is-loaded'); }
    window.addEventListener('load', reveal);
    window.addEventListener('pageshow', reveal);
    setTimeout(reveal, 150); // Fallback

    // 2. Lenis Smooth Scroll Setup
    const isLocked = window.getComputedStyle(document.body).overflowY === 'hidden';
    let lenis;
    if (!isLocked && typeof Lenis !== 'undefined') {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
      });
      window.lenis = lenis; // Export for global access
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    // 3. Intercept Outbound Links for Exit Transitions & Smooth Hash Scrolling
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link || !link.href) return;
      
      const isInternal = link.hostname === window.location.hostname;
      const isHash = link.hash && link.pathname === window.location.pathname;
      const isBlank = link.target === '_blank';

      // Exception for mailto or tel links
      if (link.href.startsWith('mailto:') || link.href.startsWith('tel:')) return;

      if (isInternal && !isBlank) {
        if (isHash) {
          e.preventDefault();
          const target = link.hash === '#' ? document.body : document.querySelector(link.hash);
          if (target && lenis) {
            lenis.scrollTo(target, { offset: -80 }); // respect fixed headers
          } else if (target) {
            // Native fallback
            const y = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({top: y, behavior: 'smooth'});
          }
        } else {
          // Cross-page transition fade out
          e.preventDefault();
          document.body.style.transition = 'opacity 0.4s ease-out';
          document.body.classList.remove('is-loaded');
          setTimeout(() => {
            window.location.href = link.href;
          }, 400); // Wait for fade out
        }
      }
    });

    // 4. Parallax compatibility fix
    // By default Lenis fires window scroll events, so existing parallax systems continue to work perfectly.
  })();
</script>
"""

affected = []

for file in html_files:
    # Skip HDM_Silent_Treatment/index.html because it is highly custom and deep-steep space.
    if "Silent_Treatment" in file:
        continue

    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Skip if already injected
    if 'PHYSICS ENGINE CSS' in content:
        continue

    # Insert CSS before </head>
    if '</head>' in content:
        content = content.replace('</head>', css_injector + '\n</head>')

    # Insert JS before </body>
    if '</body>' in content:
        content = content.replace('</body>', js_injector + '\n</body>')

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    affected.append(file)

print(f"Injected physics engine into {len(affected)} files:")
for f in affected:
    print(f"  - {f}")
