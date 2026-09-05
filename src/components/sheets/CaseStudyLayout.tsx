import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
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
}

export function CaseStudyLayout({
  children,
  header,
  hero,
  footer,
  sections = [],
  themeClassName,
  className,
}: CaseStudyLayoutProps) {
  return (
    <PageShell as="div" className={cn("case-study-layout", className)}>
      <div
        className={cn(
          "case-study-layout-page cs-page cs-page--sheets",
          themeClassName,
        )}
      >
        {header}

        <div className="case-study-layout-inner cs-page-inner">
          {sections.length > 0 ? (
            <div className="layout-rail sheet-nav-wrap">
              <InPageSectionNav sections={sections} />
            </div>
          ) : null}

          {hero ? <div className="layout-rail">{hero}</div> : null}

          <main className="cs-main case-study-layout-main">
            <div className="layout-rail cs-content case-study-layout-content">
              {children}
            </div>
          </main>

          {footer ? <div className="layout-rail">{footer}</div> : null}
        </div>
      </div>
    </PageShell>
  );
}
