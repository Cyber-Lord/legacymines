import type { ReactNode } from 'react'
import { useInView } from '@/hooks/useInView'
import { cx } from '@/lib/cx'
import styles from './Reveal.module.css'

interface RevealProps {
  children: ReactNode
  className?: string
}

/** Fades content up the first time it scrolls into view. */
export function Reveal({ children, className }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>()
  return (
    <div ref={ref} className={cx(styles.reveal, inView && styles.shown, className)}>
      {children}
    </div>
  )
}
