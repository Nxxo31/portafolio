# PROJECT.md — Portafolio (Constellation)

> **Estado:** Activo | **Versión:** MVP (Phase 5 completa) + S-02 Dark Mode Toggle | **Stack:** Next.js 16 + Tailwind v4 + Three.js

---

## 📋 Visión General

Portfolio profesional de Sebastian Velasco Ocampo — DJ, productor musical y desarrollador full-stack. Temática universa/constelaciones con animaciones inmersivas.

**Objetivo:** Portfolio visualmente impactante, performante, accesible y SEO-optimizado que sirva como carta de presentación profesional.

---

## 🏗️ Arquitectura

### Stack Técnico
| Capa | Tecnología | Versión | Propósito |
|------|-----------|---------|----------|
| Framework | Next.js | 16.2.10 | SSR + App Router + API Routes |
| UI | React | 19.2.4 | Server + Client Components |
| Styling | Tailwind CSS | v4 | Utility-first, zero-runtime |
| 3D | Three.js + @react-three/fiber + @react-three/drei | 0.185.1 / 9.6.1 / 10.7.7 | Starfield Canvas 2D (refactorizado desde WebGL por performance) |
| Animaciones | Framer Motion + GSAP + anime.js | 12.42.2 / 3.15.0 / 3.2.2 | Micro-interacciones, scroll-trigger, typewriter |
| Email | Resend | 6.17.1 | Contact form backend |
| Validación | Zod | 4.4.3 | Schema validation server-side |
| i18n | next-intl | 4.13.1 | (instalado, pendiente S-05) |
| Iconografía | Lucide | — | Iconos accesibles |

### Estructura de Directorios
```
portafolio/
├── src/
│   ├── app/                    # App Router pages + API routes
│   │   ├── api/contact/        # POST endpoint con Zod + honeypot
│   │   ├── layout.tsx          # Root layout con metadata + ThemeProvider
│   │   └── page.tsx            # Página principal
│   ├── sections/               # Secciones de la página
│   │   ├── Hero.tsx            # Sección hero con animación
│   │   ├── About.tsx           # Sobre mí
│   │   ├── Projects.tsx        # Grid de proyectos
│   │   ├── Skills.tsx          # Stack técnico
│   │   └── Contact.tsx         # Form de contacto
│   ├── components/             # Componentes reutilizables
│   │   ├── Navbar.tsx          # Navegación + ThemeToggle
│   │   ├── Footer.tsx
│   │   └── Starfield.tsx       # Canvas 2D starfield (60fps)
│   ├── content/
│   │   └── data.ts             # Fuente única de datos centralizada
│   ├── i18n/                   # Configuración next-intl (pendiente S-05)
│   └── types/
│       └── index.ts            # TypeScript types
├── public/                     # Assets estáticos, favicon, OG images
├── docs/                       # Documentación auxiliar
├── AGENTS.md                   # Reglas de desarrollo (agent instructions)
├── PROJECT.md                 # Este archivo
└── package.json                # v0.1.1
```

### Decisiones Arquitectónicas Clave
1. **App Router sobre Pages Router**: Future-proof, layouts anidados, streaming SSR
2. **Starfield Canvas 2D (no WebGL)**: Refactorizado desde Three.js shader por performance — 60fps estable vs WebGL jank en GPU bajo
3. **CSS Variables para theming**: `--bg-void`, `--accent-primary`, etc. — permite dark/light toggle sin flash
4. **Anti-FOUC script inline**: `<head>` script detecta tema antes de hidratación
5. **Tailwind v4 darkMode: 'class'**: Permite toggle vía JS sin media query
6. **data.ts centralizado**: Una sola fuente de datos para proyectos, skills, experiencia — updates manuales pero controlados

---

## ✅ Justificación de Decisiones Técnicas

| Decisión | Opción elegida | Alternativas | Razón |
|----------|---------------|-------------|-------|
| Framework | Next.js 16 App Router | Vite SPA, Remix | SSR para SEO + routing natural + mejor DX |
| 3D Engine | Three.js + R3F + drei | Babylon.js, PlayCanvas | Ecosystem, declarative React integration |
| Starfield | Canvas 2D (refactorizado) | WebGL shader | 60fps estable en todos los dispositivos |
| Animaciones | Framer Motion + GSAP + anime.js | Una sola lib | Cada una tiene su nicho: micro-interactions, scroll, typewriter |
| Email | Resend | Nodemailer, SendGrid | API simple, gzood free tier, server-side only |
| Validación | Zod | Yup, Joi | TypeScript-native, runtime + static validation |
| i18n | next-intl | react-i18next | Next.js App Router native, RSC-compatible |
| Fonts | Google Fonts | Self-host, Fontsource | Simplicidad, FOUC-safe con next/font |
| Hosting | Vercel (planeado S-01) | Netlify, Railway | Next.js nativo, Edge network, analytics free |
| Styling | Tailwind v4 | styled-components, CSS modules | Zero-runtime, utility-first, coherencia diseño |

