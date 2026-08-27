import type { ReactNode } from 'react'
import { cx } from '@/lib/cx'
import styles from './Button.module.css'

type Variant = 'primary' | 'ghost'
type Size = 'md' | 'sm'

interface ButtonProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  /** When set, renders an anchor instead of a button. */
  href?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
}

/** Colours come from the surrounding tone, so the same button works on light and dark sections. */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  href,
  type = 'button',
  disabled,
  onClick,
}: ButtonProps) {
  const classes = cx(styles.button, styles[variant], size === 'sm' && styles.small, className)

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}
