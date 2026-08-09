'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const TESTIMONIAL_COUNT = 3

export default function Testimonials() {
  const t = useTranslations('Testimonials')
  const [index, setIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (!autoPlay) return
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % TESTIMONIAL_COUNT)
    }, 6000)
    return () => clearInterval(timer)
  }, [autoPlay])

  const current = {
    quote: t(`items.${index}.quote`),
    author: t(`items.${index}.author`),
    role: t(`items.${index}.role`),
  }
  const company = t(`items.${index}.company`)

  return (
    <section
      id="testimonials"
      className="relative w-full py-20 md:py-32 px-6 md:px-12"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center tracking-tight">
          {t('title')}
        </h2>

        <div
          className="relative min-h-[240px] md:min-h-[200px] flex items-center justify-center"
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
        >
          <AnimatePresence mode="wait">
            {shouldReduceMotion ? (
              <blockquote
                key={index}
                className="text-center"
              >
                <p className="text-lg md:text-2xl font-medium leading-relaxed italic opacity-80 mb-6">
                  <span className="text-3xl opacity-30 mr-1">&ldquo;</span>
                  {current.quote}
                  <span className="text-3xl opacity-30 ml-1">&rdquo;</span>
                </p>
                <figcaption className="text-sm md:text-base">
                  <span className="font-semibold">{current.author}</span>
                  <span className="opacity-50 mx-2">·</span>
                  <span className="opacity-70">{current.role}</span>
                  {company && (
                    <>
                      <span className="opacity-50 mx-2">·</span>
                      <span className="opacity-50 text-sm">{company}</span>
                    </>
                  )}
                </figcaption>
              </blockquote>
            ) : (
              <motion.figure
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="text-center"
              >
                <blockquote className="text-lg md:text-2xl font-medium leading-relaxed italic opacity-80 mb-6">
                  <span className="text-3xl opacity-30 mr-1">&ldquo;</span>
                  {current.quote}
                  <span className="text-3xl opacity-30 ml-1">&rdquo;</span>
                </blockquote>
                <figcaption className="text-sm md:text-base">
                  <span className="font-semibold">{current.author}</span>
                  <span className="opacity-50 mx-2">·</span>
                  <span className="opacity-70">{current.role}</span>
                  {company && (
                    <>
                      <span className="opacity-50 mx-2">·</span>
                      <span className="opacity-50 text-sm">{company}</span>
                    </>
                  )}
                </figcaption>
              </motion.figure>
            )}
          </AnimatePresence>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label={t('indicatorsLabel')}>
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
