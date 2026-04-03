"use client";

import { useState } from "react";
import Link from "next/link";

interface WorkCard {
  slug: string;
  category: string;
  tag: "enterprise" | "research" | "systems" | "all";
  year: string;
  title: string;
  description: string;
  keyDecision?: string;
  metric: { value: string; unit?: string; label: string };
  imageBg: string;
  imagePattern?: "grid" | "circles" | "people" | "dots";
  href: string;
}

const WORK: WorkCard[] = [
  {
    slug: "warehouse-operations",
    category: "Enterprise · Operations",
    tag: "enterprise",
    year: "2023",
    title: "Bringing Clarity to Warehouse Operations at Scale",
    description:
      "The data existed across every system. What was missing was a way to trust it, act on it, and share it across teams without losing hours to status coordination.",
    keyDecision:
      "We could build better dashboards, or fix the mental model that made bad dashboards feel acceptable. We chose the harder thing — and argued for it through three rounds of stakeholder review.",
    metric: { value: "3×", label: "reduction in cross-team status coordination time" },
    imageBg: "#1C2836",
    imagePattern: "grid",
    href: "/case/warehouse-operations",
  },
  {
    slug: "omantel-bulk-activation",
    category: "Enterprise · Telecom",
    tag: "enterprise",
    year: "2022",
    title: "Designing a Scalable Bulk Activation System",
    description:
      "Enterprise customers were managing thousands of SIM activations manually. One invalid record failed the entire batch.",
    metric: { value: "40%", label: "reduction in activation errors post-launch" },
    imageBg: "#F2EBE0",
    imagePattern: "people",
    href: "/case/omantel-bulk-activation",
  },
  {
    slug: "real-estate-connectivity",
    category: "Research · Telecom",
    tag: "research",
    year: "2022",
    title: "Bulk Connectivity Purchase Flow for Real Estate Owners",
    description:
      "Owners weren't afraid of the commitment. They were afraid of not understanding what they were committing to.",
    metric: { value: "62%", label: "reduction in manual sales coordination" },
    imageBg: "#DDE6D4",
    imagePattern: "circles",
    href: "/case/real-estate-connectivity",
  },
];

const TABS = [
  { label: "Case Studies",  value: "all" },
  { label: "Learning Lab",  value: "experiments" },
] as const;

function CardPattern({ pattern, bg }: { pattern?: string; bg: string }) {
  const iconColor = bg.startsWith("#1") ? "rgba(255,255,255,0.07)" : "rgba(28,24,18,0.08)";
  return (
    <div className="wc-image" style={{ background: bg }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <pattern id={`pat-${pattern}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            {pattern === "grid" && (
              <rect x="8" y="8" width="24" height="24" rx="2" fill="none" stroke={iconColor} strokeWidth="1.2" />
            )}
            {pattern === "circles" && (
              <circle cx="20" cy="20" r="10" fill="none" stroke={iconColor} strokeWidth="1.2" />
            )}
            {pattern === "people" && (
              <>
                <circle cx="20" cy="14" r="5" fill="none" stroke={iconColor} strokeWidth="1.2" />
                <path d="M11 32 Q20 24 29 32" fill="none" stroke={iconColor} strokeWidth="1.2" strokeLinecap="round" />
              </>
            )}
            {pattern === "dots" && (
              <circle cx="20" cy="20" r="2" fill={iconColor} />
            )}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#pat-${pattern})`} />
      </svg>
    </div>
  );
}

export function WorkSection() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filtered = activeTab === "all"
    ? WORK
    : WORK.filter((c) => c.tag === activeTab);

  const [featured, ...rest] = filtered;

  return (
    <section className="work-section" id="work" aria-label="Selected work">

      {/* Section header */}
      <div className="work-section-header">
        <div className="work-section-header-left">
          <p className="work-section-label">— Selected Work</p>
          <h2 className="work-section-headline">
            Four projects. Each one a different kind of problem.
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

      {/* Featured card */}
      {featured && (
        <Link href={featured.href} className="wc-featured" aria-label={featured.title}>
          <CardPattern pattern={featured.imagePattern} bg={featured.imageBg} />
          <div className="wc-featured-body">
            <p className="wc-label">
              <span className="wc-label-dash">—</span>
              <span className="wc-category">{featured.category}</span>
              <span className="wc-dot">·</span>
              <span className="wc-year">{featured.year}</span>
            </p>
            <h3 className="wc-title">{featured.title}</h3>
            <p className="wc-desc">{featured.description}</p>
            {featured.keyDecision && (
              <blockquote className="wc-key-decision">
                <span className="wc-kd-label">Key decision</span>
                <p className="wc-kd-text">&ldquo;{featured.keyDecision}&rdquo;</p>
              </blockquote>
            )}
            <div className="wc-footer">
              <span className="wc-read">Read the case study &rarr;</span>
              <div className="wc-metric">
                <span className="wc-metric-value">{featured.metric.value}</span>
                <span className="wc-metric-label">{featured.metric.label}</span>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Grid cards */}
      {rest.length > 0 && (
        <div className="work-grid">
          {rest.map((card) => (
            <Link key={card.slug} href={card.href} className="wc-card" aria-label={card.title}>
              <CardPattern pattern={card.imagePattern} bg={card.imageBg} />
              <div className="wc-card-body">
                <div className="wc-card-meta">
                  <span className="wc-tag">{card.category.split(" · ")[0]}</span>
                  <span className="wc-card-year">{card.year}</span>
                </div>
                <h3 className="wc-card-title">{card.title}</h3>
                <p className="wc-card-desc">{card.description}</p>
                <div className="wc-card-divider" />
                <div className="wc-card-footer">
                  <div className="wc-card-metric">
                    <span className="wc-card-metric-value">{card.metric.value}</span>
                    <span className="wc-card-metric-label">{card.metric.label}</span>
                  </div>
                  <svg className="wc-card-icon" viewBox="0 0 20 20" fill="none" aria-hidden>
                    <rect x="2" y="12" width="4" height="6" rx="1" fill="currentColor" />
                    <rect x="8" y="8"  width="4" height="10" rx="1" fill="currentColor" />
                    <rect x="14" y="4" width="4" height="14" rx="1" fill="currentColor" />
                  </svg>
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
