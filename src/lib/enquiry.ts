import { isPlaceholder } from './format'

export interface Enquiry {
  name: string
  email: string
  organisation: string
  message: string
}

export type EnquiryResult = { ok: true; via: 'form' | 'mailto' } | { ok: false; reason: string }

export interface EnquiryTargets {
  /** POST endpoint such as a Formspree URL. Takes priority when set. */
  endpoint: string
  /** Company inbox used for the mailto fallback. */
  email: string
}

export function buildMailto(to: string, enquiry: Enquiry): string {
  const org = enquiry.organisation ? ` (${enquiry.organisation})` : ''
  const subject = `Enquiry from ${enquiry.name}${org}`
  const body = `${enquiry.message}\n\n— ${enquiry.name}${org}\n${enquiry.email}`
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
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
      body: JSON.stringify(enquiry),
    })
    return response.ok
      ? { ok: true, via: 'form' }
      : { ok: false, reason: `The form service responded with status ${response.status}.` }
  }

  if (targets.email && !isPlaceholder(targets.email)) {
    window.location.href = buildMailto(targets.email, enquiry)
    return { ok: true, via: 'mailto' }
  }

  return { ok: false, reason: 'No company email or form endpoint is configured yet.' }
}
