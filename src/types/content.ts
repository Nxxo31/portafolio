// Tipos para el portafolio "Constellation"
// Declaración global para facilitar la edición por el usuario sin tocar componentes.

export interface Profile {
  name: string;
  tagline: string;
  email: string;
  linkedinUrl?: string;
  githubUrl: string;
  cvPdfPath: string;
}

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  stack: string[];
  role: string;
  impact?: string;
  repoUrl?: string;
  demoUrl?: string;
  featured: boolean;
  image?: string;
  client?: string;
  industry?: string;
  challenge?: string;
  solution?: string;
  results?: string;
  metrics?: string;
  testimonial?: string;
}

export type SkillCategory = "frontend" | "backend" | "ai-agents" | "devops" | "data";

export interface Skill {
  name: string;
  category: SkillCategory;
  proficiency: 1 | 2 | 3 | 4 | 5;
  yearsExperience: number;
  relatedProjectSlugs: string[];
  description: string;
}

export interface ServiceCard {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  color: string;
  especialidades?: string[];
  tecnologias?: string[];
}

export interface ExperienceEntry {
  id: string;
  period: string;
  role: string;
  company: string;
  description: string;
  technologies: string[];
}

export interface BusinessModelStep {
  paso: string;
  titulo: string;
  descripcion: string;
  detalles: string[];
}

export interface BusinessModelService {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  color: string;
  especialidades: string[];
  tecnologias: string[];
}

export interface BusinessModel {
  vision: string;
  mission: string;
  enfoque: string[];
  servicios: BusinessModelService[];
  proceso: BusinessModelStep[];
  diferenciacion: string[];
  lita: string[];
  techParaTodos: string[];
  metricas: string[];
  goToMarket: string[];
  procesoInicio: string[];
}

export interface ContentData {
  profile: Profile;
  projects: Project[];
  skills: Skill[];
  services: ServiceCard[];
  experience: ExperienceEntry[];
  businessModel: BusinessModel;
}
