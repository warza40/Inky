import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { LayoutGrid, GridCell } from "@/components/layout/LayoutGrid";
import { TamagotchiWebsiteThumbnail } from "@/components/ui/TamagotchiWebsiteThumbnail";

const PLOTTER_AI_URL = "https://plotter.ai";

export function MinimalHero() {
  return (
    <Section className="home-hero" padding="none" ariaLabel="Introduction">
      <LayoutGrid className="layout-grid--align-start">
        <GridCell className="home-hero__content-cell">
          <div className="home-hero__content">
            <div className="home-hero__title-block">
              <h1 className="home-hero__name" id="mh-hero-title">
                I&apos;m Rachana
              </h1>
              <p className="home-hero__intro">
                <strong>
                  Product designer studying behaviour, systems and AI.
                </strong>{" "}
                Designing, building, strategising and illustrating.{" "}
                <Link
                  href={PLOTTER_AI_URL}
                  className="home-hero__project-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Currently working on building Plotter.ai
                </Link>
              </p>
            </div>
            <p className="home-hero__body">
              6 years on enterprise and B2B platforms. I designed Copilot
              workflows inside Microsoft 365 before they shipped, warehouse
              operations for Amazon, and telecom commerce for Omantel. My work
              is making AI useful inside systems with real permissions, real
              stakes and users who don&apos;t trust it yet.
            </p>

            <div className="home-hero__annotation">
              <TamagotchiWebsiteThumbnail />
              <div className="home-hero__annotation-copy">
                <p className="home-hero__annotation-lede">
                  Interactive cursor companion shifts expressions based on hover
                  state!
                </p>
                <p className="home-hero__annotation-meta">
                  [COMPANION_OS: IDLE / PLAY / WRITE]
                </p>
              </div>
            </div>
          </div>
        </GridCell>
      </LayoutGrid>
    </Section>
  );
}
