import Link from "next/link";
import { CaseMain } from "./CaseMain";
import { CaseNavigation } from "./CaseNavigation";
import { CaseStudyFooter } from "./CaseStudyFooter";
import type { CaseStudy } from "@/case-studies/omantel";
import {
  caseStudyHasVisualsSection,
  caseStudyVisualsNavLabel,
} from "@/case-studies/case-visuals";
import { CaseStudyDirection } from "./CaseStudyDirection";
import { ContextEcosystem } from "./ContextEcosystem";
import { CaseContextFlow } from "./CaseContextFlow";

interface CaseLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  caseStudy?: CaseStudy;
}

function formatLabel(str: string): string {
  return str.replace(/\s+/g, " ").trim();
}

export function CaseLayout({
  children,
  title,
  subtitle,
  caseStudy,
}: CaseLayoutProps) {
  const sections: Array<{ id: string; label: string }> = [];
  if (
    caseStudy?.sections.context ||
    caseStudy?.sections.contextSections?.length ||
    caseStudy?.sections.contextFlow?.paragraphs?.length ||
    caseStudy?.sections.contextEcosystem
  ) {
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
  if (caseStudy && caseStudyHasVisualsSection(caseStudy)) {
    sections.push({
      id: "visuals",
      label: caseStudyVisualsNavLabel(caseStudy),
    });
  }

  const overview = caseStudy?.overview;

  return (
    <CaseMain>
      <div
        className={`cs-page${caseStudy?.warmthTheme ? ` cs-theme-${caseStudy.warmthTheme}` : ""}`}
      >
        <div className="home-bg-grid" aria-hidden />
        <div className="cs-page-inner">
          <CaseStudyDirection
            title={formatLabel(title)}
            titleAccent={caseStudy?.heroTitleAccent}
            warmthTheme={caseStudy?.warmthTheme ?? "madder"}
          />
          <div className="cs-nav-wrap">
            <div className="cs-breadcrumb" aria-label="Breadcrumb">
              <Link href="/" className="cs-bc-home">
                Home
              </Link>
              <span className="cs-bc-sep">/</span>
              <span className="cs-bc-current" title={formatLabel(title)}>
                {formatLabel(title)}
              </span>
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
                <div
                  className="cs-meta-row fade-in"
                  style={{ ["--delay" as any]: "80ms" }}
                >
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
                    <div className="cs-meta-label">
                      {overview.tools != null && overview.tools !== ""
                        ? "Tools"
                        : "Company"}
                    </div>
                    <div className="cs-meta-val">
                      {formatLabel(
                        overview.tools != null && overview.tools !== ""
                          ? overview.tools
                          : overview.company,
                      )}
                    </div>
                  </div>
                </div>
              )}
              {caseStudy?.sections?.contextFlow?.paragraphs?.length ? (
                <CaseContextFlow
                  paragraphs={caseStudy.sections.contextFlow.paragraphs}
                  aim={caseStudy.sections.contextFlow.aim}
                  delayStyle={{ ["--delay" as string]: "120ms" }}
                />
              ) : caseStudy?.sections?.contextSections &&
                caseStudy.sections.contextSections.length > 0 ? (
                <div
                  className="cs-context-text cs-context-text--sections fade-in"
                  style={{ ["--delay" as any]: "120ms" }}
                >
                  {caseStudy.sections.contextSections.map((section, i) => (
                    <section key={i} className="cs-context-section">
                      <h3 className="cs-context-section-title">
                        {section.title}
                      </h3>
                      <p className="cs-context-section-body">{section.body}</p>
                    </section>
                  ))}
                </div>
              ) : (
                caseStudy?.sections?.context && (
                  <p
                    className="cs-context-text fade-in"
                    style={{ ["--delay" as any]: "120ms" }}
                  >
                    {caseStudy.sections.context}
                  </p>
                )
              )}
              {caseStudy?.sections?.contextEcosystem && (
                <ContextEcosystem data={caseStudy.sections.contextEcosystem} />
              )}
            </header>

            <div className="cs-content">{children}</div>
          </main>
          <CaseStudyFooter />
        </div>
      </div>
    </CaseMain>
  );
}
