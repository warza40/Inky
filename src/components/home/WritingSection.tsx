"use client";

import Link from "next/link";

interface WritingCard {
  id: string;
  type: string;
  spot: string;
  tags: string[];
  title: string;
  description: string;
  visual: "notebook" | "rings" | "branches";
  href: string;
}

const WRITING: WritingCard[] = [
  {
    id: "field-notes",
    type: "Objects",
    spot: "Spot",
    tags: ["Essay", "Field notes"],
    title: "Field Notes",
    description:
      "An open notebook, mid-session. Lines of thought, a circle, a question. The artefact of a mind at work.",
    visual: "notebook",
    href: "#",
  },
  {
    id: "clarity-moment",
    type: "Abstract",
    spot: "Insight beat",
    tags: ["Case study", "Process"],
    title: "The Clarity Moment",
    description:
      "The moment a system clicks. Expanding rings, a warm centre, small marks radiating outward. Abstract but immediately felt.",
    visual: "rings",
    href: "#",
  },
  {
    id: "mental-models",
    type: "Systems",
    spot: "Framework",
    tags: ["Research", "Method"],
    title: "Mental Models at Work",
    description:
      "What users carry into a product before they even open it. The invisible architecture every interface has to compete with.",
    visual: "branches",
    href: "#",
  },
];

function FieldNotesVisual() {
  return (
    <svg
      viewBox="0 0 520 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="wr-visual-svg"
      aria-hidden
    >
      {/* Text lines */}
      {[55, 78, 101, 124, 147, 170].map((y, i) => (
        <line
          key={y}
          x1="32"
          y1={y}
          x2={[260, 200, 280, 220, 160, 240][i]}
          y2={y}
          stroke="rgba(28,24,18,0.13)"
          strokeWidth="1"
        />
      ))}
      {/* Circle selection / annotation */}
      <circle cx="58" cy="148" r="22" fill="none" stroke="rgba(184,76,58,0.38)" strokeWidth="1.5" />
      {/* Small inline mark */}
      <circle cx="125" cy="148" r="5" fill="rgba(28,24,18,0.1)" />
      <line x1="134" y1="148" x2="200" y2="148" stroke="rgba(184,76,58,0.2)" strokeWidth="1" />
      {/* Arrow to sticky */}
      <line x1="290" y1="115" x2="340" y2="84" stroke="rgba(28,24,18,0.18)" strokeWidth="1" />
      <polygon points="340,78 346,88 334,88" fill="rgba(28,24,18,0.16)" />
      {/* Sticky note */}
      <rect x="344" y="28" width="130" height="88" fill="#f7e16e" rx="1" />
      <line x1="344" y1="28" x2="474" y2="28" stroke="rgba(28,24,18,0.08)" strokeWidth="1" />
      <text x="356" y="52" fontFamily="DM Mono, monospace" fontSize="9.5" fill="rgba(28,24,18,0.72)">why does this</text>
      <text x="356" y="68" fontFamily="DM Mono, monospace" fontSize="9.5" fill="rgba(28,24,18,0.72)">step exist?</text>
      {/* Buttons bottom-right */}
      <rect x="360" y="162" width="52" height="24" rx="3" fill="none" stroke="rgba(28,24,18,0.14)" strokeWidth="1" />
      <rect x="420" y="162" width="52" height="24" rx="3" fill="none" stroke="rgba(28,24,18,0.14)" strokeWidth="1" />
      <rect x="380" y="194" width="64" height="20" rx="3" fill="none" stroke="rgba(184,76,58,0.28)" strokeWidth="1" />
      {/* Tiny count labels */}
      <text x="378" y="178" fontFamily="DM Mono, monospace" fontSize="7" fill="rgba(28,24,18,0.25)">1</text>
      <text x="438" y="178" fontFamily="DM Mono, monospace" fontSize="7" fill="rgba(28,24,18,0.25)">1</text>
    </svg>
  );
}

// Pre-computed tick endpoints (cx=260, cy=110, inner r=100, outer r=108).
// Static values avoid SSR/client Math.sin floating-point divergence.
const RING_TICKS: [number, number, number, number][] = [
  [360,     110,       368,     110      ], // 0°
  [310,     196.603,   314,     203.531  ], // 60°
  [210,     196.603,   206,     203.531  ], // 120°
  [160,     110,       152,     110      ], // 180°
  [210,     23.397,    206,     16.469   ], // 240°
  [310,     23.397,    314,     16.469   ], // 300°
];

