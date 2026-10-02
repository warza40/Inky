import { Section } from "@/components/layout/Section";
import { HeroConsole } from "@/components/home/HeroConsole";
import { ProjectsHeadingGroup } from "@/components/home/ProjectsHeadingGroup";
import { HeroCaseBoard } from "@/components/home/HeroCaseBoard";

export function MinimalHero() {
  return (
    <Section className="home-hero" padding="none" ariaLabel="Introduction">
      <div className="home-hero-stage">
        <div className="home-hero-stage__intro">
          <div className="home-hero-stage__console">
            <HeroConsole />
          </div>
          <div className="home-hero-stage__heading">
            <ProjectsHeadingGroup />
          </div>
        </div>
        <HeroCaseBoard />
      </div>
    </Section>
  );
}
