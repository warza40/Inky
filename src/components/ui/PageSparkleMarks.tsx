import { Sparkle } from "@/components/ui/Sparkle";
import {
  PAGE_SPARKLE_MARKS,
  WIREFRAME_HEIGHT,
  WIREFRAME_WIDTH,
  type PageSparkleVariant,
} from "@/components/ui/page-sparkle-marks";

interface PageSparkleMarksProps {
  variant: PageSparkleVariant;
}

function wireframeCss(value: number): string {
  return `calc(${value} * var(--sparkle-unit))`;
}

/** Figma 52:406 — decorative sparkle marks as a non-interactive page background. */
export function PageSparkleMarks({ variant }: PageSparkleMarksProps) {
  const marks = PAGE_SPARKLE_MARKS[variant];

  return (
    <div
      className="page-sparkle-marks"
      aria-hidden
      data-sparkle-variant={variant}
      style={{
        // Expose wireframe dimensions for CSS min-height on the shell.
        ["--sparkle-wireframe-width" as string]: `${WIREFRAME_WIDTH}`,
        ["--sparkle-wireframe-height" as string]: `${WIREFRAME_HEIGHT}`,
      }}
    >
      {marks.map((mark) => (
        <span
          key={mark.id}
          className="page-sparkle-marks__mark"
          data-sparkle-id={mark.id}
          data-hide-below={mark.hideBelow ?? undefined}
          style={{
            left: wireframeCss(mark.x),
            top: wireframeCss(mark.y),
            width: wireframeCss(mark.size),
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
