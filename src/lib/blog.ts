import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

export interface BlogPostMeta {
  slug: string
  title: string
  date: string
  formattedDate: string
  tags: string[]
  category: string
  author: string
  description: string
  readingMinutes: number
}

export interface BlogPost extends BlogPostMeta {
  rawContent: string // body without frontmatter
  headings: { level: number; text: string; id: string }[]
}

const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog')

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim()
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  if (isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Extract headings (h2, h3) from raw markdown content
function extractHeadings(raw: string): BlogPost['headings'] {
  const headings: BlogPost['headings'] = []
  const lines = raw.split('\n')
  for (const line of lines) {
    const m = line.match(/^(#{2,3})\s+(.+)$/)
    if (m) {
      const level = m[1].length
      const text = m[2].replace(/[`*_]/g, '').trim()
      headings.push({ level, text, id: slugify(text) })
    }
  }
  return headings
}

// Get all post slugs (filenames) — called on server at request time
export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
    .sort()
    .reverse() as string[]
}

export function getAllPostsMeta(): BlogPostMeta[] {
  return getPostSlugs()
    .map((slug) => getPostMeta(slug))
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getPostMeta(slug: string): BlogPostMeta {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const rt = readingTime(content)

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    formattedDate: formatDate(data.date as string),
    tags: (data.tags as string[]) ?? [],
    category: (data.category as string) ?? 'General',
    author: (data.author as string) ?? 'Sebastián Velasco',
    description: (data.description as string) ?? '',
    readingMinutes: Math.max(1, Math.round(rt.minutes)),
  }
}

export function getPost(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const rt = readingTime(content)

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    formattedDate: formatDate(data.date as string),
    tags: (data.tags as string[]) ?? [],
    category: (data.category as string) ?? 'General',
    author: (data.author as string) ?? 'Sebastián Velasco',
    description: (data.description as string) ?? '',
    readingMinutes: Math.max(1, Math.round(rt.minutes)),
    rawContent: content,
    headings: extractHeadings(content),
  }
}
