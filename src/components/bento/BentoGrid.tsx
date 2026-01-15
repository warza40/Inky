import { TicketCard } from "./TicketCard";

export function BentoGrid() {
  return (
    <section className="mt-12 max-w-6xl">
      <div
        className="
          grid
          grid-cols-6
          grid-rows-[260px_220px_220px]
          gap-4
        "
      >
        {/* HERO */}
        <div className="col-start-1 col-span-4 row-start-1">
          <TicketCard
            title="Enterprise Data Platform"
            subtitle="Designing scalable analytics systems across orgs"
            tag="B2B SaaS"
            image="/images/enterprise.jpg"
            href="/work/enterprise"
          />
        </div>

        {/* TALL */}
        <div className="col-start-5 col-span-2 row-start-1">
          <TicketCard
            title="AI Interface Experiments"
            subtitle="Trust, explainability, and human-AI interaction"
            tag="AI / Research"
            image="/images/ai.jpg"
            href="/experiments/ai"
          />
        </div>

        {/* SMALL 1 */}
        <div className="col-start-1 col-span-2 row-start-2 h-full">
          <TicketCard
            title="Design System 2.0"
            subtitle="Governance and scale"
            tag="Design Systems"
            image="/images/design-system.jpg"
            href="/work/design-system"
          />
        </div>

        {/* SMALL 2 */}
        <div className="col-start-3 col-span-2 row-start-2 h-full">
          <TicketCard
            title="Workflow Automation"
            subtitle="Reducing operational friction"
            tag="Enterprise"
            image="/images/workflow.jpg"
            href="/work/workflow"
          />
        </div>

        {/* SMALL 3 */}
        <div className="col-start-5 col-span-2 row-start-2 h-full">
          <TicketCard
            title="Writing & Essays"
            tag="Blog"
            image="/images/writing.jpg"
            href="/blog"
          />
        </div>
      </div>
    </section>
  );
}
