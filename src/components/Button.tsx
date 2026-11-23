import type { ReactNode } from 'react'
import { Link } from 'react-router'
import styles from './Button.module.css'

/* Componente Figma «Button» (Azione primaria).
   tone="inverse" è l'istanza con riempimento brand/bianco e testo nero
   della schermata «Onboarding complete». */
type Props = {
  children: ReactNode
  to?: string
  onClick?: () => void
  tone?: 'primary' | 'inverse'
  type?: 'button' | 'submit'
}

export function Button({ children, to, onClick, tone = 'primary', type = 'button' }: Props) {
  const className = `${styles.button} ${styles[tone]} t-body-default`
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
