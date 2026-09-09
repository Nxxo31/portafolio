'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
// Iniciales para el avatar en color de acento rotativo
const ACCENTS = ['#FFD23F', '#06D6A0', '#00A6FB']

export default function Testimonials() {
  const t = useTranslations('Testimonials')
  const [index, setIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const shouldReduceMotion = useReducedMotion()

  // textos derivados de i18n (3 items definidos en messages)
  const TESTIMONIAL_COUNT = 3

  const goTo = useCallback(
    (i: number) => setIndex(((i % TESTIMONIAL_COUNT) + TESTIMONIAL_COUNT) % TESTIMONIAL_COUNT),
    [],
  )
  const next = useCallback(() => goTo(index + 1), [index, goTo])
  const prev = useCallback(() => goTo(index - 1), [index, goTo])

  useEffect(() => {
    if (!autoPlay) return
    const timer = setInterval(() => {
      setIndex((p) => (p + 1) % TESTIMONIAL_COUNT)
    }, 6000)
    return () => clearInterval(timer)
  }, [autoPlay])

  const quote = t(`items.${index}.quote`)
  const author = t(`items.${index}.author`)
  const role = t(`items.${index}.role`)
  const company = t(`items.${index}.company`)
  const initials = author
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <section
      id="testimonials"
      className="relative w-full py-20 md:py-32 px-6 md:px-12"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-4xl mx-auto">
        <p
          className="font-mono text-xs uppercase tracking-[0.3em] mb-3 text-center"
          style={{ color: 'var(--accent-1)' }}
        >
          {t('sectionLabel')}
        </p>
        <h2
          id="testimonials-heading"
          className="text-3xl md:text-5xl font-bold mb-12 text-center tracking-tight font-heading"
        >
          {t('title')}
        </h2>

        <div
          className="relative min-h-[260px] md:min-h-[220px] flex items-center justify-center"
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
        >
          {/* Botón prev */}
          <button
            onClick={prev}
            aria-label={t('prevLabel')}
            className="absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center border-2 font-bold text-lg transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
            style={{
              backgroundColor: 'var(--surface)',
              color: 'var(--ink)',
              borderColor: 'var(--ink)',
              boxShadow: '2px 2px 0 var(--ink)',
            }}
          >
            ‹
          </button>

          <AnimatePresence mode="wait">
            {shouldReduceMotion ? (
              <figure
                key={index}
                className="text-center px-12"
              >
                <blockquote className="text-lg md:text-2xl font-medium leading-relaxed italic opacity-80 mb-6">
                  <span className="text-3xl opacity-30 mr-1">&ldquo;</span>
                  {quote}
                  <span className="text-3xl opacity-30 ml-1">&rdquo;</span>
                </blockquote>
                <figcaption className="flex items-center justify-center gap-3 text-sm md:text-base">
                  {/* Avatar con iniciales */}
                  <span
                    className="inline-flex items-center justify-center w-11 h-11 rounded-full border-2 font-heading font-bold text-sm shrink-0"
                    style={{
                      backgroundColor: ACCENTS[index % ACCENTS.length],
                      color: 'var(--ink)',
                      borderColor: 'var(--ink)',
                    }}
                    aria-hidden="true"
                  >
                    {initials}
                  </span>
                  <span className="text-left">
                    <span className="font-semibold block">{author}</span>
                    <span className="opacity-70 text-xs md:text-sm">
                      {role}
                      {company && company !== '' ? ` · ${company}` : ''}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ) : (
              <motion.figure
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="text-center px-12"
              >
                <blockquote className="text-lg md:text-2xl font-medium leading-relaxed italic opacity-80 mb-6">
                  <span className="text-3xl opacity-30 mr-1">&ldquo;</span>
                  {quote}
                  <span className="text-3xl opacity-30 ml-1">&rdquo;</span>
                </blockquote>
                <figcaption className="flex items-center justify-center gap-3 text-sm md:text-base">
                  <span
                    className="inline-flex items-center justify-center w-11 h-11 rounded-full border-2 font-heading font-bold text-sm shrink-0"
                    style={{
                      backgroundColor: ACCENTS[index % ACCENTS.length],
                      color: 'var(--ink)',
                      borderColor: 'var(--ink)',
                    }}
                    aria-hidden="true"
                  >
                    {initials}
                  </span>
                  <span className="text-left">
                    <span className="font-semibold block">{author}</span>
                    <span className="opacity-70 text-xs md:text-sm">
                      {role}
                      {company && company !== '' ? ` · ${company}` : ''}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            )}
          </AnimatePresence>

          {/* Botón next */}
          <button
            onClick={next}
            aria-label={t('nextLabel')}
            className="absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center border-2 font-bold text-lg transition-all duration-150 hover:translate-x-0.5 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
            style={{
              backgroundColor: 'var(--surface)',
              color: 'var(--ink)',
              borderColor: 'var(--ink)',
              boxShadow: '-2px 2px 0 var(--ink)',
            }}
          >
            ›
          </button>
        </div>

        {/* Indicadores */}
        <div
          className="flex justify-center gap-2 mt-8"
          role="tablist"
          aria-label={t('indicatorsLabel')}
        >
          {Array.from({ length: TESTIMONIAL_COUNT }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`${t('title')} ${i + 1}`}
              aria-selected={i === index}
              role="tab"
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? 'w-8 opacity-100' : 'w-2 opacity-30 hover:opacity-60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
