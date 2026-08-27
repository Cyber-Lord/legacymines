import styles from './QuarryCrossSection.module.css'

/**
 * The hero drawing: a benched quarry face descending from the surface through a laterite cap
 * and weathered zone into hard rock. Pure SVG, coloured by design tokens, draws itself on load.
 */
export function QuarryCrossSection() {
  return (
    <svg
      className={styles.svg}
      viewBox="0 0 1200 400"
      role="img"
      aria-labelledby="quarry-title quarry-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="quarry-title">Cross-section of a benched quarry face</title>
      <desc id="quarry-desc">
        A stepped quarry wall descends from the surface through a laterite cap and weathered zone
        into hard rock, down to the pit floor.
      </desc>
      <defs>
        <clipPath id="quarry-rock">
          <path d="M0 70H300V120H420V170H540V220H660V270H780V320H1200V400H0Z" />
        </clipPath>
      </defs>

      <g className={styles.fill} clipPath="url(#quarry-rock)">
        <rect className={styles.base} x="0" y="0" width="1200" height="400" />
        <rect className={styles.cap} x="0" y="70" width="1200" height="24" />
        <rect className={styles.weathered} x="0" y="94" width="1200" height="60" />
        <g className={styles.strata}>
          <path d="M0 190C220 184 380 198 600 190S980 182 1200 192" />
          <path d="M0 232C200 238 420 226 640 234S1000 240 1200 230" />
          <path d="M0 276C240 270 400 284 620 276S960 270 1200 280" />
          <path d="M0 322C200 328 420 316 640 324S1000 330 1200 320" />
          <path d="M0 364C240 358 400 372 620 364S960 358 1200 368" />
        </g>
        <g className={styles.joints}>
          <path d="M120 400L200 160" />
          <path d="M330 400L390 200" />
          <path d="M700 400L760 300" />
          <path d="M900 400L1000 330" />
        </g>
      </g>

      <path
        className={styles.profile}
        pathLength={1}
        d="M0 70H300V120H420V170H540V220H660V270H780V320H1200"
      />

      <g className={styles.labels}>
        <text className={styles.onLight} x="24" y="58">
          SURFACE
        </text>
        <text className={styles.onDark} x="24" y="87">
          LATERITE CAP
        </text>
        <text className={styles.onDark} x="24" y="131">
          WEATHERED ZONE
        </text>
        <text className={styles.onDark} x="24" y="232">
          HARD ROCK
        </text>
        <line className={styles.tick} x1="480" y1="168" x2="480" y2="150" />
        <text className={styles.onLight} x="488" y="158">
          BENCH
        </text>
        <text className={styles.onLight} x="1010" y="308">
          PIT FLOOR
        </text>
        <line className={styles.scale} x1="1040" y1="374" x2="1160" y2="374" />
        <line className={styles.scale} x1="1040" y1="368" x2="1040" y2="380" />
        <line className={styles.scale} x1="1160" y1="368" x2="1160" y2="380" />
        <text className={styles.onDark} x="1100" y="360" textAnchor="middle">
          20 M
        </text>
      </g>
    </svg>
  )
}
