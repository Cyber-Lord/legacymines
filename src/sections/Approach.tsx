import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { Container, Section } from '@/components/ui/Section'
import { approach } from '@/content/sections'
import styles from './Approach.module.css'

export function Approach() {
  return (
    <Section id="approach" tone="light">
      <Container>
        <Reveal>
          <Eyebrow>{approach.eyebrow}</Eyebrow>
          <h2>{approach.heading}</h2>
          <ul className={styles.list}>
            {approach.principles.map((principle) => (
              <li key={principle.title} className={styles.item}>
                <h3 className={styles.title}>{principle.title}</h3>
                <p className={styles.body}>{principle.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  )
}
