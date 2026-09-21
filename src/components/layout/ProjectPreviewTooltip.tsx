import Image from "next/image";
import type { HomeCaseStudy } from "@/data/home-case-studies";
import { CtaButton } from "@/components/ui/CtaButton";

interface ProjectPreviewTooltipProps {
  study: HomeCaseStudy;
  id: string;
}

export function ProjectPreviewTooltip({
  study,
  id,
}: ProjectPreviewTooltipProps) {
  const { preview } = study;

  return (
    <div id={id} className="project-preview-tooltip" role="tooltip">
      <span className="project-preview-tooltip__pointer" aria-hidden />

      <header className="project-preview-tooltip__header">
        <p className="project-preview-tooltip__title">{preview.displayTitle}</p>
        {preview.statusLabel ? (
          <span className="project-preview-tooltip__status">
            [ {preview.statusLabel} ]
          </span>
        ) : null}
      </header>

      <div className="project-preview-tooltip__media">
        <Image
          src={study.imageSrc}
          alt=""
          fill
          sizes="440px"
          className="project-preview-tooltip__media-image"
        />
      </div>

      <p className="project-preview-tooltip__description">
        {preview.description}
      </p>

      <hr className="project-preview-tooltip__divider" />

      <footer className="project-preview-tooltip__footer">
        <span className="project-preview-tooltip__meta">{preview.meta}</span>
        <CtaButton
          href={study.href}
          variant="secondary"
          className="project-preview-tooltip__cta"
        >
          View project →
        </CtaButton>
      </footer>
    </div>
  );
}
