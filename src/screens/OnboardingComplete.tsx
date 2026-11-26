import { Button } from '../components/Button'
import { Grain } from '../components/Grain'
import rings from '../assets/onboarding-rings.webp'
import styles from './OnboardingComplete.module.css'

/* Figma: «Onboarding complete» (433:4518), con l'animazione di 3,5 s: il fondo chiaro
   svanisce mentre gli anelli si allargano dal centro, poi entrano testo e pulsante.
   In Figma l'animazione gira in loop per l'anteprima; qui parte una volta e resta ferma
   sullo stato finale. */
export function OnboardingComplete() {
  return (
    <main className={styles.page}>
      <Grain />
      <div className={styles.veil} aria-hidden="true" />
      <div className={styles.ringsFade} aria-hidden="true">
        <img src={rings} alt="" className={styles.rings} />
      </div>
      <div className={styles.screen}>
        <div className={styles.message}>
          <p className={`${styles.created} t-new-short`}>Profile created</p>
          <h1 className={`${styles.title} t-heading-h3`}>
            Your program
            <br />
            is now active
          </h1>
        </div>
        <div className={styles.action}>
          <Button to="/training" tone="inverse">
            Start your journey
          </Button>
        </div>
      </div>
    </main>
  )
}
