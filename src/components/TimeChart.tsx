import type { Point } from '../data/report'
import styles from './TimeChart.module.css'

/* Figma: «Skin conductance · Arduino» (220:587) e «Facial activity · webcam» (220:600).
   Area del grafico da x 30 a 314 e da y 27 a 96; la curva passa per i punti con
   tangenti orizzontali, come i tracciati di Figma. */
const W = 322
const X0 = 30
const X1 = 314
const Y_TOP = 27
const Y_BOTTOM = 96

type Props = {
  title: string
  points: Point[]
  seconds: number
  stimulus: [number, number]
  range: [number, number]
  ticks: number[]
  tone: 'skin' | 'face'
  /* Solo pelle: linea della baseline e punto del picco */
  baseline?: number
  peak?: Point
  /* Solo l'ultimo grafico mostra i secondi sotto */
  timeAxis?: boolean
}

const fmt = (n: number) => String(+n.toFixed(2))

export function TimeChart({ title, points, seconds, stimulus, range, ticks, tone, baseline, peak, timeAxis }: Props) {
  const height = timeAxis ? 124 : 112
  const x = (t: number) => X0 + (t / seconds) * (X1 - X0)
  const y = (v: number) => Y_BOTTOM - ((v - range[0]) / (range[1] - range[0])) * (Y_BOTTOM - Y_TOP)
  const d = points
    .map(([t, v], i) => {
      if (i === 0) return `M${x(t)} ${y(v)}`
      const [pt, pv] = points[i - 1]
      const mid = (x(pt) + x(t)) / 2
      return `C${mid} ${y(pv)} ${mid} ${y(v)} ${x(t)} ${y(v)}`
    })
    .join(' ')
  /* Secondi sull'asse: passo «tondo» che dia al massimo 5 valori (0 15 30 45 60 nel mock). */
  const step = [1, 2, 5, 10, 15, 20, 30, 60, 120].find((s) => seconds / s <= 4) ?? Math.ceil(seconds / 4)
  const timeTicks = Array.from({ length: Math.floor(seconds / step) + 1 }, (_, i) => i * step)

  return (
    <svg className={styles.chart} viewBox={`0 0 ${W} ${height}`} role="img" aria-label={title}>
      <text x={0} y={6} className={`${styles.title} t-mono-small`}>
        {title}
      </text>
      <rect
        x={x(stimulus[0])}
        y={Y_TOP}
        width={x(stimulus[1]) - x(stimulus[0])}
        height={Y_BOTTOM - Y_TOP}
        className={styles.stimulus}
      />
      {ticks.map((v) => (
        <g key={v}>
          <line x1={X0} x2={X1} y1={y(v)} y2={y(v)} className={styles.grid} />
          <text x={0} y={y(v) - 1} className={`${styles.axis} t-mono-axis`}>
            {fmt(v)}
          </text>
        </g>
      ))}
      {baseline !== undefined && (
        <line x1={X0} x2={X1} y1={y(baseline)} y2={y(baseline)} className={styles.baseline} />
      )}
      <path d={d} className={`${styles.line} ${styles[tone]}`} />
      {peak && (
        <g>
          <circle cx={x(peak[0])} cy={y(peak[1])} r={3.5} className={styles.peak} />
          <text x={x(peak[0]) + 8} y={y(peak[1]) - 8} className={`${styles.peakLabel} t-mono-axis`}>
            {fmt(peak[1])}
          </text>
        </g>
      )}
      {timeAxis &&
        timeTicks.map((t, i) => (
          <text key={t} x={x(t) - 8} y={108} className={`${styles.axis} t-mono-axis`}>
            {i === timeTicks.length - 1 ? `${t}\u00a0s` : t}
          </text>
        ))}
    </svg>
  )
}
