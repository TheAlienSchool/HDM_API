/**
 * Electric Mimos Martian Stone Fruit Crumble — HIA Exercise Æssay
 * Design: Thermal Cartography — scientific field notebook meets alchemical manuscript
 * Palette: Obsidian bg, copper oxide accents, aged parchment text
 * Layout: Asymmetric two-column — narrow left timestamp rail, wide right content field
 */

import { useState, useCallback, useEffect, useRef } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Ingredient {
  name: string;
  note: string;
  base: number;
  unit: "medium" | "cup" | "tbsp" | "tsp" | "pinch";
  emoji?: string;
}

interface IngredientGroup {
  label: string;
  tag: string;
  items: Ingredient[];
}

interface ProtocolStep {
  time: string;
  title: string;
  body: string;
  highlight?: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const BASE_SERVINGS = 6;

const ingredientGroups: IngredientGroup[] = [
  {
    label: "The Foundation",
    tag: "The Complex Matrix",
    items: [
      {
        name: "Apples, peeled and chopped",
        note: "Structural memory :: Granny Smith or Honeycrisp hold well",
        base: 4,
        unit: "medium",
      },
      {
        name: "Plums, pitted and chopped",
        note: "Chaotic dissolution :: adds tart, jammy matrix",
        base: 3,
        unit: "medium",
      },
      {
        name: "Brown sugar",
        note: "Molasses depth · for the fruit",
        base: 0.25,
        unit: "cup",
      },
      {
        name: "Krusteaz Buttermilk Pancake Mix",
        note: "The Catalyst Binder :: leavening creates aerated, pudding-like body",
        base: 3,
        unit: "tbsp",
      },
      {
        name: "Cinnamon",
        note: "The Ancient Luxury :: Bringer of ancestral warmth, comfort, abundance, and protection to life's compost.",
        base: 4,
        unit: "tbsp",
      },
      {
        name: "Ground cayenne red pepper",
        note: "The Awakening Tension — slow heat that activates the palate",
        base: 0.5,
        unit: "tsp",
      },
      {
        name: "Salt",
        note: "The grounding coordinate — makes the sugar legible",
        base: 0.25,
        unit: "tsp",
      },
    ],
  },
  {
    label: "The Surface Tension",
    tag: "The Shattering Topping",
    items: [
      {
        name: "All-purpose flour",
        note: "Structural scaffold",
        base: 0.75,
        unit: "cup",
      },
      {
        name: "Nature's Path Organic Pumpkin Seed + Flax Granola",
        note: "Shattering crunch + earthy binding — the supreme crumble agent",
        base: 0.75,
        unit: "cup",
      },
      {
        name: "Cinnamon",
        note: "The Crumble's Co-Conspirator :: Cinnamon's enduring power as an archetype lies in its ability to fill a space (physically and energetically) with a small amount of substance, mirroring the idea of abundance spreading from a small seed of intention.",
        base: 1,
        unit: "tbsp",
      },
      {
        name: "Brown sugar",
        note: "For the topping",
        base: 0.33,
        unit: "cup",
      },
      {
        name: "Ground nutmeg",
        note: "The Bridge — connects cayenne to butter",
        base: 0.5,
        unit: "tsp",
      },
      {
        name: "Cold unsalted butter, cubed",
        note: "Must be cold :: fat pockets create the supreme crumble to inspire the creation of fat pockets 💰",
        base: 8,
        unit: "tbsp",
      },
      {
        name: "Salt",
        note: "For the topping",
        base: 0.125,
        unit: "tsp",
      },
    ],
  },
  {
    label: "The Post-Bake Intervention",
    tag: "The Clarification",
    items: [
      {
        name: "Fresh lemon juice",
        note: "Applied after cooling — a living top note",
        base: 1,
        unit: "tbsp",
      },
      {
        name: "Fresh fruit (berries, sliced stone fruit)",
        note: "Applied after cooling — raw element over the thermally altered base",
        base: 0.5,
        unit: "cup",
      },
    ],
  },
];

const protocolSteps: ProtocolStep[] = [
  {
    time: "00:00",
    title: "The Initiation",
    body: "Preheat your oven to 375°F (190°C). This is the environmental baseline — you are establishing the thermal condition for the transition.",
  },
  {
    time: "00:02",
    title: "The Geometry of the Fruit",
    body: "Chop the apples and plums. Irregularity ensures varied texture in the final bloom. Toss in a bowl with the brown sugar, pancake mix binder, cinnamon, cayenne, and salt. Mix until the fruit is entirely coated in its new potential. The cinnamon enters the fruit layer here as ambient warmth — it will diffuse through the entire matrix during the bake. The cayenne is present but quiet. It will speak later. Pour into a baking dish (approximately 9×9 or equivalent).",
  },
  {
    time: "00:12",
    title: "Constructing the Surface Tension",
    body: "In a separate bowl, combine the flour, granola, brown sugar, cinnamon, salt, and nutmeg. Notice the order: the cinnamon goes in with the dry ingredients before the butter arrives. This is intentional. The fat will carry the spice into every pocket of the topping. Cut the cold butter into small cubes. Use your hands — rub the butter into the dry ingredients until the mixture resembles coarse, wet sand with some larger, distinct clumps. You will smell the cinnamon activate as the butter warms slightly from your hands. That is the signal.",
    highlight:
      "Cold pockets of fat are the source of the supreme crumble. The moment it holds together when squeezed, stop. Your hands are the instrument. The warmth is the catalyst.",
  },
  {
    time: "00:20",
    title: "The Convergence",
    body: "Scatter the crumble architecture evenly over the fruit foundation. Do not press it down. Let it rest lightly on the surface — it will fuse during the bake.",
  },
  {
    time: "00:22",
    title: "The Phase Transition Begins",
    body: "Place the dish in the oven. Set a timer for 45 minutes.",
  },
  {
    time: "00:24",
    title: "The Structural Pause · The 24-Minute Reset",
    body: "Step away from the kitchen. Do not monitor the oven — trust the thermal process. The fruit is breaking down; the butter is melting and frying the flour into a crisp matrix. Both you and the crumble are undergoing a necessary dissolution to emerge renewed.",
    highlight: "The shower is not a break. It is parallel processing.",
  },
  {
    time: "00:48",
    title: "The Return and the Assessment",
    body: "The granola sugars will brown the topping faster than standard oats. Check at the 35-minute mark. If the surface is deeply golden but the fruit is not yet bubbling at the edges, lay foil loosely over the top and let the fruit finish.",
  },
  {
    time: "01:07",
    title: "The Extraction",
    body: "The bake is complete only when the plum-apple matrix is actively bubbling up the sides of the dish. Remove from the oven.",
  },
  {
    time: "01:08",
    title: "The Cooling Protocol",
    body: "Allow 15 minutes of cooling. The fruit pectin must set and the crumble must harden into its final, supreme texture. This is the discipline of the wait.",
    highlight: "The structure is setting. Let it bloom.",
  },
  {
    time: "01:23",
    title: "The Inhabitation",
    body: "The 83 minutes have elapsed. Apply the fresh lemon juice and fresh fruit to the top. Serve. Take one bite and hold it. Notice the sequence: first the cinnamon arrives — ambient, filling the palate the way it filled the kitchen. Then the fruit. Then the crumble geometry. Then, after the swallow, the cayenne appears. It was always there. It waited. This is the thermal gradient completing its arc. You have just experienced the Architecture of Resonance.",
    highlight: "The spice does not announce itself. It arrives in sequence. Pay attention to when.",
  },
];

// ─── Quantity Formatting ─────────────────────────────────────────────────────

const FRACTIONS: Record<number, string> = {
  0.125: "⅛",
  0.25: "¼",
  0.33: "⅓",
  0.5: "½",
  0.67: "⅔",
  0.75: "¾",
};

function roundTo(val: number, step: number) {
  return Math.round(val / step) * step;
}

function formatQty(val: number, unit: Ingredient["unit"]): string {
  if (val <= 0) return "—";

  if (unit === "medium" || unit === "pinch") {
    const n = Math.max(1, Math.round(val));
    return `${n} ${unit}`;
  }

  if (unit === "cup") {
    const r = roundTo(val, 0.125);
    const whole = Math.floor(r);
    const frac = roundTo(r - whole, 0.125);
    let s = whole > 0 ? String(whole) : "";
    if (frac > 0) s += FRACTIONS[frac] ?? frac.toFixed(2);
    if (!s) s = "0";
    return `${s} cup${r >= 2 ? "s" : ""}`;
  }

  if (unit === "tbsp") {
    const r = roundTo(val, 0.25);
    if (r >= 16) return formatQty(r / 16, "cup");
    if (r >= 4) {
      const cups = r / 16;
      return formatQty(cups, "cup");
    }
    const whole = Math.floor(r);
    const frac = roundTo(r - whole, 0.25);
    let s = whole > 0 ? String(whole) : "";
    if (frac > 0) s += FRACTIONS[frac] ?? frac.toFixed(2);
    if (!s) s = "0";
    return `${s} tbsp`;
  }

  if (unit === "tsp") {
    const r = roundTo(val, 0.125);
    if (r >= 3) return formatQty(r / 3, "tbsp");
    const whole = Math.floor(r);
    const frac = roundTo(r - whole, 0.125);
    let s = whole > 0 ? String(whole) : "";
    if (frac > 0) s += FRACTIONS[frac] ?? frac.toFixed(2);
    if (!s) s = "0";
    return `${s} tsp`;
  }

  return `${val.toFixed(1)} ${unit}`;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function ServingControl({
  servings,
  onChange,
}: {
  servings: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex items-center gap-5 py-7 border-b border-[var(--divider)]">
      <span className="eyebrow whitespace-nowrap">Adjust Servings</span>
      <div className="flex items-center border border-[var(--divider)]">
        <button
          aria-label="Decrease servings"
          onClick={() => onChange(Math.max(1, servings - 1))}
          className="w-11 h-11 flex items-center justify-center text-[var(--copper)] text-xl font-light hover:bg-[var(--surface)] transition-colors"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          −
        </button>
        <div
          className="w-14 h-11 flex items-center justify-center border-x border-[var(--divider)]"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "20px",
            color: "var(--parchment)",
          }}
        >
          {servings}
        </div>
        <button
          aria-label="Increase servings"
          onClick={() => onChange(Math.min(24, servings + 1))}
          className="w-11 h-11 flex items-center justify-center text-[var(--copper)] text-xl font-light hover:bg-[var(--surface)] transition-colors"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          +
        </button>
      </div>
      <span
        className="text-xs italic"
        style={{ color: "var(--parchment-dim)" }}
      >
        {servings === BASE_SERVINGS
          ? "Base recipe · 6 servings"
          : servings < BASE_SERVINGS
            ? "Scaled down from base"
            : "Scaled up from base"}
      </span>
    </div>
  );
}

