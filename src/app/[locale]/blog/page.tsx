import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { getAllPostsMeta } from '@/lib/blog'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Blog')
  return {
    title: t('title'),
    description: t('subtitle'),
    openGraph: {
      title: t('title'),
      description: t('subtitle'),
      type: 'website',
    },
  }
}

const ACCENTS = ['#FF6B35', '#00A6FB', '#FFD23F', '#06D6A0']

export default async function BlogIndexPage() {
  const t = await getTranslations('Blog')
  const posts = getAllPostsMeta()

  return (
    <main
      className="min-h-screen pt-24 px-6"
      style={{ backgroundColor: 'var(--paper)', color: 'var(--ink)' }}
    >
      <div className="max-w-4xl mx-auto py-12">
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

        <header className="mt-8 mb-12">
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

        {posts.length === 0 ? (
          <p className="font-mono text-base italic opacity-60">{t('noPosts')}</p>
        ) : (
          <ul className="space-y-6" role="list">
            {posts.map((p, i) => {
              const accent = ACCENTS[i % ACCENTS.length]
              return (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    prefetch={false}
                    className="block border-2 p-5 transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
                    style={{
                      backgroundColor: 'var(--surface)',
                      borderColor: 'var(--ink)',
                      boxShadow: '5px 5px 0 var(--ink)',
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="font-mono text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 border-2"
                        style={{
                          backgroundColor: accent,
                          color: 'var(--ink)',
                          borderColor: 'var(--ink)',
                        }}
                      >
                        {p.category}
                      </span>
                      <span className="font-mono text-xs opacity-50">
                        {p.formattedDate} · {t('readingTime', { minutes: p.readingMinutes })}
                      </span>
                    </div>
                    <h2 className="font-heading text-xl md:text-2xl font-bold mb-2">
                      {p.title}
                    </h2>
                    <p className="font-mono text-sm opacity-70 leading-relaxed mb-3">
                      {p.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] uppercase tracking-wide opacity-60"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </main>
  )
}
