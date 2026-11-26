import { Link } from 'react-router'
import backIcon from '../assets/icon-back.svg'
import closeIcon from '../assets/icon-close.svg'
import menuIcon from '../assets/icon-menu.svg'
import logoMark from '../assets/logo-mark.svg'
import styles from './TopBar.module.css'

/* Barra in alto delle schermate dopo «Start your journey» (Figma «Intestazione dettaglio»,
   444:5703 e 444:5300): a sinistra il logo dove non c'è una schermata precedente, altrimenti
   la freccia indietro; al centro l'etichetta; a destra il menu o la chiusura.
   Il menu per ora non si apre: il suo contenuto è ancora da progettare. */
type Left = { logo: true } | { back: string } | null
type Right = { menu: true } | { close: string; label: string } | null

type Props = {
  left: Left
  label: string
  right: Right
}

export function TopBar({ left, label, right }: Props) {
  return (
    <nav className={styles.bar}>
      <span className={styles.slot}>
        {left && 'logo' in left && <img src={logoMark} width={24} height={22} alt="Abstand" />}
        {left && 'back' in left && (
          <Link to={left.back} className={styles.icon} aria-label="Back">
            <img src={backIcon} width={24} height={24} alt="" />
          </Link>
        )}
      </span>
      <p className={`${styles.label} t-label-small`}>{label}</p>
      <span className={styles.slot}>
        {right && 'menu' in right && (
          <button type="button" className={`${styles.icon} ${styles.inert}`} aria-label="Menu" aria-disabled="true">
            <img src={menuIcon} width={24} height={24} alt="" />
          </button>
        )}
        {right && 'close' in right && (
          <Link to={right.close} className={styles.icon} aria-label={right.label}>
            <img src={closeIcon} width={24} height={24} alt="" />
          </Link>
        )}
      </span>
    </nav>
  )
}