function IngredientRow({
  item,
  ratio,
}: {
  item: Ingredient;
  ratio: number;
}) {
  const scaled = item.base * ratio;
  const display = formatQty(scaled, item.unit);

  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-[var(--divider)] last:border-b-0">
      <div className="flex-1 min-w-0">
        <div
          className="text-sm leading-snug"
          style={{ color: "var(--parchment)" }}
        >
          {item.name}
        </div>
        <div
          className="text-xs italic mt-0.5 leading-snug"
          style={{ color: "var(--parchment-dim)" }}
        >
          {item.note}
        </div>
      </div>
      <div
        className="qty-value shrink-0 text-right pt-0.5"
        style={{ minWidth: "90px" }}
      >
        {display}
      </div>
    </div>
  );
}

function IngredientGroupBlock({
  group,
  ratio,
}: {
  group: IngredientGroup;
  ratio: number;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-baseline gap-3 mb-3">
        <span
          className="text-xs font-medium tracking-widest uppercase"
          style={{ color: "var(--copper-dim)" }}
        >
          {group.label}
        </span>
        <span
          className="text-xs italic"
          style={{ color: "var(--parchment-dim)" }}
        >
          · {group.tag}
        </span>
      </div>
      <div className="border-t border-[var(--divider)]">
        {group.items.map((item, i) => (
          <IngredientRow key={i} item={item} ratio={ratio} />
        ))}
      </div>
    </div>
  );
}

