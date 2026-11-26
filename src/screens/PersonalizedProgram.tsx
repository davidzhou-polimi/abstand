import { useEffect } from 'react'
import { Button } from '../components/Button'
import { DemoPlayer } from '../components/DemoPlayer'
import lockIcon from '../assets/icon-lock.svg'
import rings from '../assets/onboarding-rings.webp'
import { programGoal, programMonths } from '../data/program'
import frame from './Screen.module.css'
import styles from './PersonalizedProgram.module.css'

/* Figma: «Personalized program» (433:4409), con il video introduttivo. */
export function PersonalizedProgram() {
  /* Gli anelli della schermata successiva pesano mezzo mega: si scaricano già qui,
     così l'animazione di «Onboarding complete» non li aspetta. */
  useEffect(() => {
    new Image().src = rings
  }, [])

  return (
    <main className={frame.screen}>
      <div className={styles.content}>
        <h1 className={`${styles.title} t-heading-h4`}>
          Here is your fully
          <br />
          personalized program
        </h1>
        {/* Video introduttivo dimostrativo: 00:34 su 02:30, come nel mock. */}
        <DemoPlayer label="INTRO VIDEO" elapsed={34} total={150} tone="intro" rounded />
        <div className={styles.schemaWrap}>
          <ol className={styles.schema}>
            {programMonths.map((month, index) => (
              <li key={month.label} className={`${styles.month} ${index === 0 ? styles.first : ''}`}>
                {month.locked ? (
                  <span className={`${styles.marker} ${styles.locked}`}>
                    <img src={lockIcon} width={24} height={24} alt="Locked" />
                  </span>
                ) : (
                  <span className={`${styles.marker} ${styles.active}`} aria-hidden="true" />
                )}
                <div className={styles.text}>
                  <p className="t-label-small">{month.label}</p>
                  <h2 className="t-heading-h5">{month.title}</h2>
                  <p className="t-body-small">{month.promise}</p>
                  <p className={`${styles.stats} t-caption`}>{month.stats}</p>
                </div>
                <span className={styles.line} aria-hidden="true" />
              </li>
            ))}
            <li className={styles.goal}>
              <span className={`${styles.marker} ${styles.arrival}`} aria-hidden="true" />
              <div className={styles.text}>
                <p className="t-label-small">{programGoal.label}</p>
                <p className="t-body-small">{programGoal.text}</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
      <p className={`${styles.closing} t-new-short`}>
        Tailored to your profile
        <br />
        and the people who matter to you.
      </p>
      <Button to="/program/active">Accept your program</Button>
    </main>
  )
}
