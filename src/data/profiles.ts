/* Profili emotivi. Il numero è quello di cabina/muting.py (PROFILE_NAME):
   1 non influenzato, 2 solo la pelle, 3 solo il volto, 4 pelle e volto.
   Nomi dalla nota Figma «Realizzare un video di intro per ognuno dei profili». */
import disguisedIllustration from '../assets/profile-disguised.svg'

export type ProfileId = 1 | 2 | 3 | 4

export type Profile = {
  name: string
  /* Descrizione e illustrazione ci sono solo dove Figma le definisce. */
  description?: string
  illustration?: string
}

export const PROFILES: Record<ProfileId, Profile> = {
  1: { name: 'Absolute' },
  2: {
    name: 'Disguised',
    description:
      'You seem unshakable on the outside, but inside your mind is racing. You’ve mastered your expressions, but your body doesn’t lie: heightened inner arousal reveals a constant effort to stay in control.',
    illustration: disguisedIllustration,
  },
  3: { name: 'Dramatic' },
  4: { name: 'Exposed' },
}
