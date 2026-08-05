"use client";

import { motion, useReducedMotion } from "framer-motion";
import { contentData } from "@/content/data";

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const { name, tagline, githubUrl } = contentData.profile;
  const firstName = name.split(" ")[0];
  const lastName = name.split(" ").slice(1).join(" ");

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 pt-20"
      aria-label="Sección de inicio"
    >
      <div className="text-center max-w-5xl">
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="font-mono text-sm md:text-base mb-6 tracking-[0.3em] uppercase font-medium"
          style={{ color: "var(--accent-1)" }}
        >
          {">_ Hola, soy"}
        </motion.p>

        <motion.h1
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="font-heading font-bold leading-[0.95] tracking-tight mb-3"
          style={{ color: "var(--ink)" }}
        >
          <span className="block text-6xl md:text-8xl lg:text-9xl">
            {firstName}
          </span>
          <span className="block text-6xl md:text-8xl lg:text-9xl">
            {lastName}
          </span>
        </motion.h1>

        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="font-mono text-lg md:text-xl mb-10 max-w-2xl mx-auto"
          style={{ color: "var(--ink)" }}
        >
          {tagline}
        </motion.p>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => {
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="font-heading font-bold text-base px-7 py-3 border-2 transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
            style={{
              backgroundColor: "var(--accent-1)",
              color: "var(--ink)",
              borderColor: "var(--ink)",
              boxShadow: "5px 5px 0 var(--ink)",
            }}
            aria-label="Ver proyectos"
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = "8px 8px 0 var(--ink)")
            }
            onMouseDown={(e) =>
              (e.currentTarget.style.boxShadow = "2px 2px 0 var(--ink)")
            }
            onMouseUp={(e) =>
              (e.currentTarget.style.boxShadow = "5px 5px 0 var(--ink)")
            }
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "5px 5px 0 var(--ink)";
              e.currentTarget.style.transform = "";
            }}
          >
            VER PROYECTOS
          </button>

          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading font-bold text-base px-7 py-3 border-2 transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
            style={{
              backgroundColor: "var(--paper)",
              color: "var(--ink)",
              borderColor: "var(--ink)",
              boxShadow: "5px 5px 0 var(--ink)",
            }}
            aria-label="Ver GitHub de Sebastián Velasco"
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = "8px 8px 0 var(--ink)")
            }
            onMouseDown={(e) =>
              (e.currentTarget.style.boxShadow = "2px 2px 0 var(--ink)")
            }
            onMouseUp={(e) =>
              (e.currentTarget.style.boxShadow = "5px 5px 0 var(--ink)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow = "5px 5px 0 var(--ink)")
            }
          >
            GITHUB ↗
          </a>
        </motion.div>
      </div>
    </section>
  );
}
