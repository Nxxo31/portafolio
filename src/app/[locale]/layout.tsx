import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";

const LOCALES = ["es", "en"] as const;
const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sebastianvelasco.dev";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!(LOCALES as readonly string[]).includes(localeParam)) return {};
  const t = await getTranslations({ locale: localeParam, namespace: "Metadata" });
  const keywordsRaw = t("keywords");
  const keywords = Array.isArray(keywordsRaw) ? keywordsRaw.join(", ") : keywordsRaw;
  const canonical = `${BASE_URL}/${localeParam}`;

  return {
    title: {
      default: t("title"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    keywords,
    authors: [{ name: "Sebastián Velasco", url: "https://github.com/Nxxo31" }],
    creator: "Sebastián Velasco Ocampo",
    publisher: "Sebastián Velasco Ocampo",
    alternates: {
      canonical,
      languages: {
        "es-CO": `${BASE_URL}/es`,
        en: `${BASE_URL}/en`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("ogDescription"),
      url: canonical,
      siteName: "Sebastián Velasco Portfolio",
      locale: localeParam === "en" ? "en_US" : "es_CO",
      images: [
        { url: "/og-image.png", width: 1200, height: 630, alt: t("ogAlt") },
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
    formatDetection: { email: false, address: false, telephone: false },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!(LOCALES as readonly string[]).includes(localeParam)) {
    notFound();
  }
  const messages = await getMessages();

  // JSON-LD per locale
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    givenName: "Sebastián",
    familyName: "Velasco Ocampo",
    name: "Sebastián Velasco Ocampo",
    jobTitle:
      localeParam === "en"
        ? "Full-Stack Developer & AI Agents Architect"
        : "Desarrollador Full-Stack y Arquitecto de Agentes IA",
    description:
      localeParam === "en"
        ? "Portfolio of Sebastián Velasco Ocampo — Software Engineer specialized in Next.js, React, TypeScript, and scalable architectures."
        : "Portafolio de Sebastián Velasco Ocampo — Ingeniero de Software especializado en Next.js, React, TypeScript y arquitecturas escalables.",
    url: `${BASE_URL}/${localeParam}`,
    sameAs: ["https://github.com/Nxxo31"],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sebastián Velasco | Full-Stack Developer & AI Architect",
    url: `${BASE_URL}/${localeParam}`,
    author: { "@type": "Person", name: "Sebastián Velasco Ocampo" },
  };

  // NOTA: el anti-FOUC para data-theme y los <html>/<body> viven en
  // src/app/layout.tsx (root layout, único dueño). Este layout solo
  // renderiza el provider + Navbar + <main> dentro de ese shell.

  return (
    <NextIntlClientProvider locale={localeParam} messages={messages}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Navbar />
      <main className="pt-16 relative">{children}</main>
    </NextIntlClientProvider>
  );
}