import type { CaseStudy } from "@/case-studies/omantel";

type Ecosystem = NonNullable<CaseStudy["sections"]["contextEcosystem"]>;
type IconId = Ecosystem["products"][0]["icon"];

const ICON_STROKE = "currentColor";

/** Matches reference HTML: .eco-icon svg { width: 20px; height: 20px; } */
const ICON_PX = 20;

function EcosystemIcon({ id }: { id: IconId }) {
  const common = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    width: ICON_PX,
    height: ICON_PX,
    fill: "none" as const,
    stroke: ICON_STROKE,
    strokeWidth: 1.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "cs-ecosystem-icon-svg",
    focusable: false,
    "aria-hidden": true,
  };
  switch (id) {
    case "portal":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="14" rx="1" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <circle cx="7" cy="6.5" r="1" />
          <circle cx="10" cy="6.5" r="1" />
          <path d="M7 12 L10 12 M7 15 L17 15" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <polyline points="12,7 12,12 15,15" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
        </svg>
      );
    case "bars":
      return (
        <svg {...common}>
          <rect x="1" y="14" width="7" height="7" />
          <rect x="9" y="3" width="7" height="18" />
          <rect x="17" y="9" width="7" height="12" />
        </svg>
      );
    default:
      return null;
  }
}

export function ContextEcosystem({ data }: { data: Ecosystem }) {
  return (
    <div className="cs-ecosystem fade-in" style={{ ["--delay" as string]: "140ms" }}>
      <p className="cs-ecosystem-eyebrow">
        <span className="cs-ecosystem-eyebrow-text">{data.eyebrow}</span>
      </p>
      <p className="cs-ecosystem-intro">{data.intro}</p>

      <div className="cs-ecosystem-box">
        <div className="cs-ecosystem-box-head">{data.boxTitle}</div>
        <div className="cs-ecosystem-rows">
          {data.products.map((p, i) => (
            <div key={i} className="cs-ecosystem-row">
              <div className="cs-ecosystem-icon-cell">
                <EcosystemIcon id={p.icon} />
              </div>
              <div className="cs-ecosystem-main">
                <div className="cs-ecosystem-name">{p.name}</div>
                <p className="cs-ecosystem-desc">{p.description}</p>
              </div>
              <div className="cs-ecosystem-badge-wrap">
                <span
                  className={
                    p.platform === "desktop"
                      ? "cs-ecosystem-badge cs-ecosystem-badge--desktop"
                      : "cs-ecosystem-badge cs-ecosystem-badge--mobile"
                  }
                >
                  {p.platform === "desktop" ? "Desktop" : "Mobile"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
