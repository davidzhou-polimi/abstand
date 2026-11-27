/* Moduli del programma. Un modulo dura un mese: 4 settimane, ogni settimana 2 lezioni
   e 1 esercizio guidato, 15 minuti l'uno. Testi approvati nella proposta «Percorsi per
   profilo»; Gaze ha titoli e settimane delle schermate Figma. */
import { cabinResult } from './payload'
import type { ProfileId } from './profiles'

export type LessonKind = 'lesson' | 'exercise'

export type Lesson = {
  /* 01–12 dentro il mese */
  number: string
  title: string
  kind: LessonKind
  minutes: number
  inThisLesson: string
  whatYoullPractice: string
  afterTheLesson: string
  /* A capo del titolo nella scheda «Next lesson», dove Figma lo spezza a mano. */
  nextLessonLines?: string[]
}

export type Week = {
  number: number
  title: string
  lessons: Lesson[]
}

export type ModuleId = 'gaze' | 'body' | 'heart' | 'mind'

export type Module = {
  id: ModuleId
  title: string
  /* La frase sotto il titolo nella schermata del programma */
  promise: string
  /* La stessa frase in due righe, sotto il titolo nella lista delle lezioni */
  description: [string, string]
  weeks: Week[]
  /* Mind è il mantenimento: non insegna, ogni settimana dà esercizi ed extra facoltativi. */
  maintenance?: boolean
}

type Row = [LessonKind, string, string, string, string, string[]?]

const MINUTES = 15

function weeks(list: [string, Row[]][]): Week[] {
  return list.map(([title, rows], w) => ({
    number: w + 1,
    title,
    lessons: rows.map(([kind, lessonTitle, inThisLesson, whatYoullPractice, afterTheLesson, nextLessonLines], i) => ({
      number: String(w * 3 + i + 1).padStart(2, '0'),
      title: lessonTitle,
      kind,
      minutes: MINUTES,
      inThisLesson,
      whatYoullPractice,
      afterTheLesson,
      nextLessonLines,
    })),
  }))
}

