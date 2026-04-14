"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import type { CaseStudy } from "@/case-studies/omantel";
import { getCaseVisualsPresentation } from "@/case-studies/case-visuals";
import { DecisionBlock } from "./DecisionBlock";
import { MotionSection } from "./MotionSection";
import { MotionImage } from "./MotionImage";
import { Problem } from "./Problem";
import { parseBoldSpans } from "@/lib/case-rich-text";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  lockScrollForOverlay,
  unlockScrollForOverlay,
} from "@/lib/overlay-scroll-lock";
import { CaseContextSection } from "./CaseContextSection";
import { CaseUnderstandingBlock } from "./CaseUnderstandingBlock";
import { CaseConstraintsBlock } from "./CaseConstraintsBlock";
import { CaseProblemProcessVisual } from "./CaseProblemProcessVisual";

interface CaseMapProps {
  caseStudy: CaseStudy;
}

export function CaseMap({ caseStudy }: CaseMapProps) {
  const [noteworthyFullViewIndex, setNoteworthyFullViewIndex] = useState<
    number | null
  >(null);
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

  useEffect(() => {
    if (noteworthyFullViewIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setNoteworthyFullViewIndex(null);
    };
    lockScrollForOverlay();
    document.addEventListener("keydown", onKey);
    return () => {
      unlockScrollForOverlay();
      document.removeEventListener("keydown", onKey);
    };
  }, [noteworthyFullViewIndex]);

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

          {visualsPresentation.mode === "noteworthy" && (
            <div className="cs-noteworthy-grid cs-outcome-noteworthy">
              {visualsPresentation.slides.map(({ section, index }) => {
                const media = section.image || section.video;
                if (!media) return null;
                const caption =
                  section.image?.caption ?? section.video?.caption;
                return (
                  <button
                    key={index}
                    type="button"
                    className="cs-visual-frame cs-visual-clickable"
                    onClick={() => setNoteworthyFullViewIndex(index)}
                    aria-label={
                      section.image ? section.image.alt : "View video"
                    }
                  >
                    <div className="cs-noteworthy-card-fill">
                      <div className="cs-visual-img">
                        {section.image ? (
                          <img
                            src={section.image.src}
                            alt={section.image.alt}
                            className="w-full h-auto block object-contain"
                          />
                        ) : section.video ? (
                          <video
                            src={section.video.src}
                            className="w-full block"
                            muted
                            playsInline
                            preload="metadata"
                          />
                        ) : null}
                      </div>
                      {caption && (
                        <div className="cs-visual-caption">{caption}</div>
                      )}
                    </div>
                  </button>
                );
              })}

              {typeof document !== "undefined" &&
                noteworthyFullViewIndex !== null &&
                (() => {
                  const section =
                    caseStudy.visualsSections![noteworthyFullViewIndex];
                  if (!section) return null;
                  const caption =
                    section.image?.caption ?? section.video?.caption;
                  return createPortal(
                    <div
                      className="noteworthy-lightbox"
                      role="dialog"
                      aria-modal="true"
                      aria-label="Full view"
                      onClick={() => setNoteworthyFullViewIndex(null)}
                    >
                      <button
                        type="button"
                        className="noteworthy-lightbox-close"
                        onClick={(e) => {
                          e.stopPropagation();
                          setNoteworthyFullViewIndex(null);
                        }}
                        aria-label="Close"
                      >
                        <X size={24} strokeWidth={1.5} />
                      </button>
                      <div
                        className="noteworthy-lightbox-inner"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {section.image ? (
                          <img
                            src={section.image.src}
                            alt={section.image.alt}
                            className="noteworthy-lightbox-media"
                          />
                        ) : section.video ? (
                          <video
                            src={section.video.src}
                            controls
                            autoPlay
                            className="noteworthy-lightbox-media"
                          >
                            Your browser does not support the video tag.
                          </video>
                        ) : null}
                        {caption && (
                          <p className="noteworthy-lightbox-caption">
                            {caption}
                          </p>
                        )}
                      </div>
                    </div>,
                    document.body,
                  );
                })()}
            </div>
          )}
        </MotionSection>
      )}
    </div>
  );
}
