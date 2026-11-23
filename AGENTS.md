# Regole del progetto

- Lo stile è quello delle schermate nel file Figma «Sito»: fondo bianco (brand/bianco), font Marund Sharp e Marund Mono Corner. I font sono quasi definitivi, ma il loro impiego può cambiare.
- Si riusano gli stili di testo, le variabili e i componenti di Figma: classi `.t-*`, variabili CSS di `src/styles/tokens.css`, componenti di `src/components/`. Niente valori scritti a mano dove esiste un token.
- Portando una schermata da Figma non si cambiano testi, gerarchie o layout e non si aggiungono elementi.
- Nei testi si usa il trattino en (–), mai il trattino em (—).
- La status bar iOS dei frame Figma non si riproduce.
- I bordi da 0,5 px di Figma si disegnano con `box-shadow: inset 0 0 0 var(--hairline)` e mezzo pixel in più di padding (vedi `src/styles/base.css`).
