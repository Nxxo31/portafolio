"use client";

import { motion, useReducedMotion } from "framer-motion";
import { contentData } from "@/content/data";

export default function ExperienceSection() {
  const experience = contentData.experience;
  const shouldReduceMotion = useReducedMotion();

  if (!experience || experience.length === 0) return null;

  return (
    <section
      id="experience"
      className="relative py-24 px-6"
      aria-label="Experiencia profesional"
      style={{ backgroundColor: "var(--paper)" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <p
            className="font-mono text-sm tracking-[0.3em] uppercase mb-2"
            style={{ color: "var(--accent-1)" }}
          >
            // TRAYECTORIA
          </p>
          <h2
            className="font-heading text-5xl md:text-6xl font-bold"
            style={{ color: "var(--ink)" }}
          >
            EXPERIENCIA
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Línea sólida 2px */}
          <div
            className="absolute left-3 md:left-4 top-0 bottom-0"
            style={{
              width: "2px",
              backgroundColor: "var(--ink)",
            }}
            aria-hidden="true"
          />

          <div className="space-y-10">
            {experience.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: shouldReduceMotion ? 0 : index * 0.15,
                }}
                className="relative pl-12 md:pl-16"
              >
                {/* Punto cuadrado */}
                <div
                  className="absolute left-0 top-1 w-6 h-6 border-2"
                  style={{
                    backgroundColor: "var(--accent-1)",
                    borderColor: "var(--ink)",
                    boxShadow: "3px 3px 0 var(--ink)",
                  }}
                  aria-hidden="true"
                />

                {/* Period badge */}
                <span
                  className="inline-block px-3 py-1 font-mono text-xs uppercase tracking-wide font-bold border-2 mb-3"
                  style={{
                    backgroundColor: "var(--surface)",
                    color: "var(--ink)",
                    borderColor: "var(--ink)",
                  }}
                >
                  {entry.period}
                </span>

                <h3
                  className="font-heading text-xl font-bold mb-1"
                  style={{ color: "var(--ink)" }}
                >
                  {entry.role}
                </h3>
                <p
                  className="font-mono text-sm font-bold mb-3"
                  style={{ color: "var(--accent-2)" }}
                >
                  {entry.company}
                </p>
                <p
                  className="font-mono text-sm leading-relaxed mb-4"
                  style={{ color: "var(--ink)" }}
                >
                  {entry.description}
                </p>

                {/* Tecnologías */}
                <div className="flex flex-wrap gap-2">
                  {entry.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 font-mono text-[10px] uppercase tracking-wide border-2"
                      style={{
                        backgroundColor: "var(--accent-4)",
                        color: "var(--ink)",
                        borderColor: "var(--ink)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
