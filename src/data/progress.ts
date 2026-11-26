/* Lezioni completate, salvate nel browser del telefono. Il player e «Lesson complete»
   segnano la lezione; «Training videos» la mostra come fatta. */
const KEY = 'abstand.completed'

export function completedLessons(): string[] {
  try {
    const raw = localStorage.getItem(KEY)
    const list = raw ? JSON.parse(raw) : []
    return Array.isArray(list) ? list.filter((x) => typeof x === 'string') : []
  } catch {
    return []
  }
}

export function markCompleted(number: string) {
  const list = completedLessons()
  if (list.includes(number)) return
  try {
    localStorage.setItem(KEY, JSON.stringify([...list, number]))
  } catch {
    /* senza memoria del browser lo stato vale solo per questa visita */
  }
}
