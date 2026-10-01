"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { contentData } from "@/content/data";

export default function ExperienceSection() {
  const experience = contentData.experience;
  const shouldReduceMotion = useReducedMotion();
  const t = useTranslations("Experience");

  if (!experience || experience.length === 0) return null;

  return (
    <section
      id="experience"
      className="relative py-20 md:py-28 px-6"
      aria-label={t("sectionLabel")}
      style={{ backgroundColor: "color-mix(in oklab, var(--surface-dark) 30%, var(--paper))" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Editorial header */}
        <motion.header
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-12 gap-4 md:gap-6 mb-12"
        >
          <div className="col-span-12 md:col-span-3">
            <p
              className="font-mono text-[10px] uppercase tracking-[0.3em]"
              style={{ color: "var(--accent-2)" }}
            >
              {t("eyebrow")}
            </p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2
              className="font-heading text-4xl md:text-5xl font-bold"
              style={{ color: "var(--ink)" }}
            >
              {t("title")}
            </h2>
          </div>
        </motion.header>

        {/* Editorial timeline */}
        <div className="space-y-12">
          {experience.map((entry, index) => (
            <motion.article
              key={entry.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: shouldReduceMotion ? 0 : Math.min(index * 0.1, 0.3),
              }}
              className="grid grid-cols-12 gap-4 md:gap-6 pb-8 border-b"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="col-span-12 md:col-span-3">
                <span
                  className="inline-block px-3 py-1 font-mono text-xs uppercase tracking-wide font-bold border"
                  style={{
                    backgroundColor: "color-mix(in oklab, var(--accent-2) 20%, transparent)",
                    color: "var(--accent-3)",
                    borderColor: "var(--accent-2)",
                  }}
                >
                  {entry.period}
                </span>
              </div>
              <div className="col-span-12 md:col-span-9">
                <h3
                  className="font-heading text-xl md:text-2xl font-bold mb-1"
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
                  className="text-sm md:text-base leading-relaxed mb-4"
                  style={{ color: "var(--ink)", opacity: 0.85 }}
                >
                  {entry.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {entry.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 font-mono text-[10px] uppercase tracking-wide border"
                      style={{
                        backgroundColor: "transparent",
                        color: "var(--ink)",
                        borderColor: "var(--border)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
