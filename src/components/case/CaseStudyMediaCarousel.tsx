"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MotionImage } from "@/components/case/MotionImage";
import { cn } from "@/lib/utils";

export type CaseMediaSlide = {
  src: string;
  alt: string;
  caption?: string;
};

export interface CaseStudyMediaCarouselProps {
  images: CaseMediaSlide[];
  /** Dark stage (journal decisions / outcome) vs warm editorial (standard case pages) */
  tone?: "dark" | "light";
  /** e.g. `01 / 04` when more than one slide */
  showSlideCounter?: boolean;
  className?: string;
}

/**
 * Case-study media strip: 16:9 stage, chevrons, dot indicators, optional index counter, caption.
 * Dark tone reuses journal `.ojo-decision-carousel` styles; light tone uses `.cs-media-carousel--surface`.
 */
export function CaseStudyMediaCarousel({
  images,
  tone = "dark",
  showSlideCounter = true,
  className,
}: CaseStudyMediaCarouselProps) {
  const [slide, setSlide] = useState(0);
  const slideCount = images.length;
  const si =
    slideCount > 0 ? ((slide % slideCount) + slideCount) % slideCount : 0;

  const go = (delta: number) => {
    if (slideCount < 2) return;
    setSlide((s) => (((s + delta) % slideCount) + slideCount) % slideCount);
  };

  if (slideCount === 0) return null;

  const isDark = tone === "dark";
  const rootClass = isDark
    ? "ojo-decision-carousel"
    : "cs-media-carousel cs-media-carousel--surface";
  const rowClass = isDark ? "ojo-decision-carousel-row" : "cs-mc-row";
  const rowMultiClass = isDark
    ? "ojo-decision-carousel-row--multi"
    : "cs-mc-row--multi";
  const stageClass = isDark ? "ojo-decision-carousel-stage" : "cs-mc-stage";
  const slidesClass = isDark ? "ojo-decision-carousel-slides" : "cs-mc-slides";
  const slideClass = isDark ? "ojo-decision-slide" : "cs-mc-slide";
  const slideInnerClass = isDark
    ? "ojo-decision-slide-inner"
    : "cs-mc-slide-inner";
  const imgWrapClass = isDark ? "ojo-decision-slide-img" : "cs-mc-slide-img";
  const chevPrev = isDark
    ? "ojo-decision-carousel-chev ojo-decision-carousel-chev--prev"
    : "cs-mc-chev cs-mc-chev--prev";
  const chevNext = isDark
    ? "ojo-decision-carousel-chev ojo-decision-carousel-chev--next"
    : "cs-mc-chev cs-mc-chev--next";
  const footerClass = isDark ? "ojo-decision-carousel-footer" : "cs-mc-footer";
  const dotsClass = isDark ? "ojo-decision-dots" : "cs-mc-dots";
  const dotClass = isDark ? "ojo-decision-dot" : "cs-mc-dot";
  const captionClass = isDark ? "ojo-decision-slide-caption" : "cs-mc-caption";
  const miClass = isDark ? "ojo-decision-mi" : "cs-mc-mi";

  const showFooter = slideCount > 1 || Boolean(images[si]?.caption?.trim());
  const counterText =
    slideCount > 1 && showSlideCounter
      ? `${String(si + 1).padStart(2, "0")} / ${String(slideCount).padStart(2, "0")}`
      : null;

  return (
    <div className={cn(rootClass, className)}>
      <div className={cn(rowClass, slideCount > 1 && rowMultiClass)}>
        {slideCount > 1 ? (
          <button
            type="button"
            className={chevPrev}
            aria-label="Previous slide"
            onClick={() => go(-1)}
          >
            <ChevronLeft size={20} strokeWidth={2} aria-hidden />
          </button>
        ) : null}
        <div className={stageClass}>
          <div className={slidesClass}>
            {images.map((image, i) => {
              const active = i === si;
              const isVideo = /\.(mov|mp4|webm)(\?|$)/i.test(image.src);
              return (
                <div
                  key={`${image.src}-${i}`}
                  className={cn(slideClass, active && "is-active")}
                  aria-hidden={!active}
                >
                  <div className={slideInnerClass}>
                    <div className={imgWrapClass}>
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
                          className={miClass}
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
            className={chevNext}
            aria-label="Next slide"
            onClick={() => go(1)}
          >
            <ChevronRight size={20} strokeWidth={2} aria-hidden />
          </button>
        ) : null}
      </div>
      {showFooter ? (
        <div className={footerClass}>
          {slideCount > 1 ? (
            <div className="cs-mc-footer-meta">
              <div
                className={dotsClass}
                role="tablist"
                aria-label="Slide indicators"
              >
                {images.map((_, di) => (
                  <button
                    key={di}
                    type="button"
                    role="tab"
                    aria-selected={di === si}
                    className={cn(dotClass, di === si && "is-active")}
                    aria-label={`Slide ${di + 1}`}
                    onClick={() => setSlide(di)}
                  />
                ))}
              </div>
              {counterText ? (
                <span
                  className={cn("cs-mc-slide-counter", isDark && "is-dark")}
                >
                  {counterText}
                </span>
              ) : null}
            </div>
          ) : null}
          {images[si]?.caption?.trim() ? (
            <p className={captionClass}>{images[si]!.caption}</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
