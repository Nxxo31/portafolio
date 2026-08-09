"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { contentData } from "@/content/data";
import type { SkillCategory } from "@/types/content";

// Labels ahora provienen de translations (Skills namespace).

const CATEGORY_COLOR: Record<SkillCategory, string> = {
  frontend: "var(--accent-1)",
  backend: "var(--accent-2)",
  "ai-agents": "var(--accent-3)",
  devops: "var(--accent-4)",
  data: "var(--accent-5)",
};

const CATEGORY_ORDER: SkillCategory[] = [
  "frontend",
  "backend",
  "ai-agents",
  "devops",
  "data",
];

export default function SkillsSection() {
  const shouldReduceMotion = useReducedMotion();
  const t = useTranslations("Skills");
  const skills = contentData.skills;

  const categories = CATEGORY_ORDER.filter((cat) =>
    skills.some((s) => s.category === cat),
  );

  const CATEGORY_LABEL_KEY: Record<SkillCategory, string> = {
    frontend: "catFrontend",
    backend: "catBackend",
    "ai-agents": "catAIAgents",
    devops: "catDevops",
    data: "catData",
  };

  return (
    <section
      id="skills"
      className="relative py-24 px-6"
      aria-label={t("sectionLabel")}
      style={{ backgroundColor: "var(--surface-dark)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <p
            className="font-mono text-sm tracking-[0.3em] uppercase mb-2"
            style={{ color: "var(--accent-3)" }}
          >
            {t("eyebrow")}
          </p>
          <h2
            className="font-heading text-5xl md:text-6xl font-bold"
            style={{ color: "var(--paper)" }}
          >
            {t("title")}
          </h2>
        </motion.div>

        {/* Grid por categoría */}
        <div className="space-y-10">
          {categories.map((category) => {
            const categorySkills = skills.filter((s) => s.category === category);
            const accent = CATEGORY_COLOR[category];

            return (
              <div key={category}>
                <h3
                  className="font-mono text-base font-bold mb-4 uppercase tracking-wide"
                  style={{ color: accent }}
                >
                  ▶ {t(CATEGORY_LABEL_KEY[category])}
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categorySkills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={
                        shouldReduceMotion ? false : { opacity: 0, x: -20 }
                      }
                      whileInView={
                        shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }
                      }
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.35,
                        delay: shouldReduceMotion ? 0 : Math.min(index * 0.06, 0.3),
                      }}
                      className="p-4 transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5"
                      style={{
                        backgroundColor: "var(--surface)",
                        border: "2px solid var(--ink)",
                        boxShadow: "4px 4px 0 var(--ink)",
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className="font-heading font-bold text-sm"
                          style={{ color: "var(--ink)" }}
                        >
                          {skill.name}
                        </span>
                        <span
                          className="font-mono text-xs font-bold"
                          style={{ color: "var(--ink)" }}
                        >
                          {skill.yearsExperience}{t("yearsSuffix")}
                        </span>
                      </div>

                      {/* Proficiency bar hard */}
                      <div
                        className="w-full h-3 border-2"
                        style={{
                          backgroundColor: "var(--paper)",
                          borderColor: "var(--ink)",
                        }}
                        role="progressbar"
                        aria-valuenow={skill.proficiency}
                        aria-valuemin={0}
                        aria-valuemax={5}
                        aria-label={t("proficiencyAria", { name: skill.name, level: skill.proficiency })}
                      >
                        <motion.div
                          initial={
                            shouldReduceMotion
                              ? { width: `${(skill.proficiency / 5) * 100}%` }
                              : { width: 0 }
                          }
                          whileInView={{
                            width: `${(skill.proficiency / 5) * 100}%`,
                          }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.6,
                            delay: shouldReduceMotion ? 0 : index * 0.06,
                          }}
                          className="h-full"
                          style={{ backgroundColor: accent }}
                        />
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
