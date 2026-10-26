import {
  ComparisonCard,
  ComparisonPanel,
} from "@/components/case/ComparisonPanel";

type PainPointGroup = {
  title: string;
  items: string[];
};

/** Paired pain-point groups. Titles come from the case data. */
export function CasePainPointGroups({ groups }: { groups: PainPointGroup[] }) {
  if (!groups.length) return null;

  return (
    <ComparisonPanel>
      {groups.map((group) => (
        <ComparisonCard key={group.title} title={group.title}>
          <ul className="om-list">
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </ComparisonCard>
      ))}
    </ComparisonPanel>
  );
}
