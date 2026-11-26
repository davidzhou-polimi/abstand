import { Navigate, useParams } from 'react-router'
import { OutlineButton } from '../components/OutlineButton'
import { TopBar } from '../components/TopBar'
import { findVideo, month1, videoDetails } from '../data/training'
import styles from './VideoDetails.module.css'

/* Figma: «Video 01 · Observe, don’t absorb · Details» (434:5065). */
export function VideoDetails() {
  const { number = '' } = useParams()
  const found = findVideo(number)
  const details = videoDetails[number]
  if (!found || !details) return <Navigate to="/training" replace />
  const { video } = found

  return (
    <main className={styles.page}>
      <TopBar left={{ back: '/training' }} label={`MONTH ${month1.number} / LESSON ${video.number}`} right={null} />

      <div className={styles.band}>
        <p className="t-heading-h1">{video.number}</p>
        <div className={styles.bandText}>
          <p className={`${styles.week} t-caption`}>
            WEEK {details.week} · {video.minutes} MIN
          </p>
          <h1 className="t-heading-h4">{video.title}</h1>
        </div>
      </div>

      <div className={styles.scroll}>
        <section className={styles.section}>
          <h2 className="t-label-small">IN THIS LESSON</h2>
          <p className={`${styles.secondary} t-body-default`}>{details.inThisVideo}</p>
        </section>
        <section className={styles.section}>
          <h2 className="t-label-small">WHAT YOU’LL PRACTICE</h2>
          <p className={`${styles.secondary} t-body-default`}>{details.whatYoullPractice}</p>
        </section>
        <section className={styles.section}>
          <h2 className="t-label-small">AFTER THE LESSON</h2>
          <p className={`${styles.secondary} t-body-default`}>{details.afterTheVideo}</p>
        </section>
      </div>

      <div className={styles.action}>
        <OutlineButton tone="dark" size="short" to={`/training/video/${video.number}/player`}>
          Start lesson
        </OutlineButton>
      </div>
    </main>
  )
}
