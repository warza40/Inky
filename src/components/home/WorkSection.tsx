"use client";

import { useState } from "react";
import Link from "next/link";

interface GraphSeg { flex: number; color: string; }

interface WorkCard {
  slug: string;
  category: string;
  categoryDetail?: string;
  tag: "enterprise" | "research" | "systems" | "all";
  title: string;
  description: string;
  keyDecision?: string;
  imageBg: string;
  graph: GraphSeg[];
  href: string;
}

const WORK: WorkCard[] = [
  {
    slug: "omantel-bulk-activation",
    category: "Enterprise",
    categoryDetail: "Telecom",
    tag: "enterprise",
    title: "Designing a Scalable Bulk Activation System",
    description:
      "Enterprise customers were managing thousands of SIM activations manually. One invalid record failed the entire batch.",
    keyDecision:
      "We aligned bulk uploads with CSV templates and spreadsheets teams already used — familiarity and early validation — instead of a brand-new workflow that would have steepened the learning curve.",
    imageBg: "#1e1a14",
    graph: [
      { flex: 1, color: "#8aa0b4" },
      { flex: 2, color: "#b84c3a" },
      { flex: 3, color: "#d4705e" },
      { flex: 4, color: "#8a9e78" },
    ],
    href: "/case/omantel-bulk-activation",
  },
  {
    slug: "warehouse-operations",
    category: "Enterprise",
    categoryDetail: "Operations",
    tag: "enterprise",
    title: "Bringing Clarity to Warehouse Operations at Scale",
    description:
      "The data existed across every system. What was missing was a way to trust it, act on it, and share it across teams without losing hours to status coordination.",
    keyDecision:
      "We could build better dashboards, or fix the mental model that made bad dashboards feel acceptable. We chose the harder thing — and argued for it through three rounds of stakeholder review.",
    imageBg: "#1a2530",
    graph: [
      { flex: 2, color: "#8aa0b4" },
      { flex: 3, color: "#b84c3a" },
      { flex: 4, color: "#d4705e" },
      { flex: 1, color: "#8a9e78" },
    ],
    href: "/case/warehouse-operations",
  },
  {
    slug: "real-estate-connectivity",
    category: "Research",
    categoryDetail: "Telecom",
    tag: "research",
    title: "Bulk Connectivity Purchase Flow for Real Estate Owners",
    description:
      "Owners weren't afraid of the commitment. They were afraid of not understanding what they were committing to.",
    imageBg: "#1a2820",
    graph: [
      { flex: 4, color: "#8aa0b4" },
      { flex: 3, color: "#b84c3a" },
      { flex: 2, color: "#d4705e" },
      { flex: 1, color: "#8a9e78" },
    ],
    href: "/case/real-estate-connectivity",
  },
];

const TABS = [
  { label: "Case Studies", value: "all" },
  { label: "Exploration", value: "experiments" },
] as const;

/** Dark tile panel — mirrors the DS card-featured / card-compact left panel */
function TilePanel({
  rows,
  cols,
  bg,
  graph,
}: {
  rows: number;
  cols: number;
  bg: string;
  graph: GraphSeg[];
}) {
  return (
    <div className="wc-tile-panel" style={{ background: bg }}>
      <div
        className="wc-tile-grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {Array.from({ length: rows * cols }, (_, i) => (
          <div key={i} className="wc-tile" />
        ))}
      </div>
      <div className="wc-content-graph">
        {graph.map((seg, i) => (
          <div
            key={i}
            className="wcg-seg"
            style={{ flex: seg.flex, background: seg.color }}
          />
        ))}
      </div>
    </div>
  );
}

export function WorkSection() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filtered =
    activeTab === "all" ? WORK : WORK.filter((c) => c.tag === activeTab);

  const [featured, ...rest] = filtered;

  return (
    <section className="work-section" id="work" aria-label="Work">

      {/* Section header */}
      <div className="work-section-header">
        <div className="work-section-header-left">
          <p className="work-section-label">— Selected Work</p>
          <h2 className="work-section-headline">
            Work
          </h2>
        </div>
        <nav className="work-tabs" aria-label="Filter work">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              className={`work-tab${activeTab === tab.value ? " active" : ""}`}
              onClick={() => setActiveTab(tab.value)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="work-divider" />

      {/* Featured card — DS card-featured layout */}
      {featured && (
        <Link
          href={featured.href}
          className="wc-featured"
          aria-label={featured.title}
        >
          <TilePanel rows={8} cols={10} bg={featured.imageBg} graph={featured.graph} />

          <div className="wc-featured-body">
            <div>
              <p className="wc-breadcrumb">
                {featured.category}
                {featured.categoryDetail && (
                  <span className="wc-breadcrumb-detail"> · {featured.categoryDetail}</span>
                )}
              </p>
              <h3 className="wc-title">{featured.title}</h3>
              <p className="wc-desc">{featured.description}</p>
            </div>

            {featured.keyDecision && (
              <div className="wc-key-decision">
                <span className="wc-kd-label">Key decision</span>
                <p className="wc-kd-text">&ldquo;{featured.keyDecision}&rdquo;</p>
              </div>
            )}

            <div className="wc-footer">
              <span className="wc-cta">
                Read the case study
                <span className="wc-cta-arrow" aria-hidden />
              </span>
            </div>
          </div>
        </Link>
      )}

      {/* Grid cards — DS card-compact layout */}
      {rest.length > 0 && (
        <div className="work-grid">
          {rest.map((card) => (
            <Link
              key={card.slug}
              href={card.href}
              className="wc-card"
              aria-label={card.title}
            >
              <TilePanel rows={5} cols={7} bg={card.imageBg} graph={card.graph} />
              <div className="wc-card-body">
                <div>
                  <p className="wc-card-breadcrumb">
                    {card.category}
                  </p>
                  <h3 className="wc-card-title">{card.title}</h3>
                  <p className="wc-card-desc">{card.description}</p>
                </div>
                <div className="wc-card-bottom">
                  <span className="wc-card-cta">
                    View
                    <span className="wc-card-cta-arrow" aria-hidden />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <p className="work-empty">No projects in this category yet.</p>
      )}
    </section>
  );
}
