import type { ReactNode } from 'react'
import { Link } from 'react-router'
import styles from './Button.module.css'

/* Componente Figma «Button» (Azione primaria).
   tone="inverse" è l'istanza con riempimento color/background/surface e testo primario
   della schermata «Onboarding complete».
   size="short": testo «New/Short» (14/20) invece di «New/Buttons» (16/22), come nelle
   istanze di «Lesson complete». */
type Props = {
  children: ReactNode
  to?: string
  onClick?: () => void
  tone?: 'primary' | 'inverse'
  size?: 'default' | 'short'
  type?: 'button' | 'submit'
}

export function Button({ children, to, onClick, tone = 'primary', size = 'default', type = 'button' }: Props) {
  const className = `${styles.button} ${styles[tone]} ${size === 'short' ? 't-new-short' : 't-new-buttons'}`
  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    )
  }
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  )
}
