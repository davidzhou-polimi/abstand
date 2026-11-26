import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router'
import backIcon from '../assets/icon-back.svg'
import moreIcon from '../assets/icon-more.svg'
import { DemoPlayer } from '../components/DemoPlayer'
import { findVideo, month1, videoDetails } from '../data/training'
import { markCompleted } from '../data/progress'
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
  const found = findVideo(number)
  const playable = Boolean(found && videoDetails[number])
  /* Il video è dimostrativo: aprirlo vale come guardarlo, e la lista lo segna come fatto. */
  useEffect(() => {
    if (playable) markCompleted(number)
  }, [playable, number])
  if (!found || !playable) return <Navigate to="/training" replace />
  const { video, week } = found

  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <Link to={`/training/video/${video.number}`} className={styles.icon} aria-label="Back">
          <img src={backIcon} width={24} height={24} alt="" />
        </Link>
        <p className={`${styles.path} t-label-small`}>
          MONTH {month1.number} / LESSON {video.number}
        </p>
        <button type="button" className={styles.icon} aria-label="More options">
          <img src={moreIcon} width={24} height={24} alt="" />
        </button>
      </nav>

      <DemoPlayer label="DEMO VIDEO" elapsed={154} total={900} />

      <div className={styles.details}>
        <h1 className="t-heading-h4">{video.title}</h1>
        <p className={`${styles.meta} t-caption`}>
          {month1.title.toUpperCase()} · WEEK {week.number} · {video.minutes} MIN
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
