import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { Container, Section } from '@/components/ui/Section'
import { leadership } from '@/content/sections'
import { cx } from '@/lib/cx'
import styles from './Leadership.module.css'

export function Leadership() {
  const { founder } = leadership

  return (
    <Section id="leadership" tone="dark">
      <Container>
        <Reveal className={styles.grid}>
          <figure className={styles.figure}>
            <img
              src={founder.photo}
              alt={founder.photoAlt}
              width={600}
              height={750}
              loading="lazy"
              decoding="async"
              className={styles.photo}
            />
            <figcaption className={styles.caption}>
              {founder.name}, {founder.role}
            </figcaption>
          </figure>

          <div>
            <Eyebrow>{leadership.eyebrow}</Eyebrow>
            <h2 className={styles.name}>{founder.name}</h2>
            <p className={styles.role}>{founder.role}</p>
            <div className={cx('prose', styles.bio)}>
              {founder.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className={styles.origin}>{founder.origin}</p>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
