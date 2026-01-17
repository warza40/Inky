import { BentoGrid } from "@/components/bento/BentoGrid";
import { TypewriterName } from "@/components/TypewriterName";

export default function Home() {
  return (
    <section className="max-w-6xl px-8 pt-24">
      <TypewriterName />

      <p className="mt-4 max-w-xl text-[16px] leading-[1.6] text-neutral-600">
        Senior UX Designer with 6+ years of experience designing complex
        product systems across UX, behavioural design, and emerging AI workflows.
      </p>

      <BentoGrid />
    </section>
  );
}
