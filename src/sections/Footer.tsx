"use client";

import { motion, useReducedMotion } from "framer-motion";

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: "https://github.com/nxxo31",
    ariaLabel: "Ver perfil de GitHub (abre en nueva pestaña)",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/sebastianvelasco",
    ariaLabel: "Ver perfil de LinkedIn (abre en nueva pestaña)",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/nxxo31",
    ariaLabel: "Ver perfil de Twitter (abre en nueva pestaña)",
  },
];

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <footer className="relative py-12 px-6 z-10 border-t border-white/5" aria-label="Pie de página">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-[#a3a3b8] text-sm">
            © {new Date().getFullYear()} Sebastian Velasco. Construido con Next.js, React & Three.js.
          </p>
        </motion.div>

        <motion.nav
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1 }}
          viewport={{ once: true }}
          className="flex gap-6"
          aria-label="Redes sociales"
        >
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.ariaLabel}
              className="text-[#a3a3b8] hover:text-[#22d3ee] transition-colors duration-300 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05050e] rounded"
            >
              {social.name}
            </a>
          ))}
        </motion.nav>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-[#a3a3b8] hover:text-white transition-colors duration-300 text-sm flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05050e] rounded"
            aria-label="Volver al inicio de la página"
          >
            Volver arriba
            <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </footer>
  );
}
