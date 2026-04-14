import Image from "next/image";

interface CaseProblemProcessVisualProps {
  src: string;
  alt: string;
  caption?: string;
}

/** Prompt14b — full-width “before” process slot in Problem */
export function CaseProblemProcessVisual({
  src,
  alt,
  caption,
}: CaseProblemProcessVisualProps) {
  return (
    <figure className="cs-problem-process-visual">
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={675}
        className="cs-problem-process-visual-img"
        sizes="(max-width: 768px) 100vw, min(var(--cs-column-cap), 100%)"
      />
      {caption ? (
        <figcaption className="cs-problem-process-visual-caption">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
