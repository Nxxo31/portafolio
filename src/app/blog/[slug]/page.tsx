import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { getPost } from '@/lib/blog'

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sebastianvelasco.dev'

// Precompiled import map for MDX posts
// This avoids needing `next.config.js` rewrites and allows
// type-checking of the imports
const POST_MODULES: Record<string, () => Promise<{ default: React.ComponentType<Record<string, unknown>> }>> = {
  '2026-08-01-beatport-sync-controller-workflow': () =>
    import('@/content/blog/2026-08-01-beatport-sync-controller-workflow.mdx'),
  '2026-08-04-ai-agents-music-library-tagging': () =>
    import('@/content/blog/2026-08-04-ai-agents-music-library-tagging.mdx'),
  '2026-08-07-web-audio-latency-dj-tools': () =>
    import('@/content/blog/2026-08-07-web-audio-latency-dj-tools.mdx'),
}

export async function generateStaticParams() {
  // All posts are known at build time
  return Object.keys(POST_MODULES).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params
  const t = await getTranslations('Blog')
  const post = getPost(slug)

  if (!post) {
    return {
      title: t('noPostFound'),
    }
  }

  return {
    title: `${post.title} | ${t('title')}`,
    description: post.description,
    openGraph: {
      title: `${post.title} | Sebastián Velasco`,
      description: post.description,
      url: `${BASE_URL}/blog/${slug}`,
      type: 'article',
      siteName: 'Sebastián Velasco | Blog',
      locale: slug ? 'es_CO' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const t = await getTranslations('Blog')
  const post = getPost(slug)

  if (!post) {
    notFound()
  }

  // Dinamic import of the specific MDX file
  const moduleFactory = POST_MODULES[slug]
  if (!moduleFactory) {
    notFound()
  }
  const Component = (await moduleFactory()).default

  return (
    <main
      className="min-h-screen pt-24 px-6"
      style={{ backgroundColor: 'var(--paper)', color: 'var(--ink)' }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            image: '/og-image.png',
            author: {
              '@type': 'Person',
              name: post.author,
            },
            publisher: {
              '@type': 'Organization',
              name: 'Sebastián Velasco',
            },
            datePublished: post.date,
          }),
        }}
      />
      <article className="max-w-4xl mx-auto py-12">
        {/* Back */}
        <Link
          href="/blog"
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

        <header className="mt-8 mb-10">
          <p
            className="font-mono text-xs uppercase tracking-[0.3em] mb-3"
            style={{ color: 'var(--accent-1)' }}
          >
            {t('eyebrow')}
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="font-mono text-sm opacity-60 mt-1 mb-4">
            {post.formattedDate} · {t('readingTime', { minutes: post.readingMinutes })}
          </p>
          {post.category && (
            <p
              className="font-mono text-[10px] uppercase tracking-wide font-bold px-2 py-1 border-2"
              style={{
                backgroundColor: '#FFD23F',
                color: 'var(--ink)',
                borderColor: 'var(--ink)',
              }}
            >
              {post.category}
            </p>
          )}
          <p className="font-mono text-sm opacity-50">{post.tags.join(' · ')}</p>
        </header>

        {/* Content */}
        <section className="prose-invert max-w-none">
          {/* MDX components wrapper */}
          <div>
            {/* TOC */}
            {post.headings.length > 0 && (
              <nav
                className="mb-6 p-4 border-2"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--ink)',
                }}
                aria-label={t('tableOfContents')}
              >
                <h3
                  className="font-mono text-sm font-bold mb-2"
                  style={{ color: 'var(--accent-1)' }}
                >
                  {t('tableOfContents')}
                </h3>
                <ul className="space-y-1 font-mono text-sm pl-4" role="list">
                  {post.headings.map((h) => {
                    const indent = ' '.repeat((h.level - 2) * 2)
                    return (
                      <li key={h.id}>
                        <Link
                          href={`#${h.id}`}
                          scroll={true}
                          className="block no-underline hover:underline"
                          style={{ color: 'var(--ink)' }}
                        >
                          {indent}{h.text}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            )}

            {/* MDX content */}
            <Component />
          </div>
        </section>

        {/* Nav */}
        <div className="mt-10 flex items-center justify-between text-sm">
          <Link
            href="/blog"
            prefetch={false}
            className="font-mono text-xs font-bold"
          >
            ← {t('back')}
          </Link>
        </div>
      </article>
    </main>
  )
}
