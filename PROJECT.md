# Constellation Portfolio — Plataforma de Desarrollo

> **Estado:** Diseño arquitectónico completado. Plan de implementación generado.
> **Última actualización:** 2025-08-26

## 1. Visión General

Portafolio profesional de Sebastian Velasco (Nxxo31) con estética espacial. Constellation es un SPA que demuestra habilidades técnicas mientras proporciona una experiencia inmersiva para el usuario.

**Objetivos:**
- Rendimiento de carga ultrarrápido (< 1.5s)
- Lighthouse score >= 95 (Performance, Accessibility, SEO, Best Practices)
- Accesibilidad: WCAG 2.1 AA

---

## 2. Stack Tecnológico

| Componente | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router) |
| React Version | 19.2.4 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animaciones | GSAP (ScrollTrigger), Framer Motion |
| Fondo Estelar | Canvas 2D API |
| API Email | Resend API |
| Iconos | Lucide React |
| Hosting | Vercel |

---

## 3. Arquitectura de Componentes

```
app/page.tsx
├─ Starfield (Canvas 2D background)
├─ Navbar (Fixed, smooth scroll)
├─ Hero (Static + Typewriter)
├─ About (Flex/grid layout)
├─ Projects (Grid w/ filtering)
├─ Skills (Grouped tags)
├─ Contact (Form + Info)
└─ Footer
```

**Decisiones Clave:**
- Preferir CSS nativo y lógica simple para animaciones donde sea posible. Usar GSAP/Framer como capa de progresive enhancement.
- Todos los datos editables deben importarse desde `src/content/data.ts`.

---

## 4. Requisitos Funcionales (Consolidados)

| ID | Categoría | Requerimiento | Prioridad | Criterio de Aceptación |
|---|---|---|---|---|
| R-01 | Layout | SPA con secciones: Hero, About, Projects, Skills, Contact | Alta | Estructura navegable con anchors |
| R-02 | Layout | Navbar fija (Fixed), visible después de scroll > 100px | Alta | Siempre presente post-scroll |
| R-03 | Navegación | Smooth scrolling entre secciones y resaltar link activo | Alta | Animación fluida al clicar nav |
| R-04 | Hero | Título estático "Ingeniero de Software" + Subtítulo Typewriter (roles rotan 2s) | Alta | Sin depender de animación para ver texto |
| R-05 | Hero | CTA a sección Contacto | Alta | Navegación correcta y accesible |
| R-06 | Hero | Fondo interactivo (Canvas 2D estrellas + nebulosas), respuesta al cursor | Media | Movimiento y reacción al mouse |
| R-07 | About | Sección bio (foto + 2-3 párrafos) + Redes sociales clicables | Alta | Contenido claro y legible |
| R-08 | Projects | Grid tarjetas (nombre, desc, foto/gif, stack). Al menos 4 proyectos | Alta | Grid funcional y clickeable |
| R-09 | Projects | Clic en tarjeta lleva a detalle o repositorio externo | Alta | Enlace funcional |
| R-10 | Projects | Filtrado dinámico por tech (Web, Mobile, AI, etc.) | Media | Filtro toggle real |
| R-11 | Skills | Visualización de habilidades (tags/bar chart) agrupadas | Media | Visualización clara |
| R-12 | Contact | Formulario funcional (Nombre, Email, Asunto, Mensaje) | Alta | Validación + envío exitoso |
| R-13 | Contact | Info de contacto visible + Botón copiar email al portapapeles | Alta | Datos visibles y funcional para copiar |
| R-14 | Contact | Iconos de redes sociales clicables | Media | Funcionalidad correcta |
| R-15 | Responsive | Diseño adaptativo sin scroll horizontal | Alta | Layout correcto en mobile y tablet |
| R-16 | Testimonios | (Opcional) Sección de reviews con carrusel | Baja | Componente opere correctamente |

---

## 5. Requisitos No Funcionales (Consolidados)

