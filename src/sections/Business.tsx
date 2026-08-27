import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { Container, Section } from '@/components/ui/Section'
import { business } from '@/content/sections'
import type { CSSVarStyle } from '@/lib/css'
import styles from './Business.module.css'

/** The value chain drawn as quarry benches: each stage steps down from the one before. */
export function Business() {
  return (
    <Section id="business" tone="alt">
      <Container>
        <Reveal>
          <Eyebrow>{business.eyebrow}</Eyebrow>
          <h2>{business.heading}</h2>
          <p className="ledeSm">{business.lede}</p>

          <ol className={styles.benches}>
            {business.stages.map((stage, index) => {
              const style: CSSVarStyle = { '--i': index }
              return (
                <li key={stage.title} className={styles.bench} style={style}>
                  <span className={styles.stage}>{stage.stageLabel ?? ''}</span>
                  <h3 className={styles.title}>{stage.title}</h3>
                  <p className={styles.body}>{stage.body}</p>
                </li>
              )
            })}
          </ol>

          <p className={styles.note}>{business.note}</p>
        </Reveal>
      </Container>
    </Section>
  )
}
