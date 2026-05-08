"use client";

import type { CaseStudy } from "@/case-studies/omantel";
import type { CaseVisualsPresentation } from "@/case-studies/case-visuals";
import { MotionImage } from "@/components/case/MotionImage";

interface CaseJournalOutcomeSupplementProps {
  caseStudy: CaseStudy;
  visualsPresentation: CaseVisualsPresentation;
}

/** Legacy bottom-of-outcome gallery (when no noteworthy visuals). */
export function CaseJournalOutcomeSupplement({
  caseStudy,
  visualsPresentation,
}: CaseJournalOutcomeSupplementProps) {
  if (visualsPresentation.mode !== "legacy") return null;

  return (
    <div className="ojo-outcome-legacy-visuals space-y-6">
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
  );
}
