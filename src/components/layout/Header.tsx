import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { assets, company, nav, primaryCta } from '@/content/site'
import { useScrolled } from '@/hooks/useScrolled'
import { cx } from '@/lib/cx'
import styles from './Header.module.css'

export function Header() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled(8)
  const close = () => setOpen(false)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header id="top" data-tone="brand" className={cx(styles.header, scrolled && styles.scrolled)}>
      <div className={styles.inner}>
        <a
          href="#top"
          className={styles.brand}
          aria-label={`${company.name} — home`}
          onClick={close}
        >
          <img
            src={assets.logoEmblem}
            alt=""
            width={44}
            height={44}
            className={styles.emblem}
            decoding="async"
          />
          <span className={styles.wordmark}>
            <span className={styles.wordmarkName}>{company.shortName}</span>
            <span className={styles.wordmarkSuffix}>Limited</span>
          </span>
        </a>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? 'Close' : 'Menu'}
        </button>

        <nav id="primary-nav" aria-label="Main" className={cx(styles.nav, open && styles.navOpen)}>
          {nav.map((link) => (
            <a key={link.href} href={link.href} className={styles.navLink} onClick={close}>
              {link.label}
            </a>
          ))}
          <Button href={primaryCta.href} size="sm" onClick={close}>
            {primaryCta.label}
          </Button>
        </nav>
      </div>
    </header>
  )
}
