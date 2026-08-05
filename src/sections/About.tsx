"use client";

import { motion, useReducedMotion } from "framer-motion";
import { contentData } from "@/content/data";

export default function AboutSection() {
  const shouldReduceMotion = useReducedMotion();
  const { githubUrl, email, name } = contentData.profile;

  return (
    <section
      id="about"
      className="relative py-24 px-6"
      aria-label="Sobre mí"
      style={{ backgroundColor: "var(--paper)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-8 items-center">
          {/* Avatar / Bloque visual */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -40 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="md:col-span-5"
          >
            <div
              className="aspect-square w-full max-w-sm mx-auto flex items-center justify-center"
              style={{
                backgroundColor: "var(--accent-2)",
                border: "3px solid var(--ink)",
                boxShadow: "8px 8px 0 var(--ink)",
              }}
              aria-hidden="true"
            >
              <span
                className="font-heading font-bold text-7xl"
                style={{ color: "var(--ink)" }}
              >
                SV
              </span>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 40 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="md:col-span-7"
          >
            <h2
              className="font-heading text-4xl md:text-5xl font-bold mb-6"
              style={{ color: "var(--ink)" }}
            >
              SOBRE MÍ
            </h2>

            <div
              className="space-y-4 leading-relaxed"
              style={{ color: "var(--ink)" }}
            >
              <p>
                Soy <strong>{name}</strong>, ingeniero de software centrado en
                construir sistemas robustos: desde apps de escritorio con
                encriptación AES-256-GCM hasta bots de trading algorítmico y
                herramientas de supply chain security en Go.
              </p>
              <p>
                Trabajo principalmente con TypeScript (Next.js / Electron),
                Python (FastAPI) y Go. Me interesa la arquitectura hexagonal,
                el domain-driven design y la automatización con agentes de IA.
              </p>
              <p>
                Opero desde Colombia para el mundo. Cada proyecto es un problema
                de ingeniería real, no un ejercicio de portafolio.
              </p>
            </div>

            {/* Datos duros */}
            <div
              className="mt-8 p-4 border-2"
              style={{
                borderColor: "var(--ink)",
                backgroundColor: "var(--surface)",
              }}
            >
              <div className="grid grid-cols-2 gap-4 font-mono text-sm">
                <div>
                  <p
                    className="uppercase tracking-wide text-xs font-bold mb-1"
                    style={{ color: "var(--ink)" }}
                  >
                    GitHub
                  </p>
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
                    style={{ color: "var(--accent-1)" }}
                  >
                    @Nxxo31 ↗
                  </a>
                </div>
                <div>
                  <p
                    className="uppercase tracking-wide text-xs font-bold mb-1"
                    style={{ color: "var(--ink)" }}
                  >
                    Email
                  </p>
                  <a
                    href={`mailto:${email}`}
                    className="underline font-bold break-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
                    style={{ color: "var(--accent-1)" }}
                  >
                    {email}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
