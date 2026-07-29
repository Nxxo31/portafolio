"use client";

import { motion, useReducedMotion } from "framer-motion";
import { contentData } from "@/content/data";

export default function ExperienceSection() {
  const experience = contentData.experience;
  const shouldReduceMotion = useReducedMotion();

  if (!experience || experience.length === 0) return null;

  return (
    <section id="experience" className="relative py-28 px-6 z-10" aria-label="Experiencia profesional">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-[#a3a3b8] bg-clip-text text-transparent">
            Experiencia
          </h2>
          <p className="text-[#a3a3b8] max-w-2xl mx-auto">
            Mi trayectoria profesional. Cada rol es una estrella en la constelación de mi carrera.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#7c5cff] via-[#22d3ee] to-transparent" />

          <div className="space-y-12">
            {experience.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: shouldReduceMotion ? 0 : index * 0.15, duration: 0.6 }}
                className="relative pl-12 md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-2 md:left-6 top-1 w-5 h-5 rounded-full bg-[#05050e] border-2 border-[#22d3ee] shadow-[0_0_12px_rgba(34,211,238,0.3)]" aria-hidden="true" />

                {/* Period badge */}
                <span className="inline-block px-3 py-1 text-xs font-mono rounded-full bg-[#7c5cff]/20 text-[#7c5cff] border border-[#7c5cff]/20 mb-3">
                  {entry.period}
                </span>

                <h3 className="text-xl font-bold text-white mb-1">{entry.role}</h3>
                <p className="text-[#22d3ee] text-sm mb-3">{entry.company}</p>
                <p className="text-[#a3a3b8] text-sm leading-relaxed mb-4">
                  {entry.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {entry.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs rounded-md bg-white/5 text-[#a3a3b8] border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}