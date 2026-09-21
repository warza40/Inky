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
  fromWireframe("66:1617", "diamond", 192, 546, 522, 768),
  fromWireframe("66:1619", "crosshatch", 499, 333, 269),
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

/** Case study pages — wireframe placements redistributed for long-form scroll. */
export const CASE_STUDY_SPARKLE_MARKS: PageSparkleMark[] = [
  fromWireframe("cs:solid-nav", "solid", 424, 81, 59),
  fromWireframe("cs:crosshatch-hero", "crosshatch", 1479, 483, 269),
  fromWireframe("cs:diamond-hero", "diamond", 192, 546, 522, 768),
  fromWireframe("cs:scribble", "scribble", -119, 1273, 522),
  fromWireframe("cs:solid-mid", "solid", 1630, 1345, 400, 768),
  fromWireframe("cs:crosshatch-mid", "crosshatch", 812, 2004, 392),
  fromWireframe("cs:solid-grid", "solid", 794, 927, 269),
  fromWireframe("cs:fine", "fine", 158, 3037, 522, 768),
  fromWireframe("cs:wide", "wide", 817, 3917, 522, 768),
];

export type PageSparkleVariant = "home" | "case-study";

export const PAGE_SPARKLE_MARKS: Record<PageSparkleVariant, PageSparkleMark[]> =
  {
    home: HOMEPAGE_SPARKLE_MARKS,
    "case-study": CASE_STUDY_SPARKLE_MARKS,
  };
