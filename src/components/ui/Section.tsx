import type { ReactNode } from 'react'
import { cx } from '@/lib/cx'
import styles from './Section.module.css'

/** Background/foreground pairing. See the tone variables in styles/tokens.css. */
export type Tone = 'light' | 'alt' | 'dark' | 'brand'

interface SectionProps {
  id?: string
  tone?: Tone
  className?: string
  children: ReactNode
}

export function Section({ id, tone = 'light', className, children }: SectionProps) {
  return (
    <section id={id} data-tone={tone} className={cx(styles.section, className)}>
      {children}
    </section>
  )
}

interface ContainerProps {
  className?: string
  children: ReactNode
}

export function Container({ className, children }: ContainerProps) {
  return <div className={cx(styles.container, className)}>{children}</div>
}
