"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import type { CaseStudy } from "@/case-studies/omantel";
import { MotionSection } from "@/components/case/MotionSection";
import { parseBoldSpans } from "@/lib/case-rich-text";

const PROTOTYPE_NDA_LINE =
  "Details shared under NDA — prototype walkthrough available.";

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

/**
 * Natural width/height from the files in public/Omantel assets.
 * Phone frames are only for portraits near 9:19.5. The mobile captures
 * are wide composites (about 1.4 and 1.78), so they stay full-width.
 */
const IMAGE_RATIOS: Record<string, number> = {
  "om mobile 1.gif": 1009 / 713,
  "om-mobile.png": 3840 / 2160,
  "noteworthy 1.png": 2154 / 1140,
  "noteworthy 2.png": 1520 / 1346,
};

function mediaFrame(src: string): MediaFrame {
  const name = decodeURIComponent(src.split("/").pop() ?? src).toLowerCase();
  if (name.includes("noteworthy 1") || name.includes("noteworthy 2")) {
    return "half";
  }
  const ratio = IMAGE_RATIOS[name];
  if (ratio !== undefined && ratio < 0.75) return "phone";
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
      <div className="om-media-frame">
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={1000}
          sizes={
            frame === "phone"
              ? "(max-width: 767px) 100vw, 320px"
              : frame === "half"
                ? "(max-width: 767px) 100vw, 640px"
                : "(max-width: 767px) 100vw, 960px"
          }
          className="om-media-img"
          unoptimized={gif}
        />
      </div>
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
  label,
  number,
  title,
  children,
}: {
  id: string;
  label: string;
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <MotionSection id={id} number={`${number}  ${label}`} title={title}>
      <div className="om-grid layout-grid">{children}</div>
    </MotionSection>
  );
}

function ImpactStats({
  blocks,
  showEyebrow = false,
}: {
  blocks: NonNullable<CaseStudy["sections"]["journalImpact"]>["blocks"];
  showEyebrow?: boolean;
}) {
  if (!blocks.length) return null;
  return (
    <>
      {showEyebrow ? (
        <h3 className="om-eyebrow om-stat-eyebrow om-full">Impact</h3>
      ) : null}
      <div className="om-stat-grid om-full">
        {blocks.map((block) => (
          <article key={block.value} className="om-card om-card--stat">
            <p className="om-stat-value">{block.value}</p>
            {block.metaDetail ? (
              <p className="om-dense">{block.metaDetail}</p>
            ) : null}
          </article>
        ))}
      </div>
    </>
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
      <div className="om-grid layout-grid om-full">
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
        <blockquote className="om-quote om-callout">
          <p className="om-subhead">Iteration</p>
          <div className="om-dense">
            {paragraphsOf(decision.iteration).map((part, partIndex) => (
              <p key={`${partIndex}-${part.slice(0, 16)}`}>
                {parseBoldSpans(part)}
              </p>
            ))}
          </div>
        </blockquote>
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
        label="At a glance"
        number="01"
        title="Enterprise reps submit and track bulk SIM batches without Omantel staff"
      >
        {caseStudy.tldr?.length ? (
          <dl className="om-tldr om-copy">
            {caseStudy.tldr.map((row) => (
              <div key={row.label} className="om-tldr-row">
                <dt className="om-eyebrow">{row.label}</dt>
                <dd className="om-meta-value">{row.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        <BulletList items={caseStudy.tldrNotes ?? []} />
        <p className="om-copy om-dense" data-prototype-slot="omantel">
          {caseStudy.prototypeHref?.trim() ? (
            <a href={caseStudy.prototypeHref.trim()}>{PROTOTYPE_NDA_LINE}</a>
          ) : (
            PROTOTYPE_NDA_LINE
          )}
        </p>
        <ImpactStats blocks={impact} showEyebrow />
      </StorySection>

      <StorySection
        id="context"
        label="Goal"
        number="02"
        title="Self-service was the prerequisite for scaling B2B bulk requests"
      >
        {sections.goal ? (
          <blockquote className="om-quote om-copy">
            <p>{parseBoldSpans(sections.goal)}</p>
          </blockquote>
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
        label="Problem"
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
        label="Ambiguity"
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
        label="Hypothesis"
        number="05"
        title="Validating at entry would prevent full-batch restarts"
      >
        {hypothesis ? (
          <>
            <blockquote className="om-quote om-copy">
              <p>
                <span className="om-subhead">My hypothesis: </span>
                {parseBoldSpans(hypothesis.quote)}
              </p>
            </blockquote>
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
        label="Decisions"
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
        label="Outcome"
        number="07"
        title="Confirmation moved from 48–72 hours to immediate"
      >
        <ImpactStats blocks={impact} />
        <MediaGroup images={sections.outcomeImages ?? []} />
      </StorySection>

      <StorySection
        id="collaboration"
        label="Collaboration"
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
        label="Learnings"
        number="09"
        title="Expertise does not remove the need for guardrails"
      >
        <BulletList items={learnings?.learned ?? []} />
        {learnings?.moreTime?.length ? (
          <div className="om-copy">
            <p className="om-subhead">With more time, I would:</p>
            <BulletList items={learnings.moreTime} />
          </div>
        ) : null}
      </StorySection>
    </>
  );
}
