"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  category: string;
  link: string;
  gradient: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "NexoAccManager",
    description: "Plataforma de gestión de cuentas open-source con arquitectura robusta y enfoque en escalabilidad.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Prisma"],
    category: "Web",
    link: "https://github.com/nxxo31/nexaccmanager",
    gradient: "from-[#7c5cff] to-[#22d3ee]",
  },
  {
    id: 2,
    title: "E14 Audit Platform",
    description: "Sistema de auditoría ciudadana electoral con procesamiento de datos y visualización forense.",
    tech: ["React", "Python", "FastAPI", "Supabase"],
    category: "AI",
    link: "https://github.com/nxxo31/e14-audit-platform",
    gradient: "from-[#f5c451] to-[#7c5cff]",
  },
  {
    id: 3,
    title: "Flag Edge",
    description: "Feature flag management system para despliegue seguro y controlado de funcionalidades.",
    tech: ["Go", "Gin", "Redis", "Docker"],
    category: "DevOps",
    link: "https://github.com/nxxo31/flag-edge",
    gradient: "from-[#22d3ee] to-[#f5c451]",
  },
  {
    id: 4,
    title: "Supply Radar",
    description: "Dashboard de inteligencia de mercados con modelos predictivos y análisis en tiempo real.",
    tech: ["Next.js", "TensorFlow", "D3.js", "Python"],
    category: "AI",
    link: "https://github.com/nxxo31/supply-radar",
    gradient: "from-[#7c5cff] to-[#f5c451]",
  },
  {
    id: 5,
    title: "Grani USCO",
    description: "Plataforma académica para la gestión de proyectos agrícolas con visualización de datos.",
    tech: ["React", "Express", "MongoDB", "Chart.js"],
    category: "Web",
    link: "https://github.com/nxxo31/grani-usco",
    gradient: "from-[#f5c451] to-[#22d3ee]",
  },
  {
    id: 6,
    title: "Contract Guard",
    description: "Herramienta de verificación de contratos inteligentes con análisis de vulnerabilidades.",
    tech: ["Solidity", "Hardhat", "React", "Ethers.js"],
    category: "Web3",
    link: "https://github.com/nxxo31/contract-guard",
    gradient: "from-[#22d3ee] to-[#7c5cff]",
  },
];

const CATEGORIES = ["Todos", "Web", "AI", "DevOps", "Web3"];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filtered =
    activeFilter === "Todos"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="relative py-28 px-6 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-[#a3a3b8] bg-clip-text text-transparent">
            Proyectos
          </h2>
          <p className="text-[#a3a3b8] max-w-2xl mx-auto">
            Explora las constelaciones que he construido. Cada proyecto es un sistema con su propia historia y tecnología.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-[#7c5cff] text-white shadow-[0_0_20px_rgba(124,92,255,0.4)]"
                  : "bg-white/5 text-[#a3a3b8] hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full"
                >
                  <div className="relative h-full p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,92,255,0.15)] hover:-translate-y-1">
                    {/* Category Badge */}
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-[#a3a3b8] mb-4">
                      {project.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#22d3ee] transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[#a3a3b8] text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-1 text-xs rounded-md bg-white/5 text-[#22d3ee] border border-white/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Hover Gradient */}
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
                    />
                  </div>
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
