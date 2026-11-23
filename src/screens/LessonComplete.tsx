import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router'
import { Button } from '../components/Button'
import { OutlineButton } from '../components/OutlineButton'
import closeIcon from '../assets/icon-close.svg'
import completeIcon from '../assets/icon-lesson-complete.svg'
import { allVideos, findVideo, month1 } from '../data/training'
import styles from './LessonComplete.module.css'

/* Figma: «Video 01 · Lesson complete» (174:648). */
const feedbackOptions = ['A little', 'Somewhat', 'Very'] as const

export function LessonComplete() {
  const { number = '' } = useParams()
  const found = findVideo(number)
  /* Variabili Figma «Feedback lezione 01 / utilita/…»: una scelta sola, facoltativa. */
  const [helpful, setHelpful] = useState<(typeof feedbackOptions)[number] | null>(null)
  if (!found) return <Navigate to="/training" replace />
  const { video } = found
  const index = allVideos.findIndex((v) => v.number === video.number)
  const next = allVideos[index + 1]
  const completed = index + 1

  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <p className={`${styles.path} t-label-small`}>
          MONTH {month1.number} / {month1.title.toUpperCase()}
        </p>
        <Link to="/training" className={styles.close} aria-label="Close and back to your journey">
          <img src={closeIcon} width={24} height={24} alt="" />
        </Link>
      </nav>

      <section className={styles.confirmation}>
        <div className={styles.badge}>
          <img src={completeIcon} width={48} height={48} alt="" />
          <p className="t-label-small">VIDEO {video.number} / COMPLETED</p>
        </div>
        <h1 className={`${styles.title} t-heading-h3`}>
          Lesson
          <br />
          complete.
        </h1>
        <p className={`${styles.lessonName} t-body-default`}>{video.title}</p>
        <p className={`${styles.count} t-caption`}>
          {completed} OF {allVideos.length} LESSONS COMPLETED
        </p>
        <div className={styles.progress}>
          <span style={{ width: `${(completed / allVideos.length) * 100}%` }} />
        </div>
      </section>

      <section className={styles.feedback}>
        <h2 className="t-body-large">How helpful was this?</h2>
        <p className={`${styles.optional} t-body-small`}>Optional. You can continue without answering.</p>
        <div className={styles.options} role="group" aria-label="How helpful was this?">
          {feedbackOptions.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={helpful === option}
              onClick={() => setHelpful(helpful === option ? null : option)}
              className={`${styles.option} t-body-small`}
            >
              {option}
            </button>
          ))}
        </div>
      </section>

      {next && (
        <section className={styles.next}>
          <h2 className="t-label-small">NEXT LESSON</h2>
          <div className={styles.nextCard}>
            <span className={styles.nextCover}>
              <span className="t-heading-h3">{next.number}</span>
            </span>
            <span className={`${styles.nextTitle} t-heading-h4`}>
              {next.nextLessonLines
                ? next.nextLessonLines.map((line, i) => (
                    <span key={line}>
                      {i > 0 && <br />}
                      {line}
                    </span>
                  ))
                : next.title}
            </span>
            <span className={`${styles.nextMeta} t-caption`}>
              VIDEO {next.number} · {next.minutes} MIN
            </span>
          </div>
        </section>
      )}

      <div className={styles.actions}>
        <Button>Next lesson</Button>
        <OutlineButton to="/training">Back to your journey</OutlineButton>
      </div>
    </main>
  )
}
