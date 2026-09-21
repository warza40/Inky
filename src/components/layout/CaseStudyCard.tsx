import Image from "next/image";
import Link from "next/link";
import type { HomeCaseStudy } from "@/data/home-case-studies";
import { Badge } from "@/components/ui/Badge";
import { expandingCursorAttrs } from "@/lib/expanding-cursor";

interface CaseStudyCardProps {
  study: HomeCaseStudy;
}

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  const isFeature = study.layout === "feature";
  const cursorPrompt = study.preview.cursor ?? {
    title: "View case study",
    hint: `${study.preview.meta} · Click to explore`,
  };

  return (
    <div className="case-study-card-wrap">
      <Link
        href={study.href}
        className={`portfolio-card portfolio-card--cursor-only ${isFeature ? "portfolio-card--feature" : "portfolio-card--standard"} sheet-card--case`}
        {...expandingCursorAttrs(cursorPrompt)}
      >
        <div className="portfolio-card__media">
          <div className="portfolio-card__media-image-wrap">
            <Image
              src={study.imageSrc}
              alt={study.imageAlt}
              fill
              sizes={
                isFeature
                  ? "(max-width: 767px) 100vw, (max-width: 1199px) 100vw, 66vw"
                  : "(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
              }
              className="portfolio-card__media-image"
            />
          </div>
          <div className="portfolio-card__media-chrome" aria-hidden>
            <header className="portfolio-card__media-header">
              <span className="portfolio-card__media-status">
                <span className="portfolio-card__media-status-dot" />
                <span className="portfolio-card__media-label">
                  Motion asset
                </span>
              </span>
              <span className="portfolio-card__media-format">GIF / MP4</span>
            </header>
            <footer className="portfolio-card__media-footer">
              <span className="portfolio-card__media-track" />
              <span className="portfolio-card__media-footer-meta">
                <span className="portfolio-card__media-time">00:00</span>
                <span className="portfolio-card__media-loop">Loop ready</span>
              </span>
            </footer>
          </div>
        </div>

        <div className="portfolio-card__body">
          <div className="portfolio-card__copy">
            {!isFeature ? (
              <Badge variant="tag" className="portfolio-card__tag">
                {study.tag}
              </Badge>
            ) : null}
            <h3 className="portfolio-card__title">{study.title}</h3>
            <p className="portfolio-card__description">{study.caption}</p>
          </div>
          <span className="portfolio-card__meta">{study.preview.meta}</span>
        </div>
      </Link>
    </div>
  );
}
