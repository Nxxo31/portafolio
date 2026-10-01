"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { contentData } from "@/content/data";
import type { SkillCategory } from "@/types/content";

const CATEGORY_ORDER: SkillCategory[] = [
  "frontend",
  "backend",
  "ai-agents",
  "devops",
  "data",
];

const CATEGORY_LABEL_KEY: Record<SkillCategory, string> = {
  frontend: "catFrontend",
  backend: "catBackend",
  "ai-agents": "catAIAgents",
  devops: "catDevops",
  data: "catData",
};

const CATEGORY_ACCENT: Record<SkillCategory, string> = {
  frontend: "var(--accent-1)",
  backend: "var(--accent-2)",
  "ai-agents": "var(--accent-3)",
  devops: "var(--accent-4)",
  data: "var(--accent-5)",
};

export default function SkillsSection() {
  const shouldReduceMotion = useReducedMotion();
  const t = useTranslations("Skills");
  const skills = contentData.skills;
  const categories = CATEGORY_ORDER.filter((cat) =>
    skills.some((s) => s.category === cat),
  );

  return (
    <section
      id="skills"
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

        {/* Skills grid editorial */}
        <div className="space-y-10">
          {categories.map((category) => {
            const categorySkills = skills.filter((s) => s.category === category);
            const accent = CATEGORY_ACCENT[category];

            return (
              <div key={category}>
                <h3
                  className="font-mono text-sm font-bold mb-4 uppercase tracking-wider"
                  style={{ color: accent }}
                >
                  ▶ {t(CATEGORY_LABEL_KEY[category])}
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {categorySkills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: shouldReduceMotion ? 0 : Math.min(index * 0.05, 0.25),
                      }}
                      className="flex items-center justify-between gap-3 p-3 border"
                      style={{
                        backgroundColor: "color-mix(in oklab, var(--surface) 60%, transparent)",
                        borderColor: "var(--border)",
                      }}
                    >
                      <span
                        className="font-heading font-bold text-sm"
                        style={{ color: "var(--ink)" }}
                      >
                        {skill.name}
                      </span>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="flex gap-0.5" aria-hidden="true">
                          {[1, 2, 3, 4, 5].map((dot) => (
                            <span
                              key={dot}
                              className="w-1.5 h-1.5 rounded-full"
                              style={{
                                backgroundColor:
                                  dot <= skill.proficiency
                                    ? accent
                                    : "var(--border)",
                              }}
                            />
                          ))}
                        </div>
                        <span
                          className="font-mono text-[10px] opacity-60"
                          style={{ color: "var(--ink)" }}
                        >
                          {skill.yearsExperience}{t("yearsSuffix")}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
