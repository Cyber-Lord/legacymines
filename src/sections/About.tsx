import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { Container, Section } from '@/components/ui/Section'
import { about } from '@/content/sections'
import { cx } from '@/lib/cx'
import styles from './About.module.css'

export function About() {
  return (
    <Section id="about" tone="light">
      <Container>
        <Reveal className={styles.grid}>
          <div>
            <Eyebrow>{about.eyebrow}</Eyebrow>
            <h2>{about.heading}</h2>
          </div>
          <div className="prose">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <Reveal className={cx(styles.grid, styles.cards)}>
          <div className={styles.card}>
            <Eyebrow className={styles.cardEyebrow}>Vision</Eyebrow>
            <p>{about.vision}</p>
          </div>
          <div className={styles.card}>
            <Eyebrow className={styles.cardEyebrow}>Mission</Eyebrow>
            <p>{about.mission}</p>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
