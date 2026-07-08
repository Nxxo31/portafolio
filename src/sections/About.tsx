"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-32 px-6 z-10"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#7c5cff]/20 to-[#22d3ee]/20 backdrop-blur-sm">
              {/* Placeholder for profile image */}
              <div className="absolute inset-0 flex items-center justify-center text-[#a3a3b8]">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              {/* Decorative elements */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#7c5cff] to-[#22d3ee] rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl" />
            </div>
          </motion.div>

          {/* Bio Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-[#a3a3b8] bg-clip-text text-transparent">
              Sobre Mí
            </h2>
            
            <div className="space-y-4 text-[#a3a3b8] leading-relaxed">
              <p>
                Soy un <span className="text-[#22d3ee]">Ingeniero de Software</span> apasionado por crear 
                experiencias digitales que trasciendan lo ordinario. Mi trabajo se centra en el desarrollo 
                de aplicaciones web robustas, arquitecturas escalables y soluciones impulsadas por IA.
              </p>
              <p>
                Con experiencia en el ecosistema <span className="text-[#7c5cff]">Next.js</span>, 
                <span className="text-[#7c5cff]"> React</span>, y <span className="text-[#7c5cff]">Node.js</span>, 
                disfruto transformando ideas complejas en código elegante y funcional. 
                Cada proyecto es una nueva constelación por explorar.
              </p>
              <p>
                Actualmente construyendo el futuro del software desde 
                <span className="text-[#f5c451]"> Colombia</span> para el mundo.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-8">
              {["GitHub", "LinkedIn", "Twitter"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="px-4 py-2 rounded-full border border-white/10 text-[#a3a3b8] hover:text-white hover:border-[#22d3ee] hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-300 text-sm"
                >
                  {social}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
