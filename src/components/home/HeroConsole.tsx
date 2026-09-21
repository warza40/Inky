"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkle } from "@/components/ui/Sparkle";
import {
  heroConsoleControlsVariants,
  heroConsoleIntroVariants,
  heroConsoleScreenVariants,
  heroConsoleShellVariants,
  heroConsoleStaticVariants,
} from "@/components/home/hero-console-motion";

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
  const reduceMotion = useReducedMotion();
  const variants = reduceMotion ? heroConsoleStaticVariants : undefined;

  return (
    <div className="hero-console">
      <motion.div
        className="hero-console__shell"
        variants={variants ?? heroConsoleShellVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="hero-console__screen"
          variants={variants ?? heroConsoleScreenVariants}
          initial="hidden"
          animate="visible"
        >
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
            <motion.p
              className="hero-console__intro"
              variants={variants ?? heroConsoleIntroVariants}
              initial="hidden"
              animate="visible"
            >
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
            </motion.p>
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
        </motion.div>

        <motion.div
          className="hero-console__controls"
          aria-hidden
          variants={variants ?? heroConsoleControlsVariants}
          initial="hidden"
          animate="visible"
        >
          <span className="hero-console__control" />
          <span className="hero-console__control" />
          <span className="hero-console__control" />
        </motion.div>
      </motion.div>
    </div>
  );
}
