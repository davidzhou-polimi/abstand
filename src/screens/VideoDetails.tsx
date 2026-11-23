import { Link, Navigate, useParams } from 'react-router'
import { OutlineButton } from '../components/OutlineButton'
import { findVideo, month1, videoDetails } from '../data/training'
import styles from './VideoDetails.module.css'

/* Figma: «Video 01 · Observe, don’t absorb · Details» (174:583).
   Il frame inglese è la copia ingrandita (429 px) di quello italiano da 402:
   qui le misure sono quelle a 402. */
export function VideoDetails() {
  const { number = '' } = useParams()
  const found = findVideo(number)
  const details = videoDetails[number]
  if (!found || !details) return <Navigate to="/training" replace />
  const { video } = found

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={`${styles.path} t-label-small`}>
          MONTH {month1.number} / VIDEO {video.number}
        </p>
        <Link to="/training" className={styles.close} aria-label="Close">
          <span className="t-heading-h4" aria-hidden="true">
            ×
          </span>
        </Link>
      </header>
      <div className={styles.scroll}>
        <div className={styles.content}>
          <div className={styles.cover}>
            <p className={`${styles.coverNumber} t-heading-h1`}>{video.number}</p>
            <p className={`${styles.coverLabel} t-label-small`}>LESSON</p>
          </div>
          <h1 className="t-heading-h4">{video.title}</h1>
          <p className={`${styles.secondary} t-caption`}>
            WEEK {details.week} · {video.minutes} MIN
          </p>
          <h2 className="t-label-small">IN THIS VIDEO</h2>
          <p className={`${styles.secondary} t-body-default`}>{details.inThisVideo}</p>
          <h2 className="t-label-small">WHAT YOU’LL PRACTICE</h2>
          <p className={`${styles.secondary} t-body-default`}>{details.whatYoullPractice}</p>
          <h2 className="t-label-small">AFTER THE VIDEO</h2>
          <p className={`${styles.secondary} t-body-default`}>{details.afterTheVideo}</p>
          <p className={`${styles.secondary} t-body-small`}>Demo preview: video playback is unavailable.</p>
        </div>
      </div>
      <div className={styles.action}>
        <OutlineButton tone="dark" to={`/training/video/${video.number}/player`}>
          Start lesson
        </OutlineButton>
      </div>
    </main>
  )
}
