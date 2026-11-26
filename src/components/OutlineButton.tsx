import type { ReactNode } from 'react'
import { Link } from 'react-router'
import styles from './OutlineButton.module.css'

/* Componente Figma «Outline Button» (Azione secondaria).
   Le istanze nelle schermate cambiano il riempimento:
   - muted: brand/neutro/200 con filo da 0,5 («+ Add person»)
   - plain: color/background/surface con bordo 1 px color/border/strong («Back to your journey»)
   - dark: color/action/primary senza bordo, alto 51 («Start lesson»)
   size="short": testo «New/Short» (14/20) invece di «New/Buttons» (16/22). */
type Props = {
  children: ReactNode
  to?: string
  onClick?: () => void
  tone?: 'muted' | 'plain' | 'dark'
  size?: 'default' | 'short'
}

export function OutlineButton({ children, to, onClick, tone = 'plain', size = 'default' }: Props) {
  const className = `${styles.button} ${styles[tone]} ${size === 'short' ? 't-new-short' : 't-new-buttons'}`
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
