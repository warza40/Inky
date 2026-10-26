import type { SparkleStyle } from "@/components/ui/sparkle-styles";

/** Figma 52:406 wireframe artboard — fixed coordinate space. */
export const WIREFRAME_WIDTH = 1920;
export const WIREFRAME_HEIGHT = 4615;

export interface PageSparkleMark {
  id: string;
  style: SparkleStyle;
  /** X position in wireframe px (may be negative for bleed). */
  x: number;
  /** Y position in wireframe px. */
  y: number;
  /** Size in wireframe px at 1920px artboard width. */
  size: number;
  /** Hide below this viewport width when set. */
  hideBelow?: number;
  /**
   * "open" marks sit in empty paper and may use the higher opacity.
   * Omitted marks are treated as crossing type or a card.
   */
  room?: "open";
  /**
   * Case pages only. Anchors the mark in the empty page margin.
   * "start" is the left margin, "end" is the right. Wireframe x/y are ignored.
   */
  edge?: "start" | "end";
  /** Viewport offset for an anchored mark, as a percentage of the height below the header. */
  along?: number;
}

function fromWireframe(
  id: string,
  style: SparkleStyle,
  x: number,
  y: number,
  size: number,
  hideBelow?: number,
  room?: "open",
): PageSparkleMark {
  return { id, style, x, y, size, hideBelow, room };
}

/**
 * Homepage — all 15 sparkle instances from Figma 52:406 (Slide 16:9 - 2).
 * Variant resolved from each instance's main component (Sparkle 6:39).
 */
export const HOMEPAGE_SPARKLE_MARKS: PageSparkleMark[] = [
  fromWireframe("66:1885", "scribble", -119, 1273, 522),
  fromWireframe("66:1617", "diamond", 192, 1680, 522, 768),
  fromWireframe("66:1619", "crosshatch", 499, 1620, 269),
  fromWireframe("66:1818", "solid", 424, 81, 59),
  fromWireframe("66:1836", "diamond", 1368, 834, 522, 768),
  fromWireframe("66:1851", "crosshatch", 1479, 483, 269),
  fromWireframe("66:1898", "solid", 794, 927, 269),
  fromWireframe("66:1921", "solid", 1630, 1345, 400, 768),
  fromWireframe("66:1938", "crosshatch", 812, 2004, 392),
  fromWireframe("66:1969", "solid", 1458, 2241, 400, 768),
  fromWireframe("66:1976", "crosshatch", -111, 2541, 400),
  fromWireframe("66:1990", "crosshatch", 1534, 3252, 344, 768),
  fromWireframe("66:2011", "diamond", 1241, 3010, 522, 768),
  fromWireframe("66:2012", "fine", 158, 3037, 522, 768),
  fromWireframe("66:2013", "wide", 817, 3917, 522, 768),
];

function marginMark(
  id: string,
  edge: "start" | "end",
  along: number,
): PageSparkleMark {
  return {
    id,
    style: "solid",
    x: 0,
    y: 0,
    size: 56,
    hideBelow: 1024,
    room: "open",
    edge,
    along,
  };
}

/**
 * Case pages. Three solid marks in the empty page margin. When that margin
 * cannot hold a mark, placement shifts into nav-column whitespace. They are
 * hidden below 1024px, where the margin is not safe.
 */
export const CASE_STUDY_SPARKLE_MARKS: PageSparkleMark[] = [
  marginMark("cs:solid-1", "start", 12),
  marginMark("cs:solid-2", "end", 46),
  marginMark("cs:solid-3", "start", 74),
];

/** Omantel and the other system case pages. Same margin rule as the fallback set. */
export const OMANTEL_SPARKLE_MARKS: PageSparkleMark[] = [
  marginMark("om:solid-1", "start", 12),
  marginMark("om:solid-2", "end", 46),
  marginMark("om:solid-3", "start", 74),
];

export type PageSparkleVariant = "home" | "case-study" | "omantel";

export const PAGE_SPARKLE_MARKS: Record<PageSparkleVariant, PageSparkleMark[]> =
  {
    home: HOMEPAGE_SPARKLE_MARKS,
    "case-study": CASE_STUDY_SPARKLE_MARKS,
    omantel: OMANTEL_SPARKLE_MARKS,
  };
