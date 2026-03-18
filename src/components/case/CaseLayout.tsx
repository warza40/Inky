import Link from "next/link";
import { CaseMain } from "./CaseMain";
import { CaseNavigation } from "./CaseNavigation";
import type { CaseStudy } from "@/case-studies/omantel";
import { CaseStudyDirection } from "./CaseStudyDirection";

interface CaseLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  caseStudy?: CaseStudy;
}

function formatLabel(str: string): string {
  return str.replace(/\s+/g, " ").trim();
}

export function CaseLayout({ children, title, subtitle, caseStudy }: CaseLayoutProps) {
  const sections: Array<{ id: string; label: string }> = [];
  if (caseStudy?.sections.context) {
    sections.push({ id: "context", label: "Context" });
  }
  if (caseStudy?.sections.problem.length) {
    sections.push({ id: "problem", label: "Problem" });
  }
  if (caseStudy?.sections.understanding) {
    sections.push({ id: "understanding", label: "Understanding" });
  }
  if (caseStudy?.sections.constraints.length) {
    sections.push({ id: "constraints", label: "Constraints" });
  }
  if (caseStudy?.sections.decisions.length) {
    sections.push({ id: "decisions", label: "Decisions" });
  }
  if (caseStudy?.sections.outcome) {
    sections.push({ id: "outcome", label: "Outcome and Impact" });
  }
  if (caseStudy?.sections.reflection) {
    sections.push({ id: "reflection", label: "Reflection" });
  }
  if (
    (caseStudy?.images && caseStudy.images.length > 0) ||
    (caseStudy?.visualsSections && caseStudy.visualsSections.length > 0)
  ) {
    sections.push({
      id: "visuals",
      label: caseStudy?.visualsSections?.length ? "Noteworthy iterations" : "Visuals",
    });
  }

  const overview = caseStudy?.overview;

  return (
    <CaseMain>
      <div className="cs-page">
        <CaseStudyDirection
          title={formatLabel(title)}
          heroGradient={["#E8392A", "#FF8844", "#F5B800"]}
        />
        <div className="cs-nav-wrap">
          <div className="cs-breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="cs-bc-home">
              Home
            </Link>
            <span className="cs-bc-sep">/</span>
            <span className="cs-bc-current">{formatLabel(title)}</span>
          </div>
          {sections.length > 0 && (
            <div className="cs-tabs" id="cs-tabs" aria-label="Case sections">
              <CaseNavigation sections={sections} variant="cs" />
            </div>
          )}
        </div>

        <main className="cs-main">
          <header className="cs-hero fade-in" id="context">
            {overview && (
              <div className="cs-meta-row fade-in" style={{ ["--delay" as any]: "80ms" }}>
                <div className="cs-meta-col">
                  <div className="cs-meta-label">Role</div>
                  <div className="cs-meta-val">
                    {formatLabel(overview.role)}
                  </div>
                </div>
                <div className="cs-meta-col">
                  <div className="cs-meta-label">Context</div>
                  <div className="cs-meta-val">
                    {formatLabel(overview.context)}
                  </div>
                </div>
                <div className="cs-meta-col">
                  <div className="cs-meta-label">Company</div>
                  <div className="cs-meta-val">
                    {formatLabel(overview.company)}
                  </div>
                </div>
              </div>
            )}
            {caseStudy?.sections?.context && (
              <p className="cs-context-text fade-in" style={{ ["--delay" as any]: "120ms" }}>
                {caseStudy.sections.context}
              </p>
            )}
          </header>

          <div className="cs-content">{children}</div>
        </main>
      </div>
    </CaseMain>
  );
}
