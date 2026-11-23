import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/* GitHub Pages non conosce i percorsi dell'app (/profile, /training…): risponde
   con 404.html. Una copia di index.html con quel nome apre comunque l'app. */
function spaFallback(): Plugin {
  return {
    name: 'spa-fallback',
    apply: 'build',
    closeBundle() {
      const dist = resolve(__dirname, 'dist')
      copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'))
    },
  }
}

export default defineConfig({
  /* Cartella del sito: «/» in locale, «/abstand/» su GitHub Pages (BASE_PATH nel workflow). */
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), spaFallback()],
})
