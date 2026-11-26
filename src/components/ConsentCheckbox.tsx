import type { ReactNode } from 'react'
import checkedIcon from '../assets/checkbox-checked.svg'
import styles from './ConsentCheckbox.module.css'

/* Componente Figma «Accettazione termini e condizioni»,
   varianti Accettato=No (casella vuota, bordo 1 px) e Accettato=Sì (casella nera con spunta).
   Testo «New/Short», come in 281:4446. */
type Props = {
  checked: boolean
  onChange: (checked: boolean) => void
  children: ReactNode
}

export function ConsentCheckbox({ checked, onChange, children }: Props) {
  return (
    <label className={styles.row}>
      <input
        type="checkbox"
        className={styles.input}
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      {checked ? (
        <img src={checkedIcon} width={20} height={20} alt="" className={styles.box} />
      ) : (
        <span className={`${styles.box} ${styles.empty}`} aria-hidden="true" />
      )}
      <span className={`${styles.text} t-new-short`}>{children}</span>
    </label>
  )
}
