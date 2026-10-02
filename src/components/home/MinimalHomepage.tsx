import { FloatingNav } from "@/components/layout/FloatingNav";
import { MinimalHero } from "@/components/home/MinimalHero";
import { MinimalAboutSection } from "@/components/home/MinimalAboutSection";
import { MinimalWritingSection } from "@/components/home/MinimalWritingSection";
import { MinimalContactSection } from "@/components/home/MinimalContactSection";

export function MinimalHomepage() {
  return (
    <div className="minimal-home">
      <FloatingNav />
      <main id="main-content">
        <MinimalHero />
        <MinimalAboutSection />
        <MinimalWritingSection />
        <MinimalContactSection />
      </main>
    </div>
  );
}
