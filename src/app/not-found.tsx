import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "La página que buscas no existe o fue movida.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: "var(--paper)", color: "var(--ink)" }}
    >
      <div className="text-center max-w-md">
        <h1
          className="font-heading text-8xl md:text-9xl font-bold mb-6 leading-none"
          style={{ color: "var(--ink)" }}
        >
          404
        </h1>
        <p className="font-mono text-base mb-8 leading-relaxed">
          La página que buscas no existe. Quizás el enlace está roto, o nunca
          existió en este directorio.
        </p>
        <Link
          href="/"
          className="inline-block font-heading font-bold text-base px-7 py-3 border-2 transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
          style={{
            backgroundColor: "var(--accent-1)",
            color: "var(--ink)",
            borderColor: "var(--ink)",
            boxShadow: "5px 5px 0 var(--ink)",
          }}
          aria-label="Volver al inicio del portafolio"
        >
          ← VOLVER AL INICIO
        </Link>
      </div>
    </main>
  );
}
