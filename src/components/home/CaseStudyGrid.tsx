import { HOME_CASE_STUDIES } from "@/data/home-case-studies";
import { CaseStudyCard } from "@/components/layout/CaseStudyCard";
import { Section } from "@/components/layout/Section";
import { LayoutGrid, GridCell } from "@/components/layout/LayoutGrid";
import { Badge } from "@/components/ui/Badge";

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

      <ul className="home-card-grid" role="list">
        {HOME_CASE_STUDIES.map((study) => (
          <li
            key={study.slug}
            className={
              study.layout === "feature"
                ? "home-card-grid__item--featured"
                : undefined
            }
          >
            <CaseStudyCard study={study} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