function ProtocolStepBlock({ step }: { step: ProtocolStep }) {
  return (
    <div className="flex gap-6 py-5 border-b border-[var(--divider)] last:border-b-0">
      {/* Left rail: timestamp */}
      <div className="timestamp shrink-0 pt-0.5" style={{ minWidth: "52px" }}>
        {step.time}
      </div>
      {/* Right field: content */}
      <div className="flex-1 min-w-0">
        <div
          className="mb-1.5 leading-snug"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "15px",
            color: "var(--parchment)",
          }}
        >
          {step.title}
        </div>
        <div
          className="text-sm leading-relaxed"
          style={{ color: "var(--parchment-dim)" }}
        >
          {step.body}
        </div>
        {step.highlight && (
          <div
            className="mt-3 pl-4 py-3 text-xs italic leading-relaxed border-l-2"
            style={{
              borderColor: "var(--copper)",
              color: "var(--parchment-dim)",
              background: "var(--surface)",
            }}
          >
            {step.highlight}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Vertex Watermark ──────────────────────────────────────────────────────

// A faint dodecahedral wireframe — 12 vertices projected onto a 2D plane
// using a standard icosahedral-dodecahedron projection. Copper at 6% opacity.
function VertexWatermark() {
  // Dodecahedron: 20 vertices, projected to 2D using a simple orthographic
  // rotation. We use the golden ratio phi = (1+sqrt(5))/2 for vertex coords.
  const phi = (1 + Math.sqrt(5)) / 2;
  const scale = 90;
  const cx = 160;
  const cy = 160;

  // 20 vertices of a regular dodecahedron (unit sphere)
  const rawVerts: [number, number, number][] = [
    [1, 1, 1], [1, 1, -1], [1, -1, 1], [1, -1, -1],
    [-1, 1, 1], [-1, 1, -1], [-1, -1, 1], [-1, -1, -1],
    [0, 1/phi, phi], [0, 1/phi, -phi], [0, -1/phi, phi], [0, -1/phi, -phi],
    [1/phi, phi, 0], [1/phi, -phi, 0], [-1/phi, phi, 0], [-1/phi, -phi, 0],
    [phi, 0, 1/phi], [phi, 0, -1/phi], [-phi, 0, 1/phi], [-phi, 0, -1/phi],
  ];

  // Gentle rotation: 18deg around Y, 12deg around X
  const ry = 18 * Math.PI / 180;
  const rx = 12 * Math.PI / 180;
  const project = ([x, y, z]: [number, number, number]): [number, number] => {
    // Rotate Y
    const x1 = x * Math.cos(ry) + z * Math.sin(ry);
    const z1 = -x * Math.sin(ry) + z * Math.cos(ry);
    // Rotate X
    const y2 = y * Math.cos(rx) - z1 * Math.sin(rx);
    return [cx + x1 * scale, cy + y2 * scale];
  };

  const verts2d = rawVerts.map(project);

  // Edges: pairs of vertex indices that share a dodecahedron edge (distance = 2/phi)
  const edgeThreshold = (2 / phi) * 1.01;
  const edges: [number, number][] = [];
  for (let i = 0; i < rawVerts.length; i++) {
    for (let j = i + 1; j < rawVerts.length; j++) {
      const [ax, ay, az] = rawVerts[i];
      const [bx, by, bz] = rawVerts[j];
      const d = Math.sqrt((ax-bx)**2 + (ay-by)**2 + (az-bz)**2);
      if (d < edgeThreshold) edges.push([i, j]);
    }
  }

  return (
    <svg
      width="320"
      height="320"
      viewBox="0 0 320 320"
      aria-hidden="true"
      style={{
        position: "absolute",
        right: "-40px",
        top: "-20px",
        opacity: 0.055,
        pointerEvents: "none",
        overflow: "visible",
        animation: "vertex-spin 90s linear infinite",
        transformOrigin: "160px 160px",
      }}
    >
      {edges.map(([i, j], k) => (
        <line
          key={k}
          x1={verts2d[i][0]}
          y1={verts2d[i][1]}
          x2={verts2d[j][0]}
          y2={verts2d[j][1]}
          stroke="#C87941"
          strokeWidth="0.8"
        />
      ))}
      {verts2d.map(([x, y], k) => (
        <circle key={k} cx={x} cy={y} r="2" fill="#C87941" />
      ))}
    </svg>
  );
}

// ─── Sona Canvas ──────────────────────────────────────────────────────────────

// Scroll-traced resonance map. As the user scrolls this element into view,
// a path traces from Cinnamon through the five nodes to Cayenne.
const SONA_NODES = [
  { label: "Cinnamon", sub: "ambient field", pos: "arrival", accent: true },
  { label: "Fruit", sub: "tart dissolution", pos: "body", accent: false },
  { label: "Crumble", sub: "structural crunch", pos: "body", accent: false },
  { label: "Nutmeg", sub: "bridge note", pos: "mid-tail", accent: false },
  { label: "Cayenne", sub: "slow heat", pos: "tail", accent: true },
];

function SonaCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate progress from 0 to 1 over 1200ms
          const start = performance.now();
          const duration = 1200;
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - t, 3);
            setProgress(eased);
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const n = SONA_NODES.length;
  const svgW = 560;
  const svgH = 120;
  const padX = 56;
  const nodeY = svgH / 2;
  const spacing = (svgW - padX * 2) / (n - 1);

  // Node x positions
  const nodeXs = SONA_NODES.map((_, i) => padX + i * spacing);

  // The trace line progress: total path length = (n-1) segments
  const totalSegments = n - 1;
  const traceEnd = progress * totalSegments; // 0..4

  return (
    <div ref={containerRef} className="mt-6">
      <div className="eyebrow mb-3" style={{ color: "var(--copper-dim)" }}>
        Sona Canvas · Resonance Trace
      </div>
      <div style={{ overflowX: "auto" }}>
        <svg
          width={svgW}
          height={svgH}
          viewBox={`0 0 ${svgW} ${svgH}`}
          style={{ display: "block", maxWidth: "100%" }}
          aria-label="Spice resonance map tracing from Cinnamon to Cayenne"
        >
          {/* Background track */}
          <line
            x1={nodeXs[0]} y1={nodeY}
            x2={nodeXs[n-1]} y2={nodeY}
            stroke="var(--divider)"
            strokeWidth="1"
          />

          {/* Animated trace */}
          {Array.from({ length: n - 1 }).map((_, i) => {
            const segProgress = Math.min(Math.max(traceEnd - i, 0), 1);
            if (segProgress <= 0) return null;
            const x1 = nodeXs[i];
            const x2 = nodeXs[i] + (nodeXs[i + 1] - nodeXs[i]) * segProgress;
            return (
              <line
                key={i}
                x1={x1} y1={nodeY}
                x2={x2} y2={nodeY}
                stroke="var(--copper)"
                strokeWidth="1.5"
                opacity="0.7"
              />
            );
          })}

          {/* Nodes */}
          {SONA_NODES.map((node, i) => {
            const x = nodeXs[i];
            const revealed = progress * totalSegments >= i - 0.1;
            const nodeOpacity = revealed ? 1 : 0.2;
            return (
              <g key={i} opacity={nodeOpacity} style={{ transition: "opacity 0.3s" }}>
                {/* Outer ring for accent nodes */}
                {node.accent && (
                  <circle cx={x} cy={nodeY} r="10" fill="none" stroke="var(--copper)" strokeWidth="0.6" opacity="0.4" />
                )}
                {/* Node dot */}
                <circle
                  cx={x} cy={nodeY} r={node.accent ? 5 : 3.5}
                  fill={node.accent ? "var(--copper)" : "var(--divider)"}
                  stroke={node.accent ? "none" : "var(--copper-dim)"}
                  strokeWidth="0.5"
                />
                {/* Label above */}
                <text
                  x={x} y={nodeY - 18}
                  textAnchor="middle"
                  fontSize="10"
                  fontFamily="'Space Grotesk', sans-serif"
                  fontWeight={node.accent ? "600" : "400"}
                  fill={node.accent ? "var(--copper)" : "var(--parchment)"}
                >
                  {node.label}
                </text>
                {/* Sub below */}
                <text
                  x={x} y={nodeY + 20}
                  textAnchor="middle"
                  fontSize="8"
                  fontFamily="'Space Grotesk', sans-serif"
                  fill="var(--parchment-dim)"
                  fontStyle="italic"
                >
                  {node.sub}
                </text>
                {/* Position tag */}
                <text
                  x={x} y={nodeY + 32}
                  textAnchor="middle"
                  fontSize="7"
                  fontFamily="'Space Grotesk', sans-serif"
                  fill="var(--copper-dim)"
                  letterSpacing="1"
                >
                  {node.pos.toUpperCase()}
                </text>
              </g>
            );
          })}

          {/* Arrow at trace end */}
          {progress > 0.05 && (() => {
            const segIdx = Math.min(Math.floor(traceEnd), n - 2);
            const segProg = Math.min(Math.max(traceEnd - segIdx, 0), 1);
            const arrowX = nodeXs[segIdx] + (nodeXs[segIdx + 1] - nodeXs[segIdx]) * segProg;
            return (
              <polygon
                points={`${arrowX},${nodeY - 4} ${arrowX + 7},${nodeY} ${arrowX},${nodeY + 4}`}
                fill="var(--copper)"
                opacity="0.7"
              />
            );
          })()}
        </svg>
      </div>
      <div
        className="text-center mt-1 text-xs italic"
        style={{ color: "var(--parchment-dim)", fontSize: "10px" }}
      >
        ← first contact · · · · · · · · · · · · · · · · · · · · · · · after the swallow →
      </div>
    </div>
  );
}

