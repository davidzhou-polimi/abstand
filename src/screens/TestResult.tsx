import { Button } from '../components/Button'
import { Grain } from '../components/Grain'
import { profileDisguised as profile } from '../data/profile'
import frame from './Screen.module.css'
import styles from './TestResult.module.css'

/* Figma: «Test result» (174:258) */
export function TestResult() {
  return (
    <main className={frame.screen}>
      <div className={styles.content}>
        <div className={styles.stack}>
          <div className={styles.illustration}>
            <Grain />
            <img
              src={profile.illustration}
              width={140.12}
              height={128.2}
              alt=""
              className={styles.drawing}
            />
          </div>
          <div className={styles.heading}>
            <p className="t-body-small">Your emotional profile</p>
            <h1 className={`${styles.name} t-heading-h3`}>{profile.name}</h1>
          </div>
          <div className={styles.description}>
            <p className="t-body-default">{profile.description}</p>
          </div>
        </div>
      </div>
      <p className={`${styles.closing} t-body-small`}>
        It’s time to align what you show
        <br />
        with what you truly feel.
      </p>
      <Button to="/profile">Continue</Button>
    </main>
  )
}
