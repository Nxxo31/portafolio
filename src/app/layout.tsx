import { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Sebastian Velasco | Full-Stack Developer & AI Architect",
  description: "Portafolio profesional de Sebastian Velasco - Ingeniero de Software especializado en Next.js, React, TypeScript y arquitecturas escalables.",
  keywords: [
    "Sebastian Velasco",
    "Full-Stack Developer",
    "AI Architect",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Portafolio",
    "Colombia",
  ],
  authors: [{ name: "Sebastian Velasco", url: "https://github.com/nxxo31" }],
  openGraph: {
    title: "Sebastian Velasco | Full-Stack Developer & AI Architect",
    description: "Portafolio profesional de Sebastian Velasco",
    url: "https://sebastianvelasco.dev",
    siteName: "Sebastian Velasco Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sebastian Velasco Portfolio",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sebastian Velasco | Full-Stack Developer",
    description: "Portafolio profesional de Sebastian Velasco",
    images: ["/og-image.jpg"],
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
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}