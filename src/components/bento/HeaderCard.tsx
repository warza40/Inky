"use client";

import Link from "next/link";
import { TypewriterName } from "@/components/TypewriterName";
import { motion } from "framer-motion";

export function HeaderCard() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="
        relative
        flex flex-col
        h-full
        rounded-2xl
        bg-transparent
        p-6
        overflow-hidden
        border border-neutral-200/50
        transition-shadow hover:shadow-md
      "
    >
      {/* 1. H1 (TypewriterName) at the top */}
      <div className="mb-6">
        <TypewriterName />
      </div>

      {/* 3. Bio text below H1 */}
      <p className="text-base leading-relaxed text-neutral-900 mb-6">
        Hi, I'm Rachana — Senior UX Designer with 6+ years of experience designing complex
        product systems across UX, behavioural design, and emerging AI workflows.
      </p>

      {/* 4. Nav items below bio */}
      <nav className="flex flex-col gap-3 mt-auto">
        <Link
          href="/work"
          className="flex items-center justify-between text-base font-medium text-neutral-900 hover:text-neutral-700 transition-colors px-4 py-3 rounded-lg border border-neutral-300 hover:border-neutral-400"
        >
          Work
          <span className="ml-2">→</span>
        </Link>
        <Link
          href="/experiments"
          className="flex items-center justify-between text-base font-medium text-neutral-900 hover:text-neutral-700 transition-colors px-4 py-3 rounded-lg border border-neutral-300 hover:border-neutral-400"
        >
          Experiments
          <span className="ml-2">→</span>
        </Link>
        <Link
          href="/blog"
          className="flex items-center justify-between text-base font-medium text-neutral-900 hover:text-neutral-700 transition-colors px-4 py-3 rounded-lg border border-neutral-300 hover:border-neutral-400"
        >
          Blog
          <span className="ml-2">→</span>
        </Link>
      </nav>
    </motion.article>
  );
}
