import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sebastianvelasco.dev";

// Root layout — provides <html> + <body> and resolves <html lang> from
// the x-next-intl-locale header set by next-intl's middleware (proxy.ts).
// All visual chrome (Navbar, <main>, providers) lives in
// src/app/[locale]/layout.tsx — that layout intentionally does NOT
// emit another <html> tag, just renders its children into this shell.
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
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // next-intl sets x-next-locale header (or x-next-intl-locale in newer versions).
  // Fallback to 'es' for non-locale paths like /api/*, /robots.txt, etc.
  const h = await headers();
  const locale = h.get("x-next-locale") || h.get("x-next-intl-locale") || "es";

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}