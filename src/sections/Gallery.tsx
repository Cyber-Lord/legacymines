import type { KeyboardEvent as ReactKeyboardEvent, TouchEvent as ReactTouchEvent } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { Container, Section } from '@/components/ui/Section'
import { gallery } from '@/content/sections'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cx } from '@/lib/cx'
import styles from './Gallery.module.css'

/** Horizontal distance a touch must travel before it counts as a swipe. */
const SWIPE_THRESHOLD = 40

export function Gallery() {
  const { slides, intervalSeconds } = gallery
  const count = slides.length
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reducedMotion = useReducedMotion()
  const touchStartX = useRef<number | null>(null)

  const goTo = useCallback((next: number) => setIndex(((next % count) + count) % count), [count])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])
  const next = useCallback(() => goTo(index + 1), [goTo, index])

  // Auto-advance. Restarts on every change of slide, so a manual step gets a full interval.
  useEffect(() => {
    if (count < 2 || paused || reducedMotion) return
    const timer = window.setTimeout(() => goTo(index + 1), intervalSeconds * 1000)
    return () => window.clearTimeout(timer)
  }, [count, goTo, index, intervalSeconds, paused, reducedMotion])

  const onKeyDown = (event: ReactKeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      prev()
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      next()
    }
  }

  const onTouchStart = (event: ReactTouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null
  }

  const onTouchEnd = (event: ReactTouchEvent) => {
    const start = touchStartX.current
    touchStartX.current = null
    if (start === null) return
    const end = event.changedTouches[0]?.clientX
    if (end === undefined) return
    const distance = end - start
    if (distance <= -SWIPE_THRESHOLD) next()
    else if (distance >= SWIPE_THRESHOLD) prev()
  }

  const current = slides[index]
  if (!current) return null

  return (
    <Section id="gallery" tone="brand">
      <Container>
        <Reveal>
          <Eyebrow>{gallery.eyebrow}</Eyebrow>
          <h2>{gallery.heading}</h2>
          <p className="ledeSm">{gallery.lede}</p>
        </Reveal>

        <Reveal className={styles.carousel}>
          <div
            role="group"
            aria-roledescription="carousel"
            aria-label={gallery.heading}
            tabIndex={0}
            className={styles.frame}
            onKeyDown={onKeyDown}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className={styles.track} style={{ transform: `translateX(-${index * 100}%)` }}>
              {slides.map((slide, position) => (
                <div
                  key={slide.src}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${position + 1} of ${count}`}
                  aria-hidden={position !== index}
                  className={styles.slide}
                >
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className={cx(styles.image, slide.contain && styles.contain)}
                    loading={position === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    draggable={false}
                  />
                </div>
              ))}
            </div>

            {count > 1 && (
              <>
                <button
                  type="button"
                  className={cx(styles.arrow, styles.arrowPrev)}
                  onClick={prev}
                  aria-label="Previous picture"
                >
                  <span aria-hidden="true">‹</span>
                </button>
                <button
                  type="button"
                  className={cx(styles.arrow, styles.arrowNext)}
                  onClick={next}
                  aria-label="Next picture"
                >
                  <span aria-hidden="true">›</span>
                </button>
              </>
            )}
          </div>

          <div className={styles.footer}>
            <p className={styles.caption} aria-live="polite">
              {current.caption ?? current.alt}
            </p>

            {count > 1 && (
              <div className={styles.dots} role="tablist" aria-label="Choose a picture">
                {slides.map((slide, position) => (
                  <button
                    key={slide.src}
                    type="button"
                    role="tab"
                    aria-selected={position === index}
                    aria-label={`Picture ${position + 1} of ${count}`}
                    className={cx(styles.dot, position === index && styles.dotActive)}
                    onClick={() => goTo(position)}
                  />
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
