import { parseMadderSpans } from "@/lib/case-rich-text";

export function CaseContextFlow({
  paragraphs,
  aim,
  delayStyle,
}: {
  paragraphs: string[];
  aim?: string;
  delayStyle?: React.CSSProperties;
}) {
  return (
    <div
      className="cs-context-text cs-context-text--flow fade-in"
      style={delayStyle ?? { ["--delay" as string]: "120ms" }}
    >
      {paragraphs.map((p, i) => (
        <p key={i} className="cs-context-flow-p">
          {parseMadderSpans(p)}
        </p>
      ))}
      {aim ? <p className="cs-context-aim">{parseMadderSpans(aim)}</p> : null}
    </div>
  );
}
