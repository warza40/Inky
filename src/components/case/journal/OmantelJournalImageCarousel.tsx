"use client";

import {
  CaseStudyMediaCarousel,
  type CaseMediaSlide,
} from "@/components/case/CaseStudyMediaCarousel";

export type JournalCarouselImage = CaseMediaSlide;

interface OmantelJournalImageCarouselProps {
  images: JournalCarouselImage[];
}

/** Dark-stage media strip (Key Decisions, Outcome) — captions, dots, slide counter */
export function OmantelJournalImageCarousel({
  images,
}: OmantelJournalImageCarouselProps) {
  return (
    <CaseStudyMediaCarousel tone="dark" images={images} showSlideCounter />
  );
}