function RingsVisual() {
  return (
    <svg
      viewBox="0 0 520 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="wr-visual-svg"
      aria-hidden
    >
      <circle cx="260" cy="110" r="96" stroke="rgba(184,76,58,0.07)" strokeWidth="1" />
      <circle cx="260" cy="110" r="70" stroke="rgba(184,76,58,0.11)" strokeWidth="1" />
      <circle cx="260" cy="110" r="48" stroke="rgba(184,76,58,0.16)" strokeWidth="1" />
      <circle cx="260" cy="110" r="28" stroke="rgba(184,76,58,0.22)" strokeWidth="1" />
      {/* Filled centre */}
      <circle cx="260" cy="110" r="12" fill="rgba(184,76,58,0.38)" />
      <circle cx="260" cy="110" r="6"  fill="rgba(184,76,58,0.65)" />
      {/* Tick marks — pre-computed, no runtime trig */}
      {RING_TICKS.map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="rgba(184,76,58,0.22)"
          strokeWidth="1.5"
        />
      ))}
      {/* Scattered dots */}
      <circle cx="150" cy="58"  r="2"   fill="rgba(28,24,18,0.12)" />
      <circle cx="370" cy="72"  r="2"   fill="rgba(28,24,18,0.12)" />
      <circle cx="90"  cy="138" r="1.5" fill="rgba(28,24,18,0.09)" />
      <circle cx="440" cy="155" r="1.5" fill="rgba(28,24,18,0.09)" />
      {/* Label */}
      <text
        x="418"
        y="196"
        fontFamily="DM Mono, monospace"
        fontSize="9"
        fill="rgba(28,24,18,0.22)"
        fontStyle="italic"
      >
        the click
      </text>
    </svg>
  );
}

function BranchesVisual() {
  const nodes: [number, number][] = [
    [260, 82],
    [168, 68],
    [340, 60],
    [112, 138],
    [384, 148],
  ];
  const edges: [[number, number], [number, number]][] = [
    [[260, 190], [260, 82]],
    [[260, 128], [168, 68]],
    [[260, 108], [340, 60]],
    [[260, 148], [112, 138]],
    [[260, 148], [384, 148]],
  ];
  const labels: [number, number, string][] = [
    [130, 54, "explicit"],
    [344, 48, "inferred"],
    [56, 132, "assumed"],
    [388, 140, "taught"],
  ];

  return (
    <svg
      viewBox="0 0 520 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="wr-visual-svg"
      aria-hidden
    >
      {edges.map(([[x1, y1], [x2, y2]], i) => (
        <line
          key={i}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="rgba(28,24,18,0.18)"
          strokeWidth={i === 0 ? 1.5 : 1}
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle
          key={i}
          cx={x} cy={y} r={i === 0 ? 5 : 4}
          fill="none"
          stroke="rgba(184,76,58,0.4)"
          strokeWidth="1.5"
        />
      ))}
      {labels.map(([x, y, label]) => (
        <text
          key={label}
          x={x} y={y}
          fontFamily="DM Mono, monospace"
          fontSize="8"
          fill="rgba(28,24,18,0.28)"
        >
          {label}
        </text>
      ))}
    </svg>
  );
}

const VISUALS = {
  notebook: FieldNotesVisual,
  rings: RingsVisual,
  branches: BranchesVisual,
};

export function WritingSection() {
  return (
    <section className="writing-section" id="writing" aria-label="Writing">

      <div className="writing-section-header">
        <div className="writing-section-header-left">
          <p className="writing-section-label">— Writing</p>
          <h2 className="writing-section-headline">
            Thinking in public. Notes, essays, frameworks.
          </h2>
        </div>
        <a
          href="https://substack.com/@thelilyput"
          target="_blank"
          rel="noopener noreferrer"
          className="writing-section-link"
        >
          All writing →
        </a>
      </div>

      <div className="writing-divider" />

      <div className="wr-stack">
        {WRITING.map((card) => {
          const Visual = VISUALS[card.visual];
          return (
            <Link key={card.id} href={card.href} className="wr-card" aria-label={card.title}>
              <div className="wr-visual">
                <Visual />
              </div>
              <div className="wr-info">
                <div className="wr-info-main">
                  <p className="wr-type">
                    <span className="wr-type-prefix">Type</span>
                    <span className="wr-type-sep"> — </span>
                    {card.type}
                    <span className="wr-type-sep"> · </span>
                    <span className="wr-type-muted">{card.spot}</span>
                  </p>
                  <h3 className="wr-title">{card.title}</h3>
                  <p className="wr-desc">{card.description}</p>
                </div>
                <div className="wr-tags" aria-label="Tags">
                  {card.tags.map((tag) => (
                    <span key={tag} className="wr-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
