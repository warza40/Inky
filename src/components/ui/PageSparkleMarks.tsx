"use client";

import { useLayoutEffect, useRef } from "react";
import { Sparkle } from "@/components/ui/Sparkle";
import {
  PAGE_SPARKLE_MARKS,
  WIREFRAME_HEIGHT,
  WIREFRAME_WIDTH,
  type PageSparkleVariant,
} from "@/components/ui/page-sparkle-marks";

interface PageSparkleMarksProps {
  variant: PageSparkleVariant;
}

/** Margin narrower than this cannot hold a readable mark, so use the nav column. */
const NARROW_MARGIN = 40;
const MAX_MARK = 64;
const NAV_MARK = 56;
/** Keep the mark this far from both the viewport edge and the content rail. */
const RAIL_GAP = 12;

function wireframeCss(value: number): string {
  return `calc(${value} * var(--sparkle-unit))`;
}

function overlaps(a: DOMRect, b: DOMRect): boolean {
  const width = Math.min(a.right, b.right) - Math.max(a.left, b.left);
  const height = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
  return width > 0.5 && height > 0.5;
}

function textRight(root: Element): number {
  let right = 0;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    if (node.textContent?.trim()) {
      const range = document.createRange();
      range.selectNodeContents(node);
      for (const rect of range.getClientRects()) {
        if (rect.width > 0) right = Math.max(right, rect.right);
      }
    }
    node = walker.nextNode();
  }
  return right;
}

function clearPlaced(mark: HTMLElement) {
  mark.style.left = "";
  mark.style.right = "";
  mark.style.top = "";
  mark.style.width = "";
  mark.style.position = "";
  mark.hidden = false;
  delete mark.dataset.sparkleZone;
}

function intendedRect(mark: HTMLElement): DOMRect | null {
  const width = Number.parseFloat(mark.style.width);
  const top = Number.parseFloat(mark.style.top);
  if (!Number.isFinite(width) || !Number.isFinite(top)) return null;
  const left =
    mark.style.left && mark.style.left !== "auto"
      ? Number.parseFloat(mark.style.left)
      : document.documentElement.clientWidth -
        Number.parseFloat(mark.style.right) -
        width;
  if (!Number.isFinite(left)) return null;
  return new DOMRect(left, top, width, width);
}

/**
 * Nav-column marks are fixed, so they would cross the hero and the header
 * while those bands share their box. Hold them until the hero has moved clear.
 */
function revealNavMarks(marks: HTMLElement[]) {
  const hero = document.querySelector(".case-study-hero");
  const header = document.querySelector(".floating-nav__bar");
  const heroBox = hero?.getBoundingClientRect() ?? null;
  const headerBox = header?.getBoundingClientRect() ?? null;

  for (const mark of marks) {
    if (mark.dataset.sparkleZone !== "nav") continue;
    const box = intendedRect(mark);
    if (!box) {
      mark.hidden = true;
      continue;
    }
    const hitHero = heroBox ? overlaps(box, heroBox) : false;
    const hitHeader = headerBox ? overlaps(box, headerBox) : false;
    mark.hidden = hitHero || hitHeader;
  }
}