// ─── Spice Note ──────────────────────────────────────────────────────────────

function SpiceNote() {
  return (
    <div
      className="my-10 px-6 py-7 border border-[var(--copper-dim)]"
      style={{ background: "var(--surface)" }}
    >
      <div className="eyebrow mb-4" style={{ color: "var(--copper)" }}>
        Field Note · The Thermal Gradient
      </div>
      <h3
        className="mb-5 leading-snug"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "17px",
          fontWeight: 400,
          color: "var(--parchment)",
        }}
      >
        The Cinnamon–Cayenne Axis: An Architecture of Resonance
      </h3>

      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--parchment-dim)" }}>
        Two spices. Two entirely different relationships with time.
      </p>

      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--parchment-dim)" }}>
        <strong style={{ color: "var(--parchment)", fontWeight: 500 }}>Cinnamon</strong> is an ambient spice. It fills the room before you taste it. It is already present in the air when you open the oven. On the palate, it arrives first and stays — a warm, diffuse field that does not compete with the fruit but holds the space the fruit inhabits. Cinnamon does not announce a boundary. It establishes a territory.
      </p>

      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--parchment-dim)" }}>
        <strong style={{ color: "var(--parchment)", fontWeight: 500 }}>Cayenne</strong> is a delayed spice. It is silent during the first half of the bite. It arrives after the swallow — a slow, localized heat that builds at the back of the throat and the edges of the tongue. It does not compete with cinnamon. It completes it. The warmth you feel ten seconds after eating is cayenne doing its work.
      </p>

      <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--parchment-dim)" }}>
        Together, they form a gradient: cinnamon occupies the front of the experience, cayenne occupies the tail. The fruit and crumble live in the middle. This is the Architecture of Resonance — layered frequencies, each arriving at its own time, each necessary for the full structure to be felt.
      </p>

      <div className="border-t border-[var(--divider)] pt-5 mt-5">
        <SonaCanvas />
      </div>
    </div>
  );
}

