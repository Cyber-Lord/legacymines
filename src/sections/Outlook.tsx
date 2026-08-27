import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { Container, Section } from '@/components/ui/Section'
import { outlook } from '@/content/sections'
import type { Column as ColumnContent } from '@/types/content'
import { cx } from '@/lib/cx'
import styles from './Outlook.module.css'

function Column({ eyebrow, heading, paragraphs }: ColumnContent) {
  return (
    <div>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className={styles.heading}>{heading}</h2>
      <div className={cx('prose', styles.prose)}>
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </div>
  )
}

/** The opportunity in the sector, and what "legacy" means to the company. */
export function Outlook() {
  return (
    <Section id="opportunity" tone="alt">
      <Container>
        <Reveal className={styles.grid}>
          <Column {...outlook.opportunity} />
          <Column {...outlook.legacy} />
        </Reveal>
      </Container>
    </Section>
  )
}
