import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { contentData } from "@/content/data";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sebastianvelasco.dev";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("Projects");
  return {
    title: t("indexTitle"),
    description: t("indexDescription"),
    alternates: { canonical: `${BASE_URL}/${locale}/projects` },
    openGraph: {
      title: t("indexTitle"),
      description: t("indexDescription"),
      url: `${BASE_URL}/${locale}/projects`,
      type: "website",
      siteName: "Sebastián Velasco | Portfolio",
    },
  };
}

export default async function ProjectsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Projects");
  const projects = contentData.projects;

  return (
    <main
      className="min-h-screen pt-24 px-6"
      style={{ backgroundColor: "var(--paper)", color: "var(--ink)" }}
    >
      <div className="max-w-4xl mx-auto py-12">
        <Link
          href={`/${locale}`}
          prefetch={false}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide font-bold px-3 py-2 border-2 transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
          style={{
            backgroundColor: "var(--surface)",
            color: "var(--ink)",
            borderColor: "var(--ink)",
            boxShadow: "3px 3px 0 var(--ink)",
          }}
          aria-label={t("backToHome")}
        >
          {t("backToHome")}
        </Link>

        <header className="mt-8 mb-12">
          <p
            className="font-mono text-xs uppercase tracking-[0.3em] mb-3"
            style={{ color: "var(--accent-1)" }}
          >
            {t("indexEyebrow")}
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-3 leading-tight">
            {t("indexTitle")}
          </h1>
          <p className="font-mono text-base leading-relaxed opacity-80 max-w-2xl">
            {t("indexDescription")}
          </p>
        </header>

        {projects.length === 0 ? (
          <p className="font-mono text-base italic opacity-60">{t("emptyState")}</p>
        ) : (
          <ul className="space-y-5" role="list">
            {projects.map((project, index) => (
              <li key={project.slug}>
                <article
                  className="border-2 p-5 transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--ink)",
                    boxShadow: "5px 5px 0 var(--ink)",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className="font-mono text-xs font-bold shrink-0 pt-1"
                      style={{ color: "var(--accent-2)" }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {project.featured && (
                          <span
                            className="font-mono text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 border-2"
                            style={{
                              backgroundColor: "var(--accent-3)",
                              color: "var(--ink)",
                              borderColor: "var(--ink)",
                            }}
                          >
                            Featured
                          </span>
                        )}
                        {project.demoUrl && (
                          <span
                            className="font-mono text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 border-2"
                            style={{
                              backgroundColor: "var(--accent-1)",
                              color: "var(--paper)",
                              borderColor: "var(--ink)",
                            }}
                          >
                            {t("liveBadge")}
                          </span>
                        )}
                        {project.repoUrl && (
                          <span
                            className="font-mono text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 border-2"
                            style={{
                              backgroundColor: "transparent",
                              color: "var(--ink)",
                              borderColor: "var(--border)",
                            }}
                          >
                            {t("codeBadge")}
                          </span>
                        )}
                      </div>

                      <h2 className="font-heading text-xl md:text-2xl font-bold mb-2">
                        <Link
                          href={`/${locale}/projects/${project.slug}`}
                          prefetch={false}
                          className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
                          style={{ color: "var(--ink)" }}
                        >
                          {project.title}
                        </Link>
                      </h2>

                      <p className="font-mono text-sm leading-relaxed opacity-80 mb-3">
                        {project.shortDescription}
                      </p>

                      <p className="font-mono text-xs opacity-60 mb-3">
                        {t("roleLabel")}: {project.role}
                      </p>

                      {project.impact && (
                        <p
                          className="font-mono text-sm leading-relaxed mb-3"
                          style={{ color: "var(--accent-2)" }}
                        >
                          {project.impact}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[10px] uppercase tracking-wide border px-2 py-0.5"
                            style={{
                              backgroundColor: "transparent",
                              color: "var(--ink)",
                              borderColor: "var(--border)",
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-4">
                        <Link
                          href={`/${locale}/projects/${project.slug}`}
                          prefetch={false}
                          className="font-mono text-xs uppercase tracking-wide font-bold hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
                          style={{ color: "var(--accent-1)" }}
                        >
                          {t("viewDetails")}
                        </Link>
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs uppercase tracking-wide font-bold hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
                            style={{ color: "var(--ink)" }}
                          >
                            {t("demoBadge")} ↗
                          </a>
                        )}
                        {project.repoUrl && (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs uppercase tracking-wide font-bold hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
                            style={{ color: "var(--ink)" }}
                          >
                            {t("codeBadge")} ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
