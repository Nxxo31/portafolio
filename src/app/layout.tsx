import { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sebastianvelasco.dev";

// Viewport separado de Metadata en Next.js 14+ (mobile-friendly)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f1e8" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a2e" },
  ],
  colorScheme: "light dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Sebastián Velasco | Full-Stack Developer & AI Architect",
    template: "%s | Sebastián Velasco",
  },
  description:
    "Portafolio profesional de Sebastián Velasco — Ingeniero de Software especializado en Next.js, React, TypeScript, arquitecturas escalables y sistemas multi-agente con IA.",
  keywords: [
    "Sebastián Velasco",
    "Full-Stack Developer",
    "AI Architect",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Portafolio",
    "Colombia",
    "Multi-agente",
    "LangChain",
    "Docker",
  ],
  authors: [{ name: "Sebastián Velasco", url: "https://github.com/Nxxo31" }],
  creator: "Sebastián Velasco Ocampo",
  publisher: "Sebastián Velasco Ocampo",
  alternates: {
    canonical: BASE_URL,
    languages: {
      "es-CO": BASE_URL,
      en: `${BASE_URL}/en`,
    },
  },
  openGraph: {
    title: "Sebastián Velasco | Full-Stack Developer & AI Architect",
    description:
      "Portafolio profesional de Sebastián Velasco — Ingeniero de Software especializado en Next.js, React, TypeScript y arquitecturas escalables.",
    url: BASE_URL,
    siteName: "Sebastián Velasco Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sebastián Velasco — Portafolio de Full-Stack Developer & AI Architect",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sebastián Velasco | Full-Stack Developer & AI Architect",
    description:
      "Portafolio profesional de Sebastián Velasco — Ingeniero de Software especializado en Next.js, React, TypeScript y arquitecturas escalables.",
    images: ["/og-image.png"],
    creator: "@nxxo31",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
  category: "portfolio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sebastián Velasco Ocampo",
    givenName: "Sebastián",
    familyName: "Velasco Ocampo",
    jobTitle: "Ingeniero de Software & Arquitecto de Agentes IA",
    description:
      "Desarrollador Full-Stack especializado en Next.js, React, TypeScript, arquitecturas escalables y sistemas multi-agente con IA.",
    url: BASE_URL,
    sameAs: [
      "https://github.com/Nxxo31",
    ],
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Python",
      "Artificial Intelligence",
      "Machine Learning",
      "DevOps",
      "Docker",
      "LangChain",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sebastián Velasco | Full-Stack Developer & AI Architect",
    url: BASE_URL,
    description:
      "Portafolio profesional de Sebastián Velasco — Ingeniero de Software especializado en Next.js, React, TypeScript y arquitecturas escalables.",
    author: {
      "@type": "Person",
      name: "Sebastián Velasco Ocampo",
    },
  };

  // Script anti-FOUC: aplica el tema antes de la hidratación de React
  // para evitar flash de tema incorrecto. Lee de localStorage o prefers-color-scheme.
  const themeScript = `
    (function() {
      try {
        var stored = localStorage.getItem('theme');
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        var isDark = stored ? stored === 'dark' : prefersDark;
        if (isDark) {
          document.documentElement.classList.add('dark');
        }
      } catch (e) {}
    })();
  `;

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
