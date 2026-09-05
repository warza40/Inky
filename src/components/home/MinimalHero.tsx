import { Section } from "@/components/layout/Section";
import { LayoutGrid, GridCell } from "@/components/layout/LayoutGrid";

export function MinimalHero() {
  return (
    <Section className="home-hero" padding="none" ariaLabel="Introduction">
      <LayoutGrid className="layout-grid--align-start">
        <GridCell
          col={{ start: 1, end: 7 }}
          className="home-hero__headline-cell"
        >
          <p className="home-hero__name">Rachana Mandal</p>
          <h1 className="home-hero__headline" id="mh-hero-title">
            Product designer studying behaviour, systems and AI.
          </h1>
        </GridCell>
        <GridCell col={{ start: 9, end: 13 }} className="home-hero__meta-cell">
          <div className="home-hero__meta">
            <p>Bengaluru</p>
            <p>Open to roles</p>
          </div>
        </GridCell>
      </LayoutGrid>
    </Section>
  );
}
