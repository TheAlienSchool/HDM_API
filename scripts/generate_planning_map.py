import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch
import matplotlib.patheffects as pe
import numpy as np

# ── Canvas ──────────────────────────────────────────────────────────────────
fig = plt.figure(figsize=(28, 40), facecolor='#F5EFE0')
ax = fig.add_axes([0, 0, 1, 1])
ax.set_xlim(0, 28)
ax.set_ylim(0, 40)
ax.axis('off')
ax.set_facecolor('#F5EFE0')

# ── Palette ──────────────────────────────────────────────────────────────────
TERRACOTTA   = '#8B3A2A'
DARK_BROWN   = '#3B2314'
GOLD         = '#B8860B'
PARCHMENT    = '#F5EFE0'
CREAM_LIGHT  = '#FAF5E8'
MID_BROWN    = '#6B4226'
RUST         = '#A0522D'
SLATE        = '#4A5568'
SAGE         = '#5C7A5C'
INDIGO       = '#3D4A7A'
CHARCOAL     = '#2D2D2D'

# ── Outer border ─────────────────────────────────────────────────────────────
for lw, col in [(4, DARK_BROWN), (1.5, TERRACOTTA)]:
    rect = FancyBboxPatch((0.18, 0.18), 27.64, 39.64,
                          boxstyle="square,pad=0", linewidth=lw,
                          edgecolor=col, facecolor='none')
    ax.add_patch(rect)

# ── Title block ───────────────────────────────────────────────────────────────
ax.text(14, 39.0, 'THE  DODECAHEDRAL  BLOOM', ha='center', va='top',
        fontsize=28, fontweight='bold', color=DARK_BROWN,
        fontfamily='serif', fontstyle='normal')
ax.text(14, 38.35, 'M A S T E R   V I S U A L   P L A N N I N G   M A P', ha='center', va='top',
        fontsize=14, color=TERRACOTTA, fontfamily='serif')
ax.text(14, 37.85, 'A Complete Illustration Programme for the Emerging Book / Manual / Textbook',
        ha='center', va='top', fontsize=10, color=MID_BROWN,
        fontfamily='serif', fontstyle='italic')

# Divider line
ax.plot([1.0, 27.0], [37.45, 37.45], color=TERRACOTTA, lw=1.2)
ax.plot([1.0, 27.0], [37.35, 37.35], color=TERRACOTTA, lw=0.4)

# ── Legend ────────────────────────────────────────────────────────────────────
legend_y = 37.0
ax.text(1.2, legend_y, 'DESIGN REGISTERS:', fontsize=8, color=DARK_BROWN,
        fontfamily='serif', fontweight='bold', va='center')

registers = [
    ('■', TERRACOTTA,  'Editorial Sacred Geometry  (parchment + terracotta)'),
    ('■', CHARCOAL,    'Cinematic Silhouette  (monochrome + depth)'),
    ('■', '#1A1A1A',   'Risograph Collage  (B&W + classical engraving)'),
    ('■', INDIGO,      'Symbol Grid  (geometric icon system)'),
    ('■', SAGE,        'Botanical-Geometric  (organic + structural)'),
]
lx = 5.8
for sym, col, label in registers:
    ax.text(lx, legend_y, sym, fontsize=12, color=col, va='center')
    ax.text(lx + 0.4, legend_y, label, fontsize=7.5, color=DARK_BROWN,
            fontfamily='serif', va='center')
    lx += 4.3

ax.plot([1.0, 27.0], [36.55, 36.55], color=TERRACOTTA, lw=0.6)

# ── CLUSTER definitions ───────────────────────────────────────────────────────
# Each cluster: (title, subtitle, color, x_left, y_top, items)
# Items: (id, title, description, register_color, priority)
# priority: 'HIGH' / 'MED' / 'SUPP'

