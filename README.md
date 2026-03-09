# ABC-spill

En liten, barnevennlig læringsapp for det norske alfabetet – fra **A til Å**, inkludert **Æ, Ø og Å**.

## Funksjoner

- Hele det norske alfabetet i riktig rekkefølge
- Viser stor og liten bokstav
- Enkle norske ord og emoji-eksempler
- Trykkbare bokstavkort med stor touchflate
- Mini-quiz med hyggelig tilbakemelding
- Fungerer på mobil og nettbrett

## Lokal kjøring

```bash
npm install
npm run dev
```

Åpne `http://localhost:5173`

## Bygg for produksjon

```bash
npm run build
npm run preview
```

## Docker / Coolify

Appen kan deployes direkte i Coolify med Dockerfile i repo-roten.

```bash
docker build -t abcspill .
docker run --rm -p 8080:80 abcspill
```

### Coolify-notater

- Bruk repoet som en **public GitHub repository** i Coolify
- Build pack: **Dockerfile**
- Container eksponerer port **80**
- Ingen miljøvariabler er påkrevd

## Verifikasjon

Kjør disse før deploy:

```bash
npm run build
npm run preview -- --host 0.0.0.0 --port 4173
```

Sjekk at:

- alfabetet viser **A–Å**
- UI er på norsk
- quizen gir riktig/feil tilbakemelding
- `Æ`, `Ø` og `Å` er med i samme flyt som resten av alfabetet
