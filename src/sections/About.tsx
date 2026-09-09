"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { contentData } from "@/content/data";

export default function AboutSection() {
  const t = useTranslations("About");
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="relative py-24 px-6"
      aria-label={t("sectionLabel")}
      style={{ backgroundColor: "var(--paper)" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */ }
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <h2
            className="font-heading text-4xl md:text-5xl font-bold"
            style={{ color: "var(--ink)" }}
          >
            {t("title") || "Sobre NX Studio"}
          </h2>
          <p
            className="font-mono text-sm tracking-[0.3em] uppercase mb-4"
            style={{ color: "var(--accent-1)" }}
          >
            {t("eyebrow") || "Latin American Technology Partner"}
          </p>
        </motion.div>

        {/* Content Grid */ }
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Left Column - Text Content */ }
          <div className="space-y-6">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <h3
                className="font-heading text-2xl font-semibold"
                style={{ color: "var(--ink)" }}
              >
                {t("whoWeAre") || "Quiénes Somos"}
              </h3>
              <p
                className="text-lg leading-relaxed"
                style={{ color: "var(--ink)" }}
              >
                {t("whoWeAreDesc") || `NX Studio es una empresa de desarrollo tecnológico fundada por Sebastián Velasco Ocampo, Ingeniero de Sistemas especializado en crear soluciones a medida para el mercado latinoamericano. Combinamos la agilidad y comprensión cultural de equipos regionales con la rigurosidad técnica y escalabilidad de las mejores prácticas globales de desarrollo de software.`}
              </p>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <h3
                className="font-heading text-2xl font-semibold"
                style={{ color: "var(--ink)" }}
              >
                {t("ourApproach") || "Nuestro Enfoque"}
              </h3>
              <div className="space-y-3">
                {[
        "Enfoque Nearshore Auténtico",
        "Especialización Vertical",
        "Resultados Medibles",
        "Modelo Híbrido Servicios/Productos",
        "I+D Aplicada mediante LITA"
      ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                    whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    className="flex items-start space-x-3"
                  >
                    <span className="flex-shrink-0 mt-0.5">
                      •
                    </span>
                    <span className="text-lg leading-relaxed"
                          style={{ color: "var(--ink)" }}>
                      {item.trim()}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <h3
                className="font-heading text-2xl font-semibold"
                style={{ color: "var(--ink)" }}
              >
                {t("myBackground") || "Mi Formación y Experiencia"}
              </h3>
              <p
                className="text-lg leading-relaxed"
                style={{ color: "var(--ink)" }}
              >
                {t("myBackgroundDesc") || `Con más de 4 años de experiencia en desarrollo full-stack, arquitectura de sistemas y aplicación práctica de inteligencia artificial, he liderado proyectos que van desde aplicaciones de escritorio multiplataforma hasta plataformas SaaS de trading algorítmico y sistemas de detección de fraude electoral. Mi enfoque combina expertise técnico profundo con comprensión de los desafíos específicos del contexto latinoamericano: conectividad intermitente, regulaciones locales, necesidades de inclusión financiera y adaptación cultural.`}
              </p>
            </motion.div>
          </div>

          {/* Right Column - Visual/Skills */ }
          <div className="space-y-6">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: 30 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <h3
                className="font-heading text-2xl font-semibold"
                style={{ color: "var(--ink)" }}
              >
                {t("technicalExpertise") || "Experiencia Técnica"}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {/* Skills from contentData.skills */ }
                {contentData.skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                    whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 rounded"
                          style={{ backgroundColor: `var(--accent-${((index % 4) + 1)})` }}></span>
                    <span className="text-sm font-mono"
                          style={{ color: "var(--ink)" }}>
                      {skill.name} ({skill.proficiency}/5)
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: 30 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <h3
                className="font-heading text-2xl font-semibold"
                style={{ color: "var(--ink)" }}
              >
                {t("values") || "Nuestros Valores"}
              </h3>
              <div className="space-y-2">
                {[
                  "Excelencia Técnica",
                  "Compromiso con Resultados",
                  "Innovación Aplicada",
                  "Responsabilidad Social",
                  "Transparencia y Colaboración"
                ].map((value, index) => (
                  <motion.div
                    key={index}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                    whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    className="flex items-start space-x-3"
                  >
                    <span className="flex-shrink-0 mt-0.5">
                      ◇
                    </span>
                    <span className="text-sm font-mono"
                          style={{ color: "var(--ink)" }}>
                      {value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

