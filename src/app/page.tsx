import { BentoGrid } from "@/components/bento/BentoGrid";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen px-8 md:px-16 lg:px-24 py-14">
      <Hero />
      <BentoGrid />
    </main>
  );
}
