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

## Deploy to Vercel

The repository includes an explicit Vercel configuration that builds the Vite
application into `dist` and serves `index.html` as the fallback for client-side
routes. Import the repository into Vercel with the project root set to the
repository root; no additional build or output settings are required.
