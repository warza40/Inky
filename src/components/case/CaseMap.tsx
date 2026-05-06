"use client";

import type { CaseStudy } from "@/case-studies/omantel";
import { getCaseVisualsPresentation } from "@/case-studies/case-visuals";
import { DecisionBlock } from "./DecisionBlock";
import { MotionSection } from "./MotionSection";
import { MotionImage } from "./MotionImage";
import { Problem } from "./Problem";
import { parseBoldSpans } from "@/lib/case-rich-text";
import { cn } from "@/lib/utils";
import { CaseContextSection } from "./CaseContextSection";
import { CaseUnderstandingBlock } from "./CaseUnderstandingBlock";
import { CaseConstraintsBlock } from "./CaseConstraintsBlock";
import { CaseProblemProcessVisual } from "./CaseProblemProcessVisual";
import { CaseNoteworthyIterations } from "./CaseNoteworthyIterations";
import { OmantelCaseJournalMap } from "@/components/case/journal/OmantelCaseJournalMap";

const OMANTEL_JOURNAL_SLUG = "omantel-bulk-activation";

interface CaseMapProps {
  caseStudy: CaseStudy;
}

export function CaseMap({ caseStudy }: CaseMapProps) {
  const visualsPresentation = getCaseVisualsPresentation(caseStudy);
  const s = caseStudy.sections;

  const hasProblemSection =
    s.problem.length > 0 ||
    Boolean(s.understanding) ||
    s.constraints.length > 0 ||
    Boolean(s.problemProcessVisual);
  const hasDecisionsSection =
    s.decisions.length > 0 || Boolean(s.reportCategories?.length);
  const showOutcomeSection =
    Boolean(s.outcome) ||
    Boolean(s.outcomeBeforeAfter) ||
    Boolean(s.outcomeHighlights?.length) ||
    Boolean(s.reflection) ||
    visualsPresentation.mode !== "none";

  if (caseStudy.slug === OMANTEL_JOURNAL_SLUG) {
    return <OmantelCaseJournalMap caseStudy={caseStudy} />;
  }

  return (
    <div>
      <CaseContextSection caseStudy={caseStudy} />

      {hasProblemSection && (
        <MotionSection id="problem" title="Problem">
          {s.problem.length > 0 ? <Problem problem={s.problem} /> : null}
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
        </MotionSection>
      )}

      {hasDecisionsSection && (
        <MotionSection
          id="decisions"
          title="Decisions"
          className={
            caseStudy.slug === "disaster-recovery"
              ? "cs-key-decisions-dr"
              : undefined
          }
        >
          {s.reportCategories && s.reportCategories.length > 0 && (
            <div className="cs-report-categories-wrap cs-report-before-decisions">
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
          )}
          <div className="cs-decisions-stack">
            {s.decisions.map((decision, index) => (
              <DecisionBlock key={index} decision={decision} index={index} />
            ))}
          </div>
        </MotionSection>
      )}

      {showOutcomeSection && (
        <MotionSection id="outcome" title="Outcome">
          {s.outcomeImages && s.outcomeImages.length > 0 && (
            <div
              className={cn(
                "cs-outcome-visual-wrap cs-outcome-visual-wrap--lead",
                caseStudy.slug === "disaster-recovery" &&
                  "cs-outcome-visual-wrap--intrinsic",
              )}
            >
              {s.outcomeImages.map((image, imageIndex) => {
                const isVideo = /\.(mov|mp4|webm)(\?|$)/i.test(image.src);
                return (
                  <div
                    key={`${image.src}-${imageIndex}`}
                    className="cs-visual-frame"
                  >
                    <div
                      className={
                        caseStudy.slug === "disaster-recovery"
                          ? "cs-visual-img cs-visual-img--contain"
                          : "cs-visual-img"
                      }
                    >
                      {isVideo ? (
                        <video
                          src={image.src}
                          controls
                          playsInline
                          className="w-full aspect-video object-contain"
                          aria-label={image.alt}
                        />
                      ) : caseStudy.slug === "disaster-recovery" ? (
                        <MotionImage
                          src={image.src}
                          alt={image.alt}
                          caption={image.caption}
                          intrinsic
                          lightbox
                        />
                      ) : (
                        <div className="relative w-full aspect-video">
                          <MotionImage
                            src={image.src}
                            alt={image.alt}
                            caption={image.caption}
                            fill
                            objectFit="contain"
                            lightbox
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {s.outcomeBeforeAfter ? (
            <div className="cs-outcome-ba">
              <div className="cs-outcome-ba-block cs-outcome-ba-block--before">
                <span className="cs-outcome-ba-label">Before</span>
                <p className="cs-outcome-ba-body">
                  {s.outcomeBeforeAfter.before}
                </p>
              </div>
              <div className="cs-outcome-ba-block cs-outcome-ba-block--after">
                <span className="cs-outcome-ba-label">After</span>
                <p className="cs-outcome-ba-body">
                  {s.outcomeBeforeAfter.after}
                </p>
              </div>
            </div>
          ) : null}

          {s.outcomeHighlights && s.outcomeHighlights.length > 0 ? (
            <ul className="cs-outcome-highlight-list" role="list">
              {s.outcomeHighlights.map((line, i) => (
                <li key={i} className="cs-outcome-highlight-item">
                  {line}
                </li>
              ))}
            </ul>
          ) : null}

          {s.outcome ? (
            <div
              className={cn(
                "case-body opacity-90",
                s.outcomeImages &&
                  s.outcomeImages.length > 0 &&
                  "cs-outcome-copy-after-visuals",
              )}
            >
              {(() => {
                const lines = s.outcome
                  .split("\n")
                  .filter((line) => line.trim());
                const bulletPoints: string[] = [];
                const textParts: string[] = [];

                lines.forEach((line) => {
                  const trimmed = line.trim();
                  if (trimmed.startsWith("•")) {
                    bulletPoints.push(trimmed.replace(/^•\s*/, ""));
                  } else if (trimmed) {
                    textParts.push(trimmed);
                  }
                });

                return (
                  <>
                    {textParts.map((para, paraIndex) => (
                      <p key={paraIndex} className="mb-4">
                        {para}
                      </p>
                    ))}
                    {bulletPoints.length > 0 && (
                      <ul
                        className={cn(
                          "cs-outcome-list",
                          s.outcomeImages?.length &&
                            "cs-outcome-list--with-visuals",
                        )}
                      >
                        {bulletPoints.map((point, pointIndex) => (
                          <li
                            key={pointIndex}
                            className="cs-outcome-result-item"
                          >
                            {parseBoldSpans(point)}
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                );
              })()}
              {s.outcomePill ? (
                <div className="cs-outcome-pill">{s.outcomePill}</div>
              ) : null}
            </div>
          ) : null}

          {s.reflection ? (
            <div className="cs-outcome-reflection">
              <h3 className="cs-reflection-label">
                What I&apos;d do differently
              </h3>
              <p className="case-body whitespace-pre-line opacity-90">
                {s.reflection}
              </p>
              {s.reflectionClosing ? (
                <p className="cs-reflection-closing">{s.reflectionClosing}</p>
              ) : null}
            </div>
          ) : null}

          {visualsPresentation.mode === "legacy" && (
            <div className="cs-outcome-extra-visuals space-y-6">
              {visualsPresentation.images.map((image, index) => (
                <MotionImage
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  caption={image.caption}
                  fill
                />
              ))}
            </div>
          )}

          <CaseNoteworthyIterations caseStudy={caseStudy} />
        </MotionSection>
      )}
    </div>
  );
}
