import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sebastianvelasco.dev";

// Script anti-FOUC para data-theme.
// Antes de que React hidrate, lee localStorage y aplica el theme guardado.
// Si no hay valor guardado, usa prefers-color-scheme (dark/light) sobre el theme
// por defecto (default).
const themeBootstrap = `
(function() {
  try {
    var saved = localStorage.getItem('portfolio-theme');
    var theme;
    if (saved && ['default','default-dark','lava-neon','obsidian-teal','navy-gold'].indexOf(saved) !== -1) {
      theme = saved;
    } else {
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      theme = prefersDark ? 'default-dark' : 'default';
    }
    document.documentElement.setAttribute('data-theme', theme);
    // Legacy compat: si era 'default-dark' o el resolve cae en dark, también setea .dark
    if (theme === 'default-dark') document.documentElement.classList.add('dark');
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      var colors = {
        'default': '#f4f1e8',
        'default-dark': '#1a1a2e',
        'lava-neon': '#fef4ec',
        'obsidian-teal': '#f5f7fa',
        'navy-gold': '#faf8f3'
      };
      meta.setAttribute('content', colors[theme] || '#f4f1e8');
    }
  } catch (e) {}
})();
`;

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
      <head>
        {/* Anti-FOUC: aplica data-theme antes del primer paint */}
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body>{children}</body>
    </html>
  );
}