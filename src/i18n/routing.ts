import { defineRouting } from "next-intl/routing";

// With localePrefix: 'always', URLs are /es, /en — SEO-friendly and supports
// hreflang between locales. Default locale is 'es' (Latin American audience first).
export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "always",
});