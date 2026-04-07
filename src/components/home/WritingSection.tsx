"use client";

import Image from "next/image";
import Link from "next/link";

interface WritingCard {
  id: string;
  type: string;
  spot: string;
  tags: string[];
  title: string;
  description: string;
  /** Raster hero for the card (e.g. article-specific art) */
  imageSrc?: string;
  /** Overrides `.wr-visual-img` object-position when `imageSrc` is set */
  imageObjectPosition?: string;
  href: string;
  /** Open in new tab (external Substack, etc.) */
  external?: boolean;
}

const WRITING: WritingCard[] = [
  {
    id: "entry-exit-digital-lending",
    type: "Finance",
    spot: "Observational note",
    tags: [],
    title: "Entry & Exit in Digital Lending",
    description:
      "Instant approval on the way in; opaque failures on the way out. When onboarding is built for speed and exit is shaped by risk, users meet an informational asymmetry.",
    imageSrc: "/images/writing/digital-lending.png",
    imageObjectPosition: "center 48%",
    href: "https://open.substack.com/pub/thelilyput/p/entry-and-exit-in-digital-lending?r=g3nqv&utm_campaign=post&utm_medium=web",
    external: true,
  },
  {
    id: "gate-kept-degrees",
    type: "Education",
    spot: "Long read",
    tags: [],
    title: "The System Behind “Gate-kept” Degrees",
    description:
      "The economy built the gate — not designers. On scarcity, credentials, and why the debate about design school often misses who actually holds the keys.",
    imageSrc: "/images/writing/gate-kept-degrees.png",
    href: "https://open.substack.com/pub/thelilyput/p/the-system-behind-gate-kept-degrees?r=g3nqv&utm_campaign=post&utm_medium=web",
    external: true,
  },
];

export function WritingSection() {
  return (
    <section className="writing-section" id="writing" aria-label="Writing">

      <div className="writing-section-header">
        <div className="writing-section-header-left">
          <p className="writing-section-label">— Writing</p>
          <h2 className="writing-section-headline">
            Thinking in public. Notes, essays, observations.
          </h2>
        </div>
        <a
          href="https://substack.com/@thelilyput"
          target="_blank"
          rel="noopener noreferrer"
          className="writing-section-link"
        >
          All writing →
        </a>
      </div>

      <div className="writing-divider" />

      <div className="wr-grid">
        {WRITING.map((card) => (
          <Link
            key={card.id}
            href={card.href}
            className="wr-card"
            aria-label={card.title}
            {...(card.external
              ? { target: "_blank" as const, rel: "noopener noreferrer" }
              : {})}
          >
            <div
              className={`wr-visual${card.imageSrc ? " wr-visual--photo" : ""}`}
            >
              {card.imageSrc ? (
                <Image
                  src={card.imageSrc}
                  alt=""
                  fill
                  className="wr-visual-img"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  priority={false}
                  style={
                    card.imageObjectPosition
                      ? { objectPosition: card.imageObjectPosition }
                      : undefined
                  }
                />
              ) : null}
            </div>
            <div className="wr-info">
              <div className="wr-info-main">
                <p className="wr-type">
                  <span className="wr-type-prefix">Type</span>
                  <span className="wr-type-sep"> — </span>
                  {card.type}
                  <span className="wr-type-sep"> · </span>
                  <span className="wr-type-muted">{card.spot}</span>
                </p>
                <h3 className="wr-title">{card.title}</h3>
                <p className="wr-desc">{card.description}</p>
              </div>
              {card.tags.length > 0 && (
                <div className="wr-tags" aria-label="Tags">
                  {card.tags.map((tag) => (
                    <span key={tag} className="wr-tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
