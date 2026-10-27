# Early Spanish Reading: prototype

A redesigned, clickable prototype of an early Spanish reading platform.
Next.js 14 (App Router) + TypeScript + Tailwind CSS. No backend: content lives in `/data`, progress and mock login live in `localStorage`.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Routes

| Route | What it is |
| --- | --- |
| `/` | Welcome, overview video placeholder, "Try it out" and "Log in" buttons |
| `/demo` | Hub with equal-weight Book 1 and Fables cards |
| `/demo/book-1` | Six lesson cards (lessons 1-2 open, 3-6 "coming soon") |
| `/demo/book-1/[slug]` | Reader: tap a sentence to hear it, toggle English |
| `/demo/fables` | Four fables: language toggle, video, songs and exercises, progress bar |
| `/login` | Mock login (any non-empty email/password) |
| `/home` | Dashboard: progress and "Continue where you left off" (needs login) |

## Where to change things

- Fable and quiz content: `data/fables.ts`
- Book 1 lessons: `data/book1.ts`
- Real videos: pass `src` to `<VideoCard />` (put files in `/public/videos`)
- Real song audio: replace `AudioPlaceholder` in `components/ActivityCard.tsx`
- Colors and fonts: `tailwind.config.ts`, `app/globals.css`, `app/layout.tsx`

## Notes

- Videos and audio are placeholders. Quiz content is sample vocabulary written for the prototype.
- Spanish read-aloud uses the browser's SpeechSynthesis voices (quality varies by device).
- The mascot "Brote" and the tree background are original inline SVG.
