import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sebastián Velasco | Full-Stack Developer & AI Architect",
    short_name: "SV Portfolio",
    description:
      "Portafolio profesional de Sebastián Velasco — Ingeniero de Software especializado en Next.js, React, TypeScript y arquitecturas escalables.",
    start_url: "/",
    display: "standalone",
    background_color: "#05050e",
    theme_color: "#0d0a1f",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
    categories: ["portfolio", "developer", "technology"],
    lang: "es",
    dir: "ltr",
  };
}
