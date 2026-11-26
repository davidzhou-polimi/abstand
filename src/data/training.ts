/* Contenuti del mese 1, «Gaze», come nelle schermate Figma in inglese. */

export type VideoKind = 'lesson' | 'exercise'

export type Video = {
  number: string
  title: string
  kind: VideoKind
  minutes: number
  /* A capo del titolo nella scheda «Next lesson», dove Figma lo spezza a mano. */
  nextLessonLines?: string[]
}

export type Week = {
  number: string
  title: string
  videos: Video[]
}

export const month1 = {
  number: '01',
  title: 'Gaze',
  /* A capo come in Figma. */
  description: ['See others’ emotions', 'without making it your own.'],
  summary: '12 lessons · 4 guided exercises · 3 h',
  weeks: [
    {
      number: '01',
      title: 'OBSERVE',
      videos: [
        { number: '01', title: 'Observe, don’t absorb', kind: 'lesson', minutes: 15 },
        { number: '02', title: 'Recognize what you feel', kind: 'lesson', minutes: 15, nextLessonLines: ['Recognize what', 'you feel'] },
        { number: '03', title: 'Pause and observe', kind: 'exercise', minutes: 15 },
      ],
    },
    {
      number: '02',
      title: 'CREATE DISTANCE',
      videos: [
        { number: '04', title: 'Empathy without burden', kind: 'lesson', minutes: 15 },
        { number: '05', title: 'The boundary between us', kind: 'lesson', minutes: 15 },
        { number: '06', title: 'Observe and let go', kind: 'exercise', minutes: 15 },
      ],
    },
    {
      number: '03',
      title: 'STAY PRESENT',
      videos: [
        { number: '07', title: 'Stay in the conversation', kind: 'lesson', minutes: 15 },
        { number: '08', title: 'When guilt arises', kind: 'lesson', minutes: 15 },
        { number: '09', title: 'Listen without taking it on', kind: 'exercise', minutes: 15 },
      ],
    },
    {
      number: '04',
      title: 'TAKE IT WITH YOU',
      videos: [
        { number: '10', title: 'Choose where to look', kind: 'lesson', minutes: 15 },
        { number: '11', title: 'Find your own distance', kind: 'lesson', minutes: 15 },
        { number: '12', title: 'Your daily ritual', kind: 'exercise', minutes: 15 },
      ],
    },
  ] satisfies Week[],
}

/* Scheda di dettaglio: in inglese esiste solo quella del video 01. */
export type VideoDetails = {
  number: string
  week: string
  inThisVideo: string
  whatYoullPractice: string
  afterTheVideo: string
}

export const videoDetails: Record<string, VideoDetails> = {
  '01': {
    number: '01',
    week: '01',
    inThisVideo:
      'Learn to distinguish the pain you observe from what you feel yourself. Through an everyday scene, recognize when listening becomes a burden and discover how to pause without losing connection with the other person.',
    whatYoullPractice: 'Recognize emotional involvement and choose how to respond.',
    afterTheVideo:
      'After a conversation, write two sentences: “The other person feels…” and “I feel…”. Notice which feelings belong to each of you.',
  },
}

export const allVideos: Video[] = month1.weeks.flatMap((week) => week.videos)

export function findVideo(number: string) {
  for (const week of month1.weeks) {
    const video = week.videos.find((v) => v.number === number)
    if (video) return { video, week }
  }
  return undefined
}
