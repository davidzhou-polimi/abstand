import { Button } from '../components/Button'
import { RadarChart } from '../components/RadarChart'
import { TimeChart } from '../components/TimeChart'
import keySkin from '../assets/key-skin.svg'
import keyFace from '../assets/key-face.svg'
import { AREA_NAME, AREA_SENTENCE, areaScore, mostSensitive, sampleReport, skinMeasures, skinRange } from '../data/report'
import { cabinResult } from '../data/payload'
import styles from './TestReport.module.css'

/* Figma: «Test result 2» (213:568). Dati della cabina se la webapp è stata aperta dal QR,
   altrimenti quelli del mock. */
/* Numero e unità non vanno a capo separati. */
const µS = (n: number) => `${n.toFixed(1)}\u00a0µS`

export function TestReport() {
  const result = cabinResult()
  const report = result?.report ?? sampleReport
  const top = mostSensitive(report)
  const seg = report.segment
  const m = skinMeasures(seg, result?.measuredPeak)
  const range = skinRange(seg)
  const segName = AREA_NAME[seg.emotion]

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className="t-heading-h4">Your test results</h1>
          <p className={`${styles.secondary} t-label-small`}>REPORT #{report.number}</p>
        </header>

        <section className={styles.highlight}>
          <p className={`${styles.onDarkSecondary} t-label-small`}>YOUR MOST SENSITIVE AREA</p>
          <div className={styles.highlightRow}>
            <h2 className="t-heading-h4">{AREA_NAME[top]}</h2>
            <p className="t-label-large">{areaScore(report.areas[top]).toFixed(2)}&nbsp;/&nbsp;1</p>
          </div>
          {AREA_SENTENCE[top] && <p className={`${styles.onDarkSecondary} t-new-short`}>{AREA_SENTENCE[top]}</p>}
        </section>

        <section className={styles.card}>
          <h2 className="t-heading-h5">One profile, two signals</h2>
          <div className={styles.legend}>
            <p className={`${styles.secondary} t-body-small`}>
              <img src={keySkin} width={20} height={12} alt="" />
              Skin response
            </p>
            <p className={`${styles.secondary} t-body-small`}>
              <img src={keyFace} width={20} height={12} alt="" />
              Facial response
            </p>
          </div>
          <RadarChart areas={report.areas} />
          <p className={`${styles.secondary} t-body-small`}>DPERR scores · 0 = low, 1 = high reactivity</p>
        </section>

        <section className={styles.card}>
          <div className={styles.cardHeading}>
            <p className={`${styles.secondary} ${styles.pre} t-label-small`}>
              {`${segName.toUpperCase()} SEGMENT  /  ${seg.seconds} SECONDS`}
            </p>
            <h2 className="t-heading-h5">How your response unfolded</h2>
          </div>
          <TimeChart
            title="SKIN CONDUCTANCE · µS"
            tone="skin"
            points={seg.skin}
            seconds={seg.seconds}
            stimulus={seg.stimulus}
            range={range}
            ticks={[range[0], (range[0] + range[1]) / 2, range[1]]}
            baseline={m.baseline}
            peak={[m.peakAt, m.peak]}
          />
          <TimeChart
            title="FACIAL ACTIVITY · NORMALIZED 0–1"
            tone="face"
            points={seg.face}
            seconds={seg.seconds}
            stimulus={seg.stimulus}
            range={[0, 1]}
            ticks={[0, 0.5, 1]}
            timeAxis
          />
          <p className={`${styles.secondary} t-body-small`}>
            Tinted window: stimulus shown from {seg.stimulus[0]} to {`${seg.stimulus[1]}\u00a0s`}.
          </p>
          <dl className={styles.measures}>
            <div>
              <dt className={`${styles.secondary} t-mono-small`}>BASELINE</dt>
              <dd className="t-heading-h5">{µS(m.baseline)}</dd>
            </div>
            <div>
              <dt className={`${styles.secondary} t-mono-small`}>PEAK</dt>
              <dd className="t-heading-h5">{µS(m.peak)}</dd>
            </div>
            <div>
              <dt className={`${styles.secondary} t-mono-small`}>CHANGE FROM BASELINE</dt>
              <dd className="t-heading-h5">
                {m.change >= 0 ? '+' : ''}
                {µS(m.change)}
              </dd>
            </div>
            <div>
              <dt className={`${styles.secondary} t-mono-small`}>90% RECOVERY</dt>
              <dd className="t-heading-h5">{m.recovery === null ? '–' : `${m.recovery}\u00a0s`}</dd>
            </div>
          </dl>
          <p className={`${styles.secondary} t-body-small`}>
            Recovery: time from peak until 90% of the rise has subsided ({`${m.recoveryThreshold.toFixed(2)}\u00a0µS`}).
          </p>
        </section>
      </div>
      <Button to="/profile">Create my profile</Button>
    </main>
  )
}
