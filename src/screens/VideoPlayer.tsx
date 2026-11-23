import { Link, Navigate, useParams } from 'react-router'
import backIcon from '../assets/icon-back.svg'
import moreIcon from '../assets/icon-more.svg'
import settingsIcon from '../assets/icon-settings.svg'
import playIcon from '../assets/icon-play.svg'
import rewindIcon from '../assets/icon-rewind-10.svg'
import forwardIcon from '../assets/icon-forward-10.svg'
import volumeIcon from '../assets/icon-volume.svg'
import fullscreenIcon from '../assets/icon-fullscreen.svg'
import { findVideo, month1, videoDetails } from '../data/training'
import styles from './VideoPlayer.module.css'

/* Figma: «Video 01 · Player and subtitles» (174:603). Il player è dimostrativo:
   tempi e avanzamento sono quelli del mock (02:34 su 15:00). */
const elapsed = '02:34'
const total = '15:00'
const progress = (2 * 60 + 34) / (15 * 60)
/* «Video caricato»: 148 px su 354. */
const buffered = 148 / 354

const subtitles = [
  { lines: ['Not everything you feel', 'belongs to you.'], active: false },
  { lines: ['You can stay close', 'without carrying', 'every burden.'], active: true },
  { lines: ['Observe. Breathe.', 'Then return to yourself.'], active: false },
]

export function VideoPlayer() {
  const { number = '' } = useParams()
  const found = findVideo(number)
  if (!found || !videoDetails[number]) return <Navigate to="/training" replace />
  const { video, week } = found

  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <Link to={`/training/video/${video.number}`} className={styles.back} aria-label="Back">
          <img src={backIcon} width={24} height={24} alt="" />
        </Link>
        <p className={`${styles.path} t-label-small`}>
          MONTH {month1.number} / VIDEO {video.number}
        </p>
        <button type="button" className={styles.more} aria-label="More options">
          <img src={moreIcon} width={24} height={24} alt="" />
        </button>
      </nav>

      <section className={styles.player} aria-label="Video player">
        <p className={`${styles.demo} t-label-small`}>DEMO VIDEO</p>
        <button type="button" className={styles.cc} aria-pressed="true" aria-label="Subtitles">
          <span className="t-label-small">CC</span>
        </button>
        <button type="button" className={styles.settings} aria-label="Settings">
          <img src={settingsIcon} width={24} height={24} alt="" />
        </button>

        <button type="button" className={styles.rewind} aria-label="Back 10 seconds">
          <img src={rewindIcon} width={24} height={24} alt="" />
          <span className="t-label-small">10</span>
        </button>
        <button type="button" className={styles.play} aria-label="Play">
          <img src={playIcon} width={24} height={24} alt="" />
        </button>
        <button type="button" className={styles.forward} aria-label="Forward 10 seconds">
          <img src={forwardIcon} width={24} height={24} alt="" />
          <span className="t-label-small">10</span>
        </button>

        <div className={styles.track}>
          <span className={styles.buffered} style={{ width: `${buffered * 100}%` }} />
          <span className={styles.elapsed} style={{ width: `${progress * 100}%` }} />
          <span className={styles.thumb} style={{ left: `calc(${progress * 100}% - 5px)` }} />
        </div>

        <button type="button" className={styles.volume} aria-label="Volume">
          <img src={volumeIcon} width={24} height={24} alt="" />
        </button>
        <p className={`${styles.time} t-caption`}>
          {elapsed} / {total}
        </p>
        <button type="button" className={`${styles.speed} t-label-small`} aria-label="Playback speed">
          1×
        </button>
        <button type="button" className={styles.fullscreen} aria-label="Full screen">
          <img src={fullscreenIcon} width={24} height={24} alt="" />
        </button>
      </section>

      <div className={styles.details}>
        <h1 className="t-heading-h4">{video.title}</h1>
        <p className={`${styles.meta} t-caption`}>
          {month1.title.toUpperCase()} · WEEK {week.number} · {video.minutes} MIN
        </p>
      </div>

      <section className={styles.subtitles} aria-label="Subtitles">
        <div className={styles.subtitlesHeader}>
          <p className="t-label-small">SUBTITLES</p>
          <p className="t-label-small">ENGLISH</p>
        </div>
        {subtitles.map((subtitle) => (
          <p
            key={subtitle.lines[0]}
            className={`${styles.line} ${subtitle.active ? styles.active : ''} t-heading-h3`}
          >
            {subtitle.lines.map((line, index) => (
              <span key={line}>
                {index > 0 && <br />}
                {line}
              </span>
            ))}
          </p>
        ))}
      </section>
    </main>
  )
}
