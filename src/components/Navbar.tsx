"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";

interface NavbarProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

const NAV_LINKS = [
  { id: "hero", key: "home" },
  { id: "about", key: "about" },
  { id: "projects", key: "projects" },
  { id: "services", key: "services" },
  { id: "experience", key: "experience" },
  { id: "skills", key: "skills" },
  { id: "contact", key: "contact" },
] as const;

export default function Navbar({ onNavigate, activeSection }: NavbarProps) {
  const shouldReduceMotion = useReducedMotion();
  const t = useTranslations("Navbar");

  return (
    <motion.nav
      initial={shouldReduceMotion ? false : { opacity: 0, y: -20 }}
      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[var(--paper)] border-b-2 border-[var(--ink)]"
      aria-label={t("navLabel")}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        <button
          onClick={() => onNavigate("hero")}
          className="font-heading text-xl font-bold tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
          style={{ color: "var(--ink)" }}
          aria-label={t("goHome")}
        >
          {t("logo")}
        </button>

        <div className="flex items-center gap-3">
          <ul className="hidden md:flex items-center gap-1" role="list">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="px-3 py-1.5 text-xs font-mono uppercase tracking-wide border-2 transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
                    style={{
                      color: isActive ? "var(--paper)" : "var(--ink)",
                      backgroundColor: isActive ? "var(--ink)" : "transparent",
                      borderColor: "var(--ink)",
                    }}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {t(link.key)}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Mobile: condensed nav */}
          <ul className="flex md:hidden items-center gap-1" role="list">
            {NAV_LINKS.slice(0, 4).map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="px-2 py-1 text-[10px] font-mono uppercase border-2"
                    style={{
                      color: isActive ? "var(--paper)" : "var(--ink)",
                      backgroundColor: isActive ? "var(--ink)" : "transparent",
                      borderColor: "var(--ink)",
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
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  );
}
