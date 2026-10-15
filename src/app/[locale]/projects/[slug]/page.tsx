import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { contentData } from "@/content/data";

export const dynamic = "force-dynamic";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sebastianvelasco.dev";

export function generateStaticParams() {
  return contentData.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const t = await getTranslations("ProjectDetail");
  const project = contentData.projects.find((p) => p.slug === slug);

  if (!project) {
    return { title: t("notFoundTitle") };
  }

  const title = project.title;
  const description = project.shortDescription;

  return {
    title,
    description,
    openGraph: {
      title: `${project.title} | Sebastian Velasco`,
      description,
      url: `${BASE_URL}/projects/${project.slug}`,
      type: "article",
      siteName: "Sebastian Velasco Portfolio",
      locale: slug ? "es_CO" : "en_US",
      images: project.image ? [project.image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: project.image ? [project.image] : undefined,
    },
    keywords: project.stack,
    alternates: {
      canonical: `${BASE_URL}/projects/${project.slug}`,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = await getTranslations("ProjectDetail");
  const project = contentData.projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.fullDescription,
    author: {
      "@type": "Person",
      name: "Sebastian Velasco Ocampo",
      url: BASE_URL,
    },
    keywords: project.stack.join(", "),
    about: project.role,
  };

  const ACCENTS = ["#FF6B35", "#00A6FB", "#FFD23F", "#06D6A0", "#EF476F"];

  // Gallery secundaria por proyecto (slugs con material extra).
  const galleryImages: { src: string; alt: string; label: string }[] = [];
  if (project.slug === "multra-eu") {
    galleryImages.push(
      { src: "/img/projects/multra-eu/dashboard.png", alt: "Panel admin con KPIs y metricas operativas", label: "Dashboard" },
      { src: "/img/projects/multra-eu/clientes.png", alt: "Seccion clientes con gestion completa", label: "Clientes" },
      { src: "/img/projects/multra-eu/cotizador.png", alt: "Cotizador autenticado con IVA y descuentos", label: "Cotizador" },
    );
  }

  return (
    <main className="min-h-screen pt-24 px-6" style={{ backgroundColor: "var(--paper)", color: "var(--ink)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }} />
      <article className="max-w-4xl mx-auto py-12">
        <Link href="/#projects" prefetch={false}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide font-bold px-3 py-2 border-2 transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
          style={{ backgroundColor: "var(--surface)", color: "var(--ink)", borderColor: "var(--ink)", boxShadow: "3px 3px 0 var(--ink)" }}
          aria-label={t("backAria")}
        >
          {t("back")}
        </Link>

        {project.image && (
          <div className="mt-8 border-2" style={{ borderColor: "var(--ink)", boxShadow: "6px 6px 0 var(--ink)", backgroundColor: "var(--surface)" }}>
            <Image src={project.image} alt={project.title} width={1896} height={831} className="w-full h-auto" priority unoptimized />
          </div>
        )}

        <header className="mt-8 mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.3em] mb-3" style={{ color: "var(--accent-1)" }}>{t("eyebrow")}</p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4 leading-tight" style={{ color: "var(--ink)" }}>{project.title}</h1>
          <p className="font-mono text-base leading-relaxed mb-6 max-w-3xl" style={{ color: "var(--ink)" }}>{project.fullDescription}</p>

          <ul className="flex flex-wrap gap-2 mb-6" role="list">
            {project.stack.map((tech, i) => (
              <li key={tech} className="font-mono text-xs uppercase tracking-wide font-bold px-3 py-1.5 border-2"
                style={{ backgroundColor: ACCENTS[i % ACCENTS.length], color: "var(--ink)", borderColor: "var(--ink)" }}>
                {tech}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-6 items-center p-4 border-2" style={{ backgroundColor: "var(--surface)", borderColor: "var(--ink)" }}>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wide font-bold mb-1" style={{ color: "var(--ink)", opacity: 0.7 }}>{t("roleLabel")}</p>
              <p className="font-mono text-sm font-bold" style={{ color: "var(--ink)" }}>{project.role}</p>
            </div>
            {project.client && (
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wide font-bold mb-1" style={{ color: "var(--ink)", opacity: 0.7 }}>{t("clientLabel")}</p>
                <p className="font-mono text-sm font-bold" style={{ color: "var(--ink)" }}>{project.client}</p>
              </div>
            )}
            {project.industry && (
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wide font-bold mb-1" style={{ color: "var(--ink)", opacity: 0.7 }}>{t("industryLabel")}</p>
                <p className="font-mono text-sm font-bold" style={{ color: "var(--ink)" }}>{project.industry}</p>
              </div>
            )}
            {project.impact && (
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wide font-bold mb-1" style={{ color: "var(--ink)", opacity: 0.7 }}>{t("impactLabel")}</p>
                <p className="font-mono text-sm font-bold" style={{ color: "var(--accent-1)" }}>{project.impact}</p>
              </div>
            )}
            {project.featured && (
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wide font-bold px-2 py-1 border-2" style={{ backgroundColor: "var(--accent-3)", color: "var(--ink)", borderColor: "var(--ink)" }}>
                  {t("featuredBadge")}
                </span>
              </div>
            )}
            {project.demoUrl && (
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wide font-bold px-2 py-1 border-2" style={{ backgroundColor: "var(--accent-1)", color: "var(--ink)", borderColor: "var(--ink)" }}>
                  {t("liveNowBadge")}
                </span>
              </div>
            )}
          </div>
        </header>

        {(project.challenge || project.solution || project.results || project.metrics) && (
          <section className="space-y-6 mb-10">
            {project.challenge && (
              <div className="p-6 border-2" style={{ backgroundColor: "var(--surface)", borderColor: "var(--ink)" }}>
                <h2 className="font-heading text-xl font-bold mb-2" style={{ color: "var(--accent-1)" }}>{t("challengeLabel")}</h2>
                <p className="font-mono text-sm leading-relaxed" style={{ color: "var(--ink)" }}>{project.challenge}</p>
              </div>
            )}
            {project.solution && (
              <div className="p-6 border-2" style={{ backgroundColor: "var(--surface)", borderColor: "var(--ink)" }}>
                <h2 className="font-heading text-xl font-bold mb-2" style={{ color: "var(--accent-2)" }}>{t("solutionLabel")}</h2>
                <p className="font-mono text-sm leading-relaxed" style={{ color: "var(--ink)" }}>{project.solution}</p>
              </div>
            )}
            {project.results && (
              <div className="p-6 border-2" style={{ backgroundColor: "var(--surface)", borderColor: "var(--ink)" }}>
                <h2 className="font-heading text-xl font-bold mb-2" style={{ color: "var(--accent-4)" }}>{t("resultsLabel")}</h2>
                <p className="font-mono text-sm leading-relaxed" style={{ color: "var(--ink)" }}>{project.results}</p>
              </div>
            )}
            {project.metrics && (
              <div className="p-6 border-2" style={{ backgroundColor: "var(--ink)", borderColor: "var(--ink)" }}>
                <h2 className="font-mono text-xs uppercase tracking-wide font-bold mb-2" style={{ color: "var(--accent-3)" }}>{t("metricsLabel")}</h2>
                <p className="font-mono text-sm leading-relaxed font-bold" style={{ color: "var(--paper)" }}>{project.metrics}</p>
              </div>
            )}
          </section>
        )}

        {galleryImages.length > 0 && (
          <section className="mb-10">
            <h2 className="font-heading text-2xl font-bold mb-4" style={{ color: "var(--ink)" }}>{t("galleryLabel")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {galleryImages.map((img) => (
                <figure key={img.src} className="border-2" style={{ borderColor: "var(--ink)", boxShadow: "4px 4px 0 var(--ink)", backgroundColor: "var(--surface)" }}>
                  <Image src={img.src} alt={img.alt} width={1896} height={831} className="w-full h-auto" unoptimized />
                  <figcaption className="font-mono text-xs uppercase tracking-wide font-bold p-3" style={{ backgroundColor: "var(--surface)", color: "var(--ink)", borderTop: "2px solid var(--ink)" }}>{img.label}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        <nav className="flex flex-wrap gap-3" aria-label={t("linksAria")}>
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
              className="font-heading font-bold text-base px-6 py-3 border-2 transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
              style={{ backgroundColor: "var(--accent-1)", color: "var(--ink)", borderColor: "var(--ink)", boxShadow: "5px 5px 0 var(--ink)" }}>
              {t("liveLink")}
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
              className="font-heading font-bold text-base px-6 py-3 border-2 transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
              style={{ backgroundColor: "var(--surface)", color: "var(--ink)", borderColor: "var(--ink)", boxShadow: "5px 5px 0 var(--ink)" }}>
              {t("codeLink")}
            </a>
          )}
          <Link href="/#contact" prefetch={false}
            className="font-heading font-bold text-base px-6 py-3 border-2 transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
            style={{ backgroundColor: "var(--surface)", color: "var(--ink)", borderColor: "var(--ink)", boxShadow: "5px 5px 0 var(--ink)" }}>
            {t("askLink")}
          </Link>
        </nav>
      </article>
    </main>
  );
}
