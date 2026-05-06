"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import type { CaseStudy } from "@/case-studies/omantel";
import { getCaseVisualsPresentation } from "@/case-studies/case-visuals";
import { cn } from "@/lib/utils";
import {
  lockScrollForOverlay,
  unlockScrollForOverlay,
} from "@/lib/overlay-scroll-lock";

interface CaseNoteworthyIterationsProps {
  caseStudy: CaseStudy;
  /** Additional classes on the grid wrapper (spacing / theme) */
  gridClassName?: string;
}

export function CaseNoteworthyIterations({
  caseStudy,
  gridClassName,
}: CaseNoteworthyIterationsProps) {
  const visualsPresentation = getCaseVisualsPresentation(caseStudy);
  const [fullViewIndex, setFullViewIndex] = useState<number | null>(null);

  useEffect(() => {
    if (fullViewIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullViewIndex(null);
    };
    lockScrollForOverlay();
    document.addEventListener("keydown", onKey);
    return () => {
      unlockScrollForOverlay();
      document.removeEventListener("keydown", onKey);
    };
  }, [fullViewIndex]);

  if (visualsPresentation.mode !== "noteworthy") return null;

  return (
    <div
      className={cn("cs-noteworthy-grid cs-outcome-noteworthy", gridClassName)}
    >
      {visualsPresentation.slides.map(({ section, index }) => {
        const media = section.image || section.video;
        if (!media) return null;
        const caption = section.image?.caption ?? section.video?.caption;
        return (
          <button
            key={index}
            type="button"
            className="cs-visual-frame cs-visual-clickable"
            onClick={() => setFullViewIndex(index)}
            aria-label={
              section.image ? section.image.alt : "View video iteration"
            }
          >
            <div className="cs-noteworthy-card-fill">
              <div className="cs-visual-img">
                {section.image ? (
                  <img
                    src={section.image.src}
                    alt={section.image.alt}
                    className="w-full h-auto block object-contain"
                  />
                ) : section.video ? (
                  <video
                    src={section.video.src}
                    className="w-full block"
                    muted
                    playsInline
                    preload="metadata"
                  />
                ) : null}
              </div>
              {caption && <div className="cs-visual-caption">{caption}</div>}
            </div>
          </button>
        );
      })}

      {typeof document !== "undefined" &&
        fullViewIndex !== null &&
        (() => {
          const section = caseStudy.visualsSections?.[fullViewIndex];
          if (!section) return null;
          const caption = section.image?.caption ?? section.video?.caption;
          return createPortal(
            <div
              className="noteworthy-lightbox"
              role="dialog"
              aria-modal="true"
              aria-label="Full view"
              onClick={() => setFullViewIndex(null)}
            >
              <button
                type="button"
                className="noteworthy-lightbox-close"
                onClick={(e) => {
                  e.stopPropagation();
                  setFullViewIndex(null);
                }}
                aria-label="Close"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
              <div
                className="noteworthy-lightbox-inner"
                onClick={(e) => e.stopPropagation()}
              >
                {section.image ? (
                  <img
                    src={section.image.src}
                    alt={section.image.alt}
                    className="noteworthy-lightbox-media"
                  />
                ) : section.video ? (
                  <video
                    src={section.video.src}
                    controls
                    autoPlay
                    className="noteworthy-lightbox-media"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : null}
                {caption && (
                  <p className="noteworthy-lightbox-caption">{caption}</p>
                )}
              </div>
            </div>,
            document.body,
          );
        })()}
    </div>
  );
}