clusters = [

    # ── CLUSTER A: GEOMETRY OF BEING ─────────────────────────────────────────
    {
        'title': 'A  ·  THE GEOMETRY OF BEING',
        'subtitle': 'Part I of the Book  —  Structural Foundation',
        'color': TERRACOTTA,
        'x': 0.5, 'y': 36.2, 'w': 12.8, 'h': 8.6,
        'items': [
            ('A1', 'The Five Platonic Solids',
             'Side-by-side editorial diagram of all five solids\n'
             'with elemental assignments (Fire/Tetra, Air/Octa,\n'
             'Water/Icosa, Earth/Cube, Ether/Dodeca). Shows why\n'
             'the dodecahedron alone maps to the cosmos.',
             TERRACOTTA, 'HIGH'),
            ('A2', 'Sacred Geometry Cross-Cultural Atlas',
             'Grid of 9 sacred geometry symbols from world\n'
             'traditions (Sri Yantra, Flower of Life, Islamic\n'
             'girih, Celtic knotwork, Andean chakana) showing\n'
             'universal geometric language.',
             TERRACOTTA, 'HIGH'),
            ('A3', 'The Dodecahedral Universe Hypothesis',
             'Cosmological diagram: WMAP data map of the CMB\n'
             'sky alongside a dodecahedron overlay, showing\n'
             'Weeks et al. 2003 hypothesis that the universe\n'
             'is finite and dodecahedral in shape.',
             TERRACOTTA, 'MED'),
            ('A4', 'Phi in Nature — The Living Ratio',
             'Botanical illustration: sunflower seed spiral,\n'
             'nautilus shell cross-section, human hand proportions,\n'
             'DNA double helix — all annotated with phi ratios.\n'
             'Connects golden ratio to organic life.',
             SAGE, 'HIGH'),
            ('A5', 'The Nested Platonic Solids (Kepler)',
             'Reproduction of Kepler\'s Mysterium Cosmographicum\n'
             'nested-solids model, redrawn in editorial style,\n'
             'showing the historical intuition of geometric\n'
             'cosmic order.',
             TERRACOTTA, 'SUPP'),
        ]
    },

    # ── CLUSTER B: ARCHITECTURE OF TIME ──────────────────────────────────────
    {
        'title': 'B  ·  THE ARCHITECTURE OF TIME',
        'subtitle': 'Part II of the Book  —  Temporal Philosophy',
        'color': INDIGO,
        'x': 13.7, 'y': 36.2, 'w': 13.8, 'h': 8.6,
        'items': [
            ('B1', 'The Helical vs. Linear vs. Cyclical Time Models',
             'Three-panel comparative diagram: (1) straight arrow\n'
             '= linear/progress, (2) closed circle = cyclical/\n'
             'eternal return, (3) ascending helix = dodecahedral\n'
             'recursive becoming. The definitive time-model visual.',
             INDIGO, 'HIGH'),
            ('B2', 'The Vedic Yuga Cycle Mapped to the Dodecahedron',
             'Circular diagram showing the four Yugas (Satya,\n'
             'Treta, Dvapara, Kali) as nested cycles within the\n'
             'larger dodecahedral rotation. Cross-cultural\n'
             'temporal resonance.',
             INDIGO, 'MED'),
            ('B3', 'The Kairos Threshold Diagram',
             'A single vertical axis labeled "Collective Readiness."\n'
             'A horizontal threshold line. Below = latent potential.\n'
             'Above = kairotic activation. Shows how kairos is\n'
             'cultivated, not manufactured.',
             INDIGO, 'HIGH'),
            ('B4', 'The Mayan Long Count Nested Cycles',
             'Fractal diagram of Mayan time units (uinal → tun\n'
             '→ katun → baktun) as nested concentric rings,\n'
             'alongside the dodecahedral cycle, showing\n'
             'cross-cultural recursive temporality.',
             INDIGO, 'SUPP'),
            ('B5', 'Whitehead\'s Occasions of Experience',
             'Abstract process diagram: a series of momentary\n'
             'events (circles) that perish and are prehended\n'
             'by the next, forming a wave-pattern of creative\n'
             'advance. Philosophical grounding for recursion.',
             INDIGO, 'SUPP'),
        ]
    },

    # ── CLUSTER C: THE COLLECTIVE ORGANISM ───────────────────────────────────
    {
        'title': 'C  ·  THE COLLECTIVE ORGANISM',
        'subtitle': 'Part III of the Book  —  Biological & Noospheric Grounding',
        'color': SAGE,
        'x': 0.5, 'y': 27.2, 'w': 12.8, 'h': 8.6,
        'items': [
            ('C1', 'The Neuron / Individual Analogy',
             'Split diagram: LEFT = single neuron with dendrites\n'
             'and axon. RIGHT = individual human figure with\n'
             'relational threads. Caption: "As the neuron is\n'
             'to the brain, the individual is to Humanity."',
             CHARCOAL, 'HIGH'),
            ('C2', 'The Noosphere as Earth\'s Thinking Layer',
             'Cross-section of Earth showing geological layers\n'
             '(lithosphere, biosphere) with a luminous outer\n'
             'layer labeled NOOSPHERE — the thinking layer.\n'
             'Teilhard\'s vision made visible.',
             SAGE, 'HIGH'),
            ('C3', 'Gaia — The Self-Regulating Biosphere',
             'Diagram of Earth\'s feedback loops: atmosphere ↔\n'
             'ocean ↔ biosphere ↔ climate, all cycling through\n'
             'a central Gaia node. Shows the superorganism\n'
             'logic at planetary scale.',
             SAGE, 'MED'),
            ('C4', 'Morphic Resonance Field Diagram',
             'Abstract field diagram: a central form (pentagon)\n'
             'radiates concentric field rings outward. Smaller\n'
             'pentagons at distance orient toward the field.\n'
             'Sheldrake\'s morphic resonance visualized.',
             SAGE, 'MED'),
            ('C5', 'The Ant Colony as Superorganism',
             'Detailed editorial illustration of an ant colony\n'
             'cross-section, with individual ants labeled by\n'
             'function (Seed-carrier, Builder, Defender, Queen)\n'
             'mapped to dodecahedral faces.',
             SAGE, 'SUPP'),
        ]
    },

    # ── CLUSTER D: THE TWELVE FACES — DEPTH ──────────────────────────────────
    {
        'title': 'D  ·  THE TWELVE FACES — DEPTH ILLUSTRATIONS',
        'subtitle': 'Part IV of the Book  —  Face-by-Face Visual Grammar',
        'color': RUST,
        'x': 13.7, 'y': 27.2, 'w': 13.8, 'h': 8.6,
        'items': [
            ('D1', 'The Elemental Grammar Grid',
             'A 5-column grid: each column = one element (Ether,\n'
             'Air, Fire, Water, Earth). Each cell shows the\n'
             'associated Platonic solid, archetype, quality,\n'
             'and dodecahedral face(s). Master reference table\n'
             'as visual infographic.',
             RUST, 'HIGH'),
            ('D2', 'The Shadow-Work Face — Confronting Distortion',
             'Cinematic silhouette: a figure standing before\n'
             'a cracked mirror, their reflection showing a\n'
             'distorted form. The crack in the mirror is\n'
             'shaped like a pentagonal fracture line.',
             CHARCOAL, 'HIGH'),
            ('D3', 'The Axial Age Convergence Map',
             'World map (editorial style) showing simultaneous\n'
             'emergence of Confucius (China), Buddha (India),\n'
             'Zoroaster (Persia), Hebrew Prophets (Israel),\n'
             'Socrates (Greece) — all within 800–200 BCE.\n'
             'The Awakening face made geographic.',
             RUST, 'HIGH'),
            ('D4', 'The Harvest & Release Face',
             'Botanical illustration: a mature flower releasing\n'
             'seeds into the wind. The seeds are tiny pentagons.\n'
             'The stem curves back into the earth. Completion\n'
             'as renewal — the most poetic face.',
             SAGE, 'HIGH'),
            ('D5', 'The PMAI Archetype Wheel',
             'Circular diagram of the 12 Pearson-Marr archetypes\n'
             '(Innocent, Orphan, Warrior, Caregiver, Seeker,\n'
             'Lover, Destroyer, Creator, Ruler, Magician, Sage,\n'
             'Jester) mapped onto the 12 dodecahedral faces\n'
             'with elemental color-coding.',
             RUST, 'HIGH'),
            ('D6', 'Individual Face Portrait Series (12 plates)',
             'One small editorial plate per face: a symbolic\n'
             'scene, a key figure, and a one-line caption.\n'
             'E.g., VITALITY = Renaissance workshop scene;\n'
             'INITIATION = Civil Rights march silhouette.',
             CHARCOAL, 'MED'),
        ]
    },

    # ── CLUSTER E: CIVILIZATIONAL THEORY ─────────────────────────────────────
    {
        'title': 'E  ·  CIVILIZATIONAL THEORY & HISTORY',
        'subtitle': 'Part V of the Book  —  Toynbee, Spengler, Gebser, Wilber',
        'color': MID_BROWN,
        'x': 0.5, 'y': 18.2, 'w': 12.8, 'h': 8.6,
        'items': [
            ('E1', 'Spengler\'s Four Seasons of Civilization',
             'Circular diagram divided into four arcs: Spring\n'
             '(creative emergence), Summer (cultural flowering),\n'
             'Autumn (refinement), Winter (decline). Overlaid\n'
             'with the dodecahedral faces to show where each\n'
             'season maps.',
             MID_BROWN, 'HIGH'),
            ('E2', 'Gebser\'s Five Structures of Consciousness',
             'Vertical stack diagram: Archaic → Magical →\n'
             'Mythical → Mental → Integral. Each layer shown\n'
             'as a distinct texture/pattern, with the Integral\n'
             'layer at top shown as transparent (aperspectival).',
             MID_BROWN, 'HIGH'),
            ('E3', 'Toynbee\'s Challenge-and-Response Arc',
             'A challenge (arrow from left) meets a civilization\n'
             '(circle). Three response paths branch: Creative\n'
             'Response (upward arc), Arrested Response (flat\n'
             'line), Collapse (downward arc). Maps to\n'
             'dodecahedral face transitions.',
             MID_BROWN, 'MED'),
            ('E4', 'Wilber\'s Four Quadrants (AQAL)',
             'The classic 2×2 AQAL grid (Interior/Exterior ×\n'
             'Individual/Collective) redrawn in editorial style,\n'
             'with each quadrant labeled with its dodecahedral\n'
             'face correspondences.',
             MID_BROWN, 'MED'),
            ('E5', 'The Civilizational Diagnosis Tool',
             'A radar/spider chart with 12 axes (one per face)\n'
             'for assessing which faces are developed or\n'
             'underdeveloped in a given civilization at a\n'
             'given moment. Practical diagnostic infographic.',
             RUST, 'HIGH'),
        ]
    },

    # ── CLUSTER F: MUSIC OF THE SPHERES & RESONANCE ───────────────────────────
    {
        'title': 'F  ·  MUSIC OF THE SPHERES & COLLECTIVE RESONANCE',
        'subtitle': 'Part V  —  Harmonic Cosmology & Polyphonic Becoming',
        'color': GOLD,
        'x': 13.7, 'y': 18.2, 'w': 13.8, 'h': 8.6,
        'items': [
            ('F1', 'The Pythagorean Harmonic Ratios',
             'A monochord string diagram showing the octave\n'
             '(2:1), fifth (3:2), and fourth (4:3) as geometric\n'
             'divisions of a string, with the same ratios\n'
             'shown in a pentagon\'s diagonal-to-side proportion.\n'
             'Music and geometry unified.',
             GOLD, 'HIGH'),
            ('F2', 'Kepler\'s Harmonices Mundi — Planetary Song',
             'Editorial diagram of the solar system with each\n'
             'planet\'s orbital velocity range shown as a\n'
             'musical staff fragment — the "song" each planet\n'
             'sings. Kepler\'s cosmic polyphony visualized.',
             GOLD, 'HIGH'),
            ('F3', 'Cymatics — Sound Made Visible',
             'A series of 6 Chladni figure patterns (sand\n'
             'patterns formed by vibrating plates at different\n'
             'frequencies), showing how sound creates geometric\n'
             'forms — including pentagonal symmetry.',
             GOLD, 'MED'),
            ('F4', 'The Polyphonic Bloom — 12 Voices in Harmony',
             'Musical score metaphor: 12 horizontal stave lines,\n'
             'each labeled with a dodecahedral face. Notes on\n'
             'each stave show when each face is "sounding."\n'
             'The Bloom = all 12 staves sounding together.',
             GOLD, 'HIGH'),
            ('F5', 'The Collective Resonance Field',
             'Abstract radial diagram: 12 nodes (faces) arranged\n'
             'in a circle, each emitting concentric wave rings.\n'
             'Where rings overlap = resonance zones. Center\n'
             'convergence = the Bloom. Inspired by IMG_2563\n'
             'Narrative Arc radar chart aesthetic.',
             GOLD, 'MED'),
        ]
    },

    # ── CLUSTER G: PRACTICAL DIMENSION ───────────────────────────────────────
    {
        'title': 'G  ·  THE PRACTICAL DIMENSION',
        'subtitle': 'Part V  —  Individual, Communal & Civilizational Practice',
        'color': SLATE,
        'x': 0.5, 'y': 9.2, 'w': 27.0, 'h': 8.6,
        'items': [
            ('G1', 'The Four Levels of Practice',
             'Nested concentric circles: Individual (innermost),\n'
             'Communal, Institutional, Civilizational (outermost).\n'
             'Each ring labeled with specific practices for\n'
             'seizing the kairos moment at that scale.',
             SLATE, 'HIGH'),
            ('G2', 'The PMAI Self-Assessment Compass',
             'A compass rose with 12 directions (one per\n'
             'archetype/face). User plots their dominant and\n'
             'underdeveloped archetypes. A practical tool for\n'
             'individual entry into the framework.',
             SLATE, 'HIGH'),
            ('G3', 'The Dodecahedral Diagnosis Radar',
             'A 12-axis spider/radar chart for community or\n'
             'organizational assessment. Each axis = one face.\n'
             'Plot current development level. Identify gaps.\n'
             'Inspired by IMG_2563 Narrative Arc chart.',
             RUST, 'HIGH'),
            ('G4', 'The Aetheric Daily Practice Map',
             'A circular day-wheel (24 hours) with practices\n'
             'for harnessing dodecahedral aether: dawn\n'
             'contemplation, midday resonance, dusk integration,\n'
             'dream seeding. Connects cosmic framework to\n'
             'daily embodiment.',
             SAGE, 'HIGH'),
            ('G5', 'Theory U — The U-Process Diagram',
             'Scharmer\'s Theory U curve (Downloading → Seeing\n'
             '→ Sensing → Presencing → Crystallizing → Prototyping\n'
             '→ Performing) redrawn in editorial style, with\n'
             'dodecahedral face correspondences at each stage.',
             SLATE, 'MED'),
            ('G6', 'The Multigenerational Consciousness Timeline',
             'A 500-year horizontal timeline showing how\n'
             'individual lifespans (short arcs) nest within\n'
             'generational cycles (medium arcs) nest within\n'
             'dodecahedral epochs (long arcs). Deep time\n'
             'made tangible.',
             INDIGO, 'HIGH'),
            ('G7', 'The Individual-in-the-Collective Diagram',
             'A single figure (silhouette) standing inside\n'
             'a large transparent dodecahedron. The figure\n'
             'touches one face from inside. Caption: "You\n'
             'are always already inside the whole — the\n'
             'question is which face you are illuminating."',
             CHARCOAL, 'HIGH'),
        ]
    },
]

