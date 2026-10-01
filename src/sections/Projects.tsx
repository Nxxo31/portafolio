"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { contentData } from "@/content/data";

export default function ProjectsSection() {
  const t = useTranslations("Projects");
  const locale = useLocale();
  const shouldReduceMotion = useReducedMotion();

  const featured = contentData.projects.filter((p) => p.featured);

  return (
    <section
      id="projects"
      className="relative py-20 md:py-28 px-6"
      aria-label={t("sectionLabel")}
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
              {t("eyebrow") || "// PROJECTS"}
            </p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2
              className="font-heading text-4xl md:text-5xl font-bold"
              style={{ color: "var(--ink)" }}
            >
              {t("title")}
            </h2>
            <p
              className="text-base md:text-lg leading-relaxed max-w-2xl mt-3"
              style={{ color: "var(--ink)", opacity: 0.85 }}
            >
              {t("description") || "Una selección curada de proyectos que muestran cómo abordo problemas técnicos complejos y entrego software en producción."}
            </p>
          </div>
        </motion.header>

        {/* Featured projects - editorial stacked */}
        <div className="space-y-6">
          {featured.map((project, index) => (
            <motion.article
              key={project.slug}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: shouldReduceMotion ? 0 : Math.min(index * 0.08, 0.3),
              }}
              className="grid grid-cols-12 gap-4 md:gap-6 p-6 md:p-8 border hover:-translate-y-0.5 transition-transform duration-150"
              style={{
                backgroundColor: "color-mix(in oklab, var(--surface) 60%, transparent)",
                borderColor: "var(--border)",
              }}
            >
              {/* Index */}
              <div className="col-span-12 md:col-span-1">
                <span
                  className="font-mono text-xs font-bold"
                  style={{ color: "var(--accent-2)" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              {/* Body */}
              <div className="col-span-12 md:col-span-8">
                <h3
                  className="font-heading text-2xl md:text-3xl font-bold mb-2"
                  style={{ color: "var(--ink)" }}
                >
                  {project.title}
                </h3>
                <p
                  className="text-sm md:text-base leading-relaxed mb-4"
                  style={{ color: "var(--ink)", opacity: 0.85 }}
                >
                  {project.shortDescription || project.challenge}
                </p>
                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {project.stack.slice(0, 6).map((tech) => (
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
              {/* CTA */}
              <div className="col-span-12 md:col-span-3 flex md:items-end md:justify-end">
                <Link
                  href={`/${locale}/projects/${project.slug}`}
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide font-bold transition-all duration-150 hover:translate-x-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{ color: "var(--accent-1)" }}
                >
                  {t("viewDetails") || "Detalle"}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Ver todos */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 px-6 py-3 font-heading font-bold text-sm uppercase tracking-wider border transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              backgroundColor: "transparent",
              color: "var(--ink)",
              borderColor: "var(--border)",
            }}
          >
            <span>{t("projectsCta") || "Ver todos los proyectos"}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
