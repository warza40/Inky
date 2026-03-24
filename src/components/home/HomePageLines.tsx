"use client";

import Link from "next/link";
import { Download } from "lucide-react";
import { TypewriterName } from "@/components/TypewriterName";
import { HeroBgReact } from "@/components/home/HeroBgReact";
import { PixelFooter } from "@/components/home/PixelFooter";
import { FolderStackReact } from "@/components/home/FolderStackReact";
import { HomepageFixes } from "@/components/home/HomepageFixes";

const NAV_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com/in/rachanamandal" },
  { label: "Substack", href: "https://substack.com/@thelilyput" },
  { label: "Instagram", href: "https://instagram.com/rachanamandal" },
  { label: "Resume", href: "/resume.pdf", download: true, icon: Download },
];

export function HomePageLines() {
  return (
    <div className="home-layout text-foreground min-h-full flex flex-col">
      <HomepageFixes />
      <header className="home-header" aria-label="Site header">
        <div className="home-header-typewriter" aria-hidden="true">
          <TypewriterName />
        </div>
        <nav className="home-header-ctas" aria-label="Links">
          {NAV_LINKS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                target={item.download ? undefined : "_blank"}
                rel={item.download ? undefined : "noopener noreferrer"}
                download={item.download || undefined}
                className={`home-header-cta${item.label === "Resume" ? " resume" : ""}`}
              >
                {Icon != null && (
                  <span className="home-header-cta-icon" aria-hidden>
                    <Icon size={14} strokeWidth={2} />
                  </span>
                )}
                <span className="home-header-cta-label">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </header>
      <section className="hero" aria-label="Hero">
        <HeroBgReact />
        <div className="hero-text">
          <div className="hero-bio-copy">
            <p className="hero-subtitle">Senior UX Designer | Strategist</p>
            <p className="hero-headline">
              I work on complex product systems where clarity often breaks down.
              I design with an intent to reduce mental effort and{" "}
              <br />
              unnecessary friction wherever&nbsp;possible.
            </p>
          </div>
        </div>
        <div className="stack-arrow-wrap" aria-label="Work, experiments, and reads">
          <button
            type="button"
            className="stack-arrow"
            id="stackPrev"
            aria-label="Previous"
            onClick={() => {
              const btn = document.getElementById("fs-prev") as HTMLButtonElement | null;
              if (btn) btn.click();
            }}
          >
            <svg viewBox="0 0 16 16" aria-hidden>
              <path d="M10 3L5 8l5 5" />
            </svg>
          </button>
          <div className="hero-stack-wrap">
            <div className="hero-stack">
              <FolderStackReact accentColor="#B6837C" />
            </div>
          </div>
          <button
            type="button"
            className="stack-arrow"
            id="stackNext"
            aria-label="Next"
            onClick={() => {
              const btn = document.getElementById("fs-next") as HTMLButtonElement | null;
              if (btn) btn.click();
            }}
          >
            <svg viewBox="0 0 16 16" aria-hidden>
              <path d="M6 3l5 5-5 5" />
            </svg>
          </button>
        </div>

        <div className="scroll-cue" id="scrollCue" aria-hidden>
          <span className="scroll-cue-label">Scroll</span>
          <div className="scroll-cue-arrow">
            <svg viewBox="0 0 12 12" aria-hidden stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 4l4 4 4-4" />
            </svg>
          </div>
        </div>
      </section>
      <PixelFooter />
    </div>
  );
}
