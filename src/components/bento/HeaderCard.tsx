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
        I work on complex product systems where clarity often breaks down.
        <br /><br />
        While my past roles haven't always allowed space to address long-term impacts directly, I care deeply about how products shape behavior and everyday work — and I design with an intent to reduce mental effort and unnecessary friction wherever possible.
      </p>

      {/* Tag chip/pill below bio */}
      <div className="mb-6">
        <span className="inline-flex items-center px-2 py-1 rounded-lg bg-black text-white text-xs font-medium">
          6 + years, B2B, SaaS, Supply chain, Telecom etc
        </span>
      </div>

      {/* 4. Nav items below tag */}
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
