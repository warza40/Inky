import Link from "next/link";
import { Sparkle } from "@/components/ui/Sparkle";

const PLOTTER_AI_URL = "https://plotter.ai";

/** Compact Tamagotchi — Plotter.ai device in the hero’s 4-column track. */
export function HeroConsole() {
  return (
    <div className="hero-console">
      <span className="hero-console__sparkle hero-console__sparkle--left">
        <Sparkle
          style="diamond"
          decorative
          className="hero-console__sparkle-img"
        />
      </span>
      <span className="hero-console__sparkle hero-console__sparkle--top">
        <Sparkle
          style="classic"
          decorative
          className="hero-console__sparkle-img"
        />
      </span>

      <div className="hero-console__shell">
        <div className="hero-console__screen">
          <div className="hero-console__status" aria-hidden>
            <span className="hero-console__status-level">LEVEL_03</span>
            <span className="hero-console__status-battery">BAT_100%</span>
          </div>

          <p className="hero-console__building">
            Currently building{" "}
            <Link
              href={PLOTTER_AI_URL}
              className="hero-console__project-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Plotter.ai
            </Link>{" "}
            (an intelligent case study crafting tool)
          </p>
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
