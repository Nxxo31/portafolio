"use client";

import { motion, useReducedMotion } from "framer-motion";
import { contentData } from "@/content/data";

export default function ServicesSection() {
  const services = contentData.services;
  const shouldReduceMotion = useReducedMotion();

  if (!services || services.length === 0) return null;

  return (
    <section
      id="services"
      className="relative py-24 px-6"
      aria-label="Servicios"
      style={{ backgroundColor: "var(--paper)" }}
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
            style={{ color: "var(--accent-1)" }}
          >
            // SERVICIOS
          </p>
          <h2
            className="font-heading text-5xl md:text-6xl font-bold"
            style={{ color: "var(--ink)" }}
          >
            EN QUÉ PUEDO AYUDARTE
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.article
              key={service.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.35,
                delay: shouldReduceMotion ? 0 : Math.min(index * 0.08, 0.4),
              }}
              className="group p-5 flex flex-col transition-all duration-150 hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0"
              style={{
                backgroundColor: service.color,
                border: "2px solid var(--ink)",
                boxShadow: "6px 6px 0 var(--ink)",
              }}
            >
              <span
                className="font-mono text-3xl font-bold mb-3"
                style={{ color: "var(--ink)" }}
                aria-hidden="true"
              >
                0{index + 1}
              </span>

              <h3
                className="font-heading text-lg font-bold leading-tight mb-2"
                style={{ color: "var(--ink)" }}
              >
                {service.title}
              </h3>

              <p
                className="font-mono text-xs leading-relaxed"
                style={{ color: "var(--ink)" }}
              >
                {service.fullDescription}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
