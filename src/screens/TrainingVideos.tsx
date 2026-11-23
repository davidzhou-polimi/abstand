import { Link } from 'react-router'
import { month1, videoDetails, type Video } from '../data/training'
import styles from './TrainingVideos.module.css'

/* Figma: «Training videos» (174:457). Intestazione ferma, elenco che scorre. */
export function TrainingVideos() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className="t-label-small">YOUR TRAINING / MONTH {month1.number}</p>
        <h1 className={`${styles.title} t-heading-h3`}>{month1.title}</h1>
        <p className={`${styles.description} t-body-large`}>
          {month1.description[0]}
          <br />
          {month1.description[1]}
        </p>
        <p className={`${styles.summary} t-caption`}>{month1.summary}</p>
        <hr className={styles.separator} />
      </header>
      <div className={styles.list}>
        <div className={styles.collection}>
          {month1.weeks.map((week) => (
            <section key={week.number} className={styles.week}>
              <h2 className={`${styles.weekTitle} t-label-small`}>
                WEEK {week.number} / {week.title}
              </h2>
              {week.videos.map((video) => (
                <VideoRow key={video.number} video={video} />
              ))}
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}

function VideoRow({ video }: { video: Video }) {
  const content = (
    <>
      <span className={`${styles.cover} ${video.kind === 'exercise' ? styles.exercise : ''}`}>
        <span className={`${styles.coverNumber} t-heading-h2`}>{video.number}</span>
        <span className={styles.open} aria-hidden="true">
          <span className="t-heading-h4">›</span>
        </span>
      </span>
      <span className={styles.text}>
        <span className={`${styles.meta} t-caption`}>{`VIDEO ${video.number}  ·  ${video.minutes} MIN`}</span>
        <span className={`${styles.videoTitle} t-body-large`}>{video.title}</span>
        <span className={`${styles.cta} t-caption`}>
          {video.kind === 'exercise' ? 'Guided exercise  ↗' : 'Explore the lesson  ↗'}
        </span>
      </span>
      <span className={styles.divider} aria-hidden="true" />
    </>
  )
  /* Solo il video 01 ha la scheda di dettaglio. */
  if (videoDetails[video.number]) {
    return (
      <Link to={`/training/video/${video.number}`} className={styles.row}>
        {content}
      </Link>
    )
  }
  return <div className={styles.row}>{content}</div>
}
