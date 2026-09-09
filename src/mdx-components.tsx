import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'

// Helper para generar IDs de heading desde el contenido
function headingIdFromChildren(children: unknown): string {
  const text = typeof children === 'string' ? children : String(children ?? '')
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim()
}

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="font-heading text-3xl md:text-4xl font-bold mt-8 mb-4">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2
      id={headingIdFromChildren(children)}
      className="font-heading text-2xl font-bold mt-10 mb-3 scroll-mt-24"
    >
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3
      id={headingIdFromChildren(children)}
      className="font-heading text-xl font-bold mt-8 mb-2 scroll-mt-24"
    >
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="font-mono text-sm md:text-base leading-relaxed mb-4">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-6 mb-4 space-y-1 font-mono text-sm">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-6 mb-4 space-y-1 font-mono text-sm">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  code: ({ children }) => (
    <code
      className="font-mono text-sm px-1.5 py-0.5 rounded border"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--ink)',
        color: 'var(--accent-1)',
      }}
    >
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre
      className="font-mono text-sm p-4 overflow-x-auto mb-4 border-2"
      style={{
        backgroundColor: 'var(--surface-dark)',
        color: 'var(--paper)',
        borderColor: 'var(--ink)',
      }}
    >
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote
      className="border-l-4 pl-4 italic opacity-80 my-4"
      style={{ borderColor: 'var(--accent-1)' }}
    >
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => (
    <Link
      href={href ?? '#'}
      className="underline font-semibold"
      style={{ color: 'var(--accent-2)' }}
    >
      {children}
    </Link>
  ),
}

// Convención App Router: Next.js / Turbopack espera `useMDXComponents`
// como exportación por defecto para inyectar los overrides en MDX.
export function useMDXComponents(): MDXComponents {
  return components
}

// Re-export nombrado para compatibilidad con imports existentes
export { components as MDXComponents }
