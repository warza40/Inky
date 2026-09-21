"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { expandingCursorAttrs } from "@/lib/expanding-cursor";
import { TamagotchiNavIcon } from "./TamagotchiNavIcon";

import { RESUME_URL } from "@/data/social-links";

type NavMatch = "work" | "experiments" | "illustration";

type NavItem = {
  label: string;
  href: string;
  external?: boolean;
  match?: NavMatch;
};

const NAV_ITEMS: NavItem[] = [
  {
    label: "Case studies",
    href: "/#work",
    match: "work",
  },
  {
    label: "Experiments",
    href: "/experiments",
    match: "experiments",
  },
  {
    label: "Blog",
    href: "https://open.substack.com/pub/thelilyput",
    external: true,
  },
  {
    label: "Illustration",
    href: "/inky-lily",
    match: "illustration",
  },
  {
    label: "Resume",
    href: RESUME_URL,
    external: true,
  },
];

function isNavItemActive(item: NavItem, pathname: string): boolean {
  if (!item.match) return false;

  switch (item.match) {
    case "work":
      return pathname === "/" || pathname.startsWith("/case/");
    case "experiments":
      return pathname.startsWith("/experiments");
    case "illustration":
      return pathname.startsWith("/inky-lily");
    default:
      return false;
  }
}

export function FloatingNav() {
  const pathname = usePathname();
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
          <Link
            href="/"
            className="floating-nav__brand"
            aria-label="Home"
            {...expandingCursorAttrs({
              title: "Back to home",
              hint: "Portfolio homepage",
            })}
          >
            <TamagotchiNavIcon />
            <span className="floating-nav__brand-text">Rachana.m</span>
          </Link>

          <nav
            className="floating-nav__capsule"
            aria-label="Primary navigation"
          >
            {NAV_ITEMS.map((item) => {
              const active = isNavItemActive(item, pathname);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "floating-nav__link",
                    active && "floating-nav__link--active",
                  )}
                  aria-current={active ? "page" : undefined}
                  {...(item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <p className="floating-nav__availability" aria-label="Open to work">
            <span className="floating-nav__availability-dot" aria-hidden />
            available for work
          </p>

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
              {NAV_ITEMS.map((item) => {
                const active = isNavItemActive(item, pathname);

                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={cn(
                        "floating-nav__mobile-link",
                        active && "floating-nav__mobile-link--active",
                      )}
                      onClick={closeMenu}
                      aria-current={active ? "page" : undefined}
                      {...(item.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p className="floating-nav__mobile-availability">
              <span className="floating-nav__availability-dot" aria-hidden />
              available for work
            </p>
          </nav>
        </div>
      </div>
    </header>
  );
}
