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
          <Problem problem={caseStudy.sections.problem} />
        </MotionSection>
      )}

      {/* Constraints Section */}
      {caseStudy.sections.constraints.length > 0 && (
        <MotionSection id="constraints">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Constraints</h2>
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
                  <p className="text-base text-neutral-700 leading-relaxed whitespace-pre-line">
                    {item.content}
                  </p>
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
            <h2 className="text-2xl font-bold text-neutral-900 relative">
              <svg
                width="112"
                height="84"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -z-10"
                style={{ 
                  left: "-44px",
                  top: "-12px",
                }}
              >
                <path
                  d="M12 2L13.5 7.5L19 9L14.5 12.5L16 18L12 15L8 18L9.5 12.5L5 9L10.5 7.5L12 2Z"
                  stroke="#FF8D28"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="#FF8D28"
                  opacity="0.6"
                  style={{
                    filter: "drop-shadow(0 0 1px rgba(255, 141, 40, 0.3))",
                  }}
                />
              </svg>
              Key Decisions
            </h2>
          </div>
          <div className="space-y-4">
            {caseStudy.sections.decisions.map((decision, index) => (
              <DecisionBlock key={index} decision={decision} index={index} />
            ))}
          </div>
        </MotionSection>
      )}

      {/* Images */}
      {caseStudy.images && caseStudy.images.length > 0 && (
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
    </div>
  );
}
