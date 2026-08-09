import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware (proxy) ligero para next-intl "without i18n routing".
// NO mueve la app a [locale]/ — en su lugar lee/negocia el locale y lo
// persiste en la cookie NEXT_LOCALE para que i18n/request.ts lo lea via
// headers().cookie en el server.
//
// next-intl's createMiddleware requiere [locale]/ routing, que rompería
// not-found.tsx, robots.ts, sitemap.ts y manifest.ts que viven en app/.
// Este proxy custom evita ese refactor.

const COOKIE_NAME = "NEXT_LOCALE";
const LOCALES = ["es", "en"] as const;
const DEFAULT_LOCALE = "es";

function negotiateLocale(req: NextRequest): string {
  // 1. Cookie existente
  const cookieVal = req.cookies.get(COOKIE_NAME)?.value;
  if (cookieVal && (LOCALES as readonly string[]).includes(cookieVal)) {
    return cookieVal;
  }
  // 2. Accept-Language
  const accept = req.headers.get("accept-language");
  if (accept) {
    const langs = accept
      .split(",")
      .map((l) => l.split(";")[0].trim().toLowerCase());
    for (const lang of langs) {
      if (lang.startsWith("en")) return "en";
      if (lang.startsWith("es")) return "es";
    }
  }
  // 3. Default
  return DEFAULT_LOCALE;
}

export default function proxy(req: NextRequest) {
  const locale = negotiateLocale(req);
  const res = NextResponse.next();

  // Persistir la preferencia si cambió (session cookie por defecto).
  const existing = req.cookies.get(COOKIE_NAME)?.value;
  if (existing !== locale) {
    res.cookies.set(COOKIE_NAME, locale, {
      sameSite: "lax",
      path: "/",
    });
  }

  return res;
}

export const config = {
  // Excluir rutas internas, API, estáticos y archivos con extensión.
  matcher: ["/((?!api|_next|_vercel|images|fonts|cv|.*\\..*).*)"],
};
