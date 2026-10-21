"use client";

import type { CaseStudy } from "@/case-studies/omantel";
import { MotionSection } from "@/components/case/MotionSection";
import { MotionImage } from "@/components/case/MotionImage";
import { CaseStudyMediaCarousel } from "@/components/case/CaseStudyMediaCarousel";
import { Problem } from "@/components/case/Problem";
import { CaseConstraintsBlock } from "@/components/case/CaseConstraintsBlock";
import { getCaseVisualsPresentation } from "@/case-studies/case-visuals";
import { parseMadderSpans } from "@/lib/case-rich-text";

interface OmantelSystemMapProps {
  caseStudy: CaseStudy;
}

type ImpactBlock = NonNullable<
  CaseStudy["sections"]["journalImpact"]
>["blocks"][number];

type Decision = CaseStudy["sections"]["decisions"][number];

function paragraphsOf(text: string | undefined): string[] {
  if (!text?.trim()) return [];
  return text
    .split(/\n\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function understandingCopy(content: string): {
  paragraphs: string[];
  bullets: string[];
} {
  const paragraphs: string[] = [];
  const bullets: string[] = [];
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed === "---") continue;
    if (trimmed.startsWith("•")) {
      bullets.push(trimmed.replace(/^•\s*/, ""));
    } else {
      paragraphs.push(trimmed);
    }
  }
  return { paragraphs, bullets };
}

