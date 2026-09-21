import { Section } from "@/components/layout/Section";
import { LayoutGrid, GridCell } from "@/components/layout/LayoutGrid";
import { HeroConsole } from "@/components/home/HeroConsole";

export function MinimalHero() {
  return (
    <Section className="home-hero" padding="none" ariaLabel="Introduction">
      <LayoutGrid className="layout-grid--align-start">
        <GridCell className="home-hero__content-cell">
          <HeroConsole />
          <p className="home-hero__body">
            6 years on enterprise and B2B platforms. I designed Copilot
            workflows inside Microsoft 365 before they shipped, warehouse
            operations for Amazon, and telecom commerce for Omantel. My work is
            making AI useful inside systems with real permissions, real stakes
            and users who don&apos;t trust it yet.
          </p>
        </GridCell>
      </LayoutGrid>
    </Section>
  );
}
