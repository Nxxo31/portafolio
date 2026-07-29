import type { MetadataRoute } from "next";

// URL base configurable por entorno. En Vercel se inyecta NEXT_PUBLIC_SITE_URL.
const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sebastianvelasco.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
