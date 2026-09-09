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

  services: [
    {
      id: "desarrollo-fullstack",
      title: "Desarrollo Full-Stack",
      shortDescription: "Aplicaciones web modernas con Next.js, React y Node.js",
      fullDescription:
        "Construyo aplicaciones web escalables desde cero: arquitectura, desarrollo frontend, API backend, base de datos y despliegue. Especializado en Next.js 14+ con App Router.",
      icon: "Code2",
      color: "#FF6B35",
    },
    {
      id: "automatizacion-ia",
      title: "Automatización con IA",
      shortDescription: "Automatización de flujos de trabajo con agentes inteligentes",
      fullDescription:
        "Diseño e implemento sistemas que usan modelos de lenguaje y agentes de IA para automatizar procesos repetitivos, generar contenido y analizar datos.",
      icon: "Bot",
      color: "#00A6FB",
    },
    {
      id: "sistemas-multi-agente",
      title: "Sistemas Multi-Agente",
      shortDescription: "Arquitecturas complejas de coordinación de agentes IA",
      fullDescription:
        "Construyo infraestructuras donde múltiples agentes de IA colaboran para resolver problemas complejos, usando orquestadores, colas de tareas y flujos de trabajo.",
      icon: "Network",
      color: "#FFD23F",
    },
    {
      id: "consultoria-devops",
      title: "Consultoría DevOps",
      shortDescription: "Infraestructura, CI/CD y despliegue automatizado",
      fullDescription:
        "Dockerización de aplicaciones, pipelines de CI/CD, despliegue en VPS con Dokploy y configuración de entornos de producción.",
      icon: "Server",
      color: "#06D6A0",
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
