import { Fragment } from "react";

/** Renders [madder]…[/madder] as warm accent spans */
export function parseMadderSpans(text: string): React.ReactNode {
  const parts = text.split(/(\[madder\][\s\S]*?\[\/madder\])/g);
  return parts.map((part, i) => {
    const m = part.match(/^\[madder\]([\s\S]*?)\[\/madder\]$/);
    if (m) {
      return (
        <span key={i} className="cs-context-hl">
          {m[1]}
        </span>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

/** Renders **bold** as <strong> */
export function parseBoldSpans(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    const m = part.match(/^\*\*([^*]+)\*\*$/);
    if (m) return <strong key={i}>{m[1]}</strong>;
    return <Fragment key={i}>{part}</Fragment>;
  });
}
