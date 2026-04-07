"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { useTypewriter } from "@/hooks/useTypewriter"

export function Hero() {
  const [showFullName, setShowFullName] = useState(false)

  // Trigger after 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFullName(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  const typedName = useTypewriter(
    "/Rachana Mandal",
    45,
    showFullName
  )

  return (
    <section className="pt-24 pb-12">
      <div className="max-w-6xl">
        <AnimatePresence mode="wait">
          {!showFullName && (
            <motion.h1
              key="rm"
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" as const }}
              className="text-4xl md:text-5xl font-semibold tracking-tight"
            >
              /RM
            </motion.h1>
          )}

          {showFullName && (
            <motion.h1
              key="full"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl font-semibold tracking-tight"
            >
              {typedName}
            </motion.h1>
          )}
        </AnimatePresence>

        <p className="mt-4 max-w-xl text-neutral-600 text-base leading-relaxed">
          Senior UX Designer with 6+ years of experience designing complex
          product systems across UX, behavioural design, and emerging AI
          workflows.
        </p>
      </div>
    </section>
  )
}
