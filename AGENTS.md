<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md — Portafolio Constellation

**Proyecto:** Portafolio profesional de Sebastian Velasco Ocampo
**Stack:** Next.js 14+ (App Router), TypeScript, Tailwind CSS v4, GSAP, Framer Motion
**Tematica:** Universo y constelaciones interactivas

## Reglas del proyecto

### Idioma y comunicacion
- **Comunicacion con Sebastian:** Español exclusivo, sin mezclas ni alternancias
- **Comentarios de codigo y documentacion:** Español
- **Nombres de variables, funciones, archivos:** Ingles (estandar industria)
- **Terminos tecnicos estandar:** Ingles (commit, deploy, callback, middleware)
- **Razonamiento tecnico interno:** Ingles (mas eficiente para logica de programacion)

### Flujo de trabajo
- Antes de tocar codigo: cargar skills relevantes (writing-plans, architecture-patterns, etc.)
- Proyectos multi-fase: crear plan de implementacion ANTES de escribir codigo
- Confirmar con Sebastian antes de cambios arquitectonicos o irreversibles
- 'Avanza con todo' = ejecutar autonomamente sin pausas

### Sistema de diseño (CSS variables, NO hardcodear colores)
- `--bg-void: #05050e` (fondo base)
- `--bg-nebula: #0d0a1f` (fondo secundario)
- `--accent-primary: #7c5cff` (violeta/indigo)
- `--accent-secondary: #22d3ee` (cian - hover y lineas constelacion)
- `--accent-gold: #f5c451` (dorado - CTAs premium)
- `--text-primary: #f4f4f8`
- `--text-muted: #a3a3b8`
- `--star-dim: #4a4a6a`

### Accesibilidad obligatoria
- Todas las animaciones respetan `prefers-reduced-motion: reduce`
- Navegacion 100% funcional solo con teclado
- Etiquetas aria en componentes interactivos
- No usar solo color para transmitir informacion

### Principios de animacion
- Usar CSS nativo (`scroll-timeline`, View Transitions API) cuando el navegador lo soporte
- Fallback a GSAP ScrollTrigger para navegadores sin soporte
- Micro-interacciones con Framer Motion
- Parpadeo de estrellas sutil (opacity pulse), NUNCA distraer del contenido