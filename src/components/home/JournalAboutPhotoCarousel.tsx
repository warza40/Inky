"use client";

import { useState } from "react";
import Image from "next/image";

export interface AboutCarouselSlide {
  src: string;
  alt: string;
}

interface JournalAboutPhotoCarouselProps {
  slides: AboutCarouselSlide[];
  sizes?: string;
  caption?: string;
}

/** Dots bottom-centre; image left column in parent grid */
export function JournalAboutPhotoCarousel({
  slides,
  sizes = "(max-width: 840px) 100vw, 268px",
  caption,
}: JournalAboutPhotoCarouselProps) {
  const n = Math.max(1, slides.length);
  const [index, setIndex] = useState(0);
  const safe = ((index % n) + n) % n;
  const slide = slides[safe]!;

  return (
    <div className="jl-about-carousel">
      <div className="jl-about-carousel-viewport">
        <Image
          key={slide.src + safe}
          src={slide.src}
          alt={slide.alt}
          width={1440}
          height={2120}
          className="jl-about-carousel-img"
          sizes={sizes}
          priority={safe === 0}
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
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
