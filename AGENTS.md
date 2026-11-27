# Regole del progetto

- Lo stile è quello delle schermate nel file Figma «Sito» (pagina «LINEE GUIDA»): fondo bianco (brand/bianco), font Marund Corner per titoli, etichette, didascalie e pulsanti, Marund Mono Corner per i testi (stili «Body»). I font sono quasi definitivi, ma il loro impiego può cambiare.
- Si riusano gli stili di testo, le variabili e i componenti di Figma: classi `.t-*`, variabili CSS di `src/styles/tokens.css`, componenti di `src/components/`. Niente valori scritti a mano dove esiste un token.
- Portando una schermata da Figma non si cambiano testi, gerarchie o layout e non si aggiungono elementi.
- Nei testi si usa il trattino en (–), mai il trattino em (—).
- Ogni frammento di testo comincia con la maiuscola, anche dopo «·» dentro una riga («2 exercises a week · Optional extras»); dopo i due punti si continua in minuscolo.
- Il luogo del test si chiama «center» nei testi dell'app («Back to the center»), mai «booth» o «cabin».
- Struttura del programma: modulo = mese, 4 settimane, ogni settimana 2 lezioni e 1 esercizio guidato. In alto il percorso («MONTH 1 / WEEK 2»), per ogni lezione «LESSON 05 · 15 MIN». Mind fa eccezione: è il mantenimento, viene dopo il GOAL Absolute e non finisce (esercizi ogni settimana, extra facoltativi); lo status lo verifica solo il test al centro, l'app dà gli strumenti.
- La status bar iOS dei frame Figma non si riproduce.
- Il pulsante finale di una schermata (e ciò che Figma gli tiene attaccato, come i consensi) sta in fondo allo schermo anche quando il frame Figma è in «Hug»: sullo schermo più alto del contenuto lo spazio in più va sopra, mai sotto il pulsante.
- I margini sono gli stessi in tutte le schermate, anche dove Figma è impreciso: 24 px ai lati e in alto, 40 px sotto il pulsante finale; i pulsanti a tutta larghezza sono alti 54 px (variabili `--page-*` e `--button-height` in `src/styles/base.css`).
- Sotto i 402 px (la larghezza dei frame Figma) nessuna parola sola nell'ultima riga di un testo: `text-wrap: pretty` e, per titoli e frasi grandi, `balance` (vedi `src/styles/base.css`). Da 402 px in su gli a capo restano quelli di Figma.
- I bordi da 0,5 px di Figma si disegnano con `box-shadow: inset 0 0 0 var(--hairline)` e mezzo pixel in più di padding (vedi `src/styles/base.css`).
