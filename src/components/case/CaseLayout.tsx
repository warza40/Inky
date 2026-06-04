import Link from "next/link";
import { CaseMain } from "./CaseMain";
import { CaseNavigation } from "./CaseNavigation";
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
  const isJournalCase = Boolean(caseStudy);

  return (
    <CaseMain>
      <div
        className={`cs-page${caseStudy?.warmthTheme ? ` cs-theme-${caseStudy.warmthTheme}` : ""}${isJournalCase ? " cs-page--journal-omantel" : ""}`}
      >
        <div className="home-bg-grid" aria-hidden />
        <div className="cs-page-inner">
          <div className="case-top-bar">
            <header className="case-site-header" aria-label="Site header">
              <Link
                href="/"
                className="home-header-name"
                aria-label="Rachana Mandal home"
              >
                Rachana Mandal
                <em className="home-header-name-accent">.</em>
              </Link>
            </header>
            {sections.length > 0 && (
              <div className="cs-nav-wrap cs-nav-wrap--blur">
                <div
                  className="cs-tabs"
                  id="cs-tabs"
                  aria-label="Case sections"
                >
                  <CaseNavigation sections={sections} variant="cs" />
                </div>
              </div>
            )}
          </div>
          {caseStudy?.heroImage ? (
            isJournalCase ? (
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
          {isJournalCase && caseStudy ? (
            <OmantelJournalTitlePaper
              slug={caseStudy.slug}
              metaLine={hero.metaLine}
              title={formatLabel(title)}
              problemStatement={hero.problemStatement}
              heroPills={caseStudy.heroPills}
              overview={caseStudy.overview}
            />
          ) : null}
          <CaseStudyDirection
            title={formatLabel(title)}
            metaLine={hero.metaLine}
            problemStatement={hero.problemStatement}
            role={hero.role}
            warmthTheme={caseStudy?.warmthTheme ?? "madder"}
            showHeroBand={!isJournalCase}
          />
          <main className="cs-main">
            <div className="cs-content">{children}</div>
          </main>
          {isJournalCase ? <JournalFooterSeam /> : null}
          <CaseStudyFooter
            journalLayout={isJournalCase}
            nextProject={
              caseStudy ? (
                isJournalCase ? (
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
        </div>
      </div>
    </CaseMain>
  );
}
