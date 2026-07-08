"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative py-12 px-6 z-10 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-[#a3a3b8] text-sm">
            © {new Date().getFullYear()} Sebastian Velasco. Construido con Next.js, React & Three.js.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex gap-6"
        >
          {["GitHub", "LinkedIn", "Twitter"].map((social) => (
            <a
              key={social}
              href="#"
              className="text-[#a3a3b8] hover:text-[#22d3ee] transition-colors duration-300 text-sm"
            >
              {social}
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-[#a3a3b8] hover:text-white transition-colors duration-300 text-sm flex items-center gap-2"
          >
            Volver arriba
            <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </footer>
  );
}
