# Podstack

**Your podcast app plays it. Podstack plans it.** Podstack is a mobile-first planning layer that turns a listener's routine, available time, and taste into a stable weekly episode lineup. It does not play audio; episode actions open the listener's preferred podcast service.

## Local setup

```bash
npm install
npm run dev
```

Use `npm run build` for production and `npm run lint` for static checks.

## Routes

- `/` — landing page and example stack
- `/onboarding` — five-step onboarding and stack generation
- `/today` — today's planned listen
- `/stack` — full weekly plan and management
- `/discover` — purposeful recommendations
- `/profile` — profile, preferences, saved items, reset and sign-out
- `/continue-with-email`, `/check-email`, `/sign-in` — passwordless-auth placeholders

Vercel's preserved catch-all rewrite sends direct route refreshes to `index.html`.

## Prototype behaviour

State is stored under `podstack.prototype.v2` in `localStorage`: onboarding, listening windows, preferences, listening app, stable generated stack, episode statuses, name, and saved/next-week items. Profile can reset it.

Catalogue data and recommendation reasons are mock data. Platform fields in `src/data/mockData.js` are explicitly prototype links using realistic public search destinations, not verified deep links. A general URL is the fallback. There is no audio player and Podstack does not modify third-party queues.

## Future Supabase connection

Authentication screens are UI placeholders only: they do not send email, authenticate users, request passwords, or include Supabase packages or credentials. A future task can replace the local boundary in `usePrototype` with passwordless email magic links and persistence for profiles, identities, preferences, windows, stacks/items, listened/skipped/swapped states, saved episodes, and onboarding completion.

## Deployment

`npm run build` writes `dist`. The existing `vercel.json` retains the Vite build settings and SPA rewrite. No production project name, domain, or repository connection is changed here.
