import Link from "next/link";
import { Sparkle } from "@/components/ui/Sparkle";

const PLOTTER_AI_URL = "https://plotter.ai";

const EXPERIENCE_TAGS = [
  "6 YEARS",
  "B2B",
  "MICROSOFT",
  "AMAZON",
  "OMANTEL",
] as const;

/** Figma 125:1993 — Hero / Responsive (Tamagotchi console + inline sparkles). */
export function HeroConsole() {
  return (
    <div className="hero-console">
      <div className="hero-console__shell">
        <div className="hero-console__screen">
          <div className="hero-console__status" aria-hidden>
            <span className="hero-console__status-level">LEVEL_03</span>
            <span className="hero-console__status-battery">BAT_100%</span>
          </div>

          <div className="hero-console__identity">
            <h1 className="hero-console__name" id="mh-hero-title">
              I&apos;m Rachana
            </h1>
            <span className="hero-console__sparkle hero-console__sparkle--identity">
              <Sparkle
                style="crosshatch"
                decorative
                className="hero-console__sparkle-img"
              />
            </span>
          </div>

          <div className="hero-console__intro-row">
            <p className="hero-console__intro">
              <strong>
                Product designer studying behaviour, systems and AI.
              </strong>{" "}
              Designing, building, strategising and illustrating.{" "}
              <Link
                href={PLOTTER_AI_URL}
                className="hero-console__project-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Currently working on building Plotter.ai
              </Link>
            </p>
            <span className="hero-console__sparkle hero-console__sparkle--side">
              <Sparkle
                style="diamond"
                decorative
                className="hero-console__sparkle-img"
              />
            </span>
          </div>

          <div className="hero-console__experience">
            <div className="hero-console__tags">
              {EXPERIENCE_TAGS.map((tag) => (
                <span key={tag} className="hero-console__tag">
                  {tag}
                </span>
              ))}
            </div>
            <span className="hero-console__sparkle hero-console__sparkle--experience">
              <Sparkle
                style="classic"
                decorative
                className="hero-console__sparkle-img"
              />
            </span>
          </div>
        </div>

        <div className="hero-console__controls" aria-hidden>
          <span className="hero-console__control" />
          <span className="hero-console__control" />
          <span className="hero-console__control" />
        </div>
      </div>
    </div>
  );
}
