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

type StepIconName = (typeof STEPS)[number]["icon"];

function StepIcon({ type }: { type: StepIconName }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 22 22",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
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
    default: {
      const unmatched: never = type;
      return unmatched;
    }
  }
}

export function AboutApproach() {
  return (
    <section
      className="about-approach"
      aria-labelledby="about-approach-heading"
    >
      <div className="about-approach__panel">
        <h2 id="about-approach-heading" className="about-approach__title">
          The approach
        </h2>
        <ol className="about-approach__steps">
          {STEPS.map((step) => (
            <li key={step.label} className="about-approach__step">
              <span className="about-approach__icon">
                <StepIcon type={step.icon} />
              </span>
              <span className="about-approach__copy">
                <span className="about-approach__label">{step.label}</span>
                <span className="about-approach__sub">{step.sub}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
