"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface AboutCarouselSlide {
  src: string;
  alt: string;
  /** Intrinsic size for layout hint (optional). */
  width?: number;
  height?: number;
}

interface JournalAboutPhotoCarouselProps {
  slides: AboutCarouselSlide[];
  /** Ignored — layout is CSS-driven */
  sizes?: string;
  caption?: string;
  /** Auto-advance to the next slide (ms). Pass `0` to disable. */
  autoAdvanceIntervalMs?: number;
}

/** Dots bottom-centre; image left column in parent grid */
export function JournalAboutPhotoCarousel({
  slides,
  caption,
  autoAdvanceIntervalMs = 5200,
}: JournalAboutPhotoCarouselProps) {
  const n = Math.max(1, slides.length);
  const [index, setIndex] = useState(0);
  /** Stops autoplay after chevron/dot use (WCAG 2.2.2). */
  const [userPaused, setUserPaused] = useState(false);
  /** Temporary pause while hovered or focused inside the carousel. */
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const safe = ((index % n) + n) % n;
  const slide = slides[safe]!;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (
      n < 2 ||
      autoAdvanceIntervalMs <= 0 ||
      userPaused ||
      interactionPaused ||
      reduceMotion
    ) {
      return;
    }
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % n);
    }, autoAdvanceIntervalMs);
    return () => window.clearInterval(id);
  }, [n, autoAdvanceIntervalMs, userPaused, interactionPaused, reduceMotion]);

  const stopAutoplay = () => setUserPaused(true);

  const go = (delta: number) => {
    if (n < 2) return;
    stopAutoplay();
    setIndex((i) => (((i + delta) % n) + n) % n);
  };

  const selectSlide = (i: number) => {
    stopAutoplay();
    setIndex(i);
  };

  return (
    <div
      className="jl-about-carousel"
      onMouseEnter={() => setInteractionPaused(true)}
      onMouseLeave={() => setInteractionPaused(false)}
      onFocusCapture={() => setInteractionPaused(true)}
      onBlurCapture={(e) => {
        const next = e.relatedTarget;
        if (next instanceof Node && e.currentTarget.contains(next)) return;
        setInteractionPaused(false);
      }}
    >
      <div className="jl-about-carousel-viewport">
        {n > 1 ? (
          <>
            <button
              type="button"
              className="jl-about-carousel-chev jl-about-carousel-chev--prev"
              aria-label="Previous photo"
              onClick={() => go(-1)}
            >
              <ChevronLeft size={18} strokeWidth={1.15} aria-hidden />
            </button>
            <button
              type="button"
              className="jl-about-carousel-chev jl-about-carousel-chev--next"
              aria-label="Next photo"
              onClick={() => go(1)}
            >
              <ChevronRight size={18} strokeWidth={1.15} aria-hidden />
            </button>
          </>
        ) : null}
        <Image
          key={slide.src + safe}
          src={slide.src}
          alt={slide.alt}
          className={`jl-about-carousel-img${safe === 1 ? " jl-about-carousel-img--slide-2" : ""}`}
          priority={safe === 0}
          width={slide.width ?? 1440}
          height={slide.height ?? 2120}
        />
        {caption ? (
          <p className="jl-about-carousel-caption">{caption}</p>
        ) : null}
      </div>
      {n > 1 ? (
        <div
          className="jl-about-carousel-dots"
          role="tablist"
          aria-label="Photo slides"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === safe}
              aria-label={`Slide ${i + 1}`}
              className={`jl-about-carousel-dot${i === safe ? " is-active" : ""}`}
              onClick={() => selectSlide(i)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
