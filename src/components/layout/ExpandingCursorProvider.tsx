"use client";

import { useEffect, useState } from "react";
import { ExpandingCursor, type ExpandingCursorState } from "./ExpandingCursor";

const CURSOR_OFFSET_X = 18;
const CURSOR_OFFSET_Y = 18;
const CURSOR_WIDTH = 400;
const CURSOR_HEIGHT = 88;
const VIEWPORT_PAD = 16;

const HIDDEN: ExpandingCursorState = {
  visible: false,
  x: 0,
  y: 0,
  title: "",
  hint: "",
};

function clampPosition(clientX: number, clientY: number) {
  if (typeof window === "undefined") {
    return { x: clientX, y: clientY };
  }

  const maxX = window.innerWidth - CURSOR_WIDTH - VIEWPORT_PAD;
  const maxY = window.innerHeight - CURSOR_HEIGHT - VIEWPORT_PAD;

  return {
    x: Math.min(Math.max(clientX + CURSOR_OFFSET_X, VIEWPORT_PAD), maxX),
    y: Math.min(Math.max(clientY + CURSOR_OFFSET_Y, VIEWPORT_PAD), maxY),
  };
}

function readPrompt(el: HTMLElement) {
  return {
    title: el.dataset.cursorTitle?.trim() ?? "",
    hint: el.dataset.cursorHint?.trim() ?? "",
  };
}

export function ExpandingCursorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cursor, setCursor] = useState<ExpandingCursorState>(HIDDEN);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointer.matches || reducedMotion.matches) {
      return;
    }

    document.documentElement.classList.add("expanding-cursor-enabled");

    const onMove = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest(
        "[data-expanding-cursor]",
      );

      if (!(target instanceof HTMLElement)) {
        setCursor((current) => (current.visible ? { ...HIDDEN } : current));
        return;
      }

      const { title, hint } = readPrompt(target);
      if (!title) {
        setCursor((current) => (current.visible ? { ...HIDDEN } : current));
        return;
      }

      const { x, y } = clampPosition(event.clientX, event.clientY);

      setCursor({
        visible: true,
        x,
        y,
        title,
        hint,
      });
    };

    const onLeave = () => {
      setCursor(HIDDEN);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.classList.remove("expanding-cursor-enabled");
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      {children}
      <ExpandingCursor {...cursor} />
    </>
  );
}
