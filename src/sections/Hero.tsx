import { QuarryCrossSection } from '@/components/QuarryCrossSection'
import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Container } from '@/components/ui/Section'
import { hero } from '@/content/sections'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section data-tone="light" className={styles.hero} aria-labelledby="hero-heading">
      <Container>
        <Eyebrow>{hero.eyebrow}</Eyebrow>
        <h1 id="hero-heading" className={styles.heading}>
          {hero.heading}
        </h1>
        <p className="lede">{hero.lede}</p>
        <div className={styles.actions}>
          <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
          <Button href={hero.secondaryCta.href} variant="ghost">
            {hero.secondaryCta.label}
          </Button>
        </div>
      </Container>
      <Container className={styles.drawing}>
        <QuarryCrossSection />
      </Container>
    </section>
  )
}
