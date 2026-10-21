"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import type { CaseStudy } from "@/case-studies/omantel";
import { CaseImpactPostIts } from "@/components/case/CaseImpactPostIts";
import type { CaseJournalImpactBlock } from "@/components/case/CaseImpactPostIts";
import { CasePainPointGroups } from "@/components/case/CasePainPointGroups";
import { CaseUnderstandingFlowSection } from "@/components/case/CaseUnderstandingFlowSection";
import { MotionSection } from "@/components/case/MotionSection";
import { parseBoldSpans } from "@/lib/case-rich-text";
import { OmantelDecisionJournal } from "./OmantelDecisionJournal";
import { OmantelJournalOutcome } from "./OmantelJournalOutcome";
import { OmantelJournalProblem } from "./OmantelJournalProblem";

/** Shown beside the prototype slot. The URL itself lives on the case study. */
const PROTOTYPE_NDA_LINE =
  "Details shared under NDA — prototype walkthrough available.";

interface OmantelCaseStoryProps {
  caseStudy: CaseStudy;
}

function Paper({ children }: { children: ReactNode }) {
  return (
    <div className="ojo-overview-insert ojo-paper ojo-paper-shadow">
      <div className="ojo-punch-holes ojo-punch-holes--dual" aria-hidden>
        <span className="ojo-punch-hole" />
        <span className="ojo-punch-hole" />
      </div>
      {children}
    </div>
  );
}

function SkimList({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <ul className="ojo-skim-list">
      {items.map((item) => (
        <li key={item}>{parseBoldSpans(item)}</li>
      ))}
    </ul>
  );
}

function RichParagraphs({ text }: { text: string }) {
  const parts = text
    .split(/\n\n/)
    .map((part) => part.trim())
    .filter(Boolean);
  if (!parts.length) return null;
  return (
    <div className="cs-context-text cs-context-text--flow">
      {parts.map((part) => (
        <p key={part} className="cs-context-flow-p">
          {parseBoldSpans(part)}
        </p>
      ))}
    </div>
  );
}

function ImpactRail({
  blocks,
  showEyebrow = true,
}: {
  blocks: CaseJournalImpactBlock[];
  showEyebrow?: boolean;
}) {
  if (!blocks.length) return null;
  return (
    <div className="ojo-overview-impact-rail">
      {showEyebrow ? (
        <h3 className="cs-impact-postits-eyebrow">Impact</h3>
      ) : null}
      <CaseImpactPostIts
        blocks={blocks}
        className="ojo-impact-postits--on-leather"
      />
    </div>
  );
}

function PrototypeSlot({ href }: { href: string }) {
  const trimmed = href.trim();
  return (
    <p className="ojo-tldr-prototype" data-prototype-slot="omantel">
      {trimmed ? (
        <a href={trimmed} className="ojo-tldr-prototype-link">
          {PROTOTYPE_NDA_LINE}
        </a>
      ) : (
        PROTOTYPE_NDA_LINE
      )}
    </p>
  );
}

