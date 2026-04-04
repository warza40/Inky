import type { Metadata } from "next";
import { InkyLilyStudio } from "@/components/inky-lily/InkyLilyStudio";

export const metadata: Metadata = {
  title: "Warmth DS — Inky Lily's Studio",
  description: "Inky Lily studio — ink walkers easter egg",
};

export default function InkyLilyPage() {
  return <InkyLilyStudio />;
}
