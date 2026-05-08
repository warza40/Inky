"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MotionImage } from "@/components/case/MotionImage";
import { cn } from "@/lib/utils";

export type JournalCarouselImage = {
  src: string;
  alt: string;
  caption?: string;
};

interface OmantelJournalImageCarouselProps {
  images: JournalCarouselImage[];
}

/** Dark-stage media strip: 16:9 slot, optional dots, caption as plain text below */
export function OmantelJournalImageCarousel({
  images,
}: OmantelJournalImageCarouselProps) {
  const [slide, setSlide] = useState(0);
  const slideCount = images.length;
  const si =
    slideCount > 0 ? ((slide % slideCount) + slideCount) % slideCount : 0;

  const go = (delta: number) => {
    if (slideCount < 2) return;
    setSlide((s) => (((s + delta) % slideCount) + slideCount) % slideCount);
  };

  if (slideCount === 0) return null;

  return (
    <div className="ojo-decision-carousel">
      <div
        className={cn(
          "ojo-decision-carousel-row",
          slideCount > 1 && "ojo-decision-carousel-row--multi",
        )}
      >
        {slideCount > 1 ? (
          <button
            type="button"
            className="ojo-decision-carousel-chev ojo-decision-carousel-chev--prev"
            aria-label="Previous image"
            onClick={() => go(-1)}
          >
            <ChevronLeft size={20} strokeWidth={2} aria-hidden />
          </button>
        ) : null}
        <div className="ojo-decision-carousel-stage">
          <div className="ojo-decision-carousel-slides">
            {images.map((image, i) => {
              const active = i === si;
              const isVideo = /\.(mov|mp4|webm)(\?|$)/i.test(image.src);
              return (
                <div
                  key={`${image.src}-${i}`}
                  className={cn("ojo-decision-slide", active && "is-active")}
                  aria-hidden={!active}
                >
                  <div className="ojo-decision-slide-inner">
                    <div className="ojo-decision-slide-img">
                      {isVideo ? (
                        <video
                          src={image.src}
                          controls
                          playsInline
                          className="h-full w-full object-contain"
                          aria-label={image.alt}
                        />
                      ) : (
                        <MotionImage
                          className="ojo-decision-mi"
                          src={image.src}
                          alt={image.alt}
                          caption={image.caption}
                          hideFigcaption
                          fill
                          objectFit="contain"
                          lightbox
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {slideCount > 1 ? (
          <button
            type="button"
            className="ojo-decision-carousel-chev ojo-decision-carousel-chev--next"
            aria-label="Next image"
            onClick={() => go(1)}
          >
            <ChevronRight size={20} strokeWidth={2} aria-hidden />
          </button>
        ) : null}
      </div>
      {slideCount > 1 || images[si]?.caption?.trim() ? (
        <div className="ojo-decision-carousel-footer">
          {slideCount > 1 ? (
            <div
              className="ojo-decision-dots"
              role="tablist"
              aria-label="Slide indicators"
            >
              {images.map((_, di) => (
                <button
                  key={di}
                  type="button"
                  role="tab"
                  aria-selected={di === si}
                  className={cn("ojo-decision-dot", di === si && "is-active")}
                  aria-label={`Slide ${di + 1}`}
                  onClick={() => setSlide(di)}
                />
              ))}
            </div>
          ) : null}
          {images[si]?.caption?.trim() ? (
            <p className="ojo-decision-slide-caption">{images[si]!.caption}</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
