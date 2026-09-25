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

Tokens compartidos por todas las temáticas (definidos en `src/app/globals.css`):
- `--ink` (texto/borde principal)
- `--paper` (fondo base)
- `--surface` (cards/inputs)
- `--surface-dark` (sección oscura)
- `--accent-1` a `--accent-5` (paleta de 5 colores por theme)
- `--theme-color` (meta theme-color)
- `--theme-label` (debug, identifica el theme activo)

**Importante:** los colores púrpura/cian de las líneas 29-35 están **obsoletos**. El rediseño neobrutalist eliminó el starfield galáctico y reemplazó todo por un sistema de temáticas swappables.

### Sistema de temáticas múltiples (S-08)

5 themes disponibles, activables con `data-theme="..."` en `<html>`:

| Theme ID | Vibe | Identidad |
|----------|------|-----------|
| `default` | Púrpura/cyan neobrutalist light | Identidad original |
| `default-dark` | Púrpura/cyan neobrutalist dark | Modo oscuro |
| `lava-neon` | Naranja/rojizo Matrix | Gemelo temático de NX-Studio |
| `obsidian-teal` | Engineering minimal teal | Vercel vibe |
| `navy-gold` | Premium gold/navy | Andela/Toptal vibe |

**Mecánica:**
- Script anti-FOUC en `src/app/layout.tsx` lee `localStorage['portfolio-theme']` antes de hydration
- `src/components/ThemeSwitcher.tsx`: dropdown con swatches preview, click-outside + Escape
- `src/components/ThemeToggle.tsx`: atajo rápido `default` ↔ `default-dark` (conserva UX sol/luna)
- `meta[name="theme-color"]` se actualiza dinámicamente por theme
- Clase legacy `.dark` mappea retroactivamente a `default-dark` (compatibilidad)

**Para agregar un theme nuevo:**
1. Agregar bloque `:root[data-theme="<id>"] { --ink: ...; --paper: ...; ... }` en `globals.css`
2. Agregar entrada en array `THEMES` de `ThemeSwitcher.tsx` (id, label, description, swatches)
3. Agregar color en mapa `COLORS` de ThemeSwitcher.tsx (para meta theme-color)
4. Agregar script bootstrap en `layout.tsx` (default fallback y meta color)
5. Si el theme tiene dark variant, agregar toggle en `ThemeToggle.tsx`

**No hardcodear** hex colors en componentes — siempre `var(--ink)`, `var(--paper)`, `var(--accent-X)`. Los swatches del ThemeSwitcher son la única excepción documentada (preview visual).

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
## MCP Tools — MANDATORY for this project

| Task | Tool | NEVER use |
|------|------|-----------|
| Understand component structure | `mcp__lsp_intelligence__document_symbols` | grep |
| Verify type safety | `mcp__lsp_intelligence__live_diagnostics` | tsc --noEmit |
| Edit TSX/TS files | `mcp__zenith__edit_file or write_file` | sed |
| Search across codebase | `mcp__zenith__search_files` | grep, rg |
| Commit to GitHub | `mcp__github__push_files` | git commit + git push |
| Code review | `mcp__mcp_code_review_pro__review_diff` | manual inspection only |
| Visual QA | `mcp__playwright__browser_take_screenshot + browser_snapshot` | guessing UI |
| Visual parity | `mcp__visual_parity__compare_pages` | manual screenshot diff |

## Test Strategy
- Playwright: visual QA (all pages, responsive, i18n ES/EN switching, Three.js scene)
- LSP live_diagnostics: 0 type errors
- next-intl key parity: ES = EN
- npm run build: 15+ pages exit 0

## Development loop (MCP-first)
1. Read PROJECT.md FIRST
2. `mcp__lsp_intelligence__document_symbols` on files to modify — understand structure before editing
3. Edit via `mcp__zenith__edit_file` or `write_file` — NEVER sed for code
4. `mcp__lsp_intelligence__live_diagnostics` after edit — 0 errors
5. Code review via `mcp__mcp_code_review_pro__review_diff` or `delegate_task`
6. gitleaks on staged diff
7. Update PROJECT.md before commit
8. Commit via `mcp__github__push_files` — atomic conventional commit

## Development loop for this project

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

## Estrategia dual · portafolio ↔ NX-Studio (2026-09-14)

Este portafolio es el **sitio personal** de Sebastian Velasco. NX-Studio (proyecto hermano en `../NX-Studio/`) es el **sitio empresarial**. Son proyectos independientes con identidades visuales distintas.

### Delimitación de responsabilidades
- **Este portafolio**: sobre mí, proyectos personales, blog técnico, contacto directo, i18n ES/EN
- **NX-Studio** (proyecto separado): servicios empresariales, cotizador, catálogo de templates, OSINT/Testing

### Lo que este portafolio NO debe incluir
- Cotizador (eso es NX-Studio)
- Marketplace de templates (eso es NX-Studio)
- OSINT/Testing como servicios (eso es NX-Studio)
- Sección "Services for hire" (eso es NX-Studio)

### Cross-links permitidos
- Footer/About puede mencionar "También fundador de NX-Studio → https://nxxo31.github.io/NX-Studio/"
- Blog posts pueden referenciar proyectos de NX-Studio como contexto
- Compartir mismos assets (avatar, OG base, fonts) pero identidad visual se mantiene diferenciada

### Identidad visual (NO cambiar)
- Paleta púrpura `#7c5cff` + cian `#22d3ee` (neobrutalist galáctico)
- `--bg-void: #05050e`, `--bg-nebula: #0d0a1f`
- `--accent-primary: #7c5cff`, `--accent-secondary: #22d3ee`, `--accent-gold: #f5c451`
- El rediseño lava neon (naranja/rojizo) es SOLO para NX-Studio, NO aplicar aquí

### Si necesitas implementar algo que cruza ambos proyectos
- Primero confirmar con Sebastian si va en portafolio, NX-Studio, o ambos
- Si va en ambos: definir si comparte componentes o se duplican (probablemente duplicar por ahora, las sintasidades son distintas)
- Documentar la decisión en PROJECT.md de cada uno

