import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '../components/Button'
import { ConsentCheckbox } from '../components/ConsentCheckbox'
import { FormInput } from '../components/FormInput'
import { ImportantPersonCard } from '../components/ImportantPersonCard'
import { OutlineButton } from '../components/OutlineButton'
import frame from './Screen.module.css'
import styles from './ProfileCreation.module.css'

/* Figma: «Profile creation» (174:399). I valori nei campi e le due persone
   sono quelli del mock. */
const people = [
  { name: 'Gilda Mattei', relation: 'Mother', frequency: 'Every day' },
  { name: 'Omar Bonelli', relation: 'Best friend', frequency: 'Every week' },
]

export function ProfileCreation() {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('Mario')
  const [lastName, setLastName] = useState('Rossi')
  const [email, setEmail] = useState('mariorossi@email.com')
  const [dataConsent, setDataConsent] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    navigate('/program')
  }

  return (
    <form className={frame.screen} onSubmit={handleSubmit}>
      <h1 className={`${styles.title} t-heading-h4`}>Complete your profile</h1>
      <div className={styles.content}>
        <div className={styles.group}>
          <FormInput label="First name" name="first-name" autoComplete="given-name" value={firstName} onChange={setFirstName} />
          <FormInput label="Last name" name="last-name" autoComplete="family-name" value={lastName} onChange={setLastName} />
          <FormInput label="Email" name="email" type="email" autoComplete="email" value={email} onChange={setEmail} />
        </div>
        <div className={styles.group}>
          <p className="t-body-default">People you care about</p>
          {people.map((person) => (
            <ImportantPersonCard key={person.name} {...person} />
          ))}
          <OutlineButton tone="muted">+ Add person</OutlineButton>
        </div>
      </div>
      <div className={styles.consents}>
        <ConsentCheckbox checked={dataConsent} onChange={setDataConsent}>
          I consent to using my relationship data to improve and personalize the service.
        </ConsentCheckbox>
        <ConsentCheckbox checked={termsAccepted} onChange={setTermsAccepted}>
          I have read and accept the Terms and Conditions.
        </ConsentCheckbox>
      </div>
      <Button type="submit">Confirm details</Button>
    </form>
  )
}
