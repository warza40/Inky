"use client";

import Link from "next/link";
import { TypewriterName } from "@/components/TypewriterName";
import { AnimatedBlinkybot } from "@/components/bento/AnimatedBlinkybot";
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
        bg-white dark:bg-neutral-800
        p-6
        overflow-hidden
        border border-neutral-200 dark:border-white/30
        shadow-sm
        transition-shadow hover:shadow-md
      "
    >
      <span className="inline-flex w-fit items-center rounded-full border border-neutral-800 dark:border-neutral-400 px-3 py-1 text-xs font-medium text-neutral-800 dark:text-neutral-100 mb-4">
        AVAILABLE FOR HIRE
      </span>
      <div className="mb-4">
        <AnimatedBlinkybot />
      </div>
      <div className="mb-6">
        <TypewriterName />
      </div>
      <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 mb-6">
        I work on complex product systems where clarity often breaks down.
        <br /><br />
        While my past roles haven't always allowed space to address long-term impacts directly, I care deeply about how products shape behavior and everyday work — and I design with an intent to reduce mental effort and unnecessary friction wherever possible.
      </p>
      <div className="mb-6">
        <span className="inline-flex items-center rounded-full border border-neutral-400 dark:border-neutral-400 px-3 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-300">
          6 + years, B2B, SaaS, Supply chain, Telecom
        </span>
      </div>
      <nav className="flex flex-col gap-2 mt-auto">
        <Link
          href="/experiments"
          className="flex items-center justify-between text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-500 hover:border-neutral-400 dark:hover:border-neutral-400"
        >
          Experiments
          <span className="ml-2">→</span>
        </Link>
        <Link
          href="/blog"
          className="flex items-center justify-between text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-500 hover:border-neutral-400 dark:hover:border-neutral-400"
        >
          Blog
          <span className="ml-2">→</span>
        </Link>
      </nav>
    </motion.article>
  );
}
