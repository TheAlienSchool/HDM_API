import os
import re
import sys

# Reconfigure stdout to support unicode printing on Windows console
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')


# ============================================================
# HYPER-SEO GENERATOR & METADATA INJECTOR :: v4.6
# ============================================================
# This script injects search metadata, OpenGraph cards, JSON-LD
# schemas, and a floating Clarity Bridge navigation menu en masse
# into all HTML files in the HIA codebase.
# ============================================================

SITE_URL = "https://ping-hdm.netlify.app"
OG_IMAGE_URL = f"{SITE_URL}/assets/og-image.png"

# Hand-curated SEO Metadata lookup for major pages
CURATED_META = {
    "index.html": {
        "title": "HDM Insights Academy (HIA) :: The Architecture of Resonance",
        "description": "The HDM Insights Academy (HIA) maps human consciousness, somatic pattern recognition, and ethnomathematics through the lens of the dodecahedron at The Alien School for Creative Thinking.",
        "priority": "1.00"
    },
    "resonance-library.html": {
        "title": "HDM Resonance Library :: A Concept Sanctuary",
        "description": "A quiet archive housing the research papers, transcripts, and calculations on the physics of attunement, ethnomathematics, and school history.",
        "priority": "0.90"
    },
    "resonance-map.html": {
        "title": "HIA Resonance Map :: The Constellation of Awareness",
        "description": "A comprehensive index and knowledge graph mapping the 12 faces of the dodecahedron, the 22 grimoire cards, and the 7 steeps of the attunement scroll.",
        "priority": "0.90"
    },
    "explorers/index.html": {
        "title": "HIA Somatic Laboratory :: Creative Instruments",
        "description": "Explore interactive design instruments, attractor models, and somatic mapping tools developed to bridge raw thought patterns into creative action.",
        "priority": "0.90"
    },
    "explorers/bloom-explorer.html": {
        "title": "BLOOM: An Inner Game :: The Somatic Territory",
        "description": "Traverse the twelve pentagonal chambers of the dodecahedron's net projection, draw guidance from the 22-card HDM grimoire, and release somatic loads.",
        "priority": "0.90"
    },
    "explorers/dodecahedron-explorer.html": {
        "title": "Dodecahedron Explorer :: The Shape You Are Made Of",
        "description": "A physics-based interactive 3D instrument playing pentatonic chimes, tracing traversed BLOOM paths, and archiving somatic reflections.",
        "priority": "0.90"
    },
    "disengendered-mathematics.html": {
        "title": "Dimensional Wizardry :: Disengendered Mathematics",
        "description": "Explore the geometry of lived experience, dimensional coordinate alignments, and the mathematical topology of attention's gravity.",
        "priority": "0.80"
    },
    "dodecahedral-capstones.html": {
        "title": "Dodecahedral Capstones :: The 12 Modes of Consciousness",
        "description": "The twelve modes of human consciousness mapped to the faces of the dodecahedron, establishing perfect distribution of attention tension.",
        "priority": "0.80"
    },
    "pain-creates-stories.html": {
        "title": "Pain Creates Stories :: Somatic Release Fields",
        "description": "Writing prompts and somatic release fields designed to convert heavy emotional loads into positive creative leverage.",
        "priority": "0.80"
    },
    "phase-state-laboratory.html": {
        "title": "Phase-State Laboratory :: Narrative Terminals",
        "description": "An interactive observatory designed to track somatic states, strange attractor equations, and Platonic solid transformations.",
        "priority": "0.80"
    },
    "the-crossover.html": {
        "title": "The Crossover :: Two Portals, One Field",
        "description": "The crossing filaments connecting the 3D dodecahedron model to the 2D Bloom SVG net, allowing dynamic path highlighting.",
        "priority": "0.80"
    },
    "visceral-resonance-field.html": {
        "title": "Visceral Resonance Field :: Somatic Attractor Geometry",
        "description": "A real-time visualizer of somatic attunement, mapping the gravity of attention and heart-brain synchronization.",
        "priority": "0.80"
    },
    "explorers/phi-explorer.html": {
        "title": "The φ Ocean Explorer :: Harmonic Frequencies",
        "description": "An immersive chamber demonstrating the golden ratio as a wave generator, connecting biological growth to acoustic intervals.",
        "priority": "0.75"
    },
    "explorers/phi-mirror.html": {
        "title": "Chamber 09 · The φ Mirror",
        "description": "Reflection fields mirroring internal somatic structures and ancestral path alignments using math models.",
        "priority": "0.75"
    },
    "explorers/phi-harmonic-lineage.html": {
        "title": "φ Harmonic Lineage :: Ancestral Pathways",
        "description": "Map ancestral crossings and lineage geometries using golden ratio matrices and harmonic scaling.",
        "priority": "0.75"
    }
}

