import { assets, company, nav } from '@/content/site'
import styles from './Footer.module.css'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer data-tone="brand" className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <img
            src={assets.logoFull}
            alt={`${company.name} logo`}
            width={160}
            height={160}
            loading="lazy"
            decoding="async"
            className={styles.logo}
          />
          <p className={styles.tagline}>{company.tagline}</p>
        </div>

        <div className={styles.meta}>
          <nav aria-label="Footer" className={styles.nav}>
            {nav.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
            <a href="#contact">Contact</a>
          </nav>
          <p>
            &copy; {year} {company.name}. Registered in {company.registeredIn} &middot; RC{' '}
            {company.rcNumber}.
          </p>
        </div>
      </div>
    </footer>
  )
}
