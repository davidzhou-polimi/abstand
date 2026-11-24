# QR della cabina → webapp

Il QR che la dashboard mostra a fine sessione («OPEN QR») apre la webapp con dentro il risultato del test:

```
https://davidzhou-polimi.github.io/abstand/#d=<dati>
```

`<dati>` è il JSON del resoconto, in base64url. Sta dopo il `#`, quindi resta sul telefono: non passa da nessun server. La webapp lo legge, lo salva nel browser e toglie i dati dall'indirizzo.

## Cosa cambia (versione 2)

La versione 1 di `reportData()` porta già profilo e risultati per emozione. Al report della webapp mancano tre cose:

1. **Il numero del report** (`REPORT #0001`): è il numero progressivo della sessione nel database di `muting.py`.
2. **Le curve nel tempo** di pelle e volto, per i grafici «How your response unfolded».
3. **Le fasi** (inizio del video, inizio del recupero), per la finestra colorata dello stimolo.

### In `muting.py` (3 punti)

- `Store.new_session`: tiene `cur.lastrowid` della `INSERT` e lo restituisce come `no`.
- `Engine.snapshot`: aggiunge `no` allo stato.
- `Store.history_snapshot`: legge anche `id` dalla tabella `sessions` e lo restituisce come `no`. Inoltre, nella traccia, il volto diventa l'espressione più alta in quel momento, come nel live. Oggi lo storico prende solo l'espressione del video, mentre il live prende la più alta.

### In `dashboard.html` (3 punti)

- `WEBAPP_URL = 'https://davidzhou-polimi.github.io/abstand/'`.
- `reportData()`: `v: 2`, `no` e `s: curves(...)` (funzione nuova, sotto).
- `reportText()`: l'indirizzo usa `#d=` invece di `?d=`.

Le modifiche sono pronte in `muting.py` e `dashboard.html` (versione del 24/11 con le righe aggiunte) e in `qr-v2.patch`, da applicare a una copia del 24/11: `patch -p1 < qr-v2.patch`. I file non sono nel repository: li passa David.

## Formato dei dati

| Campo | Versione | Contenuto |
| --- | --- | --- |
| `v` | 1 → 2 | versione del formato |
| `no` | **nuovo** | numero progressivo della sessione (1, 2, 3…) |
| `id` | 1 | codice della sessione (`20261124-123502-Nome`) |
| `n` | 1 | nome scritto nella casella «INSERT NAME and ID» |
| `pr` | 1 | profilo: 1 non influenzato, 2 pelle, 3 volto, 4 entrambi |
| `nP`, `nV` | 1 | in quante emozioni (su 5) la pelle / il volto hanno superato la soglia |
| `emo` | 1 | ordine delle righe di `e` e `s`, per esempio `joy,anger,sadness,disgust,fear` |
| `e` | 1 | per emozione: `[P, V, variazione pelle %, espressione dominante, baseline µS, picco µS]` |
| `t` | 1 | inizio della sessione |
| `s` | **nuovo** | per emozione: `[inizio video s, inizio recupero s, durata s, curve]`, oppure `null` se l'emozione non è stata misurata |

`curve` è un base64url di `2 × durata` byte, un valore al secondo (media del secondo):

- primi `durata` byte, **pelle**: `(µS / baseline − 1) × 100 + 50`, cioè la variazione in % rispetto alla baseline dell'emozione, spostata di 50;
- altri `durata` byte, **volto**: espressione più alta `× 100` (0–100);
- `255` = nessun dato in quel secondo (contatto perso, volto non visto).

## Come provarlo senza sensori

```bash
python3 muting.py --sim 2 --fast --speed 5
```

Nella dashboard: Start, poi a fine sessione OPEN QR. Con `--fast` il QR è lungo circa 800 caratteri (93 × 93 moduli). Con i video veri (5 s di riposo, il video, 4 s di recupero) si arriva intorno ai 1000 caratteri: va provato con un telefono davanti allo schermo della cabina.

L'ordine delle emozioni nel QR segue `EMOS` di `muting.py` (oggi quello dei video: joy, anger, sadness, disgust, fear) ed è scritto nel campo `emo`: la webapp lo legge da lì, quindi se l'ordine cambia non serve toccarla.
