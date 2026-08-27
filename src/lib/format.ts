/** Content placeholders are written in square brackets, e.g. "[Add phone number]". */
export const isPlaceholder = (value: string): boolean => value.trim().startsWith('[')

/** "+234 803 000 0000" → "tel:+2348030000000" */
export const telHref = (phone: string): string => `tel:${phone.replace(/[^\d+]/g, '')}`

export const mailHref = (email: string): string => `mailto:${email.trim()}`