function ImpactCards({ blocks }: { blocks: ImpactBlock[] }) {
  if (!blocks.length) return null;
  return (
    <div className="om-block">
      <h3 className="om-eyebrow">Impact</h3>
      <ul className="om-impact-grid">
        {blocks.map((block, index) => {
          const value = block.value?.trim() ?? "";
          const suffix = block.labelItalic?.trim() ?? "";
          return (
            <li key={index} className="om-card om-impact-card">
              {value || suffix ? (
                <p className="om-impact-stat">
                  {value ? (
                    <span className="om-impact-value">{value}</span>
                  ) : null}
                  {suffix ? (
                    <span className="om-impact-suffix">{suffix}</span>
                  ) : null}
                </p>
              ) : null}
              {block.metaCaps ? (
                <p className="om-prose om-prose--secondary">{block.metaCaps}</p>
              ) : null}
              {block.metaDetail ? (
                <p className="om-prose om-prose--secondary om-preline">
                  {block.metaDetail}
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function BeforeAfter({
  beforeAfter,
}: {
  beforeAfter: NonNullable<CaseStudy["sections"]["outcomeBeforeAfter"]>;
}) {
  return (
    <div className="om-split">
      <article className="om-card">
        <h3 className="om-eyebrow">Before</h3>
        <p className="om-prose">{beforeAfter.before}</p>
      </article>
      <article className="om-card">
        <h3 className="om-eyebrow">After</h3>
        <p className="om-prose">{beforeAfter.after}</p>
      </article>
    </div>
  );
}

function PainPoints({
  groups,
}: {
  groups: NonNullable<
    NonNullable<CaseStudy["sections"]["understanding"]>["painPointGroups"]
  >;
}) {
  if (!groups.length) return null;
  return (
    <div className="om-split" role="list">
      {groups.map((group) => (
        <article key={group.title} className="om-card" role="listitem">
          <h4 className="om-pain-title">{group.title}</h4>
          <ul className="om-list">
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

function ProseStack({
  paragraphs,
  className,
}: {
  paragraphs: string[];
  className?: string;
}) {
  if (!paragraphs.length) return null;
  return (
    <div className={className}>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="om-prose">
          {parseMadderSpans(paragraph)}
        </p>
      ))}
    </div>
  );
}

function DecisionArticle({
  decision,
  index,
}: {
  decision: Decision;
  index: number;
}) {
  const images = decision.images ?? [];
  const rationale = paragraphsOf(decision.rationale);
  const impact = paragraphsOf(decision.impact);
  const response = paragraphsOf(decision.designResponse);
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className="om-decision">
      <p className="om-eyebrow">Key decision {number}</p>
      <h3 className="om-decision-title">{decision.title}</h3>
      {decision.description ? (
        <p className="om-decision-lede">{decision.description}</p>
      ) : null}
      {images.length > 0 ? (
        <CaseStudyMediaCarousel tone="light" images={images} showSlideCounter />
      ) : null}
      {rationale.length > 0 || impact.length > 0 ? (
        <div className="om-split">
          {rationale.length > 0 ? (
            <div>
              <h4 className="om-eyebrow">Rationale</h4>
              <ProseStack paragraphs={rationale} />
            </div>
          ) : null}
          {impact.length > 0 ? (
            <div>
              <h4 className="om-eyebrow">Impact</h4>
              <ProseStack paragraphs={impact} />
            </div>
          ) : null}
        </div>
      ) : null}
      {response.length > 0 ? (
        <div className="om-block">
          <h4 className="om-eyebrow">Solutioning</h4>
          <ProseStack paragraphs={response} />
        </div>
      ) : null}
    </article>
  );
}

export function OmantelSystemMap({ caseStudy }: OmantelSystemMapProps) {
  const s = caseStudy.sections;
  const visuals = getCaseVisualsPresentation(caseStudy);
  const understanding = s.understanding;
  const understood = understanding
    ? understandingCopy(understanding.content)
    : null;
  const flow = understanding?.afterDivider;
  const impact = s.journalImpact?.blocks ?? [];
  const hasOverview =
    Boolean(s.contextFlow?.paragraphs?.length) ||
    Boolean(s.context) ||
    Boolean(s.contextSections?.length) ||
    impact.length > 0;
  const hasProblem =
    Boolean(s.outcomeBeforeAfter) ||
    Boolean(understanding) ||
    s.problem.length > 0 ||
    s.constraints.length > 0;
  const hasOutcome =
    Boolean(s.reflection?.trim()) ||
    Boolean(s.reflectionBullets?.length) ||
    Boolean(s.outcomeImages?.length) ||
    Boolean(s.outcomeHighlights?.length) ||
    Boolean(s.outcome?.trim()) ||
    visuals.mode !== "none";

  return (
    <div className="omantel-system">
      {hasOverview ? (
        <MotionSection id="context" title="Overview" number="01">
          <ImpactCards blocks={impact} />
          {s.contextFlow?.paragraphs?.length ? (
            <div className="om-block">
              <ProseStack paragraphs={s.contextFlow.paragraphs} />
              {s.contextFlow.aim ? (
                <p className="om-aim">{parseMadderSpans(s.contextFlow.aim)}</p>
              ) : null}
            </div>
          ) : null}
          {s.contextSections?.length ? (
            <div className="om-block">
              {s.contextSections.map((section) => (
                <section key={section.title} className="om-block">
                  <h3 className="om-subhead">{section.title}</h3>
                  <p className="om-prose">{section.body}</p>
                </section>
              ))}
            </div>
          ) : null}
          {s.context && !s.contextFlow?.paragraphs?.length ? (
            <ProseStack paragraphs={paragraphsOf(s.context)} />
          ) : null}
        </MotionSection>
      ) : null}

      {hasProblem ? (
        <MotionSection id="problem" title="Problem" number="02">
          {s.outcomeBeforeAfter ? (
            <BeforeAfter beforeAfter={s.outcomeBeforeAfter} />
          ) : null}
          {s.problem.length > 0 ? <Problem problem={s.problem} /> : null}
          {understood && understanding ? (
            <div className="om-block">
              <h3 className="om-subhead">{understanding.title}</h3>
              <ProseStack paragraphs={understood.paragraphs} />
              {understood.bullets.length > 0 ? (
                <ul className="om-list">
                  {understood.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {understanding.images?.map((image, index) =>
                image.src ? (
                  <MotionImage
                    key={image.src}
                    className="om-shot"
                    src={image.src}
                    alt={image.alt ?? "Understanding visual"}
                    caption={image.caption}
                    intrinsic
                    lightbox
                    objectFit="contain"
                  />
                ) : (
                  <div
                    key={`placeholder-${index}`}
                    className="om-shot-placeholder"
                    aria-hidden
                  />
                ),
              )}
              {understanding.painPointGroups?.length ? (
                <PainPoints groups={understanding.painPointGroups} />
              ) : null}
            </div>
          ) : null}
          {flow?.images?.length ? (
            <div className="om-block">
              <h3 className="om-subhead">{flow.title}</h3>
              {flow.content ? <p className="om-prose">{flow.content}</p> : null}
              <CaseStudyMediaCarousel
                tone="light"
                images={flow.images.map((image) => ({
                  src: image.src,
                  alt: image.alt ?? "",
                  caption: image.caption,
                }))}
                showSlideCounter
              />
            </div>
          ) : null}
          <CaseConstraintsBlock constraints={s.constraints} />
        </MotionSection>
      ) : null}

      {s.decisions.length > 0 ? (
        <MotionSection id="decisions" title="Key Decisions" number="03">
          <div className="om-decision-stack">
            {s.decisions.map((decision, index) => (
              <DecisionArticle
                key={`${decision.title}-${index}`}
                decision={decision}
                index={index}
              />
            ))}
          </div>
        </MotionSection>
      ) : null}

      {hasOutcome ? (
        <MotionSection id="outcome" title="Reflection" number="04">
          {s.outcomeImages?.length ? (
            <CaseStudyMediaCarousel
              tone="light"
              images={s.outcomeImages}
              showSlideCounter
            />
          ) : null}
          {s.outcomeHighlights?.length ? (
            <ul className="om-list">
              {s.outcomeHighlights.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          ) : null}
          {s.outcome?.trim() ? (
            <ProseStack paragraphs={paragraphsOf(s.outcome)} />
          ) : null}
          {s.outcomePill ? (
            <p>
              <span className="site-badge site-badge--badge">
                {s.outcomePill}
              </span>
            </p>
          ) : null}
          {s.reflection?.trim() || s.reflectionBullets?.length ? (
            <div className="om-block">
              <h3 className="om-subhead">Reflection</h3>
              {s.reflection?.trim() ? (
                <p className="om-prose om-preline">{s.reflection}</p>
              ) : null}
              {s.reflectionBullets?.length ? (
                <ul className="om-list">
                  {s.reflectionBullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {s.reflectionClosing ? (
                <p className="om-aim">
                  {parseMadderSpans(s.reflectionClosing)}
                </p>
              ) : null}
            </div>
          ) : null}
          {visuals.mode === "noteworthy" ? (
            <div className="om-block">
              <h3 className="om-subhead">Noteworthy iterations</h3>
              <div className="om-stack">
                {visuals.slides.map(({ section, index }) => {
                  const image = section.image;
                  const video = section.video;
                  return (
                    <div key={index} className="om-stack-item">
                      {section.title ? (
                        <h4 className="om-subhead">{section.title}</h4>
                      ) : null}
                      {image ? (
                        <MotionImage
                          className="om-shot"
                          src={image.src}
                          alt={image.alt}
                          caption={image.caption}
                          intrinsic
                          lightbox
                          objectFit="contain"
                        />
                      ) : null}
                      {video ? (
                        <video
                          className="om-video"
                          src={video.src}
                          controls
                          playsInline
                        />
                      ) : null}
                      {video?.caption ? (
                        <p className="cs-visual-caption">{video.caption}</p>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
          {visuals.mode === "legacy" ? (
            <div className="om-stack">
              {visuals.images.map((image) => (
                <MotionImage
                  key={image.src}
                  className="om-shot"
                  src={image.src}
                  alt={image.alt}
                  caption={image.caption}
                  intrinsic
                  lightbox
                  objectFit="contain"
                />
              ))}
            </div>
          ) : null}
        </MotionSection>
      ) : null}
    </div>
  );
}
