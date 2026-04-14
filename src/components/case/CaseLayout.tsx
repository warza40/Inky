import { CaseMain } from "./CaseMain";
import { CaseNavigation } from "./CaseNavigation";
import { CaseStudyFooter } from "./CaseStudyFooter";
import type { CaseStudy } from "@/case-studies/omantel";
import { caseStudyHasVisualsSection } from "@/case-studies/case-visuals";
import { CaseStudyDirection } from "./CaseStudyDirection";
import { CaseHeroMedia } from "./CaseHeroMedia";
import { CaseNextProject } from "./CaseNextProject";

interface CaseLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  caseStudy?: CaseStudy;
}

function formatLabel(str: string): string {
  return str.replace(/\s+/g, " ").trim();
}

function buildCaseNavSections(
  caseStudy: CaseStudy,
): Array<{ id: string; label: string }> {
  const s = caseStudy.sections;
  const hasContext =
    Boolean(s.context) ||
    Boolean(s.contextSections?.length) ||
    Boolean(s.contextFlow?.paragraphs?.length) ||
    Boolean(s.contextFlow?.images?.length) ||
    Boolean(s.contextEcosystem);
  const hasProblem =
    s.problem.length > 0 ||
    Boolean(s.understanding) ||
    s.constraints.length > 0 ||
    Boolean(s.problemProcessVisual);
  const hasDecisions =
    s.decisions.length > 0 || Boolean(s.reportCategories?.length);
  const hasOutcome =
    Boolean(s.outcome) ||
    Boolean(s.outcomeBeforeAfter) ||
    Boolean(s.outcomeHighlights?.length) ||
    Boolean(s.reflection) ||
    caseStudyHasVisualsSection(caseStudy);

  const sections: Array<{ id: string; label: string }> = [];
  if (hasContext) sections.push({ id: "context", label: "Context" });
  if (hasProblem) sections.push({ id: "problem", label: "Problem" });
  if (hasDecisions) sections.push({ id: "decisions", label: "Decisions" });
  if (hasOutcome) sections.push({ id: "outcome", label: "Outcome" });
  return sections;
}

function heroCopyFromCaseStudy(caseStudy: CaseStudy): {
  metaLine?: string;
  problemStatement?: string;
  role?: string;
  year?: string;
} {
  const overview = caseStudy.overview;
  const metaLine =
    caseStudy.heroMetaLine ??
    (overview ? `${overview.context} · ${overview.company}` : undefined);
  const fromOverviewProblem = overview?.problem?.trim();
  const fromFirstProblemPara = caseStudy.sections.problem[0]?.content
    ?.split("\n\n")
    .map((p) => p.trim())
    .find(Boolean);
  const problemStatement =
    caseStudy.heroProblemStatement ??
    fromFirstProblemPara ??
    fromOverviewProblem;

  return {
    metaLine,
    problemStatement,
    role: overview?.role,
    year: caseStudy.year,
  };
}

export function CaseLayout({ children, title, caseStudy }: CaseLayoutProps) {
  const sections = caseStudy ? buildCaseNavSections(caseStudy) : [];
  const hero = caseStudy ? heroCopyFromCaseStudy(caseStudy) : {};

  return (
    <CaseMain>
      <div
        className={`cs-page${caseStudy?.warmthTheme ? ` cs-theme-${caseStudy.warmthTheme}` : ""}`}
      >
        <div className="home-bg-grid" aria-hidden />
        <div className="cs-page-inner">
          <CaseStudyDirection
            title={formatLabel(title)}
            metaLine={hero.metaLine}
            problemStatement={hero.problemStatement}
            role={hero.role}
            year={hero.year}
            warmthTheme={caseStudy?.warmthTheme ?? "madder"}
          />
          {sections.length > 0 && (
            <div className="cs-nav-wrap cs-nav-wrap--blur">
              <div className="cs-tabs" id="cs-tabs" aria-label="Case sections">
                <CaseNavigation sections={sections} variant="cs" />
              </div>
            </div>
          )}

          {caseStudy?.heroImage ? (
            <CaseHeroMedia
              src={caseStudy.heroImage.src}
              alt={caseStudy.heroImage.alt}
            />
          ) : null}

          <main className="cs-main">
            <div className="cs-content">
              {children}
              {caseStudy ? (
                <CaseNextProject
                  currentSlug={caseStudy.slug}
                  nextSlugOverride={caseStudy.nextProjectSlug}
                />
              ) : null}
            </div>
          </main>
          <CaseStudyFooter />
        </div>
      </div>
    </CaseMain>
  );
}
