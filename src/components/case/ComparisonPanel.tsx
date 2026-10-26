import type { ReactNode } from "react";

export function ComparisonPanel({
  label,
  follow = false,
  children,
}: {
  label?: string;
  follow?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      className={
        follow
          ? "om-compare-panel om-full om-compare-panel--follow"
          : "om-compare-panel om-full"
      }
    >
      {label ? <h3 className="om-eyebrow">{label}</h3> : null}
      <div className="om-compare">{children}</div>
    </section>
  );
}

export function ComparisonCard({
  label,
  title,
  emphasis = false,
  children,
}: {
  label?: string;
  title?: string;
  emphasis?: boolean;
  children: ReactNode;
}) {
  return (
    <article className="om-compare-card">
      {label ? (
        <p
          className={emphasis ? "om-eyebrow om-label--emphasis" : "om-eyebrow"}
        >
          {label}
        </p>
      ) : null}
      {title ? <h3 className="om-pain-title">{title}</h3> : null}
      {children}
    </article>
  );
}
