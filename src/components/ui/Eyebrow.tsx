import type { ReactNode } from 'react'
import { cx } from '@/lib/cx'
import styles from './Eyebrow.module.css'

interface EyebrowProps {
  children: ReactNode
  className?: string
}

/** Small uppercase label with a short rule, used above section headings. */
export function Eyebrow({ children, className }: EyebrowProps) {
  return <p className={cx(styles.eyebrow, className)}>{children}</p>
}
