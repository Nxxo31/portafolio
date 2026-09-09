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
      id: "arquitectura-software",
      title: "Arquitectura de Software a Medida",
      shortDescription: "Sistemas que evolucionen con su negocio, desde la concepción hasta la escala empresarial.",
      fullDescription: "Desarrollamos sistemas que evolucionen con su negocio, desde la concepción hasta la escala empresarial. Modernización de sistemas legados, arquitecturas microservicios y serverless, integración de sistemas heterogéneos, plataformas de datos y analytics.",
      icon: "Layout",
      color: "#FF6B35",
      especialidades: [
        "Modernización de sistemas legados",
        "Arquitecturas microservicios y serverless",
        "Integración de sistemas heterogéneos",
        "Plataformas de datos y analytics"
      ],
      tecnologias: ["Node.js", "Python", "Java", ".NET", "AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform"]
    },
    {
      id: "experiencias-digitales",
      title: "Experiencias Digitales Centradas en el Humano",
      shortDescription: "Interfaces que no solo funcionan bien, sino que resuenan con las audiencias latinoamericanas.",
      fullDescription: "Creamos interfaces que no solo funcionan bien, sino que resuenan con las audiencias latinoamericanas. Aplicaciones móviles nativas y multiplataforma, Progressive Web Apps (PWA) de alto rendimiento, experiencias web accesibles e inclusivas, diseño de sistemas para usuarios con distintos niveles de alfabetización digital.",
      icon: "Smartphone",
      color: "#00A6FB",
      especialidades: [
        "Aplicaciones móviles nativas y multiplataforma",
        "Progressive Web Apps (PWA) de alto rendimiento",
        "Experiencias web accesibles e inclusivas",
        "Diseño para distintos niveles de alfabetización digital"
      ],
      tecnologias: ["React", "React Native", "Vue.js", "Svelte", "Flutter", "Next.js", "Tailwind CSS", "Material-UI", "WCAG 2.1 AA"]
    },
    {
      id: "inteligencia-aplicada",
      title: "Inteligencia Aplicada y Automatización Inteligente",
      shortDescription: "Implementamos IA donde genera verdadero valor de negocio, no solo como tendencia.",
      fullDescription: "Implementamos IA donde genera verdadero valor de negocio, no solo como tendencia. Procesamiento de lenguaje natural para español latinoamericano, visión artificial para control de calidad, sistemas de recomendación, automatización de procesos robóticos (RPA) para backoffice, MLOps y despliegue responsable de modelos de IA.",
      icon: "Brain",
      color: "#FFD23F",
      especialidades: [
        "Procesamiento de lenguaje natural para español latinoamericano",
        "Visión artificial para control de calidad",
        "Sistemas de recomendación para e-commerce",
        "Automatización de procesos robóticos (RPA)",
        "MLOps y despliegue responsable de modelos de IA"
      ],
      tecnologias: ["TensorFlow", "PyTorch", "Hugging Face", "spaCy", "OpenCV", "Apache Airflow", "MLflow", "AWS SageMaker"]
    },
    {
      id: "sistemas-gestion-pymes",
      title: "Sistemas de Gestión Inteligente para PYMES",
      shortDescription: "Soluciones específicamente diseñadas para los desafíos operativos de empresas latinoamericanas en crecimiento.",
      fullDescription: "Soluciones específicamente diseñadas para los desafíos operativos de empresas latinoamericanas en crecimiento. ERP ligeros para manufactura y distribución, sistemas de punto de venta (POS) integrados, plataformas de gestión de campo y servicios, software de cumplimiento normativo local, soluciones de trabajo remoto y colaboración distribuida.",
      icon: "Briefcase",
      color: "#06D6A0",
      especialidades: [
        "ERP ligeros para manufactura y distribución",
        "Sistemas de punto de venta (POS) integrados",
        "Plataformas de gestión de campo y servicios",
        "Software de cumplimiento normativo local (facturación electrónica)",
        "Soluciones de trabajo remoto y colaboración distribuida"
      ],
      tecnologias: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch", "React/Vue admin panels", "Electron"]
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

  businessModel: {
    vision: "Ser el puente tecnológico que conecta el potencial latinoamericano con las demandas del mercado global, desarrollando soluciones que resuelvan problemas locales con estándares internacionales.",
    mission: "Crear tecnología a medida que combine la agilidad y comprensión cultural de equipos latinoamericanos con la rigurosidad técnica y escalabilidad de las mejores prácticas globales de desarrollo de software.",
    enfoque: [
      "Nearshore auténtico con compatibilidad horaria con Norteamérica y Europa",
      "Especialización vertical en industrias clave de LATAM (fintech, agro, logística, educación)",
      "Enfoque en resultados medibles de negocio, no solo entregables técnicos",
      "Modelo híbrido: servicios de consultoría + productos escalables (SaaS, plataformas)",
      "I+D aplicada mediante LITA (Laboratorio de Innovación Tecnológica Aplicada)",
      "Responsabilidad social: 10% de capacidad anual a proyectos de impacto (TechParaTodos)"
    ],
    servicios: [
      {
        id: "arquitectura-software",
        title: "Arquitectura de Software a Medida",
        shortDescription: "Sistemas que evolucionen con su negocio, desde la concepción hasta la escala empresarial.",
        fullDescription: "Desarrollamos sistemas que evolucionen con su negocio, desde la concepción hasta la escala empresarial. Modernización de sistemas legados, arquitecturas microservicios y serverless, integración de sistemas heterogéneos, plataformas de datos y analytics.",
        icon: "Layout",
        color: "#FF6B35",
        especialidades: [
          "Modernización de sistemas legados",
          "Arquitecturas microservicios y serverless",
          "Integración de sistemas heterogéneos",
          "Plataformas de datos y analytics"
        ],
        tecnologias: ["Node.js", "Python", "Java", ".NET", "AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform"]
      },
      {
        id: "experiencias-digitales",
        title: "Experiencias Digitales Centradas en el Humano",
        shortDescription: "Interfaces que no solo funcionan bien, sino que resuenan con las audiencias latinoamericanas.",
        fullDescription: "Creamos interfaces que no solo funcionan bien, sino que resuenan con las audiencias latinoamericanas. Aplicaciones móviles nativas y multiplataforma, Progressive Web Apps (PWA) de alto rendimiento, experiencias web accesibles e inclusivas, diseño de sistemas para usuarios con distintos niveles de alfabetización digital.",
        icon: "Smartphone",
        color: "#00A6FB",
        especialidades: [
          "Aplicaciones móviles nativas y multiplataforma",
          "Progressive Web Apps (PWA) de alto rendimiento",
          "Experiencias web accesibles e inclusivas",
          "Diseño para distintos niveles de alfabetización digital"
        ],
        tecnologias: ["React", "React Native", "Vue.js", "Svelte", "Flutter", "Next.js", "Tailwind CSS", "Material-UI", "WCAG 2.1 AA"]
      },
      {
        id: "inteligencia-aplicada",
        title: "Inteligencia Aplicada y Automatización Inteligente",
        shortDescription: "Implementamos IA donde genera verdadero valor de negocio, no solo como tendencia.",
        fullDescription: "Implementamos IA donde genera verdadero valor de negocio, no solo como tendencia. Procesamiento de lenguaje natural para español latinoamericano, visión artificial para control de calidad, sistemas de recomendación, automatización de procesos robóticos (RPA) para backoffice, MLOps y despliegue responsable de modelos de IA.",
        icon: "Brain",
        color: "#FFD23F",
        especialidades: [
          "Procesamiento de lenguaje natural para español latinoamericano",
          "Visión artificial para control de calidad",
          "Sistemas de recomendación para e-commerce",
          "Automatización de procesos robóticos (RPA)",
          "MLOps y despliegue responsable de modelos de IA"
        ],
        tecnologias: ["TensorFlow", "PyTorch", "Hugging Face", "spaCy", "OpenCV", "Apache Airflow", "MLflow", "AWS SageMaker"]
      },
      {
        id: "sistemas-gestion-pymes",
        title: "Sistemas de Gestión Inteligente para PYMES",
        shortDescription: "Soluciones específicamente diseñadas para los desafíos operativos de empresas latinoamericanas en crecimiento.",
        fullDescription: "Soluciones específicamente diseñadas para los desafíos operativos de empresas latinoamericanas en crecimiento. ERP ligeros para manufactura y distribución, sistemas de punto de venta (POS) integrados, plataformas de gestión de campo y servicios, software de cumplimiento normativo local, soluciones de trabajo remoto y colaboración distribuida.",
        icon: "Briefcase",
        color: "#06D6A0",
        especialidades: [
          "ERP ligeros para manufactura y distribución",
          "Sistemas de punto de venta (POS) integrados",
          "Plataformas de gestión de campo y servicios",
          "Software de cumplimiento normativo local (facturación electrónica)",
          "Soluciones de trabajo remoto y colaboración distribuida"
        ],
        tecnologias: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch", "React/Vue admin panels", "Electron"]
      }
    ],
    proceso: [
      {
        paso: "01",
        titulo: "Descubrimiento Técnico Profundo",
        descripcion: "Gratis",
        detalles: [
          "Arquitectura de solución preliminar y definición de métricas de éxito",
          "Análisis de factibilidad técnica y estimación de riesgos",
          "Identificación de stakeholders y criterios de aceptación"
        ]
      },
      {
        paso: "02",
        titulo: "Validación Riesgo-Cero",
        descripcion: "5-7 días",
        detalles: [
          "Prototipo funcional (PoC) de los componentes críticos",
          "Prueba de concepto técnica con datos reales o simulados",
          "Validación de arquitectura y stack tecnológico"
        ]
      },
      {
        paso: "03",
        titulo: "Desarrollo Ágil con Calidad Incorporada",
        descripcion: "Continuo",
        detalles: [
          "Metodología Scrum/Kanban adaptada, sprints de 2 semanas",
          "Cobertura de tests >80% (unit + integration + e2e)",
          "CI/CD desde día uno con despliegue a staging automático",
          "Revisiones de arquitectura quincenales"
        ]
      },
      {
        paso: "04",
        titulo: "Lanzamiento y Transferencia de Conocimiento",
        descripcion: "Controlado",
        detalles: [
          "Despliegue progresivo (canary → producción)",
          "Capacitación por rol: devs, ops, stakeholders de negocio",
          "Documentación técnica y runbooks operacionales",
          "Plan de rollback y monitoreo post-lanzamiento 30 días"
        ]
      },
      {
        paso: "05",
        titulo: "Optimización Basada en Datos",
        descripcion: "Continuo",
        detalles: [
          "Monitoreo de métricas de negocio (no solo técnicas)",
          "Experimentos A/B para mejoras de UX y conversión",
          "Revisiones trimestrales de arquitectura y roadmap",
          "Soporte evolutivo y escalamiento bajo demanda"
        ]
      }
    ],
    diferenciacion: [
      "Nearshore auténtico: Zona horaria compatible, cultura compartida, inglés técnico fluido",
      "Especialización vertical: Fintech, AgroTech, Logística, EdTech, Salud",
      "Resultados medibles: KPIs de negocio definidos desde el día 1",
      "Modelo híbrido: Servicios + Productos SaaS propios",
      "I+D aplicada: 20% tiempo en LITA (Laboratorio de Innovación)",
      "Responsabilidad social: TechParaTodos (10% capacidad a impacto)"
    ],
    lita: [
      "IA para Español Latinoamericano: Modelos especializados en variantes regionales y modismos",
      "Tecnologías para Conectividad Intermitente: Apps que funcionan con conexiones inestables",
      "Interfaces para Bajos Niveles de Alfabetización Digital: Diseño cognitivo inclusivo",
      "Blockchain para Inclusión Financiera: Microcréditos, remesas, economías informales",
      "Computación en el Borde (Edge Computing): Procesamiento local para latencia crítica"
    ],
    techParaTodos: [
      "Plataforma de educación tecnológica gratuita para comunidades rurales",
      "Herramientas de gestión para cooperativas agrícolas y emprendedores sociales",
      "Sistemas de alerta temprana para riesgos climáticos en agricultura familiar",
      "Formación en habilidades digitales para población vulnerable"
    ],
    metricas: [
      "Ingresos por cliente: >$50K ARR promedio en año 2",
      "NPS >50: Medición trimestral de satisfacción",
      "Retención >70%: Clientes recurrentes a 24 meses",
      "Time-to-value <60 días: Desde firma a primer resultado medible",
      "Utilización LITA: 20% capacidad de ingeniería en I+D",
      "Impacto TechParaTodos: 500+ beneficiarios directos/año"
    ],
    goToMarket: [
      "Contenido técnico de autoridad: Blog, casos de estudio, webinars técnicos",
      "Alianzas estratégicas: Universidades, aceleradoras, gremios sectoriales LATAM",
      "Programa de referidos: 15% descuento por cliente referido que firma",
      "Presencia en eventos: PyCon Latam, JSConf, AWS Summits, fintech forums"
    ],
    procesoInicio: [
      "Consulta de Descubrimiento (30-45 min, Gratis): Comparta su desafío, explore ajuste técnico y cultural, reciba evaluación inicial",
      "Propuesta de Arquitectura de Solución (5-7 días): Análisis profundo, arquitectura detallada, roadmap por fases, estimación de inversión y ROI",
      "Decisión Informada: Revisión colaborativa, preguntas técnicas, evaluación de ajuste cultural, decisión basada en evidencia",
      "Inicio del Proyecto: Kickoff técnico, definición de métricas de éxito, canales de comunicación, inicio según plan acordado"
    ]
  },
};

export default contentData;
