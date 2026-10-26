"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import type { CaseStudy } from "@/case-studies/omantel";
import { parseBoldSpans } from "@/lib/case-rich-text";
import { cn } from "@/lib/utils";

type Decision = CaseStudy["sections"]["decisions"][number];
type DecisionImage = NonNullable<Decision["images"]>[number];
type NavVariant = NonNullable<Decision["navExploration"]>[number]["variant"];
type MediaFrame = "full" | "half" | "phone";

function paragraphsOf(text: string): string[] {
  return text
    .split(/\n\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function DecisionCopy({ text }: { text: string }) {
  const parts = paragraphsOf(text);
  if (!parts.length) return null;
  return (
    <div className="om-decision-copy">
      {parts.map((part) => (
        <p key={part.slice(0, 32)}>{parseBoldSpans(part)}</p>
      ))}
    </div>
  );
}

function DecisionLabel({
  children,
  tone = "meta",
}: {
  children: ReactNode;
  tone?: "meta" | "teal";
}) {
  return (
    <p
      className={cn(
        "om-decision-label",
        tone === "teal" && "om-decision-label--teal",
      )}
    >
      {children}
    </p>
  );
}

function mediaFrame(src: string): MediaFrame {
  const name = decodeURIComponent(src.split("/").pop() ?? src).toLowerCase();
  if (name.includes("mobile") || name.includes("phone")) return "phone";
  if (name.includes("noteworthy 1") || name.includes("noteworthy 2")) {
    return "half";
  }
  return "full";
}

function sketchClass(variant: NavVariant): string {
  switch (variant) {
    case "mega":
      return "cs-nei-sketch--mega";
    case "ribbon":
      return "cs-nei-sketch--ribbon";
    case "panel":
      return "cs-nei-sketch--panel";
    default: {
      const exhaustive: never = variant;
      return exhaustive;
    }
  }
}

function MediaFigure({
  image,
  frame,
}: {
  image: DecisionImage;
  frame: MediaFrame;
}) {
  const gif = image.src.toLowerCase().includes(".gif");
  const framed = frame !== "full";
  return (
    <figure
      className={framed ? `om-media om-media--${frame}` : "om-media om-full"}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={1600}
        height={1000}
        sizes={
          frame === "phone"
            ? "(max-width: 767px) 100vw, 960px"
            : frame === "half"
              ? "(max-width: 767px) 100vw, 640px"
              : "(max-width: 1023px) 100vw, 960px"
        }
        className="om-media-img"
        unoptimized={gif}
      />
      {image.caption ? (
        <figcaption className="om-caption">{image.caption}</figcaption>
      ) : null}
    </figure>
  );
}

function MediaGroup({ images }: { images: DecisionImage[] }) {
  const nodes: ReactNode[] = [];
  for (let index = 0; index < images.length; ) {
    const frame = mediaFrame(images[index].src);
    if (frame === "full") {
      const image = images[index];
      nodes.push(<MediaFigure key={image.src} image={image} frame="full" />);
      index += 1;
      continue;
    }
    const group = [images[index]];
    let next = index + 1;
    while (next < images.length && mediaFrame(images[next].src) === frame) {
      group.push(images[next]);
      next += 1;
    }
    nodes.push(
      <div
        key={group[0].src}
        className={`om-media-row om-media-row--${frame} om-full`}
      >
        {group.map((image) => (
          <MediaFigure key={image.src} image={image} frame={frame} />
        ))}
      </div>,
    );
    index = next;
  }
  return <>{nodes}</>;
}

function DecisionMedia({ decision }: { decision: Decision }) {
  const images = (decision.images ?? []).filter((image) => image.src);
  const split = decision.imagePlaceholderSplit;
  const note = decision.imagePlaceholder?.trim();
  const nav = decision.navExploration ?? [];
  if (!images.length && split?.length !== 2 && !note && !nav.length)
    return null;

  return (
    <div className="om-decision-media">
      {images.length ? <MediaGroup images={images} /> : null}
      {split?.length === 2 ? (
        <div className="om-decision-split">
          <p className="om-decision-context">{split[0]}</p>
          <p className="om-decision-context">{split[1]}</p>
        </div>
      ) : null}
      {note && split?.length !== 2 ? (
        <p className="om-decision-context">{note}</p>
      ) : null}
      {nav.length ? (
        <div className="om-decision-nav">
          {nav.map((item) => (
            <div key={item.label} className="om-decision-nav-item">
              <DecisionLabel>{item.label}</DecisionLabel>
              <div
                className={cn("cs-nei-sketch", sketchClass(item.variant))}
                aria-hidden
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function DecisionBlock({
  decision,
  index,
}: {
  decision: Decision;
  index: number;
}) {
  const hasWhy = Boolean(decision.why?.trim());
  const rationaleLabel = hasWhy
    ? (decision.rationaleLabel ?? "Trade-off")
    : (decision.rationaleLabel ?? "Rationale");
  const sideLabel = hasWhy ? "Why" : (decision.impactLabel ?? "Impact");
  const sideText = (hasWhy ? decision.why : decision.impact) ?? "";
  const showRationale = Boolean(decision.rationale?.trim());
  const showSide = Boolean(sideText.trim());
  const outcome = hasWhy ? decision.impact.trim() : "";
  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      className="om-decision om-full"
      data-case-decision=""
      aria-label={decision.title}
    >
      <header className="om-decision-head">
        <DecisionLabel>{`Key decision ${number}`}</DecisionLabel>
        <h3 className="om-decision-title">{decision.title}</h3>
        {decision.description?.trim() ? (
          <p className="om-decision-context">
            {parseBoldSpans(decision.description)}
          </p>
        ) : null}
        <DecisionMedia decision={decision} />
      </header>
      {showRationale || showSide ? (
        <div className="om-decision-split om-decision-pair">
          {showRationale ? (
            <div className="om-decision-col">
              <DecisionLabel>{rationaleLabel}</DecisionLabel>
              <DecisionCopy text={decision.rationale} />
            </div>
          ) : null}
          {showSide ? (
            <div className="om-decision-col">
              <DecisionLabel>{sideLabel}</DecisionLabel>
              <DecisionCopy text={sideText} />
            </div>
          ) : null}
        </div>
      ) : null}
      {decision.rationaleReports?.length ? (
        <div className="om-decision-reports">
          {decision.rationaleReports.map((report) => (
            <div key={report.title} className="om-decision-report">
              <p className="om-decision-report-title">{report.title}</p>
              <p className="om-decision-report-body">{report.description}</p>
            </div>
          ))}
        </div>
      ) : null}
      {outcome ? (
        <div className="om-decision-outcome">
          <DecisionLabel tone="teal">
            {decision.impactLabel ?? "Outcome"}
          </DecisionLabel>
          <DecisionCopy text={outcome} />
        </div>
      ) : null}
      {decision.iteration?.trim() ? (
        <blockquote className="om-statement">
          <p className="om-statement-label">Iteration</p>
          <div className="om-statement-body">
            {paragraphsOf(decision.iteration).map((part) => (
              <p key={part.slice(0, 32)}>{parseBoldSpans(part)}</p>
            ))}
          </div>
        </blockquote>
      ) : null}
      {decision.designResponse?.trim() ? (
        <div className="om-decision-follow">
          <DecisionLabel>Solutioning</DecisionLabel>
          <DecisionCopy text={decision.designResponse} />
        </div>
      ) : null}
    </article>
  );
}
