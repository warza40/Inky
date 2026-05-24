"use client";

import Link from "next/link";
import "@/styles/journal-home.css";
import { PixelFooter } from "@/components/home/PixelFooter";
import { HomepageFixes } from "@/components/home/HomepageFixes";
import { AboutSection } from "@/components/home/AboutSection";
import { WorkSection } from "@/components/home/WorkSection";
import { WritingSection } from "@/components/home/WritingSection";
import { JournalHero } from "@/components/home/JournalHero";

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
    <div className="home-layout home-layout--journal text-foreground flex flex-col">
      <div className="jl-atmo" aria-hidden>
        <div className="jl-atmo-dots" />
        <div className="jl-atmo-vignette" />
      </div>

      <HomepageFixes />

      <header className="home-header" aria-label="Site header">
        <Link
          href="/"
          className="home-header-name"
          aria-label="Rachana Mandal home"
        >
          RM
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
      </header>

      <JournalHero />

      <WorkSection journalLayout />
      <WritingSection journalLayout />
      <AboutSection journalLayout />

      <PixelFooter />
    </div>
  );
}