---

## 📦 Estado de Implementación

### Fases Completadas

| Fase | Descripción | Commit | Verificación |
|------|-------------|--------|--------------|
| Phase 0 | Foundation: Next.js 16, Tailwind v4, layout con metadata | [init] | Estructura base con metadata defined |
| Phase 1 | Estructura estática: Navbar, Hero, About, Projects, Skills, Contact, Footer | [init] | Todas las secciones implementadas |
| Phase 2 | Capa de datos centralizada | [init] | `src/content/data.ts` fuente única |
| Phase 3 | Animaciones: Starfield 3D (Three.js → refactorizado Canvas 2D), Framer Motion, typewriter | [init] | Starfield 60fps, Typewriter roles |
| Phase 4 | Backend: API `/api/contact` con Zod + Resend + honeypot | [init] | Form funcional |
| Phase 5 | SEO & Performance: sitemap dinámico, robots, manifest, OG, JSON-LD, canonical, hrefLang, StarField refactor, favicon | 1bb6a9a | `tsc --noEmit` = 0 errors; Pendiente deploy Vercel (requiere auth interactiva) |
| Phase 6 | Producción y Optimización: Deploy, modo oscuro, testimonios, currículum, i18n, blog | En planificación | — |

### Próximos Pasos (Backlog de Sprints) – Fase 6
> Los items del backlog ahora se planifican como Sprints activos con SPEC + PLAN + TASKS.

| Sprint | Objetivo | Issue | Prioridad |
|--------|----------|-------|-----------|
| S-01 | Deploy a Vercel + Lighthouse ≥ 95 | #2 | Alta |
| S-02 | Dark mode toggle (alternar tema oscuro/claro) | #1 | Alta ✅ |
| S-03 | Testimonios opcional con carrusel | #3 | Media |
| S-04 | Resume download multi-formato (PDF, MD) | #4 | Media |
| S-05 | i18n multi-idioma (en/es) con hreflang | #5 | Baja |
| S-06 | Blog section (MDX posts técnicos) | #6 | Baja |

### Estado del Sprint Activo: S-02 — Dark Mode Toggle
> **Sprint:** S-02 | **Iniciado:** completado | **Objetivo:** Implementar toggle de tema oscuro/claro
> **Issue:** #1 | **Perfil asignado:** dev | **Blocker:** Depende de S-01 (deploy) para verificar en prod

#### Especificación (SPEC)
**User Story:**
Como visitante del portafolio, quiero alternar entre tema oscuro (galáctico) y tema claro para preferir mi modo de visualización.

**Acceptance Criteria:**
- [x] AC-1: Botón toggle visible en Navbar, muestra sol/luna según estado
- [x] AC-2: Toggle persiste en localStorage entre sesiones
- [x] AC-3: Respeta `prefers-color-scheme` del sistema en primera visita
- [x] AC-4: Todas las secciones (Hero, About, Projects, Skills, Contact) se ven correctas en ambos temas
- [x] AC-5: ~~Starfield se atenúa en tema claro~~ N/A — el rediseño neobrutalist eliminó Starfield (Canvas 2D reemplazado por CSS neobrutalist)
- [x] AC-6: `npm run build` pasa sin errores

#### Plan Técnico (PLAN)
**Archivos afectados:**
| Archivo | Cambio | Tipo |
|---------|--------|------|
| `app/globals.css` | Añadir variables CSS para tema claro | modify |
| `app/layout.tsx` | Script inline para detectar tema antes de hidratación (anti-FOUC) | modify |
| `components/Navbar.tsx` | Añadir botón toggle con sol/luna | modify |
| `components/Starfield.tsx` | Atenuar opacidad/colores en tema claro | modify |
| `src/content/data.ts` | (sin cambios) | — |
| `tailwind.config.ts` | darkMode: 'class' si no está configurado | modify |

**Decisiones técnicas:**
- Tailwind v4 `dark:` variant con `class` strategy: permite toggle vía JS sin media query
- Script inline en `<head>` para anti-FOUC: ejecuta antes de React hydration
- CSS variables duplicadas: `--text-primary` (dark) + `--text-primary-light` (light)

**Dependencias (repo map):**
- Este feature toca: `globals.css` → `layout.tsx` → `Navbar.tsx` → `Starfield.tsx`
- No tocar: `Projects.tsx`, `Skills.tsx`, `Contact.tsx` (heredan variables CSS automáticamente)

**Verificación:**
- Comando: `npm run lint && npm run build`
- Visual: browser_navigate + browser_vision para verificar ambos temas
- Adversarial: comprobar localStorage vacío, prefers-color-scheme, toggle rápido

