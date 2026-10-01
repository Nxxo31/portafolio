"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
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
  backgroundColor: "color-mix(in oklab, var(--surface) 60%, transparent)",
  border: "1px solid var(--border)",
  color: "var(--ink)",
};

export default function ContactSection() {
  const t = useTranslations("Contact");
  const { email, githubUrl, name } = contentData.profile;
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>({ type: "idle", message: "" });
  const [copied, setCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "submitting", message: t("submittingStatus") });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error(t("errorStatus"));
      setStatus({ type: "success", message: t("success") });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus({ type: "error", message: t("error") });
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silenciar si clipboard no disponible
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 md:py-28 px-6"
      aria-label={t("sectionLabel")}
    >
      <div className="max-w-5xl mx-auto">
        {/* Editorial header */}
        <motion.header
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-12 gap-4 md:gap-6 mb-12"
        >
          <div className="col-span-12 md:col-span-3">
            <p
              className="font-mono text-[10px] uppercase tracking-[0.3em]"
              style={{ color: "var(--accent-2)" }}
            >
              {t("eyebrow")}
            </p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2
              className="font-heading text-4xl md:text-5xl font-bold"
              style={{ color: "var(--ink)" }}
            >
              {t("title")}
            </h2>
          </div>
        </motion.header>

        <div className="grid md:grid-cols-12 gap-4 md:gap-6">
          {/* Info col izq */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="md:col-span-4 space-y-4"
          >
            <div className="p-4 border" style={{ borderColor: "var(--border)" }}>
              <p
                className="font-mono text-[10px] uppercase tracking-[0.2em] mb-2"
                style={{ color: "var(--accent-2)" }}
              >
                {t("emailLabel")}
              </p>
              <button
                onClick={copyEmail}
                className="font-mono text-sm font-bold break-all text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ color: "var(--ink)" }}
                aria-label={t("copyEmailAria")}
                aria-live="polite"
              >
                {email}
                {copied && (
                  <span
                    className="ml-2 font-mono text-xs"
                    style={{ color: "var(--accent-4)" }}
                    role="status"
                  >
                    {t("copied")}
                  </span>
                )}
              </button>
            </div>

            <div className="p-4 border" style={{ borderColor: "var(--border)" }}>
              <p
                className="font-mono text-[10px] uppercase tracking-[0.2em] mb-2"
                style={{ color: "var(--accent-2)" }}
              >
                {t("githubLabel")}
              </p>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ color: "var(--ink)" }}
                aria-label={t("githubAria", { name })}
              >
                @Nxxo31 ↗
              </a>
            </div>

            <div className="p-4 border" style={{ borderColor: "var(--border)" }}>
              <p
                className="font-mono text-[10px] uppercase tracking-[0.2em] mb-2"
                style={{ color: "var(--accent-2)" }}
              >
                {t("locationLabel")}
              </p>
              <p className="font-mono text-sm font-bold" style={{ color: "var(--ink)" }}>
                Colombia 🇨🇴
              </p>
            </div>
          </motion.div>

          {/* Form col der */}
          <motion.form
            initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit}
            className="md:col-span-8 space-y-4"
            aria-label={t("formLabel")}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block font-mono text-[10px] uppercase tracking-wide font-bold mb-2"
                  style={{ color: "var(--ink)" }}
                >
                  {t("nameLabel")}
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
                  className="w-full px-4 py-3 font-mono text-sm focus:outline-none placeholder:opacity-60"
                  placeholder={t("namePlaceholder")}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block font-mono text-[10px] uppercase tracking-wide font-bold mb-2"
                  style={{ color: "var(--ink)" }}
                >
                  {t("emailFieldLabel")}
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
                  className="w-full px-4 py-3 font-mono text-sm focus:outline-none placeholder:opacity-60"
                  placeholder={t("emailPlaceholder")}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block font-mono text-[10px] uppercase tracking-wide font-bold mb-2"
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
                className="w-full px-4 py-3 font-mono text-sm focus:outline-none placeholder:opacity-60"
                placeholder={t("subjectPlaceholder")}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block font-mono text-[10px] uppercase tracking-wide font-bold mb-2"
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
                className="w-full px-4 py-3 font-mono text-sm focus:outline-none resize-none placeholder:opacity-60"
                placeholder={t("messagePlaceholder")}
              />
            </div>

            <button
              type="submit"
              disabled={status.type === "submitting"}
              className="w-full py-4 font-heading font-bold text-sm uppercase tracking-wide transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "var(--accent-1)",
                color: "var(--paper)",
                boxShadow: "4px 4px 0 var(--ink)",
              }}
            >
              {status.type === "submitting" ? t("submitting") : t("submit")}
            </button>

            {status.type !== "idle" && status.type !== "submitting" && (
              <p
                role="status"
                className="font-mono text-sm text-center font-bold p-3 border"
                style={{
                  backgroundColor:
                    status.type === "success"
                      ? "color-mix(in oklab, var(--accent-4) 20%, transparent)"
                      : "color-mix(in oklab, var(--accent-5) 20%, transparent)",
                  color: "var(--ink)",
                  borderColor:
                    status.type === "success" ? "var(--accent-4)" : "var(--accent-5)",
                }}
              >
                {status.message}
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
