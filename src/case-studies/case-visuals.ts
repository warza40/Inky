import type { CaseStudy } from "./omantel";

export type NoteworthySlide = {
  section: NonNullable<CaseStudy["visualsSections"]>[number];
  index: number;
};

/** Slides that can render (have image or video) — preserves original index for lightbox */
export function getNoteworthySlidesWithIndices(
  visualsSections: CaseStudy["visualsSections"]
): NoteworthySlide[] {
  if (!visualsSections?.length) return [];
  return visualsSections
    .map((section, index) => ({ section, index }))
    .filter(({ section }) => Boolean(section.image || section.video));
}

export type CaseVisualsPresentation =
  | { mode: "none" }
  | { mode: "noteworthy"; slides: NoteworthySlide[] }
  | { mode: "legacy"; images: NonNullable<CaseStudy["images"]> };

/**
 * Single source of truth for bottom-of-page visuals:
 * - noteworthy: at least one slide with image/video
 * - legacy: case `images` only when there is nothing noteworthy to show (including empty/junk `visualsSections` entries)
 */
export function getCaseVisualsPresentation(caseStudy: CaseStudy): CaseVisualsPresentation {
  const slides = getNoteworthySlidesWithIndices(caseStudy.visualsSections);
  if (slides.length > 0) {
    return { mode: "noteworthy", slides };
  }
  if (caseStudy.images?.length) {
    return { mode: "legacy", images: caseStudy.images };
  }
  return { mode: "none" };
}

export function caseStudyHasVisualsSection(caseStudy: CaseStudy): boolean {
  return getCaseVisualsPresentation(caseStudy).mode !== "none";
}

export function caseStudyVisualsNavLabel(caseStudy: CaseStudy): string {
  return getCaseVisualsPresentation(caseStudy).mode === "noteworthy"
    ? "Noteworthy iterations"
    : "Visuals";
}
