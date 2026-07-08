import { ContentData, Skill } from "@/types/content";

export const contentData: ContentData = {
  profile: {
    name: "Sebastián Velasco Ocampo",
    tagline: "Desarrollador Full-Stack & Arquitecto de Agentes IA",
    email: "sebastian.velasco@example.com",
    linkedinUrl: "[PENDIENTE: URL LinkedIn]",
    githubUrl: "[PENDIENTE: URL GitHub]",
    cvPdfPath: "/cv-sebastian-velasco.pdf",
  },

  projects: [
    {
      slug: "e14-fraud-detector",
      title: "E14 Fraud Detector",
      shortDescription: "Plataforma de detección de fraudes electorales usando visión por computadora y procesamiento de documentos.",
      fullDescription:
        "Sistema automatizado para auditoría forense de formularios electorales escaneados. Utiliza OpenCV, PyMuPDF y Tesseract OCR para normalizar imágenes y detectar anomalías en coordenadas normalizadas (0-1). Integración con NVIDIA NIM para inferencia de IA.",
      stack: ["Python", "OpenCV", "PyMuPDF", "Tesseract", "NVIDIA NIM", "TypeScript"],
      role: "Lead Developer",
      impact: "Automatización del 95% del análisis documental electoral.",
      featured: true,
    },
    {
      slug: "nexo-accmanager",
      title: "NexoAccManager",
      shortDescription: "Sistema de gestión de cuentas multiplataforma con automatización de flujos.",
      fullDescription:
        "Aplicación web para la gestión centralizada de cuentas digitales, automatizando procesos de autenticación y operaciones repetitivas mediante agentes de IA.",
      stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
      role: "Full-Stack Developer",
      featured: true,
    },
    {
      slug: "hermes-multi-agente",
      title: "Hermes Multi-Agente",
      shortDescription: "Plataforma de orquestación de agentes de IA para automatización de flujos de trabajo.",
      fullDescription:
        "Construcción de una infraestructura multi-agente usando Hermes y herramientas de NLP para automatizar tareas complejas de desarrollo y operaciones.",
      stack: ["TypeScript", "Node.js", "Docker", "OpenAI API", "LangChain"],
      role: "Arquitecto de IA",
      featured: true,
    },
  ],

  skills: [
    { name: "Next.js", category: "frontend", proficiency: 5, yearsExperience: 3, relatedProjectSlugs: ["nexo-accmanager"], description: "Framework de React para aplicaciones web modernas" },
    { name: "React", category: "frontend", proficiency: 5, yearsExperience: 4, relatedProjectSlugs: ["nexo-accmanager"], description: "Biblioteca para interfaces de usuario" },
    { name: "TypeScript", category: "frontend", proficiency: 5, yearsExperience: 4, relatedProjectSlugs: ["e14-fraud-detector", "nexo-accmanager", "hermes-multi-agente"], description: "Superset tipado de JavaScript" },
    { name: "Tailwind CSS", category: "frontend", proficiency: 4, yearsExperience: 3, relatedProjectSlugs: ["nexo-accmanager"], description: "Framework de utilidades CSS" },
    { name: "Node.js", category: "backend", proficiency: 5, yearsExperience: 4, relatedProjectSlugs: ["hermes-multi-agente"], description: "Runtime de JavaScript en servidor" },
    { name: "Python", category: "backend", proficiency: 4, yearsExperience: 3, relatedProjectSlugs: ["e14-fraud-detector"], description: "Lenguaje para backend y ciencia de datos" },
    { name: "Prisma", category: "backend", proficiency: 4, yearsExperience: 2, relatedProjectSlugs: ["nexo-accmanager"], description: "ORM moderno para bases de datos" },
    { name: "PostgreSQL", category: "backend", proficiency: 4, yearsExperience: 3, relatedProjectSlugs: ["nexo-accmanager"], description: "Base de datos relacional avanzada" },
    { name: "OpenAI API", category: "ai-agents", proficiency: 5, yearsExperience: 2, relatedProjectSlugs: ["hermes-multi-agente"], description: "API para integración de modelos de lenguaje" },
    { name: "LangChain", category: "ai-agents", proficiency: 4, yearsExperience: 2, relatedProjectSlugs: ["hermes-multi-agente"], description: "Framework para construir aplicaciones con LLMs" },
    { name: "Docker", category: "devops", proficiency: 4, yearsExperience: 3, relatedProjectSlugs: ["hermes-multi-agente"], description: "Contenerización de aplicaciones" },
    { name: "Git", category: "devops", proficiency: 5, yearsExperience: 4, relatedProjectSlugs: ["e14-fraud-detector", "nexo-accmanager", "hermes-multi-agente"], description: "Control de versiones distribuido" },
    { name: "OpenCV", category: "data", proficiency: 3, yearsExperience: 1, relatedProjectSlugs: ["e14-fraud-detector"], description: "Biblioteca de visión por computadora" },
    { name: "PyMuPDF", category: "data", proficiency: 3, yearsExperience: 1, relatedProjectSlugs: ["e14-fraud-detector"], description: "Manipulación de documentos PDF" },
  ],

  services: [
    {
      id: "desarrollo-fullstack",
      title: "Desarrollo Full-Stack",
      shortDescription: "Aplicaciones web modernas con Next.js, React y Node.js",
      fullDescription: "Construyo aplicaciones web escalables desde cero: arquitectura, desarrollo frontend, API backend, base de datos y despliegue. Especializado en Next.js 14+ con App Router.",
      icon: "Code2",
      color: "#7c5cff",
    },
    {
      id: "automatizacion-ia",
      title: "Automatización con IA",
      shortDescription: "Automatización de flujos de trabajo con agentes inteligentes",
      fullDescription: "Diseño e implemento sistemas que usan modelos de lenguaje y agentes de IA para automatizar procesos repetitivos, generar contenido y analizar datos.",
      icon: "Bot",
      color: "#22d3ee",
    },
    {
      id: "sistemas-multi-agente",
      title: "Sistemas Multi-Agente",
      shortDescription: "Arquitecturas complejas de coordinación de agentes IA",
      fullDescription: "Construyo infraestructuras donde múltiples agentes de IA colaboran para resolver problemas complejos, usando orquestadores, colas de tareas y flujos de trabajo.",
      icon: "Network",
      color: "#f5c451",
    },
    {
      id: "consultoria-devops",
      title: "Consultoría DevOps",
      shortDescription: "Infraestructura, CI/CD y despliegue automatizado",
      fullDescription: "Dockerización de aplicaciones, pipelines de CI/CD, despliegue en VPS con Dokploy y configuración de entornos de producción.",
      icon: "Server",
      color: "#7c5cff",
    },
  ],

  experience: [
    {
      id: "exp-1",
      period: "2023 - Presente",
      role: "Desarrollador Full-Stack & Arquitecto de Agentes IA",
      company: "Freelance / Proyectos Personales",
      description: "Desarrollo de proyectos propios enfocados en automatización de flujos de trabajo con IA, sistemas multi-agente y portafolios técnicos.",
      technologies: ["Next.js", "TypeScript", "Python", "Docker", "OpenAI API", "LangChain"],
    },
  ],
};

export default contentData;
