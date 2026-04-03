"use client";

import Link from "next/link";

const CURRENTLY = [
  {
    label: "Reading",
    text: "The Design of Everyday Things — rereading it. Finding new things each time.",
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

const LOLLIPOPS = [
  { x: 60,  h: 90, r: 14, color: "#A89880" },
  { x: 108, h: 110, r: 16, color: "#B84C3A" },
  { x: 158, h: 100, r: 15, color: "#5A6B4A" },
  { x: 208, h: 80,  r: 14, color: "#B84C3A" },
  { x: 256, h: 95,  r: 15, color: "#A89880" },
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
            Senior UX Designer. Available for remote work<br />
            with European, American, and Japanese firms.<br />
            <em>I design systems that disappear.</em>
          </p>

          {/* Social links */}
          <nav className="sf-links" aria-label="Social links">
            <Link href="https://linkedin.com/in/rachanamandal" target="_blank" rel="noopener noreferrer" className="sf-link">LinkedIn</Link>
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

        {/* Right column — garden */}
        <div className="sf-right">
          <p className="sf-garden-label">A small garden — hover to tend it</p>
          <div className="sf-garden" aria-hidden="true">
            <svg viewBox="0 0 320 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="sf-garden-svg">
              {/* Ground line */}
              <line x1="20" y1="145" x2="300" y2="145" stroke="rgba(245,239,228,0.15)" strokeWidth="1" />
              {LOLLIPOPS.map((l, i) => (
                <g key={i} className="sf-lollipop">
                  <line x1={l.x} y1={145} x2={l.x} y2={145 - l.h} stroke="rgba(245,239,228,0.3)" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx={l.x} cy={145 - l.h - l.r} r={l.r} fill={l.color} opacity="0.85" />
                </g>
              ))}
            </svg>
          </div>
          <p className="sf-quote">
            &ldquo;To plant a garden is to believe in the future.&rdquo;<br />
            <span className="sf-quote-attr">— Audrey Hepburn</span>
          </p>
          <p className="sf-jp" lang="ja">設計の哲学</p>
        </div>

      </div>

      {/* ── Bottom bar ───────────────────────────── */}
      <div className="sf-bar">
        <p className="sf-bar-copy">
          © 2025 · Warmth DS · Built with care · No AI aesthetics were harmed in the making of this portfolio
        </p>
        <p className="sf-bar-claim">
          Rigorous enough to be trusted. Human enough to be felt.
        </p>
      </div>

    </footer>
  );
}
