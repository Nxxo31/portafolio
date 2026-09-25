"use client";

import { useSyncExternalStore, useCallback, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * ThemeSwitcher — dropdown que permite al visitante cambiar entre las 5
 * temáticas disponibles. Persiste en localStorage con key `portfolio-theme`.
 *
 * Inspirado en el switcher de NX-Studio (`?palettes` query param + paleta
 * localStorage). Acá se hace siempre visible como botón en el navbar.
 *
 * El ThemeToggle.tsx se conserva como atajo rápido para alternar entre
 * `default` ↔ `default-dark` (compatibilidad con la implementación previa).
 */

export type ThemeId =
  | "default"
  | "default-dark"
  | "lava-neon"
  | "obsidian-teal"
  | "navy-gold";

interface ThemeMeta {
  id: ThemeId;
  label: string;
  description: string;
  // Preview swatches (3 colores por theme) para el dropdown
  swatches: [string, string, string];
}

const THEMES: readonly ThemeMeta[] = [
  {
    id: "default",
    label: "Púrpura · Light",
    description: "Identidad original del portafolio, modo claro.",
    swatches: ["#1a1a2e", "#f4f1e8", "#ff6b35"],
  },
  {
    id: "default-dark",
    label: "Púrpura · Dark",
    description: "Identidad original del portafolio, modo oscuro.",
    swatches: ["#f4f1e8", "#1a1a2e", "#ff8c42"],
  },
  {
    id: "lava-neon",
    label: "Lava Neon",
    description: "Gemelo temático de NX-Studio. Naranja/rojizo Matrix.",
    swatches: ["#1a0f0a", "#fef4ec", "#ff4500"],
  },
  {
    id: "obsidian-teal",
    label: "Obsidian Teal",
    description: "Engineering minimal. Vercel vibe, paleta fría.",
    swatches: ["#0a1929", "#f5f7fa", "#14b8a6"],
  },
  {
    id: "navy-gold",
    label: "Navy Gold",
    description: "Premium enterprise. Andela/Toptal vibe.",
    swatches: ["#0f1e3d", "#faf8f3", "#c89b3c"],
  },
] as const;

const STORAGE_KEY = "portfolio-theme";
const VALID_IDS = THEMES.map((t) => t.id);

// --- Store externo: estado del theme actual ---
function subscribe(callback: () => void): () => void {
  // Multi-tab sync
  window.addEventListener("storage", onStorage);
  return () => window.removeEventListener("storage", onStorage);

  function onStorage(e: StorageEvent) {
    if (e.key === STORAGE_KEY) callback();
  }
}

function getSnapshot(): ThemeId {
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr && (VALID_IDS as string[]).includes(attr)) {
    return attr as ThemeId;
  }
  // Fallback si no hay data-theme (estado inicial antes del script anti-FOUC)
  return document.documentElement.classList.contains("dark")
    ? "default-dark"
    : "default";
}

function getServerSnapshot(): ThemeId {
  return "default";
}

function applyTheme(theme: ThemeId): void {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);

  // Compatibilidad retro: clase `.dark` para default-dark
  if (theme === "default-dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }

  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // localStorage bloqueado: el toggle visual sigue funcionando
  }

  // Actualiza meta theme-color
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    const COLORS: Record<ThemeId, string> = {
      default: "#f4f1e8",
      "default-dark": "#1a1a2e",
      "lava-neon": "#fef4ec",
      "obsidian-teal": "#f5f7fa",
      "navy-gold": "#faf8f3",
    };
    meta.setAttribute("content", COLORS[theme]);
  }
}

export default function ThemeSwitcher() {
  const theme = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const select = useCallback((id: ThemeId) => {
    applyTheme(id);
    setOpen(false);
  }, []);

  // Click outside + Escape cierran el dropdown
  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = THEMES.find((t) => t.id === theme) ?? THEMES[0];

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Cambiar temática visual"
        title="Temática"
        className="h-9 px-2 border-2 flex items-center gap-1.5 transition-transform duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)] hover:-translate-y-0.5 active:translate-y-0"
        style={{
          borderColor: "var(--ink)",
          backgroundColor: "var(--paper)",
          boxShadow: "3px 3px 0 var(--ink)",
          color: "var(--ink)",
        }}
      >
        {/* Mini swatch preview del theme activo */}
        <span className="flex gap-0.5" aria-hidden="true">
          {current.swatches.map((c, i) => (
            <span
              key={i}
              className="block w-2 h-2 border"
              style={{ backgroundColor: c, borderColor: "var(--ink)" }}
            />
          ))}
        </span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label="Temáticas disponibles"
            initial={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 0, y: -8, scale: 0.96 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 0, y: -4, scale: 0.98 }
            }
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 z-50 w-72 border-2 p-2 flex flex-col gap-1"
            style={{
              backgroundColor: "var(--paper)",
              borderColor: "var(--ink)",
              boxShadow: "6px 6px 0 var(--ink)",
              color: "var(--ink)",
            }}
          >
            {THEMES.map((t) => {
              const isActive = t.id === theme;
              return (
                <li key={t.id} role="option" aria-selected={isActive}>
                  <button
                    type="button"
                    onClick={() => select(t.id)}
                    className="w-full text-left p-2 flex items-start gap-3 border-2 transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)] hover:-translate-x-0.5 hover:-translate-y-0.5"
                    style={{
                      backgroundColor: isActive
                        ? "var(--accent-3)"
                        : "var(--surface)",
                      borderColor: "var(--ink)",
                      boxShadow: isActive
                        ? "2px 2px 0 var(--ink)"
                        : "0 0 0 transparent",
                    }}
                  >
                    {/* Swatches preview */}
                    <span
                      className="flex flex-col gap-0.5 mt-0.5 shrink-0"
                      aria-hidden="true"
                    >
                      {t.swatches.map((c, i) => (
                        <span
                          key={i}
                          className="block w-3 h-3 border"
                          style={{
                            backgroundColor: c,
                            borderColor: "var(--ink)",
                          }}
                        />
                      ))}
                    </span>
                    <span className="flex flex-col min-w-0">
                      <span className="font-heading font-bold text-xs uppercase tracking-wide truncate">
                        {t.label}
                      </span>
                      <span
                        className="text-[10px] font-mono leading-snug opacity-80"
                        style={{ color: "var(--ink)" }}
                      >
                        {t.description}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}