"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import type { HomeCaseStudy } from "@/data/home-case-studies";
import { Badge } from "@/components/ui/Badge";
import { expandingCursorAttrs } from "@/lib/expanding-cursor";

interface CaseStudyCardProps {
  study: HomeCaseStudy;
}

const VIDEO_SRC = /\.(mov|mp4|webm)(\?|$)/i;

function CardMedia({
  src,
  alt,
  sizes,
}: {
  src: string;
  alt: string;
  sizes: string;
}) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideo = VIDEO_SRC.test(src);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVideo) return;
    if (reduceMotion) {
      video.pause();
      try {
        video.currentTime = 0;
      } catch {
        /* Metadata may not be ready yet; the paused frame is the poster. */
      }
      return;
    }
    const play = video.play();
    if (play !== undefined) {
      play.catch(() => undefined);
    }
  }, [isVideo, reduceMotion, src]);

  if (isVideo) {
    return (
      <video
        ref={videoRef}
        className="portfolio-card__media-video"
        src={src}
        muted
        loop
        playsInline
        autoPlay={reduceMotion !== true}
        preload="auto"
        controls={false}
        aria-label={alt}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className="portfolio-card__media-image"
    />
  );
}

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  const isFeature = study.layout === "feature";
  const cursorPrompt = study.preview.cursor ?? {
    title: "View case study",
    hint: `${study.preview.meta} · Click to explore`,
  };
  const sizes = isFeature
    ? "(max-width: 767px) 100vw, (max-width: 1199px) 100vw, 66vw"
    : "(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw";

  return (
    <div className="case-study-card-wrap">
      <Link
        href={study.href}
        className={`portfolio-card portfolio-card--cursor-only ${isFeature ? "portfolio-card--feature" : "portfolio-card--standard"} sheet-card--case`}
        {...expandingCursorAttrs(cursorPrompt)}
      >
        <div className="portfolio-card__media">
          <div className="portfolio-card__media-image-wrap">
            <CardMedia
              src={study.imageSrc}
              alt={study.imageAlt}
              sizes={sizes}
            />
          </div>
        </div>

        <div className="portfolio-card__body">
          <h3 className="portfolio-card__title">{study.title}</h3>
          <p className="portfolio-card__description">{study.caption}</p>
          <Badge variant="tag" className="portfolio-card__tag">
            {study.tag}
          </Badge>
        </div>
      </Link>
    </div>
  );
}
