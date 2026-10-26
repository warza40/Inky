import { parseBoldSpans } from "@/lib/case-rich-text";

export type GlanceRow = {
  label: string;
  value: string;
};

/**
 * Paper Deep definition list. The notes row uses the caller's label.
 * Omantel's notes have no label in the case data, so that call site
 * passes the placeholder "Constraints" for the copywriter to confirm.
 */
export function GlancePanel({
  rows,
  notes,
  notesLabel,
  className,
}: {
  rows: readonly GlanceRow[];
  notes?: readonly string[];
  notesLabel?: string;
  className?: string;
}) {
  const facts = rows.filter((row) => row.label.trim() && row.value.trim());
  const noteItems = (notes ?? []).map((item) => item.trim()).filter(Boolean);
  if (!facts.length && !noteItems.length) return null;

  const classes = ["om-glance", className].filter(Boolean).join(" ");

  return (
    <dl className={classes}>
      {facts.map((row) => (
        <div key={row.label} className="om-glance-row">
          <dt>{row.label}</dt>
          <dd>{row.value}</dd>
        </div>
      ))}
      {noteItems.length ? (
        <div className="om-glance-row">
          <dt>{notesLabel?.trim() || "Constraints"}</dt>
          <dd>
            <ul className="om-glance-notes">
              {noteItems.map((item) => (
                <li key={item}>{parseBoldSpans(item)}</li>
              ))}
            </ul>
          </dd>
        </div>
      ) : null}
    </dl>
  );
}
