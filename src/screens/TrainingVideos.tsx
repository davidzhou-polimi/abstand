import { Link } from 'react-router'
import doneIcon from '../assets/icon-done.svg'
import { TopBar } from '../components/TopBar'
import playIcon from '../assets/icon-play.svg'
import absoluteSymbol from '../assets/profile-absolute.svg'
import {
  CURRENT_MONTH,
  MAINTENANCE_WEEK,
  currentModule,
  lessonMeta,
  moduleSummary,
  releasedExtras,
  weekExercises,
  type Lesson,
  type Module,
} from '../data/training'
import { completedLessons } from '../data/progress'
import styles from './TrainingVideos.module.css'

/* Figma: «Training videos» (434:4577). Le lezioni già guardate prendono la copertina
   «fatta» del frame 434:4679: velo bianco e spunta. */
type State = 'open' | 'done'

export function TrainingVideos() {
  const module = currentModule()
  const done = completedLessons()
  const state = (lesson: Lesson): State => (done.includes(lesson.number) ? 'done' : 'open')

  return (
    <main className={styles.page}>
      {/* Prima schermata dopo l'onboarding: logo a sinistra e menu (che per ora non si apre).
          L'etichetta «YOUR TRAINING / MONTH 01» è passata dall'intestazione alla barra. */}
      <TopBar left={{ logo: true }} label={`YOUR TRAINING / MONTH ${CURRENT_MONTH}`} right={{ menu: true }} />
      <header className={styles.header}>
        <h1 className="t-heading-h3">{module.title}</h1>
        <p className={`${styles.description} t-body-large`}>
          <span>{module.description[0]}</span>
          <span>{module.description[1]}</span>
        </p>
        <p className={`${styles.summary} t-caption`}>{moduleSummary(module)}</p>
        <hr className={styles.separator} />
      </header>
      <div className={styles.collection}>
        {module.maintenance ? (
          <Maintenance module={module} done={done} />
        ) : (
          module.weeks.map((week) => (
          <section key={week.number} className={styles.week}>
            <h2 className={`${styles.weekTitle} t-label-small`}>
              WEEK {week.number} · {week.title}
            </h2>
            {week.lessons.map((lesson, i) => (
              <LessonRow key={lesson.number} lesson={lesson} state={state(lesson)} last={i === week.lessons.length - 1} />
            ))}
          </section>
          ))
        )}
      </div>
    </main>
  )
}

/* Mind, il mantenimento (tavola «Status verificato in cabina · giro 3»): in cima lo status,
   che verifica solo il test al centro; sotto gli strumenti dell'app, cioè i due esercizi
   della settimana e gli extra facoltativi. Chi arriva dal QR ha appena fatto il test. */
function Maintenance({ module, done }: { module: Module; done: string[] }) {
  const exercises = weekExercises(module)
  const doneCount = exercises.filter((l) => done.includes(l.number)).length
  const extras = releasedExtras(module)
  return (
    <>
      <section className={styles.status}>
        <p className="t-label-small">YOUR STATUS · VERIFIED AT THE CENTER</p>
        <p className="t-heading-h3">Absolute</p>
        <p className="t-body-small">Last test today.</p>
        <p className={`${styles.statusNext} t-label-small`}>NEXT TEST IN 12 WEEKS</p>
        <span className={styles.statusTrack} aria-hidden="true">
          <span style={{ width: '0%' }} />
        </span>
      </section>
      <section className={styles.week}>
        <h2 className={`${styles.weekTitle} ${styles.split} t-label-small`}>
          THIS WEEK · WEEK {MAINTENANCE_WEEK}
          <span className={styles.secondary}>{doneCount} OF {exercises.length} DONE</span>
        </h2>
        {exercises.map((lesson, i) => (
          <LessonRow
            key={lesson.number}
            lesson={lesson}
            state={done.includes(lesson.number) ? 'done' : 'open'}
            last={i === exercises.length - 1}
            meta={lessonMeta(module, lesson).replace(' · ', '  ·  ')}
            numbered={false}
          />
        ))}
      </section>
      <section className={styles.week}>
        <h2 className={`${styles.weekTitle} ${styles.split} t-label-small`}>
          EXTRAS
          <span className={styles.secondary}>OPTIONAL</span>
        </h2>
        <div>
          {extras.map((lesson, i) => (
            <Link key={lesson.number} to={`/training/video/${lesson.number}`} className={styles.extra}>
              <span className={styles.extraCover}>
                <img src={playIcon} width={20} height={20} alt="" />
              </span>
              <span className={styles.extraText}>
                <span className={`${styles.meta} t-caption`}>
                  {lessonMeta(module, lesson).replace(' · ', '  ·  ')}
                  {i === 0 && <span className={`${styles.tag} t-label-small`}>NEW</span>}
                </span>
                <span className="t-body-default">{lesson.title}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

/* L'ultima riga della settimana non ha il divisore sotto, come in Figma. */
/* In Mind gli esercizi non sono una sequenza: al posto del numero, il simbolo di Absolute
   (tavola «Copertine degli esercizi di Mind», prova A). */
function LessonRow({
  lesson,
  state,
  last,
  meta,
  numbered = true,
}: {
  lesson: Lesson
  state: State
  last: boolean
  meta?: string
  numbered?: boolean
}) {
  const coverClass = `${styles.cover} ${styles[lesson.kind]}`
  const content = (
    <>
      <span className={coverClass}>
        {numbered ? (
          <span className={`${styles.coverNumber} t-heading-h2`}>{lesson.number}</span>
        ) : (
          <img src={absoluteSymbol} width={62} height={59} alt="" className={styles.coverSymbol} />
        )}
        {state === 'done' && (
          <span className={styles.doneVeil}>
            <img src={doneIcon} width={16.08} height={14.59} alt="Completed" className={styles.doneIcon} />
          </span>
        )}
      </span>
      <span className={styles.text}>
        <span className={`${styles.meta} t-caption`}>{meta ?? `LESSON ${lesson.number}  ·  ${lesson.minutes} MIN`}</span>
        <span className={`${styles.videoTitle} t-body-large`}>{lesson.title}</span>
        <span className={`${styles.cta} t-caption`}>
          {lesson.kind === 'exercise' ? 'Guided exercise  ↗' : 'Explore the lesson  ↗'}
        </span>
      </span>
      {!last && <span className={styles.divider} aria-hidden="true" />}
    </>
  )
  return (
    <Link to={`/training/video/${lesson.number}`} className={styles.row}>
      {content}
    </Link>
  )
}
