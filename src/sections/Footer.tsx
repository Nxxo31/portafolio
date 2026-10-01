"use client";

import { useTranslations } from "next-intl";
import { contentData } from "@/content/data";

export default function Footer() {
  const t = useTranslations("Footer");
  const { githubUrl, email, name } = contentData.profile;
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative py-12 px-6 border-t"
      aria-label={t("sectionLabel")}
      style={{
        backgroundColor: "var(--surface-dark)",
        color: "var(--ink)",
        borderColor: "var(--border)",
      }}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 md:col-span-6">
          <p
            className="font-heading text-2xl md:text-3xl font-bold mb-2"
            style={{ color: "var(--ink)" }}
          >
            SVO
          </p>
          <p
            className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-60"
            style={{ color: "var(--ink)" }}
          >
            © {year} {name} · Developer · Blog · Portfolio
          </p>
        </div>
        <nav
          className="col-span-12 md:col-span-6 flex md:justify-end items-start gap-3"
          aria-label={t("socialsLabel")}
        >
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 font-mono text-xs uppercase tracking-wide font-bold border transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              backgroundColor: "transparent",
              color: "var(--ink)",
              borderColor: "var(--border)",
            }}
            aria-label={t("githubAria")}
          >
            GitHub ↗
          </a>
          <a
            href={`mailto:${email}`}
            className="px-4 py-2 font-mono text-xs uppercase tracking-wide font-bold border transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              backgroundColor: "transparent",
              color: "var(--ink)",
              borderColor: "var(--border)",
            }}
            aria-label={t("emailAria")}
          >
            Email
          </a>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-4 py-2 font-mono text-xs uppercase tracking-wide font-bold transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              backgroundColor: "var(--accent-1)",
              color: "var(--paper)",
            }}
            aria-label={t("backToTopAria")}
          >
            {t("backToTop")} ↑
          </button>
        </nav>
      </div>
    </footer>
  );
}
