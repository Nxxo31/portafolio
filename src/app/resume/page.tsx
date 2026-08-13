import Link from 'next/link'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getResumeContent } from '@/lib/resume-data'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Resume')
  return {
    title: t('title'),
    description: t('subtitle'),
    openGraph: {
      title: t('title'),
      description: t('subtitle'),
      type: 'article',
    },
  }
}

export default async function ResumePage() {
  const t = await getTranslations('Resume')
  const content = await getResumeContent()
  const { data: r, labels } = content

  return (
    <main
      className="min-h-screen pt-24 px-6"
      style={{ backgroundColor: 'var(--paper)', color: 'var(--ink)' }}
    >
      <div className="max-w-3xl mx-auto py-12">
        {/* Back */}
        <Link
          href="/"
          prefetch={false}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide font-bold px-3 py-2 border-2 transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
          style={{
            backgroundColor: 'var(--surface)',
            color: 'var(--ink)',
            borderColor: 'var(--ink)',
            boxShadow: '3px 3px 0 var(--ink)',
          }}
          aria-label={t('backAria')}
        >
          {t('back')}
        </Link>

        {/* Header */}
        <header className="mt-8 mb-8">
          <p
            className="font-mono text-xs uppercase tracking-[0.3em] mb-3"
            style={{ color: 'var(--accent-1)' }}
          >
            {t('eyebrow')}
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-3 leading-tight">
            {t('title')}
          </h1>
          <p className="font-mono text-base opacity-70 max-w-2xl">
            {t('subtitle')}
          </p>
        </header>

        {/* Download buttons */}
        <section className="mb-10" aria-label={t('sectionLabel')}>
          <div className="flex flex-wrap gap-4">
            <a
              href="/api/resume/pdf"
              download="cv-sebastian-velasco.pdf"
              className="font-heading font-bold text-base px-6 py-3 border-2 transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
              style={{
                backgroundColor: 'var(--accent-1)',
                color: 'var(--ink)',
                borderColor: 'var(--ink)',
                boxShadow: '5px 5px 0 var(--ink)',
              }}
              aria-label={t('pdfAria')}
            >
              {t('pdfButton')}
            </a>
            <a
              href="/api/resume/md"
              download="cv-sebastian-velasco.md"
              className="font-heading font-bold text-base px-6 py-3 border-2 transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
              style={{
                backgroundColor: 'var(--accent-4)',
                color: 'var(--ink)',
                borderColor: 'var(--ink)',
                boxShadow: '5px 5px 0 var(--ink)',
              }}
              aria-label={t('mdAria')}
            >
              {t('mdButton')}
            </a>
          </div>
          <p className="font-mono text-xs opacity-50 italic mt-4">
            {t('downloadInfo')}
          </p>
        </section>

        {/* Preview content */}
        <article className="border-2 p-6 md:p-8 space-y-6" style={{ borderColor: 'var(--ink)', backgroundColor: 'var(--surface)' }}>
          {/* Name + title */}
          <div className="pb-4 border-b-2" style={{ borderColor: 'var(--ink)' }}>
            <h2 className="font-heading text-2xl font-bold">{r.name}</h2>
            <p
              className="font-mono text-sm font-bold mt-1"
              style={{ color: 'var(--accent-1)' }}
            >
              {r.jobTitle}
            </p>
            <p className="font-mono text-xs opacity-70 mt-2">
              {r.location} · {r.email} · {r.githubUrl}
            </p>
          </div>

          {/* Summary */}
          <div>
            <h3
              className="font-mono text-sm uppercase tracking-wide font-bold mb-2"
              style={{ color: 'var(--accent-1)' }}
            >
              {labels.summary}
            </h3>
            <p className="font-mono text-sm leading-relaxed">{r.summary}</p>
          </div>

          {/* Experience */}
          <div>
            <h3
              className="font-mono text-sm uppercase tracking-wide font-bold mb-3"
              style={{ color: 'var(--accent-1)' }}
            >
              {labels.experience}
            </h3>
            {r.experience.map((e, i) => (
              <div key={i} className="mb-4 last:mb-0">
                <p className="font-mono text-sm font-bold">
                  {e.role} · <span className="italic opacity-70">{e.period}</span>
                </p>
                <p className="font-mono text-xs opacity-60 mb-1">{e.company}</p>
                <p className="font-mono text-sm leading-relaxed">
                  {e.description}
                </p>
                <p className="font-mono text-xs opacity-50 mt-1">
                  Tech: {e.technologies.join(', ')}
                </p>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div>
            <h3
              className="font-mono text-sm uppercase tracking-wide font-bold mb-3"
              style={{ color: 'var(--accent-1)' }}
            >
              {labels.skills}
            </h3>
            <ul className="flex flex-wrap gap-2" role="list">
              {r.skills.map((s) => (
                <li
                  key={s.name}
                  className="font-mono text-xs font-bold px-2 py-1 border-2"
                  style={{
                    backgroundColor: 'var(--accent-3)',
                    color: 'var(--ink)',
                    borderColor: 'var(--ink)',
                  }}
                >
                  {s.name} ({s.yearsExperience}y)
                </li>
              ))}
            </ul>
          </div>

          {/* Languages + education */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h3
                className="font-mono text-sm uppercase tracking-wide font-bold mb-2"
                style={{ color: 'var(--accent-1)' }}
              >
                {labels.languages}
              </h3>
              <ul className="font-mono text-sm space-y-1">
                {r.languages.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3
                className="font-mono text-sm uppercase tracking-wide font-bold mb-2"
                style={{ color: 'var(--accent-1)' }}
              >
                {labels.education}
              </h3>
              <p className="font-mono text-sm leading-relaxed">{r.education}</p>
            </div>
          </div>

          <p
            className="font-mono text-sm font-bold"
            style={{ color: 'var(--accent-2)' }}
          >
            {r.availability}
          </p>
        </article>
      </div>
    </main>
  )
}
