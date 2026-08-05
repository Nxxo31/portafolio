import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import type { ResolvingMetadata } from "next";
import { contentData } from "@/content/data";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sebastianvelasco.dev";

// Pre-renderizar todas las rutas de proyectos en build time (SSG)
export function generateStaticParams() {
  return contentData.projects.map((project) => ({
    slug: project.slug,
  }));
}

// Metadata dinámica por proyecto para SEO
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const project = contentData.projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Proyecto no encontrado",
    };
  }

  const title = project.title;
  const description = project.shortDescription;

  return {
    title,
    description,
    openGraph: {
      title: `${project.title} | Sebastián Velasco`,
      description,
      url: `${BASE_URL}/projects/${project.slug}`,
      type: "article",
      siteName: "Sebastián Velasco Portfolio",
      locale: "es_CO",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
      name: "Sebastián Velasco Ocampo",
      url: BASE_URL,
    },
    keywords: project.stack.join(", "),
    about: project.role,
  };

  const ACCENTS = ["#FF6B35", "#00A6FB", "#FFD23F", "#06D6A0", "#EF476F"];

  return (
    <main
      className="min-h-screen pt-24 px-6"
      style={{ backgroundColor: "var(--paper)", color: "var(--ink)" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <article className="max-w-4xl mx-auto py-12">
        {/* Back button */}
        <Link
          href="/#projects"
          prefetch={false}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide font-bold px-3 py-2 border-2 transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
          style={{
            backgroundColor: "var(--surface)",
            color: "var(--ink)",
            borderColor: "var(--ink)",
            boxShadow: "3px 3px 0 var(--ink)",
          }}
          aria-label="Volver a proyectos"
        >
          ← PROYECTOS
        </Link>

        {/* Project header */}
        <header className="mt-8 mb-10">
          <p
            className="font-mono text-xs uppercase tracking-[0.3em] mb-3"
            style={{ color: "var(--accent-1)" }}
          >
            // PROYECTO
          </p>
          <h1
            className="font-heading text-4xl md:text-6xl font-bold mb-4 leading-tight"
            style={{ color: "var(--ink)" }}
          >
            {project.title}
          </h1>
          <p
            className="font-mono text-base leading-relaxed mb-6 max-w-3xl"
            style={{ color: "var(--ink)" }}
          >
            {project.fullDescription}
          </p>

          {/* Stack tags */}
          <ul className="flex flex-wrap gap-2 mb-6" role="list">
            {project.stack.map((tech, i) => (
              <li
                key={tech}
                className="font-mono text-xs uppercase tracking-wide font-bold px-3 py-1.5 border-2"
                style={{
                  backgroundColor: ACCENTS[i % ACCENTS.length],
                  color: "var(--ink)",
                  borderColor: "var(--ink)",
                }}
              >
                {tech}
              </li>
            ))}
          </ul>

          {/* Meta info */}
          <div
            className="flex flex-wrap gap-6 items-center p-4 border-2"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--ink)",
            }}
          >
            <div>
              <p
                className="font-mono text-[10px] uppercase tracking-wide font-bold mb-1"
                style={{ color: "var(--ink)", opacity: 0.7 }}
              >
                Rol
              </p>
              <p
                className="font-mono text-sm font-bold"
                style={{ color: "var(--ink)" }}
              >
                {project.role}
              </p>
            </div>
            {project.impact && (
              <div>
                <p
                  className="font-mono text-[10px] uppercase tracking-wide font-bold mb-1"
                  style={{ color: "var(--ink)", opacity: 0.7 }}
                >
                  Impacto
                </p>
                <p
                  className="font-mono text-sm font-bold"
                  style={{ color: "var(--accent-1)" }}
                >
                  {project.impact}
                </p>
              </div>
            )}
            {project.featured && (
              <div>
                <span
                  className="font-mono text-[10px] uppercase tracking-wide font-bold px-2 py-1 border-2"
                  style={{
                    backgroundColor: "var(--accent-3)",
                    color: "var(--ink)",
                    borderColor: "var(--ink)",
                  }}
                >
                  FEATURED
                </span>
              </div>
            )}
          </div>
        </header>

        {/* Links */}
        <nav className="flex flex-wrap gap-3" aria-label="Enlaces del proyecto">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading font-bold text-base px-6 py-3 border-2 transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
              style={{
                backgroundColor: "var(--accent-1)",
                color: "var(--ink)",
                borderColor: "var(--ink)",
                boxShadow: "5px 5px 0 var(--ink)",
              }}
            >
              CÓDIGO ↗
            </a>
          )}
          <Link
            href="/#contact"
            prefetch={false}
            className="font-heading font-bold text-base px-6 py-3 border-2 transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
            style={{
              backgroundColor: "var(--surface)",
              color: "var(--ink)",
              borderColor: "var(--ink)",
              boxShadow: "5px 5px 0 var(--ink)",
            }}
          >
            PREGUNTAR →
          </Link>
        </nav>
      </article>
    </main>
  );
}
