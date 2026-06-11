"use client";

import type { CaseStudy } from "@/case-studies/omantel";
import { OmantelJournalImageCarousel } from "@/components/case/journal/OmantelJournalImageCarousel";
import { cn } from "@/lib/utils";

type Decision = CaseStudy["sections"]["decisions"][0];

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

function RationaleReportBoxes({
  reports,
}: {
  reports: NonNullable<Decision["rationaleReports"]>;
}) {
  return (
    <div className="cs-decision-rationale-reports">
      <div className="cs-report-grid cs-report-grid--in-rationale">
        {reports.map((item, i) => (
          <div key={item.title} className="cs-report-card">
            <div className="cs-report-num" aria-hidden>
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="cs-report-body">
              <div className="cs-report-title">{item.title}</div>
              <p className="cs-report-desc">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface OmantelDecisionJournalProps {
  decision: Decision;
  index: number;
}

export function OmantelDecisionJournal({
  decision,
  index,
}: OmantelDecisionJournalProps) {
  const imgs = decision.images ?? [];

  const hasRi =
    Boolean(decision.rationale?.trim()) ||
    Boolean(decision.rationaleReports?.length) ||
    Boolean(decision.impact?.trim()) ||
    Boolean(decision.designResponse?.trim());

  return (
    <article className="ojo-decision-block">
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

        {decision.navExploration && decision.navExploration.length > 0 ? (
          <div className="cs-decision-nav-wrap cs-visual-wrap--editorial">
            <div className="cs-decision-nav-exploration">
              {decision.navExploration.map((n, i) => (
                <div key={i} className="cs-nav-exp-item">
                  <div className="cs-nei-label">{n.label}</div>
                  <div
                    className={cn(
                      "cs-nei-sketch",
                      n.variant === "mega" && "cs-nei-sketch--mega",
                      n.variant === "ribbon" && "cs-nei-sketch--ribbon",
                      n.variant === "panel" && "cs-nei-sketch--panel",
                    )}
                    aria-hidden
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="ojo-decision-fade-bottom" aria-hidden />
      </div>

      <div className="ojo-decision-content">
        <div className="ojo-paper ojo-paper-shadow ojo-decision-inner">
          <div className="ojo-decision-head">
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
          </div>
          {hasRi ? (
            <>
              <div className="ojo-d-rule" aria-hidden />
              <div className="ojo-decision-ri">
                {(decision.rationale?.trim() ||
                  decision.rationaleReports?.length ||
                  decision.impact?.trim()) && (
                  <div className="cs-decision-ri-panel">
                    <div className="cs-ri-grid cs-ri-grid--editorial-pair">
                      <div className="cs-ri-col">
                        <div className="cs-ri-label">Rationale</div>
                        {decision.rationaleReports?.length ? (
                          <>
                            {decision.rationale?.trim() ? (
                              <p className="cs-ri-rationale-lead">
                                {decision.rationale}
                              </p>
                            ) : null}
                            <RationaleReportBoxes
                              reports={decision.rationaleReports}
                            />
                          </>
                        ) : (
                          <RiPoints text={decision.rationale} />
                        )}
                      </div>
                      <div className="cs-ri-col">
                        <div className="cs-ri-label">Impact</div>
                        <RiPoints text={decision.impact} />
                      </div>
                    </div>
                  </div>
                )}
                {decision.designResponse?.trim() ? (
                  <div className="cs-decision-ri-panel">
                    <div className="cs-ri-grid cs-ri-grid--solutioning">
                      <div
                        className="cs-ri-col"
                        style={{ gridColumn: "1 / -1" }}
                      >
                        <div className="cs-ri-label">Solutioning</div>
                        <RiPoints text={decision.designResponse} />
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </article>
  );
}
