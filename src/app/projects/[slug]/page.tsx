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
    title, // el layout.js template añade "| Sebastián Velasco"
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

  // JSON-LD para cada proyecto (Schema.org CreativeWork)
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

  return (
    <main className="min-h-screen bg-[#05050e] text-white pt-24 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <article className="max-w-4xl mx-auto py-16">
        {/* Back button */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-[#a3a3b8] hover:text-[#22d3ee] transition-colors mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05050e] rounded"
          aria-label="Volver a proyectos"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
          Volver a proyectos
        </Link>

        {/* Project header */}
        <header className="mb-12">
          <time className="text-[#a3a3b8] text-sm font-mono mb-4 block">
            Proyecto
          </time>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#7c5cff] to-[#22d3ee] bg-clip-text text-transparent">
            {project.title}
          </h1>
          <p className="text-[#a3a3b8] text-lg mb-4">{project.fullDescription}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-sm rounded-full bg-white/5 text-[#22d3ee] border border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-sm text-[#a3a3b8]">
              <span className="text-[#7c5cff]">Rol:</span> {project.role}
            </span>
            {project.impact && (
              <span className="text-sm text-[#a3a3b8]">
                <span className="text-[#f5c451]">Impacto:</span>{" "}
                {project.impact}
              </span>
            )}
          </div>
        </header>

        {/* Links */}
        <nav className="flex gap-4 mb-16" aria-label="Enlaces del proyecto">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#7c5cff] to-[#22d3ee] text-white font-medium hover:shadow-[0_0_30px_rgba(124,92,255,0.4)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05050e]"
            >
              Ver Repositorio
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl border border-white/10 text-[#a3a3b8] hover:text-white hover:border-[#22d3ee] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05050e]"
            >
              Demo en Vivo
            </a>
          )}
        </nav>
      </article>
    </main>
  );
}
