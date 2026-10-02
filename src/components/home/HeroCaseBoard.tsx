"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HOME_CASE_STUDIES } from "@/data/home-case-studies";
import type { HomeCaseStudy } from "@/data/home-case-studies";
import { CaseStudyCard } from "@/components/layout/CaseStudyCard";
import {
  HERO_CARD_ORDER,
  layoutForSlug,
  readStoredHeroCardLayouts,
  writeStoredHeroCardLayouts,
  type HeroCardLayout,
} from "@/lib/hero-case-layout";

const DRAG_THRESHOLD_PX = 6;

function sortForHero(studies: HomeCaseStudy[]): HomeCaseStudy[] {
  const order = new Map<string, number>(
    HERO_CARD_ORDER.map((slug, index) => [slug, index]),
  );
  return [...studies].sort(
    (a, b) => (order.get(a.slug) ?? 0) - (order.get(b.slug) ?? 0),
  );
}

function mergeLayouts(
  studies: HomeCaseStudy[],
  stored: Record<string, HeroCardLayout> | null,
): Record<string, HeroCardLayout> {
  const next: Record<string, HeroCardLayout> = {};
  for (const study of studies) {
    const fallback = layoutForSlug(study.slug);
    const saved = stored?.[study.slug];
    next[study.slug] = saved
      ? {
          left: saved.left,
          top: saved.top,
          width: saved.width ?? fallback.width,
          zIndex: saved.zIndex ?? fallback.zIndex,
        }
      : fallback;
  }
  return next;
}

function DraggableHeroCard({
  study,
  layout,
  onCommit,
  onDragStart,
}: {
  study: HomeCaseStudy;
  layout: HeroCardLayout;
  onCommit: (slug: string, layout: HeroCardLayout) => void;
  onDragStart: () => number;
}) {
  const itemRef = useRef<HTMLLIElement>(null);
  const suppressClickRef = useRef(false);
  const liveLayoutRef = useRef(layout);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    origLeft: number;
    origTop: number;
    moved: boolean;
    zIndex: number;
  } | null>(null);

  useEffect(() => {
    liveLayoutRef.current = layout;
  }, [layout]);

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLLIElement>) => {
      if (event.button !== 0) return;
      if (window.matchMedia("(max-width: 1199px)").matches) return;

      const node = itemRef.current;
      if (!node) return;

      dragRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        origLeft: liveLayoutRef.current.left,
        origTop: liveLayoutRef.current.top,
        moved: false,
        zIndex: liveLayoutRef.current.zIndex,
      };
      node.setPointerCapture(event.pointerId);
    },
    [],
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLLIElement>) => {
      const drag = dragRef.current;
      const node = itemRef.current;
      if (!drag || drag.pointerId !== event.pointerId || !node) return;

      const board = node.offsetParent as HTMLElement | null;
      if (!board) return;

      const dx = event.clientX - drag.startX;
      const dy = event.clientY - drag.startY;
      if (!drag.moved) {
        if (dx * dx + dy * dy < DRAG_THRESHOLD_PX * DRAG_THRESHOLD_PX) {
          return;
        }
        drag.moved = true;
        drag.zIndex = onDragStart();
        node.classList.add("is-dragging");
        node.style.zIndex = String(drag.zIndex);
      }

      event.preventDefault();
      const bounds = board.getBoundingClientRect();
      const nextLeft = Math.min(
        88,
        Math.max(-8, drag.origLeft + (dx / bounds.width) * 100),
      );
      const nextTop = Math.min(
        88,
        Math.max(-4, drag.origTop + (dy / bounds.height) * 100),
      );

      node.style.left = `${nextLeft}%`;
      node.style.top = `${nextTop}%`;
      liveLayoutRef.current = {
        ...liveLayoutRef.current,
        left: nextLeft,
        top: nextTop,
        zIndex: drag.zIndex,
      };
    },
    [onDragStart],
  );

  const endDrag = useCallback(
    (event: React.PointerEvent<HTMLLIElement>) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;

      itemRef.current?.classList.remove("is-dragging");
      if (drag.moved) {
        suppressClickRef.current = true;
        onCommit(study.slug, liveLayoutRef.current);
      }
      dragRef.current = null;
    },
    [onCommit, study.slug],
  );

  useEffect(() => {
    const node = itemRef.current;
    if (!node) return;

    const onClickCapture = (event: MouseEvent) => {
      if (!suppressClickRef.current) return;
      event.preventDefault();
      event.stopPropagation();
      suppressClickRef.current = false;
    };

    node.addEventListener("click", onClickCapture, true);
    return () => node.removeEventListener("click", onClickCapture, true);
  }, []);

  return (
    <li
      ref={itemRef}
      className="home-hero-board__item"
      data-slug={study.slug}
      style={{
        left: `${layout.left}%`,
        top: `${layout.top}%`,
        width: `${layout.width}%`,
        zIndex: layout.zIndex,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <CaseStudyCard study={study} />
    </li>
  );
}

export function HeroCaseBoard() {
  const studies = sortForHero(HOME_CASE_STUDIES);
  const [layouts, setLayouts] = useState<Record<string, HeroCardLayout>>(() =>
    mergeLayouts(studies, null),
  );
  const layoutsRef = useRef(layouts);

  useEffect(() => {
    layoutsRef.current = layouts;
  }, [layouts]);

  useEffect(() => {
    setLayouts(mergeLayouts(studies, readStoredHeroCardLayouts()));
    // studies is a module constant.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCommit = useCallback((slug: string, nextLayout: HeroCardLayout) => {
    const next = { ...layoutsRef.current, [slug]: nextLayout };
    layoutsRef.current = next;
    setLayouts(next);
    writeStoredHeroCardLayouts(next);
  }, []);

  const onDragStart = useCallback(() => {
    const current = layoutsRef.current;
    const maxZ = Math.max(
      4,
      ...Object.values(current).map((item) => item.zIndex),
    );
    return maxZ + 1;
  }, []);

  return (
    <ul
      id="work"
      className="home-hero-board"
      role="list"
      aria-label="Case studies — drag to reposition"
    >
      {studies.map((study) => (
        <DraggableHeroCard
          key={study.slug}
          study={study}
          layout={layouts[study.slug] ?? layoutForSlug(study.slug)}
          onCommit={onCommit}
          onDragStart={onDragStart}
        />
      ))}
    </ul>
  );
}
