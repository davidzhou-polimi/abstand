import { Button } from '../components/Button'
import lockIcon from '../assets/icon-lock.svg'
import { programGoal, programMonths } from '../data/program'
import frame from './Screen.module.css'
import styles from './PersonalizedProgram.module.css'

/* Figma: «Personalized program» (173:333) */
export function PersonalizedProgram() {
  return (
    <main className={frame.screen}>
      <div className={styles.content}>
        <h1 className={`${styles.title} t-heading-h4`}>Here is your personalized program</h1>
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
                  <h2 className={styles.monthTitle}>{month.title}</h2>
                  <p className="t-body-small">{month.promise}</p>
                  <p className={`${styles.stats} t-mono-small`}>{month.stats}</p>
                </div>
                <span className={styles.line} aria-hidden="true" />
              </li>
            ))}
            <li className={styles.goal}>
              <span className={`${styles.marker} ${styles.arrival}`} aria-hidden="true" />
              <div className={styles.text}>
                <p className="t-label-small">{programGoal.label}</p>
                <p className="t-body-default">{programGoal.text}</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
      <p className={`${styles.closing} t-body-small`}>
        Tailored to your profile
        <br />
        and the people who matter to you.
      </p>
      <Button to="/program/active">Accept your program</Button>
    </main>
  )
}
