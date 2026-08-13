"use client";

import { useSyncExternalStore, useCallback } from "react";

type Theme = "light" | "dark";

// --- Store externo para tema (DOM + localStorage) ---
// Patron useSyncExternalStore: evita setState-in-effect (cascading renders)
// y mantiene el estado de React sincronizado con el DOM real.

const THEME_KEY = "theme";
const DARK_CLASS = "dark";

function subscribe(callback: () => void): () => void {
  //Escucha cambios desde otras instancias del toggle (multiples pestanas)
  window.addEventListener("storage", onStorageChange);
  return () => window.removeEventListener("storage", onStorageChange);

  function onStorageChange(e: StorageEvent) {
    if (e.key === THEME_KEY) callback();
  }
}

function getSnapshot(): Theme {
  // Lee el estado actual del DOM (fuente autoritativa despues del script anti-FOUC)
  return document.documentElement.classList.contains(DARK_CLASS)
    ? "dark"
    : "light";
}

function getServerSnapshot(): Theme {
  // En el servidor no hay DOM; defaulta a dark (tema base del portafolio)
  return "dark";
}

function setTheme(theme: Theme): void {
  const root = document.documentElement;

  if (theme === "dark") {
    root.classList.add(DARK_CLASS);
  } else {
    root.classList.remove(DARK_CLASS);
  }

  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // localStorage podria estar bloqueado (modo privado); el toggle visual sigue funcionando
  }

  // Actualiza meta theme-color dinamicamente
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", theme === "dark" ? "#1a1a2e" : "#f4f1e8");
  }
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const toggle = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme]);

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
      {/* Icono sol (modo oscuro -> accion: ir a claro) */}
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
      {/* Icono luna (modo claro -> accion: ir a oscuro) */}
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
