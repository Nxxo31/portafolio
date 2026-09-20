"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { contentData } from "@/content/data";

export default function HeroSection() {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative py-24 px-6"
      aria-label={t("sectionLabel")}
      style={{ backgroundColor: "var(--paper)" }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */ }
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1
            className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
            style={{ color: "var(--ink)" }}
          >
            {contentData.profile.name || contentData.profile.name}
          </h1>
          <p
            className="font-mono text-base md:text-lg uppercase tracking-wider mb-6"
            style={{ color: "var(--accent-1)" }}
          >
            {contentData.profile.tagline || contentData.profile.tagline}
          </p>
        </motion.div>

        {/* Vision/Mission */ }
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-10"
        >
          <p
            className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
            style={{ color: "var(--ink)" }}
          >
            {contentData.profile.name ? "Ser el puente tecnológico que conecta el potencial latinoamericano con las demandas del mercado global, desarrollando soluciones que resuelvan problemas locales con estándares internacionales." : "Ingeniero de Sistemas especializado en soluciones tecnológicas para el mercado latinoamericano"}
          </p>
        </motion.div>

        {/* Call to Action */ }
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="space-x-4 sm:space-x-6"
        >
          <a
            href="#contact"
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) {
                el.scrollIntoView({
                  behavior: shouldReduceMotion ? "auto" : "smooth",
                });
              }
            }}
            className="px-6 py-3 font-heading font-bold text-lg uppercase tracking-wider border-2 transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
            style={{
              backgroundColor: "var(--accent-1)",
              color: "var(--ink)",
              borderColor: "var(--ink)",
              boxShadow: "4px 4px 0 var(--ink)",
            }}
          >
            {t("heroCTA") || "Solicitar Consulta Técnica Gratis"}
          </a>

          <Link
                      href={`/${locale}/resume`}
                      className="px-6 py-3 font-heading font-bold text-lg uppercase tracking-wider border-2 transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
                      style={{
                        backgroundColor: "transparent",
                        color: "var(--ink)",
                        borderColor: "var(--ink)",
                        boxShadow: "4px 4px 0 var(--ink)",
                      }}
                    >
                      {t("heroCV") || "Descargar Currículum"}
                    </Link>
        </motion.div>

        {/* Optional: Animated background or decorative elements */ }
        {/* Keep existing Three.js canvas or other visual elements if desired */ }
      </div>
    </section>
  );
}