// ─── Resonance Observation Block ─────────────────────────────────────────────

function ResonanceObservation() {
  return (
    <section className="py-10 border-b border-[var(--divider)]">
      <div className="eyebrow mb-2" style={{ color: "var(--copper)" }}>
        The Architecture of Resonance · An Observation Practice
      </div>
      <h2
        className="mb-6"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "22px",
          fontWeight: 400,
          color: "var(--parchment)",
        }}
      >
        How to Inhabit This Recipe
      </h2>

      <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--parchment-dim)" }}>
        This is a recipe you can read three times and get three different things from it. The first reading gives you the instructions. The second reading gives you the reasoning. The third reading gives you the mathematics.
      </p>

      <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--parchment-dim)" }}>
        The practice is simple. While you cook, pay attention to one thing at a time. When you are chopping the fruit, you are only chopping the fruit. When you are rubbing the butter into the flour, you are only rubbing the butter into the flour. The moment your hands feel the mixture change — from dry and separate to cohesive and slightly damp — that is the signal. Stop there. The signal is not a thought about the signal. It is the signal itself.
      </p>

      <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--parchment-dim)" }}>
        This is what Bhante Gunaratana means by bare attention. You are not analyzing the crumble. You are not thinking about whether it is good enough. You are noticing what is actually happening — in your hands, in the bowl, in the room. The cinnamon smell that arrives before you expect it. The way the butter disappears into the flour. The exact moment the mixture holds together. These are not metaphors. They are data points. They are the recipe teaching you how to pay attention.
      </p>

      <div className="border-t border-[var(--divider)] pt-6">
        <div className="eyebrow mb-4" style={{ color: "var(--copper-dim)" }}>
          Three-Pass Reading · The HDM Protocol
        </div>
        <div className="grid grid-cols-1 gap-0">
          {[
            {
              pass: "First Pass",
              label: "Conceptual",
              instruction: "Read the full recipe before touching anything. Build the complete map in your mind. Know where you are going before you begin moving.",
            },
            {
              pass: "Second Pass",
              label: "Acoustic",
              instruction: "Read the protocol aloud while you cook. The spoken instruction occupies a different part of attention than the silent one. You will notice things you missed on the page.",
            },
            {
              pass: "Third Pass",
              label: "Applied",
              instruction: "After eating, read the spice note. The thermal gradient you just experienced in your body is now a diagram on the page. Notice whether the diagram matches what you felt. If it does not match exactly, the recipe is inviting you to adjust.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex gap-5 py-4 border-b border-[var(--divider)] last:border-b-0"
            >
              <div className="shrink-0" style={{ minWidth: "80px" }}>
                <div
                  className="text-xs tracking-widest uppercase"
                  style={{ color: "var(--copper)", fontSize: "9px" }}
                >
                  {item.pass}
                </div>
                <div
                  className="mt-1"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "13px",
                    color: "var(--parchment)",
                  }}
                >
                  {item.label}
                </div>
              </div>
              <div
                className="text-sm leading-relaxed"
                style={{ color: "var(--parchment-dim)" }}
              >
                {item.instruction}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="mt-8 px-5 py-5 border-l-2"
        style={{ borderColor: "var(--copper-dim)", background: "var(--surface)" }}
      >
        <div className="eyebrow mb-2" style={{ color: "var(--copper-dim)" }}>
          Visualization · Orbital Drone
        </div>
        <p className="text-xs leading-relaxed italic" style={{ color: "var(--parchment-dim)" }}>
          Imagine the cinnamon as the outermost ring of attention — always present, always ambient, the field within which everything else occurs. The fruit is the next ring inward: active, changing, the primary event. The crumble is the surface layer: the boundary between the interior and the open air. The cayenne is the center — invisible until you reach it, then undeniable. Every bite is a journey from the outside ring to the center. This is the Orbital Drone: concentric layers of experience, each one requiring the previous one to be present before it can be perceived.
        </p>
      </div>
    </section>
  );
}

