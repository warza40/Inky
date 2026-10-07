import { Section } from "@/components/layout/Section";
import { LayoutGrid, GridCell } from "@/components/layout/LayoutGrid";
import { HeroConsole } from "@/components/home/HeroConsole";
import { HeroSocialLinks } from "@/components/home/HeroSocialLinks";

export function MinimalHero() {
  return (
    <Section className="home-hero" padding="none" ariaLabel="Introduction">
      <LayoutGrid className="layout-grid--align-start home-hero__grid">
        <GridCell className="home-hero__copy-cell">
          <div className="home-hero__copy">
            <p className="home-hero__badge">
              Senior Product Designer | Building with AI | Illustrating
            </p>
            <h1 className="home-hero__title" id="mh-hero-title">
              I&apos;m Rachana
            </h1>
            <p className="home-hero__lede">
              Product Designer detangling complex enterprise and systems level
              problems. Also studying behaviour, systems and AI.
            </p>
            <HeroSocialLinks />
          </div>
        </GridCell>
        <GridCell className="home-hero__device-cell">
          <HeroConsole />
        </GridCell>
      </LayoutGrid>
    </Section>
  );
}
