import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { PageSparkleVariant } from "@/components/ui/page-sparkle-marks";
import { PageShell } from "@/components/sheets/PageShell";
import {
  InPageSectionNav,
  type InPageNavSection,
} from "@/components/sheets/InPageSectionNav";

interface CaseStudyLayoutProps {
  children: ReactNode;
  header?: ReactNode;
  hero?: ReactNode;
  footer?: ReactNode;
  sections?: InPageNavSection[];
  themeClassName?: string;
  className?: string;
  sparkleMarks?: PageSparkleVariant;
}

export function CaseStudyLayout({
  children,
  header,
  hero,
  footer,
  sections = [],
  themeClassName,
  className,
  sparkleMarks = "case-study",
}: CaseStudyLayoutProps) {
  return (
    <PageShell
      as="div"
      className={cn("case-study-layout", className)}
      sparkleMarks={sparkleMarks}
    >
      <div
        className={cn(
          "case-study-layout-page cs-page cs-page--sheets",
          themeClassName,
        )}
      >
        <a className="cs-skip-link" href="#case-study-content">
          Skip to content
        </a>
        {header}

        <div className="case-study-layout-inner cs-page-inner">
          {sections.length > 0 ? (
            <div className="layout-rail sheet-nav-wrap">
              <InPageSectionNav sections={sections} />
            </div>
          ) : null}

          <main className="cs-main case-study-layout-main">
            {hero ? (
              <div className="layout-rail case-study-hero">{hero}</div>
            ) : null}
            <div
              id="case-study-content"
              tabIndex={-1}
              className="layout-rail cs-content case-study-layout-content"
            >
              {children}
            </div>
          </main>

          {footer ? (
            <div className="layout-rail case-study-footer-rail">{footer}</div>
          ) : null}
        </div>
      </div>
    </PageShell>
  );
}
