import { HOME_CASE_STUDIES } from "@/data/home-case-studies";
import { CaseStudyCard } from "@/components/layout/CaseStudyCard";
import { Section } from "@/components/layout/Section";
import { LayoutGrid, GridCell } from "@/components/layout/LayoutGrid";

export function CaseStudyGrid() {
  return (
    <Section
      id="work"
      className="work-section"
      padding="standard"
      ariaLabel="Selected work"
    >
      <LayoutGrid className="layout-grid--align-start">
        <GridCell col={{ start: 1, end: 7 }}>
          <h2 className="work-section__heading">Selected work</h2>
        </GridCell>
        <GridCell col={{ start: 8, end: 13 }}>
          <p className="work-section__framing">
            Internal tools and ops workflows. Case studies where one design call
            changed what teams could ship under pressure.
          </p>
        </GridCell>
      </LayoutGrid>

      <ul className="home-card-grid" role="list">
        {HOME_CASE_STUDIES.map((study) => (
          <li key={study.slug}>
            <CaseStudyCard study={study} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
