import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sebastianvelasco.dev";

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

// Script anti-FOUC para data-theme.
// Antes de que React hidrate, lee localStorage y aplica el theme guardado.
// Si no hay valor guardado: prefers-color-scheme dark -> "default" (steel
// indigo dark), light -> "default-light" (steel indigo claro).
const themeBootstrap = `
(function() {
  try {
    var saved = localStorage.getItem('portfolio-theme');
    var theme;
    if (saved && ['default','default-light','default-dark','lava-neon','obsidian-teal','navy-gold'].indexOf(saved) !== -1) {
      theme = saved;
    } else {
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      theme = prefersDark ? 'default' : 'default-light';
    }
    document.documentElement.setAttribute('data-theme', theme);
    // Legacy compat: la clase .dark mapea a default-dark
    if (theme === 'default-dark') document.documentElement.classList.add('dark');
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      var colors = {
        'default': '#0b0b14',
        'default-light': '#f4f1e8',
        'default-dark': '#1a1a2e',
        'lava-neon': '#fef4ec',
        'obsidian-teal': '#f5f7fa',
        'navy-gold': '#faf8f3'
      };
      meta.setAttribute('content', colors[theme] || '#0b0b14');
    }
  } catch (e) {}
})();
`;

// ÚNICO dueño de <html> y <body>.
//
// Antes: src/app/layout.tsx Y src/app/[locale]/layout.tsx emitían ambos
// <html>/<body>. El parser HTML fusiona el <body> anidado con el externo
// (heredando su className), pero React hidrata contra el árbol del root
// layout (sin className) -> "A tree hydrated but some attributes of the
// server rendered HTML didn't match" (badge "1 Issue" en el devtools de
// Next). Ahora solo el root layout emite html/body y el layout de locale
// se limita al provider + chrome.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0b0b14",
  colorScheme: "dark light",
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
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}