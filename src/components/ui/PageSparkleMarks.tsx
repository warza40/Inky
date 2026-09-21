import { Sparkle } from "@/components/ui/Sparkle";
import {
  PAGE_SPARKLE_MARKS,
  type PageSparkleVariant,
} from "@/components/ui/page-sparkle-marks";

interface PageSparkleMarksProps {
  variant: PageSparkleVariant;
}

function markWidthCss(size: number): string {
  const min = Math.round(size * 0.4);
  const vw = ((size / 1920) * 100).toFixed(3);
  return `clamp(${min}px, ${vw}vw, ${size}px)`;
}

/** Figma 52:406 — decorative sparkle marks as a non-interactive page background. */
export function PageSparkleMarks({ variant }: PageSparkleMarksProps) {
  const marks = PAGE_SPARKLE_MARKS[variant];

  return (
    <div
      className="page-sparkle-marks"
      aria-hidden
      data-sparkle-variant={variant}
    >
      {marks.map((mark) => (
        <span
          key={mark.id}
          className="page-sparkle-marks__mark"
          data-sparkle-id={mark.id}
          data-hide-below={mark.hideBelow ?? undefined}
          style={{
            left: `${mark.left * 100}%`,
            top: `${mark.top * 100}%`,
            width: markWidthCss(mark.size),
          }}
        >
          <Sparkle
            style={mark.style}
            decorative
            className="page-sparkle-marks__img"
          />
        </span>
      ))}
    </div>
  );
}
