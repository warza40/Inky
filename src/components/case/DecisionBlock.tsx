import type { CaseStudy } from "@/case-studies/omantel";
import { useState } from "react";
import { MotionImage } from "./MotionImage";

interface DecisionBlockProps {
  decision: CaseStudy["sections"]["decisions"][0];
  index: number;
}

export function DecisionBlock({ decision, index }: DecisionBlockProps) {
  const displayImages = decision.images ?? [];
  const [open, setOpen] = useState(index === 0);

  return (
    <div className={`cs-decision${open ? " open" : ""}`}>
      <button
        type="button"
        className="cs-decision-head"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <span className="cs-decision-num">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="cs-decision-title">{decision.title}</h3>
        <div className="cs-decision-toggle" aria-hidden="true">
          <span className="cs-decision-toggle-icon" aria-hidden>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 14 14"
              fill="none"
              className="cs-decision-chevron"
              aria-hidden
            >
              <path
                d="M2 4.5L7 9.5L12 4.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        {decision.description ? (
          <p className="cs-decision-body cs-decision-body--below-title">
            {decision.description}
          </p>
        ) : null}
      </button>

      <div className="cs-decision-body-wrap">
        <div className="cs-ri-grid">
          <div className="cs-ri-col">
            <div className="cs-ri-label">Rationale</div>
            <p className="cs-ri-text whitespace-pre-line">
              {decision.rationale}
            </p>
          </div>
          <div className="cs-ri-col">
            <div className="cs-ri-label">Impact</div>
            <p className="cs-ri-text whitespace-pre-line">
              {decision.impact}
            </p>
          </div>
        </div>

        {decision.designResponse && (
          <div
            className="cs-ri-grid"
            style={{ borderTop: "1px solid var(--color-border)" }}
          >
            <div className="cs-ri-col" style={{ gridColumn: "1 / -1" }}>
              <div className="cs-ri-label">Solutioning</div>
              <p className="cs-ri-text whitespace-pre-line">
                {decision.designResponse}
              </p>
            </div>
          </div>
        )}

        {displayImages.length > 0 && (
          <div className="cs-visual-wrap">
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
        )}
      </div>
    </div>
  );
}
