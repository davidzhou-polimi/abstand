import { useEffect } from 'react'
import { Button } from '../components/Button'
import { DemoPlayer } from '../components/DemoPlayer'
import lockIcon from '../assets/icon-lock.svg'
import rings from '../assets/onboarding-rings.webp'
import { moduleSummary, programGoal, userPath } from '../data/training'
import frame from './Screen.module.css'
import styles from './PersonalizedProgram.module.css'

/* Figma: «Personalized program» (433:4409), con il video introduttivo. I mesi sono quelli
   del percorso del profilo: solo il primo è aperto. */
export function PersonalizedProgram() {
  const path = userPath()
  /* I mesi che portano ad Absolute, poi il GOAL; Mind viene dopo e non finisce.
     Per Absolute non ci sono mesi prima: Absolute è il punto di partenza. */
  const months = path
    .filter((module) => !module.maintenance)
    .map((module, index) => ({
      label: `MONTH ${index + 1}`,
      title: module.title,
      promise: module.promise,
      stats: [moduleSummary(module)],
      locked: index > 0,
    }))
  const mind = path.find((module) => module.maintenance)
  const upkeep = mind && {
    label: `FROM MONTH ${months.length + 1}`,
    title: mind.title,
    promise: mind.promise,
    stats: [moduleSummary(mind), 'Back to the center every 3 months'],
    locked: months.length > 0,
  }
  const start = months.length === 0
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
        <DemoPlayer label="INTRO VIDEO" elapsed={34} total={150} rounded />
        <div className={styles.schemaWrap}>
          <ol className={styles.schema}>
            {months.map((month, index) => (
              <MonthRow key={month.label} month={month} first={index === 0} line />
            ))}
            <li className={`${styles.goal} ${upkeep ? styles.goalThen : ''}`}>
              <span className={`${styles.marker} ${styles.arrival}`} aria-hidden="true" />
              <div className={styles.text}>
                <p className="t-label-small">{start ? 'START' : programGoal.label}</p>
                <p className="t-body-small">{programGoal.text}</p>
              </div>
              {upkeep && <span className={`${styles.line} ${styles.goalLine}`} aria-hidden="true" />}
            </li>
            {upkeep && <MonthRow month={upkeep} first={start} line={false} />}
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

type Month = { label: string; title: string; promise: string; stats: string[]; locked: boolean }

function MonthRow({ month, first, line }: { month: Month; first: boolean; line: boolean }) {
  return (
    <li className={`${styles.month} ${first ? styles.first : ''} ${line ? '' : styles.lastMonth}`}>
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
        <p className={`${styles.stats} t-caption`}>
          {month.stats.map((line, i) => (
            <span key={line} className={styles.statsLine}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </p>
      </div>
      {line && <span className={styles.line} aria-hidden="true" />}
    </li>
  )
}
