import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

// next-intl v4 con [locale]/ routing + localePrefix: 'always'.
//
// El locale es resuelto por el middleware (proxy.ts) via el header
// x-next-intl-locale que next-intl setea automáticamente. getRequestConfig
// recibe ese locale via requestLocale — NO debemos leer headers()/cookies()
// directamente acá, porque eso fuerza TODAS las páginas a dinámicas y
// rompe el SSG de /[locale]/[slug] con DYNAMIC_SERVER_USAGE en build time.
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Fallback al default locale si el middleware no seteó uno
  // (caso de build sin request, o rutas inválidas).
  if (!locale || !(routing.locales as readonly string[]).includes(locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});