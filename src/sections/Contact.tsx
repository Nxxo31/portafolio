"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { contentData } from "@/content/data";

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

const INPUT_BASE_STYLE: React.CSSProperties = {
  backgroundColor: "var(--surface)",
  border: "2px solid var(--ink)",
  color: "var(--ink)",
  boxShadow: "4px 4px 0 var(--ink)",
};

const INPUT_FOCUS_STYLE: React.CSSProperties = {
  boxShadow: "2px 2px 0 var(--ink)",
  transform: "translate(2px, 2px)",
};

export default function ContactSection() {
  const { email, githubUrl, name } = contentData.profile;
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
        message: "¡Mensaje enviado! Te responderé pronto.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus({
        type: "error",
        message: "Error al enviar. Intenta de nuevo o escríbeme directo.",
      });
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silenciar si el clipboard no está disponible
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 px-6"
      aria-label="Contacto"
      style={{ backgroundColor: "var(--paper)" }}
    >
      <div className="max-w-5xl mx-auto">
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
            // CONTACTO
          </p>
          <h2
            className="font-heading text-5xl md:text-6xl font-bold"
            style={{ color: "var(--ink)" }}
          >
            HABLEMOS
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Info */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div
              className="p-6"
              style={{
                backgroundColor: "var(--surface)",
                border: "2px solid var(--ink)",
                boxShadow: "6px 6px 0 var(--ink)",
              }}
            >
              <p
                className="font-mono text-xs uppercase tracking-wide font-bold mb-3"
                style={{ color: "var(--ink)" }}
              >
                EMAIL
              </p>
              <button
                onClick={copyEmail}
                className="font-mono text-sm font-bold break-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
                style={{ color: "var(--accent-1)" }}
                aria-label="Copiar email al portapapeles"
                aria-live="polite"
              >
                {email}
                {copied && (
                  <span
                    className="ml-2 font-mono text-xs"
                    style={{ color: "var(--accent-4)" }}
                    role="status"
                  >
                    [COPIADO]
                  </span>
                )}
              </button>
            </div>

            <div
              className="p-6"
              style={{
                backgroundColor: "var(--accent-2)",
                border: "2px solid var(--ink)",
                boxShadow: "6px 6px 0 var(--ink)",
              }}
            >
              <p
                className="font-mono text-xs uppercase tracking-wide font-bold mb-3"
                style={{ color: "var(--ink)" }}
              >
                GITHUB
              </p>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-base font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
                style={{ color: "var(--ink)" }}
                aria-label={`Ver GitHub de ${name}`}
              >
                @Nxxo31 ↗
              </a>
            </div>

            <div
              className="p-6"
              style={{
                backgroundColor: "var(--accent-3)",
                border: "2px solid var(--ink)",
                boxShadow: "6px 6px 0 var(--ink)",
              }}
            >
              <p
                className="font-mono text-xs uppercase tracking-wide font-bold mb-3"
                style={{ color: "var(--ink)" }}
              >
                UBICACIÓN
              </p>
              <p
                className="font-mono text-base font-bold"
                style={{ color: "var(--ink)" }}
              >
                Colombia 🇨🇴
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={shouldReduceMotion ? false : { opacity: 0, x: 30 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-5"
            aria-label="Formulario de contacto"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block font-mono text-xs uppercase tracking-wide font-bold mb-2"
                  style={{ color: "var(--ink)" }}
                >
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
                  style={INPUT_BASE_STYLE}
                  onFocus={(e) => Object.assign(e.currentTarget.style, INPUT_FOCUS_STYLE)}
                  onBlur={(e) => Object.assign(e.currentTarget.style, INPUT_BASE_STYLE)}
                  className="w-full px-4 py-3 font-mono text-sm transition-all duration-150 focus:outline-none placeholder:opacity-60"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block font-mono text-xs uppercase tracking-wide font-bold mb-2"
                  style={{ color: "var(--ink)" }}
                >
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
                  style={INPUT_BASE_STYLE}
                  onFocus={(e) => Object.assign(e.currentTarget.style, INPUT_FOCUS_STYLE)}
                  onBlur={(e) => Object.assign(e.currentTarget.style, INPUT_BASE_STYLE)}
                  className="w-full px-4 py-3 font-mono text-sm transition-all duration-150 focus:outline-none placeholder:opacity-60"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block font-mono text-xs uppercase tracking-wide font-bold mb-2"
                style={{ color: "var(--ink)" }}
              >
                Asunto
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                style={INPUT_BASE_STYLE}
                onFocus={(e) => Object.assign(e.currentTarget.style, INPUT_FOCUS_STYLE)}
                onBlur={(e) => Object.assign(e.currentTarget.style, INPUT_BASE_STYLE)}
                className="w-full px-4 py-3 font-mono text-sm transition-all duration-150 focus:outline-none placeholder:opacity-60"
                placeholder="¿De qué se trata?"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block font-mono text-xs uppercase tracking-wide font-bold mb-2"
                style={{ color: "var(--ink)" }}
              >
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                style={INPUT_BASE_STYLE}
                onFocus={(e) => Object.assign(e.currentTarget.style, INPUT_FOCUS_STYLE)}
                onBlur={(e) => Object.assign(e.currentTarget.style, INPUT_BASE_STYLE)}
                className="w-full px-4 py-3 font-mono text-sm transition-all duration-150 focus:outline-none resize-none placeholder:opacity-60"
                placeholder="Cuéntame sobre tu proyecto..."
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status.type === "submitting"}
              className="w-full py-4 font-heading font-bold text-lg uppercase tracking-wide border-2 transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "var(--accent-1)",
                color: "var(--ink)",
                borderColor: "var(--ink)",
                boxShadow: "6px 6px 0 var(--ink)",
              }}
            >
              {status.type === "submitting" ? "ENVIANDO..." : "ENVIAR MENSAJE →"}
            </button>

            {status.type !== "idle" && status.type !== "submitting" && (
              <motion.p
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                role="status"
                className="font-mono text-sm text-center font-bold p-3 border-2"
                style={{
                  backgroundColor:
                    status.type === "success"
                      ? "var(--accent-4)"
                      : "var(--accent-5)",
                  color: "var(--ink)",
                  borderColor: "var(--ink)",
                }}
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