// ─── Mathematical Flexibility Intervention ─────────────────────────────────

const MODAL_INTERVENTIONS = [
  {
    ingredient: "Krusteaz Buttermilk Pancake Mix",
    role: "The Catalyst Binder",
    drone: "All-purpose flour",
    note: "The pancake mix introduces leavening into the fruit layer — something raw flour cannot do. The result is a slightly aerated, pudding-like body rather than a dense fruit paste. This is not a compromise. It is a modal shift: the same structural function, played in a different key.",
    circle: "Adjacent",
  },
  {
    ingredient: "Nature's Path Pumpkin Seed + Flax Granola",
    role: "The Supreme Crumble Agent",
    drone: "Rolled oats",
    note: "Granola arrives pre-toasted and pre-seasoned. It carries its own internal architecture — seeds, flax, clusters — that naked oats cannot replicate. The environment offered granola. The recipe accepted it and became more complex as a result.",
    circle: "Adjacent",
  },
  {
    ingredient: "Plums",
    role: "Chaotic Dissolution",
    drone: "Homogenous apple base",
    note: "Plums dissolve faster than apples. They introduce a tart, jammy matrix that creates contrast against the structural memory of the Granny Smith. This is the tritone: maximum tension against the drone. It does not break the architecture. It makes the apple's stability more audible.",
    circle: "Tritone",
  },
];

