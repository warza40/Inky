import { CaseMain } from "./CaseMain";
import { CaseStudyFooter } from "./CaseStudyFooter";
import { omantelStoryNav, type CaseStudy } from "@/case-studies/omantel";
import { caseStudyHasVisualsSection } from "@/case-studies/case-visuals";
import { CaseStudyHero } from "./CaseStudyHero";
import { CaseStudyLayout } from "@/components/sheets/CaseStudyLayout";
import { FloatingNav } from "@/components/layout/FloatingNav";

interface CaseLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  caseStudy?: CaseStudy;
}

function buildCaseNavSections(
  caseStudy: CaseStudy,
): Array<{ id: string; label: string }> {
  if (caseStudy.slug === "omantel-bulk-activation") {
    return omantelStoryNav.map((item) => ({ id: item.id, label: item.label }));
  }

  const s = caseStudy.sections;
  const hasContext =
    Boolean(s.context) ||
    Boolean(s.contextSections?.length) ||
    Boolean(s.contextFlow?.paragraphs?.length) ||
    Boolean(s.contextFlow?.images?.length) ||
    Boolean(s.contextEcosystem) ||
    Boolean(s.journalImpact?.blocks?.length);
  const hasProblem =
    s.problem.length > 0 ||
    Boolean(s.understanding) ||
    s.constraints.length > 0 ||
    Boolean(s.problemProcessVisual) ||
    Boolean(s.outcomeBeforeAfter);
  const hasDecisions =
    s.decisions.length > 0 || Boolean(s.reportCategories?.length);
  const hasOutcome =
    Boolean(s.outcome) ||
    Boolean(s.outcomeBeforeAfter) ||
    Boolean(s.outcomeHighlights?.length) ||
    Boolean(s.reflection) ||
    caseStudyHasVisualsSection(caseStudy);

  const sections: Array<{ id: string; label: string }> = [];
  if (hasContext) sections.push({ id: "context", label: "Overview" });
  if (hasProblem) sections.push({ id: "problem", label: "Problem" });
  if (hasDecisions) sections.push({ id: "decisions", label: "Key Decisions" });
  if (hasOutcome) sections.push({ id: "outcome", label: "Reflection" });
  return sections;
}

function heroCopyFromCaseStudy(caseStudy: CaseStudy): {
  metaLine?: string;
  problemStatement?: string;
  role?: string;
} {
  const overview = caseStudy.overview;
  const metaLine =
    caseStudy.heroMetaLine ??
    (overview
      ? [overview.context, overview.company].filter(Boolean).join(" · ")
      : undefined);
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
  };
}

function introFacts(
  caseStudy: CaseStudy,
): Array<{ label: string; value: string }> {
  const overview = caseStudy.overview;
  const focusValue = overview.tools ?? overview.focus;
  return [
    { label: "Company", value: overview.company },
    { label: "Problem", value: overview.problem },
    { label: overview.tools ? "Tools" : "Focus", value: focusValue },
  ].filter((fact) => fact.value.trim());
}

export function CaseLayout({ children, title, caseStudy }: CaseLayoutProps) {
  const sections = caseStudy ? buildCaseNavSections(caseStudy) : [];
  const hero = caseStudy ? heroCopyFromCaseStudy(caseStudy) : {};
  const isOmantel = caseStudy?.slug === "omantel-bulk-activation";
  const systemCase = Boolean(caseStudy) && !isOmantel;
  const themeClassName = [
    isOmantel ? "cs-page--omantel" : "",
    systemCase ? "cs-page--system" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const facts = caseStudy ? introFacts(caseStudy) : [];

  const siteHeader = <FloatingNav />;

  const heroBlock = caseStudy ? (
    <CaseStudyHero
      title={title}
      metaLine={hero.metaLine}
      lede={hero.problemStatement}
      caseStudy={caseStudy}
      facts={facts}
      includeImpact
    />
  ) : null;

  const footerBlock = (
    <CaseStudyFooter
      currentSlug={caseStudy?.slug}
      nextSlugOverride={caseStudy?.nextProjectSlug}
    />
  );

  return (
    <CaseMain>
      <CaseStudyLayout
        sections={sections}
        themeClassName={themeClassName}
        header={siteHeader}
        hero={heroBlock}
        footer={footerBlock}
        sparkleMarks={isOmantel || systemCase ? "omantel" : "case-study"}
      >
        {children}
      </CaseStudyLayout>
    </CaseMain>
  );
}
