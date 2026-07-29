import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "La página que buscas no existe o fue movida.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#05050e] text-white flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#7c5cff] to-[#22d3ee] bg-clip-text text-transparent">
          404
        </h1>
        <p className="text-[#a3a3b8] text-lg mb-8">
          La página que buscas se perdió en el espacio profundo. Quizás fue
          absorbida por un agujero negro, o nunca existió en esta constelación.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-gradient-to-r from-[#7c5cff] to-[#22d3ee] rounded-full font-semibold text-white transition-all duration-300 hover:shadow-[0_0_40px_rgba(124,92,255,0.4)] motion-safe:hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee] focus-visible:ring-offset-4 focus-visible:ring-offset-[#05050e]"
          aria-label="Volver al inicio del portafolio"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
