"use client";

import type { CaseStudy } from "@/case-studies/omantel";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MotionImage } from "./MotionImage";

interface DecisionBlockProps {
  decision: CaseStudy["sections"]["decisions"][0];
  index: number;
}

/** Split rationale / impact on blank lines into bullet rows */
function RiPoints({ text }: { text: string }) {
  const parts = text
    .split(/\n\n/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length === 0) return null;
  return (
    <ul className="cs-ri-list" role="list">
      {parts.map((part, i) => (
        <li key={i} className="cs-ri-item">
          <span className="cs-ri-item-text">{part}</span>
        </li>
      ))}
    </ul>
  );
}

function DecisionMedia({
  decision,
  displayImages,
}: {
  decision: CaseStudy["sections"]["decisions"][0];
  displayImages: NonNullable<CaseStudy["sections"]["decisions"][0]["images"]>;
}) {
  if (displayImages.length > 0) {
    return (
      <div className="cs-visual-wrap cs-visual-wrap--editorial">
        {displayImages.map((image, imageIndex) => {
          const isVideo = /\.(mov|mp4|webm)(\?|$)/i.test(image.src);
          return (
            <div
              key={imageIndex}
              className="cs-visual-frame"
              style={{
                marginBottom:
                  imageIndex < displayImages.length - 1 ? "16px" : 0,
              }}
            >
              <div className="cs-visual-img">
                {isVideo ? (
                  <video
                    src={image.src}
                    controls
                    playsInline
                    className="w-full aspect-video object-contain"
                    aria-label={image.alt}
                  />
                ) : (
                  <div className="relative w-full aspect-video">
                    <MotionImage
                      src={image.src}
                      alt={image.alt}
                      caption={image.caption}
                      fill
                      objectFit="contain"
                      lightbox
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <>
      {decision.imagePlaceholderSplit?.length === 2 ? (
        <div className="cs-decision-placeholder cs-decision-placeholder--split cs-visual-wrap--editorial">
          <div className="cs-decision-placeholder-panel">
            <div className="cs-decision-placeholder-note">
              {decision.imagePlaceholderSplit[0]}
            </div>
          </div>
          <div className="cs-decision-placeholder-panel">
            <div className="cs-decision-placeholder-note">
              {decision.imagePlaceholderSplit[1]}
            </div>
          </div>
        </div>
      ) : null}
      {decision.imagePlaceholder && !decision.imagePlaceholderSplit ? (
        <div className="cs-decision-placeholder cs-visual-wrap--editorial">
          <div className="cs-decision-placeholder-note">
            {decision.imagePlaceholder}
          </div>
        </div>
      ) : null}
      {decision.navExploration && decision.navExploration.length > 0 ? (
        <div className="cs-decision-nav-wrap cs-visual-wrap--editorial">
          <div className="cs-decision-nav-exploration">
            {decision.navExploration.map((n, i) => (
              <div key={i} className="cs-nav-exp-item">
                <div className="cs-nei-label">{n.label}</div>
                <div
                  className={cn(
                    "cs-nei-sketch",
                    n.variant === "mega" && "cs-nei-sketch--mega",
                    n.variant === "ribbon" && "cs-nei-sketch--ribbon",
                    n.variant === "panel" && "cs-nei-sketch--panel",
                  )}
                  aria-hidden
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}

export function DecisionBlock({ decision, index }: DecisionBlockProps) {
  const displayImages = decision.images ?? [];
  const reduceMotion = useReducedMotion();
  const hasRiPanel =
    Boolean(decision.rationale?.trim()) ||
    Boolean(decision.impact?.trim()) ||
    Boolean(decision.designResponse?.trim());

  return (
    <motion.article
      className="cs-decision cs-decision--editorial"
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -32px 0px" }}
      transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
    >
      <header className="cs-decision-editorial-head">
        <span className="cs-decision-num">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="cs-decision-editorial-titles">
          <h3 className="cs-decision-title">{decision.title}</h3>
          {decision.description ? (
            <p className="cs-decision-body cs-decision-lede">
              {decision.description}
            </p>
          ) : null}
        </div>
      </header>

      <div className="cs-decision-body-wrap cs-decision-body-wrap--static">
        <DecisionMedia decision={decision} displayImages={displayImages} />

        {hasRiPanel ? (
          <div className="cs-decision-ri-panel">
            {(decision.rationale?.trim() || decision.impact?.trim()) && (
              <div className="cs-ri-grid cs-ri-grid--editorial-pair">
                <div className="cs-ri-col">
                  <div className="cs-ri-label">Rationale</div>
                  <RiPoints text={decision.rationale} />
                </div>
                <div className="cs-ri-col">
                  <div className="cs-ri-label">Impact</div>
                  <RiPoints text={decision.impact} />
                </div>
              </div>
            )}
            {decision.designResponse?.trim() ? (
              <div className="cs-ri-grid cs-ri-grid--solutioning">
                <div className="cs-ri-col" style={{ gridColumn: "1 / -1" }}>
                  <div className="cs-ri-label">Solutioning</div>
                  <RiPoints text={decision.designResponse} />
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}
