"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormStatus {
  type: "idle" | "submitting" | "success" | "error";
  message: string;
}

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: "https://github.com/nxxo31",
    ariaLabel: "Ver perfil de GitHub (abre en nueva pestaña)",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/sebastianvelasco",
    ariaLabel: "Ver perfil de LinkedIn (abre en nueva pestaña)",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/nxxo31",
    ariaLabel: "Ver perfil de Twitter (abre en nueva pestaña)",
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>({
    type: "idle",
    message: "",
  });
  const [copied, setCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "submitting", message: "Enviando..." });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error al enviar");

      setStatus({
        type: "success",
        message: "¡Mensaje enviado correctamente! Te responderé pronto.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus({
        type: "error",
        message: "Hubo un error al enviar. Intenta de nuevo.",
      });
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("sebastian.velasco@example.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silenciar si el clipboard no está disponible
    }
  };

  return (
    <section id="contact" className="relative py-28 px-6 z-10" aria-label="Contacto">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-[#a3a3b8] bg-clip-text text-transparent">
            Contacto
          </h2>
          <p className="text-[#a3a3b8] max-w-2xl mx-auto">
            ¿Quieres colaborar en un proyecto o simplemente charlar sobre tecnología?
            Estoy a un mensaje de distancia.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Información</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#7c5cff]/20 flex items-center justify-center" aria-hidden="true">
                    <svg className="w-5 h-5 text-[#22d3ee]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#a3a3b8] text-sm">Email</p>
                    <button
                      onClick={copyEmail}
                      className="text-white hover:text-[#22d3ee] transition-colors flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05050e] rounded"
                      aria-label="Copiar email al portapapeles"
                      aria-live="polite"
                    >
                      sebastian.velasco@example.com
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copied && (
                        <span className="text-xs text-green-400 ml-1" role="status">
                          ¡Copiado!
                        </span>
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#7c5cff]/20 flex items-center justify-center" aria-hidden="true">
                    <svg className="w-5 h-5 text-[#22d3ee]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#a3a3b8] text-sm">Ubicación</p>
                    <p className="text-white">Colombia</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Redes</h3>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#a3a3b8] hover:text-white hover:border-[#22d3ee] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05050e]"
                  >
                    <span className="text-xs">{social.name[0]}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={shouldReduceMotion ? false : { opacity: 0, x: 30 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-6"
            aria-label="Formulario de contacto"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm text-[#a3a3b8] mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#4a4a6a] focus:outline-none focus:border-[#22d3ee] focus:shadow-[0_0_20px_rgba(34,211,238,0.15)] focus-visible:ring-2 focus-visible:ring-[#22d3ee]/40 transition-all duration-300"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-[#a3a3b8] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#4a4a6a] focus:outline-none focus:border-[#22d3ee] focus:shadow-[0_0_20px_rgba(34,211,238,0.15)] focus-visible:ring-2 focus-visible:ring-[#22d3ee]/40 transition-all duration-300"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm text-[#a3a3b8] mb-2">
                Asunto
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#4a4a6a] focus:outline-none focus:border-[#22d3ee] focus:shadow-[0_0_20px_rgba(34,211,238,0.15)] focus-visible:ring-2 focus-visible:ring-[#22d3ee]/40 transition-all duration-300"
                placeholder="¿De qué se trata?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm text-[#a3a3b8] mb-2">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#4a4a6a] focus:outline-none focus:border-[#22d3ee] focus:shadow-[0_0_20px_rgba(34,211,238,0.15)] focus-visible:ring-2 focus-visible:ring-[#22d3ee]/40 transition-all duration-300 resize-none"
                placeholder="Cuéntame sobre tu proyecto..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status.type === "submitting"}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#7c5cff] to-[#22d3ee] text-white font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,92,255,0.4)] motion-safe:hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05050e]"
            >
              {status.type === "submitting" ? "Enviando..." : "Enviar Mensaje"}
            </button>

            {/* Status Message */}
            {status.type !== "idle" && status.type !== "submitting" && (
              <motion.p
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                role="status"
                className={`text-sm text-center ${
                  status.type === "success" ? "text-green-400" : "text-red-400"
                }`}
              >
                {status.message}
              </motion.p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
