"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

interface PillarCardProps {
  eyebrow: string;
  title: string;
  body: string;
  accentVar: string;
  delay?: number;
}

function PillarCard({
  eyebrow,
  title,
  body,
  accentVar,
  delay = 0,
}: PillarCardProps) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.45, delay }}
      className="p-6 flex flex-col gap-3 h-full"
      style={{
        backgroundColor: "color-mix(in oklab, var(--surface) 70%, transparent)",
        borderLeft: `2px solid ${accentVar}`,
      }}
    >
      <span
        className="font-mono text-[10px] uppercase tracking-[0.3em]"
        style={{ color: accentVar }}
      >
        {eyebrow}
      </span>
      <h3
        className="font-heading text-xl md:text-2xl font-bold leading-tight"
        style={{ color: "var(--ink)" }}
      >
        {title}
      </h3>
      <p
        className="text-sm md:text-base leading-relaxed"
        style={{ color: "var(--ink)", opacity: 0.85 }}
      >
        {body}
      </p>
    </motion.article>
  );
}

export default function AboutSection() {
  const t = useTranslations("About");
  const shouldReduceMotion = useReducedMotion();

  const pillars = [
    { key: "mission", accent: "var(--accent-1)" },
    { key: "vision", accent: "var(--accent-2)" },
    { key: "values", accent: "var(--accent-5)" },
    { key: "ambitions", accent: "var(--accent-3)" },
  ] as const;

  return (
    <section
      id="about"
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
              {t("eyebrow")}
            </p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2
              className="font-heading text-4xl md:text-5xl font-bold mb-3"
              style={{ color: "var(--ink)" }}
            >
              {t("title")}
            </h2>
            <p
              className="text-base md:text-lg leading-relaxed max-w-2xl"
              style={{ color: "var(--ink)", opacity: 0.85 }}
            >
              {t("intro")}
            </p>
          </div>
        </motion.header>

        {/* Pillars grid */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {pillars.map((p, i) => (
            <PillarCard
              key={p.key}
              eyebrow={t(`${p.key}.eyebrow`)}
              title={t(`${p.key}.title`)}
              body={t(`${p.key}.body`)}
              accentVar={p.accent}
              delay={i * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
