import { Sparkle } from "@/components/ui/Sparkle";
import {
  PAGE_SPARKLE_MARKS,
  type PageSparkleVariant,
} from "@/components/ui/page-sparkle-marks";

interface PageSparkleMarksProps {
  variant: PageSparkleVariant;
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
            width: `clamp(${Math.round(mark.size * 0.45)}px, ${((mark.size / 1920) * 100).toFixed(3)}vw, ${mark.size}px)`,
          }}
        >
          <Sparkle
            style={mark.style}
            size={mark.size}
            className="page-sparkle-marks__img"
          />
        </span>
      ))}
    </div>
  );
}
