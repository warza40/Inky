"use client";

import type { CaseStudy } from "@/case-studies/omantel";
import { MotionSection } from "@/components/case/MotionSection";
import {
  OmantelJournalOverview,
  omantelJournalOverviewHasContent,
} from "./OmantelJournalOverview";
import { OmantelJournalProblem } from "./OmantelJournalProblem";
import { OmantelDecisionJournal } from "./OmantelDecisionJournal";
import { OmantelJournalOutcome } from "./OmantelJournalOutcome";
import { OmantelJournalFooter } from "./OmantelJournalFooter";
import { CaseNoteworthyIterations } from "@/components/case/CaseNoteworthyIterations";
import { getCaseVisualsPresentation } from "@/case-studies/case-visuals";

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
  const visualsPresentation = getCaseVisualsPresentation(caseStudy);

  const decisionsRailTitle = (
    <>
      <span className="cs-section-label-prefix">{`[${String(nDecisions).padStart(2, "0")}] `}</span>
      Key Decisions
    </>
  );

  return (
    <div className="ojo-case-map">
      {omantelJournalOverviewHasContent(caseStudy) ? (
        <MotionSection id="context" title="Context">
          <OmantelJournalOverview caseStudy={caseStudy} />
        </MotionSection>
      ) : null}

      {s.outcomeBeforeAfter ? (
        <MotionSection id="problem" title="Problem">
          <OmantelJournalProblem beforeAfter={s.outcomeBeforeAfter} />
        </MotionSection>
      ) : null}

      {nDecisions > 0 ? (
        <MotionSection
          id="decisions"
          title={decisionsRailTitle}
          className="ojo-decisions-wrap"
        >
          {s.decisions.map((decision, index) => (
            <div key={`${decision.title}-${index}`}>
              <OmantelDecisionJournal decision={decision} index={index} />
              {index < nDecisions - 1 ? (
                <div className="ojo-decision-sep" aria-hidden />
              ) : null}
            </div>
          ))}
        </MotionSection>
      ) : null}

      <MotionSection id="outcome" title="Outcome">
        <OmantelJournalOutcome
          highlights={s.outcomeHighlights}
          images={s.outcomeImages}
          reflection={s.reflection}
        />
        {visualsPresentation.mode === "noteworthy" ? (
          <div className="ojo-noteworthy-wrap">
            <p className="ojo-p-label">Noteworthy iterations</p>
            <CaseNoteworthyIterations caseStudy={caseStudy} />
          </div>
        ) : null}
      </MotionSection>

      <OmantelJournalFooter
        currentSlug={caseStudy.slug}
        nextSlugOverride={caseStudy.nextProjectSlug}
      />
    </div>
  );
}
