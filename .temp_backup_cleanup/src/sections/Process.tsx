"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { contentData } from "@/content/data";

export default function ProcessSection() {
  const t = useTranslations("Process");
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="process"
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
            {t("title") || "Nuestro Proceso de Trabajo"}
          </h2>
          <p
            className="font-mono text-sm tracking-[0.3em] uppercase mb-4"
            style={{ color: "var(--accent-1)" }}
          >
            {t("eyebrow") || "Transparencia, colaboración y resultados medibles"}
          </p>
          <p
            className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
            style={{ color: "var(--ink)" }}
          >
            {t("description") || "Hemos diseñado un proceso claro y colaborativo que minimiza riesgos, maximiza la alineación y garantiza que cada fase entregue valor tangible. Desde el descubrimiento inicial hasta la optimización continua, trabajamos como una extensión de su equipo."}
          </p>
        </motion.div>

        {/* Process Steps */ }
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {contentData.businessModel.proceso.map((step, index) => (
            <motion.div
              key={index}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="group relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--paper)] px-6 py-8 transition-all duration-200 hover:bg-[var(--accent-50)] hover:border-[var(--accent-200)] hover:shadow-[0_0_0_2px_var(--accent-200)]"
            >
              {/* Step Number and Title */ }
              <div className="flex items-start mb-4">
                <div
                  className="flex w-10 h-10 items-center justify-center rounded-xl font-heading text-2xl"
                  style={{
                    backgroundColor: `var(--accent-${((index % 4) + 1)})20`,
                    color: `var(--accent-${((index % 4) + 1)})`
                  }}
                >
                  {step.paso}
                </div>
                <div className="ml-4">
                  <h3
                    className="font-heading text-xl font-semibold"
                    style={{ color: "var(--ink)" }}
                  >
                    {step.titulo}
                  </h3>
                  {step.descripcion && (
                    <p
                      className="text-sm font-mono tracking-[0.2em] uppercase mb-2"
                      style={{ color: `var(--accent-${((index % 4) + 1)})` }}
                    >
                      {step.descripcion}
                    </p>
                  )}
                </div>
              </div>

              {/* Step Details */ }
              <div className="space-y-3">
                {step.detalles.map((detail, detailIndex) => (
                  <motion.div
                    key={detailIndex}
                    initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
                    whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    className="flex items-start space-x-3"
                  >
                    <span className="flex-shrink-0 mt-0.5">
                      •
                    </span>
                    <span className="text-base leading-relaxed"
                          style={{ color: "var(--ink)" }}>
                      {detail.replace(/\*\*(.*?)\*\*/g, '$1')} {/* Remove markdown bold */}
                    </span>
                  </motion.div>
                ))}
              </div>
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
            {t("processCta") || "¿Listo para comenzar tu transformación tecnológica?"}
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
            {t("processCtaButton") || "Solicitar Consulta Gratis"}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

