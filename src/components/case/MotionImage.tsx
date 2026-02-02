"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const PRIMARY_COLOR = "#FF8D28";

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
}: MotionImageProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [hoverTooltip, setHoverTooltip] = useState<{ x: number; y: number } | null>(null);
  const [tapePosition, setTapePosition] = useState<{ top: number; right: number } | null>(null);
  const [imageNatural, setImageNatural] = useState<{ w: number; h: number } | null>(null);
  const lightboxContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!lightboxOpen || !lightboxContainerRef.current || !imageNatural) {
      setTapePosition(null);
      return;
    }
    const el = lightboxContainerRef.current;
    const W = el.offsetWidth;
    const H = el.offsetHeight;
    const nw = imageNatural.w;
    const nh = imageNatural.h;
    const scale = Math.min(W / nw, H / nh);
    const imageWidth = nw * scale;
    const imageHeight = nh * scale;
    const top = (H - imageHeight) / 2;
    const right = (W - imageWidth) / 2;
    const tapeOffsetY = src.includes("2.5") ? 50 : 0;
    setTapePosition({ top: top + tapeOffsetY, right });
  }, [lightboxOpen, imageNatural, src]);

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

  useEffect(() => {
    if (!lightboxOpen) setImageNatural(null);
  }, [lightboxOpen]);

  const imageContent = (
    <>
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
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
      <figure className={cn("rounded-xl overflow-hidden border border-neutral-200/50 w-full", className)}>
        <motion.div
          className={cn(
            "relative w-full aspect-video bg-neutral-100",
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
              Click to view better
            </span>,
            document.body
          )}
        {caption && (
          <figcaption className="p-4 bg-neutral-50 text-sm text-neutral-600">
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
                className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setLightboxOpen(false)}
                aria-modal
                role="dialog"
                aria-label="Image preview"
              >
                <motion.div
                  ref={lightboxContainerRef}
                  className="relative w-full max-w-4xl aspect-video max-h-[85vh] min-h-[200px] mx-auto"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 896px) 100vw, 896px"
                    onLoad={(e) => {
                      const img = e.target as HTMLImageElement;
                      if (img?.naturalWidth && img?.naturalHeight) {
                        setImageNatural({ w: img.naturalWidth, h: img.naturalHeight });
                      }
                    }}
                  />
                  {/* Tape-shaped close sticker – top right corner of visible image */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxOpen(false);
                    }}
                    className="absolute top-0 right-0 z-10 w-24 h-9 sm:w-28 sm:h-10 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                    style={{
                      background: PRIMARY_COLOR,
                      boxShadow: "0 2px 8px rgba(255, 141, 40, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
                      transformOrigin: "top right",
                      ...(src.includes("Key-Decision-1") || src.includes("Decision-1.png")
                        ? {
                            transform: "rotate(45deg) translate(calc(8% + 80px), calc(18% + 65px))",
                          }
                        : tapePosition
                          ? {
                              top: tapePosition.top,
                              right: tapePosition.right,
                              transform: "rotate(45deg) translate(8%, -8%)",
                            }
                          : {
                              transform: "rotate(45deg) translate(calc(8% + 80px), calc(18% + 65px))",
                            }),
                    }}
                    aria-label="Close"
                  >
                    <X className="w-4 h-4 text-white stroke-[2.5] shrink-0" aria-hidden />
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
