"use client";

import Link from "next/link";

const CURRENTLY = [
  {
    label: "Reading",
    text: "The Book of Hope — Survival Guide for trying times, by Jane Goodall.",
  },
  {
    label: "Thinking about",
    text: "Whether AI makes research more important, or makes the pretence of research easier.",
  },
  {
    label: "Working on",
    text: "This portfolio. It's due before I run out of patience with it.",
  },
];

export function PixelFooter() {
  return (
    <footer className="site-footer" aria-label="Site footer">

      {/* ── Main ─────────────────────────────────── */}
      <div className="sf-main">

        {/* Left column */}
        <div className="sf-left">
          <p className="sf-name">Rachana Mandal.</p>
          <p className="sf-bio">
            Senior UX Designer · Available for remote work
          </p>

          {/* Social links */}
          <nav className="sf-links" aria-label="Social links">
            <Link href="https://www.linkedin.com/in/rachanamandal/" target="_blank" rel="noopener noreferrer" className="sf-link">LinkedIn</Link>
            <span className="sf-link-sep">·</span>
            <Link href="https://substack.com/@thelilyput" target="_blank" rel="noopener noreferrer" className="sf-link">Substack</Link>
            <span className="sf-link-sep">·</span>
            <Link href="mailto:rachanamandal@gmail.com" className="sf-link sf-link-cta">→ Email me</Link>
          </nav>

          {/* Currently */}
          <div className="sf-currently">
            <p className="sf-currently-label">Currently</p>
            <div className="sf-currently-grid">
              {CURRENTLY.map((item) => (
                <div key={item.label} className="sf-currently-item">
                  <p className="sf-ci-label">{item.label}</p>
                  <p className="sf-ci-text">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ── Bottom bar ───────────────────────────── */}
      <div className="sf-bar">
        <p className="sf-bar-copy">
          © 2025 · Built with Warmth DS · An outcome of brainstorming sessions with Claude and coding with Cursor.
        </p>
        <p className="sf-bar-claim">
          Rigorous enough to be trusted. Human enough to be felt.
        </p>
      </div>

    </footer>
  );
}
