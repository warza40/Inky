import { CaseMain } from "./CaseMain";
import { CaseStudyFooter } from "./CaseStudyFooter";
import type { CaseStudy } from "@/case-studies/omantel";
import { caseStudyHasVisualsSection } from "@/case-studies/case-visuals";
import { CaseStudyDirection } from "./CaseStudyDirection";
import { CaseHeroMedia } from "./CaseHeroMedia";
import { CaseNextProject } from "./CaseNextProject";
import { JournalCaseFooterNext } from "@/components/case/journal/JournalCaseFooterNext";
import { JournalFooterSeam } from "@/components/case/journal/JournalFooterSeam";
import { OmantelJournalHero } from "@/components/case/journal/OmantelJournalHero";
import { OmantelJournalTitlePaper } from "@/components/case/journal/OmantelJournalTitlePaper";
import { CaseStudyLayout } from "@/components/sheets/CaseStudyLayout";
import { FloatingNav } from "@/components/layout/FloatingNav";

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

export function CaseLayout({ children, title, caseStudy }: CaseLayoutProps) {
  const sections = caseStudy ? buildCaseNavSections(caseStudy) : [];
  const hero = caseStudy ? heroCopyFromCaseStudy(caseStudy) : {};
  const isOmantelJournal = caseStudy?.slug === "omantel-bulk-activation";
  const themeClassName = [
    caseStudy?.warmthTheme ? `cs-theme-${caseStudy.warmthTheme}` : "",
    isOmantelJournal ? "cs-page--journal-omantel" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const siteHeader = <FloatingNav />;

  const heroBlock = (
    <div className="case-study-intro-sheet paper-content-sheet">
      {caseStudy?.heroImage ? (
        isOmantelJournal ? (
          <OmantelJournalHero
            src={caseStudy.heroImage.src}
            alt={caseStudy.heroImage.alt}
          />
        ) : (
          <CaseHeroMedia
            src={caseStudy.heroImage.src}
            alt={caseStudy.heroImage.alt}
          />
        )
      ) : null}
      {isOmantelJournal && caseStudy ? (
        <OmantelJournalTitlePaper
          slug={caseStudy.slug}
          metaLine={hero.metaLine}
          title={formatLabel(title)}
          problemStatement={hero.problemStatement}
          heroPills={caseStudy.heroPills}
          overview={caseStudy.overview}
        />
      ) : caseStudy ? (
        <div className="case-study-intro-copy">
          {hero.metaLine ? (
            <p className="case-study-intro-meta">{hero.metaLine}</p>
          ) : null}
          <h1 className="case-study-intro-title">{formatLabel(title)}</h1>
          {hero.problemStatement ? (
            <p className="case-study-intro-lede">{hero.problemStatement}</p>
          ) : null}
        </div>
      ) : null}
      <CaseStudyDirection
        title={formatLabel(title)}
        metaLine={hero.metaLine}
        problemStatement={hero.problemStatement}
        role={hero.role}
        warmthTheme={caseStudy?.warmthTheme ?? "madder"}
        showHeroBand={!isOmantelJournal && !caseStudy?.heroImage}
      />
    </div>
  );

  const footerBlock = (
    <>
      {isOmantelJournal ? <JournalFooterSeam /> : null}
      <CaseStudyFooter
        journalLayout={isOmantelJournal}
        nextProject={
          caseStudy ? (
            isOmantelJournal ? (
              <JournalCaseFooterNext
                currentSlug={caseStudy.slug}
                nextSlugOverride={caseStudy.nextProjectSlug}
              />
            ) : (
              <CaseNextProject
                currentSlug={caseStudy.slug}
                nextSlugOverride={caseStudy.nextProjectSlug}
              />
            )
          ) : undefined
        }
      />
    </>
  );

  return (
    <CaseMain>
      <CaseStudyLayout
        sections={sections}
        themeClassName={themeClassName}
        header={siteHeader}
        hero={heroBlock}
        footer={footerBlock}
      >
        {children}
      </CaseStudyLayout>
    </CaseMain>
  );
}
