/* Lezioni completate durante questa visita. Il player e «Lesson complete» segnano la
   lezione; «Training videos» la mostra come fatta. Per ora non si salva niente:
   ricaricando la pagina l'elenco riparte da zero. */
const completed = new Set<string>()

/* Le versioni precedenti salvavano l'elenco nel browser: lo si toglie, così non torna. */
try {
  localStorage.removeItem('abstand.completed')
} catch {
  /* memoria del browser non disponibile: non c'è niente da togliere */
}

export function completedLessons(): string[] {
  return [...completed]
}

export function markCompleted(number: string) {
  completed.add(number)
}
