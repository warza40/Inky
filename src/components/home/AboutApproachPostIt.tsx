/** Process strip on yellow post-it — compact for About (“−50px” vs full hero scale) */

const STEPS = [
  {
    label: "Discover",
    sub: "Where is the real problem?",
    icon: "discover",
  },
  {
    label: "Synthesise",
    sub: "What does it mean?",
    icon: "synthesis",
  },
  {
    label: "Frame",
    sub: "What is the right question?",
    icon: "frame",
  },
  {
    label: "Design",
    sub: "What creates clarity?",
    icon: "design",
  },
  {
    label: "Prototype",
    sub: "Does it hold up?",
    icon: "prototype",
  },
  {
    label: "Ship",
    sub: "Then learn again.",
    icon: "ship",
  },
] as const;

function StepIcon({ type }: { type: (typeof STEPS)[number]["icon"] }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 22 22",
    fill: "none",
    stroke: "rgba(60, 48, 12, 0.45)",
    strokeWidth: 1.25,
    "aria-hidden": true as const,
  };
  switch (type) {
    case "discover":
      return (
        <svg {...common}>
          <circle cx="9" cy="9" r="5.5" />
          <path d="M13.5 13.5 L18 18" strokeLinecap="round" />
        </svg>
      );
    case "synthesis":
      return (
        <svg {...common}>
          <circle cx="6" cy="8" r="2" />
          <circle cx="16" cy="6" r="2" />
          <circle cx="14" cy="15" r="2" />
          <path d="M8 9 L14 7 M8 10 L12 14" strokeLinecap="round" />
        </svg>
      );
    case "frame":
      return (
        <svg {...common}>
          <rect x="4" y="5" width="14" height="12" rx="2" />
          <path d="M7 9 H15 M7 12 H12" strokeLinecap="round" />
        </svg>
      );
    case "design":
      return (
        <svg {...common}>
          <path d="M4 16 L8 10 L12 14 L18 6" strokeLinecap="round" />
        </svg>
      );
    case "prototype":
      return (
        <svg {...common}>
          <path
            d="M11 4 L13.5 9.5 L19 10 L15 14 L16 19.5 L11 16.5 L6 19.5 L7 14 L3 10 L8.5 9.5 Z"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "ship":
      return (
        <svg {...common}>
          <path
            d="M6 11 L10 15 L17 6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

export function AboutApproachPostIt() {
  return (
    <div className="jl-about-approach">
      <p className="jl-about-approach-eyebrow">The approach</p>
      <div className="jl-about-approach-card">
        <ul className="jl-about-approach-steps" role="list">
          {STEPS.map((s) => (
            <li key={s.label} className="jl-about-approach-step">
              <span className="jl-about-approach-step-icon" aria-hidden>
                <StepIcon type={s.icon} />
              </span>
              <span className="jl-about-approach-step-copy">
                <span className="jl-about-approach-step-label">{s.label}</span>
                <span className="jl-about-approach-step-sub">{s.sub}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
