import { AREA_NAME, RADAR_ORDER, areaScore, type AreaResult, type Emotion } from '../data/report'
import styles from './RadarChart.module.css'

/* Figma: «Radar chart · normalized 0–1» (220:552), 320 × 226.
   Centro (161, 113), raggio 76; griglia a 0,25 / 0,5 / 0,75 / 1. */
const W = 320
const H = 226
const CX = 161
const CY = 113
const R = 76

const angle = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / RADAR_ORDER.length
const at = (i: number, r: number): [number, number] => [CX + Math.cos(angle(i)) * R * r, CY + Math.sin(angle(i)) * R * r]
const polygon = (r: (i: number) => number) =>
  RADAR_ORDER.map((_, i) => at(i, r(i)).map((n) => n.toFixed(2)).join(',')).join(' ')

/* Etichette come in Figma: posizione del bordo del testo e allineamento. */
const LABELS: Record<Emotion, { x: number; y: number; anchor: 'start' | 'middle' | 'end' }> = {
  sadness: { x: 161, y: 0, anchor: 'middle' },
  fear: { x: 246, y: 78, anchor: 'start' },
  joy: { x: 202, y: 188, anchor: 'start' },
  anger: { x: 116, y: 188, anchor: 'end' },
  disgust: { x: 78, y: 78, anchor: 'end' },
}

type Props = { areas: Record<Emotion, AreaResult> }

export function RadarChart({ areas }: Props) {
  const skin = (i: number) => areas[RADAR_ORDER[i]].skin
  const face = (i: number) => areas[RADAR_ORDER[i]].face
  return (
    <svg
      className={styles.radar}
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={RADAR_ORDER.map((e) => `${AREA_NAME[e]} ${areaScore(areas[e]).toFixed(2)}`).join(', ')}
    >
      {[0.25, 0.5, 0.75, 1].map((r) => (
        <polygon key={r} points={polygon(() => r)} className={styles.grid} />
      ))}
      {RADAR_ORDER.map((e, i) => {
        const [x, y] = at(i, 1)
        return <line key={e} x1={CX} y1={CY} x2={x} y2={y} className={styles.grid} />
      })}
      <polygon points={polygon(face)} className={styles.faceArea} />
      <polygon points={polygon(skin)} className={styles.skin} />
      <polygon points={polygon(face)} className={styles.face} />
      {RADAR_ORDER.map((e, i) => {
        const [x, y] = at(i, skin(i))
        return <circle key={e} cx={x} cy={y} r={2.5} className={styles.skinDot} />
      })}
      {RADAR_ORDER.map((e) => {
        const l = LABELS[e]
        return (
          <g key={e} textAnchor={l.anchor}>
            <text x={l.x} y={l.y + 6} className={`${styles.name} t-label-small`}>
              {AREA_NAME[e]}
            </text>
            <text x={l.x} y={l.y + 22} className={`${styles.value} t-mono-small`}>
              {areaScore(areas[e]).toFixed(2)}
            </text>
          </g>
        )
      })}
      <text x={174} y={42} className={`${styles.value} t-mono-axis`}>
        1
      </text>
      <text x={165} y={117} className={`${styles.value} t-mono-axis`}>
        0
      </text>
    </svg>
  )
}
