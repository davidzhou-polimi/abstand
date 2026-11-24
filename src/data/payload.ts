/* Dati del QR della cabina (cabina/dashboard.html, reportData).
   Il QR apre https://…/abstand/#d=<base64url di un JSON>; il # tiene i dati sul telefono.
   Formato descritto in docs/QR.md. */
import { RADAR_ORDER, sampleReport, type Emotion, type Point, type Report } from './report'
import type { ProfileId } from './profiles'

type Payload = {
  v: number
  no?: number
  id?: string
  n?: string
  pr: number
  emo: string
  /* per emozione: [P, V, delta pelle %, espressione dominante, baseline µS, picco µS] */
  e: number[][]
  /* per emozione: [inizio video s, inizio recupero s, durata s, curve base64url] */
  s?: ([number | null, number | null, number, string] | null)[]
  t?: string
}

export type CabinResult = {
  profile: ProfileId
  participant: string
  report: Report
  /* Picco misurato da muting.py per l'area del segmento, in µS */
  measuredPeak: number | null
}

const STORAGE_KEY = 'abstand.result'

function fromBase64Url(s: string) {
  const b64 = s.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (s.length % 4)) % 4)
  return atob(b64)
}

function decodeJson(s: string): Payload {
  const bin = fromBase64Url(s)
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0))
  return JSON.parse(new TextDecoder().decode(bytes))
}

function toResult(p: Payload): CabinResult | null {
  if (!p || !Array.isArray(p.e) || typeof p.emo !== 'string' || ![1, 2, 3, 4].includes(p.pr)) return null
  const order = p.emo.split(',') as Emotion[]
  const areas = { ...sampleReport.areas }
  order.forEach((emo, i) => {
    const row = p.e[i]
    if (row) areas[emo] = { skin: row[0] ?? 0, face: row[1] ?? 0 }
  })
  /* Segmento dell'area più sensibile: quella con la media più alta di pelle e volto. */
  const top = RADAR_ORDER.reduce((best, e) =>
    areas[e].skin + areas[e].face > areas[best].skin + areas[best].face ? e : best,
  )
  const i = order.indexOf(top)
  const seg = p.s?.[i]
  const baseline = p.e[i]?.[4] ?? null
  let report: Report = { ...sampleReport, areas, number: String(p.no ?? 0).padStart(4, '0') }
  if (seg && baseline) {
    const [stimFrom, stimTo, n, data] = seg
    const bytes = Uint8Array.from(fromBase64Url(data), (c) => c.charCodeAt(0))
    const skin: Point[] = []
    const face: Point[] = []
    /* Ogni valore è la media di un secondo: lo si mette a metà del secondo. */
    for (let k = 0; k < n; k++) {
      if (bytes[k] !== 255) skin.push([k + 0.5, baseline * (1 + (bytes[k] - 50) / 100)])
      if (bytes[n + k] !== 255) face.push([k + 0.5, bytes[n + k] / 100])
    }
    report = {
      ...report,
      segment: {
        emotion: top,
        seconds: n,
        stimulus: [stimFrom ?? 0, stimTo ?? n],
        baseline,
        skin,
        face,
      },
    }
  }
  return {
    profile: p.pr as ProfileId,
    participant: p.n ?? '',
    report,
    measuredPeak: p.e[i]?.[5] ?? null,
  }
}

/* Da chiamare all'avvio: se l'indirizzo porta i dati della cabina li salva e li toglie dall'indirizzo. */
export function captureFromUrl() {
  const m = window.location.hash.match(/[#&]d=([A-Za-z0-9_-]+)/)
  if (!m) return
  try {
    const result = toResult(decodeJson(m[1]))
    if (result) {
      try {
        localStorage.setItem(STORAGE_KEY, m[1])
      } catch {
        /* senza memoria del browser i dati valgono solo per questa apertura */
      }
      memory = result
    }
  } catch {
    /* QR non valido: si resta sui dati di esempio */
  }
  history.replaceState(null, '', window.location.pathname + window.location.search)
}

let memory: CabinResult | null = null

/* Risultato della cabina, oppure null se la webapp è stata aperta senza QR. */
export function cabinResult(): CabinResult | null {
  if (memory) return memory
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) memory = toResult(decodeJson(saved))
  } catch {
    memory = null
  }
  return memory
}