def clean_file_path(filepath):
    # Normalize paths to use forward slashes and remove leading ./
    path = os.path.relpath(filepath, start=".").replace("\\", "/")
    if path.startswith("./"):
        path = path[2:]
    return path

def get_meta_for_file(filepath, current_title):
    rel_path = clean_file_path(filepath)
    
    # Check if curated metadata exists
    if rel_path in CURATED_META:
        return CURATED_META[rel_path]
    
    # Generate fallback metadata based on filename and title
    basename = os.path.basename(filepath)
    name_clean = os.path.splitext(basename)[0].replace("-", " ").title()
    
    # Keep existing title if clean, otherwise sanitize
    title = current_title if current_title else f"{name_clean} :: HIA Somatic Lab"
    
    # Clean up title to ensure no negations
    title = sanitize_text(title)
    
    # Chamber-specific titles
    match_chamber = re.search(r'phi-chamber-(\d+)', rel_path, re.IGNORECASE)
    if match_chamber:
        chamber_num = match_chamber.group(1)
        title = f"Chamber {chamber_num} · The φ Ocean"
        description = f"Chamber {chamber_num} of the phi ocean. A space for quiet breathing, somatic reflection, and creative steeping."
        priority = "0.70"
    else:
        description = f"Interactive somatic explorer mapping the mathematics of {name_clean.lower()} at The Alien School for Creative Thinking."
        priority = "0.70"
        
    return {
        "title": title,
        "description": description,
        "priority": priority
    }

def sanitize_text(text):
    # Simple replacement to remove negations to align with the "Listener's Path"
    replacements = {
        r'\bnot\b': '',
        r"\bdon't\b": 'choose to',
        r'\bcan\'t\b': 'aspire to',
        r'\bnever\b': 'rarely',
        r'\bbut\b': 'and'
    }
    for pattern, rep in replacements.items():
        text = re.sub(pattern, rep, text, flags=re.IGNORECASE)
    # clean extra spaces
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def inject_seo_and_nav(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract existing title tag if present
    title_match = re.search(r'<title\s*>(.*?)</title\s*>', content, re.IGNORECASE | re.DOTALL)
    existing_title = title_match.group(1).strip() if title_match else ""

    meta = get_meta_for_file(filepath, existing_title)
    rel_path = clean_file_path(filepath)

    # Calculate relative paths to root for the nav links
    depth = rel_path.count('/')
    rel_prefix = "../" * depth

    # Create SEO Metadata payload
    seo_payload = f"""<!-- ── HYPER-SEO METADATA ── -->
  <meta name="description" content="{meta['description']}">
  <meta name="keywords" content="HDM, Human Development Mathematics, The Alien School, Somatic Pattern Recognition, Dodecahedron, Contemplative Gaming, Resonance Library">
  
  <!-- OpenGraph Social Share -->
  <meta property="og:title" content="{meta['title']}">
  <meta property="og:description" content="{meta['description']}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="{SITE_URL}/{rel_path}">
  <meta property="og:image" content="{OG_IMAGE_URL}">
  
  <!-- Structured Data JSON-LD -->
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "{meta['title']}",
    "description": "{meta['description']}",
    "url": "{SITE_URL}/{rel_path}",
    "provider": {{
      "@type": "Organization",
      "name": "The Alien School for Creative Thinking",
      "url": "{SITE_URL}"
    }}
  }}
  </script>
  <!-- ── END HYPER-SEO METADATA ── -->"""

    # Create Clarity Bridge floating nav footer payload
    nav_payload = f"""<!-- ── CLARITY BRIDGE SYSTEM FOOTER ── -->
  <style>
    .clarity-bridge-nav {{
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 20px;
      padding: 8px 20px;
      background: rgba(14, 14, 14, 0.75);
      border: 1px solid rgba(196, 98, 45, 0.25);
      border-radius: 20px;
      backdrop-filter: blur(8px);
      z-index: 99999;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      opacity: 0.35;
      transition: opacity 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
      pointer-events: auto;
    }}
    .clarity-bridge-nav:hover {{
      opacity: 1;
      border-color: rgba(196, 98, 45, 0.6);
      box-shadow: 0 4px 24px rgba(196, 98, 45, 0.25);
    }}
    .clarity-bridge-nav a {{
      color: #f0ead8;
      text-decoration: none;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      transition: color 0.3s ease;
    }}
    .clarity-bridge-nav a:hover {{
      color: #c4622d;
    }}
    @media (max-width: 600px) {{
      .clarity-bridge-nav {{
        gap: 12px;
        padding: 6px 16px;
        bottom: 12px;
      }}
      .clarity-bridge-nav a {{
        font-size: 8px;
        letter-spacing: 0.1em;
      }}
    }}
  </style>
  <nav class="clarity-bridge-nav" aria-label="Clarity Bridge Navigation">
    <a href="{rel_prefix}index.html">Hub</a>
    <a href="{rel_prefix}resonance-library.html">Library</a>
    <a href="{rel_prefix}explorers/index.html">Lab</a>
    <a href="{rel_prefix}resonance-map.html">Map</a>
  </nav>
  <!-- ── END CLARITY BRIDGE SYSTEM FOOTER ── -->"""

    # Clean existing SEO blocks (if any)
    content = re.sub(r'<!-- ── HYPER-SEO METADATA ── -->.*?<!-- ── END HYPER-SEO METADATA ── -->', '', content, flags=re.DOTALL)
    content = re.sub(r'  <!-- ── HYPER-SEO METADATA ── -->.*?</script>\n', '', content, flags=re.DOTALL) # older version support

    # Inject SEO into <head>
    head_match = re.search(r'<head\s*>', content, re.IGNORECASE)
    if head_match:
        pos = head_match.end()
        content = content[:pos] + "\n  " + seo_payload + content[pos:]
    else:
        print(f":: Error: <head> tag missing in {rel_path}")
        return None

    # Replace existing title if title tag exists
    content = re.sub(r'<title\s*>.*?</title\s*>', f"<title>{meta['title']}</title>", content, flags=re.IGNORECASE)

    # Inject or replace footer before </body>
    content = re.sub(r'<!-- ── CLARITY BRIDGE SYSTEM FOOTER ── -->.*?<!-- ── END CLARITY BRIDGE SYSTEM FOOTER ── -->', '', content, flags=re.DOTALL)
    body_match = re.search(r'</body\s*>', content, re.IGNORECASE)
    if body_match:
        pos = body_match.start()
        content = content[:pos] + "\n  " + nav_payload + "\n" + content[pos:]
    else:
        # Fallback: append at the very end if body tag is missing
        content = content + "\n" + nav_payload

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f":: Injected SEO and Nav into: {rel_path}")
    return meta

