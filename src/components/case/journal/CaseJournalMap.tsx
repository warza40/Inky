"use client";

import type { CaseStudy } from "@/case-studies/omantel";
import { MotionSection } from "@/components/case/MotionSection";
import {
  CaseJournalOverview,
  caseJournalOverviewHasContent,
} from "./CaseJournalOverview";
import { OmantelJournalProblem } from "./OmantelJournalProblem";
import { OmantelDecisionJournal } from "./OmantelDecisionJournal";
import { OmantelJournalOutcome } from "./OmantelJournalOutcome";
import { OmantelJournalFooter } from "./OmantelJournalFooter";
import { CaseNoteworthyIterations } from "@/components/case/CaseNoteworthyIterations";
import { getCaseVisualsPresentation } from "@/case-studies/case-visuals";
import { Problem } from "@/components/case/Problem";
import { CaseUnderstandingBlock } from "@/components/case/CaseUnderstandingBlock";
import { CaseProblemProcessVisual } from "@/components/case/CaseProblemProcessVisual";
import { CaseConstraintsBlock } from "@/components/case/CaseConstraintsBlock";
import { CaseJournalOutcomeSupplement } from "./CaseJournalOutcomeSupplement";
import { cn } from "@/lib/utils";

interface CaseJournalMapProps {
  caseStudy: CaseStudy;
}

export function CaseJournalMap({ caseStudy }: CaseJournalMapProps) {
  const s = caseStudy.sections;
  const visualsPresentation = getCaseVisualsPresentation(caseStudy);
  const nDecisions = s.decisions.length;
  const hasReportCategories = Boolean(s.reportCategories?.length);

  const hasLegacyProblemStack =
    s.problem.length > 0 ||
    Boolean(s.understanding) ||
    s.constraints.length > 0 ||
    Boolean(s.problemProcessVisual);

  const hasProblemSection =
    hasLegacyProblemStack || Boolean(s.outcomeBeforeAfter);

  const hasDecisionsSection = nDecisions > 0 || hasReportCategories;

  const showOutcomeSection =
    Boolean(s.outcome) ||
    Boolean(s.outcomeBeforeAfter) ||
    Boolean(s.outcomeHighlights?.length) ||
    Boolean(s.reflection) ||
    visualsPresentation.mode !== "none";

  const decisionsRailTitle =
    nDecisions > 0 ? (
      <>
        <span className="cs-section-label-prefix">{`[${String(nDecisions).padStart(2, "0")}]`}</span>
        Key Decisions
      </>
    ) : (
      <>Key Decisions</>
    );

  return (
    <div className="ojo-case-map">
      {caseJournalOverviewHasContent(caseStudy) ? (
        <MotionSection id="context" title="Context">
          <CaseJournalOverview caseStudy={caseStudy} />
        </MotionSection>
      ) : null}

      {hasProblemSection ? (
        <MotionSection id="problem" title="Problem">
          {s.outcomeBeforeAfter ? (
            <OmantelJournalProblem beforeAfter={s.outcomeBeforeAfter} />
          ) : null}
          {hasLegacyProblemStack ? (
            <div
              className={cn(
                "ojo-problem-section",
                s.outcomeBeforeAfter &&
                  "ojo-problem-section--legacy-follows-ba",
              )}
            >
              <div className="ojo-problem-legacy-insert ojo-paper ojo-paper-shadow">
                <div
                  className="ojo-punch-holes ojo-punch-holes--dual"
                  aria-hidden
                >
                  <span className="ojo-punch-hole" />
                  <span className="ojo-punch-hole" />
                </div>
                <div className="ojo-problem-legacy-stack">
                  {s.problem.length > 0 ? (
                    <Problem problem={s.problem} />
                  ) : null}
                  {s.understanding ? (
                    <CaseUnderstandingBlock
                      slug={caseStudy.slug}
                      understanding={s.understanding}
                    />
                  ) : null}
                  {s.problemProcessVisual ? (
                    <CaseProblemProcessVisual
                      src={s.problemProcessVisual.src}
                      alt={s.problemProcessVisual.alt}
                      caption={s.problemProcessVisual.caption}
                    />
                  ) : null}
                  <CaseConstraintsBlock constraints={s.constraints} />
                </div>
              </div>
            </div>
          ) : null}
        </MotionSection>
      ) : null}

      {hasDecisionsSection ? (
        <MotionSection
          id="decisions"
          title={decisionsRailTitle}
          className={cn(
            "ojo-decisions-wrap",
            caseStudy.slug === "disaster-recovery" && "cs-key-decisions-dr",
          )}
        >
          {hasReportCategories && s.reportCategories ? (
            <div className="cs-report-categories-wrap cs-report-before-decisions ojo-journal-report-categories">
              <div className="cs-report-grid">
                {s.reportCategories.map((item, i) => (
                  <div key={i} className="cs-report-card">
                    <div className="cs-report-num" aria-hidden>
                      {item.num}
                    </div>
                    <div className="cs-report-body">
                      <div className="cs-report-title">{item.title}</div>
                      <p className="cs-report-desc">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {nDecisions > 0
            ? s.decisions.map((decision, index) => (
                <div
                  key={`${decision.title}-${index}`}
                  className={cn(index > 0 && "ojo-decision-follow")}
                >
                  <OmantelDecisionJournal decision={decision} index={index} />
                </div>
              ))
            : null}
        </MotionSection>
      ) : null}

      {showOutcomeSection ? (
        <MotionSection id="outcome" title="Outcome">
          <OmantelJournalOutcome
            highlights={s.outcomeHighlights}
            images={s.outcomeImages}
            reflection={s.reflection}
            reflectionClosing={s.reflectionClosing}
            outcomeNarrative={s.outcome}
            outcomePill={s.outcomePill}
          />
          <CaseJournalOutcomeSupplement
            caseStudy={caseStudy}
            visualsPresentation={visualsPresentation}
          />
          {visualsPresentation.mode === "noteworthy" ? (
            <div className="ojo-noteworthy-wrap">
              <div className="cs-section-head ojo-noteworthy-rail-head">
                <h3 className="cs-section-label">Noteworthy iterations</h3>
              </div>
              <CaseNoteworthyIterations caseStudy={caseStudy} />
            </div>
          ) : null}
        </MotionSection>
      ) : null}

      <OmantelJournalFooter
        currentSlug={caseStudy.slug}
        nextSlugOverride={caseStudy.nextProjectSlug}
      />
    </div>
  );
}
