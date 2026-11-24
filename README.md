# Abstand

Webapp mobile di Abstand, centro di sviluppo cognitivo fittizio (Laboratorio di Sintesi Finale, Antidisciplinary Lab, Politecnico di Milano). Dopo il test in cabina l'utente ritira il referto dal telefono con un QR e riceve il programma di 3 mesi per diventare «Absolute».

Design: file Figma «Sito», pagina «Area personale».

## Stack

Vite, React, TypeScript, React Router; CSS Modules con le variabili e gli stili di testo di Figma. Sito statico, nessun server.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # cartella dist/
```

## Pubblicazione

Il sito è su https://davidzhou-polimi.github.io/abstand/. A ogni push su `main` il workflow `.github/workflows/deploy.yml` lo compila con il percorso `/abstand/` e lo pubblica su GitHub Pages.

## Dove sta cosa

- `src/styles/tokens.css`: variabili Figma (Primitivi, Dimensioni, Semantici), stessi nomi con `-` al posto di `/`.
- `src/styles/typography.css`: stili di testo Figma, una classe per stile (`Heading/H4` → `.t-heading-h4`).
- `src/styles/fonts.css` e `public/fonts/`: 26A1 Marund e Marund Mono.
- `src/components/`: i componenti Figma (Button, Outline Button, Form Input, Important Person Card, Accettazione termini e condizioni) e la Grana.
- `src/data/`: testi e contenuti (profilo, programma, video del mese 1).
- `src/screens/`: una schermata per frame Figma.
- `docs/QR.md`: il formato del QR con cui la cabina (`muting.py` e la sua dashboard, gestiti dalla collega e tenuti fuori dal repository) porta il risultato alla webapp.

## Schermate

| Percorso | Frame Figma |
| --- | --- |
| `/` | Test result 1 (213:532) |
| `/report` | Test result 2 (213:568) |
| `/profile` | Profile creation (174:399) |
| `/program` | Personalized program (173:333) |
| `/program/active` | Onboarding complete (173:309) |
| `/training` | Training videos (174:457) |
| `/training/video/01` | Video 01 · Observe, don’t absorb · Details (174:583) |
| `/training/video/01/player` | Video 01 · Player and subtitles (174:603) |
| `/training/video/01/complete` | Video 01 · Lesson complete (174:648) |