export const MODULES: Record<ModuleId, Module> = {
  gaze: {
    id: 'gaze',
    title: 'Gaze',
    promise: 'See others’ emotions without making it your own',
    description: ['See others’ emotions', 'without making it your own.'],
    weeks: weeks([
      ['OBSERVE', [
        ['lesson', 'Observe, don’t absorb', 'Learn to tell the emotions you observe from the ones you feel yourself. Through an everyday scene, recognize the moment listening becomes a burden, and learn to pause before it does.', 'Notice when you get involved, and choose how to respond.', 'After a conversation, write two sentences: “The other person feels…” and “I feel…”. Notice which feelings belong to each of you.'],
        ['lesson', 'Recognize what you feel', 'An emotion can arrive before any words. Notice the thoughts, tension and impulses that rise when someone shares what they are going through. Naming what you feel is the first step to stop reacting automatically.', 'Name your emotions as they arise.', 'Think back to a recent encounter. Write down one emotion, one physical sensation and one thought, without judging them.', ['Recognize what', 'you feel']],
        ['exercise', 'Pause and observe', 'A guided exercise to stop and come back to yourself. Feet on the ground, eyes on the room, you take a short pause between what you observe and what you feel.', 'Pause before you take on someone else’s emotion.', 'Place your feet on the ground. Notice three objects around you, pause, and ask yourself: “What am I feeling, right now?”'],
      ]],
      ['CREATE DISTANCE', [
        ['lesson', 'Empathy without burden', 'Understanding someone does not mean carrying what they feel. Learn to read another person’s emotion while keeping it outside your own state.', 'Understand others without taking on their emotions.', 'The next time someone confides in you, repeat to yourself: “This is theirs.” Notice how your body responds.'],
        ['lesson', 'The boundary between us', 'Every relationship has a line where their emotions end and yours begin. Find that line, and learn to notice when someone else’s mood crosses it.', 'Recognize where others’ emotions end and yours begin.', 'Draw a line on a sheet of paper. On one side write what someone close to you feels, on the other what you feel.'],
        ['exercise', 'Observe and let go', 'A guided exercise for the thoughts that stay with you after a conversation. You observe them, give them a name and let them go.', 'Let go of thoughts that are not yours.', 'Give a title to the thought that keeps coming back. Notice that it is only a thought, then return to the sounds around you for a few moments.'],
      ]],
      ['STAY PRESENT', [
        ['lesson', 'Stay in the conversation', 'Distance does not mean leaving. Learn to stay in a difficult conversation, listening and answering, while the other person’s emotions stay where they belong.', 'Stay in a conversation without absorbing it.', 'In your next difficult conversation, check your breath three times. Note when it changed.'],
        ['lesson', 'When guilt arises', 'Stepping back from someone else’s emotion can feel like a betrayal. Look at the guilt that comes with distance, and see why it is just another interference.', 'Recognize guilt as interference.', 'Write down a moment when you felt guilty for not feeling the same as someone else. What did that guilt ask you to do?'],
        ['exercise', 'Listen without taking it on', 'A guided listening exercise. A voice shares a personal story while you keep your body steady and your attention on the words, not on the emotion.', 'Listen fully without taking the emotion on.', 'Before answering, notice your feet on the ground and relax your shoulders. Say one sentence that shows you listened, without promising to fix everything.'],
      ]],
      ['TAKE IT WITH YOU', [
        ['lesson', 'Choose where to look', 'Your attention decides what reaches you. Learn to choose where to look in a conversation, so the emotions of others reach you only as much as you allow.', 'Direct your attention to protect your state.', 'In your next conversation, choose a neutral point to rest your eyes on when the emotion grows. Notice the difference.'],
        ['lesson', 'Find your own distance', 'Too close, you absorb everything; too far, you stop seeing. Bring together what you have learned to find the distance that keeps you calm with each person.', 'Find the right distance with each person.', 'Think of three people you meet often. For each one, write the distance that lets you stay calm.'],
        ['exercise', 'Your daily ritual', 'A short guided routine for every day: observe, pause, name what you feel and let go of what is not yours. Five minutes to keep your gaze free.', 'Make observing without absorbing a daily habit.', 'Repeat the ritual every day at the same time. Note the days when it was most needed.'],
      ]],
    ]),
  },
  body: {
    id: 'body',
    title: 'Body',
    promise: 'Stop reacting to those close to you',
    description: ['Stop reacting', 'to those close to you.'],
    weeks: weeks([
      ['NOTICE', [
        ['lesson', 'Your face speaks first', 'Before you say a word, your face has already answered. Watch how quickly expressions form when someone close to you is upset, excited or angry, and learn to catch them as they appear.', 'Notice the first movement of your face in a conversation.', 'Tonight, recall one moment when your face reacted before you chose to. Write what it showed and what you actually felt.'],
        ['lesson', 'The mirror reflex', 'Smiles, frowns and raised voices spread from face to face without asking. Discover how you copy the expressions of the people around you, and why the closest ones are the hardest to resist.', 'Spot when you mirror someone else’s expression.', 'In your next conversation, count how many times you mirror the other person. Don’t correct it yet, just count.'],
        ['exercise', 'Catch the reaction', 'A guided exercise in front of a mirror. You look at images of familiar faces and observe your own expression while you watch them.', 'See your reaction from the outside.', 'Repeat the exercise once more today. Note which face moved you the most.'],
      ]],
      ['SLOW DOWN', [
        ['lesson', 'The half second before', 'Between what you see and how you react there is a short gap. Learn to find it, and to use it to decide what your body will show.', 'Stretch the moment between stimulus and reaction.', 'Before answering a message from someone close to you, wait one full breath. Notice what changes in your reply.'],
        ['lesson', 'Breathe before you show', 'Expression rides on breath: a quick inhale lifts the eyebrows, a held breath tightens the jaw. Use slow, even breathing to keep your face from following the emotion in the room.', 'Use your breath to keep your expression still.', 'During your next difficult conversation, keep your exhale longer than your inhale. Notice what your face does.'],
        ['exercise', 'A neutral face', 'A guided exercise to find your neutral expression: relaxed forehead, loose jaw, steady eyes. You hold it while a voice describes emotional scenes.', 'Hold a neutral expression for three minutes.', 'Find your neutral face three times today: in a queue, at a meal, in a conversation.'],
      ]],
      ['STAY STILL', [
        ['lesson', 'When they raise their voice', 'Anger invites an answer: a step back, a raised voice, a defensive gesture. Learn to stay still and quiet when someone close to you loses control.', 'Keep your voice and posture steady under pressure.', 'Recall the last argument you had. Write how your body reacted, and how it will react next time.'],
        ['lesson', 'Reacting is not caring', 'Many believe that showing emotion proves they care. Separate attention from reaction: you can listen fully while your face and body stay calm.', 'Listen without showing a reaction.', 'Listen to someone close to you for five minutes without nodding, frowning or smiling. Observe what happens.'],
        ['exercise', 'Still in the room', 'A guided exercise in stillness. Seated, you hear the voices of friends and family growing louder, and you keep your hands, shoulders and face at rest.', 'Keep your body still while the room gets louder.', 'Choose a busy place today and stay still there for five minutes, watching others react.'],
      ]],
      ['TAKE IT WITH YOU', [
        ['lesson', 'Choose your response', 'A reaction happens to you; a response is chosen. Bring together what you have learned to decide, each time, what your body will show.', 'Replace automatic reactions with chosen responses.', 'Pick one person you see every day. Decide in advance how you will respond to their mood tomorrow.'],
        ['lesson', 'Close, but still', 'Living close to others means constant signals: a sigh at breakfast, a look across the table. Learn to stay near them without answering every signal.', 'Stay near others without answering every signal.', 'Spend an evening with your family or partner and keep a quiet face. Note the moments when it was hardest.'],
        ['exercise', 'Your stillness ritual', 'A short guided routine for every morning: breath, neutral face, steady posture. Five minutes to start the day with a body that does not react.', 'Make stillness a daily habit.', 'Repeat the ritual every morning. Note the days you skip it, and how those days go.'],
      ]],
    ]),
  },
  heart: {
    id: 'heart',
    title: 'Heart',
    promise: 'Stay neutral even with those you love',
    description: ['Stay neutral', 'even with those you love.'],
    weeks: weeks([
      ['FEEL THE PULL', [
        ['lesson', 'Where their mood lands', 'When someone you love is sad or happy, their mood lands somewhere in your body: in your chest, your stomach, your breath. Learn to locate it before it takes over.', 'Locate the feelings of others in your body.', 'The next time someone you love shares news, place a hand where you feel it. Write down the place.'],
        ['lesson', 'Love is not a duty', 'Closeness often comes with an unspoken rule: their feelings must become yours. Question this rule and see how much of your inner noise it creates.', 'Recognize the feelings you take on out of duty.', 'List three people whose moods you feel responsible for. Next to each name, write what it costs you.'],
        ['exercise', 'Read your inner signal', 'A guided body scan. While a voice names people close to you, you notice heartbeat, warmth and tension, without trying to change them.', 'Read your inner activation without judging it.', 'Repeat the scan tonight with one name only. Compare it with this morning.'],
      ]],
      ['LOOSEN THE TIES', [
        ['lesson', 'Care without carrying', 'You can look after someone without carrying their feelings. Learn the difference between helping a person and taking on their state.', 'Help others without taking on their emotions.', 'Offer help to someone today, then let their worry stay with them. Note how you feel an hour later.'],
        ['lesson', 'You don’t owe them your calm', 'Guilt keeps many people bound to the moods of those they love. Discover why your calm is yours, and why giving it away helps no one.', 'Let go of guilt when you stay calm.', 'Write one sentence that begins with “I don’t have to feel…”. Read it before your next family meal.'],
        ['exercise', 'Release the knot', 'A guided breathing exercise to loosen the tension that builds when someone close to you is upset. Slow exhales lower your inner activation step by step.', 'Lower your inner activation with your breath.', 'Use the exercise the next time you feel your heart speed up near someone you love.'],
      ]],
      ['HOLD NEUTRAL', [
        ['lesson', 'When someone you love falls apart', 'Tears, anger, panic: the moments when everyone expects you to feel the same. Learn to stay present and neutral while someone close to you falls apart.', 'Stay neutral while someone you love is overwhelmed.', 'Think of the last time someone close to you broke down. Write what you felt, and what you would like to feel instead.'],
        ['lesson', 'Joy is noise too', 'Excitement, pride and enthusiasm interfere as much as sadness does. See how the happiness of others can also take over your mind.', 'Stay neutral in the face of others’ joy.', 'The next time someone shares good news, notice your heartbeat before you answer.'],
        ['exercise', 'Steady heartbeat', 'A guided exercise with the voices of loved ones: laughter, crying, shouting. You follow your breath and keep your heartbeat steady from start to finish.', 'Keep your heartbeat steady through emotional sounds.', 'Repeat the exercise with your eyes closed. Note which voice was the hardest.'],
      ]],
      ['TAKE IT WITH YOU', [
        ['lesson', 'Close and free', 'Neutral does not mean distant. Bring together what you have learned to stay close to the people you love while keeping your inner world your own.', 'Stay close while keeping your inner world your own.', 'Plan a moment with someone you love this week. Decide in advance how you want to feel.'],
        ['lesson', 'Love from a distance', 'Some bonds create more interference than others. Learn to set the right distance for each relationship, from family to friends.', 'Set the right distance for each relationship.', 'Draw three circles and place the people close to you inside them. Notice who is too close.'],
        ['exercise', 'Your evening reset', 'A short guided routine for every evening: a body scan, slow breathing and a moment to let go of the feelings collected during the day.', 'Clear the day’s emotions before sleep.', 'Repeat the reset every evening. Note how you wake up the next morning.'],
      ]],
    ]),
  },
  mind: {
    id: 'mind',
    title: 'Mind',
    promise: 'Maintain the calm you’ve reached',
    description: ['Maintain the calm', 'you’ve reached.'],
    maintenance: true,
    weeks: weeks([
      ['CHECK YOUR STATE', [
        ['lesson', 'What Absolute feels like', 'Your signals are low: your body is calm, your face is quiet. Learn to recognize this state clearly, so you notice the moment it starts to change.', 'Recognize your Absolute state.', 'Describe your calm in three words. Keep them where you can see them.'],
        ['lesson', 'Small leaks', 'Interference rarely returns all at once. It comes back in small leaks: a sigh you absorb, a smile you return without choosing. Learn to spot them early.', 'Spot the first signs of interference.', 'At the end of the day, write down one small leak and where it came from.'],
        ['exercise', 'Daily scan', 'A two-minute guided check of body and face: heartbeat, breath, forehead, jaw. A quick way to measure your state every day.', 'Measure your state in two minutes.', 'Do the scan at the same time every day this week.'],
      ]],
      ['GUARD YOUR CALM', [
        ['lesson', 'Old reflexes', 'Under stress, old reactions come back: a frown, a racing heart, the urge to comfort. Learn to recognize them and let them pass without acting on them.', 'Let old reflexes pass without acting on them.', 'Write down the reflex that returned most often this week.'],
        ['lesson', 'Screens and crowds', 'Messages, feeds and busy places carry a constant stream of other people’s emotions. Learn to move through them without letting them in.', 'Stay calm in emotionally crowded places.', 'Spend ten minutes on your feed today and note which posts tried to move you.'],
        ['exercise', 'Close the door', 'A guided visualization: you close a door between your mind and the noise of others. A tool to use whenever the outside gets too loud.', 'Shut out the noise of others on demand.', 'Use the exercise once a day, in the place where you feel most exposed.'],
      ]],
      ['UNDER PRESSURE', [
        ['lesson', 'When everyone expects a reaction', 'Weddings, funerals, arguments: some moments demand a visible emotion. Learn to meet these expectations without letting them reach your inner state.', 'Meet expectations without losing your calm.', 'Think of an upcoming event where a reaction will be expected. Prepare how you will stay calm.'],
        ['lesson', 'Silence is an answer', 'You don’t have to fill every pause or answer every feeling. Discover how a calm silence can be the strongest response.', 'Answer with calm silence.', 'In your next conversation, let one emotional moment pass in silence. Note what the other person does.'],
        ['exercise', 'Stress test', 'A guided exercise with a sequence of intense scenes and sounds. You check your state before, during and after, and see how stable your calm really is.', 'Test the stability of your calm.', 'Repeat the test at the end of the month and compare the results.'],
      ]],
      ['OWN YOUR MIND', [
        ['lesson', 'Your mind is yours', 'Absolute is a choice you renew every day. Bring together everything you have learned to keep your mind free from the noise of others.', 'Renew your choice of Absolute every day.', 'Write one sentence that describes your mind today. Read it again in a month.'],
        ['lesson', 'Absolute for life', 'Plan how to keep your state over the months ahead: the routines to keep, the situations to watch, the signals that tell you to return.', 'Plan how to keep your state.', 'Mark on your calendar the dates of your next three checks.'],
        ['exercise', 'Your maintenance ritual', 'A short guided routine to repeat every week: scan, breath, neutral face and a moment of silence. Fifteen minutes to keep your calm intact.', 'Keep your calm with a weekly routine.', 'Repeat the ritual once a week, until your next test at the center.'],
      ]],
    ]),
  },
}

