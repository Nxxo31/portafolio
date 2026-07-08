# Documentación del Proyecto: Portafolio Constellation

> **Proyecto:** Portafolio Profesional de Sebastian Velasco Ocampo
> **Stack:** Next.js 16.2.10, React 19.2.4, TypeScript, Tailwind CSS v4, GSAP, Framer Motion
> **Versión:** 1.0.0
> **Temática:** Universo, constelaciones interactivas y efectos galácticos

---

## 1. Vision General del Proyecto

Constellation es un sitio web de CV personal que respira galaxia. Cada sección es un planeta propio orbitando bajo un cielo estrellado. La navegación no es una lista de enlaces es una experiencia: al desplazarse, los astros se mueven, las constelaciones se trazan y el fondo del universo responde al mouse como si fueras un astronauta deslizándose por el espacio. El objetivo es dejar al visitante una impresión tan glowy y memorable que la tecnología en sí se convierta en una demostración de habilidades.

### Objetivos Principales
- Diseño adaptativo maestro (desktop, tablet, móvil, pantallas 4K).
- Rendimiento de carga ultrarrápido (< 1.5s para renderizado inicial).
- SEO sólido y estructurado para ser descubierto.
- Lighthouse score objetivo: >= 95 en todas las categorías.
- Zero accesibilidad: WCAG 2.1 AA como mínimo.

---

## 2. Diagrama de Arquitectura

```
                   ┌──────────────────────────────────────┐
                   │      Front-end (Next.js 16)         │
                   │  ┌──────────────────────────────┐  │
                   │  │  Pages (Navegación SPA)        │  │
                   │  │  - Hero Section                │  │
                   │  │  - About                       │  │
                   │  │  - Projects                    │  │
                   │  │  - Skills/Services             │  │
                   │  │  - Contact                     │  │
                   │  └──────────────────────────────┘  │
                   │  ┌──────────────────────────────┐  │
                   │  │ Componentes Reutilizables    │  │
                   │  │  - StarFieldCanvas           │  │
                   │  │  - ConstellationNav          │  │
                   │  │  - ParallaxContainer         │  │
                   │  │  - SectionWrapper            │  │
                   │  └──────────────────────────────┘  │
                   │  ┌──────────────────────────────┐  │
                   │  │  UI & Animaciones            │  │
                   │  │  - GSAP (ScrollTrigger)      │  │
                   │  │  - Framer Motion             │  │
                   │  │  - CSS 3D Transforms         │  │
                   │  └──────────────────────────────┘  │
                   │  ┌──────────────────────────────┐  │
                   │  │  Sistema de Diseño           │  │
                   │  │  - Tailwind CSS v九 (v4)    │  │
                   │  │  - CSS Variables             │  │
                   │  │  - Dark Theme Galáctico     │  │
                   │  └──────────────────────────────┘  │
                   └──────────────────────────────────────┘
                                     │
                   ┌──────────────────┼──────────────────┐
                   │                  │                  │
           ┌───────▼────────┐ ┌────────▼────────┐ ┌────────▼────────┐
           │  Despliegue    │ │   Backend       │ │  Integraciones│
           │  Vercel/Railway│ │  (Opcional)     │ │  Externas     │
           │  CI/CD          │ │  - Resend API  │ │  - Vercel 
           │  GitHub Actions │ │  - Next.js API ││  Analytics   │
           └─────────────────┘ │  - Supabase   │ │  - Google Search│
                               |(Opcional)       │ │    Console      │
                               └─────────────────┘ └─────────────────┘
```

## Componentes Principales

### StarFieldCanvas
- **Descripción:** Componente central de la experiencia visual. Renderiza un campo de estrellas nebulosas 2D o 3D que se mueven lentamente.
- **Dependencias:** `three.js` o Canvas API 2D con `react-three-fiber`.
- **Estados:** `moving` (mouse cerca), `idle` (mouse quieto).
- **Customización:** Color del gas, densidad de estrellas, velocidad de rotación.

### ConstellationNav
- **Descripción:** Sistema de navegación que traza líneas entre puntos flotantes (estrellas) cuando se hace hover. Conecta los puntos con SVG o Canvas con easing.
- **Dependencias:** GSAP (para el easing de las líneas) y `framer-motion` (para los puntos).
- **Responsive:** En móvil, se convierte en un menú hamburguesa con animación de "explosión estelar".

### SectionWrapper
- **Descripción:** Contenedor base que aplica el efecto parallax a cada sección, haciendo que se desplacen a velocidades diferentes al hacer scroll.
- **Dependencias:** GSAP ScrollTrigger.
- **Configuración:** `speed` (regula la diferencia de velocidad).

---

## Flujo de Datos (Data Flow)

```
User Interaction -> Component (React) -> State (useState/useReducer)
                                      |
                                      v
Gestion de Animaciones (GSAP/Framer) -
                                      |
                                      v
Rendering (Canvas/DOM) <------------- CSS Animations / Canvas 2D
                                      |
                                      v
External APIs (Contact, Analytics) <-> Next.js API Routes / Client-side fetch
```

