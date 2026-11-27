import { Link } from 'react-router'
import settingsIcon from '../assets/icon-settings.svg'
import playIcon from '../assets/icon-play.svg'
import rewindIcon from '../assets/icon-rewind-10.svg'
import forwardIcon from '../assets/icon-forward-10.svg'
import volumeIcon from '../assets/icon-volume.svg'
import fullscreenIcon from '../assets/icon-fullscreen.svg'
import styles from './DemoPlayer.module.css'

/* Figma: «Player dimostrativo» (434:5179), 402 × 226, e la sua copia ridotta in
   «Personalized program» (433:4415), 354 × 199. Tutte le misure sono quelle a 402 px
   e scalano con la larghezza del player (unità --u = 1/402 della larghezza). */
type Props = {
  label: string
  /* secondi trascorsi e durata, per il tempo e la barra */
  elapsed: number
  total: number
  /* «Video caricato»: frazione della barra, 148 / 354 nel mock */
  buffered?: number
  rounded?: boolean
  /* Il video è finto: dove c'è, play porta direttamente a questa pagina. */
  playTo?: string
}

const mmss = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(Math.round(s % 60)).padStart(2, '0')}`

export function DemoPlayer({ label, elapsed, total, buffered = 148 / 354, rounded = false, playTo }: Props) {
  const progress = Math.min(1, Math.max(0, elapsed / total))
  return (
    <section
      className={`${styles.player} ${rounded ? styles.rounded : ''}`}
      aria-label="Video player"
      style={{ ['--progress' as string]: progress, ['--buffered' as string]: buffered }}
    >
      <p className={styles.label}>{label}</p>
      <button type="button" className={styles.cc} aria-pressed="true" aria-label="Subtitles">
        <span>CC</span>
      </button>
      <button type="button" className={styles.settings} aria-label="Settings">
        <img src={settingsIcon} alt="" />
      </button>
      <button type="button" className={styles.rewind} aria-label="Back 10 seconds">
        <img src={rewindIcon} alt="" />
        <span>10</span>
      </button>
      {playTo ? (
        <Link to={playTo} className={styles.play} aria-label="Play">
          <img src={playIcon} alt="" />
        </Link>
      ) : (
        <button type="button" className={styles.play} aria-label="Play">
          <img src={playIcon} alt="" />
        </button>
      )}
      <button type="button" className={styles.forward} aria-label="Forward 10 seconds">
        <img src={forwardIcon} alt="" />
        <span>10</span>
      </button>
      <div className={styles.track}>
        <span className={styles.buffered} />
        <span className={styles.elapsed} />
        <span className={styles.thumb} />
      </div>
      <button type="button" className={styles.volume} aria-label="Volume">
        <img src={volumeIcon} alt="" />
      </button>
      <p className={styles.time}>
        {mmss(elapsed)} / {mmss(total)}
      </p>
      <button type="button" className={styles.speed} aria-label="Playback speed">
        1×
      </button>
      <button type="button" className={styles.fullscreen} aria-label="Full screen">
        <img src={fullscreenIcon} alt="" />
      </button>
    </section>
  )
}
