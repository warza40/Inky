import { cn } from "@/lib/utils";

type ArrowDirection = "right" | "down";

/**
 * Nanum Pen callout. The arrow is anchored to the last word, not the column.
 * `down` turns the same artwork toward whatever sits under the line.
 */
export function HandwrittenHeading({
  text,
  direction = "right",
  className,
}: {
  text: string;
  direction?: ArrowDirection;
  className?: string;
}) {
  const words = text.split(" ");
  const end = words.length > 1 ? (words[words.length - 1] ?? text) : text;
  const lead = words.length > 1 ? words.slice(0, -1).join(" ") : "";
  const pointsDown = direction === "down";

  return (
    <h2 className={cn("projects-heading-group", className)}>
      <span className="projects-heading-group__lockup">
        {lead ? (
          <span className="projects-heading-group__lead">{lead} </span>
        ) : null}
        <span className="projects-heading-group__anchor">
          {end}
          <img
            src="/icons/curly-arrow.svg"
            alt=""
            aria-hidden
            width={147}
            height={98}
            className={cn(
              "projects-heading-group__arrow",
              pointsDown && "projects-heading-group__arrow--down",
            )}
            draggable={false}
          />
        </span>
      </span>
    </h2>
  );
}