/* Moduli di ogni profilo, mese per mese: dalla nota Figma «Realizzare un video di intro
   per ognuno dei profili». Mind viene sempre dopo il GOAL Absolute e non finisce; per
   Absolute è l'unico modulo e Absolute è il punto di partenza. */
export const PATHS: Record<ProfileId, ModuleId[]> = {
  1: ['mind'],
  2: ['gaze', 'heart', 'mind'],
  3: ['gaze', 'body', 'mind'],
  4: ['gaze', 'body', 'heart', 'mind'],
}

/* Senza QR si mostra il profilo del mock, Disguised, come nel Test result. */
export function userPath(): Module[] {
  return PATHS[cabinResult()?.profile ?? 2].map((id) => MODULES[id])
}

/* Il mese in corso è il primo del percorso: gli altri sono ancora bloccati. */
export const CURRENT_MONTH = 1

export function currentModule(): Module {
  return userPath()[CURRENT_MONTH - 1]
}

export function lessonsOf(module: Module): Lesson[] {
  return module.weeks.flatMap((week) => week.lessons)
}

export function findLesson(module: Module, number: string) {
  for (const week of module.weeks) {
    const lesson = week.lessons.find((l) => l.number === number)
    if (lesson) return { lesson, week }
  }
  return undefined
}

