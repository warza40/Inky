"use client";

import Link from "next/link";
import { PixelGrid } from "@/components/home/PixelGrid";

export default function ExperimentsPage() {
  return (
    <main className="min-h-screen bg-white flex flex-row">
      <div className="relative w-1/2 min-w-0 shrink-0 h-screen bg-[#f6f5f2] overflow-hidden">
        <PixelGrid />
      </div>
      <div className="w-1/2 min-w-0 shrink-0 p-20 flex flex-col justify-center">
        <Link
          href="/"
          className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors mb-8"
        >
          ← Back to home
        </Link>
        <h1 className="text-3xl font-medium text-neutral-900">Experiments</h1>
        <p className="text-neutral-600 mt-2">
          Interactive and visual experiments.
        </p>
      </div>
    </main>
  );
}
