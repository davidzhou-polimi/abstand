import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '../components/Button'
import { ConsentCheckbox } from '../components/ConsentCheckbox'
import { FormInput } from '../components/FormInput'
import frame from './Screen.module.css'
import styles from './ProfileCreation.module.css'

/* Figma: «Profile creation» (281:4446). I campi partono vuoti e i consensi non
   selezionati: i valori del mock (Mario Rossi) erano solo esempi. Il consenso «I accept
   that reduced empathy…» del frame non c'è, per scelta di David. */
export function ProfileCreation() {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [conditioning, setConditioning] = useState(false)
  const [liability, setLiability] = useState(false)
  const [terms, setTerms] = useState(false)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    navigate('/program')
  }

  return (
    <form className={frame.screen} onSubmit={handleSubmit}>
      <h1 className={`${styles.title} t-heading-h4`}>Complete your profile</h1>
      <div className={styles.fields}>
        <FormInput label="First name" name="first-name" autoComplete="given-name" value={firstName} onChange={setFirstName} />
        <FormInput label="Last name" name="last-name" autoComplete="family-name" value={lastName} onChange={setLastName} />
        <FormInput label="Email" name="email" type="email" autoComplete="email" value={email} onChange={setEmail} />
      </div>
      <div className={styles.end}>
        <div className={styles.consents}>
          <ConsentCheckbox checked={conditioning} onChange={setConditioning}>
            I consent to emotional conditioning tailored to my profile and responses.
          </ConsentCheckbox>
          <ConsentCheckbox checked={liability} onChange={setLiability}>
            I acknowledge that the service is not liable for collateral emotional damage.
          </ConsentCheckbox>
          <ConsentCheckbox checked={terms} onChange={setTerms}>
            I have read and accept the <span className={styles.terms}>Terms and Conditions</span>.
          </ConsentCheckbox>
        </div>
        <Button type="submit">Confirm details</Button>
      </div>
    </form>
  )
}