/* «4 weeks · 12 lessons · 3 h»: gli esercizi guidati sono lezioni e non si contano due volte.
   Ogni frammento dopo «·» comincia con la maiuscola. */
export function moduleSummary(module: Module) {
  if (module.maintenance) return '2 exercises a week · Optional extras'
  const lessons = lessonsOf(module)
  const hours = lessons.reduce((sum, l) => sum + l.minutes, 0) / 60
  return `${module.weeks.length} weeks · ${lessons.length} lessons · ${hours} h`
}

export const programGoal = {
  label: 'GOAL',
  text: 'Absolute, free from the noise of others',
}

/* Mantenimento (Mind). Ogni settimana due esercizi guidati: il rituale fisso (12) e uno a
   turno fra scan, porta chiusa e stress test (03, 06, 09). Le altre 8 lezioni sono gli
   extra facoltativi: ne esce uno nuovo a settimana. Nella demo si è alla prima settimana. */
export const MAINTENANCE_WEEK = 1
const RITUAL = '12'
const ROTATION = ['03', '06', '09']

export function weekExercises(module: Module, week = MAINTENANCE_WEEK): Lesson[] {
  const byNumber = (n: string) => lessonsOf(module).find((l) => l.number === n)!
  return [byNumber(RITUAL), byNumber(ROTATION[(week - 1) % ROTATION.length])]
}

