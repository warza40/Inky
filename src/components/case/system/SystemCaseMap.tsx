"use client";

import Image from "next/image";
import { Fragment, type ReactNode } from "react";
import type { CaseStudy } from "@/case-studies/omantel";
import { ImpactStatPanel } from "@/components/case/ImpactStatPanel";
import { MotionSection } from "@/components/case/MotionSection";
import { parseBoldSpans, parseMadderSpans } from "@/lib/case-rich-text";

type Sections = CaseStudy["sections"];
type Decision = Sections["decisions"][number];
type Understanding = NonNullable<Sections["understanding"]>;

function paragraphsOf(text: string): string[] {
  return text
    .split(/\n\n/)
    .map((part) => part.trim())
    .filter((part) => part && part !== "---");
}

function Inline({ text, madder = false }: { text: string; madder?: boolean }) {
  return <>{madder ? parseMadderSpans(text) : parseBoldSpans(text)}</>;
}

function Prose({ text, madder = false }: { text: string; madder?: boolean }) {
  const chunks = paragraphsOf(text);
  if (!chunks.length) return null;
  return (
    <div className="om-copy">
      {chunks.map((chunk) => {
        const lines = chunk
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line && line !== "---");
        const bullets = lines.filter((line) => line.startsWith("•"));
        const prose = lines.filter((line) => !line.startsWith("•"));
        return (
          <Fragment key={chunk.slice(0, 32)}>
            {prose.map((line) => (
              <p key={line}>
                <Inline text={line} madder={madder} />
              </p>
            ))}
            {bullets.length > 0 ? (
              <ul className="om-list">
                {bullets.map((line) => (
                  <li key={line}>
                    <Inline text={line.replace(/^•\s*/, "")} madder={madder} />
                  </li>
                ))}
              </ul>
            ) : null}
          </Fragment>
        );
      })}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <ul className="om-list om-copy">
      {items.map((item) => (
        <li key={item}>
          <Inline text={item} />
        </li>
      ))}
    </ul>
  );
}

type MediaFrame = "full" | "half" | "phone";

function mediaFrame(src: string, alt = ""): MediaFrame {
  const name = decodeURIComponent(src.split("/").pop() ?? src).toLowerCase();
  const label = `${name} ${alt}`.toLowerCase();
  if (label.includes("mobile") || label.includes("phone")) return "phone";
  return "full";
}