| ID | Categoría | Requerimiento | Especificación | Prioridad |
|---|---|---|---|---|
| RNF-01 | Rendimiento | Tiempo carga inicial < 1.5s | Lighthouse >= 90 | Alta |
| RNF-02 | Rendimiento | Animaciones sin jank (60fps) | Test perf monitor | Alta |
| RNF-03 | Rendimiento | Fallback de Canvas/Canvas 2D si WebGL no soportado | GPU >= 40% usage | Media |
| RNF-04 | Rendimiento | Lazy loading imágenes fuera del viewport inicial | `loading="lazy"` | Media |
| RNF-05 | SEO | Meta-tags, Open Graph, JSON-LD | OG + Schema.org | Alta |
| RNF-06 | SEO | Sitemap.xml y robots.txt | Indexación correcta | Alta |
| RNF-07 | SEO | Descripción y canonicalidad | Evitar contenido duplicado | Alta |
| RNF-08 | Accesibilidad | Navegación 100% teclado | Tab, Enter, Tabindex | Alta |
| RNF-09 | Accesibilidad | Aria-labels en componentes interactivos | Desplegables y menú | Alta |
| RNF-10 | Accesibilidad | Contraste de texto suficiente | Ratio WCAG AA 4.5:1 | Alta |
| RNF-11 | Accesibilidad | Respeto a prefers-reduced-motion | `@media` query | Media |
| RNF-12 | Accesibilidad | Labels vinculados a inputs de formulario | HTML for/id | Alta |
| RNF-13 | Diseño | Consistencia temática galáctica (variables CSS) | Fondo `#05050e`, acentos, texto | Alta |
| RNF-14 | Diseño | Tipografía legible y minimalista | Inter o Space Grotesk | Media |
| RNF-15 | Compatibilidad | Navegadores actuales (últimos 2 años) | Chrome, Firefox, Safari, Edge | Alta |
| RNF-16 | Mantenibilidad | Componentes modulares, TS estricto | Props tipadas | Alta |
| RNF-17 | Mantenibilidad | Configuración centralizada para datos del proyecto y personales | `data.ts` | Media |
| RNF-18 | Mantenibilidad | Separación lógica de secciones en componentes | estructura directorios | Media |
| RNF-19 | Seguridad | Formulario protegido (Honeypot básico) | Campo oculto vacío | Media |
| RNF-20 | Despliegue | Minificar CSS y JS en producción | Build optimizado | Alta |
| RNF-21 | Escalabilidad | Facilidad para agregar nuevos proyectos | Estructura de datos flexible | Alta |

---

## 6. Plan de Implementación (Estructura de Tareas)

### Phase 0: Foundation
1. **Audit & Clean:** Verificar estructura actual y dependencias.
2. **Install Deps:** Instalar `framer-motion`, `gsap`, `lucide-react`.
3. **Global Styles:** Configurar Tailwind v4 con variables CSS galácticas.
4. **Layout Root:** Metadata, Open Graph, JSON-LD, Viewport.

### Phase 1: Static Structure
5. **Navbar:** Fixed + mobile hamburger menu.
6. **Hero:** Static title + Typewriter + CTA.
7. **About:** Bio + photo + social links.
8. **Projects:** Grid + filtering + external links.
9. **Skills:** Tags + levels grouping.
10. **Contact:** Form + copy email + socials.
11. **Footer:** Copyright + quick links.

### Phase 2: Data
12. **Data Layer:** Centralizar todo en `src/content/data.ts`.

### Phase 3: Animations
13. **Starfield (Canvas):** Fondo interactivo con estrellas y nebulosas.
14. **Smooth Scroll:** Scroll suave entre secciones y active link en navbar (IntersectionObserver).
15. **Scroll Animations:** GSAP ScrollTrigger para entrada de secciones (fade-in + Y translate). Respetar `prefers-reduced-motion`.
16. **Mobile Polish:** Touch events, font sizing.

### Phase 4: Backend
17. **API Contact:** Endpoint `POST /api/contact`. Validación + Resend + Honeypot + Rate limiting.

### Phase 5: SEO & Performance
18. **Sitemap & Robots:** Generación dinámica.
19. **Image Optimization:** `<Image>` de Next.js, WebP/AVIF, lazy loading.
20. **Deploy:** CI/CD Vercel, variables de entorno, verificación Lighthouse.

---

## 7. Testing & QA Checklist (Pre-deploy)

- [ ] Build: `npm run build` sin errores.
- [ ] Lint: `npm run lint` sin errores críticos.
- [ ] TypeCheck: `tsc --noEmit` pasa.
- [ ] Lighthouse: Puntuaciones > 90 en Performance, Accessibility, SEO.
- [ ] Responsiveness: iPhone SE, iPad, Desktop (1440px).
- [ ] Animations: Validación de `prefers-reduced-motion`.
- [ ] Form: Flujo completo de validación y envío.
- [ ] Links: Verificación de todos los enlaces externos y anclajes.
