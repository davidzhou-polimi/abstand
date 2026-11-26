import type { CSSProperties } from 'react'
import { Button } from '../components/Button'
import { PROFILES } from '../data/profiles'
import { cabinResult } from '../data/payload'
import frame from './Screen.module.css'
import styles from './TestResult.module.css'

/* Figma: «Test result — Absolute / Disguised / Dramatic / Exposed»
   (416:2986, 416:3282, 416:3182, 416:3083). */
export function TestResult() {
  /* Senza QR si mostra il profilo del mock, Disguised. */
  const profile = PROFILES[cabinResult()?.profile ?? 2]
  const { symbol } = profile
  return (
    <main
      className={`${frame.screen} ${styles.screen}`}
      style={{ '--stops': profile.background } as CSSProperties}
    >
      <div className={styles.content}>
        <div className={styles.stack}>
          <div className={styles.symbol}>
            <img
              src={symbol.src}
              width={symbol.width}
              height={symbol.height}
              alt=""
              style={{ left: symbol.left, top: symbol.top }}
            />
          </div>
          <div className={styles.heading}>
            <p className="t-new-short">Your emotional profile</p>
            <h1 className="t-heading-h3">{profile.name}</h1>
          </div>
          <div className={styles.description}>
            <p className="t-body-default">{profile.description}</p>
          </div>
        </div>
      </div>
      <p className={`${styles.closing} t-new-short`}>
        {profile.closing[0]}
        <br />
        {profile.closing[1]}
      </p>
      <Button to="/report">View your results</Button>
    </main>
  )
}
