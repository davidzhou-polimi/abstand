import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router'
import { Button } from '../components/Button'
import { OutlineButton } from '../components/OutlineButton'
import { TopBar } from '../components/TopBar'
import completeIcon from '../assets/icon-lesson-complete.svg'
import { allVideos, findVideo, month1 } from '../data/training'
import { markCompleted } from '../data/progress'
import styles from './LessonComplete.module.css'

/* Figma: «Video 01 · Lesson complete» (434:4848). */
const feedbackOptions = ['A little helpful', 'Somewhat helpful', 'Very helpful'] as const

export function LessonComplete() {
  const { number = '' } = useParams()
  const found = findVideo(number)
  /* Variabili Figma «Feedback lezione 01 / utilita/…»: una scelta sola, facoltativa. */
  const [helpful, setHelpful] = useState<(typeof feedbackOptions)[number] | null>(null)
  useEffect(() => {
    if (found) markCompleted(found.video.number)
  }, [found])
  if (!found) return <Navigate to="/training" replace />
  const { video } = found
  const index = allVideos.findIndex((v) => v.number === video.number)
  const next = allVideos[index + 1]
  const completed = index + 1

  return (
    <main className={styles.page}>
      {/* A lezione finita non si torna al player: la X riporta al percorso, a sinistra niente. */}
      <TopBar
        left={null}
        label={`MONTH ${month1.number} / ${month1.title.toUpperCase()}`}
        right={{ close: '/training', label: 'Close and back to your journey' }}
      />

      <section className={styles.confirmation}>
        <p className="t-body-default">{video.title}</p>
        <div className={styles.badge}>
          <img src={completeIcon} width={48} height={48} alt="" />
          <h1 className="t-heading-h3">Lesson complete</h1>
        </div>
        <p className="t-caption">
          {completed} OF {allVideos.length} LESSONS COMPLETED
        </p>
        <div className={styles.progress}>
          <span style={{ width: `${(completed / allVideos.length) * 100}%` }} />
        </div>
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
          <h2 className="t-label-small">NEXT LESSON</h2>
          <div className={styles.nextCard}>
            <span className={styles.nextCover}>
              <span className="t-heading-h2">{next.number}</span>
            </span>
            <span className={styles.nextText}>
              <span className={`${styles.nextMeta} t-caption`}>{`LESSON ${next.number}  ·  ${next.minutes} MIN`}</span>
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
        <Button size="short">Next lesson</Button>
        <OutlineButton to="/training" size="short">
          Back to your journey
        </OutlineButton>
      </div>
    </main>
  )
}
