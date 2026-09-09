"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { contentData } from "@/content/data";

export default function ServicesSection() {
  const t = useTranslations("Services");
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="services"
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
            {t("title") || "Nuestros Servicios Especializados"}
          </h2>
          <p
            className="font-mono text-sm tracking-[0.3em] uppercase mb-4"
            style={{ color: "var(--accent-1)" }}
          >
            {t("eyebrow") || "Soluciones a medida para el mercado latinoamericano"}
          </p>
          <p
            className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
            style={{ color: "var(--ink)" }}
          >
            {t("description") || "Desarrollamos tecnología que combina rigor técnico global con comprensión profunda del contexto latinoamericano, enfocándonos en resultados medibles de negocio y sostenibilidad a largo plazo."}
          </p>
        </motion.div>

        {/* Services Grid */ }
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {contentData.businessModel.servicios.map((service, index) => (
            <motion.div
              key={index}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="group relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--paper)] px-6 py-8 transition-all duration-200 hover:bg-[var(--accent-50)] hover:border-[var(--accent-200)] hover:shadow-[0_0_0_2px_var(--accent-200)]"
            >
              {/* Service Icon */ }
              <div className="flex w-12 h-12 items-center justify-center rounded-xl mb-6"
                    style={{
                      backgroundColor: `var(--accent-${((index % 4) + 1)})20`,
                      color: `var(--accent-${((index % 4) + 1)})`
                    }}
              >
                {service.icon}
              </div>

              {/* Service Title */ }
              <h3
                className="font-heading text-2xl font-semibold mb-4"
                style={{ color: "var(--ink)" }}
              >
                {service.title}
              </h3>

              {/* Service Description */ }
              <p
                className="text-base leading-relaxed mb-6"
                style={{ color: "var(--ink)" }}
              >
                {service.shortDescription}
              </p>

              {/* Especialidades */ }
              {service.especialidades && service.especialidades.length > 0 && (
                <div className="mb-6">
                  <h4
                    className="font-semibold text-sm mb-2"
                    style={{ color: "var(--ink)" }}
                  >
                    {t("specialties") || "Especialidades"}
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm"
                        style={{ color: "var(--ink)" }}>
                    {service.especialidades.map((especialidad, especialidadIndex) => (
                      <li key={especialidadIndex}>
                        {especialidad}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tecnologías */ }
              {service.tecnologias && service.tecnologias.length > 0 && (
                <div className="mb-6">
                  <h4
                    className="font-semibold text-sm mb-2"
                    style={{ color: "var(--ink)" }}
                  >
                    {t("technologies") || "Tecnologías"}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {service.tecnologias.map((tecnologia, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 rounded text-xs font-mono"
                        style={{
                          backgroundColor: `var(--accent-${((index % 4) + 1)})10`,
                          color: `var(--accent-${((index % 4) + 1)})`
                        }}
                      >
                        {tecnologia}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Learn More Link */ }
              <a
                href="#contact"
                className="flex items-center text-sm font-semibold"
                style={{ color: `var(--accent-${((index % 4) + 1)})` }}
              >
                {t("learnMore") || "Más información →"}
                <span className="ml-1" aria-hidden="true">{'→'}</span>
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */ }
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
            {t("servicesCta") || "¿Listo para transformar tu desafío en una ventaja tecnológica?"}
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
            {t("servicesCtaButton") || "Solicitar Propuesta"}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
