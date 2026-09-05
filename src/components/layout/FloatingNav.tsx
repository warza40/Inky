"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const RESUME_URL =
  "https://drive.google.com/file/d/11pRdPZdKTFnX9Q06PUfgj922_X8luZ9K/view?usp=drivesdk";

const NAV_ITEMS = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  {
    label: "Writing",
    href: "https://open.substack.com/pub/thelilyput",
    external: true,
  },
] as const;

export function FloatingNav() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const panel = menuRef.current;
    const focusable = panel
      ? panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        )
      : [];

    focusable[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        return;
      }

      if (event.key !== "Tab" || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      toggleRef.current?.focus();
    };
  }, [open, closeMenu]);

  return (
    <header className="floating-nav" aria-label="Site header">
      <div className="floating-nav__frame">
        <div className="floating-nav__bar">
          <Link href="/" className="floating-nav__brand" aria-label="Home">
            <span className="floating-nav__brand-text">Rachana Mandal</span>
          </Link>

          <nav
            className="floating-nav__capsule"
            aria-label="Primary navigation"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="floating-nav__link"
                {...("external" in item && item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <a
            href={RESUME_URL}
            className="floating-nav__resume"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>

          <button
            ref={toggleRef}
            type="button"
            className="floating-nav__menu-toggle"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((current) => !current)}
          >
            {open ? (
              <X size={18} strokeWidth={1.75} aria-hidden />
            ) : (
              <Menu size={18} strokeWidth={1.75} aria-hidden />
            )}
          </button>
        </div>

        <div
          ref={menuRef}
          id={menuId}
          className={cn("floating-nav__mobile-panel", open && "is-open")}
          hidden={!open}
        >
          <nav aria-label="Mobile navigation">
            <ul className="floating-nav__mobile-list" role="list">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="floating-nav__mobile-link"
                    onClick={closeMenu}
                    {...("external" in item && item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={RESUME_URL}
                  className="floating-nav__mobile-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                >
                  Resume
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
