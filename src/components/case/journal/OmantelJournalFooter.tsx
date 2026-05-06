import Link from "next/link";
import {
  getCaseStudy,
  getNextCaseStudy,
  getPreviousCaseStudy,
} from "@/case-studies";

interface OmantelJournalFooterProps {
  currentSlug: string;
  /** When set, “Next” uses this slug (matches CaseNextProject behaviour) */
  nextSlugOverride?: string;
}

const CONTACT_MAIL = "rachanamandal@gmail.com";

export function OmantelJournalFooter({
  currentSlug,
  nextSlugOverride,
}: OmantelJournalFooterProps) {
  const prev = getPreviousCaseStudy(currentSlug);
  const nextStudy = nextSlugOverride
    ? getCaseStudy(nextSlugOverride)
    : getNextCaseStudy(currentSlug);

  return (
    <footer className="ojo-journal-footer" aria-label="Project navigation">
      <div className="ojo-tape ojo-tape-koi ojo-footer-tape" aria-hidden />
      <div className="ojo-footer-insert ojo-paper ojo-paper-shadow">
        <div className="ojo-footer-prev">
          {prev ? (
            <Link href={`/case/${prev.slug}`} className="ojo-footer-link">
              <span className="ojo-footer-dir">← Previous</span>
              <span className="ojo-footer-project">{prev.title}</span>
            </Link>
          ) : (
            <div className="ojo-footer-spacer" aria-hidden />
          )}
        </div>
        <div className="ojo-footer-center">
          <span className="ojo-footer-name">Rachana Mandal</span>
          <span className="ojo-footer-vdiv" aria-hidden />
          <a href={`mailto:${CONTACT_MAIL}`} className="ojo-footer-contact">
            {CONTACT_MAIL}
          </a>
        </div>
        <div>
          {nextStudy ? (
            <Link
              href={`/case/${nextStudy.slug}`}
              className="ojo-footer-link ojo-footer-next"
            >
              <span className="ojo-footer-dir">Next →</span>
              <span className="ojo-footer-project">{nextStudy.title}</span>
            </Link>
          ) : (
            <div className="ojo-footer-spacer" aria-hidden />
          )}
        </div>
      </div>
    </footer>
  );
}
