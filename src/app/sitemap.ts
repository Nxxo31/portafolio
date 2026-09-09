import type { MetadataRoute } from "next";
import { contentData } from "@/content/data";

// URL base configurable por entorno. En Vercel se inyecta NEXT_PUBLIC_SITE_URL.
const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sebastianvelasco.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Secciones principales del portafolio (SPA con anchors)
  const sections: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/#about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/#projects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/#skills`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/#contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Páginas individuales de proyectos (rutas dinámicas pre-renderizadas)
  const projectPages: MetadataRoute.Sitemap = contentData.projects.map(
    (project) => ({
      url: `${BASE_URL}/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: project.featured ? 0.8 : 0.6,
    }),
  );

  return [...sections, ...projectPages];
}