function MediaFigure({
  src,
  alt,
  caption,
  frame = "full",
  width,
  height,
}: {
  src: string;
  alt: string;
  caption?: string;
  frame?: MediaFrame;
  width?: number;
  height?: number;
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
        width={width ?? 1600}
        height={height ?? 900}
        sizes={
          frame === "phone"
            ? "(max-width: 767px) 100vw, 960px"
            : frame === "half"
              ? "(max-width: 767px) 100vw, 640px"
              : "(max-width: 767px) 100vw, 960px"
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
  images: Array<{
    src: string;
    alt?: string;
    caption?: string;
    width?: number;
    height?: number;
  }>;
}) {
  const nodes: ReactNode[] = [];
  for (let index = 0; index < images.length; ) {
    const frame = mediaFrame(images[index].src, images[index].alt);
    if (frame === "full") {
      const image = images[index];
      nodes.push(
        <MediaFigure
          key={`${image.src}-${index}`}
          src={image.src}
          alt={image.alt ?? ""}
          caption={image.caption}
          width={image.width}
          height={image.height}
        />,
      );
      index += 1;
      continue;
    }
    const group = [images[index]];
    let next = index + 1;
    while (
      next < images.length &&
      mediaFrame(images[next].src, images[next].alt) === frame
    ) {
      group.push(images[next]);
      next += 1;
    }
    nodes.push(
      <div
        key={`${group[0].src}-${index}`}
        className={`om-media-row om-media-row--${frame} om-full`}
      >
        {group.map((image, imageIndex) => (
          <MediaFigure
            key={`${image.src}-${imageIndex}`}
            src={image.src}
            alt={image.alt ?? ""}
            caption={image.caption}
            frame={frame}
            width={image.width}
            height={image.height}
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
  label?: string;
  children: ReactNode;
}) {
  return (
    <blockquote className="om-statement">
      {label ? <p className="om-statement-label">{label}</p> : null}
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

function Subhead({ children }: { children: ReactNode }) {
  return <h3 className="om-subhead om-full sys-subgroup">{children}</h3>;
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

function Ecosystem({
  data,
}: {
  data: NonNullable<Sections["contextEcosystem"]>;
}) {
  return (
    <>
      <Subhead>{data.eyebrow}</Subhead>
      <Prose text={data.intro} />
      {data.boxTitle ? <Subhead>{data.boxTitle}</Subhead> : null}
      {data.products.map((product) => (
        <SystemCard key={product.name} span="half" title={product.name}>
          <p className="sys-platform">
            {product.platform === "desktop" ? "Desktop" : "Mobile"}
          </p>
          <div className="om-dense">
            <p>{product.description}</p>
          </div>
        </SystemCard>
      ))}
    </>
  );
}

function PersonaGrid({
  personas,
  quote,
}: {
  personas: NonNullable<
    NonNullable<Understanding["afterSecondaryResearchDivider"]>["personas"]
  >;
  quote?: string;
}) {
  return (
    <>
      {personas.map((persona) => (
        <SystemCard key={persona.name} span="half" title={persona.name}>
          <p className="om-caption">{persona.ageLine}</p>
          <p className="om-dense">{persona.worksWith}</p>
          <p className="om-subhead">Motivations</p>
          <ul className="om-list">
            {persona.motivations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="om-subhead">Frustrations</p>
          <ul className="om-list">
            {persona.frustrations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="om-subhead">Pain points</p>
          <ul className="om-list">
            {persona.painPoints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </SystemCard>
      ))}
      {quote?.trim() ? (
        <StatementCard>
          <p>{quote}</p>
        </StatementCard>
      ) : null}
    </>
  );
}

function UnderstandingBody({
  understanding,
}: {
  understanding: Understanding;
}) {
  const secondary = understanding.afterSecondaryResearchDivider;
  const personas = understanding.afterPersonasDivider;
  return (
    <>
      {understanding.title ? <Subhead>{understanding.title}</Subhead> : null}
      {understanding.content.trim() ? (
        <Prose text={understanding.content} />
      ) : null}
      {understanding.expandedContent?.trim() ? (
        <Prose text={understanding.expandedContent} />
      ) : null}
      {understanding.visualsTitle ? (
        <Subhead>{understanding.visualsTitle}</Subhead>
      ) : null}
      {understanding.images?.length ? (
        <MediaGroup
          images={understanding.images.flatMap((image) =>
            image.src
              ? [
                  {
                    src: image.src,
                    alt: image.alt,
                    caption: image.caption,
                  },
                ]
              : [],
          )}
        />
      ) : null}
      {understanding.painPointGroups?.map((group) => (
        <Fragment key={group.title}>
          <Subhead>{group.title}</Subhead>
          <BulletList items={group.items} />
        </Fragment>
      ))}
      {understanding.afterDivider ? (
        <>
          <Subhead>{understanding.afterDivider.title}</Subhead>
          {understanding.afterDivider.goal ? (
            <Prose text={understanding.afterDivider.goal} />
          ) : null}
          {understanding.afterDivider.content ? (
            <Prose text={understanding.afterDivider.content} />
          ) : null}
          {understanding.afterDivider.bullets?.length ? (
            <BulletList items={understanding.afterDivider.bullets} />
          ) : null}
          {understanding.afterDivider.images?.length ? (
            <MediaGroup images={understanding.afterDivider.images} />
          ) : null}
        </>
      ) : null}
      {understanding.afterApproachDivider ? (
        <>
          <Subhead>{understanding.afterApproachDivider.title}</Subhead>
          <Prose text={understanding.afterApproachDivider.content} />
        </>
      ) : null}
      {secondary ? (
        <>
          <Subhead>{secondary.title}</Subhead>
          {secondary.intro ? <Prose text={secondary.intro} /> : null}
          {secondary.bullets?.length ? (
            <BulletList items={secondary.bullets} />
          ) : null}
          {secondary.personas?.length ? (
            <PersonaGrid
              personas={secondary.personas}
              quote={secondary.personaQuote}
            />
          ) : secondary.content.trim() ? (
            <Prose text={secondary.content} />
          ) : null}
        </>
      ) : null}
      {personas ? (
        <>
          <Subhead>{personas.title}</Subhead>
          {personas.intro ? <Prose text={personas.intro} /> : null}
          {personas.bullets?.length ? (
            <BulletList items={personas.bullets} />
          ) : null}
          {personas.content.trim() ? <Prose text={personas.content} /> : null}
          {personas.images?.length ? (
            <MediaGroup images={personas.images} />
          ) : null}
          {personas.workflowsIntro || personas.workflows?.length ? (
            <>
              <Subhead>Exploring high frequency workflows</Subhead>
              {personas.workflowsIntro ? (
                <Prose text={personas.workflowsIntro} />
              ) : null}
              {personas.workflows?.map((workflow) => (
                <SystemCard
                  key={workflow.title}
                  span="third"
                  title={workflow.title}
                >
                  <div className="om-dense">
                    <p>{workflow.description}</p>
                  </div>
                </SystemCard>
              ))}
              {personas.workflowsClosing ? (
                <Prose text={personas.workflowsClosing} />
              ) : null}
            </>
          ) : null}
        </>
      ) : null}
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
      {decision.description?.trim() ? (
        <Prose text={decision.description} />
      ) : null}
      {decision.images?.length ? <MediaGroup images={decision.images} /> : null}
      {decision.imagePlaceholder && !decision.imagePlaceholderSplit ? (
        <Prose text={decision.imagePlaceholder} />
      ) : null}
      {decision.imagePlaceholderSplit?.length === 2 ? (
        <>
          <Prose text={decision.imagePlaceholderSplit[0]} />
          <Prose text={decision.imagePlaceholderSplit[1]} />
        </>
      ) : null}
      {decision.navExploration?.length ? (
        <div className="om-grid layout-grid om-full">
          {decision.navExploration.map((item) => (
            <SystemCard key={item.label} span="third" label={item.label}>
              <div
                className={`cs-nei-sketch sys-nav-sketch cs-nei-sketch--${item.variant}`}
                aria-hidden
              />
            </SystemCard>
          ))}
        </div>
      ) : null}
      <div className="om-decision-points om-grid layout-grid om-full">
        {decision.rationale?.trim() || decision.rationaleReports?.length ? (
          <SystemCard span="half" label={rationaleLabel}>
            <div className="om-dense">
              {paragraphsOf(decision.rationale).map((part) => (
                <p key={part.slice(0, 24)}>
                  <Inline text={part} />
                </p>
              ))}
            </div>
          </SystemCard>
        ) : null}
        {sideText?.trim() ? (
          <SystemCard span="half" label={sideLabel}>
            <div className="om-dense">
              {paragraphsOf(sideText).map((part) => (
                <p key={part.slice(0, 24)}>
                  <Inline text={part} />
                </p>
              ))}
            </div>
          </SystemCard>
        ) : null}
        {hasWhy && decision.impact?.trim() ? (
          <SystemCard span="half" label={decision.impactLabel ?? "Outcome"}>
            <div className="om-dense">
              {paragraphsOf(decision.impact).map((part) => (
                <p key={part.slice(0, 24)}>
                  <Inline text={part} />
                </p>
              ))}
            </div>
          </SystemCard>
        ) : null}
        {decision.rationaleReports?.map((report, reportIndex) => (
          <SystemCard
            key={report.title}
            span="half"
            label={String(reportIndex + 1).padStart(2, "0")}
            title={report.title}
          >
            <div className="om-dense">
              <p>{report.description}</p>
            </div>
          </SystemCard>
        ))}
        {decision.designResponse?.trim() ? (
          <SystemCard span="half" label="Solutioning">
            <div className="om-dense">
              {paragraphsOf(decision.designResponse).map((part) => (
                <p key={part.slice(0, 24)}>
                  <Inline text={part} />
                </p>
              ))}
            </div>
          </SystemCard>
        ) : null}
      </div>
      {decision.iteration?.trim() ? (
        <StatementCard label="Iteration">
          {paragraphsOf(decision.iteration).map((part) => (
            <p key={part.slice(0, 24)}>
              <Inline text={part} />
            </p>
          ))}
        </StatementCard>
      ) : null}
    </article>
  );
}

export function SystemCaseMap({ caseStudy }: { caseStudy: CaseStudy }) {
  const sections = caseStudy.sections;
  const flow = sections.contextFlow;
  const hasOverview = Boolean(
    sections.context ||
    sections.contextSections?.length ||
    flow?.paragraphs?.length ||
    flow?.images?.length ||
    sections.contextEcosystem ||
    sections.journalImpact?.blocks?.length ||
    sections.goal ||
    sections.hypothesis,
  );
  const hasProblem = Boolean(
    sections.problem.length ||
    sections.understanding ||
    sections.constraints.length ||
    sections.problemProcessVisual,
  );
  const hasDecisions = sections.decisions.length > 0;
  const hasReflection = Boolean(
    sections.reflection?.trim() ||
    sections.reflectionBullets?.length ||
    sections.reflectionClosing?.trim() ||
    sections.outcome?.trim(),
  );

  return (
    <>
      {hasOverview ? (
        <StorySection id="context" number="01" title="Overview">
          {sections.journalImpact?.blocks?.length ? (
            <ImpactStatPanel blocks={sections.journalImpact.blocks} />
          ) : null}
          {flow?.paragraphs?.length ? (
            <Prose text={flow.paragraphs.join("\n\n")} madder />
          ) : null}
          {flow?.aim?.trim() ? (
            <StatementCard>
              <p>
                <Inline text={flow.aim} madder />
              </p>
            </StatementCard>
          ) : null}
          {flow?.images?.length ? <MediaGroup images={flow.images} /> : null}
          {sections.contextSections?.map((section) => (
            <Fragment key={section.title}>
              <Subhead>{section.title}</Subhead>
              <Prose text={section.body} />
            </Fragment>
          ))}
          {sections.context?.trim() ? <Prose text={sections.context} /> : null}
          {sections.contextEcosystem ? (
            <Ecosystem data={sections.contextEcosystem} />
          ) : null}
          {sections.goal?.trim() ? (
            <StatementCard label="Goal">
              <p>
                <Inline text={sections.goal} />
              </p>
            </StatementCard>
          ) : null}
          {sections.hypothesis ? (
            <StatementCard label="Hypothesis">
              <p>
                <Inline text={sections.hypothesis.quote} />
              </p>
            </StatementCard>
          ) : null}
          {sections.hypothesis?.signals.length ? (
            <>
              <Subhead>Success signals</Subhead>
              <BulletList items={sections.hypothesis.signals} />
            </>
          ) : null}
        </StorySection>
      ) : null}

      {hasProblem ? (
        <StorySection id="problem" number="02" title="Problem">
          {sections.problem.map((item, index) => (
            <Fragment key={`${item.title ?? "problem"}-${index}`}>
              {item.title ? <Subhead>{item.title}</Subhead> : null}
              <Prose text={item.content} />
              {item.statBar?.length ? (
                <ImpactStatPanel
                  blocks={item.statBar.map((stat) => ({
                    value: `${stat.value}${stat.valueSup ?? ""}`,
                    labelItalic: "",
                    metaDetail: stat.label,
                    metaDetailPlain: true,
                  }))}
                />
              ) : null}
            </Fragment>
          ))}
          {sections.problemProcessVisual ? (
            <MediaGroup images={[sections.problemProcessVisual]} />
          ) : null}
          {sections.understanding ? (
            <UnderstandingBody understanding={sections.understanding} />
          ) : null}
          {sections.constraints.map((item, index) => (
            <Fragment key={`${item.title ?? "constraints"}-${index}`}>
              {item.title ? <Subhead>{item.title}</Subhead> : null}
              {item.intro ? <Prose text={item.intro} /> : null}
              {item.numberedItems?.length ? (
                <BulletList items={item.numberedItems} />
              ) : null}
              {item.content.trim() ? <Prose text={item.content} /> : null}
              {item.expandedContent?.trim() ? (
                <Prose text={item.expandedContent} />
              ) : null}
            </Fragment>
          ))}
        </StorySection>
      ) : null}

      {hasDecisions ? (
        <StorySection id="decisions" number="03" title="Key Decisions">
          {sections.decisions.map((decision, index) => (
            <DecisionArticle
              key={`${decision.title}-${index}`}
              decision={decision}
              index={index}
            />
          ))}
        </StorySection>
      ) : null}

      {hasReflection ? (
        <StorySection id="outcome" number="04" title="Reflection">
          {sections.outcome?.trim() ? <Prose text={sections.outcome} /> : null}
          {[sections.reflection, sections.reflectionClosing]
            .filter((part) => part?.trim())
            .join("\n\n") ? (
            <Prose
              text={[sections.reflection, sections.reflectionClosing]
                .filter((part) => part?.trim())
                .join("\n\n")}
            />
          ) : null}
          {sections.reflectionBullets?.length ? (
            <BulletList items={sections.reflectionBullets} />
          ) : null}
        </StorySection>
      ) : null}
    </>
  );
}
