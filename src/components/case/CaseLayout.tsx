import Link from "next/link";
import { CaseMain } from "./CaseMain";
import { CaseNavigation } from "./CaseNavigation";
import { CaseStudyFooter } from "./CaseStudyFooter";
import type { CaseStudy } from "@/case-studies/omantel";
import { caseStudyHasVisualsSection } from "@/case-studies/case-visuals";
import { CaseStudyDirection } from "./CaseStudyDirection";
import { CaseHeroMedia } from "./CaseHeroMedia";
import { CaseNextProject } from "./CaseNextProject";
import { OmantelJournalHero } from "@/components/case/journal/OmantelJournalHero";
import { OmantelJournalTitlePaper } from "@/components/case/journal/OmantelJournalTitlePaper";

const OMANTEL_JOURNAL_SLUG = "omantel-bulk-activation";

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
    Boolean(s.problemProcessVisual) ||
    (caseStudy.slug === OMANTEL_JOURNAL_SLUG && Boolean(s.outcomeBeforeAfter));
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
  };
}

export function CaseLayout({ children, title, caseStudy }: CaseLayoutProps) {
  const sections = caseStudy ? buildCaseNavSections(caseStudy) : [];
  const hero = caseStudy ? heroCopyFromCaseStudy(caseStudy) : {};
  const isJournalOmantel = caseStudy?.slug === OMANTEL_JOURNAL_SLUG;

  return (
    <CaseMain>
      <div
        className={`cs-page${caseStudy?.warmthTheme ? ` cs-theme-${caseStudy.warmthTheme}` : ""}${isJournalOmantel ? " cs-page--journal-omantel" : ""}`}
      >
        <div className="home-bg-grid" aria-hidden />
        <div className="cs-page-inner">
          {caseStudy?.heroImage ? (
            isJournalOmantel ? (
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
          <div className="case-top-bar">
            <header className="case-site-header" aria-label="Site header">
              <Link href="/" className="home-header-name">
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
          {isJournalOmantel && caseStudy ? (
            <OmantelJournalTitlePaper
              metaLine={hero.metaLine}
              title={formatLabel(title)}
              problemStatement={hero.problemStatement}
              overview={caseStudy.overview}
            />
          ) : null}
          <CaseStudyDirection
            title={formatLabel(title)}
            metaLine={hero.metaLine}
            problemStatement={hero.problemStatement}
            role={hero.role}
            warmthTheme={caseStudy?.warmthTheme ?? "madder"}
            showHeroBand={!isJournalOmantel}
          />
          <main className="cs-main">
            <div className="cs-content">{children}</div>
          </main>
          <CaseStudyFooter
            nextProject={
              caseStudy && !isJournalOmantel ? (
                <CaseNextProject
                  currentSlug={caseStudy.slug}
                  nextSlugOverride={caseStudy.nextProjectSlug}
                />
              ) : undefined
            }
          />
        </div>
      </div>
    </CaseMain>
  );
}