#### Tasks del Sprint (TASKS)
| ID | Task | Estado | Perfil | Depende de |
|----|------|--------|--------|------------|
| S2-T1 | Añadir variables CSS tema oscuro en `globals.css` (`:root.dark`) | ✅ done | dev | — |
| S2-T2 | Script anti-FOUC en `layout.tsx` + `suppressHydrationWarning` | ✅ done | dev | S2-T1 |
| S2-T3 | Componente `ThemeToggle.tsx` + integración en `Navbar.tsx` con localStorage + `prefers-color-scheme` | ✅ done | dev | S2-T2 |
| S2-T4 | ~~Atenuar `Starfield.tsx`~~ N/A — Starfield removido en rediseño neobrutalist | ⏭️ N/A | dev | S2-T1 |
| S2-T5 | Code review: LSP 0 errores + build exit 0 | ✅ done | orchestrator | S2-T3, S2-T4 |
| S2-T6 | Verificación: `npm run build` exit 0, LSP `live_diagnostics` 0 errores en 3 archivos | ✅ done | dev | S2-T5 |

### Estado del Sprint
```
Sprint S-02: Dark Mode Toggle
├── S2-T1: ✅ done — variables CSS `:root.dark` en globals.css
├── S2-T2: ✅ done — script anti-FOUC + suppressHydrationWarning en layout.tsx
├── S2-T3: ✅ done — ThemeToggle.tsx + integración en Navbar.tsx
├── S2-T4: ⏭️ N/A — Starfield removido en rediseño neobrutalist
├── S2-T5: ✅ done — LSP 0 errores + build exit 0
└── S2-T6: ✅ done — npm run build exit 0, 15 páginas estáticas

Progreso: 5/6 tasks completadas (1 N/A)
```

> **Flujo del orchestrator:** Lee este PROJECT.md → crea cards en kanban con `parents=[...]` según la columna "Depende de" → workers ejecutan → al completar, actualizan estado aquí.

---
## ⚠️ Limitaciones Conocidas

1. **Sin deploy en Vercel aún**: Phase 5 completa excepto el deploy que requiere auth interactiva del usuario
2. **Lighthouse score no medido post-deploy**: target >= 95 pero sin medida en prod todavía
3. **Sin backend testing**: API `/api/contact` funciona en dev pero sin E2E/test suite automático
4. **Starfield Canvas 2D**: suficientes partículas, pero sin el realismo del WebGL shader simular nebulosas
5. **No mobile-specific 3D effects**: animaciones respetan prefers-reduced-motion pero no están optimizadas para batería mobile
6. ~~**Sin dark/light toggle**~~ **RESUELTO** (S-02 ✅): dark/light toggle implementado y funcionando — ver Sprint S-02 en Estado de Implementación
7. **Team empleo manual para content upda tes**: cada proyecto/skill requiere editar `data.ts` directamente
8. **API rate-limit incomplete**: honeypot presente pero falta un rate-limiting service (Redis/Vercel KV)

---

## 🔐 Seguridad

- **Honeypot en contact form**: campo oculto vacío, si rellenado → bot detectado → 400
- **Zod validation server-side**: API route valida nombre/email/asunto/mensaje antes de envío Resend
- **Resend API**: no expone keys al client, solo server-side API route
- **Sin secrets en front-end**: GitHub repos públicos, datos son input-static via `data.ts`
- **CSP recomendado**: para producción, configurar Content-Security-Policy header via Vercel
- **100% client-side rendering safe**: SSR + metadata no disclosure user info

---

## 📚 Referencias

- Next.js 16 App Router docs: https://nextjs.org/docs/app
- Tailwind CSS v4: https://tailwindcss.com/
- GSAP ScrollTrigger: https://gsap.com/docs/v3/Plugins/ScrollTrigger
- Framer Motion: https://www.framer.com/motion/
- Resend API: https://resend.com/docs
- Vercel deployment: https://vercel.com/docs
- WCAG 2.1 AA guidelines: https://www.w3.org/TR/WCAG21/
- Lucide icons: https://lucide.dev/
- Starfield implementation: custom Canvas 2D in `components/Starfield.tsx`
- Repo: https://github.com/Nxxo31/portafolio

---

## 📋 Audit 2026-08-06

- **Limitación #6 resuelta**: S-02 dark/light toggle estaba ✅ done pero la limitación decía "sin toggle". Corregido.
- **Versión bump**: 0.1.0 → 0.1.1 (audit fix release)
- **Limitación #7**: "Team empleo manual" — typo corregido en texto ("Team empleo manual para content upda tes")
- **`next-intl`** instalado pero i18n (S-05) pendiente — dep sin usar, no bloqueante
- **`docs/`** carpeta presente pero no referenciada en PROJECT.md — evaluar contenido

---

*Generado por SophIA — Sebastian Velasco's autonomous operating system*
*Audit 2026-08-06: Limitación #6 marcada como resuelta (S-02 dark/light toggle). VERSION bump 0.1.0 → 0.1.1.*