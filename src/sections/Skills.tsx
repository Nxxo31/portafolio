"use client";

import { motion } from "framer-motion";

interface Skill {
  name: string;
  level: number;
  category: string;
}

const SKILLS: Skill[] = [
  // Frontend
  { name: "React / Next.js", level: 95, category: "Frontend" },
  { name: "TypeScript", level: 92, category: "Frontend" },
  { name: "Tailwind CSS", level: 90, category: "Frontend" },
  { name: "Three.js / WebGL", level: 75, category: "Frontend" },
  { name: "Framer Motion", level: 85, category: "Frontend" },
  // Backend
  { name: "Node.js", level: 90, category: "Backend" },
  { name: "Python", level: 88, category: "Backend" },
  { name: "Go", level: 70, category: "Backend" },
  { name: "PostgreSQL", level: 85, category: "Backend" },
  // AI / Data
  { name: "LangChain", level: 80, category: "AI" },
  { name: "TensorFlow", level: 72, category: "AI" },
  { name: "OpenAI API", level: 88, category: "AI" },
  // DevOps
  { name: "Docker", level: 85, category: "DevOps" },
  { name: "GitHub Actions", level: 80, category: "DevOps" },
  { name: "AWS / Vercel", level: 82, category: "DevOps" },
];

const CATEGORIES = ["Frontend", "Backend", "AI", "DevOps"];

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-28 px-6 z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-[#a3a3b8] bg-clip-text text-transparent">
            Habilidades
          </h2>
          <p className="text-[#a3a3b8] max-w-2xl mx-auto">
            Mi arsenal tecnológico. Herramientas que uso para dar vida a ideas y construir constelaciones digitales.
          </p>
        </motion.div>

        {/* Skills Grid by Category */}
        <div className="space-y-12">
          {CATEGORIES.map((category) => {
            const categorySkills = SKILLS.filter((s) => s.category === category);
            return (
              <div key={category}>
                <h3 className="text-lg font-semibold text-[#22d3ee] mb-6 tracking-wider uppercase">
                  {category}
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categorySkills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="group relative p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium text-sm">
                          {skill.name}
                        </span>
                        <span className="text-[#22d3ee] text-xs font-mono">
                          {skill.level}%
                        </span>
                      </div>
                      {/* Progress Bar */}
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1,
                            delay: index * 0.1,
                            ease: "easeOut",
                          }}
                          className="h-full rounded-full bg-gradient-to-r from-[#7c5cff] to-[#22d3ee]"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Orbit decoration */}
        <div className="mt-20 relative h-64 flex items-center justify-center">
          <div className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-[#7c5cff]/20 to-[#22d3ee]/20 animate-pulse" />
          <div className="absolute w-48 h-48 rounded-full border border-[#7c5cff]/10 animate-[spin_10s_linear_infinite]" />
          <div className="absolute w-64 h-64 rounded-full border border-[#22d3ee]/10 animate-[spin_15s_linear_infinite_reverse]" />
          <div className="z-10 text-center">
            <span className="text-[#a3a3b8] text-sm">Siempre aprendiendo</span>
            <p className="text-white font-medium mt-1">Nuevas constelaciones por explorar</p>
          </div>
        </div>
      </div>
    </section>
  );
}
