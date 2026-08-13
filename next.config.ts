import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import createMDX from "@next/mdx";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const withMDX = createMDX({
  // Add markdown plugins here as needed
  extension: ".mdx",
});

const nextConfig: NextConfig = {
  output: "standalone",
  // React strict mode detecta problemas en desarrollo (no afecta producción)
  reactStrictMode: true,
  // Compresión gzip/brotli en respuestas HTTP
  compress: true,
  // Image optimization: formatos modernos WebP/AVIF con lazy loading nativo
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Headers de seguridad y caching para mejor Best Practices en Lighthouse
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      // NOTA: No sobrescribir Cache-Control de /_next/static/ — Next.js
      // ya aplica cache inmutable por hash de archivo.
    ];
  },
  turbopack: {
    root: __dirname,
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "mdx"],
  // Turbopack usa el compilador MDX en Rust (mdxRs) para procesar .mdx
  // nativamente sin webpack loaders. Requerido en Next.js 16 con Turbopack.
  experimental: {
    mdxRs: true,
  },
};

export default withMDX(withNextIntl(nextConfig));
