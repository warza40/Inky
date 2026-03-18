"use client";

import { useEffect, useRef } from "react";

type CaseStudyDirectionOptions = {
  title?: string;
  heroGradient?: [string, string, string];
  shapeDensity?: number;
  shapeMinAlpha?: number;
  shapeMaxAlpha?: number;
  shapeMinSpeed?: number;
  shapeMaxSpeed?: number;
};

const SHAPE_COLORS = [
  "#E8392A",
  "#F5B800",
  "#378ADD",
  "#44B86A",
  "#D4537E",
  "#7F77DD",
  "#E07030",
  "#1D9E75",
];

const SHAPE_TYPES = ["dot2", "dot4", "checker", "cross", "plus", "arrow"] as const;

const P = 3; // pixel block size
const CELL = 28;

function rnd(a: number, b: number) {
  return a + Math.random() * (b - a);
}
function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function drawShape(
  ctx: CanvasRenderingContext2D,
  type: (typeof SHAPE_TYPES)[number],
  color: string,
  color2: string,
  alpha: number
) {
  ctx.globalAlpha = alpha;

  if (type === "dot2") {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, P * 2, P * 2);
  } else if (type === "dot4") {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, P * 4, P * 4);
  } else if (type === "checker") {
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        ctx.fillStyle = (r + c) % 2 === 0 ? color : color2;
        ctx.globalAlpha = (r + c) % 2 !== 0 ? alpha * 0.5 : alpha;
        ctx.fillRect(c * P, r * P, P, P);
      }
    }
    ctx.globalAlpha = alpha;
  } else if (type === "cross") {
    ctx.fillStyle = color;
    ctx.fillRect(P, 0, P, P * 5);
    ctx.fillRect(0, P * 2, P * 5, P);
  } else if (type === "plus") {
    ctx.fillStyle = color;
    ctx.fillRect(P, 0, P, P * 3);
    ctx.fillRect(0, P, P * 3, P);
  } else if (type === "arrow") {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, P, P);
    ctx.fillRect(P, P, P, P);
    ctx.fillRect(P * 2, P * 2, P, P);
    ctx.fillRect(P, P * 3, P, P);
    ctx.fillRect(0, P * 4, P, P);
  }

  ctx.globalAlpha = 1;
}

type Piece = {
  col: number;
  row: number;
  axis: 0 | 1;
  dir: 1 | -1;
  speed: number;
  color: string;
  color2: string;
  type: (typeof SHAPE_TYPES)[number];
  alpha: number;
};

