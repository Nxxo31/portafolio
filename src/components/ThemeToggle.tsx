"use client";

import { useSyncExternalStore, useCallback } from "react";

/**
 * ThemeToggle — atajo rápido para alternar entre `default` ↔ `default-dark`.
 *
 * Conservado como UX familiar: el switcher completo (`ThemeSwitcher.tsx`)
 * vive al lado en el navbar y ofrece las 5 temáticas. Este botón solo
 * maneja la conmutación claro/oscuro del theme neobrutalist original.
 *
 * Usa el mismo store externo que ThemeSwitcher (mismo `data-theme` attr),
 * así ambos componentes se mantienen sincronizados en multi-tab y comparten
 * el snapshot de useSyncExternalStore.
 */

type Mode = "light" | "dark";
const STORAGE_KEY = "portfolio-theme";
const DARK_CLASS = "dark";
const DEFAULT_DARK = "default-dark";
const DEFAULT_LIGHT = "default";

function subscribe(callback: () => void): () => void {
  window.addEventListener("storage", onStorage);
  return () => window.removeEventListener("storage", onStorage);

  function onStorage(e: StorageEvent) {
    if (e.key === STORAGE_KEY) callback();
  }
}

function getSnapshot(): Mode {
  // Lee data-theme y mapea a light/dark
  const theme = document.documentElement.getAttribute("data-theme");
  if (theme === DEFAULT_DARK) return "dark";
  if (theme && theme !== DEFAULT_LIGHT) return "light"; // otros themes = light surface
  return document.documentElement.classList.contains(DARK_CLASS)
    ? "dark"
    : "light";
}

function getServerSnapshot(): Mode {
  return "dark";
}

function toggleMode(current: Mode): void {
  const root = document.documentElement;
  const next: Mode = current === "dark" ? "light" : "dark";
  const nextTheme = next === "dark" ? DEFAULT_DARK : DEFAULT_LIGHT;

  root.setAttribute("data-theme", nextTheme);

  if (next === "dark") {
    root.classList.add(DARK_CLASS);
  } else {
    root.classList.remove(DARK_CLASS);
  }

  try {
    localStorage.setItem(STORAGE_KEY, nextTheme);
  } catch {
    // localStorage bloqueado
  }

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", next === "dark" ? "#1a1a2e" : "#f4f1e8");
  }
}

export default function ThemeToggle() {
  const mode = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const toggle = useCallback(() => toggleMode(mode), [mode]);

  const isDark = mode === "dark";

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
      {/* Sol (modo claro → ir a oscuro) */}
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
      {/* Luna (modo oscuro → ir a claro) */}
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