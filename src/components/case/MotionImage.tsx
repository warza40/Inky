"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MotionImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  objectFit?: "cover" | "contain";
  lightbox?: boolean;
  /** Custom tooltip when hovering over the image (when lightbox is true). Default: "Click to view better" */
  hoverTooltip?: string;
}

export function MotionImage({
  src,
  alt,
  caption,
  className,
  fill = false,
  width,
  height,
  objectFit = "cover",
  lightbox = false,
  hoverTooltip: hoverTooltipProp,
}: MotionImageProps) {
  const hoverTooltipText = hoverTooltipProp ?? "Click to view better";
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [hoverTooltip, setHoverTooltip] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!lightbox) return;
    setHoverTooltip({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setHoverTooltip(null);
  };

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [lightboxOpen]);

  const imageContent = (
    <>
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
          className={objectFit === "contain" ? "object-contain" : "object-cover"}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width || 800}
          height={height || 600}
          className="w-full h-full object-cover"
        />
      )}
    </>
  );

  return (
    <>
      <figure className={cn("rounded-xl overflow-hidden border border-neutral-200/50 dark:border-white/20 w-full", className)}>
        <motion.div
          className={cn(
            "relative w-full aspect-video bg-neutral-100 dark:bg-neutral-800",
            lightbox && "cursor-zoom-in"
          )}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          onClick={lightbox ? () => setLightboxOpen(true) : undefined}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          role={lightbox ? "button" : undefined}
          aria-label={lightbox ? "View full size" : undefined}
        >
          {imageContent}
        </motion.div>
        {lightbox &&
          hoverTooltip &&
          typeof document !== "undefined" &&
          createPortal(
            <span
              className="pointer-events-none fixed z-[100] rounded-md bg-neutral-900 px-2.5 py-1.5 text-xs font-medium text-white shadow-lg"
              style={{
                left: hoverTooltip.x + 12,
                top: hoverTooltip.y + 12,
              }}
            >
              {hoverTooltipText}
            </span>,
            document.body
          )}
        {caption && (
          <figcaption className="p-4 bg-neutral-100 dark:bg-neutral-200 text-sm text-neutral-800 dark:text-neutral-900">
            {caption}
          </figcaption>
        )}
      </figure>

      {lightbox &&
        typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {lightboxOpen && (
              <motion.div
                key="lightbox"
                className="noteworthy-lightbox"
                role="dialog"
                aria-modal="true"
                aria-label="Image preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setLightboxOpen(false)}
              >
                <button
                  type="button"
                  className="noteworthy-lightbox-close"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxOpen(false);
                  }}
                  aria-label="Close"
                >
                  <X size={24} strokeWidth={1.5} />
                </button>
                <div
                  className="noteworthy-lightbox-inner"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={alt}
                    className="noteworthy-lightbox-media"
                  />
                  {caption && (
                    <p className="noteworthy-lightbox-caption">{caption}</p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
