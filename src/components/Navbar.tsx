"use client";

import { motion, useReducedMotion } from "framer-motion";

interface NavbarProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

const NAV_LINKS = [
  { id: "hero", label: "INICIO" },
  { id: "about", label: "SOBRE MÍ" },
  { id: "projects", label: "PROYECTOS" },
  { id: "services", label: "SERVICIOS" },
  { id: "experience", label: "EXPERIENCIA" },
  { id: "skills", label: "SKILLS" },
  { id: "contact", label: "CONTACTO" },
];

export default function Navbar({ onNavigate, activeSection }: NavbarProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.nav
      initial={shouldReduceMotion ? false : { opacity: 0, y: -20 }}
      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[var(--paper)] border-b-2 border-[var(--ink)]"
      aria-label="Navegación principal"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        <button
          onClick={() => onNavigate("hero")}
          className="font-heading text-xl font-bold tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
          style={{ color: "var(--ink)" }}
          aria-label="Ir al inicio"
        >
          S_VELASCO
        </button>

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
                  {link.label}
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
                  {link.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.nav>
  );
}
