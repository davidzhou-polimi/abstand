/* Profili emotivi. Il numero è quello di cabina/muting.py (PROFILE_NAME):
   1 non influenzato, 2 solo la pelle, 3 solo il volto, 4 pelle e volto.
   Testi e simboli dai frame «Test result — …» della pagina Figma «LINEE GUIDA». */
import absoluteSymbol from '../assets/profile-absolute.svg'
import disguisedSymbol from '../assets/profile-disguised.svg'
import dramaticSymbol from '../assets/profile-dramatic.svg'
import exposedSymbol from '../assets/profile-exposed.svg'

export type ProfileId = 1 | 2 | 3 | 4

export type Profile = {
  name: string
  description: string
  /* Le due righe sopra il pulsante. */
  closing: [string, string]
  /* Il simbolo è largo 138 × 132; l'SVG esportato comprende il tratto che sporge,
     quindi si sposta dello scarto fra i due riquadri. */
  symbol: { src: string; width: number; height: number; left: number; top: number }
  /* Fondo: sfumatura radiale dall'alto, colori del frame. */
  background: string
}

export const PROFILES: Record<ProfileId, Profile> = {
  /* Figma 416:2986 */
  1: {
    name: 'Absolute',
    description:
      'Your body is calm and your expression is quiet. Inner activation and outward emotion are both low: you’ve reached Absolute. Now the focus is on maintaining this low-interference state.',
    closing: ['Keep the interference low.', 'Maintain the calm you’ve reached.'],
    symbol: { src: absoluteSymbol, width: 141, height: 135, left: -1.22, top: -1.32 },
    background: 'var(--brand-blu), var(--color-background-canvas)',
  },
  /* Figma 416:3282 */
  2: {
    name: 'Disguised',
    description:
      'You seem unshakable on the outside, but inside your mind is racing. You’ve mastered your expressions, but your body doesn’t lie: heightened inner arousal reveals a constant effort to stay in control.',
    closing: ['It’s time to align what you show', 'with what you truly feel.'],
    symbol: { src: disguisedSymbol, width: 142, height: 132, left: -1.56, top: 0 },
    background: 'var(--brand-blu), var(--brand-rosso-400) 50%, var(--color-background-canvas)',
  },
  /* Figma 416:3182 */
  3: {
    name: 'Dramatic',
    description:
      'Your face tells an intense story, while your body stays quiet. Strong outward expression meets low inner activation: the emotion you show is greater than the disturbance you feel inside.',
    closing: ['Look beyond the expression.', 'Reconnect with what you feel inside.'],
    symbol: { src: dramaticSymbol, width: 141, height: 135, left: -1.22, top: -1.32 },
    background: 'var(--brand-rosso), var(--brand-blu-400) 50%, var(--color-background-canvas)',
  },
  /* Figma 416:3083 */
  4: {
    name: 'Exposed',
    description:
      'Your body and your face tell the same story. High inner activation meets strong outward expression: what you feel is visible. You are exposed inside and out, at your most vulnerable.',
    closing: ['Make space for what you feel.', 'Start by reducing the interference.'],
    symbol: { src: exposedSymbol, width: 141, height: 135, left: -1.22, top: -1.32 },
    background: 'var(--brand-rosso), var(--color-background-canvas)',
  },
}
