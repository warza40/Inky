"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import type { CaseStudy } from "@/case-studies/omantel";
import { GlancePanel } from "@/components/case/GlancePanel";
import { ImpactStatPanel } from "@/components/case/ImpactStatPanel";
import { MotionSection } from "@/components/case/MotionSection";
import { parseBoldSpans } from "@/lib/case-rich-text";

const PROTOTYPE_NDA_LINE =
  "Details shared under NDA — prototype walkthrough available.";

/**
 * tldrNotes has no label in the case data.
 * Placeholder for the copywriter to confirm.
 */
const TLDR_NOTES_LABEL = "Constraints";

interface OmantelSystemMapProps {
  caseStudy: CaseStudy;
}

type Decision = CaseStudy["sections"]["decisions"][number];

function paragraphsOf(text: string): string[] {
  return text
    .split(/\n\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function Copy({ text }: { text: string }) {
  const parts = paragraphsOf(text);
  if (!parts.length) return null;
  return (
    <div className="om-copy">
      {parts.map((part, index) => (
        <p key={`${index}-${part.slice(0, 24)}`}>{parseBoldSpans(part)}</p>
      ))}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <ul className="om-list om-copy">
      {items.map((item) => (
        <li key={item}>{parseBoldSpans(item)}</li>
      ))}
    </ul>
  );
}

type MediaFrame = "full" | "half" | "phone";

function mediaFrame(src: string): MediaFrame {
  const name = decodeURIComponent(src.split("/").pop() ?? src).toLowerCase();
  if (name.includes("mobile") || name.includes("phone")) return "phone";
  if (name.includes("noteworthy 1") || name.includes("noteworthy 2")) {
    return "half";
  }
  return "full";
}

function MediaFigure({
  src,
  alt,
  caption,
  frame = "full",
}: {
  src: string;
  alt: string;
  caption?: string;
  frame?: MediaFrame;
}) {
  const gif = src.toLowerCase().includes(".gif");
  const framed = frame !== "full";
  return (
    <figure
      className={framed ? `om-media om-media--${frame}` : "om-media om-full"}
    >
      <Image
        src={src}
        alt={alt}
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
      {caption ? (
        <figcaption className="om-caption">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

function MediaGroup({
  images,
}: {
  images: Array<{ src: string; alt?: string; caption?: string }>;
}) {
  const nodes: ReactNode[] = [];
  for (let index = 0; index < images.length; ) {
    const frame = mediaFrame(images[index].src);
    if (frame === "full") {
      const image = images[index];
      nodes.push(
        <MediaFigure
          key={image.src}
          src={image.src}
          alt={image.alt ?? ""}
          caption={image.caption}
        />,
      );
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
          <MediaFigure
            key={image.src}
            src={image.src}
            alt={image.alt ?? ""}
            caption={image.caption}
            frame={frame}
          />
        ))}
      </div>,
    );
    index = next;
  }
  return <>{nodes}</>;
}

function StatementCard({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <blockquote className="om-statement">
      <p className="om-statement-label">{label}</p>
      <div className="om-statement-body">{children}</div>
    </blockquote>
  );
}

function SystemCard({
  span,
  label,
  title,
  children,
}: {
  span: "half" | "third";
  label?: string;
  title?: string;
  children: ReactNode;
}) {
  return (
    <article className={`om-card om-card--${span}`}>
      {label ? <p className="om-subhead">{label}</p> : null}
      {title ? <h3 className="om-pain-title">{title}</h3> : null}
      {children}
    </article>
  );
}

function StorySection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <MotionSection id={id} number={number} title={title}>
      <div className="om-grid layout-grid">{children}</div>
    </MotionSection>
  );
}

function DecisionArticle({
  decision,
  index,
}: {
  decision: Decision;
  index: number;
}) {
  const hasWhy = Boolean(decision.why?.trim());
  const images = (decision.images ?? []).filter((image) => image.src);
  const rationaleLabel = hasWhy
    ? (decision.rationaleLabel ?? "Trade-off")
    : (decision.rationaleLabel ?? "Rationale");
  const sideLabel = hasWhy ? "Why" : (decision.impactLabel ?? "Impact");
  const sideText = hasWhy ? decision.why : decision.impact;

  return (
    <article className="om-decision om-full" aria-label={decision.title}>
      <p className="om-eyebrow">
        Decision {String(index + 1).padStart(2, "0")}
      </p>
      <h3 className="om-decision-title">{decision.title}</h3>
      {decision.description ? <Copy text={decision.description} /> : null}
      <MediaGroup images={images} />
      <div className="om-decision-points om-grid layout-grid om-full">
        {decision.rationale?.trim() ? (
          <SystemCard span="half" label={rationaleLabel}>
            <div className="om-dense">
              {paragraphsOf(decision.rationale).map((part, partIndex) => (
                <p key={`${partIndex}-${part.slice(0, 16)}`}>
                  {parseBoldSpans(part)}
                </p>
              ))}
            </div>
          </SystemCard>
        ) : null}
        {sideText?.trim() ? (
          <SystemCard span="half" label={sideLabel}>
            <div className="om-dense">
              {paragraphsOf(sideText).map((part, partIndex) => (
                <p key={`${partIndex}-${part.slice(0, 16)}`}>
                  {parseBoldSpans(part)}
                </p>
              ))}
            </div>
          </SystemCard>
        ) : null}
        {hasWhy && decision.impact?.trim() ? (
          <SystemCard span="half" label={decision.impactLabel ?? "Outcome"}>
            <div className="om-dense">
              {paragraphsOf(decision.impact).map((part, partIndex) => (
                <p key={`${partIndex}-${part.slice(0, 16)}`}>
                  {parseBoldSpans(part)}
                </p>
              ))}
            </div>
          </SystemCard>
        ) : null}
      </div>
      {decision.iteration?.trim() ? (
        <StatementCard label="Iteration">
          {paragraphsOf(decision.iteration).map((part, partIndex) => (
            <p key={`${partIndex}-${part.slice(0, 16)}`}>
              {parseBoldSpans(part)}
            </p>
          ))}
        </StatementCard>
      ) : null}
    </article>
  );
}

export function OmantelSystemMap({ caseStudy }: OmantelSystemMapProps) {
  const sections = caseStudy.sections;
  const impact = sections.journalImpact?.blocks ?? [];
  const understanding = sections.understanding;
  const hypothesis = sections.hypothesis;
  const collaboration = sections.collaboration;
  const learnings = sections.learnings;
  const conceptualImages = (understanding?.images ?? []).filter(
    (image): image is { src: string; alt?: string; caption?: string } =>
      Boolean(image.src),
  );
  const flowImages = understanding?.afterDivider?.images ?? [];

  return (
    <>
      <StorySection
        id="tldr"
        number="01"
        title="Enterprise reps submit and track bulk SIM batches without Omantel staff"
      >
        <GlancePanel
          className="om-full"
          rows={caseStudy.tldr ?? []}
          notes={caseStudy.tldrNotes}
          notesLabel={TLDR_NOTES_LABEL}
        />
        <p className="om-note om-full" data-prototype-slot="omantel">
          {caseStudy.prototypeHref?.trim() ? (
            <a href={caseStudy.prototypeHref.trim()}>{PROTOTYPE_NDA_LINE}</a>
          ) : (
            PROTOTYPE_NDA_LINE
          )}
        </p>
        <ImpactStatPanel blocks={impact} />
      </StorySection>

      <StorySection
        id="context"
        number="02"
        title="Self-service was the prerequisite for scaling B2B bulk requests"
      >
        {sections.goal ? (
          <StatementCard label="Goal">
            <p>{parseBoldSpans(sections.goal)}</p>
          </StatementCard>
        ) : null}
        {sections.contextFlow?.paragraphs?.length ? (
          <div className="om-copy">
            {sections.contextFlow.paragraphs.map((paragraph) => (
              <p key={paragraph}>{parseBoldSpans(paragraph)}</p>
            ))}
          </div>
        ) : null}
      </StorySection>

      <StorySection
        id="problem"
        number="03"
        title="Errors surfaced only after submission, forcing full-batch restarts"
      >
        {sections.outcomeBeforeAfter ? (
          <>
            <SystemCard span="half" label="Before">
              <div className="om-dense">
                {paragraphsOf(sections.outcomeBeforeAfter.before).map(
                  (part, index) => (
                    <p key={`${index}-${part.slice(0, 16)}`}>
                      {parseBoldSpans(part)}
                    </p>
                  ),
                )}
              </div>
            </SystemCard>
            <SystemCard span="half" label="After">
              <div className="om-dense">
                {paragraphsOf(sections.outcomeBeforeAfter.after).map(
                  (part, index) => (
                    <p key={`${index}-${part.slice(0, 16)}`}>
                      {parseBoldSpans(part)}
                    </p>
                  ),
                )}
              </div>
            </SystemCard>
          </>
        ) : null}
        {understanding?.painPointGroups?.length ? (
          <>
            <h3 className="om-eyebrow om-full">Pain points on both sides</h3>
            {understanding.painPointGroups.map((group) => (
              <SystemCard key={group.title} span="half" title={group.title}>
                <ul className="om-list om-dense">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </SystemCard>
            ))}
          </>
        ) : null}
      </StorySection>

      <StorySection
        id="ambiguity"
        number="04"
        title="Ops walkthroughs showed errors starting across three disconnected tools"
      >
        <Copy text={understanding?.content ?? ""} />
        <MediaGroup images={conceptualImages} />
        {understanding?.afterDivider?.title ? (
          <h3 className="om-subhead om-full">
            {understanding.afterDivider.title}
          </h3>
        ) : null}
        <MediaGroup
          images={flowImages.filter(
            (image): image is { src: string; alt?: string; caption?: string } =>
              Boolean(image.src),
          )}
        />
      </StorySection>

      <StorySection
        id="hypothesis"
        number="05"
        title="Validating at entry would prevent full-batch restarts"
      >
        {hypothesis ? (
          <>
            <StatementCard label="Hypothesis">
              <p>{parseBoldSpans(hypothesis.quote)}</p>
            </StatementCard>
            {hypothesis.signals.length > 0 ? (
              <>
                <p className="om-subhead om-full">Success signals</p>
                <BulletList items={hypothesis.signals} />
              </>
            ) : null}
          </>
        ) : null}
      </StorySection>

      <StorySection
        id="decisions"
        number="06"
        title="Five decisions that enabled unassisted submission"
      >
        {sections.decisions.map((decision, index) => (
          <DecisionArticle
            key={decision.title}
            decision={decision}
            index={index}
          />
        ))}
      </StorySection>

      <StorySection
        id="outcome"
        number="07"
        title="Confirmation moved from 48–72 hours to immediate"
      >
        <MediaGroup images={sections.outcomeImages ?? []} />
      </StorySection>

      <StorySection
        id="collaboration"
        number="08"
        title="Aligning a key stakeholder on guardrails for expert users"
      >
        {collaboration?.intro ? <Copy text={collaboration.intro} /> : null}
        {collaboration?.points?.length ? (
          <div className="om-stakeholder om-copy">
            {collaboration.points.map((point) => (
              <div key={point.label} className="om-stakeholder-row">
                <p className="om-stakeholder-label">{point.label}</p>
                <p>{point.text}</p>
              </div>
            ))}
          </div>
        ) : null}
      </StorySection>

      <StorySection
        id="learnings"
        number="09"
        title="Expertise does not remove the need for guardrails"
      >
        <BulletList items={learnings?.learned ?? []} />
        {learnings?.moreTime?.length ? (
          <div className="om-more-time om-copy">
            <p className="om-mono-section">With more time, I would:</p>
            <BulletList items={learnings.moreTime} />
          </div>
        ) : null}
      </StorySection>
    </>
  );
}