# ── Draw clusters ─────────────────────────────────────────────────────────────
priority_colors = {'HIGH': '#8B3A2A', 'MED': '#6B4226', 'SUPP': '#9B8B7A'}
priority_labels = {'HIGH': '● PRIORITY', 'MED': '◉ SECONDARY', 'SUPP': '○ SUPPLEMENTAL'}

for cl in clusters:
    cx, cy, cw, ch = cl['x'], cl['y'] - cl['h'], cl['w'], cl['h']

    # Cluster background
    bg = FancyBboxPatch((cx, cy), cw, ch,
                        boxstyle="square,pad=0",
                        linewidth=1.8, edgecolor=cl['color'],
                        facecolor=CREAM_LIGHT, alpha=0.85, zorder=1)
    ax.add_patch(bg)

    # Cluster header bar
    hbar = FancyBboxPatch((cx, cy + ch - 0.72), cw, 0.72,
                          boxstyle="square,pad=0",
                          linewidth=0, edgecolor='none',
                          facecolor=cl['color'], alpha=0.15, zorder=2)
    ax.add_patch(hbar)

    ax.text(cx + 0.25, cy + ch - 0.22, cl['title'],
            fontsize=9.5, fontweight='bold', color=cl['color'],
            fontfamily='serif', va='center', zorder=3)
    ax.text(cx + 0.25, cy + ch - 0.55, cl['subtitle'],
            fontsize=7.5, color=MID_BROWN, fontfamily='serif',
            fontstyle='italic', va='center', zorder=3)

    # Items
    items = cl['items']
    n = len(items)
    cols = 2 if cw > 13 else 1
    # For wide clusters (G), use more columns
    if cw > 20:
        cols = 3

    item_w = cw / cols
    item_h = (ch - 0.8) / (n // cols + (1 if n % cols else 0)) if cols > 1 else (ch - 0.8) / n

    for i, (iid, ititle, idesc, ireg, iprio) in enumerate(items):
        col_idx = i % cols
        row_idx = i // cols
        ix = cx + col_idx * item_w + 0.18
        iy = cy + ch - 0.82 - row_idx * item_h - 0.12

        # Item box
        ibox = FancyBboxPatch((ix - 0.1, iy - item_h + 0.12), item_w - 0.22, item_h - 0.14,
                              boxstyle="square,pad=0",
                              linewidth=0.8, edgecolor=ireg,
                              facecolor=PARCHMENT, alpha=0.6, zorder=3)
        ax.add_patch(ibox)

        # Priority badge
        pcol = priority_colors.get(iprio, MID_BROWN)
        ax.text(ix + item_w - 0.42, iy - 0.08,
                priority_labels.get(iprio, ''),
                fontsize=5.5, color=pcol, fontfamily='serif',
                fontstyle='italic', va='top', ha='right', zorder=5)

        # Item ID + Title
        ax.text(ix + 0.05, iy - 0.08, f'{iid}  ·  {ititle}',
                fontsize=8, fontweight='bold', color=DARK_BROWN,
                fontfamily='serif', va='top', zorder=5)

        # Description
        ax.text(ix + 0.05, iy - 0.32, idesc,
                fontsize=6.5, color=MID_BROWN, fontfamily='serif',
                va='top', wrap=True, zorder=5,
                linespacing=1.35)

# ── Already-created callout ───────────────────────────────────────────────────
ax.plot([0.5, 27.5], [8.85, 8.85], color=TERRACOTTA, lw=1.0)
ax.plot([0.5, 27.5], [8.75, 8.75], color=TERRACOTTA, lw=0.4)

ax.text(14, 8.55, 'A L R E A D Y   C R E A T E D   ·   T H E   F I R S T   S E V E N   V I S U A L S',
        ha='center', fontsize=9, fontweight='bold', color=TERRACOTTA,
        fontfamily='serif')

created = [
    ('V1', 'The Dodecahedron\nas Cosmic Clock', TERRACOTTA),
    ('V2', 'The Twelve Faces\nof Humanity', TERRACOTTA),
    ('V3', 'Chronos vs.\nKairos', INDIGO),
    ('V4', 'Humanity as\nSuperorganism', CHARCOAL),
    ('V5', 'The Blooming\nEpoch Spiral', SAGE),
    ('V6', 'The Mathematics\nof Living Harmony', TERRACOTTA),
    ('V7', 'The Dodecahedral\nBloom Poster', CHARCOAL),
]

box_w = 3.5
box_h = 1.6
start_x = 0.65
for j, (vid, vtitle, vcol) in enumerate(created):
    bx = start_x + j * (box_w + 0.28)
    by = 6.9
    vbox = FancyBboxPatch((bx, by), box_w, box_h,
                          boxstyle="square,pad=0",
                          linewidth=1.5, edgecolor=vcol,
                          facecolor=CREAM_LIGHT, zorder=3)
    ax.add_patch(vbox)
    ax.text(bx + box_w/2, by + box_h - 0.22, vid,
            ha='center', fontsize=9, fontweight='bold',
            color=vcol, fontfamily='serif', zorder=4)
    ax.text(bx + box_w/2, by + box_h/2 - 0.1, vtitle,
            ha='center', fontsize=7, color=DARK_BROWN,
            fontfamily='serif', va='center', zorder=4)
    # Checkmark
    ax.text(bx + box_w - 0.22, by + 0.18, '✓',
            fontsize=10, color=SAGE, fontfamily='serif', zorder=4)

# ── Summary stats ─────────────────────────────────────────────────────────────
ax.plot([0.5, 27.5], [6.65, 6.65], color=TERRACOTTA, lw=0.6)

stats = [
    ('7', 'Visuals\nCompleted'),
    ('29', 'Additional Concepts\nIdentified'),
    ('7', 'Thematic\nClusters'),
    ('4', 'Design\nRegisters'),
    ('36', 'Total Visual\nProgramme'),
]
sx = 1.8
for val, label in stats:
    ax.text(sx, 6.05, val, ha='center', fontsize=22, fontweight='bold',
            color=TERRACOTTA, fontfamily='serif')
    ax.text(sx, 5.45, label, ha='center', fontsize=7.5, color=MID_BROWN,
            fontfamily='serif', va='top')
    sx += 5.2

# ── Priority key ──────────────────────────────────────────────────────────────
ax.plot([0.5, 27.5], [4.85, 4.85], color=TERRACOTTA, lw=0.6)
ax.text(14, 4.55, 'P R I O R I T Y   K E Y', ha='center', fontsize=8,
        fontweight='bold', color=DARK_BROWN, fontfamily='serif')

pk_items = [
    ('● PRIORITY', TERRACOTTA, 'Highest impact — essential for the book\'s core argument. Generate first.'),
    ('◉ SECONDARY', MID_BROWN, 'Strong supporting visuals — deepen specific dimensions. Generate in second pass.'),
    ('○ SUPPLEMENTAL', '#9B8B7A', 'Reference and archival illustrations — valuable for comprehensive editions.'),
]
pk_x = 1.5
for pk_sym, pk_col, pk_desc in pk_items:
    ax.text(pk_x, 4.05, pk_sym, fontsize=9, color=pk_col, fontfamily='serif', va='top')
    ax.text(pk_x + 1.1, 4.05, pk_desc, fontsize=7.5, color=MID_BROWN,
            fontfamily='serif', va='top')
    pk_x += 8.8

# ── Footer ────────────────────────────────────────────────────────────────────
ax.plot([0.5, 27.5], [3.3, 3.3], color=TERRACOTTA, lw=1.0)
ax.plot([0.5, 27.5], [3.2, 3.2], color=TERRACOTTA, lw=0.4)

ax.text(14, 2.85,
        '"Consider how much time we get to Bloom. It can only be counted in dodecahedrons."',
        ha='center', fontsize=10, color=DARK_BROWN, fontfamily='serif',
        fontstyle='italic')
ax.text(14, 2.45, '— KzA', ha='center', fontsize=9, color=TERRACOTTA,
        fontfamily='serif')

ax.text(14, 1.85,
        'This planning map identifies 29 additional illustration concepts across 7 thematic clusters,\n'
        'organized by the book\'s five-part structure and prioritized for production sequence.',
        ha='center', fontsize=8, color=MID_BROWN, fontfamily='serif',
        fontstyle='italic', va='top', linespacing=1.5)

ax.text(1.0, 0.55, 'THE DODECAHEDRAL BLOOM  ·  MASTER VISUAL PROGRAMME  ·  WIDE RESEARCH SYNTHESIS  ',  
        fontsize=7, color=MID_BROWN, fontfamily='serif', va='bottom')
ax.text(27.0, 0.55, 'KzA  ·  2026', fontsize=7, color=MID_BROWN,
        fontfamily='serif', va='bottom', ha='right')

plt.savefig('/home/ubuntu/visuals/visual_planning_map.png',
            dpi=150, bbox_inches='tight',
            facecolor='#F5EFE0', edgecolor='none')
print("Planning map saved.")