export function CaseStudyDirection({
  title,
  heroGradient = ["#E8392A", "#FF8844", "#F5B800"],
  shapeDensity = 0.012,
  shapeMinAlpha = 0.1,
  shapeMaxAlpha = 0.24,
  shapeMinSpeed = 0.002,
  shapeMaxSpeed = 0.008,
}: CaseStudyDirectionOptions) {
  const progressRef = useRef<HTMLDivElement | null>(null);
  const heroCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const shapesCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const progressEl = progressRef.current;
    const heroCanvas = heroCanvasRef.current;
    const shapesCanvas = shapesCanvasRef.current;

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

    // 2) Hero canvas
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

          const g = hctx.createLinearGradient(0, 0, w, h);
          g.addColorStop(0, heroGradient[0]);
          g.addColorStop(0.5, heroGradient[1]);
          g.addColorStop(1, heroGradient[2]);
          hctx.fillStyle = g;
          hctx.fillRect(0, 0, w, h);

          // Pixel grain
          for (let i = 0; i < 1200; i++) {
            hctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.08})`;
            const s = Math.random() * 4 + 1;
            hctx.fillRect(
              Math.round(Math.random() * w),
              Math.round(Math.random() * h),
              s,
              s
            );
          }

          // Grid overlay
          hctx.strokeStyle = "rgba(255,255,255,0.07)";
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

    // 3) Background shapes canvas
    let raf: number | null = null;
    let pieces: Piece[] = [];
    let resizeTimer: number | null = null;

    if (shapesCanvas) {
      const sctx = shapesCanvas.getContext("2d");
      if (sctx) {
        const initPieces = () => {
          shapesCanvas.width = window.innerWidth;
          shapesCanvas.height = window.innerHeight;
          const cols = Math.ceil(shapesCanvas.width / CELL) + 4;
          const rows = Math.ceil(shapesCanvas.height / CELL) + 4;
          const count = Math.floor(cols * rows * shapeDensity);
          pieces = [];
          for (let i = 0; i < count; i++) {
            const axis: 0 | 1 = Math.random() > 0.5 ? 0 : 1;
            pieces.push({
              col: Math.random() * cols,
              row: Math.random() * rows,
              axis,
              dir: Math.random() > 0.5 ? 1 : -1,
              speed: rnd(shapeMinSpeed, shapeMaxSpeed),
              color: pick(SHAPE_COLORS),
              color2: pick(SHAPE_COLORS),
              type: pick(SHAPE_TYPES),
              alpha: rnd(shapeMinAlpha, shapeMaxAlpha),
            });
          }
        };

        const loop = () => {
          sctx.clearRect(0, 0, shapesCanvas.width, shapesCanvas.height);
          const W = shapesCanvas.width;
          const H = shapesCanvas.height;
          const cols = Math.ceil(W / CELL) + 6;
          const rows = Math.ceil(H / CELL) + 6;

          for (const p of pieces) {
            if (p.axis === 0) p.col += p.dir * p.speed;
            else p.row += p.dir * p.speed;

            if (p.axis === 0) {
              if (p.col > cols + 2) p.col = -3;
              if (p.col < -3) p.col = cols + 2;
            } else {
              if (p.row > rows + 2) p.row = -3;
              if (p.row < -3) p.row = rows + 2;
            }

            const x = (p.axis === 0 ? p.col : Math.round(p.col)) * CELL;
            const y = (p.axis === 1 ? p.row : Math.round(p.row)) * CELL;
            if (x < -60 || x > W + 60 || y < -60 || y > H + 60) continue;

            sctx.save();
            sctx.translate(Math.round(x), Math.round(y));
            drawShape(sctx, p.type, p.color, p.color2, p.alpha);
            sctx.restore();
          }

          raf = window.requestAnimationFrame(loop);
        };

        initPieces();
        loop();

        const shapesResize = () => {
          if (resizeTimer) window.clearTimeout(resizeTimer);
          resizeTimer = window.setTimeout(() => {
            initPieces();
            paintHero?.();
          }, 200);
        };
        window.addEventListener("resize", shapesResize);
        onResizeHandlers.push(() => window.removeEventListener("resize", shapesResize));
      }
    }

    // 4) Fade-in observer
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
      if (raf) window.cancelAnimationFrame(raf);
      if (resizeTimer) window.clearTimeout(resizeTimer);
      fadeObserver?.disconnect();
    };
  }, [
    heroGradient,
    shapeDensity,
    shapeMinAlpha,
    shapeMaxAlpha,
    shapeMinSpeed,
    shapeMaxSpeed,
  ]);

  return (
    <>
      <div className="cs-progress-track" aria-hidden="true">
        <div ref={progressRef} className="cs-progress-bar" id="cs-progress" />
      </div>
      <canvas ref={shapesCanvasRef} className="cs-shapes-canvas" id="shapesCanvas" />
      <div className="cs-hero-band">
        <canvas ref={heroCanvasRef} className="cs-hero-canvas" id="heroCanvas" />
        <div className="cs-hero-overlay" />
        {title ? (
          <div className="cs-hero-overlay-content fade-in">
            <div className="cs-hero-tag">Case Study</div>
            <h1 className="cs-hero-title">{title}</h1>
          </div>
        ) : null}
      </div>
    </>
  );
}

