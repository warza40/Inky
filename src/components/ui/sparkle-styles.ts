/** Figma 6:39 — Sparkle mark family (Sparkle Marks canvas 6:2). */
export const SPARKLE_STYLES = [
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

export const SPARKLE_ASSETS: Record<SparkleStyle, string> = {
  classic: "/sparkles/classic.svg",
  elongated: "/sparkles/elongated.svg",
  wide: "/sparkles/wide.svg",
  diamond: "/sparkles/diamond.svg",
  compact: "/sparkles/compact.svg",
  fine: "/sparkles/fine.svg",
  shooting: "/sparkles/shooting.svg",
  accent: "/sparkles/accent.svg",
  solid: "/sparkles/solid.svg",
  crosshatch: "/sparkles/crosshatch.svg",
  scribble: "/sparkles/scribble.svg",
  loose: "/sparkles/loose.svg",
};
