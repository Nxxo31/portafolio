"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ROLES = [
  "Full-Stack Developer",
  "AI Architect",
  "DevOps Engineer",
  "Open Source Contributor",
  "Constellation Builder",
];

export default function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = ROLES[currentRole];
    const speed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < role.length) {
          setDisplayText(role.slice(0, displayText.length + 1));
        } else {
          // Pause then delete
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRole]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6"
    >
      <div className="text-center max-w-4xl">
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[#22d3ee] text-lg md:text-xl mb-4 tracking-widest uppercase"
        >
          Hola, soy
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-white via-[#f4f4f8] to-[#a3a3b8] bg-clip-text text-transparent">
            Sebastian
          </span>
          <br />
          <span className="bg-gradient-to-r from-[#7c5cff] to-[#22d3ee] bg-clip-text text-transparent">
            Velasco
          </span>
        </motion.h1>

        {/* Typewriter Role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="h-12 md:h-16 flex items-center justify-center mb-8"
        >
          <span className="text-xl md:text-2xl lg:text-3xl text-[#a3a3b8] font-light">
            {displayText}
            <span className="animate-pulse text-[#22d3ee]">|</span>
          </span>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <button
            onClick={() => {
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative px-8 py-4 bg-gradient-to-r from-[#7c5cff] to-[#22d3ee] rounded-full font-semibold text-white text-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(124,92,255,0.4)] hover:scale-105"
          >
            <span className="relative z-10">Explorar Constelación</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#22d3ee] to-[#7c5cff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-[#a3a3b8]">
            <span className="text-sm tracking-wider">Scroll para explorar</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
