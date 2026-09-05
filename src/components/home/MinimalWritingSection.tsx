import { HOME_WRITING } from "@/data/home-writing";
import { WritingCard } from "@/components/layout/WritingCard";
import { Section } from "@/components/layout/Section";
import { LayoutGrid, GridCell } from "@/components/layout/LayoutGrid";

export function MinimalWritingSection() {
  return (
    <Section id="writing" padding="standard" ariaLabel="Writing">
      <LayoutGrid className="layout-grid--align-start">
        <GridCell col={{ start: 1, end: 7 }}>
          <h2 className="work-section__heading">Writing</h2>
        </GridCell>
        <GridCell col={{ start: 8, end: 13 }}>
          <p className="work-section__framing">
            Essays on behaviour, systems, and judgement calls you cannot
            wireframe away.
          </p>
        </GridCell>
      </LayoutGrid>

      <ul className="home-card-grid" role="list">
        {HOME_WRITING.map((item) => (
          <li key={item.id}>
            <WritingCard item={item} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