export function OmantelCaseStory({ caseStudy }: OmantelCaseStoryProps) {
  const s = caseStudy.sections;
  const impact = s.journalImpact?.blocks ?? [];
  const understanding = s.understanding;
  const hypothesis = s.hypothesis;
  const collaboration = s.collaboration;
  const learnings = s.learnings;
  const conceptualImages = (understanding?.images ?? []).filter(
    (image): image is { src: string; alt?: string; caption?: string } =>
      Boolean(image.src),
  );

  return (
    <div className="ojo-case-map">
      <MotionSection
        id="tldr"
        title="A clean batch, with no staff in the loop."
        number="01"
      >
        <div className="ojo-overview-section">
          {caseStudy.tldr?.length ? (
            <Paper>
              <div className="ojo-p-label">At a glance</div>
              <dl className="ojo-tldr-list">
                {caseStudy.tldr.map((row) => (
                  <div key={row.label} className="ojo-tldr-row">
                    <dt className="ojo-tldr-label">{row.label}</dt>
                    <dd className="ojo-tldr-value">{row.value}</dd>
                  </div>
                ))}
              </dl>
              <SkimList items={caseStudy.tldrNotes ?? []} />
              <PrototypeSlot href={caseStudy.prototypeHref ?? ""} />
            </Paper>
          ) : null}
          <ImpactRail blocks={impact} />
        </div>
      </MotionSection>

      <MotionSection id="context" title="Staff out of the loop." number="02">
        <div className="ojo-overview-section">
          <Paper>
            {s.goal ? (
              <blockquote className="ojo-pull-quote">
                <p>{parseBoldSpans(s.goal)}</p>
              </blockquote>
            ) : null}
            {s.contextFlow?.paragraphs?.length ? (
              <div className="cs-context-text cs-context-text--flow">
                {s.contextFlow.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="cs-context-flow-p">
                    {parseBoldSpans(paragraph)}
                  </p>
                ))}
              </div>
            ) : null}
          </Paper>
        </div>
      </MotionSection>

      <MotionSection
        id="problem"
        title="One bad row restarted the batch."
        number="03"
      >
        {s.outcomeBeforeAfter ? (
          <OmantelJournalProblem
            beforeAfter={s.outcomeBeforeAfter}
            eyebrow={null}
          />
        ) : null}
        {understanding?.painPointGroups?.length ? (
          <div className="ojo-problem-section">
            <div className="ojo-problem-insert ojo-paper ojo-paper-shadow">
              <div
                className="ojo-punch-holes ojo-punch-holes--dual"
                aria-hidden
              >
                <span className="ojo-punch-hole" />
                <span className="ojo-punch-hole" />
              </div>
              <h3 className="ojo-p-label">Two sets of pain</h3>
              <CasePainPointGroups groups={understanding.painPointGroups} />
            </div>
          </div>
        ) : null}
      </MotionSection>

      <MotionSection
        id="ambiguity"
        title="I learned it from the people doing the work."
        number="04"
      >
        <div className="ojo-overview-section">
          <Paper>
            <RichParagraphs text={understanding?.content ?? ""} />
            {conceptualImages.length > 0 ? (
              <div className="ojo-context-visuals">
                {conceptualImages.map((image) => (
                  <figure key={image.src} className="ojo-context-visual">
                    <Image
                      src={image.src}
                      alt={image.alt ?? ""}
                      width={1200}
                      height={675}
                      sizes="(max-width: 768px) 100vw, min(980px, 92vw)"
                      className="ojo-context-visual-img"
                    />
                    {image.caption ? (
                      <figcaption className="ojo-context-caption">
                        {image.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                ))}
              </div>
            ) : null}
          </Paper>
        </div>
        {understanding?.afterDivider?.images?.length ? (
          <CaseUnderstandingFlowSection
            afterDivider={understanding.afterDivider}
          />
        ) : null}
      </MotionSection>

      {hypothesis ? (
        <MotionSection
          id="hypothesis"
          title="Catch the error at entry, and the batch doesn't restart."
          number="05"
        >
          <div className="ojo-overview-section">
            <Paper>
              <blockquote className="ojo-pull-quote">
                <p>
                  <span className="ojo-beat-label">My hypothesis: </span>
                  {parseBoldSpans(hypothesis.quote)}
                </p>
              </blockquote>
              {hypothesis.signals.length > 0 ? (
                <div className="ojo-beat-block">
                  <div className="ojo-beat-label">How we’d know it worked</div>
                  <SkimList items={hypothesis.signals} />
                </div>
              ) : null}
            </Paper>
          </div>
        </MotionSection>
      ) : null}

      {s.decisions.length > 0 ? (
        <MotionSection
          id="decisions"
          title="Five calls that let reps submit without staff."
          number="06"
          className="ojo-decisions-wrap"
        >
          {s.decisions.map((decision, index) => (
            <div
              key={decision.title}
              className={index > 0 ? "ojo-decision-follow" : undefined}
            >
              <OmantelDecisionJournal decision={decision} index={index} />
            </div>
          ))}
        </MotionSection>
      ) : null}

      <MotionSection
        id="outcome"
        title="48–72 hours became immediate."
        number="07"
      >
        <div className="ojo-overview-section">
          <ImpactRail blocks={impact} showEyebrow={false} />
        </div>
        <OmantelJournalOutcome images={s.outcomeImages} />
      </MotionSection>

      {collaboration ? (
        <MotionSection
          id="collaboration"
          title="He thought experts didn't need templates."
          number="08"
        >
          <div className="ojo-overview-section">
            <Paper>
              {collaboration.intro ? (
                <p className="cs-context-flow-p ojo-collab-intro">
                  {collaboration.intro}
                </p>
              ) : null}
              <blockquote className="ojo-pull-quote">
                {collaboration.quote
                  .split(/\n\n/)
                  .map((part) => part.trim())
                  .filter(Boolean)
                  .map((part) => (
                    <p key={part}>{parseBoldSpans(part)}</p>
                  ))}
              </blockquote>
              <SkimList items={collaboration.bullets} />
            </Paper>
          </div>
        </MotionSection>
      ) : null}

      {learnings ? (
        <MotionSection
          id="learnings"
          title="Experts make mistakes too."
          number="09"
        >
          <div className="ojo-overview-section">
            <Paper>
              <SkimList items={learnings.learned} />
              <div className="ojo-beat-block">
                <div className="ojo-beat-label">With more time I’d…</div>
                <SkimList items={learnings.moreTime} />
              </div>
              <div className="ojo-beat-block">
                <div className="ojo-beat-label">With less time I’d…</div>
                <SkimList items={learnings.lessTime} />
              </div>
            </Paper>
          </div>
        </MotionSection>
      ) : null}
    </div>
  );
}
