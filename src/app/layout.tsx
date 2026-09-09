import { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
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

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");
  const locale = await getLocale();
  
  // Handle keywords array properly
  const keywordsRaw = t("keywords");
  const keywords = Array.isArray(keywordsRaw) ? keywordsRaw.join(", ") : keywordsRaw;
  
  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: t("title"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    keywords: keywords,
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
      title: t("title"),
      description: t("ogDescription"),
      url: BASE_URL,
      siteName: "Sebastián Velasco Portfolio",
      locale: locale === "en" ? "en_US" : "es_CO",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: t("ogAlt"),
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("ogDescription"),
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
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sebastián Velasco Ocampo",
    givenName: "Sebastián",
    familyName: "Velasco Ocampo",
    jobTitle: messages.JsonLd.jobTitle,
    description: messages.JsonLd.description,
    url: BASE_URL,
    sameAs: ["https://github.com/Nxxo31"],
    knowsAbout: messages.JsonLd.knowsAbout,
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sebastián Velasco | Full-Stack Developer & AI Architect",
    url: BASE_URL,
    description: messages.JsonLd.websiteDescription,
    author: {
      "@type": "Person",
      name: "Sebastián Velasco Ocampo",
    },
  };

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
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
          />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
