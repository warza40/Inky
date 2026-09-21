export type ExpandingCursorPrompt = {
  title: string;
  hint: string;
};

export function expandingCursorAttrs(prompt: ExpandingCursorPrompt) {
  return {
    "data-expanding-cursor": true,
    "data-cursor-title": prompt.title,
    "data-cursor-hint": prompt.hint,
  } as const;
}
