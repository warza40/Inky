"use client";

import type { CaseStudy } from "@/case-studies/omantel";
import { Collapsible } from "./Collapsible";
import { DecisionBlock } from "./DecisionBlock";
import { MotionSection } from "./MotionSection";
import { MotionImage } from "./MotionImage";
import { Problem } from "./Problem";

interface CaseMapProps {
  caseStudy: CaseStudy;
}

export function CaseMap({ caseStudy }: CaseMapProps) {
  return (
    <div className="space-y-12">
      {/* Context Section */}
      {caseStudy.sections.context && (
        <MotionSection id="context">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Context</h2>
          <p className="text-base text-neutral-700 leading-relaxed whitespace-pre-line">
            {caseStudy.sections.context}
          </p>
        </MotionSection>
      )}

      {/* Problem Section */}
      {caseStudy.sections.problem.length > 0 && (
        <MotionSection id="problem">
          <div className="relative mb-6">
            <h2 className="text-2xl font-bold text-neutral-900 relative inline-block">
              <span className="relative inline-block">
                Problem
                <svg
                  className="absolute -bottom-2"
                  width="100"
                  height="14"
                  viewBox="0 0 100 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ right: "-10px" }}
                >
                  {/* Top arc - longer */}
                  <path
                    d="M 0 5 Q 25 1, 50 3 T 80 5"
                    stroke="#FF8D28"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                    style={{
                      filter: "drop-shadow(0 0 0.5px rgba(255, 141, 40, 0.3))",
                    }}
                  />
                  {/* Bottom arc - shorter, curves upward, 2px gap */}
                  <path
                    d="M 15 10 Q 35 6, 50 7 T 60 8"
                    stroke="#FF8D28"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                    style={{
                      filter: "drop-shadow(0 0 0.5px rgba(255, 141, 40, 0.3))",
                    }}
                  />
                </svg>
              </span>
            </h2>
          </div>
          <Problem problem={caseStudy.sections.problem} />
        </MotionSection>
      )}

      {/* Understanding Section (collapsible) */}
      {caseStudy.sections.understanding && (
        <MotionSection id="understanding">
          <Collapsible title={caseStudy.sections.understanding.title}>
            <div className="text-base text-neutral-700 leading-relaxed">
              {(() => {
                const lines = caseStudy.sections.understanding.content
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
                      <p className="mt-4 text-sm text-neutral-600 italic">
                        {caseStudy.sections.understanding.expandedContent}
                      </p>
                    )}
                  </>
                );
              })()}
            </div>
            {caseStudy.sections.understanding.images &&
              caseStudy.sections.understanding.images.length > 0 && (
                <div className="mt-6 pt-6 border-t border-neutral-200/50 space-y-6">
                  {caseStudy.sections.understanding.images.map((img, idx) => (
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
                        <div className="w-full aspect-video rounded-xl border border-neutral-200/50 bg-neutral-100" />
                      )}
                    </div>
                  ))}
                </div>
              )}
          </Collapsible>
        </MotionSection>
      )}

      {/* Constraints Section */}
      {caseStudy.sections.constraints.length > 0 && (
        <MotionSection id="constraints">
          <div className="relative mb-6">
            <h2 className="text-2xl font-bold text-neutral-900 relative inline-block">
              <span className="relative inline-block">
                Constraints
                <svg
                  className="absolute -bottom-2"
                  width="120"
                  height="14"
                  viewBox="0 0 120 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ right: "0" }}
                >
                  {/* Top arc - longer */}
                  <path
                    d="M 0 5 Q 30 1, 60 3 T 96 5"
                    stroke="#FF8D28"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                    style={{
                      filter: "drop-shadow(0 0 0.5px rgba(255, 141, 40, 0.3))",
                    }}
                  />
                  {/* Bottom arc - shorter, curves upward, 2px gap */}
                  <path
                    d="M 20 10 Q 40 6, 60 7 T 72 8"
                    stroke="#FF8D28"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                    style={{
                      filter: "drop-shadow(0 0 0.5px rgba(255, 141, 40, 0.3))",
                    }}
                  />
                </svg>
              </span>
            </h2>
          </div>
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
                    <div className="text-base text-neutral-700 leading-relaxed">
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
                        <p className="mt-4 text-sm text-neutral-600 italic">
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
                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                      {item.title}
                    </h3>
                  )}
                  <div className="text-base text-neutral-700 leading-relaxed">
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
        <MotionSection id="decisions">
          <div className="relative mb-6">
            <h2 className="text-2xl font-bold text-neutral-900 relative inline-block">
              Key{" "}
              <span className="relative inline-block">
                Decisions
                <svg
                  className="absolute -bottom-2"
                  width="120"
                  height="14"
                  viewBox="0 0 120 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ right: "0" }}
                >
                  {/* Top arc - longer */}
                  <path
                    d="M 0 5 Q 30 1, 60 3 T 96 5"
                    stroke="#FF8D28"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                    style={{
                      filter: "drop-shadow(0 0 0.5px rgba(255, 141, 40, 0.3))",
                    }}
                  />
                  {/* Bottom arc - shorter, curves upward, 2px gap */}
                  <path
                    d="M 20 10 Q 40 6, 60 7 T 72 8"
                    stroke="#FF8D28"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                    style={{
                      filter: "drop-shadow(0 0 0.5px rgba(255, 141, 40, 0.3))",
                    }}
                  />
                </svg>
              </span>
            </h2>
          </div>
          <div className="space-y-4">
            {caseStudy.sections.decisions.map((decision, index) => (
              <DecisionBlock key={index} decision={decision} index={index} />
            ))}
          </div>
        </MotionSection>
      )}

      {/* Outcome and Impact Section */}
      {caseStudy.sections.outcome && (
        <MotionSection id="outcome">
          <div className="relative mb-6">
            <h2 className="text-2xl font-bold text-neutral-900 relative inline-block">
              Outcome and{" "}
              <span className="relative inline-block">
                Impact
                <svg
                  className="absolute -bottom-2"
                  width="120"
                  height="14"
                  viewBox="0 0 120 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ right: "0" }}
                >
                  {/* Top arc - longer */}
                  <path
                    d="M 0 5 Q 30 1, 60 3 T 96 5"
                    stroke="#FF8D28"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                    style={{
                      filter: "drop-shadow(0 0 0.5px rgba(255, 141, 40, 0.3))",
                    }}
                  />
                  {/* Bottom arc - shorter, curves upward, 2px gap */}
                  <path
                    d="M 20 10 Q 40 6, 60 7 T 72 8"
                    stroke="#FF8D28"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                    style={{
                      filter: "drop-shadow(0 0 0.5px rgba(255, 141, 40, 0.3))",
                    }}
                  />
                </svg>
              </span>
            </h2>
          </div>
          <div className="text-base text-neutral-700 leading-relaxed">
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
        </MotionSection>
      )}

      {/* Reflection Section */}
      {caseStudy.sections.reflection && (
        <MotionSection id="reflection">
          <div className="relative mb-6">
            <h2 className="text-2xl font-bold text-neutral-900 relative inline-block">
              <span className="relative inline-block">
                Reflection
                <svg
                  className="absolute -bottom-2"
                  width="120"
                  height="14"
                  viewBox="0 0 120 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ right: "0" }}
                >
                  {/* Top arc - longer */}
                  <path
                    d="M 0 5 Q 30 1, 60 3 T 96 5"
                    stroke="#FF8D28"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                    style={{
                      filter: "drop-shadow(0 0 0.5px rgba(255, 141, 40, 0.3))",
                    }}
                  />
                  {/* Bottom arc - shorter, curves upward, 2px gap */}
                  <path
                    d="M 20 10 Q 40 6, 60 7 T 72 8"
                    stroke="#FF8D28"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                    style={{
                      filter: "drop-shadow(0 0 0.5px rgba(255, 141, 40, 0.3))",
                    }}
                  />
                </svg>
              </span>
            </h2>
          </div>
          <p className="text-base text-neutral-700 leading-relaxed whitespace-pre-line">
            {caseStudy.sections.reflection}
          </p>
        </MotionSection>
      )}

      {/* Images (legacy) */}
      {caseStudy.images && caseStudy.images.length > 0 && !caseStudy.visualsSections && (
        <MotionSection id="visuals">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Visuals</h2>
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

      {/* Noteworthy iterations – 4 sections one below the other */}
      {caseStudy.visualsSections && caseStudy.visualsSections.length > 0 && (
        <MotionSection id="visuals">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Noteworthy iterations</h2>
          <div className="space-y-10">
            {caseStudy.visualsSections.map((section, index) => (
              <div key={index} className="border-b border-neutral-200/50 pb-10 last:border-0 last:pb-0">
                {section.title && (
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">{section.title}</h3>
                )}
                {section.image && (
                  <figure className="rounded-xl overflow-hidden border border-neutral-200/50 w-full">
                    <div className="relative w-full aspect-video bg-neutral-100">
                      <img
                        src={section.image.src}
                        alt={section.image.alt}
                        className="w-full h-full object-contain"
                        style={{ display: "block" }}
                      />
                    </div>
                    {section.image.caption && (
                      <figcaption className="p-4 bg-neutral-50 text-sm text-neutral-600">
                        {section.image.caption}
                      </figcaption>
                    )}
                  </figure>
                )}
              </div>
            ))}
          </div>
        </MotionSection>
      )}
    </div>
  );
}
