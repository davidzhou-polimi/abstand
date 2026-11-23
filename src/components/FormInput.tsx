import styles from './FormInput.module.css'

/* Componente Figma «Form Input»: etichetta Label/Small, campo Body/Default. */
type Props = {
  label: string
  name: string
  value: string
  onChange: (value: string) => void
  type?: 'text' | 'email'
  autoComplete?: string
}

export function FormInput({ label, name, value, onChange, type = 'text', autoComplete }: Props) {
  const id = `field-${name}`
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={`${styles.label} t-label-small`}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        className={`${styles.input} t-body-default`}
      />
    </div>
  )
}
