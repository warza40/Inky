"use client";

import type { CaseStudy } from "@/case-studies/omantel";
import { getCaseVisualsPresentation } from "@/case-studies/case-visuals";
import type { CaseMediaSlide } from "@/components/case/CaseStudyMediaCarousel";
import { CaseStudyMediaCarousel } from "@/components/case/CaseStudyMediaCarousel";
import { cn } from "@/lib/utils";

interface CaseNoteworthyIterationsProps {
  caseStudy: CaseStudy;
  /** Additional classes on the wrapper (spacing / theme) */
  gridClassName?: string;
}

function noteworthySlidesToMedia(
  visualsPresentation: Extract<
    ReturnType<typeof getCaseVisualsPresentation>,
    { mode: "noteworthy" }
  >,
): CaseMediaSlide[] {
  return visualsPresentation.slides
    .map(({ section }) => {
      const img = section.image;
      const vid = section.video;
      if (img) {
        return {
          src: img.src,
          alt: img.alt,
          caption: img.caption,
        };
      }
      if (vid) {
        return {
          src: vid.src,
          alt: section.title?.trim() || "Video iteration",
          caption: vid.caption,
        };
      }
      return {
        src: "",
        alt: "",
      };
    })
    .filter((m) => m.src.length > 0);
}

export function CaseNoteworthyIterations({
  caseStudy,
  gridClassName,
}: CaseNoteworthyIterationsProps) {
  const visualsPresentation = getCaseVisualsPresentation(caseStudy);
  if (visualsPresentation.mode !== "noteworthy") return null;

  const media = noteworthySlidesToMedia(visualsPresentation);
  if (media.length === 0) return null;

  const carousel = (
    <CaseStudyMediaCarousel tone="dark" images={media} showSlideCounter />
  );

  return (
    <div className={cn("cs-outcome-noteworthy", gridClassName)}>
      <div className="ojo-outcome-visuals">
        <div className="ojo-decision-stage">
          <div className="ojo-decision-bg ojo-decision-bg--solid" aria-hidden />
          <div className="ojo-decision-fade-top" aria-hidden />
          {carousel}
          <div className="ojo-decision-fade-bottom" aria-hidden />
        </div>
      </div>
    </div>
  );
}
