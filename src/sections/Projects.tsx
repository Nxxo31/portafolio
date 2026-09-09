"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { contentData } from "@/content/data";

export default function ProjectsSection() {
  const t = useTranslations("Projects");
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="projects"
      className="relative py-24 px-6"
      aria-label={t("sectionLabel")}
      style={{ backgroundColor: "var(--paper)" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */ }
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-12 text-center"
        >
          <h2
            className="font-heading text-4xl md:text-5xl font-bold"
            style={{ color: "var(--ink)" }}
          >
            {t("title") || "Casos de Estudio"}
          </h2>
          <p
            className="font-mono text-sm tracking-[0.3em] uppercase mb-4"
            style={{ color: "var(--accent-1)" }}
          >
            {t("eyebrow") || "Soluciones que generan resultados medibles de negocio"}
          </p>
          <p
            className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
            style={{ color: "var(--ink)" }}
          >
            {t("description") || "Cada proyecto representa una colaboración profunda donde aplicamos nuestro expertise técnico para resolver desafíos específicos de negocio, con énfasis en resultados medibles y sostenibilidad a largo plazo."}
          </p>
        </motion.div>

        {/* Featured Projects Grid */ }
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {contentData.projects
            .filter(project => project.featured)
            .map((project, index) => (
              <motion.div
                key={project.slug}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="group relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--paper)] px-6 py-8 transition-all duration-200 hover:bg-[var(--accent-50)] hover:border-[var(--accent-200)] hover:shadow-[0_0_0_2px_var(--accent-200)]"
              >
                {/* Project Header */ }
                <div className="mb-4">
                  <h3
                    className="font-heading text-2xl font-semibold"
                    style={{ color: "var(--ink)" }}
                  >
                    {project.title}
                  </h3>
                  {project.client && (
                    <p
                      className="font-mono text-sm tracking-[0.2em] uppercase mb-2"
                      style={{ color: `var(--accent-${((index % 4) + 1)})` }}
                    >
                      Cliente: {project.client}
                    </p>
                  )}
                  {project.industry && (
                    <p
                      className="text-sm"
                      style={{ color: "var(--ink)" }}
                    >
                      Industria: {project.industry}
                    </p>
                  )}
                </div>

                {/* Project Description */ }
                <div className="mb-6">
                  <h4
                    className="font-semibold text-sm mb-2"
                    style={{ color: "var(--ink)" }}
                  >
                    {t("challenge") || "El Desafío"}
                  </h4>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "var(--ink)" }}
                  >
                    {project.challenge || project.shortDescription}
                  </p>
                </div>

                {/* Solution */ }
                <div className="mb-6">
                  <h4
                    className="font-semibold text-sm mb-2"
                    style={{ color: "var(--ink)" }}
                  >
                    {t("solution") || "Nuestra Solución"}
                  </h4>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "var(--ink)" }}
                  >
                    {project.solution || project.fullDescription}
                  </p>
                </div>

                {/* Results and Metrics */ }
                <div className="mb-6">
                  <h4
                    className="font-semibold text-sm mb-2"
                    style={{ color: "var(--ink)" }}
                  >
                    {t("results") || "Resultados"}
                  </h4>
                  <div className="space-y-2">
                    {project.results && (
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--ink)" }}
                      >
                        {project.results}
                      </p>
                    )}
                    {project.metrics && (
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--ink)" }}
                      >
                        {project.metrics}
                      </p>
                    )}
                    {project.impact && (
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--ink)" }}
                      >
                        {project.impact}
                      </p>
                    )}
                  </div>
                </div>

                {/* Testimonial */ }
                {project.testimonial && (
                  <div className="border-l-2 pl-4"
                        style={{
                          borderColor: `var(--accent-${((index % 4) + 1)})`,
                          backgroundColor: `var(--accent-${((index % 4) + 1)})05`
                        }}
                  >
                    <p
                      className="text-sm font-italic leading-relaxed"
                      style={{ color: "var(--ink)" }}
                    >
                      {project.testimonial}
                    </p>
                  </div>
                )}

                {/* Tech Stack */ }
                <div className="mb-4">
                  <h4
                    className="font-semibold text-sm mb-2"
                    style={{ color: "var(--ink)" }}
                  >
                    {t("technologies") || "Tecnologías Utilizadas"}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-0.5 rounded text-xs font-mono"
                        style={{
                          backgroundColor: `var(--accent-${((index % 4) + 1)})10`,
                          color: `var(--accent-${((index % 4) + 1)})`
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Call to Action */ }
                <div className="mt-6">
                  <a
                    href={`/projects/${project.slug}`}
                    className="flex items-center text-sm font-semibold"
                    style={{ color: `var(--accent-${((index % 4) + 1)})` }}
                  >
                    {t("viewDetails") || "Ver caso de estudio completo →"}
                    <span className="ml-1" aria-hidden="true">{'→'}</span>
                  </a>
                </div>
              </motion.div>
            ))}
        </motion.div>

        {/* Call to Action for More Projects */ }
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-16 text-center"
        >
          <p
            className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-6"
            style={{ color: "var(--ink)" }}
          >
            {t("projectsCta") || "¿Tienes un desafío tecnológico que resolver?"}
          </p>
          <a
            href="#contact"
            className="px-6 py-3 font-heading font-bold text-lg uppercase tracking-wider border-2 transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
            style={{
              backgroundColor: "var(--accent-1)",
              color: "var(--ink)",
              borderColor: "var(--ink)",
              boxShadow: "4px 4px 0 var(--ink)",
            }}
          >
            {t("projectsCtaButton") || "Iniciar Conversación"}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
