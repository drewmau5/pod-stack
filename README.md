# Podstack

A personalized podcast planning prototype that builds a listening schedule around
the days, genres, and episode lengths that fit a listener's life.

## Run locally

```bash
npm install
npm run dev
```

The prototype includes an interactive weekday stack, episode swaps, listening
progress, personalized recommendations, and an editable preference builder.

## Prototype routes

Podstack uses lightweight hash routes so every view works on static hosting:

- `#/landing` — signed-out product explanation
- `#/onboarding` — four-step plan builder and stack generation preview
- `#/today` — the signed-in daily recommendation
- `#/stack` — the complete, editable weekly plan
- `#/discover` — recommendations that can be added to a future plan
- `#/signin`, `#/signup`, and `#/profile` — account placeholders and preferences

Preferences, the weekly plan, listened states, and saved recommendations persist
in `localStorage`. Authentication buttons are intentionally prototype-only.

## Future Supabase integration

Replace the prototype auth handlers and local storage layer with Supabase Auth
and tables for profiles, listening routines, preferences, weekly stacks, episode
status, listening history, and swaps. External podcast-platform links should
remain client-side navigation; Podstack does not host or play audio.

## Deploy to Vercel

The repository includes an explicit Vercel configuration that builds the Vite
application into `dist` and serves `index.html` as the fallback for client-side
routes. Import the repository into Vercel with the project root set to the
repository root; no additional build or output settings are required.
