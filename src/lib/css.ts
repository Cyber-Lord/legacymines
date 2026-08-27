import type { CSSProperties } from 'react'

/** CSSProperties that also accepts custom properties such as `--i`. */
export type CSSVarStyle = CSSProperties & Record<`--${string}`, string | number>
