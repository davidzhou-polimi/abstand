import { Button } from '../components/Button'
import { Grain } from '../components/Grain'
import { PROFILES } from '../data/profiles'
import { cabinResult } from '../data/payload'
import frame from './Screen.module.css'
import styles from './TestResult.module.css'

/* Figma: «Test result 1» (213:532) */
export function TestResult() {
  /* Senza QR si mostra il profilo del mock, Disguised. */
  const profile = PROFILES[cabinResult()?.profile ?? 2]
  return (
    <main className={frame.screen}>
      <div className={styles.content}>
        <div className={styles.stack}>
          {profile.illustration && (
            <div className={styles.illustration}>
              <Grain />
              <img src={profile.illustration} width={140.12} height={128.2} alt="" className={styles.drawing} />
            </div>
          )}
          <div className={styles.heading}>
            <p className="t-body-small">Your emotional profile</p>
            <h1 className={`${styles.name} t-heading-h3`}>{profile.name}</h1>
          </div>
          {profile.description && (
            <div className={styles.description}>
              <p className="t-body-default">{profile.description}</p>
            </div>
          )}
        </div>
      </div>
      <p className={`${styles.closing} t-body-small`}>
        It’s time to align what you show
        <br />
        with what you truly feel.
      </p>
      <Button to="/report">View your test results</Button>
    </main>
  )
}