function MathematicalFlexibilityIntervention() {
  return (
    <section className="py-10 border-b border-[var(--divider)]">
      <div className="eyebrow mb-2" style={{ color: "var(--copper)" }}>
        HDM Module 2 · Mathematical Flexibility
      </div>
      <h2
        className="mb-2"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "22px",
          fontWeight: 400,
          color: "var(--parchment)",
        }}
      >
        My Favorite Things
      </h2>
      <div
        className="mb-6 text-xs tracking-widest uppercase"
        style={{ color: "var(--copper-dim)" }}
      >
        John Coltrane, 1961 · Atlantic Records · The Modal Drone
      </div>

      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--parchment-dim)" }}>
        This recipe exists because of two matterials that were present in inspiring supply and demanded to be shared: <strong style={{ color: "var(--parchment)" }}>apples and cinnamon</strong>. Their union is not a recipe decision. It is a resonance event. These are two of the most ancient flavor companions in the culinary record — a perfect fifth on the Circle of Fifths. Adjacent. Stable. Mutually amplifying. When both were available at once, the recipe was already playing itself. The kitchen was just the instrument.
      </p>

      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--parchment-dim)" }}>
        The Mimos pop-up at Electric Lounge, Bombay Beach, was the environment. The Martian collaborators were the audience. The desire to share those joys — that is the Yellow Theorem in action: love as primary mathematics, bypassing analysis, moving directly into the gesture of making something for someone.
      </p>

      <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--parchment-dim)" }}>
        In 1961, Coltrane took a song from <em>The Sound of Music</em> — a melody built on a simple waltz and a list of favorite things — and stripped it to its modal skeleton. He held the drone of E minor and improvised freely within its geometry. The melody was the constraint. The freedom was everything he played around it. This recipe operates on the same principle: the apple-cinnamon union is the drone. Everything else — the plums, the granola, the pancake mix — is the improvisation.
      </p>

      {/* Ingredient Intervention Cards */}
      <div className="border-t border-[var(--divider)] pt-6 mb-6">
        <div className="eyebrow mb-4" style={{ color: "var(--copper-dim)" }}>
          Ingredient Interventions · Modal Solos Against the Drone
        </div>
        <div className="grid grid-cols-1 gap-0">
          {MODAL_INTERVENTIONS.map((item, i) => (
            <div
              key={i}
              className="py-5 border-b border-[var(--divider)] last:border-b-0"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "14px",
                      color: "var(--parchment)",
                    }}
                  >
                    {item.ingredient}
                  </div>
                  <div
                    className="text-xs mt-0.5"
                    style={{ color: "var(--copper)", fontStyle: "italic" }}
                  >
                    {item.role}
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div
                    className="text-xs tracking-widest uppercase"
                    style={{
                      color: item.circle === "Tritone" ? "var(--copper)" : "var(--parchment-dim)",
                      fontSize: "9px",
                    }}
                  >
                    {item.circle}
                  </div>
                  <div
                    className="text-xs mt-0.5"
                    style={{ color: "var(--parchment-dim)", fontSize: "10px" }}
                  >
                    vs. {item.drone}
                  </div>
                </div>
              </div>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "var(--parchment-dim)" }}
              >
                {item.note}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* The Drone Statement */}
      <div
        className="px-5 py-5 border-l-2"
        style={{ borderColor: "var(--copper)", background: "var(--surface)" }}
      >
        <div className="eyebrow mb-2" style={{ color: "var(--copper)" }}>
          The Drone · The Unchanging Base
        </div>
        <p
          className="leading-relaxed"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "15px",
            color: "var(--parchment)",
            fontStyle: "italic",
          }}
        >
          Apple + Cinnamon. Present. Inspiring. Available.
        </p>
        <p className="text-xs leading-relaxed mt-3" style={{ color: "var(--parchment-dim)" }}>
          The drone does not change. The improvisation changes around it. Every ingredient substitution in this recipe is a sheet of sound — a modal solo played against the stable resonance of the apple-cinnamon union. The architecture did not collapse when the environment offered plums instead of a homogenous base, granola instead of oats, pancake mix instead of flour. It bloomed. Because the drone held.
        </p>
        <div
          className="mt-4 text-xs tracking-widest uppercase"
          style={{ color: "var(--copper-dim)", fontSize: "9px" }}
        >
          HDM Module 2 · The Lived Drone · Mathematical Flexibility
        </div>
      </div>

      {/* Coltrane Listening Prompt */}
      <div
        className="mt-6 flex items-start gap-4 py-5 border-t border-[var(--divider)]"
      >
        <div
          className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full border"
          style={{ borderColor: "var(--copper)", color: "var(--copper)", fontSize: "14px" }}
        >
          ▶
        </div>
        <div>
          <div className="eyebrow mb-1" style={{ color: "var(--copper)" }}>
            Protocol · Before You Begin
          </div>
          <p className="text-sm leading-relaxed mb-2" style={{ color: "var(--parchment)" }}>
            Press play. Let it run for two minutes before you begin chopping.
          </p>
          <a
            href="https://www.youtube.com/watch?v=qWG2dsXV5HI"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs tracking-wide"
            style={{ color: "var(--copper)", textDecoration: "none" }}
          >
            <span
              className="px-3 py-1.5 border"
              style={{
                borderColor: "var(--copper)",
                color: "var(--copper)",
                fontSize: "10px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              John Coltrane · My Favorite Things · 1961
            </span>
          </a>
          <div
            className="mt-2 text-xs"
            style={{ color: "var(--parchment-dim)", fontSize: "10px" }}
          >
            Atlantic Records · E minor drone · 14 minutes, 17 seconds
          </div>
        </div>
      </div>

      {/* Your Drone — Self-Study Exercise */}
      <div className="mt-6 border-t border-[var(--divider)] pt-6">
        <div className="eyebrow mb-2" style={{ color: "var(--copper)" }}>
          HDM Module 2 · Self-Study Exercise
        </div>
        <h3
          className="mb-1"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "17px",
            fontWeight: 400,
            color: "var(--parchment)",
          }}
        >
          Your Drone
        </h3>
        <p className="text-xs leading-relaxed mb-5" style={{ color: "var(--parchment-dim)" }}>
          Map your current environment against the recipe’s example. The drone is not invented — it is identified. What is already present, already inspiring, already available?
        </p>

        <div className="grid grid-cols-1 gap-5">
          {[
            {
              step: "01",
              title: "Identify the Drone",
              prompt: "What two matterials are present in inspiring supply right now? What is the stable resonance — the thing that was already playing before you decided to make anything?",
              placeholder: "e.g. ‘Two ingredients, two ideas, two people, two places — already in resonance’",
            },
            {
              step: "02",
              title: "Locate the Tritone",
              prompt: "What element in your current environment creates maximum tension against the drone? What is the chaotic dissolution — the thing that makes the drone’s stability more audible?",
              placeholder: "e.g. ‘The constraint, the unexpected variable, the thing you didn’t plan for’",
            },
            {
              step: "03",
              title: "Design One Sheet of Sound",
              prompt: "Name one modal intervention — one ingredient substitution, one unexpected tool, one available-but-not-obvious resource — that you can play against the drone today. What key does it shift to?",
              placeholder: "e.g. ‘The pancake mix moment — same function, different frequency’",
            },
          ].map((field) => (
            <div key={field.step}>
              <div className="flex items-baseline gap-3 mb-2">
                <span
                  className="text-xs tracking-widest"
                  style={{ color: "var(--copper)", fontFamily: "'Space Mono', monospace", fontSize: "10px" }}
                >
                  {field.step}
                </span>
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "13px",
                    color: "var(--parchment)",
                  }}
                >
                  {field.title}
                </span>
              </div>
              <p className="text-xs leading-relaxed mb-2" style={{ color: "var(--parchment-dim)" }}>
                {field.prompt}
              </p>
              <textarea
                rows={3}
                placeholder={field.placeholder}
                className="w-full bg-transparent border text-xs leading-relaxed resize-none"
                style={{
                  borderColor: "var(--divider)",
                  color: "var(--parchment)",
                  padding: "10px 12px",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "11px",
                  outline: "none",
                  caretColor: "var(--copper)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--copper)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--divider)";
                }}
              />
            </div>
          ))}
        </div>

        <div
          className="mt-5 text-xs leading-relaxed"
          style={{ color: "var(--parchment-dim)", fontSize: "10px", fontStyle: "italic" }}
        >
          This exercise is not graded. It is not submitted. It is a private act of attention — the same act that produced this recipe. The drone was already playing. You are learning to hear it.
        </div>
      </div>
    </section>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  const [servings, setServings] = useState(BASE_SERVINGS);
  const ratio = servings / BASE_SERVINGS;

  const handleServings = useCallback((n: number) => {
    setServings(n);
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--background)", color: "var(--parchment)" }}
    >
      {/* ── HEADER ── */}
      <header
        className="border-b border-[var(--divider)]"
        style={{ background: "var(--background)", position: "relative", overflow: "hidden" }}
      >
        <VertexWatermark />
        <div className="max-w-3xl mx-auto px-6 pt-14 pb-10">
          <div className="eyebrow mb-5">
            HIA Exercise Æssay · Mathematical Flexibility
          </div>
          <h1
            className="leading-tight mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 5vw, 48px)",
              fontWeight: 400,
              color: "var(--parchment)",
            }}
          >
            Electric Mimos Martian
            <br />
            Stone Fruit Crumble
          </h1>
          <div
            className="text-xs tracking-wide mb-8"
            style={{ color: "var(--parchment-dim)" }}
          >
            Created April 06, 2026 · In honor of the mathematical flexibility
            of a good idea.
          </div>

          {/* Field Review */}
          <div
            className="pl-5 py-1 border-l-2"
            style={{ borderColor: "var(--copper-dim)" }}
          >
            <p
              className="italic leading-relaxed"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "15px",
                color: "var(--parchment-dim)",
              }}
            >
              "Your fruit crumble is yummy! Glad you joined the pie crumble
              tart cult."
            </p>
            <cite
              className="eyebrow not-italic block mt-2"
              style={{ fontSize: "10px" }}
            >
              — Gandala, Field Review · 15:36
            </cite>
          </div>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="max-w-3xl mx-auto px-6">
        {/* Steeping Note */}
        <section className="py-10 border-b border-[var(--divider)]">
          <div className="eyebrow mb-4">A Steeping Note for the Kitchen Architecture</div>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--parchment-dim)" }}
          >
            Baking is thermal manipulation of phase states. To make a crumble
            is to intentionally distribute tension between structure (the crumb)
            and dissolution (the fruit). This protocol is designed to eliminate
            the cognitive knot of "confusion" by demanding immediate, localized
            risk. You are building an architecture of flavor based entirely on
            the assets currently available in your environment.
          </p>
          <p
            className="text-sm leading-relaxed mt-4"
            style={{ color: "var(--parchment-dim)" }}
          >
            The Electric Mimos Martian Stone Fruit Crumble is a testament to
            the principle that an equation is only as strong as its capacity to
            accept new variables. When the environment presented plums instead
            of a homogenous apple base, pancake batter instead of raw flour,
            and granola instead of naked oats, the architecture did not
            collapse — it bloomed.
          </p>
          <div
            className="mt-6 flex items-center gap-4 text-xs tracking-widest uppercase"
            style={{ color: "var(--copper)" }}
          >
            <span>375°F / 190°C</span>
            <span style={{ color: "var(--divider)" }}>·</span>
            <span>83 Minutes Total</span>
            <span style={{ color: "var(--divider)" }}>·</span>
            <span>24-Minute Reset Included</span>
          </div>
        </section>

        {/* Mathematical Flexibility Intervention */}
        <MathematicalFlexibilityIntervention />

        {/* Serving Control */}
        <ServingControl servings={servings} onChange={handleServings} />

        {/* Ingredients */}
        <section className="py-10 border-b border-[var(--divider)]">
          <div className="eyebrow mb-2">The Architecture of the Bloom</div>
          <h2
            className="mb-8"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "22px",
              fontWeight: 400,
              color: "var(--parchment)",
            }}
          >
            Ingredients
          </h2>
          {ingredientGroups.map((group, i) => (
            <IngredientGroupBlock key={i} group={group} ratio={ratio} />
          ))}
          <SpiceNote />
        </section>

        {/* Protocol */}
        <section className="py-10 border-b border-[var(--divider)]">
          <div className="eyebrow mb-2">The 83-Minute Protocol</div>
          <h2
            className="mb-8"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "22px",
              fontWeight: 400,
              color: "var(--parchment)",
            }}
          >
            Method
          </h2>
          <div className="border-t border-[var(--divider)]">
            {protocolSteps.map((step, i) => (
              <ProtocolStepBlock key={i} step={step} />
            ))}
          </div>
        </section>

        {/* Resonance Observation */}
        <ResonanceObservation />

        {/* Transport Note */}
        <section className="py-10 border-b border-[var(--divider)]">
          <div className="eyebrow mb-4">Kinetics of Transport · A Care Note</div>
          <p
            className="text-sm leading-relaxed mb-4"
            style={{ color: "var(--parchment-dim)" }}
          >
            A crumble is a delicate equilibrium — a structure resting upon a
            semi-liquid foundation. The fruit matrix will shift violently if the
            dish is tilted. A 7% structural loss is a mathematical certainty if
            the geometry of the dish is compromised during transit.
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--parchment-dim)" }}
          >
            Carry the dish from the bottom using two hands to form a stable,
            level plane. Do not hold it by the rim with one hand. Do not place
            it on an angled car seat. Treat it as a fluid dynamic system until
            it is safely deposited on the table of reception.
          </p>
        </section>

        {/* Footer */}
        <footer className="py-10 flex flex-wrap justify-between gap-4">
          <div>
            <div className="eyebrow mb-1">
              Human Development Mathematics
            </div>
            <div
              className="text-xs"
              style={{ color: "var(--parchment-dim)" }}
            >
              HIA Exercise Æssay · The Steeperverse Ecosystem
            </div>
          </div>
          <div className="text-right">
            <div
              className="text-xs tracking-widest uppercase"
              style={{ color: "var(--copper-dim)" }}
            >
              April 07, 2026
            </div>
            <div
              className="text-xs italic mt-1"
              style={{ color: "var(--parchment-dim)" }}
            >
              Consume the mathematics.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
