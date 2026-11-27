import { Navigate, useParams } from 'react-router'
import { OutlineButton } from '../components/OutlineButton'
import { TopBar } from '../components/TopBar'
import { CURRENT_MONTH, lessonInMonth, lessonMeta } from '../data/training'
import styles from './VideoDetails.module.css'

/* Figma: «Video 01 · Observe, don’t absorb · Details» (434:5065). */
export function VideoDetails() {
  const { number = '' } = useParams()
  const found = lessonInMonth(number)
  if (!found) return <Navigate to="/training" replace />
  const { module, lesson, week } = found
  /* Le parole seguono il tipo: un esercizio guidato dice «exercise» in tutte le schermate. */
  const word = lesson.kind === 'exercise' ? 'EXERCISE' : 'LESSON'

  return (
    <main className={styles.page}>
      <TopBar left={{ back: '/training' }} label={`MONTH ${CURRENT_MONTH} / WEEK ${week}`} right={null} />

      <div className={styles.band}>
        {!module.maintenance && <p className="t-heading-h1">{lesson.number}</p>}
        <div className={styles.bandText}>
          <p className={`${styles.week} t-caption`}>
            {lessonMeta(module, lesson)}
          </p>
          <h1 className="t-heading-h4">{lesson.title}</h1>
        </div>
      </div>

      <div className={styles.scroll}>
        <section className={styles.section}>
          <h2 className="t-label-small">IN THIS {word}</h2>
          <p className={`${styles.secondary} t-body-default`}>{lesson.inThisLesson}</p>
        </section>
        <section className={styles.section}>
          <h2 className="t-label-small">WHAT YOU’LL PRACTICE</h2>
          <p className={`${styles.secondary} t-body-default`}>{lesson.whatYoullPractice}</p>
        </section>
        <section className={styles.section}>
          <h2 className="t-label-small">AFTER THE {word}</h2>
          <p className={`${styles.secondary} t-body-default`}>{lesson.afterTheLesson}</p>
        </section>
      </div>

      <div className={styles.action}>
        <OutlineButton tone="dark" size="short" to={`/training/video/${lesson.number}/player`}>
          {lesson.kind === 'exercise' ? 'Start exercise' : 'Start lesson'}
        </OutlineButton>
      </div>
    </main>
  )
}
