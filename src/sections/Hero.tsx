"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { contentData } from "@/content/data";

export default function HeroSection() {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const shouldReduceMotion = useReducedMotion();

  const name = contentData.profile.name;
  const tagline = contentData.profile.tagline;
  const vision = "Ser el puente tecnológico que conecta el potencial latinoamericano con las demandas del mercado global, desarrollando soluciones que resuelvan problemas locales con estándares internacionales.";

  return (
    <section
      id="hero"
      className="relative py-20 md:py-28 px-6"
      aria-label={t("sectionLabel")}
    >
      <div className="max-w-5xl mx-auto">
        {/* Editorial grid: meta | hero | meta-side */}
        <div className="grid grid-cols-12 gap-4 md:gap-6 items-end">
          {/* Eyebrow col izq */}
          <div className="col-span-12 md:col-span-3 mb-4 md:mb-0">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 border"
              style={{
                backgroundColor: "color-mix(in oklab, var(--surface) 90%, transparent)",
                borderColor: "var(--border)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: "var(--accent-1)" }}
                aria-hidden="true"
              />
              <span
                className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold"
                style={{ color: "var(--ink)" }}
              >
                {t("statusLabel") || "ON AIR · BUILDING"}
              </span>
            </div>
            <p
              className="font-mono text-[10px] uppercase tracking-[0.2em] mt-4 opacity-60"
              style={{ color: "var(--ink)" }}
            >
              {new Date().getFullYear()} / PORTFOLIO / SVO
            </p>
          </div>

          {/* H1 col central */}
          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="col-span-12 md:col-span-9 font-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight"
            style={{ color: "var(--ink)" }}
          >
            {name}
          </motion.h1>
        </div>

        {/* Tagline + Vision editorial */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-12 gap-4 md:gap-6 mt-10 md:mt-14"
        >
          <div className="col-span-12 md:col-span-3">
            <p
              className="font-mono text-[10px] uppercase tracking-[0.2em] mb-2"
              style={{ color: "var(--accent-2)" }}
            >
              ROLE
            </p>
            <p
              className="font-mono text-xs uppercase tracking-wide font-bold"
              style={{ color: "var(--ink)" }}
            >
              {tagline}
            </p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <p
              className="font-mono text-[10px] uppercase tracking-[0.2em] mb-2"
              style={{ color: "var(--accent-2)" }}
            >
              VISION
            </p>
            <p
              className="text-lg md:text-xl leading-relaxed max-w-2xl"
              style={{ color: "var(--ink)", opacity: 0.85 }}
            >
              {vision}
            </p>
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 md:mt-16 flex flex-wrap items-center gap-4"
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
            className="group inline-flex items-center gap-2 px-6 py-3 font-heading font-bold text-sm uppercase tracking-wider transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              backgroundColor: "var(--accent-1)",
              color: "var(--paper)",
              boxShadow: "4px 4px 0 var(--ink)",
            }}
          >
            <span>{t("heroCTA") || "Solicitar Consulta Técnica"}</span>
            <span aria-hidden="true">→</span>
          </a>

          <Link
            href={`/${locale}/resume`}
            className="inline-flex items-center gap-2 px-6 py-3 font-heading font-bold text-sm uppercase tracking-wider border transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              backgroundColor: "transparent",
              color: "var(--ink)",
              borderColor: "var(--border)",
            }}
          >
            <span>{t("heroCV") || "Descargar Currículum"}</span>
          </Link>

          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 px-6 py-3 font-heading font-bold text-sm uppercase tracking-wider border transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              backgroundColor: "transparent",
              color: "var(--ink)",
              borderColor: "var(--border)",
            }}
          >
            <span>Blog</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}