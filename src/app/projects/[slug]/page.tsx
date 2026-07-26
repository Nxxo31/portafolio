"use client";

import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { contentData } from "@/content/data";

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = contentData.projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#05050e] text-white pt-24 px-6">
      <div className="max-w-4xl mx-auto py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Back button */}
          <a
            href="/#projects"
            className="inline-flex items-center gap-2 text-[#a3a3b8] hover:text-[#22d3ee] transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            Volver a proyectos
          </a>

          {/* Project header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#7c5cff] to-[#22d3ee] bg-clip-text text-transparent">
              {project.title}
            </h1>
            <p className="text-[#a3a3b8] text-lg mb-4">{project.fullDescription}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-sm rounded-full bg-white/5 text-[#22d3ee] border border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <span className="text-sm text-[#a3a3b8]">
                <span className="text-[#7c5cff]">Rol:</span> {project.role}
              </span>
              {project.impact && (
                <span className="text-sm text-[#a3a3b8]">
                  <span className="text-[#f5c451]">Impacto:</span> {project.impact}
                </span>
              )}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-4 mb-16">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#7c5cff] to-[#22d3ee] text-white font-medium hover:shadow-[0_0_30px_rgba(124,92,255,0.4)] transition-all duration-300"
              >
                Ver Repositorio
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl border border-white/10 text-[#a3a3b8] hover:text-white hover:border-[#22d3ee] transition-all duration-300"
              >
                Demo en Vivo
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}