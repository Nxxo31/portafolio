"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { contentData } from "@/content/data";
import type { Project } from "@/types/content";

// Filtros identificados por clave de traducción (no por string de display)
const FILTER_KEYS = ["all", "featured", "frontend", "backend", "data-ai"] as const;
type FilterKey = (typeof FILTER_KEYS)[number];
const FILTER_LABEL_KEY: Record<FilterKey, string> = {
  "all": "filterAll",
  "featured": "filterFeatured",
  "frontend": "filterFrontend",
  "backend": "filterBackend",
  "data-ai": "filterDataAI",
};

// Map project slug → filter key
const PROJECT_CATEGORY: Record<string, FilterKey> = {
  nam: "frontend",
  "synthetic-trader": "backend",
  "e14-fraud-detector": "data-ai",
  "contract-guard": "backend",
  "supply-radar": "backend",
  "grani-usco": "frontend",
  "flag-edge": "backend",
};

function matchesFilter(project: Project, filter: FilterKey): boolean {
  if (filter === "all") return true;
  if (filter === "featured") return project.featured;
  return PROJECT_CATEGORY[project.slug] === filter;
}

export default function ProjectsSection() {
  const shouldReduceMotion = useReducedMotion();
  const t = useTranslations("Projects");
  const projects = contentData.projects;
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const filtered = projects.filter((p) => matchesFilter(p, activeFilter));

  return (
    <section
      id="projects"
      className="relative py-24 px-6"
      aria-label={t("sectionLabel")}
      style={{ backgroundColor: "var(--paper)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <p
            className="font-mono text-sm tracking-[0.3em] uppercase mb-2"
            style={{ color: "var(--accent-1)" }}
          >
            {t("eyebrow")}
          </p>
          <h2
            className="font-heading text-5xl md:text-6xl font-bold"
            style={{ color: "var(--ink)" }}
          >
            {t("title")}
          </h2>
        </motion.div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-12">
          {FILTER_KEYS.map((fk) => {
            const isActive = activeFilter === fk;
            return (
              <button
                key={fk}
                onClick={() => setActiveFilter(fk)}
                className="font-mono text-xs uppercase tracking-wide px-4 py-2 border-2 transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
                style={{
                  backgroundColor: isActive ? "var(--ink)" : "var(--surface)",
                  color: isActive ? "var(--paper)" : "var(--ink)",
                  borderColor: "var(--ink)",
                  boxShadow: isActive ? "none" : "3px 3px 0 var(--ink)",
                }}
                aria-pressed={isActive}
              >
                {t(FILTER_LABEL_KEY[fk])}
              </button>
            );
          })}
        </div>

        {/* Grid de proyectos */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, index) => (
            <motion.article
              key={project.slug}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.35,
                delay: shouldReduceMotion ? 0 : Math.min(index * 0.08, 0.4),
              }}
              className="group relative flex flex-col p-5 transition-all duration-150 hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0"
              style={{
                backgroundColor: "var(--surface)",
                border: "2px solid var(--ink)",
                boxShadow: "6px 6px 0 var(--ink)",
              }}
            >
              {/* Featured badge */}
              {project.featured && (
                <span
                  className="absolute -top-3 -right-3 font-mono text-[10px] font-bold uppercase tracking-wide px-2 py-1 border-2"
                  style={{
                    backgroundColor: "var(--accent-3)",
                    color: "var(--ink)",
                    borderColor: "var(--ink)",
                  }}
                  aria-label={t("featuredAria")}
                >
                  {t("featuredBadge")}
                </span>
              )}

              {/* Título + role */}
              <header className="mb-3">
                <h3
                  className="font-heading text-xl font-bold leading-tight mb-1"
                  style={{ color: "var(--ink)" }}
                >
                  {project.title}
                </h3>
                <p
                  className="font-mono text-[11px] uppercase tracking-wide"
                  style={{ color: "var(--accent-1)" }}
                >
                  {project.role}
                </p>
              </header>

              {/* Descripción */}
              <p
                className="font-mono text-sm leading-relaxed mb-4 flex-grow"
                style={{ color: "var(--ink)" }}
              >
                {project.shortDescription}
              </p>

              {/* Stack tags */}
              <ul className="flex flex-wrap gap-1.5 mb-4" role="list">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="font-mono text-[10px] uppercase tracking-wide px-2 py-1 border-2"
                    style={{
                      backgroundColor: "var(--accent-2)",
                      color: "var(--ink)",
                      borderColor: "var(--ink)",
                    }}
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              {/* Impact line */}
              {project.impact && (
                <p
                  className="font-mono text-xs mb-4 pt-3 border-t-2"
                  style={{
                    color: "var(--ink)",
                    borderColor: "var(--ink)",
                  }}
                >
                  <span className="font-bold">{t("impactLabel")}</span> {project.impact}
                </p>
              )}

              {/* Links */}
              <footer className="flex flex-wrap gap-2 mt-auto">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs uppercase tracking-wide font-bold px-3 py-2 border-2 transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
                    style={{
                      backgroundColor: "var(--ink)",
                      color: "var(--paper)",
                      borderColor: "var(--ink)",
                    }}
                    aria-label={t("codeLinkAria", { title: project.title })}
                  >
                    {t("codeLink")}
                  </a>
                )}
                <a
                  href={`/projects/${project.slug}`}
                  className="font-mono text-xs uppercase tracking-wide font-bold px-3 py-2 border-2 transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
                  style={{
                    backgroundColor: "var(--surface)",
                    color: "var(--ink)",
                    borderColor: "var(--ink)",
                  }}
                  aria-label={t("detailLinkAria", { title: project.title })}
                >
                  {t("detailLink")}
                </a>
              </footer>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
