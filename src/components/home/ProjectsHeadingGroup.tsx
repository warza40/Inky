import { Badge } from "@/components/ui/Badge";

/** Figma 133:1786 — handwritten work callout to the right of the hero console. */
export function ProjectsHeadingGroup() {
  return (
    <div className="projects-heading-group">
      <div className="projects-heading-group__copy">
        <h2 className="projects-heading-group__title">
          Projects I&apos;ve worked on
        </h2>
        <Badge variant="badge" className="projects-heading-group__badge">
          Case studies &amp; demos
        </Badge>
      </div>
      <img
        src="/icons/curly-arrow.svg"
        alt=""
        aria-hidden
        width={147}
        height={98}
        className="projects-heading-group__arrow"
        draggable={false}
      />
    </div>
  );
}
