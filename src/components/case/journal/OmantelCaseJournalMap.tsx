"use client";

import type { CaseStudy } from "@/case-studies/omantel";
import { MotionSection } from "@/components/case/MotionSection";
import { OmantelJournalOverview } from "./OmantelJournalOverview";
import { OmantelJournalProblem } from "./OmantelJournalProblem";
import { OmantelDecisionJournal } from "./OmantelDecisionJournal";
import { OmantelJournalOutcome } from "./OmantelJournalOutcome";
import { OmantelJournalFooter } from "./OmantelJournalFooter";

const OMANTEL_SLUG = "omantel-bulk-activation";

interface OmantelCaseJournalMapProps {
  caseStudy: CaseStudy;
}

/** Omantel-only long-scroll journal layout; copy and images remain case data–driven */
export function OmantelCaseJournalMap({
  caseStudy,
}: OmantelCaseJournalMapProps) {
  if (caseStudy.slug !== OMANTEL_SLUG) return null;

  const s = caseStudy.sections;
  const nDecisions = s.decisions.length;

  return (
    <div className="ojo-case-map">
      <OmantelJournalOverview caseStudy={caseStudy} />

      {s.outcomeBeforeAfter ? (
        <OmantelJournalProblem beforeAfter={s.outcomeBeforeAfter} />
      ) : null}

      {nDecisions > 0 ? (
        <section
          id="decisions"
          className="cs-section ojo-decisions-wrap"
          aria-labelledby="ojo-decisions-heading"
        >
          <div className="ojo-decisions-header">
            <div className="ojo-s-label" id="ojo-decisions-heading">
              <span>[{String(nDecisions).padStart(2, "0")}]</span>
              <span className="ojo-s-label-title">Key Decisions</span>
            </div>
          </div>
          {s.decisions.map((decision, index) => (
            <div key={`${decision.title}-${index}`}>
              <OmantelDecisionJournal decision={decision} index={index} />
              {index < nDecisions - 1 ? (
                <div className="ojo-decision-sep" aria-hidden />
              ) : null}
            </div>
          ))}
        </section>
      ) : null}

      <MotionSection id="outcome" title="Outcome">
        <OmantelJournalOutcome
          highlights={s.outcomeHighlights}
          images={s.outcomeImages}
          reflection={s.reflection}
        />
      </MotionSection>

      <OmantelJournalFooter
        currentSlug={caseStudy.slug}
        nextSlugOverride={caseStudy.nextProjectSlug}
      />
    </div>
  );
}
