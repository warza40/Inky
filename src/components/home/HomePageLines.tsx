"use client";

import Link from "next/link";
import { PixelFooter } from "@/components/home/PixelFooter";
import { HomepageFixes } from "@/components/home/HomepageFixes";
import { AboutSection } from "@/components/home/AboutSection";
import { WorkSection } from "@/components/home/WorkSection";
import { WritingSection } from "@/components/home/WritingSection";

const CENTER_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Writing", href: "#writing" },
  { label: "About me", href: "#about" },
  {
    label: "Illustrations",
    href: "https://www.instagram.com/inky_lily/",
    external: true,
  },
];

export function HomePageLines() {
  return (
    <div className="home-layout text-foreground flex flex-col">
      <HomepageFixes />

      {/* ── Header ─────────────────────────────────── */}
      <header className="home-header" aria-label="Site header">
        <Link href="/" className="home-header-name">
          Rachana Mandal
          <em className="home-header-name-accent">.</em>
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
      <section className="home-hero" aria-label="Introduction">
        <div className="home-hero-left">
          <ul
            className="home-hero-badges"
            aria-label="Role, experience, and location"
          >
            <li className="home-hero-badge">Senior Product Designer</li>
            <li className="home-hero-badge">5+ years</li>
            <li className="home-hero-badge">B2B & enterprise · Bengaluru</li>
          </ul>
          <h1 className="home-hero-h1">
            Hi, I&apos;m Rachana
            <br />I am Designing,{" "}
            <span className="home-hero-word-writing">writing</span> and{" "}
            <span className="home-hero-word-illustrate">Illustrating</span>.
            <br />I work on complex product systems where&nbsp;
            <span className="home-hero-em not-italic">
              clarity often breaks down.
            </span>
          </h1>
          <p className="home-hero-caption">
            Every system that feels effortless started with untangling
            complexity. The work in between — from research to insight,
            complexity to story, problem to&nbsp;solution.
          </p>
        </div>
      </section>

      {/* ── Work ───────────────────────────────────── */}
      <WorkSection />

      {/* ── Writing ─────────────────────────────────── */}
      <WritingSection />

      {/* ── About ───────────────────────────────────── */}
      <AboutSection />

      <PixelFooter />
    </div>
  );
}
