"use client";

import type { CaseStudy } from "@/case-studies/omantel";
import { CaseUnderstandingFlowCarousel } from "@/components/case/CaseUnderstandingFlowCarousel";

type AfterDivider = NonNullable<
  NonNullable<CaseStudy["sections"]["understanding"]>["afterDivider"]
>;

interface CaseUnderstandingFlowSectionProps {
  afterDivider: AfterDivider;
}

/** User-flow carousel (dark stage) + narrative copy (cream sheet) — mirrors Key Decisions layout. */
export function CaseUnderstandingFlowSection({
  afterDivider,
}: CaseUnderstandingFlowSectionProps) {
  const images = afterDivider.images;
  if (!images?.length) return null;

  return (
    <div className="ojo-user-flow-section">
      <CaseUnderstandingFlowCarousel images={images} />
      <div className="ojo-user-flow-content">
        <div className="ojo-paper ojo-paper-shadow ojo-user-flow-inner">
          <div className="cs-understanding-subsection">
            <h3 className="cs-context-section-title">{afterDivider.title}</h3>
            {afterDivider.goal ? (
              <p>
                <span className="cs-understanding-goal-label">Goal :</span>{" "}
                {afterDivider.goal}
              </p>
            ) : null}
            {afterDivider.content ? <p>{afterDivider.content}</p> : null}
            {afterDivider.bullets && afterDivider.bullets.length > 0 ? (
              <ul className="cs-understanding-list">
                {afterDivider.bullets.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
