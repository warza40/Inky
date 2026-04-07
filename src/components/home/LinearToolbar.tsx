"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FileText, Mail, BookOpen, FlaskConical, Settings } from "lucide-react";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

const EMAIL = "mrachana674@gmail.com";
const MAIL_OPTIONS = [
  { label: "Gmail", href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}` },
  { label: "Outlook", href: `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(EMAIL)}` },
  { label: "Yahoo Mail", href: `https://compose.mail.yahoo.com/?to=${encodeURIComponent(EMAIL)}` },
  { label: "Default mail app", href: `mailto:${EMAIL}` },
];

const CASE_STUDIES = [
  {
    title: "Omantel Bulk Activation",
    subtitle: "Designing a self-serve bulk activation experience for enterprise customers",
    href: "/case/omantel-bulk-activation",
    image: "/Bulk.png",
  },
  {
    title: "Real Estate Connectivity",
    subtitle: "Purchase flow and management for multi-unit building connectivity",
    href: "/case/real-estate-connectivity",
    image: "/REC.png",
  },
  {
    title: "Bringing Clarity to Warehouse Operations at Scale",
    subtitle: "Centralized warehouse management portal for operations and quality",
    href: "/case/warehouse-operations",
    image: "/warehouse.png",
  },
  {
    title: "Automating a previously manual system for Disaster Recovery teams",
    subtitle: "Four-product ecosystem for debris operations, time reporting, case management, and disposal",
    href: "/case/disaster-recovery",
    image: "/DM.png",
  },
];

const SUBSTACK_POST = {
  title: "Entry & Exit in Digital Lending",
  href: "https://open.substack.com/pub/thelilyput/p/entry-and-exit-in-digital-lending?r=g3nqv&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true",
};

type ToolbarId = "case_study" | "contact" | "reads" | "experiment" | "theme" | null;

const TOOLBAR_ITEMS: { id: ToolbarId; icon: typeof FileText; label: string }[] = [
  { id: "case_study", icon: FileText, label: "Case studies" },
  { id: "contact", icon: Mail, label: "Contact" },
  { id: "reads", icon: BookOpen, label: "Reads" },
  { id: "experiment", icon: FlaskConical, label: "Experiment" },
  { id: "theme", icon: Settings, label: "Theme" },
];

export function LinearToolbar() {
  const [activeId, setActiveId] = useState<ToolbarId>(null);
  const [indicatorLeft, setIndicatorLeft] = useState(0);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const zoneRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (activeId === null) return;
    const index = TOOLBAR_ITEMS.findIndex((i) => i.id === activeId);
    const btn = buttonsRef.current[index];
    if (btn) setIndicatorLeft(btn.offsetLeft);
  }, [activeId]);

  /* When case study cards open, scroll to bottom so the popup below the nav is visible */
  useEffect(() => {
    if (activeId !== "case_study") return;
    const scrollHeight = document.documentElement.scrollHeight;
    const viewHeight = window.innerHeight;
    if (scrollHeight > viewHeight) {
      window.scrollTo({ top: scrollHeight - viewHeight, behavior: "smooth" });
    }
  }, [activeId]);

  useEffect(() => {
    if (activeId === null) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (zoneRef.current && !zoneRef.current.contains(target)) {
        setActiveId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeId]);

  const selectItem = (id: ToolbarId, index: number) => {
    if (activeId === id) {
      setActiveId(null);
      return;
    }
    setActiveId(id);
    const btn = buttonsRef.current[index];
    if (btn) setIndicatorLeft(btn.offsetLeft);
  };

  const reset = () => setActiveId(null);

  const renderMenu = () => {
    if (activeId === "case_study") {
      return (
        <div className="linear-menu-grid linear-menu-grid--case">
          {CASE_STUDIES.map((study, i) => (
            <Link
              key={study.href}
              href={study.href}
              className="linear-menu-item linear-menu-item--case"
              style={{ animationDelay: `${i * 60}ms` }}
              onClick={reset}
              aria-label={study.title}
            >
              <span className="linear-menu-item-caption">{study.title}</span>
              {study.image && (
                <div className="linear-menu-item-image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={study.image} alt="" aria-hidden />
                </div>
              )}
            </Link>
          ))}
        </div>
      );
    }
    if (activeId === "contact") {
      return (
        <div className="linear-menu-grid">
          {MAIL_OPTIONS.map((opt, i) => (
            <a
              key={opt.label}
              href={opt.href}
              target="_blank"
              rel="noopener noreferrer"
              className="linear-menu-item"
              style={{ animationDelay: `${i * 60}ms` }}
              onClick={reset}
            >
              <span className="linear-menu-item-icon">
                <Mail size={18} strokeWidth={1.5} />
              </span>
              <span className="linear-menu-item-label">{opt.label}</span>
            </a>
          ))}
        </div>
      );
    }
    if (activeId === "reads") {
      return (
        <div className="linear-menu-grid">
          <a
            href={SUBSTACK_POST.href}
            target="_blank"
            rel="noopener noreferrer"
            className="linear-menu-item"
            style={{ animationDelay: "0ms" }}
            onClick={reset}
          >
            <span className="linear-menu-item-icon">
              <BookOpen size={18} strokeWidth={1.5} />
            </span>
            <span className="linear-menu-item-label">{SUBSTACK_POST.title}</span>
          </a>
        </div>
      );
    }
    if (activeId === "experiment") {
      return (
        <div className="linear-menu-grid">
          <div className="linear-menu-item opacity-60" style={{ animationDelay: "0ms" }}>
            <span className="linear-menu-item-icon">
              <FlaskConical size={18} strokeWidth={1.5} />
            </span>
            <span className="linear-menu-item-label">Coming soon</span>
          </div>
        </div>
      );
    }
    if (activeId === "theme") {
      return (
        <div className="linear-menu-grid linear-menu-theme">
          <div className="linear-menu-item" style={{ animationDelay: "0ms" }}>
            <ThemeSwitcher variant="outline" />
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="linear-toolbar-zone" ref={zoneRef}>
      {/* Pill toolbar */}
      <div className="linear-toolbar-pill" ref={toolbarRef}>
        <div className="linear-toolbar-items">
          {TOOLBAR_ITEMS.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id ?? "theme"}
                ref={(el) => { buttonsRef.current[index] = el; }}
                type="button"
                className={`linear-toolbar-btn ${isActive ? "active" : ""}`}
                onClick={() => selectItem(item.id, index)}
                aria-label={item.label}
                aria-expanded={isActive}
              >
                <span className="linear-toolbar-btn-icon">
                  <Icon size={20} strokeWidth={1.5} />
                </span>
                <span className="linear-toolbar-btn-label">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Menu below toolbar */}
      <div
        id="menu-container"
        className={`linear-menu-container${activeId === "case_study" ? " linear-menu-container--case" : ""}`}
        style={{ minHeight: activeId && activeId !== "theme" ? undefined : 0, opacity: activeId ? 1 : 0 }}
      >
        {activeId && renderMenu()}
      </div>
    </div>
  );
}
