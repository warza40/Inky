import { cn } from "@/lib/utils";

type PainPointGroup = {
  title: string;
  items: string[];
};

const CARD_VARIANTS = ["moss", "warm"] as const;

/** Two-column post-it pain point summary (titles only). */
export function CasePainPointGroups({ groups }: { groups: PainPointGroup[] }) {
  if (!groups.length) return null;

  return (
    <div className="cs-pain-points-grid" role="list">
      {groups.map((group, i) => {
        const variant = CARD_VARIANTS[i % CARD_VARIANTS.length];
        return (
          <article
            key={group.title}
            className={cn(
              "cs-pain-points-card",
              `cs-pain-points-card--${variant}`,
              `cs-pain-points-card--tilt-${(i % 2) + 1}`,
            )}
            role="listitem"
          >
            <h4 className="cs-pain-points-title">{group.title}</h4>
            <ul className="cs-pain-points-list">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        );
      })}
    </div>
  );
}
