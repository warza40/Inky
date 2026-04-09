"use client";

import { useState } from "react";
import Link from "next/link";

interface GraphSeg {
  flex: number;
  color: string;
}

interface WorkCard {
  slug: string;
  category: string;
  categoryDetail?: string;
  tag: "enterprise" | "research" | "strategy" | "systems" | "all";
  title: string;
  description: string;
  imageBg: string;
  /** Case study preview image from /public */
  imageSrc?: string;
  graph: GraphSeg[];
  href: string;
}

const WORK: WorkCard[] = [
  {
    slug: "omantel-bulk-activation",
    category: "Enterprise",
    categoryDetail: "Telecom",
    tag: "enterprise",
    title: "Fixing the Fragility in Enterprise SIM Activation",
    description:
      "Thousands of SIM activations, processed manually. One invalid record was enough to restart the entire process.",
    imageBg: "#1e1a14",
    imageSrc: "/Bulk.png",
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
    title: "Bringing Clarity to Warehouse Operations Across Distributed Teams",
    description:
      "Different versions of data existed across teams in the same system. They required a single source of truth and share it across teams — without losing hours to status coordination.",
    imageBg: "#1a2530",
    imageSrc: "/warehouse.png",
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
    category: "Strategy",
    categoryDetail: "Telecom",
    tag: "strategy",
    title: "Making Bulk Connectivity Purchases Transparent for Property Owners",
    description:
      "Introducing a new framework for data connectivity as a real estate amenity.",
    imageBg: "#1a2820",
    imageSrc: "/REC.png",
    graph: [
      { flex: 4, color: "#8aa0b4" },
      { flex: 3, color: "#b84c3a" },
      { flex: 2, color: "#d4705e" },
      { flex: 1, color: "#8a9e78" },
    ],
    href: "/case/real-estate-connectivity",
  },
  {
    slug: "disaster-recovery",
    category: "Enterprise",
    categoryDetail: "Operations",
    tag: "enterprise",
    title: "Accelerating Disaster Recovery Response Through Automation",
    description:
      "Hurricane season hits, and entire neighbourhoods are devastated. Our client on the front lines of disaster recovery faced their biggest roadblock: legacy tools — fragmented, error-prone, and slow when every hour counted.",
    imageBg: "#1a2228",
    imageSrc: "/DM.png",
    graph: [
      { flex: 3, color: "#8aa0b4" },
      { flex: 2, color: "#b84c3a" },
      { flex: 2, color: "#d4705e" },
      { flex: 3, color: "#8a9e78" },
    ],
    href: "/case/disaster-recovery",
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
  imageSrc,
  imagePriority,
}: {
  rows: number;
  cols: number;
  bg: string;
  graph: GraphSeg[];
  imageSrc?: string;
  imagePriority?: boolean;
}) {
  return (
    <div
      className={`wc-tile-panel${imageSrc ? " wc-tile-panel--has-image" : ""}`}
      style={{ background: bg }}
    >
      {imageSrc && (
        // eslint-disable-next-line @next/next/no-img-element -- static public assets, layout via CSS
        <img
          className="wc-panel-image"
          src={imageSrc}
          alt=""
          loading={imagePriority ? "eager" : "lazy"}
          decoding="async"
        />
      )}
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

  return (
    <section className="work-section" id="work" aria-label="Work">
      {/* Section header */}
      <div className="work-section-header">
        <div className="work-section-header-left">
          <p className="work-section-label">— Selected Work</p>
          <h2 className="work-section-headline">Work</h2>
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

      {/* Case study cards — same grid as writing (three equal columns on desktop) */}
      {filtered.length > 0 && (
        <div className="work-grid">
          {filtered.map((card, index) => (
            <Link
              key={card.slug}
              href={card.href}
              className="wc-card"
              aria-label={card.title}
            >
              <TilePanel
                rows={5}
                cols={7}
                bg={card.imageBg}
                graph={card.graph}
                imageSrc={card.imageSrc}
                imagePriority={index === 0}
              />
              <div className="wc-card-body">
                <div>
                  <p className="wc-card-breadcrumb">
                    {card.category}
                    {card.categoryDetail && (
                      <span className="wc-breadcrumb-detail">
                        {" "}
                        · {card.categoryDetail}
                      </span>
                    )}
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
