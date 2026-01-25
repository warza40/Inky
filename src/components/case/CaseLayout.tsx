import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CaseMain } from "./CaseMain";
import { CaseNavigation } from "./CaseNavigation";
import type { CaseStudy } from "@/case-studies/omantel";

interface CaseLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  caseStudy?: CaseStudy;
}

export function CaseLayout({ children, title, subtitle, caseStudy }: CaseLayoutProps) {
  // Build navigation sections based on available content
  const sections = [];
  if (caseStudy?.sections.context) {
    sections.push({ id: "context", label: "Context" });
  }
  if (caseStudy?.sections.problem.length) {
    sections.push({ id: "problem", label: "Problem" });
  }
  if (caseStudy?.sections.constraints.length) {
    sections.push({ id: "constraints", label: "Constraints" });
  }
  if (caseStudy?.sections.decisions.length) {
    sections.push({ id: "decisions", label: "Decisions" });
  }
  if (caseStudy?.images && caseStudy.images.length > 0) {
    sections.push({ id: "visuals", label: "Visuals" });
  }

  return (
    <CaseMain>
      <article className="min-h-screen pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex gap-12">
            {/* Navigation Sidebar */}
            {sections.length > 0 && (
              <aside className="hidden lg:block w-48 flex-shrink-0 sticky top-24 h-fit">
                <CaseNavigation sections={sections} />
              </aside>
            )}

            {/* Main Content */}
            <div className="flex-1 max-w-4xl">
              {/* Back button */}
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to home</span>
              </Link>

              {/* Header */}
              <header className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-xl text-neutral-600 leading-relaxed">
                    {subtitle}
                  </p>
                )}
              </header>

              {/* Content */}
              <div className="prose prose-neutral max-w-none">
                {children}
              </div>
            </div>
          </div>
        </div>
      </article>
    </CaseMain>
  );
}
