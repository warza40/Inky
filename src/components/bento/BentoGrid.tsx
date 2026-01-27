import Link from "next/link";
import { TicketCard } from "./TicketCard";
import { HeaderCard } from "./HeaderCard";
import { AnimatedBlinkybot } from "./AnimatedBlinkybot";

export function BentoGrid() {
  return (
    <section className="max-w-7xl mx-auto px-8">
      {/* Animated Blinkybot scanning across the page */}
      <AnimatedBlinkybot />

      <div className="bento-grid">
        {/* Row 1-2: Column 1 - Combined Header/Bio card (tall, spans 2 rows) */}
        <div className="bento-card card-tall">
          <HeaderCard />
        </div>

        {/* Row 1: Column 2 - Workflow Automation split into two cards */}
        <div className="bento-card card-2 flex flex-col gap-3">
          {/* Workflow Automation card 1 (Tag/Title) */}
          <div className="flex flex-col p-4 rounded-xl bg-white shadow-sm border border-neutral-200/50">
            <span className="inline-block text-xs font-medium text-neutral-500 uppercase tracking-wide mb-2">
              ENTERPRISE
            </span>
            <h3 className="text-base font-bold text-neutral-900 leading-tight">
              Workflow Automation
            </h3>
            <Link
              href="/work/workflow"
              className="mt-2 text-sm font-medium text-neutral-900 hover:text-neutral-700 transition-colors"
            >
              View project →
            </Link>
          </div>

          {/* Workflow Automation card 2 (Subtitle/Image) */}
          <div className="flex flex-col p-4 rounded-xl bg-white shadow-sm border border-neutral-200/50 flex-1">
            <p className="text-sm text-neutral-600 leading-relaxed mb-3">
              Reducing operational friction
            </p>
            <div className="flex-1 relative overflow-hidden rounded-lg bg-neutral-100 min-h-[100px]">
              <img
                src="/images/workflow.jpg"
                alt="Workflow Automation"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Row 1: Column 3 - Omantel Case Study card */}
        <div className="bento-card card-3">
          <TicketCard
            title="Reducing Operational Dependency Through Self-Serve Bulk Activations"
            subtitle="A system-level redesign inside a Telecom giant's enterprise portal"
            tag="B2B, UI/UX"
            image="/om-bento.png"
            href="/case/omantel-bulk-activation"
          />
        </div>

        {/* Row 2: Column 2 - Design System card */}
        <div className="bento-card card-4">
          <TicketCard
            title="Design System 2.0"
            subtitle="Governance and scale"
            tag="DESIGN SYSTEMS"
            image="/images/design-system.jpg"
            href="/work/design-system"
          />
        </div>

        {/* Row 2: Column 3 - AI Experiments card */}
        <div className="bento-card card-5">
          <TicketCard
            title="AI Interface Experiments"
            subtitle="Trust, explainability, and human-AI interaction"
            tag="AI / RESEARCH"
            image="/images/ai.jpg"
            href="/experiments/ai"
          />
        </div>

        {/* Row 3: Column 1-2 - Combined Project Overview + Stack card */}
        <div className="bento-card card-6">
          <div className="h-full flex flex-col p-6 rounded-2xl bg-white shadow-sm border border-neutral-200/50">
            {/* Project Overview section */}
            <div className="mb-6">
              <span className="inline-block text-xs font-medium text-neutral-500 uppercase tracking-wide mb-3">
                UX DESIGN
              </span>
              <h3 className="text-lg font-bold text-neutral-900 leading-tight mb-2">
                Project Overview
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                Design new experiences for landing pages
              </p>
              <Link
                href="/work"
                className="text-sm font-medium text-neutral-900 hover:text-neutral-700 transition-colors"
              >
                View project →
              </Link>
            </div>

            {/* Reach out to me section */}
            <div className="mt-auto pt-6 border-t border-neutral-200/50">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">Reach out to me</h3>
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                  <span className="text-xs">📄</span>
                </div>
                <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                  <span className="text-xs">⚡</span>
                </div>
                <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                  <span className="text-xs">🎨</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Column 3 - Contact card */}
        <div className="bento-card card-8">
          <TicketCard
            title="Enterprise Data Platform"
            subtitle="Designing scalable analytics systems across orgs"
            tag="B2B SAAS"
            image="/images/enterprise.jpg"
            href="/work/enterprise"
          />
        </div>
      </div>
    </section>
  );
}
