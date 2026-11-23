#!/usr/bin/env bash
# Pubblica il sito su GitHub Pages: compila con il percorso /abstand-web/
# e copia dist/ nel ramo main del repository pubblico davidzhou-polimi/abstand-web.
# Il codice resta nel repository privato; usa le credenziali git di chi lo lancia.
set -euo pipefail

SITE_REPO="https://github.com/davidzhou-polimi/abstand-web.git"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [ -n "$(git status --porcelain)" ]; then
  echo "Ci sono modifiche non committate: committale prima di pubblicare." >&2
  exit 1
fi

SOURCE="$(git rev-parse --short HEAD)"
BASE_PATH=/abstand-web/ npm run build

WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT
git clone --quiet "$SITE_REPO" "$WORK/site" 2>/dev/null || git init --quiet -b main "$WORK/site"
cd "$WORK/site"
git remote get-url origin >/dev/null 2>&1 || git remote add origin "$SITE_REPO"
find . -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
cp -R "$ROOT/dist/." .
touch .nojekyll
git add -A
if git diff --cached --quiet; then
  echo "Il sito pubblicato è già uguale a questa versione."
  exit 0
fi
git commit --quiet -m "Sito da abstand@$SOURCE"
git push --quiet origin main
echo "Pubblicato abstand@$SOURCE su https://davidzhou-polimi.github.io/abstand-web/"
