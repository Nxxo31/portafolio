"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { contentData } from "@/content/data";
import NeonText from "@/components/NeonText";
import AudioVisualizer from "@/components/AudioVisualizer";

export default function HeroSection() {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const shouldReduceMotion = useReducedMotion();

  const name = contentData.profile.name;
  const tagline = contentData.profile.tagline;

  return (
    <section
      id="hero"
      className="relative py-24 px-6 scanlines"
      aria-label={t("sectionLabel")}
      style={{ backgroundColor: "transparent" }}
    >
      <div className="max-w-4xl mx-auto text-center relative">
        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          {/* Status pill — live indicator estilo DJ set */}
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 border-2"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--ink)",
              boxShadow: "3px 3px 0 var(--ink)",
            }}
          >
            <span className="pulse-dot" aria-hidden="true" />
            <span
              className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold"
              style={{ color: "var(--ink)" }}
            >
              {t("statusLabel") || "ON AIR · BUILDING"}
            </span>
          </div>

          {/* Glitch h1 */}
          <h1
            className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight glitch"
            data-text={name}
            style={{ color: "var(--ink)" }}
          >
            {name}
          </h1>

          {/* Tagline con NeonText medium */}
          <p
            className="font-mono text-base md:text-lg uppercase tracking-wider mb-2"
            style={{ color: "var(--ink)" }}
          >
            <NeonText intensity="medium" as="span">
              {tagline}
            </NeonText>
          </p>
        </motion.div>

        {/* Visualizer + Vision */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-10"
        >
          {/* Audio visualizer decorativo */}
          <div className="max-w-md mx-auto mb-8 h-20" aria-hidden="true">
            <AudioVisualizer bars={48} maxHeight={80} className="w-full h-full" />
          </div>

          {/* Vision/Mission con fondo translúcido + neon-border */}
          <div
            className="neon-border p-6 max-w-2xl mx-auto"
            style={{
              backgroundColor: "color-mix(in oklab, var(--paper) 88%, transparent)",
            }}
          >
            <p
              className="text-lg md:text-xl leading-relaxed"
              style={{ color: "var(--ink)" }}
            >
              {contentData.profile.name
                ? "Ser el puente tecnológico que conecta el potencial latinoamericano con las demandas del mercado global, desarrollando soluciones que resuelvan problemas locales con estándares internacionales."
                : "Ingeniero de Sistemas especializado en soluciones tecnológicas para el mercado latinoamericano"}
            </p>
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          <a
            href="#contact"
            onClick={() => {
              const el = document.getElementById("contact");
              if (el) {
                el.scrollIntoView({
                  behavior: shouldReduceMotion ? "auto" : "smooth",
                });
              }
            }}
            className="group relative px-6 py-3 font-heading font-bold text-lg uppercase tracking-wider border-2 transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
            style={{
              backgroundColor: "var(--accent-1)",
              color: "var(--ink)",
              borderColor: "var(--ink)",
              boxShadow: "4px 4px 0 var(--ink)",
            }}
          >
            <span className="relative z-10">{t("heroCTA") || "Solicitar Consulta Técnica Gratis"}</span>
            {/* Glow halo on hover */}
            <span
              aria-hidden="true"
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
              style={{
                boxShadow: "0 0 20px var(--accent-1), 0 0 40px var(--accent-2)",
              }}
            />
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
      </div>
    </section>
  );
}