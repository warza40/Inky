import { HOME_CASE_STUDIES } from "@/data/home-case-studies";
import type { HomeCaseStudy } from "@/data/home-case-studies";
import { CaseStudyCard } from "@/components/layout/CaseStudyCard";
import { Section } from "@/components/layout/Section";
import { LayoutGrid, GridCell } from "@/components/layout/LayoutGrid";
import { Badge } from "@/components/ui/Badge";

/** Figma 67:1019 — row 1 narrow + wide, row 2 narrow left */
const BENTO_SLOT: Record<string, string> = {
  "warehouse-operations": "home-bento-grid__item--r1c1",
  "omantel-bulk-activation": "home-bento-grid__item--r1c2",
  "disaster-recovery": "home-bento-grid__item--r2c1",
};

const BENTO_ORDER = [
  "warehouse-operations",
  "omantel-bulk-activation",
  "disaster-recovery",
] as const;

function sortForBento(studies: HomeCaseStudy[]): HomeCaseStudy[] {
  const order = new Map<string, number>(
    BENTO_ORDER.map((slug, index) => [slug, index]),
  );
  return [...studies].sort(
    (a, b) => (order.get(a.slug) ?? 0) - (order.get(b.slug) ?? 0),
  );
}

export function CaseStudyGrid() {
  const studies = sortForBento(HOME_CASE_STUDIES);

  return (
    <Section
      id="work"
      className="work-section"
      padding="standard"
      ariaLabel="Selected work"
    >
      <LayoutGrid className="layout-grid--align-start">
        <GridCell col={{ start: 1, end: 7 }}>
          <Badge variant="badge" className="work-section__badge">
            Case studies &amp; demos
          </Badge>
          <h2 className="work-section__heading">Selected work</h2>
        </GridCell>
        <GridCell col={{ start: 8, end: 13 }}>
          <p className="work-section__framing">
            Internal tools and ops workflows. Case studies where one design call
            changed what teams could ship under pressure.
          </p>
        </GridCell>
      </LayoutGrid>

      <ul className="home-bento-grid" role="list">
        {studies.map((study) => (
          <li key={study.slug} className={BENTO_SLOT[study.slug]}>
            <CaseStudyCard study={study} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
