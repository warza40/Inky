import Link from "next/link";
import { getCaseStudy, getNextCaseStudy } from "@/case-studies";

interface JournalCaseFooterNextProps {
  currentSlug: string;
  nextSlugOverride?: string;
}

/** Next case study link — lives in the dark case footer (journal layout). */
export function JournalCaseFooterNext({
  currentSlug,
  nextSlugOverride,
}: JournalCaseFooterNextProps) {
  const nextStudy = nextSlugOverride
    ? getCaseStudy(nextSlugOverride)
    : getNextCaseStudy(currentSlug);

  if (!nextStudy) return null;

  return (
    <Link
      href={`/case/${nextStudy.slug}`}
      className="ojo-journal-footer-next-link"
    >
      <span className="ojo-journal-footer-next-dir">Next →</span>
      <span className="ojo-journal-footer-next-title">{nextStudy.title}</span>
    </Link>
  );
}
