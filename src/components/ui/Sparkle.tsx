import { cn } from "@/lib/utils";
import {
  SPARKLE_ASSETS,
  type SparkleStyle,
} from "@/components/ui/sparkle-styles";

interface SparkleProps {
  className?: string;
  size?: number;
  /** Figma 6:39 — 12-variant sparkle mark family. */
  style?: SparkleStyle;
}

/** Figma 6:39 / Sparkle Marks 6:2 */
export function Sparkle({
  className,
  size = 96,
  style = "fine",
}: SparkleProps) {
  return (
    <img
      src={SPARKLE_ASSETS[style]}
      alt=""
      aria-hidden
      width={size}
      height={size}
      className={cn("sparkle-mark", `sparkle-mark--${style}`, className)}
    />
  );
}

export type { SparkleStyle } from "@/components/ui/sparkle-styles";
export { SPARKLE_STYLES } from "@/components/ui/sparkle-styles";
