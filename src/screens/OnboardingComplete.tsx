import { Button } from '../components/Button'
import { Grain } from '../components/Grain'
import styles from './OnboardingComplete.module.css'

/* Figma: «Onboarding complete» (173:309). La «Grana» è sia sul frame
   sia sul suo «Screen», come nel file. */
export function OnboardingComplete() {
  return (
    <main className={styles.page}>
      <Grain />
      <div className={styles.screen}>
        <Grain />
        <div className={styles.content}>
          <div className={styles.message}>
            <p className="t-label-default">Profile created</p>
            <h1 className="t-heading-h3">
              Your program
              <br />
              is now active
            </h1>
          </div>
        </div>
        <p className={`${styles.waiting} t-body-small`}>Your first lesson is waiting.</p>
        <Button to="/training" tone="inverse">
          Start your journey
        </Button>
      </div>
    </main>
  )
}
