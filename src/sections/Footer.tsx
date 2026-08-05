"use client";

import { motion, useReducedMotion } from "framer-motion";
import { contentData } from "@/content/data";

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();
  const { githubUrl, email, name } = contentData.profile;
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative py-10 px-6 border-t-2"
      aria-label="Pie de página"
      style={{
        backgroundColor: "var(--surface-dark)",
        color: "var(--paper)",
        borderColor: "var(--ink)",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-sm uppercase tracking-wide"
        >
          © {year} {name.toUpperCase()}
        </motion.p>

        <motion.nav
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1 }}
          viewport={{ once: true }}
          className="flex gap-4"
          aria-label="Redes sociales"
        >
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-wide font-bold px-3 py-2 border-2 transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              backgroundColor: "var(--paper)",
              color: "var(--ink)",
              borderColor: "var(--paper)",
            }}
            aria-label="Ver GitHub (abre en nueva pestaña)"
          >
            GITHUB ↗
          </a>
          <a
            href={`mailto:${email}`}
            className="font-mono text-xs uppercase tracking-wide font-bold px-3 py-2 border-2 transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              backgroundColor: "transparent",
              color: "var(--paper)",
              borderColor: "var(--paper)",
            }}
            aria-label="Enviar email a Sebastián Velasco"
          >
            EMAIL
          </a>
        </motion.nav>

        <motion.button
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1 }}
          viewport={{ once: true }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-mono text-xs uppercase tracking-wide font-bold px-3 py-2 border-2 transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{
            backgroundColor: "var(--accent-1)",
            color: "var(--ink)",
            borderColor: "var(--ink)",
          }}
          aria-label="Volver al inicio de la página"
        >
          ↑ ARRIBA
        </motion.button>
      </div>
    </footer>
  );
}
