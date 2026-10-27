import { SiteFooter } from "@/components/layout/SiteFooter";
import { getCaseStudy, getNextCaseStudy } from "@/case-studies";

const CASE_FOOTER_COPY =
  "© 2025 · Built with Warmth DS · An outcome of brainstorming sessions with Claude and coding with Cursor.";

interface CaseStudyFooterProps {
  currentSlug?: string;
  nextSlugOverride?: string;
}

export function CaseStudyFooter({
  currentSlug,
  nextSlugOverride,
}: CaseStudyFooterProps) {
  const next = currentSlug
    ? nextSlugOverride
      ? getCaseStudy(nextSlugOverride)
      : getNextCaseStudy(currentSlug)
    : undefined;

  return (
    <SiteFooter
      variant="case"
      nextHref={next ? `/case/${next.slug}` : undefined}
      copyright={CASE_FOOTER_COPY}
    />
  );
}
