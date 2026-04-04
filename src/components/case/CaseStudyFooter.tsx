import Link from "next/link";

const CASE_FOOTER_COPY =
  "© 2025 · Built with Warmth DS · An outcome of brainstorming sessions with Claude and coding with Cursor.";

export function CaseStudyFooter() {
  return (
    <footer className="cs-case-footer" aria-label="Case study footer">
      <div className="cs-case-footer-inner">
        <div className="cs-case-footer-actions">
          <Link href="/" className="cs-case-footer-back">
            Back to home
          </Link>
          <a
            href="mailto:rachanamandal@gmail.com"
            className="cs-case-footer-reach"
          >
            Reach out →
          </a>
        </div>
        <div className="cs-case-footer-divider" aria-hidden />
        <p className="cs-case-footer-copy">{CASE_FOOTER_COPY}</p>
      </div>
    </footer>
  );
}
