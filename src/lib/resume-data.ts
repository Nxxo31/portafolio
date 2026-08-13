import { contentData } from '@/content/data'
import { getTranslations } from 'next-intl/server'

export interface ResumeData {
  name: string
  jobTitle: string
  summary: string
  location: string
  email: string
  githubUrl: string
  experience: {
    period: string
    role: string
    company: string
    description: string
    technologies: string[]
  }[]
  projects: {
    title: string
    description: string
    stack: string[]
    role: string
    impact?: string
  }[]
  skills: {
    name: string
    category: string
    proficiency: number
    yearsExperience: number
  }[]
  education: string
  languages: string[]
  availability: string
}

export interface ResumeContent {
  data: ResumeData
  // i18n labels for the current locale
  labels: {
    summary: string
    experience: string
    projects: string
    skills: string
    contact: string
    location: string
    email: string
    github: string
    education: string
    languages: string
    availability: string
  }
}

export async function getResumeContent(): Promise<ResumeContent> {
  const t = await getTranslations('Resume')

  const data: ResumeData = {
    name: contentData.profile.name,
    jobTitle: t('jobTitle'),
    summary: t('summaryText'),
    location: t('location'),
    email: contentData.profile.email,
    githubUrl: contentData.profile.githubUrl,
    experience: contentData.experience.map((e) => ({
      period: e.period,
      role: e.role,
      company: e.company,
      description: e.description,
      technologies: e.technologies,
    })),
    projects: contentData.projects.map((p) => ({
      title: p.title,
      description: p.fullDescription,
      stack: p.stack,
      role: p.role,
      impact: p.impact,
    })),
    skills: contentData.skills.map((s) => ({
      name: s.name,
      category: s.category,
      proficiency: s.proficiency,
      yearsExperience: s.yearsExperience,
    })),
    education:
      'Ingeniería de Sistemas y Computación — En curso. Formación autodidacta continua en arquitectura de software, IA y seguridad.',
    languages: ['Español (nativo)', 'Inglés (intermedio profesional)', 'Portugués (básico)'],
    availability: t('availability'),
  }

  return {
    data,
    labels: {
      summary: t('summary'),
      experience: t('experience'),
      projects: t('projects'),
      skills: t('skills'),
      contact: t('contact'),
      location: t('location'),
      email: t('email'),
      github: t('github'),
      education: t('education'),
      languages: t('languages'),
      availability: t('availability'),
    },
  }
}

export function buildMarkdownResume(content: ResumeContent): string {
  const { data: r, labels } = content
  const lines: string[] = []

  lines.push(`# ${r.name}`)
  lines.push('')
  lines.push(`**${r.jobTitle}**`)
  lines.push('')
  lines.push(`${r.location}`)
  lines.push(`Email: ${r.email}`)
  lines.push(`GitHub: ${r.githubUrl}`)
  lines.push('')

  lines.push(`## ${labels.summary}`)
  lines.push('')
  lines.push(r.summary)
  lines.push('')

  lines.push(`## ${labels.experience}`)
  lines.push('')
  r.experience.forEach((e) => {
    lines.push(`### ${e.role} — ${e.company}`)
    lines.push(`*${e.period}*`)
    lines.push('')
    lines.push(e.description)
    lines.push('')
    lines.push(`**Tech:** ${e.technologies.join(', ')}`)
    lines.push('')
  })

  lines.push(`## ${labels.projects}`)
  lines.push('')
  r.projects.forEach((p) => {
    lines.push(`### ${p.title}`)
    lines.push(`*Rol: ${p.role}*`)
    lines.push('')
    lines.push(p.description)
    lines.push('')
    if (p.impact) {
      lines.push(`Impacto: ${p.impact}`)
      lines.push('')
    }
    lines.push(`**Stack:** ${p.stack.join(', ')}`)
    lines.push('')
  })

  lines.push(`## ${labels.skills}`)
  lines.push('')
  const categories = [...new Set(r.skills.map((s) => s.category))]
  categories.forEach((cat) => {
    lines.push(`### ${cat}`)
    const skillsCat = r.skills.filter((s) => s.category === cat)
    skillsCat.forEach((s) => {
      lines.push(`- **${s.name}** — ${s.yearsExperience} años · nivel ${s.proficiency}/5`)
    })
    lines.push('')
  })

  lines.push(`## ${labels.education}`)
  lines.push('')
  lines.push(r.education)
  lines.push('')

  lines.push(`## ${labels.languages}`)
  lines.push('')
  r.languages.forEach((l) => lines.push(`- ${l}`))
  lines.push('')

  lines.push(r.availability)
  lines.push('')

  return lines.join('\n')
}
