"use client";

import { useState, useEffect, useCallback } from "react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  // Inicializa el tema desde el DOM (el script anti-FOUC ya lo aplicó)
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      const root = document.documentElement;

      if (next === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }

      try {
        localStorage.setItem("theme", next);
      } catch {
        // localStorage podría estar bloqueado (modo privado); el toggle visual sigue funcionando
      }

      // Actualiza meta theme-color dinámicamente
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) {
        meta.setAttribute(
          "content",
          next === "dark" ? "#1a1a2e" : "#f4f1e8",
        );
      }

      return next;
    });
  }, []);

  // Evita render hasta que el tema esté determinado (prevents hydration mismatch)
  if (theme === null) {
    return (
      <div
        className="w-9 h-9 border-2 flex items-center justify-center"
        style={{ borderColor: "var(--ink)" }}
        aria-hidden="true"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
      className="w-9 h-9 border-2 flex items-center justify-center transition-transform duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)] hover:-translate-y-0.5 active:translate-y-0"
      style={{
        borderColor: "var(--ink)",
        backgroundColor: "var(--paper)",
        boxShadow: "3px 3px 0 var(--ink)",
        color: "var(--ink)",
      }}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={isDark ? "Modo claro" : "Modo oscuro"}
    >
      {/* Icono sol (modo oscuro → acción: ir a claro) */}
      {!isDark && (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      )}
      {/* Icono luna (modo claro → acción: ir a oscuro) */}
      {isDark && (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