def find_all_html_files():
    html_files = []
    # Scan root and explorers directory
    # Skip directories: .git, .claude, node_modules, .venv, Dodeca_insight, Crumble, vault, HDM, Phi to Explore, client
    skip_dirs = {".git", ".claude", "node_modules", ".venv", "Dodeca_insight", "Crumble", "tmp", "patches", "vault", "HDM", "Phi to Explore", "client", "testing"}
    
    for root, dirs, files in os.walk("."):
        # modify dirs in-place to prune directories we want to skip
        dirs[:] = [d for d in dirs if d not in skip_dirs and not d.startswith('.')]
        
        for file in files:
            if file.endswith(".html"):
                # Skip templates or testing files if needed
                filepath = os.path.join(root, file)
                rel_path = clean_file_path(filepath)
                # Skip temporary files
                if "testing" in rel_path or "phi-chamber-template.html" in rel_path or "bloom-inner-game.html" in rel_path:
                    continue
                html_files.append(filepath)
    return html_files

def generate_sitemap(files_meta):
    # XML header
    sitemap_xml = """<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
"""
    for rel_path, meta in files_meta.items():
        sitemap_xml += f"""  <url>
    <loc>{SITE_URL}/{rel_path}</loc>
    <changefreq>weekly</changefreq>
    <priority>{meta['priority']}</priority>
  </url>\n"""

    sitemap_xml += "</urlset>\n"

    with open("sitemap.xml", "w", encoding="utf-8") as f:
        f.write(sitemap_xml)
    print(":: Generated sitemap.xml with all mapped files.")

def generate_robots():
    robots_content = f"""User-agent: *
Allow: /
Sitemap: {SITE_URL}/sitemap.xml
"""
    with open("robots.txt", "w", encoding="utf-8") as f:
        f.write(robots_content)
    print(":: Generated robots.txt.")

if __name__ == '__main__':
    html_files = find_all_html_files()
    print(f"Found {len(html_files)} HTML files for injection.")
    
    files_meta = {}
    for filepath in html_files:
        rel_path = clean_file_path(filepath)
        meta = inject_seo_and_nav(filepath)
        if meta:
            files_meta[rel_path] = meta
            
    # Generate sitemap and robots
    generate_sitemap(files_meta)
    generate_robots()
