"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CaseStudy } from "@/case-studies/omantel";
import { OmantelJournalImageCarousel } from "@/components/case/journal/OmantelJournalImageCarousel";

function splitRiText(text: string) {
  return text
    .split(/\n\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function RiPoints({ text }: { text: string | undefined }) {
  const parts = splitRiText(text ?? "");
  if (parts.length === 0) return null;
  return (
    <ul className="cs-ri-list" role="list">
      {parts.map((part, i) => (
        <li key={i} className="cs-ri-item">
          <span className="cs-ri-item-text">{part}</span>
        </li>
      ))}
    </ul>
  );
}

type Decision = CaseStudy["sections"]["decisions"][0];

interface OmantelDecisionJournalProps {
  decision: Decision;
  index: number;
}

export function OmantelDecisionJournal({
  decision,
  index,
}: OmantelDecisionJournalProps) {
  const imgs = decision.images ?? [];
  const reduceMotion = useReducedMotion();

  const hasRi =
    Boolean(decision.rationale?.trim()) ||
    Boolean(decision.impact?.trim()) ||
    Boolean(decision.designResponse?.trim());

  return (
    <motion.article
      className="ojo-decision-block"
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.42, ease: [0, 0, 0.2, 1] }}
    >
      <div className="ojo-decision-stage">
        <div className="ojo-decision-bg ojo-decision-bg--solid" aria-hidden />

        <div className="ojo-decision-badge" aria-hidden>
          {String(index + 1).padStart(2, "0")}
        </div>
        <div className="ojo-decision-fade-top" aria-hidden />

        {decision.imagePlaceholderSplit?.length === 2 ? (
          <div className="ojo-decision-placeholder-wrap cs-decision-placeholder cs-decision-placeholder--split cs-visual-wrap--editorial">
            <div className="cs-decision-placeholder-panel">
              <div className="cs-decision-placeholder-note">
                {decision.imagePlaceholderSplit[0]}
              </div>
            </div>
            <div className="cs-decision-placeholder-panel">
              <div className="cs-decision-placeholder-note">
                {decision.imagePlaceholderSplit[1]}
              </div>
            </div>
          </div>
        ) : null}
        {decision.imagePlaceholder && !decision.imagePlaceholderSplit ? (
          <div className="ojo-decision-placeholder-wrap cs-decision-placeholder cs-visual-wrap--editorial">
            <div className="cs-decision-placeholder-note">
              {decision.imagePlaceholder}
            </div>
          </div>
        ) : null}

        {imgs.length > 0 ? <OmantelJournalImageCarousel images={imgs} /> : null}

        <div className="ojo-decision-fade-bottom" aria-hidden />
      </div>

      <div className="ojo-decision-content">
        <div className="ojo-paper ojo-paper-shadow ojo-decision-inner">
          <div className="ojo-decision-left">
            <div className="ojo-decision-num-bg" aria-hidden>
              {String(index + 1).padStart(2, "0")}
            </div>
            <span className="ojo-d-num-text">Key decision</span>
            <h3 className="ojo-d-title cs-decision-title">{decision.title}</h3>
            {decision.description ? (
              <p className="ojo-d-lede cs-decision-body cs-decision-lede">
                {decision.description}
              </p>
            ) : null}
            <div className="ojo-d-rule" />
          </div>
          {hasRi ? (
            <div className="ojo-decision-right">
              {(decision.rationale?.trim() || decision.impact?.trim()) && (
                <>
                  <div className="ojo-d-impact-block">
                    <div className="ojo-d-impact-label">Rationale</div>
                    <RiPoints text={decision.rationale} />
                  </div>
                  <div className="ojo-d-impact-block">
                    <div className="ojo-d-impact-label">Impact</div>
                    <RiPoints text={decision.impact} />
                  </div>
                </>
              )}
              {decision.designResponse?.trim() ? (
                <div className="ojo-d-impact-block">
                  <div className="ojo-d-impact-label">Solutioning</div>
                  <RiPoints text={decision.designResponse} />
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
