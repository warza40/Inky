import { FloatingNav } from "@/components/layout/FloatingNav";
import { MinimalHero } from "@/components/home/MinimalHero";
import { CaseStudyGrid } from "@/components/home/CaseStudyGrid";
import { MinimalWritingSection } from "@/components/home/MinimalWritingSection";
import { MinimalContactSection } from "@/components/home/MinimalContactSection";

export function MinimalHomepage() {
  return (
    <div className="minimal-home">
      <FloatingNav />
      <main id="main-content">
        <MinimalHero />
        <CaseStudyGrid />
        <MinimalWritingSection />
        <MinimalContactSection />
      </main>
    </div>
  );
}
