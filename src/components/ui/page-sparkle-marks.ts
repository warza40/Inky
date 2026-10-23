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
}

function fromWireframe(
  id: string,
  style: SparkleStyle,
  x: number,
  y: number,
  size: number,
  hideBelow?: number,
): PageSparkleMark {
  return { id, style, x, y, size, hideBelow };
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
 * Case study pages — same sparkle styles as the homepage, parked in the
 * side gutters so they sit beside the 1280 content column instead of on it.
 */
export const CASE_STUDY_SPARKLE_MARKS: PageSparkleMark[] = [
  fromWireframe("cs:solid-nav", "solid", 24, 140, 72),
  fromWireframe("cs:crosshatch-hero", "crosshatch", 1700, 480, 180),
  fromWireframe("cs:diamond-hero", "diamond", -180, 980, 260, 768),
  fromWireframe("cs:scribble", "scribble", -200, 1900, 280),
  fromWireframe("cs:solid-mid", "solid", 1720, 2300, 180, 768),
  fromWireframe("cs:crosshatch-mid", "crosshatch", -140, 3000, 220),
  fromWireframe("cs:solid-grid", "solid", 1760, 3400, 140),
  fromWireframe("cs:fine", "fine", -160, 4100, 240, 768),
  fromWireframe("cs:wide", "wide", -160, 4500, 180, 768),
];

/** Omantel only. Three solid marks; CSS pins them to 96px in the page margins. */
export const OMANTEL_SPARKLE_MARKS: PageSparkleMark[] = [
  fromWireframe("om:solid-1", "solid", 24, 400, 96),
  fromWireframe("om:solid-2", "solid", 1800, 2200, 96),
  fromWireframe("om:solid-3", "solid", 24, 4200, 96),
];

export type PageSparkleVariant = "home" | "case-study" | "omantel";

export const PAGE_SPARKLE_MARKS: Record<PageSparkleVariant, PageSparkleMark[]> =
  {
    home: HOMEPAGE_SPARKLE_MARKS,
    "case-study": CASE_STUDY_SPARKLE_MARKS,
    omantel: OMANTEL_SPARKLE_MARKS,
  };
