"use client";

import { useEffect, useRef } from "react";
import type { CaseStudyWarmthTheme } from "@/case-studies/omantel";

/** Warmth DS vertical wash — color at top, soft fade to paper (wash rule; dominant / people, energy) */
export type WarmthWashStop = readonly [number, string];

export const WARMTH_DS_MADDER_WASH_STOPS: readonly WarmthWashStop[] = [
  [0, "#d4705e"],
  [0.22, "#e8a598"],
  [0.45, "#f0dbd6"],
  [0.72, "#f5efe4"],
  [1, "#faf7f2"],
] as const;

/** Living · nature, growth, data */
export const WARMTH_DS_MOSS_WASH_STOPS: readonly WarmthWashStop[] = [
  [0, "#8a9e78"],
  [0.22, "#b5c4a8"],
  [0.45, "#dde6d4"],
  [0.72, "#f0ede4"],
  [1, "#faf7f2"],
] as const;

/** Warmth · skin, light, objects */
export const WARMTH_DS_OCHRE_WASH_STOPS: readonly WarmthWashStop[] = [
  [0, "#dba85a"],
  [0.22, "#e8c890"],
  [0.45, "#f0e0c4"],
  [0.72, "#f5efe4"],
  [1, "#faf7f2"],
] as const;

/** Receding · shadow, background */
export const WARMTH_DS_SLATE_WASH_STOPS: readonly WarmthWashStop[] = [
  [0, "#9ca090"],
  [0.22, "#c8ccc0"],
  [0.45, "#e2e4dc"],
  [0.72, "#f2efe8"],
  [1, "#faf7f2"],
] as const;

const WASH_BY_THEME: Record<CaseStudyWarmthTheme, readonly WarmthWashStop[]> = {
  madder: WARMTH_DS_MADDER_WASH_STOPS,
  moss: WARMTH_DS_MOSS_WASH_STOPS,
  ochre: WARMTH_DS_OCHRE_WASH_STOPS,
  slate: WARMTH_DS_SLATE_WASH_STOPS,
};

type CaseStudyDirectionOptions = {
  title?: string;
  /** Substring of `title` rendered in the case accent colour (must match exactly) */
  titleAccent?: string;
  /** Drives hero wash + `cs-hero-band--*` fallback unless `heroWashStops` is set */
  warmthTheme?: CaseStudyWarmthTheme;
  /** Override wash stops (advanced) */
  heroWashStops?: ReadonlyArray<WarmthWashStop>;
};

function HeroTitle({
  title,
  accent,
}: {
  title: string;
  accent?: string;
}) {
  if (!accent) return <>{title}</>;
  const i = title.lastIndexOf(accent);
  if (i === -1) return <>{title}</>;
  const before = title.slice(0, i);
  const after = title.slice(i + accent.length);
  return (
    <>
      {before}
      <span className="cs-hero-title-accent">{accent}</span>
      {after}
    </>
  );
}

export function CaseStudyDirection({
  title,
  titleAccent,
  warmthTheme = "madder",
  heroWashStops,
}: CaseStudyDirectionOptions) {
  const washStops = heroWashStops ?? WASH_BY_THEME[warmthTheme];
  const progressRef = useRef<HTMLDivElement | null>(null);
  const heroCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const progressEl = progressRef.current;
    const heroCanvas = heroCanvasRef.current;

    // 1) Progress bar
    const onScroll = () => {
      if (!progressEl) return;
      const doc = document.documentElement;
      const scrolled = doc.scrollTop;
      const total = doc.scrollHeight - doc.clientHeight;
      progressEl.style.width = total > 0 ? `${(scrolled / total) * 100}%` : "0%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // 2) Hero canvas — static wash + grain + grid (repaint on resize only)
    let paintHero: (() => void) | null = null;
    const onResizeHandlers: Array<() => void> = [];

    if (heroCanvas) {
      const hctx = heroCanvas.getContext("2d");
      if (hctx) {
        paintHero = () => {
          heroCanvas.width = heroCanvas.offsetWidth;
          heroCanvas.height = heroCanvas.offsetHeight;
          const w = heroCanvas.width;
          const h = heroCanvas.height;

          const g = hctx.createLinearGradient(0, 0, 0, h);
          for (const [offset, color] of washStops) {
            g.addColorStop(offset, color);
          }
          hctx.fillStyle = g;
          hctx.fillRect(0, 0, w, h);

          for (let i = 0; i < 650; i++) {
            hctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.045})`;
            const s = Math.random() * 3 + 0.5;
            hctx.fillRect(
              Math.round(Math.random() * w),
              Math.round(Math.random() * h),
              s,
              s
            );
          }

          hctx.strokeStyle = "rgba(28,24,18,0.055)";
          hctx.lineWidth = 0.5;
          for (let x = 0; x < w; x += 14) {
            hctx.beginPath();
            hctx.moveTo(x, 0);
            hctx.lineTo(x, h);
            hctx.stroke();
          }
          for (let y = 0; y < h; y += 14) {
            hctx.beginPath();
            hctx.moveTo(0, y);
            hctx.lineTo(w, y);
            hctx.stroke();
          }
        };

        paintHero();
        const heroResize = () => paintHero?.();
        window.addEventListener("resize", heroResize);
        onResizeHandlers.push(() => window.removeEventListener("resize", heroResize));
      }
    }

    // 3) Fade-in observer
    const fadeEls = Array.from(document.querySelectorAll<HTMLElement>(".fade-in"));
    const fadeObserver =
      fadeEls.length > 0
        ? new IntersectionObserver(
            (entries, observer) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  (entry.target as HTMLElement).classList.add("visible");
                  observer.unobserve(entry.target);
                }
              });
            },
            { threshold: 0.08, rootMargin: "0px 0px -32px 0px" }
          )
        : null;
    fadeEls.forEach((el) => fadeObserver?.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      onResizeHandlers.forEach((fn) => fn());
      fadeObserver?.disconnect();
    };
  }, [washStops]);

  return (
    <>
      <div className="cs-progress-track" aria-hidden="true">
        <div ref={progressRef} className="cs-progress-bar" id="cs-progress" />
      </div>
      <div
        className={`cs-hero-band${warmthTheme !== "madder" ? ` cs-hero-band--${warmthTheme}` : ""}`}
      >
        <canvas ref={heroCanvasRef} className="cs-hero-canvas" id="heroCanvas" />
        <div className="cs-hero-overlay" />
        {title ? (
          <div className="cs-hero-overlay-content fade-in">
            <div className="tag tag-default cs-hero-tag">Case Study</div>
            <h1 className="cs-hero-title">
              <HeroTitle title={title} accent={titleAccent} />
            </h1>
          </div>
        ) : null}
      </div>
    </>
  );
}
