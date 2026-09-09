import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

// next-intl v4 "without i18n routing" pattern.
// El locale se resuelve por cookie NEXT_LOCALE (escrita por el proxy.ts
// custom) o Accept-Language del navegador. NO usamos [locale]/ routing,
// por lo que requestLocale puede no estar seteado — el fallback lee la
// cookie directamente via headers().
import { headers } from "next/headers";
import { hasLocale } from "next-intl";

const COOKIE_NAME = "NEXT_LOCALE";

function negotiateLocale(
  cookieValue: string | null,
  acceptLanguage: string | null,
): string {
  // 1. Cookie explícita (preferencia del usuario via toggle)
  if (cookieValue && hasLocale(routing.locales, cookieValue as never)) {
    return cookieValue;
  }
  // 2. Accept-Language header (negociación simple por prefijo)
  if (acceptLanguage) {
    const langs = acceptLanguage
      .split(",")
      .map((l) => l.split(";")[0].trim().toLowerCase());
    for (const lang of langs) {
      if (lang.startsWith("en")) return "en";
      if (lang.startsWith("es")) return "es";
    }
  }
  // 3. Default
  return routing.defaultLocale;
}

export default getRequestConfig(async () => {
  const hdrs = await headers();
  const cookie = hdrs.get("cookie") ?? "";
  // Extraer NEXT_LOCALE del header cookie (formato: "k=v; k2=v2")
  const match = cookie.match(new RegExp(`${COOKIE_NAME}=([^;\\s]+)`));
  const cookieLocale = match ? match[1] : null;
  const acceptLang = hdrs.get("accept-language");

  const locale = negotiateLocale(cookieLocale, acceptLang);

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});