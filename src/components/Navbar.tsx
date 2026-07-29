"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface NavbarProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavigate, activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar menú móvil con tecla Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    // Bloquear scroll del body cuando el menú está abierto
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Mover foco al primer enlace del menú móvil al abrir
  useEffect(() => {
    if (mobileOpen) {
      const t = setTimeout(() => firstMobileLinkRef.current?.focus(), 100);
      return () => clearTimeout(t);
    }
  }, [mobileOpen]);

  const links = [
    { id: "hero", label: "Inicio" },
    { id: "about", label: "Sobre mí" },
    { id: "projects", label: "Proyectos" },
    { id: "skills", label: "Habilidades" },
    { id: "contact", label: "Contacto" },
  ];

  const handleNavClick = useCallback(
    (section: string) => {
      onNavigate(section);
      setMobileOpen(false);
    },
    [onNavigate],
  );

  return (
    <motion.nav
      initial={shouldReduceMotion ? false : { y: -100 }}
      animate={shouldReduceMotion ? {} : { y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#05050e]/80 backdrop-blur-xl border-b border-white/5 py-3"
          : "bg-transparent py-5"
      }`}
      aria-label="Navegación principal"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick("hero")}
          className="text-2xl font-bold tracking-tighter text-white hover:text-[#22d3ee] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05050e] rounded"
          aria-label="Ir al inicio — Sebastián Velasco"
        >
          <span className="bg-gradient-to-r from-[#7c5cff] to-[#22d3ee] bg-clip-text text-transparent">
            SV
          </span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8" role="menubar">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`relative text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee] focus-visible:ring-offset-4 focus-visible:ring-offset-transparent rounded ${
                activeSection === link.id
                  ? "text-[#22d3ee]"
                  : "text-[#a3a3b8] hover:text-white"
              }`}
              aria-current={activeSection === link.id ? "page" : undefined}
              role="menuitem"
            >
              {link.label}
              {activeSection === link.id && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#22d3ee]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          ref={hamburgerRef}
          className="md:hidden text-white p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05050e] rounded"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={shouldReduceMotion ? false : { opacity: 0, y: -20 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#05050e]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación móvil"
          >
            {links.map((link, i) => (
              <motion.button
                key={link.id}
                ref={i === 0 ? firstMobileLinkRef : undefined}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ delay: shouldReduceMotion ? 0 : i * 0.1 }}
                onClick={() => handleNavClick(link.id)}
                className={`text-2xl font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee] focus-visible:ring-offset-4 focus-visible:ring-offset-transparent rounded px-4 py-2 ${
                  activeSection === link.id ? "text-[#22d3ee]" : "text-white"
                }`}
                aria-current={activeSection === link.id ? "page" : undefined}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
