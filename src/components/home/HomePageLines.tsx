"use client";

import Link from "next/link";
import { PixelFooter } from "@/components/home/PixelFooter";
import { HomepageFixes } from "@/components/home/HomepageFixes";
import { WorkSection } from "@/components/home/WorkSection";
import { WritingSection } from "@/components/home/WritingSection";

const CENTER_LINKS = [
  { label: "Work",      href: "#work" },
  { label: "Writing",   href: "https://substack.com/@thelilyput",    external: true },
  { label: "Instagram", href: "https://instagram.com/rachanamandal", external: true },
];

export function HomePageLines() {
  return (
    <div className="home-layout text-foreground min-h-full flex flex-col">
      <HomepageFixes />

      {/* ── Header ─────────────────────────────────── */}
      <header className="home-header" aria-label="Site header">
        <Link href="/" className="home-header-name">
          Rachana Mandal.
        </Link>
        <nav className="home-header-nav" aria-label="Primary navigation">
          {CENTER_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="home-header-nav-link"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="home-header-end">
          <Link href="/resume.pdf" download className="home-header-resume">
            Resume &rarr;
          </Link>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────── */}
      <section className="home-hero" aria-label="Hero">
        <div className="home-hero-left">
          <p className="home-hero-label">— Senior UX Designer · Strategist</p>
          <h1 className="home-hero-h1">
            I work on complex<br />
            product systems where<br />
            <em className="home-hero-em">clarity often breaks down.</em>
          </h1>
          <p className="home-hero-caption">
            Every system that feels effortless started with a wall or a board
            that looked like this. The work in between — from research to
            insight, complexity to story, problem to&nbsp;solution.
          </p>
          <a href="#work" className="home-hero-cta">
            See the work <span className="home-hero-cta-arrow" aria-hidden />
          </a>
        </div>

        {/* Right — sticky notes */}
        <div className="home-hero-right" aria-hidden="true">
          <div className="hero-notes">
            <div className="sn sn-yellow sn-1">
              &ldquo;Why is the user even here at this step?&rdquo;
            </div>
            <div className="sn sn-pink sn-2">
              Reframe — it&rsquo;s not a form problem
            </div>
            <div className="sn sn-blue sn-3">
              What if we removed the whole flow?
            </div>
            <div className="sn sn-cream sn-4">
              The real job-to-be-done is trust
            </div>
            <div className="sn sn-mint sn-5">
              Ask again. Then ask&nbsp;why.
            </div>
          </div>
        </div>
      </section>

      {/* ── Work ───────────────────────────────────── */}
      <WorkSection />

      {/* ── Writing ─────────────────────────────────── */}
      <WritingSection />

      <PixelFooter />
    </div>
  );
}
