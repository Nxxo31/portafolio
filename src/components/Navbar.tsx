"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import LanguageToggle from "./LanguageToggle";

interface NavItem {
  id: string;
  key: string;
}

// Secciones en el orden que aparecen en la página. El id tiene que
// coincidir con el `id` del <section> en cada componente (Hero, About, etc.).
const NAV_ITEMS: readonly NavItem[] = [
  { id: "hero", key: "home" },
  { id: "about", key: "about" },
  { id: "experience", key: "experience" },
  { id: "projects", key: "projects" },
  { id: "skills", key: "skills" },
  { id: "contact", key: "contact" },
] as const;

function smoothScrollTo(id: string) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar() {
  const shouldReduceMotion = useReducedMotion();
  const t = useTranslations("Navbar");
  const [active, setActive] = useState<string>("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Detecta sección activa via IntersectionObserver.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNav = (id: string) => {
    smoothScrollTo(id);
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={shouldReduceMotion ? false : { opacity: 0, y: -20 }}
      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b"
      style={{
        backgroundColor: "color-mix(in oklab, var(--paper) 80%, transparent)",
        borderColor: "var(--border)",
      }}
      aria-label={t("navLabel")}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 md:px-6 py-3">
        {/* Wordmark: SVO + sublabel "Developer · Blog · Portfolio" */}
        <button
          onClick={() => handleNav("hero")}
          className="flex flex-col items-start gap-0 leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 rounded"
          aria-label={t("goHome")}
        >
          <span
            className="font-heading text-lg md:text-xl font-bold tracking-tight"
            style={{ color: "var(--ink)" }}
          >
            {t("logo")}
          </span>
          <span
            className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.18em] opacity-70 mt-0.5"
            style={{ color: "var(--ink)" }}
          >
            {t("logoSublabel")}
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-3">
          <ul className="flex items-center gap-1" role="list">
            {NAV_ITEMS.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <button
                    onClick={() => handleNav(link.id)}
                    className="px-3 py-1.5 text-xs font-mono uppercase tracking-wide border transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    style={{
                      color: isActive ? "var(--paper)" : "var(--ink)",
                      backgroundColor: isActive ? "var(--accent-2)" : "transparent",
                      borderColor: isActive ? "var(--accent-2)" : "var(--border)",
                    }}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {t(link.key)}
                  </button>
                </li>
              );
            })}
          </ul>
          <LanguageToggle />
        </div>

        {/* Mobile: hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="px-2 py-1 text-xs font-mono uppercase border"
            style={{
              color: "var(--ink)",
              borderColor: "var(--border)",
              backgroundColor: mobileOpen ? "var(--accent-2)" : "transparent",
            }}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
            aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <motion.ul
          id="mobile-nav-menu"
          initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden border-t px-4 py-3 flex flex-col gap-2"
          style={{
            backgroundColor: "var(--paper)",
            borderColor: "var(--border)",
          }}
          role="list"
        >
          {NAV_ITEMS.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <button
                  onClick={() => handleNav(link.id)}
                  className="w-full text-left px-3 py-2 text-xs font-mono uppercase border"
                  style={{
                    color: isActive ? "var(--paper)" : "var(--ink)",
                    backgroundColor: isActive ? "var(--accent-2)" : "transparent",
                    borderColor: "var(--border)",
                  }}
                  aria-current={isActive ? "page" : undefined}
                >
                  {t(link.key)}
                </button>
              </li>
            );
          })}
        </motion.ul>
      )}
    </motion.nav>
  );
}
