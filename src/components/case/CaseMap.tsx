"use client";

import { useState } from "react";
import type { CaseStudy } from "@/case-studies/omantel";
import { Collapsible } from "./Collapsible";
import { DecisionBlock } from "./DecisionBlock";
import { MotionSection } from "./MotionSection";
import { MotionImage } from "./MotionImage";
import { Problem } from "./Problem";
import { X } from "lucide-react";

interface CaseMapProps {
  caseStudy: CaseStudy;
}

export function CaseMap({ caseStudy }: CaseMapProps) {
  const [noteworthyFullViewIndex, setNoteworthyFullViewIndex] = useState<number | null>(null);

  return (
    <div>
      {/* Problem Section */}
      {caseStudy.sections.problem.length > 0 && (
        <MotionSection id="problem" title="Problem">
          <Problem problem={caseStudy.sections.problem} />
        </MotionSection>
      )}

      {/* Understanding Section (collapsible) */}
      {caseStudy.sections.understanding && (
        <MotionSection id="understanding" title={caseStudy.sections.understanding.title}>
          <Collapsible title={caseStudy.sections.understanding.title} hideTitle>
            <div className="case-body text-neutral-700 dark:text-neutral-300">
              {(() => {
                const lines = caseStudy.sections.understanding.content
                  .split("\n")
                  .filter((line) => line.trim());
                const bulletPoints: string[] = [];
                const textParts: string[] = [];
                let showDividerAfterVisuals = false;
                lines.forEach((line) => {
                  const trimmed = line.trim();
                  if (trimmed.startsWith("•")) {
                    bulletPoints.push(trimmed.replace(/^•\s*/, ""));
                  } else if (trimmed === "---") {
                    showDividerAfterVisuals = true;
                  } else if (trimmed) {
                    textParts.push(trimmed);
                  }
                });
                const images = caseStudy.sections.understanding.images ?? [];
                const hasVisualsBlock = showDividerAfterVisuals || images.length > 0;
                return (
                  <>
                    {textParts.map((para, i) => (
                      <p key={i} className="mb-4">
                        {para}
                      </p>
                    ))}
                    {bulletPoints.length > 0 && (
                      <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                        {bulletPoints.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    )}
                    {caseStudy.sections.understanding.expandedContent && (
                      <p className="mt-4 case-body text-neutral-600 dark:text-neutral-400 italic">
                        {caseStudy.sections.understanding.expandedContent}
                      </p>
                    )}
                    {hasVisualsBlock && (
                      <div className="case-divider mt-6 pt-6 border-t border-[var(--case-border)] space-y-6">
                        {caseStudy.sections.understanding.visualsTitle && (
                          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                            {caseStudy.sections.understanding.visualsTitle}
                          </h3>
                        )}
                        {images.length > 0 ? (
                          images.map((img, idx) => (
                            <div key={idx} className="w-full">
                              {img.src ? (
                                <MotionImage
                                  src={img.src}
                                  alt={img.alt ?? "Understanding visual"}
                                  caption={img.caption}
                                  fill
                                  objectFit="contain"
                                  lightbox
                                  hoverTooltip={img.hoverTooltip}
                                />
                              ) : (
                                <div className="w-full aspect-video rounded-xl border border-[var(--case-border)] bg-[var(--background)]" />
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="min-h-[120px] rounded-xl border border-[var(--case-border)] bg-[var(--background)]" aria-label="Visuals placeholder" />
                        )}
                      </div>
                    )}
                    {showDividerAfterVisuals && (
                      <hr className="border-[var(--case-border)] my-6" aria-hidden />
                    )}
                    {showDividerAfterVisuals &&
                      caseStudy.sections.understanding.afterDivider && (
                        <div className="mt-6">
                          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                            {caseStudy.sections.understanding.afterDivider.title}
                          </h3>
                          {caseStudy.sections.understanding.afterDivider.goal && (
                            <p className="mb-4">
                              <span className="font-bold text-neutral-800 dark:text-neutral-200">Goal :</span>{" "}
                              {caseStudy.sections.understanding.afterDivider.goal}
                            </p>
                          )}
                          {caseStudy.sections.understanding.afterDivider.content && (
                            <p className="mb-4">
                              {caseStudy.sections.understanding.afterDivider.content}
                            </p>
                          )}
                          {caseStudy.sections.understanding.afterDivider.bullets &&
                            caseStudy.sections.understanding.afterDivider.bullets.length > 0 && (
                              <ul className="list-disc list-inside space-y-2 ml-4">
                                {caseStudy.sections.understanding.afterDivider.bullets.map(
                                  (item, i) => (
                                    <li key={i}>{item}</li>
                                  )
                                )}
                              </ul>
                            )}
                        </div>
                      )}
                    {showDividerAfterVisuals &&
                      caseStudy.sections.understanding.afterDivider && (
                        <hr className="border-[var(--case-border)] my-6" aria-hidden />
                      )}
                    {showDividerAfterVisuals &&
                      caseStudy.sections.understanding.afterApproachDivider && (
                        <div className="mt-6">
                          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                            {caseStudy.sections.understanding.afterApproachDivider.title}
                          </h3>
                          <div className="space-y-4">
                            {caseStudy.sections.understanding.afterApproachDivider.content
                              .split("\n\n")
                              .filter((p) => p.trim())
                              .map((para, i) => (
                                <p key={i} className="mb-0">
                                  {para.trim()}
                                </p>
                              ))}
                          </div>
                        </div>
                      )}
                    {caseStudy.sections.understanding.afterSecondaryResearchDivider && (
                      <>
                        <hr className="border-[var(--case-border)] my-6" aria-hidden />
                        <div className="mt-6">
                          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                            {caseStudy.sections.understanding.afterSecondaryResearchDivider.title}
                          </h3>
                          {caseStudy.sections.understanding.afterSecondaryResearchDivider.intro && (
                            <div className="space-y-4 mb-4">
                              {caseStudy.sections.understanding.afterSecondaryResearchDivider.intro
                                .split("\n\n")
                                .filter((p) => p.trim())
                                .map((para, i) => (
                                  <p key={i} className="mb-0">
                                    {para.trim()}
                                  </p>
                                ))}
                            </div>
                          )}
                          {caseStudy.sections.understanding.afterSecondaryResearchDivider.bullets &&
                            caseStudy.sections.understanding.afterSecondaryResearchDivider.bullets
                              .length > 0 && (
                              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                                {caseStudy.sections.understanding.afterSecondaryResearchDivider.bullets.map(
                                  (item, i) => (
                                    <li key={i}>{item}</li>
                                  )
                                )}
                              </ul>
                            )}
                          {caseStudy.sections.understanding.afterSecondaryResearchDivider.content && (
                            <div className="space-y-4">
                              {caseStudy.sections.understanding.afterSecondaryResearchDivider.content
                                .split("\n\n")
                                .filter((p) => p.trim())
                                .map((para, i) => (
                                  <p key={i} className="mb-0">
                                    {para.trim()}
                                  </p>
                                ))}
                            </div>
                          )}
                        </div>
                      </>
                    )}
                    {caseStudy.sections.understanding.afterPersonasDivider && (
                      <>
                        <hr className="border-[var(--case-border)] my-6" aria-hidden />
                        <div className="mt-6">
                          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                            {caseStudy.sections.understanding.afterPersonasDivider.title}
                          </h3>
                          {caseStudy.sections.understanding.afterPersonasDivider.intro && (
                            <div className="space-y-4 mb-4">
                              {caseStudy.sections.understanding.afterPersonasDivider.intro
                                .split("\n\n")
                                .filter((p) => p.trim())
                                .map((para, i) => (
                                  <p key={i} className="mb-0">
                                    {para.trim()}
                                  </p>
                                ))}
                            </div>
                          )}
                          {caseStudy.sections.understanding.afterPersonasDivider.bullets &&
                            caseStudy.sections.understanding.afterPersonasDivider.bullets.length >
                              0 && (
                              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                                {caseStudy.sections.understanding.afterPersonasDivider.bullets.map(
                                  (item, i) => (
                                    <li key={i}>{item}</li>
                                  )
                                )}
                              </ul>
                            )}
                          {caseStudy.sections.understanding.afterPersonasDivider.content && (
                            <div className="space-y-4">
                              {caseStudy.sections.understanding.afterPersonasDivider.content
                                .split("\n\n")
                                .filter((p) => p.trim())
                                .map((para, i) => (
                                  <p key={i} className="mb-0">
                                    {para.trim()}
                                  </p>
                                ))}
                            </div>
                          )}
                          {caseStudy.sections.understanding.afterPersonasDivider.images &&
                            caseStudy.sections.understanding.afterPersonasDivider.images.length >
                              0 && (
                              <div className="grid grid-cols-1 gap-4 w-full max-w-full mt-6">
                                {caseStudy.sections.understanding.afterPersonasDivider.images.map(
                                  (img, i) => (
                                    <MotionImage
                                      key={i}
                                      src={img.src}
                                      alt={img.alt ?? ""}
                                      caption={img.caption}
                                      fill
                                      objectFit="contain"
                                      lightbox
                                    />
                                  )
                                )}
                              </div>
                            )}
                          {(caseStudy.sections.understanding.afterPersonasDivider.workflowsIntro ||
                            caseStudy.sections.understanding.afterPersonasDivider.workflows?.length ||
                            caseStudy.sections.understanding.afterPersonasDivider.workflowsClosing) && (
                            <Collapsible
                              title="Exploring high frequency workflows"
                              className="mt-6"
                            >
                              <div className="case-body text-neutral-700 dark:text-neutral-300">
                                {caseStudy.sections.understanding.afterPersonasDivider.workflowsIntro && (
                                  <p className="mb-4">
                                    {caseStudy.sections.understanding.afterPersonasDivider.workflowsIntro}
                                  </p>
                                )}
                                {caseStudy.sections.understanding.afterPersonasDivider.workflows &&
                                  caseStudy.sections.understanding.afterPersonasDivider.workflows
                                    .length > 0 && (
                                    <ul className="space-y-4 mb-4 list-none ml-0">
                                      {caseStudy.sections.understanding.afterPersonasDivider.workflows.map(
                                        (item, i) => (
                                          <li key={i}>
                                            <strong className="text-neutral-900 dark:text-neutral-100">
                                              {item.title}
                                            </strong>
                                            <br />
                                            <span className="text-neutral-700 dark:text-neutral-300">
                                              {item.description}
                                            </span>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  )}
                                {caseStudy.sections.understanding.afterPersonasDivider.workflowsClosing && (
                                  <p className="mb-0">
                                    {
                                      caseStudy.sections.understanding.afterPersonasDivider
                                        .workflowsClosing
                                    }
                                  </p>
                                )}
                              </div>
                            </Collapsible>
                          )}
                        </div>
                      </>
                    )}
                  </>
                );
              })()}
            </div>
          </Collapsible>
        </MotionSection>
      )}

      {/* Constraints Section */}
      {caseStudy.sections.constraints.length > 0 && (
        <MotionSection id="constraints" title="Constraints">
          <div className="space-y-4">
            {caseStudy.sections.constraints.map((item, index) => {
              if (item.collapsible && item.title) {
                const lines = item.content.split('\n').filter(line => line.trim());
                const bulletPoints: string[] = [];
                const textParts: string[] = [];
                let conclusion = '';
                let foundBullets = false;
                
                lines.forEach((line) => {
                  const trimmed = line.trim();
                  if (trimmed.startsWith('•')) {
                    foundBullets = true;
                    bulletPoints.push(trimmed.replace(/^•\s*/, ''));
                  } else if (trimmed && !foundBullets) {
                    textParts.push(trimmed);
                  } else if (trimmed && foundBullets && !trimmed.startsWith('•')) {
                    conclusion = trimmed;
                  }
                });

                return (
                  <Collapsible key={index} title={item.title}>
                    <div className="case-body text-neutral-700 dark:text-neutral-300">
                      {textParts.map((para, paraIndex) => (
                        <p key={paraIndex} className="mb-4">{para}</p>
                      ))}
                      {bulletPoints.length > 0 && (
                        <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                          {bulletPoints.map((point, pointIndex) => (
                            <li key={pointIndex}>{point}</li>
                          ))}
                        </ul>
                      )}
                      {conclusion && (
                        <p className="mb-4">{conclusion}</p>
                      )}
                      {item.expandedContent && (
                        <p className="mt-4 case-body text-neutral-600 dark:text-neutral-400 italic">
                          {item.expandedContent}
                        </p>
                      )}
                    </div>
                  </Collapsible>
                );
              }
              return (
                <div key={index} className="mb-6">
                  {item.title && (
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                      {item.title}
                    </h3>
                  )}
                  <div className="case-body text-neutral-700 dark:text-neutral-300">
                    {(() => {
                      const lines = item.content.split('\n').filter(line => line.trim());
                      const bulletPoints: string[] = [];
                      const textParts: string[] = [];
                      let foundBullets = false;
                      
                      lines.forEach((line) => {
                        const trimmed = line.trim();
                        if (trimmed.startsWith('•')) {
                          foundBullets = true;
                          bulletPoints.push(trimmed.replace(/^•\s*/, ''));
                        } else if (trimmed && !foundBullets) {
                          textParts.push(trimmed);
                        } else if (trimmed && foundBullets && !trimmed.startsWith('•')) {
                          textParts.push(trimmed);
                        }
                      });

                      return (
                        <>
                          {textParts.map((para, paraIndex) => (
                            <p key={paraIndex} className={paraIndex === 0 ? "mb-3" : "mb-3"}>
                              {para}
                            </p>
                          ))}
                          {bulletPoints.length > 0 && (
                            <ul className="list-disc list-inside space-y-1 mb-3 ml-4">
                              {bulletPoints.map((point, pointIndex) => (
                                <li key={pointIndex}>{point}</li>
                              ))}
                            </ul>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </div>
              );
            })}
          </div>
        </MotionSection>
      )}

      {/* Decisions Section */}
      {caseStudy.sections.decisions.length > 0 && (
        <MotionSection id="decisions" title="Key Decisions">
          <div className="space-y-0">
            {caseStudy.sections.decisions.map((decision, index) => (
              <div key={index} className="case-decision-card">
                <DecisionBlock decision={decision} index={index} />
              </div>
            ))}
          </div>
        </MotionSection>
      )}

      {/* Outcome and Impact Section */}
      {caseStudy.sections.outcome && (
        <MotionSection id="outcome" title="Outcome and Impact">
          <div className="case-body opacity-90">
            {(() => {
              const lines = caseStudy.sections.outcome.split('\n').filter(line => line.trim());
              const bulletPoints: string[] = [];
              const textParts: string[] = [];
              
              lines.forEach((line) => {
                const trimmed = line.trim();
                if (trimmed.startsWith('•')) {
                  bulletPoints.push(trimmed.replace(/^•\s*/, ''));
                } else if (trimmed) {
                  textParts.push(trimmed);
                }
              });

              return (
                <>
                  {textParts.map((para, paraIndex) => (
                    <p key={paraIndex} className="mb-4">{para}</p>
                  ))}
                  {bulletPoints.length > 0 && (
                    <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                      {bulletPoints.map((point, pointIndex) => (
                        <li key={pointIndex}>{point}</li>
                      ))}
                    </ul>
                  )}
                </>
              );
            })()}
          </div>
          <figure className="mt-8 w-full overflow-hidden rounded-xl border-[var(--case-border)] border bg-[var(--background)] flex items-center justify-center min-h-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Outcome_new.gif"
              alt="Outcome"
              className="w-full max-w-full h-auto object-contain"
              style={{ display: "block" }}
            />
          </figure>
        </MotionSection>
      )}

      {/* Reflection Section */}
      {caseStudy.sections.reflection && (
        <MotionSection id="reflection" title="Reflection">
          <p className="case-body whitespace-pre-line opacity-90">
            {caseStudy.sections.reflection}
          </p>
        </MotionSection>
      )}

      {/* Images (legacy) */}
      {caseStudy.images && caseStudy.images.length > 0 && !caseStudy.visualsSections && (
        <MotionSection id="visuals" title="Visuals">
          <div className="space-y-6">
            {caseStudy.images.map((image, index) => (
              <MotionImage
                key={index}
                src={image.src}
                alt={image.alt}
                caption={image.caption}
                fill
              />
            ))}
          </div>
        </MotionSection>
      )}

      {/* Noteworthy iterations – cs visual style, click to open full view */}
      {caseStudy.visualsSections && caseStudy.visualsSections.length > 0 && (
        <MotionSection id="visuals" title="Noteworthy iterations">
          <div className="cs-noteworthy-grid">
            {caseStudy.visualsSections.map((section, index) => {
              const media = section.image || section.video;
              if (!media) return null;
              const caption = section.image?.caption ?? section.video?.caption;
              return (
                <button
                  key={index}
                  type="button"
                  className="cs-visual-frame cs-visual-clickable"
                  onClick={() => setNoteworthyFullViewIndex(index)}
                  aria-label={section.image ? section.image.alt : "View video"}
                >
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
                </button>
              );
            })}
          </div>

          {/* Full-view lightbox */}
          {noteworthyFullViewIndex !== null && (() => {
            const section = caseStudy.visualsSections![noteworthyFullViewIndex];
            if (!section) return null;
            const caption = section.image?.caption ?? section.video?.caption;
            return (
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
                    <p className="noteworthy-lightbox-caption">{caption}</p>
                  )}
                </div>
              </div>
            );
          })()}
        </MotionSection>
      )}
    </div>
  );
}
