import styles from './ImportantPersonCard.module.css'

/* Componente Figma «Important Person Card». */
type Props = {
  name: string
  relation: string
  frequency: string
}

export function ImportantPersonCard({ name, relation, frequency }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.who}>
        <p className="t-body-default">{name}</p>
        <p className="t-body-small">{relation}</p>
      </div>
      <p className={`${styles.frequency} t-body-small`}>{frequency}</p>
    </div>
  )
}
