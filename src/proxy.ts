import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16 renamed middleware.ts → proxy.ts (Edge runtime).
// We use next-intl's createMiddleware for locale-aware routing with
// localePrefix: 'always'. Adds locale prefix on missing locale and
// handles /, /es, /en consistently.
export default createMiddleware(routing);

export const config = {
  // Skip API routes, internal Next.js paths, static files, files with extensions.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};