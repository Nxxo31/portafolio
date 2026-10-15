import { ContentData } from "@/types/content";

export const contentData: ContentData = {
  profile: {
    name: "Sebastián Velasco Ocampo",
    tagline: "Desarrollador Full-Stack & Arquitecto de Agentes IA",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "sebastianvelasco2005@gmail.com",
    githubUrl: "https://github.com/Nxxo31",
    cvPdfPath: "/cv-sebastian-velasco.pdf",
  },

  projects: [
      {
        slug: "multra-eu",
        title: "Multra E.U. — CDA y Gestoría Vehicular",
        client: "Multra E.U.",
        industry: "CDA / Gestoría vehicular · Neiva, Huila",
        shortDescription:
          "Sistema de gestión integral para un CDA en producción: cotizador público con IVA, panel admin JWT, 9 secciones operativas, Express + Postgres serverless en Vercel.",
        fullDescription:
          "Sistema full-stack en producción (multra-eu.vercel.app) que cubre el ciclo completo de un CDA: landing con cotizador público sin auth, captura de leads, panel admin con JWT y 9 secciones operativas (Dashboard con KPIs, Vehículos, Citas, Inspección RTM, Pólizas, Cotizador autenticado, Pagos, Trámites, Clientes). Backend Express con arquitectura hexagonal manual (controller→service→repository), validación Zod en runtime, JWT con bcryptjs, rate-limit por IP, y adapter de DB que intercambia SQLite (dev) por Neon Postgres (prod) sin tocar lógica de negocio.",
        challenge:
          "El CDA operaba con hojas de cálculo y WhatsApp: cotizar un SOAT tomaba 10 minutos, las alertas de vencimiento SOAT/técnico-mecánica se perdían, y no había visibilidad de ingresos por técnico. Reconstruir todo en una herramienta usable desde el celular del operador requería un sistema que reemplazara el flujo y demostrara valor en menos de 2 semanas.",
        solution:
          "Producto end-to-end con dos canales: (1) landing pública con cotizador embebido, calculadora de combos con IVA, mapa de ubicación y chatbot de preguntas frecuentes — reduce el tiempo de cotización de 10 min a 30 seg. (2) Panel admin con auth JWT, KPIs en tiempo real, alertas automáticas de vencimiento SOAT/RTM a 30/15/0 días, agenda por técnico, registro de inspecciones y pagos con referencias trazables.",
        results:
          "Landing pública + cotizador público → cualquier visitante cotiza sin login y deja lead con un click. Panel admin → un solo operador gestiona clientes, vehículos, citas, inspecciones, pólizas y trámites sin hojas de cálculo. Validación con Zod evita datos corruptos. JWT en localStorage permite login persistente entre sesiones sin servidor de sesiones.",
        metrics:
          "20 servicios en catálogo · 11 endpoints REST · 9 secciones SPA · 2 modos DB (SQLite/Postgres) · JWT 8h TTL · rate-limit 300/15min",
        stack: [
          "Node.js 20",
          "Express 4",
          "JWT",
          "bcryptjs",
          "Zod",
          "better-sqlite3",
          "Neon Postgres",
          "Vercel",
          "pino",
          "helmet",
          "HTML/JS vanilla",
        ],
        role: "Arquitecto & Full-Stack Developer",
        impact:
          "Sistema completo en producción: cotización de 10 min → 30 seg, 0 dependencias JS en frontend, deploy con git + auto-deploy cuando conecte GitHub Login.",
        repoUrl: "https://github.com/Nxxo31/multra-eu",
        demoUrl: "https://multra-eu.vercel.app",
        image: "/img/projects/multra-eu/hero.png",
        featured: true,
      },
      {
        slug: "nam",
        title: "NexoAccManager (NAM)",
      shortDescription:
        "Gestor de cuentas Roblox open-source, 100% local, con encriptación AES-256-GCM y arquitectura hexagonal.",
      fullDescription:
        "Aplicación de escritorio multi-OS para gestión centralizada de cuentas Roblox con encriptación AES-256-GCM, 91 canales IPC tipados, sistema i18n trilingüe (ES/EN/PT), y arquitectura hexagonal domain-driven. Sin servidores, sin nube.",
      stack: [
        "Electron 30",
        "React 18",
        "TypeScript",
        "Mantine v7",
        "Zustand",
        "SQLite",
        "AES-256-GCM",
      ],
      role: "Lead Developer & Arquitecto",
      impact: "91 canales IPC seguros, 3 idiomas, installer NSIS multi-OS",
      repoUrl: "https://github.com/Nxxo31/NexoAccManager",
      featured: true,
    },
    {
      slug: "synthetic-trader",
      title: "Synthetic-Trader",
      shortDescription:
        "Plataforma SaaS para bots de trading algorítmico en índices sintéticos con risk management institucional.",
      fullDescription:
        "Bot de trading algorítmico con 5 estrategias (Breakout, Volatility, Confluence, StepIndex, DriftBoomCrash), backtesting con walk-forward + Monte Carlo, paper trading 24/7, capital allocator con gestión de superávit, y dashboard Next.js con WebSocket live-data.",
      stack: [
        "Python 3.12",
        "FastAPI",
        "Deriv WebSocket",
        "Next.js 16",
        "Recharts",
        "Docker",
      ],
      role: "Lead Developer",
      impact:
        "Paper trading 24/7 activo, 5 estrategias, Kelly dinámico, circuit breakers",
      repoUrl: "https://github.com/Nxxo31/synthetic-trader",
      featured: true,
    },
    {
      slug: "e14-fraud-detector",
      title: "E-14 Fraud Detector",
      shortDescription:
        "Sistema de auditoría ciudadana electoral con OCR, QR/barcode, y VLM workers.",
      fullDescription:
        "Sistema automatizado para auditoría forense de formularios electorales escaneados. Utiliza OpenCV para normalizar imágenes, PyMuPDF para procesar PDFs, Tesseract OCR para extraer texto, pyzbar para validar QR/barcode, y NVIDIA NIM para inferencia con VLM. Pipeline de workers distribuidos.",
      stack: [
        "Python",
        "FastAPI",
        "OpenCV",
        "PyMuPDF",
        "Tesseract OCR",
        "pyzbar",
        "NVIDIA NIM",
      ],
      role: "Lead Developer",
      impact: "Automatización del 95% del análisis documental electoral.",
      repoUrl: "https://github.com/Nxxo31/e14-fraud-detector",
      featured: true,
    },
    {
      slug: "contract-guard",
      title: "Contract Guard",
      shortDescription:
        "Validador de contratos con rules engine configurable y soporte OpenAPI/GraphQL/gRPC.",
      fullDescription:
        "Plataforma de validación de contratos API con un rules engine configurable. Soporta especificaciones OpenAPI, GraphQL schemas y protobuf/gRPC. Genera reportes de compliance y diffs entre versiones.",
      stack: [
        "Node.js",
        "TypeScript",
        "React",
        "Vite",
        "GraphQL",
        "gRPC",
      ],
      role: "Full-Stack Developer",
      impact: "Rules engine configurable, multi-protocol (REST/GraphQL/gRPC).",
      repoUrl: "https://github.com/Nxxo31/contract-guard",
      featured: false,
    },
    {
      slug: "supply-radar",
      title: "Supply Radar",
      shortDescription:
        "CLI de supply chain security con SBOM export y mode recursive para monorepos.",
      fullDescription:
        "Herramienta CLI en Go para auditoría de supply chain security. Exporta SBOM en formatos SARIF, SPDX y CycloneDX. Mode recursive para atravesar monorepos, integración con OSV/GHSA y scoring de vulnerabilidades.",
      stack: ["Go", "CLI", "SARIF", "SPDX", "CycloneDX"],
      role: "Lead Developer",
      impact: "SBOM multi-formato (SARIF/SPDX/CycloneDX), modo recursive para monorepos.",
      repoUrl: "https://github.com/Nxxo31/supply-radar",
      featured: false,
    },
    {
      slug: "grani-usco",
      title: "Grani USCO",
      shortDescription:
        "Plataforma web agrícola con SEO técnico, Schema.org JSON-LD, y optimización next/image.",
      fullDescription:
        "Plataforma web para proyectos agrícolas de la Universidad Surcolombiana. SEO técnico con Schema.org JSON-LD, optimización de imágenes con next/image, renderizado híbrido (SSG + ISR) y ORM Prisma sobre PostgreSQL.",
      stack: ["Next.js 14", "React 18", "Prisma", "PostgreSQL", "Schema.org"],
      role: "Full-Stack Developer",
      impact: "SEO técnico con JSON-LD, renderizado híbrido SSG+ISR.",
      repoUrl: "https://github.com/Nxxo31/grani-usco",
      featured: false,
    },
    {
      slug: "flag-edge",
      title: "Flag Edge",
      shortDescription:
        "Feature flag management system con WebSocket para despliegue controlado.",
      fullDescription:
        "Sistema de feature flags en Go con propagación en tiempo real vía WebSocket. Permite despliegues controlados (canary, percentage rollout, targeting) sin redeploy. Containerizado con Docker.",
      stack: ["Go", "WebSocket", "Docker"],
      role: "Backend Developer",
      impact: "Rollout en tiempo real vía WebSocket, sin redeploy.",
      repoUrl: "https://github.com/Nxxo31/flag-edge",
      featured: false,
    },
  ],

  skills: [
    {
      name: "Next.js",
      category: "frontend",
      proficiency: 5,
      yearsExperience: 3,
      relatedProjectSlugs: ["grani-usco", "synthetic-trader"],
      description: "Framework de React para aplicaciones web modernas",
    },
    {
      name: "React",
      category: "frontend",
      proficiency: 5,
      yearsExperience: 4,
      relatedProjectSlugs: ["nam", "contract-guard", "grani-usco", "synthetic-trader"],
      description: "Biblioteca para interfaces de usuario",
    },
    {
      name: "TypeScript",
      category: "frontend",
      proficiency: 5,
      yearsExperience: 4,
      relatedProjectSlugs: ["nam", "contract-guard", "grani-usco"],
      description: "Superset tipado de JavaScript",
    },
    {
      name: "Tailwind CSS",
      category: "frontend",
      proficiency: 4,
      yearsExperience: 3,
      relatedProjectSlugs: ["grani-usco"],
      description: "Framework de utilidades CSS",
    },
    {
      name: "Node.js",
      category: "backend",
      proficiency: 5,
      yearsExperience: 4,
      relatedProjectSlugs: ["contract-guard"],
      description: "Runtime de JavaScript en servidor",
    },
    {
      name: "Python",
      category: "backend",
      proficiency: 4,
      yearsExperience: 3,
      relatedProjectSlugs: ["e14-fraud-detector", "synthetic-trader"],
      description: "Lenguaje para backend y ciencia de datos",
    },
    {
      name: "FastAPI",
      category: "backend",
      proficiency: 4,
      yearsExperience: 2,
      relatedProjectSlugs: ["e14-fraud-detector", "synthetic-trader"],
      description: "Framework web moderno para Python",
    },
    {
      name: "Go",
      category: "backend",
      proficiency: 4,
      yearsExperience: 2,
      relatedProjectSlugs: ["supply-radar", "flag-edge"],
      description: "Lenguaje compilado para sistemas y CLIs",
    },
    {
      name: "Electron",
      category: "frontend",
      proficiency: 4,
      yearsExperience: 2,
      relatedProjectSlugs: ["nam"],
      description: "Framework para apps de escritorio multi-OS con web tech",
    },
    {
      name: "PostgreSQL",
      category: "backend",
      proficiency: 4,
      yearsExperience: 3,
      relatedProjectSlugs: ["grani-usco"],
      description: "Base de datos relacional avanzada",
    },
    {
      name: "Prisma",
      category: "backend",
      proficiency: 4,
      yearsExperience: 2,
      relatedProjectSlugs: ["grani-usco"],
      description: "ORM moderno para bases de datos",
    },
    {
      name: "OpenAI API",
      category: "ai-agents",
      proficiency: 5,
      yearsExperience: 2,
      relatedProjectSlugs: [],
      description: "API para integración de modelos de lenguaje",
    },
    {
      name: "LangChain",
      category: "ai-agents",
      proficiency: 4,
      yearsExperience: 2,
      relatedProjectSlugs: [],
      description: "Framework para construir aplicaciones con LLMs",
    },
    {
      name: "Deriv API",
      category: "ai-agents",
      proficiency: 4,
      yearsExperience: 1,
      relatedProjectSlugs: ["synthetic-trader"],
      description: "API WebSocket de trading para índices sintéticos",
    },
    {
      name: "Docker",
      category: "devops",
      proficiency: 4,
      yearsExperience: 3,
      relatedProjectSlugs: ["synthetic-trader", "flag-edge"],
      description: "Contenerización de aplicaciones",
    },
    {
      name: "Git",
      category: "devops",
      proficiency: 5,
      yearsExperience: 4,
      relatedProjectSlugs: ["nam", "e14-fraud-detector", "supply-radar"],
      description: "Control de versiones distribuido",
    },
    {
      name: "OpenCV",
      category: "data",
      proficiency: 3,
      yearsExperience: 1,
      relatedProjectSlugs: ["e14-fraud-detector"],
      description: "Biblioteca de visión por computadora",
    },
    {
      name: "PyMuPDF",
      category: "data",
      proficiency: 3,
      yearsExperience: 1,
      relatedProjectSlugs: ["e14-fraud-detector"],
      description: "Manipulación de documentos PDF",
    },
  ],

  experience: [
    {
      id: "exp-1",
      period: "2023 - Presente",
      role: "Desarrollador Full-Stack & Arquitecto de Agentes IA",
      company: "Freelance / Proyectos Personales",
      description:
        "Desarrollo de proyectos propios enfocados en automatización de flujos de trabajo con IA, trading algorítmico, sistemas multi-agente y seguridad de supply chain.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Python",
        "Go",
        "Electron",
        "Docker",
      ],
    },
  ],
};

export default contentData;