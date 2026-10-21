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

function MediaFigure({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  const gif = src.toLowerCase().includes(".gif");
  return (
    <figure className="om-media om-full">
      <div className="om-media-frame">
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={1000}
          sizes="(max-width: 767px) 100vw, 1280px"
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
}: {
  blocks: NonNullable<CaseStudy["sections"]["journalImpact"]>["blocks"];
}) {
  if (!blocks.length) return null;
  return (
    <>
      {blocks.map((block) => (
        <SystemCard key={block.value} span="third">
          <p className="om-stat-value">{block.value}</p>
          {block.metaDetail ? (
            <p className="om-dense">{block.metaDetail}</p>
          ) : null}
        </SystemCard>
      ))}
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
      {images.map((image) => (
        <MediaFigure
          key={image.src}
          src={image.src}
          alt={image.alt}
          caption={image.caption}
        />
      ))}
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
        {decision.iteration?.trim() ? (
          <SystemCard span="half" label="Iteration">
            <div className="om-dense">
              {paragraphsOf(decision.iteration).map((part, partIndex) => (
                <p key={`${partIndex}-${part.slice(0, 16)}`}>
                  {parseBoldSpans(part)}
                </p>
              ))}
            </div>
          </SystemCard>
        ) : null}
      </div>
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
        title="A clean batch, with no staff in the loop."
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
        <ImpactStats blocks={impact} />
      </StorySection>

      <StorySection
        id="context"
        label="Goal"
        number="02"
        title="Staff out of the loop."
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
        title="One bad row restarted the batch."
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
            <h3 className="om-eyebrow om-full">Two sets of pain</h3>
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
        title="I learned it from the people doing the work."
      >
        <Copy text={understanding?.content ?? ""} />
        {conceptualImages.map((image) => (
          <MediaFigure
            key={image.src}
            src={image.src}
            alt={image.alt ?? ""}
            caption={image.caption}
          />
        ))}
        {flowImages.map((image) =>
          image.src ? (
            <MediaFigure
              key={image.src}
              src={image.src}
              alt={image.alt ?? ""}
              caption={image.caption}
            />
          ) : null,
        )}
      </StorySection>

      <StorySection
        id="hypothesis"
        label="Hypothesis"
        number="05"
        title="Catch the error at entry, and the batch doesn't restart."
      >
        {hypothesis ? (
          <div className="om-copy">
            <p>
              <span className="om-subhead">My hypothesis: </span>
              {parseBoldSpans(hypothesis.quote)}
            </p>
            {hypothesis.signals.length > 0 ? (
              <>
                <p className="om-subhead">How we’d know it worked</p>
                <BulletList items={hypothesis.signals} />
              </>
            ) : null}
          </div>
        ) : null}
      </StorySection>

      <StorySection
        id="decisions"
        label="Decisions"
        number="06"
        title="Five calls that let reps submit without staff."
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
        title="48–72 hours became immediate."
      >
        <ImpactStats blocks={impact} />
        {(sections.outcomeImages ?? []).map((image) => (
          <MediaFigure
            key={image.src}
            src={image.src}
            alt={image.alt}
            caption={image.caption}
          />
        ))}
      </StorySection>

      <StorySection
        id="collaboration"
        label="Collaboration"
        number="08"
        title="He thought experts didn't need templates."
      >
        {collaboration?.intro ? <Copy text={collaboration.intro} /> : null}
        {collaboration ? (
          <div className="om-copy">
            {paragraphsOf(collaboration.quote).map((part, index) => (
              <p key={`${index}-${part.slice(0, 24)}`}>
                {parseBoldSpans(part)}
              </p>
            ))}
          </div>
        ) : null}
        <BulletList items={collaboration?.bullets ?? []} />
      </StorySection>

      <StorySection
        id="learnings"
        label="Learnings"
        number="09"
        title="Experts make mistakes too."
      >
        <BulletList items={learnings?.learned ?? []} />
        {learnings?.moreTime?.length ? (
          <div className="om-copy">
            <p className="om-subhead">With more time I’d…</p>
            <BulletList items={learnings.moreTime} />
          </div>
        ) : null}
      </StorySection>
    </>
  );
}
