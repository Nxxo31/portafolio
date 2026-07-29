import type { NextConfig } from "next";

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
      // NOTA: No sobreescribir Cache-Control de /_next/static/ — Next.js
      // ya aplica cache inmutable por hash de archivo.
    ];
  },
  turbopack: {
    root: ".",
  },
};

export default nextConfig;
