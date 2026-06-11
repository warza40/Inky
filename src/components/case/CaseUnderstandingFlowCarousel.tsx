"use client";

import { OmantelJournalImageCarousel } from "@/components/case/journal/OmantelJournalImageCarousel";
import type { CaseStudy } from "@/case-studies/omantel";

type FlowCarouselImage = NonNullable<
  NonNullable<CaseStudy["sections"]["understanding"]>["afterDivider"]
>["images"];

interface CaseUnderstandingFlowCarouselProps {
  images: NonNullable<FlowCarouselImage>;
}

/** Full-width dark stage for user-flow carousels in Problem · Understanding (matches Key Decisions). */
export function CaseUnderstandingFlowCarousel({
  images,
}: CaseUnderstandingFlowCarouselProps) {
  if (!images.length) return null;

  return (
    <div className="ojo-understanding-flow-stage">
      <OmantelJournalImageCarousel
        images={images.map((img) => ({
          src: img.src,
          alt: img.alt ?? "User flow mapping",
          caption: img.caption,
        }))}
      />
    </div>
  );
}
