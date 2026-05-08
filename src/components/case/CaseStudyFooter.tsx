import type { ReactNode } from "react";
import Link from "next/link";

const CASE_FOOTER_COPY =
  "© 2025 · Built with Warmth DS · An outcome of brainstorming sessions with Claude and coding with Cursor.";

interface CaseStudyFooterProps {
  /** When set (e.g. CaseNextProject), renders above footer actions in this footer */
  nextProject?: ReactNode;
}

export function CaseStudyFooter({ nextProject }: CaseStudyFooterProps) {
  return (
    <footer
      className="site-footer cs-case-footer"
      aria-label="Case study footer"
    >
      <div className="cs-case-footer-inner">
        {nextProject}
        <div className="cs-case-footer-actions">
          <Link href="/" className="cs-case-footer-back">
            Back to home
          </Link>
        </div>
        <div className="cs-case-footer-divider" aria-hidden />
        <p className="cs-case-footer-copy">{CASE_FOOTER_COPY}</p>
      </div>
    </footer>
  );
}
