import { isPlaceholder } from './format'

export interface Enquiry {
  name: string
  email: string
  organisation: string
  message: string
}

export type EnquiryResult = { ok: true; via: 'form' | 'mailto' } | { ok: false; reason: string }

export interface EnquiryTargets {
  /** POST endpoint such as a FormSubmit or Formspree URL. Takes priority when set. */
  endpoint: string
  /** Company inbox used for the mailto fallback. */
  email: string
}

/** Underscore-prefixed keys are instructions to the form service, not answers from the visitor. */
type Payload = Record<string, string>

const subjectFor = (enquiry: Enquiry): string => {
  const org = enquiry.organisation.trim()
  return `Website enquiry from ${enquiry.name.trim()}${org ? ` (${org})` : ''}`
}

export function buildMailto(to: string, enquiry: Enquiry): string {
  const org = enquiry.organisation ? ` (${enquiry.organisation})` : ''
  const body = `${enquiry.message}\n\n— ${enquiry.name}${org}\n${enquiry.email}`
  return `mailto:${to}?subject=${encodeURIComponent(subjectFor(enquiry))}&body=${encodeURIComponent(body)}`
}

const isFormSubmit = (endpoint: string): boolean => {
  try {
    const host = new URL(endpoint).hostname
    return host === 'formsubmit.co' || host.endsWith('.formsubmit.co')
  } catch {
    return false
  }
}

/**
 * `_subject` and `_replyto` are honoured by every mainstream form relay, so replying to the
 * notification email answers the visitor directly. `_template` and `_captcha` are FormSubmit's own.
 */
function buildPayload(enquiry: Enquiry, endpoint: string): Payload {
  const email = enquiry.email.trim()
  const payload: Payload = {
    name: enquiry.name.trim(),
    email,
    organisation: enquiry.organisation.trim(),
    message: enquiry.message.trim(),
    _subject: subjectFor(enquiry),
    _replyto: email,
  }
  if (isFormSubmit(endpoint)) {
    payload._template = 'table'
    payload._captcha = 'false'
  }
  return payload
}

/** FormSubmit answers `{ success: "true" | "false", message }`; other services just use the status. */
function readServiceError(body: unknown): string | null {
  if (typeof body !== 'object' || body === null) return null
  const { success, message } = body as { success?: unknown; message?: unknown }
  if (success === undefined || success === true || success === 'true') return null
  return typeof message === 'string' && message.trim()
    ? message
    : 'The form service rejected the enquiry.'
}

/**
 * Sends the enquiry to the form endpoint if one is configured,
 * otherwise opens the visitor's email app with the message prepared.
 */
export async function sendEnquiry(
  enquiry: Enquiry,
  targets: EnquiryTargets,
): Promise<EnquiryResult> {
  if (targets.endpoint) {
    const response = await fetch(targets.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(buildPayload(enquiry, targets.endpoint)),
    })

    const body: unknown = await response.json().catch(() => null)

    if (!response.ok) {
      return {
        ok: false,
        reason:
          readServiceError(body) ?? `The form service responded with status ${response.status}.`,
      }
    }

    const serviceError = readServiceError(body)
    return serviceError ? { ok: false, reason: serviceError } : { ok: true, via: 'form' }
  }

  if (targets.email && !isPlaceholder(targets.email)) {
    window.location.href = buildMailto(targets.email, enquiry)
    return { ok: true, via: 'mailto' }
  }

  return { ok: false, reason: 'No company email or form endpoint is configured yet.' }
}
