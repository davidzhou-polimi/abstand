import styles from './Grain.module.css'

/* Effetto Figma «Grana»: rumore monocromatico #f9f4ea al 10%, grana 0,5, densità 1.
   Il CSS non ha un rumore nativo: qui è un feTurbulence SVG steso sopra al fondo. */
export function Grain() {
  return <span className={styles.grain} aria-hidden="true" />
}
