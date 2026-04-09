"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Linkedin, Mail, Download } from "lucide-react";
import { TicketCard } from "./TicketCard";
import { HeaderCard } from "./HeaderCard";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

const EMAIL = "mrachana674@gmail.com";

const MAIL_OPTIONS = [
  {
    label: "Gmail",
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}`,
  },
  {
    label: "Outlook",
    href: `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(EMAIL)}`,
  },
  {
    label: "Yahoo Mail",
    href: `https://compose.mail.yahoo.com/?to=${encodeURIComponent(EMAIL)}`,
  },
  {
    label: "Default mail app",
    href: `mailto:${EMAIL}`,
  },
];

export function BentoGrid() {
  const [mailDropdownOpen, setMailDropdownOpen] = useState(false);
  const mailDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        mailDropdownRef.current &&
        !mailDropdownRef.current.contains(event.target as Node)
      ) {
        setMailDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <section className="max-w-7xl mx-auto px-8 flex items-start gap-6">
      {/* Theme switcher - outside on the left, aligned with grid */}
      <div className="flex-shrink-0 pt-1 -ml-3 mt-4 dark:mt-0">
        <ThemeSwitcher />
      </div>
      <div className="bento-grid flex-1 min-w-0">
        {/* Row 1-2: Column 1 - Bio card */}
        <div className="bento-card card-tall">
          <HeaderCard />
        </div>

        {/* Row 1: Column 2 - System capacity / focus card (reference style) */}
        <div className="bento-card card-2 relative rounded-2xl overflow-hidden border border-emerald-200/80 dark:border-white/30 bg-emerald-50 dark:bg-emerald-950/60 p-6 shadow-sm">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-emerald-800/90 dark:text-emerald-400/90 mb-2">
            System capacity
          </span>
          <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
            94%
          </p>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-4">
            Find the closest access point or initialize remote connection
            protocol.
          </p>
          <div className="flex items-center gap-2">
            <Link
              href="https://www.linkedin.com/in/rachanamandal/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 dark:border-neutral-400 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-medium hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              aria-label="LinkedIn"
            >
              Li
            </Link>
            <Link
              href="/#reach-out"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 dark:border-neutral-400 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-medium hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              aria-label="Mail"
            >
              Ma
            </Link>
          </div>
        </div>

        {/* Row 1: Column 3 - Omantel (DATA VIZ style accent) */}
        <div className="bento-card card-3">
          <TicketCard
            className="bg-rose-50 dark:bg-rose-950/50 border-rose-200/80 dark:border-white/30"
            title="Fixing the Fragility in Enterprise SIM Activation flows"
            subtitle="A system-level redesign inside a Telecom giant's enterprise portal"
            tag="B2B, UI/UX"
            image="/om-bento.png"
            href="/case/omantel-bulk-activation"
          />
        </div>

        {/* Row 2: Column 2 - Real estate connectivity case study */}
        <div className="bento-card card-4">
          <TicketCard
            title="Making Bulk Connectivity Purchases Transparent for Property Owners"
            subtitle="Self-serve purchase flow for multi-unit building connectivity"
            tag="B2B · UX"
            image="/REC.png"
            href="/case/real-estate-connectivity"
          />
        </div>

        {/* Row 2: Column 3 - Warehouse (progress bar style) */}
        <div className="bento-card card-5">
          <TicketCard
            title="Bringing Clarity to Warehouse Operations Across Distributed Teams"
            subtitle="Clarity and operations at scale"
            tag="B2B · OPERATIONS"
            image="/images/enterprise.jpg"
            href="/case/warehouse-operations"
          />
        </div>

        {/* Row 3: Reach out to me */}
        <div className="bento-card card-6a" id="reach-out">
          <div className="relative h-full flex flex-col p-6 rounded-2xl bg-white dark:bg-neutral-800 shadow-sm border border-neutral-200 dark:border-white/30">
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Reach out to me
              </h3>
              <div className="flex items-center gap-4">
                <Link
                  href="https://www.linkedin.com/in/rachanamandal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-11 h-11 rounded-lg border border-neutral-200 dark:border-neutral-300 bg-neutral-50 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600 hover:text-neutral-900 dark:hover:text-neutral-100 hover:border-neutral-300 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={28} />
                </Link>
                <div className="relative" ref={mailDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setMailDropdownOpen((open) => !open)}
                    className="flex items-center justify-center w-11 h-11 rounded-lg border border-neutral-200 dark:border-neutral-300 bg-neutral-50 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600 hover:text-neutral-900 dark:hover:text-neutral-100 hover:border-neutral-300 transition-colors"
                    aria-label="Email"
                    aria-expanded={mailDropdownOpen}
                    aria-haspopup="true"
                  >
                    <Mail size={28} />
                  </button>
                  {mailDropdownOpen && (
                    <div className="absolute left-full top-0 ml-2 z-10 min-w-[160px] rounded-lg border border-neutral-200 dark:border-neutral-300 bg-white dark:bg-neutral-800 py-1 shadow-lg">
                      {MAIL_OPTIONS.map((opt) => (
                        <Link
                          key={opt.label}
                          href={opt.href}
                          target={
                            opt.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            opt.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-neutral-100"
                          onClick={() => setMailDropdownOpen(false)}
                        >
                          {opt.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Link
              href="/resume.pdf"
              className="mt-auto inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-neutral-900 dark:bg-neutral-700 px-5 py-2.5 text-sm font-medium text-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-600 transition-colors"
            >
              <Download size={18} />
              Resume
            </Link>
          </div>
        </div>

        {/* Row 3: Reads for now */}
        <div className="bento-card card-6b">
          <div className="relative h-full flex flex-col p-6 rounded-2xl bg-amber-50 dark:bg-neutral-800 border border-amber-200/80 dark:border-white/30 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
              READ_ONLY
            </span>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              Reads for now
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
              Design is not decoration. It is the visual organization of
              information for maximum throughput.
            </p>
            <div className="flex gap-3 mt-auto">
              <div className="w-10 h-10 rounded-lg border border-neutral-300 dark:border-neutral-500 bg-white dark:bg-neutral-700 flex items-center justify-center text-neutral-600 dark:text-neutral-300 text-xs">
                📄
              </div>
              <div className="w-10 h-10 rounded-lg border border-neutral-300 dark:border-neutral-500 bg-white dark:bg-neutral-700 flex items-center justify-center text-neutral-600 dark:text-neutral-300 text-xs">
                ⚡
              </div>
              <div className="w-10 h-10 rounded-lg border border-neutral-300 dark:border-neutral-500 bg-white dark:bg-neutral-700 flex items-center justify-center text-neutral-600 dark:text-neutral-300 text-xs">
                🎨
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
