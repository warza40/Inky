import { Section } from "@/components/layout/Section";
import { LayoutGrid, GridCell } from "@/components/layout/LayoutGrid";
import { HeroConsole } from "@/components/home/HeroConsole";

export function MinimalHero() {
  return (
    <Section className="home-hero" padding="none" ariaLabel="Introduction">
      <LayoutGrid className="layout-grid--align-start">
        <GridCell className="home-hero__content-cell">
          <HeroConsole />
        </GridCell>
      </LayoutGrid>
    </Section>
  );
}
