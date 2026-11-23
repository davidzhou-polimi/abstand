import type { ReactNode } from 'react'
import { Link } from 'react-router'
import styles from './OutlineButton.module.css'

/* Componente Figma «Outline Button» (Azione secondaria).
   Le istanze nelle schermate cambiano il riempimento:
   - muted: brand/bianco/200 con bordo («+ Add person»)
   - plain: brand/bianco/50 con bordo («Back to your journey»)
   - dark: brand/nero/900 senza bordo, testo brand/bianco («Start lesson») */
type Props = {
  children: ReactNode
  to?: string
  onClick?: () => void
  tone?: 'muted' | 'plain' | 'dark'
}

export function OutlineButton({ children, to, onClick, tone = 'plain' }: Props) {
  const className = `${styles.button} ${styles[tone]} t-body-default`
  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    )
  }
  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  )
}