function placeCaseSparkles(root: HTMLElement) {
  const marks = [
    ...root.querySelectorAll<HTMLElement>(".page-sparkle-marks__mark"),
  ];
  if (window.innerWidth < 1024) {
    for (const mark of marks) clearPlaced(mark);
    return;
  }

  const rail = document.querySelector(
    ".case-study-hero, .case-study-layout-content",
  );
  if (!rail) return;

  const railBox = rail.getBoundingClientRect();
  const viewWidth = document.documentElement.clientWidth;
  const margin = Math.min(railBox.left, viewWidth - railBox.right);
  const header = document.querySelector(".floating-nav__bar");
  const headerBottom = header?.getBoundingClientRect().bottom ?? 0;
  const sizeLimit = window.innerHeight - headerBottom - 32;

  if (margin >= NARROW_MARGIN + RAIL_GAP) {
    const size = Math.min(
      MAX_MARK,
      Math.floor(margin - RAIL_GAP * 2),
      sizeLimit,
    );
    const inset = Math.max(RAIL_GAP, (margin - size) / 2);
    const start = headerBottom + 16;
    const end = window.innerHeight - size - 16;
    for (const mark of marks) {
      const edge = mark.dataset.sparkleEdge === "end" ? "end" : "start";
      const along = Number(mark.dataset.sparkleAlong ?? "50");
      const top = start + Math.max(0, end - start) * (along / 100);
      mark.hidden = false;
      mark.dataset.sparkleZone = "margin";
      mark.style.position = "fixed";
      mark.style.width = `${size}px`;
      mark.style.top = `${top}px`;
      switch (edge) {
        case "start":
          mark.style.right = "auto";
          mark.style.left = `${inset}px`;
          break;
        case "end":
          mark.style.left = "auto";
          mark.style.right = `${inset}px`;
          break;
        default: {
          const neverEdge: never = edge;
          throw new Error(`Unknown sparkle edge: ${neverEdge}`);
        }
      }
    }
    return;
  }

  const nav = document.querySelector(".sheet-nav-wrap");
  const content = document.querySelector(".case-study-layout-content");
  const navBox = nav?.getBoundingClientRect();
  const contentLeft = content?.getBoundingClientRect().left;
  const glyphs = nav ? textRight(nav) : 0;
  const size = Math.min(NAV_MARK, sizeLimit);
  const left = navBox ? navBox.right - 12 - size : 0;
  const fitsNav =
    navBox !== undefined &&
    contentLeft !== undefined &&
    size >= 24 &&
    left >= glyphs + 16 &&
    left >= navBox.left &&
    left + size <= navBox.right - 8 &&
    left + size <= contentLeft - 8;

  if (!fitsNav) {
    for (const mark of marks) {
      clearPlaced(mark);
      mark.dataset.sparkleZone = "margin";
    }
    return;
  }

  const start = headerBottom + 16;
  const end = window.innerHeight - size - 16;
  for (const mark of marks) {
    const along = Number(mark.dataset.sparkleAlong ?? "50");
    const top = start + Math.max(0, end - start) * (along / 100);
    mark.dataset.sparkleZone = "nav";
    mark.style.position = "fixed";
    mark.style.width = `${size}px`;
    mark.style.left = `${left}px`;
    mark.style.right = "auto";
    mark.style.top = `${top}px`;
  }
  revealNavMarks(marks);
}

/** Figma 52:406 — decorative sparkle marks as a non-interactive page background. */
export function PageSparkleMarks({ variant }: PageSparkleMarksProps) {
  const marks = PAGE_SPARKLE_MARKS[variant];
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    switch (variant) {
      case "home":
        return;
      case "omantel":
      case "case-study":
        break;
      default: {
        const neverVariant: never = variant;
        return neverVariant;
      }
    }

    const root = rootRef.current;
    if (!root) return;

    let frame = 0;
    let cancelled = false;
    const run = () => {
      if (!cancelled) placeCaseSparkles(root);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (cancelled) return;
        revealNavMarks([
          ...root.querySelectorAll<HTMLElement>(".page-sparkle-marks__mark"),
        ]);
      });
    };
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(run);
    };

    run();
    // ResizeObserver runs after layout. A resize listener can read the rail
    // before the grid has reflowed, and then the fixed marks keep a width
    // that no longer fits the margin.
    const observer = new ResizeObserver(onResize);
    observer.observe(document.documentElement);
    window.addEventListener("scroll", onScroll, { passive: true });
    void document.fonts?.ready.then(run);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [variant]);

  return (
    <div
      ref={rootRef}
      className="page-sparkle-marks"
      aria-hidden
      data-sparkle-variant={variant}
      style={{
        ["--sparkle-wireframe-width" as string]: `${WIREFRAME_WIDTH}`,
        ["--sparkle-wireframe-height" as string]: `${WIREFRAME_HEIGHT}`,
      }}
    >
      {marks.map((mark) => (
        <span
          key={mark.id}
          className="page-sparkle-marks__mark"
          aria-hidden
          data-sparkle-id={mark.id}
          data-sparkle-style={mark.style}
          data-sparkle-room={mark.room ?? undefined}
          data-hide-below={mark.hideBelow ?? undefined}
          data-sparkle-edge={mark.edge}
          data-sparkle-along={mark.along ?? undefined}
          style={
            mark.edge
              ? { ["--sparkle-along" as string]: `${mark.along ?? 50}%` }
              : {
                  left: wireframeCss(mark.x),
                  top: wireframeCss(mark.y),
                  width: wireframeCss(mark.size),
                }
          }
        >
          <Sparkle
            style={mark.style}
            decorative
            className="page-sparkle-marks__img"
          />
        </span>
      ))}
    </div>
  );
}
