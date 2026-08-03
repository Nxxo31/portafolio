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
- Parpadeo de estrellas sutil (opacity pulse), NUNCA distraer del contenido## Development loop for this project

1. Read PROJECT.md → check active phase and known limitations
2. `git status` → ver estado del repo
3. Verificar LSP activo: `hermes lsp status` — si no hay clientes: `hermes lsp restart`
   **Nota en WSL**: El servidor LSP de TypeScript está instalado, pero el cliente solo se conecta cuando un editor (VS Code, etc.) abre un archivo `.ts` o `.tsx`. Mientras no haya un archivo abierto, `hermes lsp status` mostrará `active clients: none`; esto es esperado y no indica un problema. La fuente de verdad para tipos es `mcp__lsp_intelligence__live_diagnostics`, que debe dar 0 errores antes de hacer commit.
4. Skills loaded automatically by the agent before writing code: based on the project's stack (e.g., for Electron projects: electron-desktop-dev; for Next.js: nextjs-best-practices; for Go: go-environment-setup, etc.). The agent loads the appropriate stack-specific skills without needing a file reminder.
5. For tasks >1 archivo or UI work: the agent thinks first about what it's going to build, shows mockups if UI, and only then writes code. No intermediate .md files — design lives inline in PROJECT.md if needed.
6. **LSP gate**: `mcp__lsp_intelligence__live_diagnostics` en archivos modificados — 0 errores
7. **Code review gate**: `delegate_task` con skill `code-review-and-quality` — todos los findings addressados
8. **Secret scan gate**: run `gitleaks detect --staged` (via terminal tool) — no secrets detected
9. Update PROJECT.md with results BEFORE commit (only project doc allowed)
10. **Commit gate**: use GitHub MCP tools to create a commit with conventional message (type(scope): description) and push to the current branch.
11. Next task immediately.

NO vitest, NO jest, NO playwright, NO `tsc --noEmit` directo. Los gates son determinísticos: LSP live_diagnostics + delegate_task review + gitleaks + GitHub commit.
NO separate spec files, drift reports, docs/specs/, architecture overviews, or any .md outside PROJECT.md. Everything goes in PROJECT.md.

