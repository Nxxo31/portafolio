"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

// Botón para alternar entre español e inglés.
// Usa next-intl: setea la cookie NEXT_LOCALE y hace router.refresh()
// para que el server re-renderice con el nuevo locale (sin [locale]/ routing).
// Respeta el patrón visual neobrutalist del ThemeToggle.

const COOKIE_NAME = "NEXT_LOCALE";

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("LanguageToggle");

  const toggleLocale = () => {
    const next = locale === "es" ? "en" : "es";
    // Setear cookie ANTES del refresh para que proxy.ts + request.ts la lean.
    document.cookie = `${COOKIE_NAME}=${next}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    // router.refresh() re-renderiza server components con el nuevo locale.
    router.refresh();
    // Actualizar <html lang> inmediatamente para SEO/a11y sin esperar refresh.
    document.documentElement.lang = next;
  };

  return (
    <button
      onClick={toggleLocale}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleLocale();
        }
      }}
      className="w-9 h-9 border-2 flex items-center justify-center transition-transform duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)] hover:-translate-y-0.5 active:translate-y-0 text-xs font-mono font-bold"
      style={{
        borderColor: "var(--ink)",
        backgroundColor: "var(--paper)",
        boxShadow: "3px 3px 0 var(--ink)",
        color: "var(--ink)",
      }}
      aria-label={locale === "es" ? t("switchToEn") : t("switchToEs")}
      title={locale === "es" ? "English" : "Español"}
    >
      {locale === "es" ? "EN" : "ES"}
    </button>
  );
}
