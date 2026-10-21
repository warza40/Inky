/** Figma 6:39 — Sparkle mark family (Sparkle Marks canvas 6:2). */
const SPARKLE_STYLES = [
  "classic",
  "elongated",
  "wide",
  "diamond",
  "compact",
  "fine",
  "shooting",
  "accent",
  "solid",
  "crosshatch",
  "scribble",
  "loose",
] as const;

export type SparkleStyle = (typeof SPARKLE_STYLES)[number];

export const SPARKLE_ASSETS: Record<SparkleStyle, string> = Object.fromEntries(
  SPARKLE_STYLES.map((style) => [style, `/sparkles/${style}.svg`]),
) as Record<SparkleStyle, string>;
