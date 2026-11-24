/* Percorso di 3 mesi della schermata «Personalized program». */
export type ProgramMonth = {
  label: string
  title: string
  promise: string
  stats: string
  locked: boolean
}

export const programMonths: ProgramMonth[] = [
  {
    label: 'MONTH 1',
    title: 'Gaze',
    promise: 'See others’ emotions without making it your own',
    stats: '12 lessons, 4 guided exercises, 3 h',
    locked: false,
  },
  {
    label: 'MONTH 2',
    title: 'Body',
    promise: 'Stop reacting to those close to you',
    stats: '12 lessons, 8 guided exercises, 4 h',
    locked: true,
  },
  {
    label: 'MONTH 3',
    title: 'Heart',
    promise: 'Stay neutral even with those you love',
    stats: '10 lessons, 6 guided exercises, 3 h',
    locked: true,
  },
]

export const programGoal = {
  label: 'GOAL',
  text: 'Absolute, free from the noise of others',
}
