import type { CaseStudy } from "@/case-studies/omantel";
import { GlancePanel, type GlanceRow } from "@/components/case/GlancePanel";
import { ImpactStatPanel } from "@/components/case/ImpactStatPanel";
import { SectionHeader } from "@/components/sheets/SectionHeader";
import { CaseHeroMedia } from "./CaseHeroMedia";

const PROTOTYPE_NDA_LINE =
  "Details shared under NDA — prototype walkthrough available.";

const OMANTEL_AT_A_GLANCE_TITLE =
  "Enterprise reps submit and track bulk SIM batches without Omantel staff";

/**
 * tldrNotes has no label in the case data.
 * Placeholder for the copywriter to confirm.
 */
const TLDR_NOTES_LABEL = "Constraints";

function formatLabel(str: string): string {
  return str.replace(/\s+/g, " ").trim();
}

export function CaseStudyHero({
  title,
  metaLine,
  lede,
  caseStudy,
  facts,
  includeImpact,
}: {
  title: string;
  metaLine?: string;
  lede?: string;
  caseStudy: CaseStudy;
  facts: readonly GlanceRow[];
  includeImpact: boolean;
}) {
  const isOmantel = caseStudy.slug === "omantel-bulk-activation";
  const pills = caseStudy.heroPills ?? [];
  const impact = caseStudy.sections.journalImpact?.blocks ?? [];
  const showImpact = includeImpact && impact.length > 0;
  const glanceRows = isOmantel ? (caseStudy.tldr ?? []) : facts;
  const prototypeHref = caseStudy.prototypeHref?.trim() ?? "";
  const showOverview =
    isOmantel || glanceRows.some((row) => row.value.trim()) || showImpact;

  return (
    <div className="case-study-intro-sheet paper-content-sheet">
      <div className="case-study-intro-copy">
        {metaLine ? <p className="case-study-intro-meta">{metaLine}</p> : null}
        <h1 className="case-study-intro-title">{formatLabel(title)}</h1>
        <div className="case-study-intro-main">
          {lede ? <p className="case-study-intro-lede">{lede}</p> : null}
          {pills.length > 0 ? (
            <ul className="case-study-intro-pills">
              {pills.map((pill) => (
                <li key={pill}>
                  <span className="site-badge site-badge--tag">{pill}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
      {caseStudy.heroImage ? (
        <CaseHeroMedia
          src={caseStudy.heroImage.src}
          alt={caseStudy.heroImage.alt}
        />
      ) : null}
      {showOverview ? (
        <section
          id={isOmantel ? "tldr" : undefined}
          className="case-study-hero-overview"
        >
          {isOmantel ? (
            <SectionHeader number="01" title={OMANTEL_AT_A_GLANCE_TITLE} />
          ) : null}
          <div className="case-study-hero-overview-body">
            <GlancePanel
              rows={glanceRows}
              notes={isOmantel ? caseStudy.tldrNotes : undefined}
              notesLabel={isOmantel ? TLDR_NOTES_LABEL : undefined}
            />
            {isOmantel ? (
              <p className="om-note" data-prototype-slot="omantel">
                {prototypeHref ? (
                  <a href={prototypeHref}>{PROTOTYPE_NDA_LINE}</a>
                ) : (
                  PROTOTYPE_NDA_LINE
                )}
              </p>
            ) : null}
            {showImpact ? <ImpactStatPanel blocks={impact} /> : null}
          </div>
        </section>
      ) : null}
    </div>
  );
}
