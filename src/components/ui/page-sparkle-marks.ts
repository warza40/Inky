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
  /** Hide below this viewport width when set. Homepage Figma instances only. */
  hideBelow?: number;
  /**
   * "open" marks sit in empty paper and may use the higher opacity.
   * Omitted marks are treated as crossing type or a card.
   */
  room?: "open";
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

/**
 * Case study pages — same sparkle styles as the homepage, at their
 * wireframe coordinates. Overlap is handled by stacking and opacity.
 */
export const CASE_STUDY_SPARKLE_MARKS: PageSparkleMark[] = [
  fromWireframe("cs:solid-nav", "solid", 24, 140, 72),
  fromWireframe("cs:crosshatch-hero", "crosshatch", 1700, 480, 180),
  fromWireframe("cs:diamond-hero", "diamond", -180, 980, 260),
  fromWireframe("cs:scribble", "scribble", -200, 1900, 280),
  fromWireframe("cs:solid-mid", "solid", 1720, 2300, 180),
  fromWireframe("cs:crosshatch-mid", "crosshatch", -140, 3000, 220),
  fromWireframe("cs:solid-grid", "solid", 1760, 3400, 140),
  fromWireframe("cs:fine", "fine", -160, 4100, 240),
  fromWireframe("cs:wide", "wide", -160, 4500, 180),
];

/**
 * Omantel and the other system case pages. Three solid marks at their
 * wireframe coordinates. The right-hand mark meets the content edge, so it
 * stays in the 0.12–0.18 band. The other two sit in open paper.
 */
export const OMANTEL_SPARKLE_MARKS: PageSparkleMark[] = [
  fromWireframe("om:solid-1", "solid", 24, 400, 96, undefined, "open"),
  fromWireframe("om:solid-2", "solid", 1800, 2200, 96),
  fromWireframe("om:solid-3", "solid", 24, 4200, 96, undefined, "open"),
];

export type PageSparkleVariant = "home" | "case-study" | "omantel";

export const PAGE_SPARKLE_MARKS: Record<PageSparkleVariant, PageSparkleMark[]> =
  {
    home: HOMEPAGE_SPARKLE_MARKS,
    "case-study": CASE_STUDY_SPARKLE_MARKS,
    omantel: OMANTEL_SPARKLE_MARKS,
  };
