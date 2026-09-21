import type { SparkleStyle } from "@/components/ui/sparkle-styles";

/** Figma 52:406 wireframe artboard — positions converted to fractions. */
const WIREFRAME_WIDTH = 1920;
const WIREFRAME_HEIGHT = 4615;

export interface PageSparkleMark {
  id: string;
  style: SparkleStyle;
  /** Horizontal position as fraction of artboard width (may be negative for bleed). */
  left: number;
  /** Vertical position as fraction of artboard height. */
  top: number;
  /** Reference size in px at 1920px viewport width. */
  size: number;
  /** Hide below this viewport width when set. */
  hideBelow?: number;
}

function fromWireframe(
  id: string,
  style: SparkleStyle,
  leftPx: number,
  topPx: number,
  sizePx: number,
  hideBelow?: number,
): PageSparkleMark {
  return {
    id,
    style,
    left: leftPx / WIREFRAME_WIDTH,
    top: topPx / WIREFRAME_HEIGHT,
    size: sizePx,
    hideBelow,
  };
}

/** Homepage — Figma 52:406 page sparkle placements. */
export const HOMEPAGE_SPARKLE_MARKS: PageSparkleMark[] = [
  fromWireframe("66:1885", "scribble", -119, 1273, 522),
  fromWireframe("66:1617", "classic", 192, 546, 522, 768),
  fromWireframe("66:1619", "crosshatch", 499, 333, 269),
  fromWireframe("66:1818", "fine", 424, 81, 59),
  fromWireframe("66:1836", "classic", 1368, 834, 522, 768),
  fromWireframe("66:1851", "crosshatch", 1479, 483, 269),
  fromWireframe("66:1898", "diamond", 794, 927, 269),
  fromWireframe("66:1921", "solid", 1630, 1345, 400, 768),
  fromWireframe("66:1938", "crosshatch", 812, 2004, 392),
  fromWireframe("66:1969", "solid", 1458, 2241, 400, 768),
  fromWireframe("66:1976", "crosshatch", -111, 2541, 400),
  fromWireframe("66:1990", "crosshatch", 1534, 3252, 344, 768),
  fromWireframe("66:2011", "classic", 1241, 3010, 522, 768),
  fromWireframe("66:2012", "loose", 158, 3037, 522, 768),
  fromWireframe("66:2013", "wide", 817, 3917, 522, 768),
];

/**
 * Case study pages — same mark family, redistributed for long-form scroll.
 * Derived from wireframe styles/density when no dedicated case layout exists.
 */
export const CASE_STUDY_SPARKLE_MARKS: PageSparkleMark[] = [
  fromWireframe("cs:fine", "fine", 424, 81, 59),
  fromWireframe("cs:crosshatch-hero", "crosshatch", 1479, 483, 269),
  fromWireframe("cs:classic-hero", "classic", 192, 546, 522, 768),
  fromWireframe("cs:scribble", "scribble", -119, 1273, 522),
  fromWireframe("cs:solid-mid", "solid", 1630, 1345, 400, 768),
  fromWireframe("cs:crosshatch-mid", "crosshatch", 812, 2004, 392),
  fromWireframe("cs:diamond", "diamond", 794, 927, 269),
  fromWireframe("cs:loose", "loose", 158, 3037, 522, 768),
  fromWireframe("cs:wide", "wide", 817, 3917, 522, 768),
];

export type PageSparkleVariant = "home" | "case-study";

export const PAGE_SPARKLE_MARKS: Record<PageSparkleVariant, PageSparkleMark[]> =
  {
    home: HOMEPAGE_SPARKLE_MARKS,
    "case-study": CASE_STUDY_SPARKLE_MARKS,
  };
