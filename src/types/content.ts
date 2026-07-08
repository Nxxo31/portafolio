// Tipos para el portafolio "Constellation"
// Declaración global para facilitar la edición por el usuario sin tocar componentes.

export interface Profile {
  name: string;
  tagline: string;
  email: string;
  linkedinUrl: string;
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
}

export interface ExperienceEntry {
  id: string;
  period: string;
  role: string;
  company: string;
  description: string;
  technologies: string[];
}

export interface ContentData {
  profile: Profile;
  projects: Project[];
  skills: Skill[];
  services: ServiceCard[];
  experience: ExperienceEntry[];
}
