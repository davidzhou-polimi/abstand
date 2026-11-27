import { Navigate, useParams } from 'react-router'
import { DemoPlayer } from '../components/DemoPlayer'
import { TopBar } from '../components/TopBar'
import { CURRENT_MONTH, lessonInMonth, lessonMeta } from '../data/training'
import styles from './VideoPlayer.module.css'

/* Figma: «Video 01 · Player and subtitles» (434:5170). Il player è dimostrativo:
   tempi e avanzamento sono quelli del mock (02:34 su 15:00). */
const subtitles = [
  { lines: ['Not everything you feel', 'belongs to you.'], active: false },
  { lines: ['You can stay close', 'without carrying', 'every burden.'], active: true },
  { lines: ['Observe. Breathe.', 'Then return to yourself.'], active: false },
]

export function VideoPlayer() {
  const { number = '' } = useParams()
  const found = lessonInMonth(number)
  if (!found) return <Navigate to="/training" replace />
  const { module, lesson, week } = found

  return (
    <main className={styles.page}>
      <TopBar
        left={{ back: `/training/video/${lesson.number}` }}
        label={`MONTH ${CURRENT_MONTH} / WEEK ${week}`}
        right={null}
      />

      {/* Il video è dimostrativo: play porta a «Lesson complete», che segna la lezione come fatta. */}
      <DemoPlayer label="DEMO VIDEO" elapsed={154} total={900} playTo={`/training/video/${lesson.number}/complete`} />

      <div className={styles.details}>
        <h1 className="t-heading-h4">{lesson.title}</h1>
        <p className={`${styles.meta} t-caption`}>
          {lessonMeta(module, lesson)}
        </p>
      </div>

      <section className={styles.subtitles} aria-label="Subtitles">
        <div className={styles.subtitlesHeader}>
          <p className="t-label-small">SUBTITLES</p>
          <p className={`${styles.language} t-label-small`}>ENGLISH</p>
        </div>
        <div className={styles.lines}>
          {subtitles.map((subtitle) => (
            <p key={subtitle.lines[0]} className={`${styles.line} ${subtitle.active ? styles.active : ''} t-heading-h3`}>
              {subtitle.lines.map((line) => (
                <span key={line} className={styles.subtitleLine}>
                  {line}
                </span>
              ))}
            </p>
          ))}
        </div>
        <span aria-hidden="true" />
      </section>
    </main>
  )
}