/* Gli extra usciti fino a questa settimana, il più nuovo per primo. */
export function releasedExtras(module: Module, week = MAINTENANCE_WEEK): Lesson[] {
  return lessonsOf(module)
    .filter((l) => l.kind === 'lesson')
    .slice(0, week)
    .reverse()
}

/* Una lezione del mese in corso con la settimana in cui sta e il suo ruolo:
   nei moduli normali la settimana è la sua; in Mind è la settimana di mantenimento. */
export function lessonInMonth(number: string) {
  const module = currentModule()
  const found = findLesson(module, number)
  if (!found) return undefined
  if (!module.maintenance) return { module, lesson: found.lesson, week: found.week.number, role: found.lesson.kind }
  const exercises = weekExercises(module)
  if (exercises.some((l) => l.number === number)) return { module, lesson: found.lesson, week: MAINTENANCE_WEEK, role: 'exercise' as const }
  if (releasedExtras(module).some((l) => l.number === number)) return { module, lesson: found.lesson, week: MAINTENANCE_WEEK, role: 'extra' as const }
  return undefined
}

/* La riga sotto il titolo di una lezione (lista, dettagli, player, prossima lezione):
   nei moduli «LESSON 05 · 15 MIN»; in Mind l'esercizio fisso, quello della settimana, l'extra. */
export function lessonMeta(module: Module, lesson: Lesson) {
  const minutes = `${lesson.minutes} MIN`
  if (!module.maintenance) return `LESSON ${lesson.number} · ${minutes}`
  if (lesson.kind === 'lesson') return `EXTRA · ${minutes}`
  return lesson.number === RITUAL ? `EVERY WEEK · ${minutes}` : `THIS WEEK · ${minutes}`
}
