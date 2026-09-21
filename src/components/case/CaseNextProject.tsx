import Link from "next/link";
import { getCaseStudy, getNextCaseStudy } from "@/case-studies";
import { expandingCursorAttrs } from "@/lib/expanding-cursor";

interface CaseNextProjectProps {
  currentSlug: string;
  /** When set (e.g. on a case study), links here instead of the next list item */
  nextSlugOverride?: string;
}

export function CaseNextProject({
  currentSlug,
  nextSlugOverride,
}: CaseNextProjectProps) {
  const next = nextSlugOverride
    ? getCaseStudy(nextSlugOverride)
    : getNextCaseStudy(currentSlug);
  if (!next) return null;

  return (
    <section
      className="cs-next-project"
      aria-labelledby="cs-next-project-heading"
    >
      <h2 id="cs-next-project-heading" className="cs-next-project-label">
        Next project
      </h2>
      <Link
        href={`/case/${next.slug}`}
        className="cs-next-project-link"
        {...expandingCursorAttrs({
          title: "View next project",
          hint: next.title,
        })}
      >
        {next.title}
      </Link>
    </section>
  );
}
