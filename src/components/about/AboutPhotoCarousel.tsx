"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

export interface AboutCarouselSlide {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const AUTO_ADVANCE_MS = 5200;

export function AboutPhotoCarousel({
  slides,
}: {
  slides: readonly AboutCarouselSlide[];
}) {
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const safe = count > 0 ? ((index % count) + count) % count : 0;
  const slide = slides[safe];

  useEffect(() => {
    if (!playing || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [playing, count]);

  const go = (delta: number) => {
    if (count < 2) return;
    setPlaying(false);
    setIndex((current) => (((current + delta) % count) + count) % count);
  };

  if (!slide) return null;

  return (
    <div
      className="about-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Photos of Rachana Mandal"
    >
      <div className="about-carousel__frame">
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={safe === 0}
          sizes="(max-width: 1199px) 100vw, 40vw"
          className="about-carousel__image"
        />
        {count > 1 ? (
          <div className="about-carousel__controls">
            <button
              type="button"
              className="about-carousel__chev"
              aria-label="Previous photo"
              onClick={() => go(-1)}
            >
              <ChevronLeft size={18} strokeWidth={1.75} aria-hidden />
            </button>
            <button
              type="button"
              className="about-carousel__chev"
              aria-label={playing ? "Pause slideshow" : "Play slideshow"}
              aria-pressed={playing}
              onClick={() => setPlaying((current) => !current)}
            >
              {playing ? (
                <Pause size={16} strokeWidth={1.75} aria-hidden />
              ) : (
                <Play size={16} strokeWidth={1.75} aria-hidden />
              )}
            </button>
            <button
              type="button"
              className="about-carousel__chev"
              aria-label="Next photo"
              onClick={() => go(1)}
            >
              <ChevronRight size={18} strokeWidth={1.75} aria-hidden />
            </button>
          </div>
        ) : null}
      </div>
      {count > 1 ? (
        <div
          className="about-carousel__dots"
          role="tablist"
          aria-label="Photo slides"
        >
          {slides.map((item, dotIndex) => (
            <button
              key={item.src}
              type="button"
              role="tab"
              aria-selected={dotIndex === safe}
              aria-label={`Photo ${dotIndex + 1} of ${count}`}
              className={
                dotIndex === safe
                  ? "about-carousel__dot is-active"
                  : "about-carousel__dot"
              }
              onClick={() => {
                setPlaying(false);
                setIndex(dotIndex);
              }}
            />
          ))}
        </div>
      ) : null}
      <p className="about-carousel__status" aria-live="polite">
        {`Photo ${safe + 1} of ${count}. Slideshow ${playing ? "playing" : "paused"}.`}
      </p>
    </div>
  );
}
