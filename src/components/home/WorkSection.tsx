"use client";

import { useState } from "react";
import Link from "next/link";
import { JournalSectionHeader } from "@/components/home/JournalSectionHeader";
import { omantelCaseCardImageSrc } from "@/case-studies/omantel-card-preview";

interface GraphSeg {
  flex: number;
  color: string;
}

type JournalTape = "red" | "teal" | "gold";

type JournalHeroGlyph = "wireframe" | "grid";

interface WorkCardJournal {
  /** Featured hero strip (bottom-right, small caps) */
  heroMeta?: string;
  indexLabel?: string;
  clientLine?: string;
  quote?: string;
  statusLine?: string;
  skillTags?: string[];
  tape?: JournalTape;
  /** Journal-only title line (reference layout) */
  displayTitle?: string;
  hideHeroImage?: boolean;
  /**
   * Featured strip: show `imageSrc` as a real screenshot (no wireframe glyph,
   * full-opacity image + light bottom scrim for meta text).
   */
  heroCoverPhoto?: boolean;
  /** Serif title line with optional bold + italic segments (featured / minimal paper) */
  titleHighlight?: { strong: string; em?: string; rest: string };
  /** Use large featured strip + full-width row (without requiring a quote rail) */
  featuredLayout?: boolean;
  /** Paper: title only, no body / tags / rail (e.g. experiments WIP) */
  paperMinimal?: boolean;
  wipStamp?: boolean;
  heroGlyph?: JournalHeroGlyph;
  /** Static card — no navigation */
  noLink?: boolean;
}

interface WorkCard {
  slug: string;
  category: string;
  categoryDetail?: string;
  tag:
    | "enterprise"
    | "research"
    | "strategy"
    | "systems"
    | "all"
    | "experiments";
  title: string;
  description: string;
  imageBg: string;
  /** Case study preview image from /public */
  imageSrc?: string;
  graph: GraphSeg[];
  href: string;
  journal?: WorkCardJournal;
}

const WORK: WorkCard[] = [
  {
    slug: "omantel-bulk-activation",
    category: "Enterprise",
    categoryDetail: "Telecom",
    tag: "enterprise",
    title:
      "Redesigning the bulk SIM activation experience from a manual process to an automated one.",
    description:
      "Thousands of SIM activations, processed manually. One invalid record was enough to restart the entire process.",
    imageBg: "#1c1812",
    imageSrc: omantelCaseCardImageSrc,
    graph: [
      { flex: 1, color: "#8aa0b4" },
      { flex: 2, color: "#b84c3a" },
      { flex: 3, color: "#d4705e" },
      { flex: 4, color: "#8a9e78" },
    ],
    href: "/case/omantel-bulk-activation",
    journal: {
      tape: "red",
    },
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
    journal: { tape: "teal" },
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
    journal: { tape: "teal" },
  },
];

const EXPERIMENTS: WorkCard[] = [
  {
    slug: "warmth-design-system",
    category: "Personal",
    categoryDetail: "AI-native",
    tag: "experiments",
    title: "Warmth DS — Design System built with Claude & Figma MCP",
    description: "",
    imageBg: "#2a1f3f",
    graph: [
      { flex: 1, color: "#4a3d6a" },
      { flex: 1, color: "#5c4a7a" },
      { flex: 1, color: "#6b5b8a" },
    ],
    href: "/experiments",
    journal: {
      heroMeta: "DESIGN SYSTEM · FIGMA VARIABLES",
      tape: "teal",
      hideHeroImage: true,
      featuredLayout: true,
      paperMinimal: true,
      wipStamp: true,
      heroGlyph: "grid",
      titleHighlight: {
        strong: "Warmth DS",
        em: "Design System",
        rest: " built with Claude & Figma MCP",
      },
      noLink: true,
    },
  },
];

const TABS = [
  { label: "Case Studies", value: "all" },
  { label: "Exploration", value: "experiments" },
] as const;

function WireframeLayoutIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="120"
      height="88"
      viewBox="0 0 120 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        x="8"
        y="10"
        width="104"
        height="68"
        rx="2"
        stroke="rgba(240, 232, 220, 0.45)"
        strokeWidth="1.25"
      />
      <path
        d="M8 28h104M36 28v58M92 41h20M92 53h14M92 65h18"
        stroke="rgba(240, 232, 220, 0.35)"
        strokeWidth="1"
      />
      <rect
        x="14"
        y="16"
        width="48"
        height="8"
        rx="1"
        stroke="rgba(240, 232, 220, 0.3)"
        strokeWidth="1"
      />
    </svg>
  );
}

function DesignSystemGridGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="112"
      height="72"
      viewBox="0 0 112 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {[0, 1].map((row) =>
        [0, 1, 2].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={12 + col * 34}
            y={14 + row * 28}
            width="26"
            height="22"
            rx="3"
            stroke="rgba(240, 232, 220, 0.52)"
            strokeWidth="1.25"
          />
        )),
      )}
    </svg>
  );
}

/** Dark tile panel — classic homepage cards */
function TilePanel({
  rows,
  cols,
  bg,
  graph,
  imageSrc,
  imagePriority,
  journalCompact,
}: {
  rows: number;
  cols: number;
  bg: string;
  graph: GraphSeg[];
  imageSrc?: string;
  imagePriority?: boolean;
  /** Journal: hide phase bar / simplify for blueprint strip */
  journalCompact?: boolean;
}) {
  return (
    <div
      className={`wc-tile-panel${imageSrc ? " wc-tile-panel--has-image" : ""}${journalCompact ? " jl-wc-tile-panel--journal" : ""}`}
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
      {!journalCompact ? (
        <div className="wc-content-graph">
          {graph.map((seg, i) => (
            <div
              key={i}
              className="wcg-seg"
              style={{ flex: seg.flex, background: seg.color }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function JournalTape({ variant }: { variant: JournalTape }) {
  return <span className={`jl-wc-tape jl-wc-tape--${variant}`} aria-hidden />;
}

function JournalPaperTitle({
  card,
  journal,
}: {
  card: WorkCard;
  journal: WorkCardJournal;
}) {
  const hl = journal.titleHighlight;
  let cls = "jl-wc-paper-title";
  if (hl) cls += " jl-wc-paper-title--highlight";

  if (hl) {
    return (
      <h3 className={cls}>
        <strong className="jl-wc-paper-title-strong">{hl.strong}</strong>
        {hl.em ? (
          <>
            {" "}
            <span className="jl-wc-paper-title-sep" aria-hidden>
              —
            </span>{" "}
            <em className="jl-wc-paper-title-em">{hl.em}</em>
          </>
        ) : null}
        {hl.rest}
      </h3>
    );
  }

  const t = journal.displayTitle ?? card.title;
  return <h3 className={cls}>{t}</h3>;
}

/** Featured reference: solid hero + meta, cream two-column paper body */
function JournalFeaturedCard({
  card,
  ariaIndex,
}: {
  card: WorkCard;
  ariaIndex: number;
}) {
  const j = card.journal!;
  const indexLine = `${j.indexLabel ?? String(ariaIndex + 1).padStart(2, "0")}`;

  const hero = (
    <div
      className={`jl-wc-hero jl-wc-hero--featured${j.heroCoverPhoto ? " jl-wc-hero--cover-photo" : ""}`}
      style={{ backgroundColor: card.imageBg }}
    >
      <JournalTape variant={j.tape ?? "red"} />
      {card.imageSrc && !j.hideHeroImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="jl-wc-hero-faded-img"
          src={card.imageSrc}
          alt=""
          loading="eager"
          decoding="async"
        />
      ) : null}
      {j.heroGlyph === "grid" ? (
        <DesignSystemGridGlyph className="jl-wc-hero-wireframe jl-wc-hero-glyph-grid" />
      ) : !j.heroCoverPhoto ? (
        <WireframeLayoutIcon className="jl-wc-hero-wireframe" />
      ) : null}
      {j.heroMeta ? <p className="jl-wc-hero-meta">{j.heroMeta}</p> : null}
    </div>
  );

  const paper = j.paperMinimal ? (
    <div className="jl-wc-paper jl-wc-paper--minimal">
      <JournalPaperTitle card={card} journal={j} />
      {j.wipStamp ? <p className="jl-wc-wip-stamp">Work In Progress</p> : null}
    </div>
  ) : (
    <div className="jl-wc-paper jl-wc-paper--split">
      <p className="jl-wc-num-line">{indexLine}</p>
      <div className="jl-wc-split-col jl-wc-split-col--main">
        <JournalPaperTitle card={card} journal={j} />
        <p className="jl-wc-paper-desc">{card.description}</p>
        {j.skillTags && j.skillTags.length > 0 ? (
          <ul className="jl-wc-skill-tags" role="list">
            {j.skillTags.map((t) => (
              <li key={t} className="jl-wc-skill-tag">
                {t}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className="jl-wc-split-col jl-wc-split-col--rail">
        {j.clientLine ? (
          <p className="jl-wc-client-line">{j.clientLine}</p>
        ) : null}
        {j.quote ? (
          <blockquote className="jl-wc-quote">{j.quote}</blockquote>
        ) : null}
        {j.statusLine ? (
          <p className="jl-wc-status-line">{j.statusLine}</p>
        ) : null}
      </div>
    </div>
  );

  const inner = (
    <>
      {hero}
      {paper}
    </>
  );

  const className = "wc-card jl-wc-card jl-wc-card--featured";
  if (j.noLink) {
    return (
      <div className={className} role="article" aria-label={card.title}>
        {inner}
      </div>
    );
  }

  return (
    <Link href={card.href} className={className} aria-label={card.title}>
      {inner}
    </Link>
  );
}

/** Compact row: taped hero strip + cream panel (single column) */
function JournalCompactCard({
  card,
  visualIndex,
  imagePriority,
}: {
  card: WorkCard;
  visualIndex: number;
  imagePriority?: boolean;
}) {
  const j = card.journal;
  const tape: JournalTape = j?.tape ?? "teal";
  const idx = `${String(visualIndex + 1).padStart(2, "0")}`;
  const miniTags = [card.category, card.categoryDetail].filter(
    Boolean,
  ) as string[];

  return (
    <Link
      href={card.href}
      className="wc-card jl-wc-card jl-wc-card--compact"
      aria-label={card.title}
    >
      <div className="jl-wc-hero-wrap">
        <JournalTape variant={tape} />
        <TilePanel
          rows={5}
          cols={7}
          bg={card.imageBg}
          graph={card.graph}
          imageSrc={card.imageSrc}
          imagePriority={imagePriority}
          journalCompact
        />
      </div>
      <div className="jl-wc-paper jl-wc-paper--compact">
        <p className="jl-wc-num-line">{idx}</p>
        <h3 className="jl-wc-paper-title jl-wc-paper-title--compact">
          {card.title}
        </h3>
        <p className="jl-wc-paper-desc">{card.description}</p>
        <ul className="jl-wc-skill-tags jl-wc-skill-tags--mini" role="list">
          {miniTags.map((t) => (
            <li key={t} className="jl-wc-skill-tag">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}

export function WorkSection({
  journalLayout = false,
}: {
  journalLayout?: boolean;
}) {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filtered =
    activeTab === "all"
      ? WORK
      : journalLayout
        ? EXPERIMENTS
        : WORK.filter((c) => c.tag === activeTab);

  const isFeaturedJournalCard = (c: WorkCard) =>
    Boolean(c.journal?.featuredLayout);

  const journalCard = (card: WorkCard, indexInFiltered: number) => {
    if (isFeaturedJournalCard(card)) {
      return (
        <JournalFeaturedCard
          key={card.slug}
          card={card}
          ariaIndex={indexInFiltered}
        />
      );
    }

    return (
      <JournalCompactCard
        key={card.slug}
        card={card}
        visualIndex={indexInFiltered}
        imagePriority={indexInFiltered === 0}
      />
    );
  };

  const cardLink = (card: WorkCard, index: number, extraClass?: string) => (
    <Link
      key={card.slug}
      href={card.href}
      className={`wc-card${extraClass ? ` ${extraClass}` : ""}`}
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
  );

  return (
    <section
      className={`work-section${journalLayout ? " jl-work-section" : ""}`}
      id="work"
      aria-label="Work"
    >
      {journalLayout ? (
        <div className="jl-work-section-inner">
          <JournalSectionHeader num="[02]" title="Work" />
          <nav className="work-tabs jl-work-tabs" aria-label="Filter work">
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

          <div className="work-divider" />

          {filtered.length > 0 ? (
            <div className="jl-work-subgrid">
              {filtered.map((card, index) => journalCard(card, index))}
            </div>
          ) : null}

          {filtered.length === 0 && (
            <p className="work-empty">No projects in this category yet.</p>
          )}
        </div>
      ) : (
        <>
          <div className="work-section-header">
            <div className="work-section-header-left">
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

          {filtered.length > 0 && (
            <div className="work-grid">
              {filtered.map((card, index) => cardLink(card, index))}
            </div>
          )}

          {filtered.length === 0 && (
            <p className="work-empty">No projects in this category yet.</p>
          )}
        </>
      )}
    </section>
  );
}
