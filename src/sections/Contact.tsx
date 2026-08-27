import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { Container, Section } from '@/components/ui/Section'
import { closing } from '@/content/sections'
import { contact } from '@/content/site'
import { isPlaceholder, mailHref, telHref } from '@/lib/format'
import { EnquiryForm } from './EnquiryForm'
import styles from './Contact.module.css'

/** Closing band: values, the four-line ambition, then contact details and the enquiry form. */
export function Contact() {
  return (
    <Section id="contact" tone="dark">
      <Container>
        <Reveal>
          <p className={styles.values}>{closing.values.join(' · ')}</p>
          <div className={styles.ambition}>
            {closing.ambition.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </Reveal>

        <Reveal className={styles.contact}>
          <div>
            <Eyebrow>{closing.contactEyebrow}</Eyebrow>
            <h2>{closing.contactHeading}</h2>
            <dl className={styles.details}>
              <dt>Office</dt>
              <dd>
                {contact.addressLines.map((line) => (
                  <span key={line} className={styles.line}>
                    {line}
                  </span>
                ))}
              </dd>
              <dt>Phone</dt>
              <dd>
                {contact.phones.map((phone) => (
                  <span key={phone} className={styles.line}>
                    {isPlaceholder(phone) ? phone : <a href={telHref(phone)}>{phone}</a>}
                  </span>
                ))}
              </dd>
              <dt>Email</dt>
              <dd>
                {contact.emails.map((email) => (
                  <span key={email} className={styles.line}>
                    {isPlaceholder(email) ? email : <a href={mailHref(email)}>{email}</a>}
                  </span>
                ))}
              </dd>
            </dl>
          </div>
          <EnquiryForm />
        </Reveal>
      </Container>
    </Section>
  )
}
