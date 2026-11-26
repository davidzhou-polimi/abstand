import { useEffect, useRef, useState } from 'react'
import { Button } from '../components/Button'
import { Grain } from '../components/Grain'
import rings from '../assets/onboarding-rings.webp'
import styles from './OnboardingComplete.module.css'

/* Figma: «Onboarding complete» (433:4518), con l'animazione di 3,5 s: il fondo chiaro
   svanisce mentre gli anelli si allargano dal centro, poi entrano testo e pulsante.
   In Figma l'animazione gira in loop per l'anteprima; qui parte una volta e resta ferma
   sullo stato finale. L'animazione parte quando l'immagine degli anelli è pronta: prima
   resta ferma sul primo fotogramma, altrimenti su una rete lenta gli anelli arrivano
   quando dovrebbero già essere spariti. */
export function OnboardingComplete() {
  const ringsRef = useRef<HTMLImageElement>(null)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    let alive = true
    const img = ringsRef.current
    const start = () => {
      if (alive) setReady(true)
    }
    if (img) img.decode().then(start, start)
    else start()
    return () => {
      alive = false
    }
  }, [])

  return (
    <main className={`${styles.page} ${ready ? styles.ready : ''}`}>
      <Grain />
      <div className={styles.veil} aria-hidden="true" />
      <div className={styles.ringsFade} aria-hidden="true">
        <img ref={ringsRef} src={rings} alt="" className={styles.rings} />
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
