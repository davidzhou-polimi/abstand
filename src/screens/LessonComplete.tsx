import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router'
import { Button } from '../components/Button'
import { OutlineButton } from '../components/OutlineButton'
import { TopBar } from '../components/TopBar'
import completeIcon from '../assets/icon-lesson-complete.svg'
import absoluteSymbol from '../assets/profile-absolute.svg'
import { CURRENT_MONTH, lessonInMonth, lessonMeta, lessonsOf, weekExercises, type Lesson } from '../data/training'
import { completedLessons, markCompleted } from '../data/progress'
import styles from './LessonComplete.module.css'

/* Figma: «Video 01 · Lesson complete» (434:4848). */
const feedbackOptions = ['A little helpful', 'Somewhat helpful', 'Very helpful'] as const

export function LessonComplete() {
  const { number = '' } = useParams()
  const found = lessonInMonth(number)
  /* Variabili Figma «Feedback lezione 01 / utilita/…»: una scelta sola, facoltativa. */
  const [helpful, setHelpful] = useState<(typeof feedbackOptions)[number] | null>(null)
  useEffect(() => {
    if (found) markCompleted(found.lesson.number)
  }, [found])
  if (!found) return <Navigate to="/training" replace />
  const { module, lesson, week, role } = found
  /* Nei moduli si conta il mese e si va alla lezione dopo. In Mind si contano i due
     esercizi della settimana e si va all'altro se manca; dopo un extra non si conta niente. */
  let progress: { done: number; total: number; label: string } | null
  let next: Lesson | undefined
  if (!module.maintenance) {
    const lessons = lessonsOf(module)
    const index = lessons.findIndex((l) => l.number === lesson.number)
    progress = { done: index + 1, total: lessons.length, label: 'LESSONS COMPLETED' }
    next = lessons[index + 1]
  } else if (role === 'exercise') {
    const exercises = weekExercises(module)
    const done = completedLessons()
    const isDone = (l: Lesson) => l.number === lesson.number || done.includes(l.number)
    progress = { done: exercises.filter(isDone).length, total: exercises.length, label: 'EXERCISES THIS WEEK' }
    next = exercises.find((l) => !isDone(l))
  } else {
    progress = null
    next = undefined
  }
  const nextIsExercise = next?.kind === 'exercise'

  return (
    <main className={styles.page}>
      {/* A lezione finita non si torna al player: la X riporta al percorso, a sinistra niente. */}
      <TopBar
        left={null}
        label={`MONTH ${CURRENT_MONTH} / WEEK ${week}`}
        right={{ close: '/training', label: 'Close and back to your journey' }}
      />

      <section className={styles.confirmation}>
        <p className="t-body-default">{lesson.title}</p>
        <div className={styles.badge}>
          <img src={completeIcon} width={48} height={48} alt="" />
          <h1 className="t-heading-h3">{lesson.kind === 'exercise' ? 'Exercise complete' : 'Lesson complete'}</h1>
        </div>
        {progress && (
          <>
            <p className="t-caption">
              {progress.done} OF {progress.total} {progress.label}
            </p>
            <div className={styles.progress}>
              <span style={{ width: `${(progress.done / progress.total) * 100}%` }} />
            </div>
          </>
        )}
      </section>

      <div className={styles.feedbackWrap}>
        <section className={styles.feedback}>
          <h2 className="t-label-large">
            How helpful was this?<span className={styles.optional}> (Optional)</span>
          </h2>
          <div className={styles.options} role="group" aria-label="How helpful was this?">
            {feedbackOptions.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={helpful === option}
                onClick={() => setHelpful(helpful === option ? null : option)}
                className={`${styles.option} t-new-short`}
              >
                {option}
              </button>
            ))}
          </div>
        </section>
      </div>

      {next && (
        <section className={styles.next}>
          <h2 className="t-label-small">{nextIsExercise ? 'NEXT EXERCISE' : 'NEXT LESSON'}</h2>
          <div className={styles.nextCard}>
            <span className={`${styles.nextCover} ${nextIsExercise ? styles.nextCoverExercise : ''}`}>
              {module.maintenance ? (
                <img src={absoluteSymbol} width={62} height={59} alt="" className={styles.nextSymbol} />
              ) : (
                <span className="t-heading-h2">{next.number}</span>
              )}
            </span>
            <span className={styles.nextText}>
              <span className={`${styles.nextMeta} t-caption`}>{lessonMeta(module, next).replace(' · ', '  ·  ')}</span>
              <span className="t-body-large">
                {next.nextLessonLines
                  ? next.nextLessonLines.map((line) => (
                      <span key={line} className={styles.nextLine}>
                        {line}
                      </span>
                    ))
                  : next.title}
              </span>
            </span>
          </div>
        </section>
      )}

      <div className={styles.actions}>
        {next && (
          <Button size="short" to={`/training/video/${next.number}`}>
            {nextIsExercise ? 'Next exercise' : 'Next lesson'}
          </Button>
        )}
        <OutlineButton to="/training" size="short">
          Back to your journey
        </OutlineButton>
      </div>
    </main>
  )
}
