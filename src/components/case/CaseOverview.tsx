import type { CaseStudy } from "@/case-studies/omantel";

interface CaseOverviewProps {
  caseStudy: CaseStudy;
}

export function CaseOverview({ caseStudy }: CaseOverviewProps) {
  const { overview } = caseStudy;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 p-4 rounded-xl bg-neutral-50 border border-neutral-200/50">
      <div>
        <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-3">
          Overview
        </h3>
        <dl className="space-y-2">
          <div>
            <dt className="text-xs font-medium text-neutral-500 mb-0.5">Role</dt>
            <dd className="text-sm text-neutral-900">{overview.role}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-neutral-500 mb-0.5">Context</dt>
            <dd className="text-sm text-neutral-900">{overview.context}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-neutral-500 mb-0.5">Company</dt>
            <dd className="text-sm text-neutral-900">{overview.company}</dd>
          </div>
        </dl>
      </div>
      <div>
        <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-3">
          Focus
        </h3>
        <dl className="space-y-2">
          <div>
            <dt className="text-xs font-medium text-neutral-500 mb-0.5">Problem</dt>
            <dd className="text-sm text-neutral-900">{overview.problem}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-neutral-500 mb-0.5">Focus</dt>
            <dd className="text-sm text-neutral-900">{overview.focus}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
