import { useId, useState, type ChangeEvent, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { contact } from '@/content/site'
import { cx } from '@/lib/cx'
import { sendEnquiry, type Enquiry } from '@/lib/enquiry'
import styles from './EnquiryForm.module.css'

type Status =
  { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'error'; message: string }

const emptyEnquiry: Enquiry = { name: '', email: '', organisation: '', message: '' }

/** FormSubmit's spam-trap field name. */
const HONEYPOT = '_honey'

export function EnquiryForm() {
  const id = useId()
  const [enquiry, setEnquiry] = useState<Enquiry>(emptyEnquiry)
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  const update = (field: keyof Enquiry) => (value: string) =>
    setEnquiry((current) => ({ ...current, [field]: value }))

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!enquiry.name.trim() || !enquiry.email.trim() || !enquiry.message.trim()) {
      setStatus({ kind: 'error', message: 'Add your name, email and message before sending.' })
      return
    }

    // Only a bot fills the hidden field. Show success and send nothing.
    if (new FormData(event.currentTarget).get(HONEYPOT)) {
      setStatus({ kind: 'sent' })
      return
    }

    setStatus({ kind: 'sending' })
    try {
      const result = await sendEnquiry(enquiry, {
        endpoint: contact.formEndpoint,
        email: contact.emails[0] ?? '',
      })
      if (result.ok) {
        setStatus({ kind: 'sent' })
        if (result.via === 'form') setEnquiry(emptyEnquiry)
      } else {
        setStatus({ kind: 'error', message: result.reason })
      }
    } catch {
      setStatus({ kind: 'error', message: 'The message could not be sent. Please try again.' })
    }
  }

  const statusText: Record<Status['kind'], string> = {
    idle: contact.formEndpoint
      ? 'We reply within two working days.'
      : 'Opens your email app with the message ready to send.',
    sending: 'Sending…',
    sent: contact.formEndpoint
      ? 'Thank you. Your enquiry has been received.'
      : 'Your email app should now be open with the message ready to send.',
    error: status.kind === 'error' ? status.message : '',
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <Field
        id={`${id}-name`}
        label="Name"
        value={enquiry.name}
        onChange={update('name')}
        autoComplete="name"
      />
      <Field
        id={`${id}-email`}
        label="Email"
        type="email"
        value={enquiry.email}
        onChange={update('email')}
        autoComplete="email"
      />
      <Field
        id={`${id}-org`}
        label="Organisation"
        value={enquiry.organisation}
        onChange={update('organisation')}
        autoComplete="organization"
      />
      <input
        type="text"
        name={HONEYPOT}
        className={styles.honeypot}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <div className={styles.field}>
        <label htmlFor={`${id}-message`} className={styles.label}>
          Message
        </label>
        <textarea
          id={`${id}-message`}
          className={cx(styles.input, styles.textarea)}
          value={enquiry.message}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
            update('message')(event.target.value)
          }
          required
        />
      </div>
      <Button type="submit" className={styles.submit} disabled={status.kind === 'sending'}>
        Send enquiry
      </Button>
      <p className={cx(styles.status, status.kind === 'error' && styles.statusError)} role="status">
        {statusText[status.kind]}
      </p>
    </form>
  )
}

interface FieldProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  type?: 'text' | 'email'
  autoComplete?: string
}

function Field({ id, label, value, onChange, type = 'text', autoComplete }: FieldProps) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        className={styles.input}
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
        autoComplete={autoComplete}
      />
    </div>
  )
}
