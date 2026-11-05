"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useTranslations } from "next-intl";

/**
 * Selector de tema (S-08 / S-09).
 *
 * El sistema multi-tema ya existía en globals.css y en el script anti-FOUC,
 * pero no había ninguna UI para cambiarlo: solo se podía editar
 * localStorage a mano. Este componente cierra ese hueco.
 *
 * Contrato:
 *  - Persiste en localStorage['portfolio-theme'] (misma clave que el
 *    bootstrap anti-FOUC de src/app/layout.tsx).
 *  - Actualiza <html data-theme> y el meta theme-color.
 *  - Cierra con Escape y con click fuera; navegable con teclado.
 *  - Respeta prefers-reduced-motion (no hay animaciones de entrada).
 */

type ThemeId =
  | "default"
  | "default-light"
  | "default-dark"
  | "lava-neon"
  | "obsidian-teal"
  | "navy-gold";

interface ThemeDef {
  id: ThemeId;
  labelKey: string;
  /** Colores de preview: fondo, superficie y acento 1 del theme. */
  swatch: [string, string, string];
}

const THEMES: ThemeDef[] = [
  { id: "default", labelKey: "themeDefault", swatch: ["#0b0b14", "#15172a", "#ff4500"] },
  { id: "default-light", labelKey: "themeDefaultLight", swatch: ["#f4f1e8", "#ffffff", "#e03c00"] },
  { id: "default-dark", labelKey: "themeDefaultDark", swatch: ["#1a1a2e", "#232342", "#ff8c42"] },
  { id: "lava-neon", labelKey: "themeLavaNeon", swatch: ["#fef4ec", "#ffffff", "#ff4500"] },
  { id: "obsidian-teal", labelKey: "themeObsidianTeal", swatch: ["#f5f7fa", "#ffffff", "#14b8a6"] },
  { id: "navy-gold", labelKey: "themeNavyGold", swatch: ["#faf8f3", "#ffffff", "#c89b3c"] },
];

const THEME_COLORS: Record<ThemeId, string> = {
  default: "#0b0b14",
  "default-light": "#f4f1e8",
  "default-dark": "#1a1a2e",
  "lava-neon": "#fef4ec",
  "obsidian-teal": "#f5f7fa",
  "navy-gold": "#faf8f3",
};

function isThemeId(value: string | null): value is ThemeId {
  return !!value && THEMES.some((theme) => theme.id === value);
}

// ------------------------------------------------------- store del atributo

const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);

  // Observa cambios externos del atributo (otra pestaña, script anti-FOUC).
  let observer: MutationObserver | undefined;
  if (typeof MutationObserver !== "undefined") {
    observer = new MutationObserver(() => onStoreChange());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
  }

  return () => {
    listeners.delete(onStoreChange);
    observer?.disconnect();
  };
}

function getThemeSnapshot(): ThemeId {
  if (typeof document === "undefined") return "default";
  const attr = document.documentElement.getAttribute("data-theme");
  return isThemeId(attr) ? attr : "default";
}

function getThemeServerSnapshot(): ThemeId {
  return "default";
}

function applyTheme(id: ThemeId) {
  const root = document.documentElement;
  root.setAttribute("data-theme", id);
  root.classList.toggle("dark", id === "default-dark");
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", THEME_COLORS[id]);
  emitChange();
}

export default function ThemeSwitcher() {
  const t = useTranslations("Navbar");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Sincroniza con el theme que aplicó el bootstrap anti-FOUC y con
  // cambios externos del atributo, sin setState dentro de un efecto.
  const current = useSyncExternalStore(
    subscribe,
    getThemeSnapshot,
    getThemeServerSnapshot,
  );

  // Click fuera + Escape.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const selectTheme = useCallback((id: ThemeId) => {
    applyTheme(id);
    try {
      localStorage.setItem("portfolio-theme", id);
    } catch {
      // localStorage bloqueado (modo privado): el theme aplica igual en esta
      // sesion, solo no persiste.
    }
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  const active = THEMES.find((theme) => theme.id === current) ?? THEMES[0];

  return (
    <div className="relative" ref={containerRef}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={t("themeMenuLabel")}
        title={t("themeLabel")}
        className="h-9 px-2 border-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider font-bold transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
        style={{
          borderColor: "var(--ink)",
          backgroundColor: "var(--paper)",
          boxShadow: "3px 3px 0 var(--ink)",
          color: "var(--ink)",
        }}
      >
        <span
          aria-hidden="true"
          className="w-3 h-3 border"
          style={{
            backgroundColor: active.swatch[0],
            borderColor: "var(--ink)",
            boxShadow: `inset 0 0 0 2px ${active.swatch[2]}`,
          }}
        />
        <span className="hidden sm:inline">{t("themeLabel")}</span>
      </button>

      {open && (
        <div
          role="menu"
          aria-label={t("themeMenuLabel")}
          className="absolute right-0 top-full mt-2 w-56 border-2 z-50 py-1"
          style={{
            backgroundColor: "var(--paper)",
            borderColor: "var(--ink)",
            boxShadow: "4px 4px 0 var(--ink)",
            color: "var(--ink)",
          }}
        >
          {THEMES.map((theme) => {
            const selected = theme.id === current;
            return (
              <button
                key={theme.id}
                role="menuitemradio"
                aria-checked={selected}
                onClick={() => selectTheme(theme.id)}
                className="w-full flex items-center gap-3 px-3 py-2 text-left font-mono text-xs uppercase tracking-wide transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--ink)]"
                style={{
                  backgroundColor: selected
                    ? "color-mix(in oklab, var(--accent-2) 22%, transparent)"
                    : "transparent",
                  color: "var(--ink)",
                }}
              >
                <span
                  aria-hidden="true"
                  className="w-6 h-6 border shrink-0 flex items-center justify-center"
                  style={{
                    backgroundColor: theme.swatch[0],
                    borderColor: "var(--ink)",
                  }}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: theme.swatch[2] }}
                  />
                </span>
                <span className="flex-1">{t(theme.labelKey)}</span>
                {selected && (
                  <span aria-hidden="true" className="font-bold">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
