"use client";

import Link from "next/link";
import { PaperClipSticky } from "@/components/home/PaperClipIcons";

const JL_HERO_BADGES = [
  "Senior Product Designer",
  "5+ years",
  "B2B & enterprise · Bengaluru",
];

const RESUME_URL =
  "https://drive.google.com/file/d/11pRdPZdKTFnX9Q06PUfgj922_X8luZ9K/view?usp=drivesdk";

export function JournalHero() {
  const eyebrow = JL_HERO_BADGES.join(" · ");

  return (
    <section className="jl-hero" aria-label="Introduction">
      <div className="jl-hero-journal">
        <div className="jl-hero-back" aria-hidden />
        <div className="jl-hero-tape-l jl-washi-seigaiha" aria-hidden />

        <div className="jl-hero-insert jl-paper jl-paper-shadow">
          <div className="jl-sticky-on-insert">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="jl-sticky-body"
              aria-label="Open resume (PDF) in Google Drive — opens in new tab"
            >
              <span className="jl-sticky-txt">download Resume</span>
            </a>
            <div className="jl-sticky-clip-over" aria-hidden>
              <PaperClipSticky
                className="jl-clip-svg jl-clip-svg--sticky-hero"
                tiltDeg={10}
              />
            </div>
          </div>

          <div className="jl-punch-holes" aria-hidden>
            <span className="jl-punch-hole" />
            <span className="jl-punch-hole" />
            <span className="jl-punch-hole" />
          </div>

          <div className="jl-hero-top">
            <p className="jl-h-eyebrow jl-hero-g-eyebrow">{eyebrow}</p>
            <h1 className="jl-hero-bio-heading jl-hero-g-head">
              I design products that have to handle real-world complexity.
            </h1>
            <p className="home-hero-caption jl-caption-on-right jl-hero-g-cap">
              The real problem usually isn&apos;t the interface — it&apos;s
              getting a room full of smart people to agree on what the problem
              actually is. I help with that.
            </p>
          </div>

          <div className="jl-hero-bottom">
            <div className="jl-hero-actions jl-btn-row">
              <Link href="#work" className="jl-btn-primary">
                View Work
              </Link>
              <Link href="#about" className="jl-btn-ghost">
                About me
              </Link>
            </div>
            <div className="jl-hero-tags">
              {JL_HERO_BADGES.map((tag) => (
                <span key={tag} className="jl-mini-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="jl-scroll-hint" id="scrollCue" aria-hidden>
          <span>Scroll</span>
          <span className="jl-scroll-line" />
        </div>
      </div>
    </section>
  );
}
