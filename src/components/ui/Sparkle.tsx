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
  /** Page background marks — size comes from CSS, not fixed img dimensions. */
  decorative?: boolean;
}

/** Figma 6:39 / Sparkle Marks 6:2 */
export function Sparkle({
  className,
  size = 96,
  style = "fine",
  decorative = false,
}: SparkleProps) {
  return (
    <img
      src={SPARKLE_ASSETS[style]}
      alt=""
      aria-hidden
      width={decorative ? undefined : size}
      height={decorative ? undefined : size}
      className={cn(
        "sparkle-mark",
        `sparkle-mark--${style}`,
        decorative && "sparkle-mark--decorative",
        className,
      )}
      draggable={false}
    />
  );
}
