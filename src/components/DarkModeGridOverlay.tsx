"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { useEffect, useState } from "react";

/** Bento grid has 3 columns. Light lines on dark at 20% opacity. */
const LINE_COLOR = "rgba(255, 255, 255, 0.25)";

/* 1px vertical lines at 1/3, 2/3, and right edge (same thickness as switcher divider) */
const GRADIENT_STYLE = `linear-gradient(to right,
  transparent 0%,
  transparent calc(33.333% - 1px),
  ${LINE_COLOR} calc(33.333% - 1px),
  ${LINE_COLOR} 33.333%,
  transparent 33.333%,
  transparent calc(66.666% - 1px),
  ${LINE_COLOR} calc(66.666% - 1px),
  ${LINE_COLOR} 66.666%,
  transparent 66.666%,
  transparent calc(100% - 1px),
  ${LINE_COLOR} calc(100% - 1px),
  ${LINE_COLOR} 100%
)`;

function getIsDark(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

export function DarkModeGridOverlay() {
  const { theme } = useTheme();
  const [domDark, setDomDark] = useState(false);

  useEffect(() => {
    setDomDark(getIsDark());
  }, [theme]);

  useEffect(() => {
    setDomDark(getIsDark());
    const el = document.documentElement;
    const observer = new MutationObserver(() => setDomDark(getIsDark()));
    observer.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const show = (theme as string) === "dark" || domDark;
  if (!show) return null;

  return (
    <div className="dark-mode-grid-overlay" aria-hidden data-dark-grid="true">
      {/* No outer box; only vertical lines (switcher|grid divider + 2 column lines). */}
      <div className="dark-mode-grid-overlay__inner">
        {/* Vertical line in padding area, left of switcher */}
        <div
          className="absolute left-2 top-0 bottom-0 w-px"
          style={{ backgroundColor: LINE_COLOR }}
          aria-hidden
        />
        {/* Switcher column */}
        <div className="w-14 flex-shrink-0" aria-hidden />
        {/* Gap with vertical line 1px right of boundary (no overlap with switcher) */}
        <div className="flex-shrink-0 w-6 h-full flex">
          <div
            className="w-px self-stretch shrink-0 ml-px"
            style={{ backgroundColor: LINE_COLOR }}
            aria-hidden
          />
        </div>
        {/* Bento grid area: 3 column lines */}
        <div
          className="flex-1 min-w-0 h-full dark-mode-grid-lines"
          style={{ background: GRADIENT_STYLE }}
        />
      </div>
    </div>
  );
}
