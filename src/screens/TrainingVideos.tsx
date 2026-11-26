import { Link } from 'react-router'
import doneIcon from '../assets/icon-done.svg'
import { TopBar } from '../components/TopBar'
import { month1, videoDetails, type Video } from '../data/training'
import { completedLessons } from '../data/progress'
import styles from './TrainingVideos.module.css'

/* Figma: «Training videos» (434:4577). Le lezioni già guardate prendono la copertina
   «fatta» del frame 434:4679: velo bianco e spunta. */
type State = 'open' | 'done'

export function TrainingVideos() {
  const done = completedLessons()
  const state = (video: Video): State => (done.includes(video.number) ? 'done' : 'open')

  return (
    <main className={styles.page}>
      {/* Prima schermata dopo l'onboarding: logo a sinistra e menu (che per ora non si apre).
          L'etichetta «YOUR TRAINING / MONTH 01» è passata dall'intestazione alla barra. */}
      <TopBar left={{ logo: true }} label={`YOUR TRAINING / MONTH ${month1.number}`} right={{ menu: true }} />
      <header className={styles.header}>
        <h1 className="t-heading-h3">{month1.title}</h1>
        <p className={`${styles.description} t-body-large`}>
          <span>{month1.description[0]}</span>
          <span>{month1.description[1]}</span>
        </p>
        <p className={`${styles.summary} t-caption`}>{month1.summary}</p>
        <hr className={styles.separator} />
      </header>
      <div className={styles.collection}>
        {month1.weeks.map((week) => (
          <section key={week.number} className={styles.week}>
            <h2 className={`${styles.weekTitle} t-label-small`}>
              WEEK {week.number} / {week.title}
            </h2>
            {week.videos.map((video, i) => (
              <VideoRow key={video.number} video={video} state={state(video)} last={i === week.videos.length - 1} />
            ))}
          </section>
        ))}
      </div>
    </main>
  )
}

/* L'ultima riga della settimana non ha il divisore sotto, come in Figma. */
function VideoRow({ video, state, last }: { video: Video; state: State; last: boolean }) {
  const coverClass = `${styles.cover} ${styles[video.kind]}`
  const content = (
    <>
      <span className={coverClass}>
        <span className={`${styles.coverNumber} t-heading-h2`}>{video.number}</span>
        {state === 'done' && (
          <span className={styles.doneVeil}>
            <img src={doneIcon} width={16.08} height={14.59} alt="Completed" className={styles.doneIcon} />
          </span>
        )}
      </span>
      <span className={styles.text}>
        <span className={`${styles.meta} t-caption`}>{`LESSON ${video.number}  ·  ${video.minutes} MIN`}</span>
        <span className={`${styles.videoTitle} t-body-large`}>{video.title}</span>
        <span className={`${styles.cta} t-caption`}>
          {video.kind === 'exercise' ? 'Guided exercise  ↗' : 'Explore the lesson  ↗'}
        </span>
      </span>
      {!last && <span className={styles.divider} aria-hidden="true" />}
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
