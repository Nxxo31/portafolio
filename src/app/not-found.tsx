import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("NotFound");
  return {
    title: t("title"),
    description: t("description"),
    robots: { index: false, follow: true },
  };
}

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <main
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: "var(--paper)", color: "var(--ink)" }}
    >
      <div className="text-center max-w-md">
        <h1
          className="font-heading text-8xl md:text-9xl font-bold mb-6 leading-none"
          style={{ color: "var(--ink)" }}
        >
          404
        </h1>
        <p className="font-mono text-base mb-8 leading-relaxed">
          {t("body")}
        </p>
        <Link
          href="/"
          className="inline-block font-heading font-bold text-base px-7 py-3 border-2 transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
          style={{
            backgroundColor: "var(--accent-1)",
            color: "var(--ink)",
            borderColor: "var(--ink)",
            boxShadow: "5px 5px 0 var(--ink)",
          }}
          aria-label={t("backAria")}
        >
          {t("back")}
        </Link>
      </div>
    </main>
  );
}
