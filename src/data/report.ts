/* Referto del test in cabina. Le emozioni e il calcolo vengono da cabina/muting.py
   e dalla dashboard; i valori qui sotto sono quelli del mock Figma «Test result 2». */

export type Emotion = 'joy' | 'sadness' | 'anger' | 'disgust' | 'fear'

/* Nomi delle aree nel referto, come nella dashboard (LAB). */
export const AREA_NAME: Record<Emotion, string> = {
  sadness: 'Despair',
  fear: 'Panic',
  joy: 'Euphoria',
  anger: 'Rage',
  disgust: 'Revulsion',
}

/* Ordine nel radar, in senso orario dall'alto: come DISP nella dashboard (D P E R R). */
export const RADAR_ORDER: Emotion[] = ['sadness', 'fear', 'joy', 'anger', 'disgust']

/* Frase sotto l'area più sensibile. In Figma c'è solo quella di Despair. */
export const AREA_SENTENCE: Partial<Record<Emotion, string>> = {
  sadness: 'The highest response was to others’ distress.',
}

export type AreaResult = {
  /* P in muting.py: reazione della pelle, 0–1 */
  skin: number
  /* V in muting.py: reazione del volto, 0–1 */
  face: number
}

export type Point = [seconds: number, value: number]

export type Segment = {
  emotion: Emotion
  seconds: number
  stimulus: [from: number, to: number]
  /* Conduttanza della pelle in µS */
  skin: Point[]
  /* Attività del volto, 0–1 */
  face: Point[]
  /* Conduttanza a riposo prima dello stimolo, in µS */
  baseline: number
}

export type Report = {
  number: string
  areas: Record<Emotion, AreaResult>
  segment: Segment
}

/* Punteggio dell'area: media di pelle e volto, come «infl» nella dashboard.
   Nel mock: Despair (0,92 + 0,80) / 2 = 0,86. */
export function areaScore(a: AreaResult) {
  return (a.skin + a.face) / 2
}

export function mostSensitive(report: Report): Emotion {
  return RADAR_ORDER.reduce((best, e) =>
    areaScore(report.areas[e]) > areaScore(report.areas[best]) ? e : best,
  )
}

/* Recupero al 90%: secondi dal picco a quando la pelle torna sotto
   baseline + 10% della salita. Nel mock: dal picco a 24 s a 48 s, sotto 3,46 µS. */
export function skinMeasures(segment: Segment, measuredPeak?: number | null) {
  const curvePeak = segment.skin.reduce((a, b) => (b[1] > a[1] ? b : a))
  /* Il picco misurato da muting.py (ogni 0,2 s) può superare quello della curva al secondo. */
  const peak: Point = [curvePeak[0], measuredPeak ?? curvePeak[1]]
  const rise = peak[1] - segment.baseline
  const threshold = segment.baseline + 0.1 * rise
  const back = segment.skin.find(([t, v]) => t > peak[0] && v <= threshold + 1e-9)
  return {
    baseline: segment.baseline,
    peak: peak[1],
    peakAt: peak[0],
    change: rise,
    recoveryThreshold: threshold,
    recovery: back ? back[0] - peak[0] : null,
  }
}

/* Scala dell'asse dei µS: parte dal mezzo µS sotto il minimo e copre un numero intero
   di µS, così il valore di mezzo cade su un mezzo µS (3 / 4,5 / 6 nel mock). */
export function skinRange(segment: Segment): [number, number] {
  const values = segment.skin.map(([, v]) => v).concat(segment.baseline)
  const lo = Math.floor(Math.min(...values) * 2) / 2
  const hi = lo + Math.max(1, Math.ceil(Math.max(...values) - lo))
  return [lo, hi]
}

/* Dati del mock Figma «Test result 2» (213:568). Le curve sono i punti
   dei tracciati disegnati in Figma. */
export const sampleReport: Report = {
  number: '1539',
  areas: {
    sadness: { skin: 0.92, face: 0.8 },
    fear: { skin: 0.8, face: 0.64 },
    joy: { skin: 0.5, face: 0.36 },
    anger: { skin: 0.7, face: 0.52 },
    disgust: { skin: 0.42, face: 0.28 },
  },
  segment: {
    emotion: 'sadness',
    seconds: 60,
    stimulus: [10, 20],
    baseline: 3.2,
    skin: [
      [0, 3.2], [5, 3.18], [10, 3.2], [14, 3.45], [18, 4.15], [21, 5.2], [24, 5.8], [28, 5.45],
      [32, 4.9], [36, 4.3], [40, 3.9], [44, 3.62], [48, 3.46], [54, 3.32], [60, 3.24],
    ],
    face: [
      [0, 0.1], [5, 0.09], [10, 0.12], [13, 0.3], [16, 0.68], [20, 0.8], [24, 0.58], [28, 0.39],
      [32, 0.26], [36, 0.32], [40, 0.2], [44, 0.16], [48, 0.13], [54, 0.1], [60, 0.1],
    ],
  },
}
