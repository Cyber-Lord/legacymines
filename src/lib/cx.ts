/** Joins class names, dropping falsy values. `cx('a', cond && 'b')` → "a b" or "a". */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}
