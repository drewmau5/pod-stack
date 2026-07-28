# Podstack

**Your podcast app plays it. Podstack plans it.**

Podstack remains a React + Vite weekly podcast planner with responsive burgundy, rust, and parchment UI and browser `localStorage` persistence. Phase 1 adds real catalogue discovery without adding authentication, Supabase, OAuth, Spotify credentials, playback, or permanent media storage.

## Real podcast data

Discover calls `GET /api/podcasts/search?term=...`, a Vercel Node function that validates the query and searches the Apple iTunes Search API for Canadian podcasts. Results normalize IDs, titles, authors, artwork, genres, Apple URLs, RSS feed URLs, and episode counts when Apple supplies them. Search responses cache at the edge for five minutes and may be served stale while revalidating for fifteen minutes; results are therefore not live to the second.

Selecting **View episodes** calls `GET /api/podcasts/feed?url=...`. The server validates public HTTP(S) URLs, rejects local/private targets, applies a timeout and 5 MB limit, and parses XML with `rss-parser` without executing feed content. It returns normalized show metadata and newest-first episodes including stable IDs, duration in minutes and seconds, dates, episode/season/type/explicit fields, webpage/audio/provider URLs, and feed provenance. Feed responses cache for 30 minutes with a one-hour stale-while-revalidate window.

Artwork uses episode artwork first, then show artwork, then the stable local Podstack SVG. The UI retains aspect ratio, never recolours artwork, and replaces failed images through `onError`. Media is neither downloaded nor stored. RSS episode webpages are labelled **Open episode page**; Apple destinations are **Open in Apple Podcasts**. Prototype Spotify URLs are search fallbacks and are labelled **Search in Spotify**, never as direct episode links.

Real RSS episodes can be assigned to a chosen stack day, next week, or saved for later. They use the same normalized shape and localStorage state as prototype episodes, so Today and weekly views survive refreshes. The small local catalogue and ready-made stacks remain explicitly identified as prototype fallback data.

## Matching and duration preferences

Every selected day stores `{ targetMinutes, flexibility }`. Existing string windows such as `45–60 minutes` migrate on load. Close, balanced, and flexible preferences correspond approximately to ±10, ±25, and ±45 minutes. Duration affects a score rather than excluding candidates; interest, style, tone, depth, recency, selection preference, and serialized order can outweigh a modest duration difference. Real feeds are sorted newest-first and never receive fabricated dates.

## RSS limitations

Publishers control RSS quality. Feeds may omit dates, duration, artwork, descriptions, episode pages, or enclosure URLs; use unusual duration formats; return malformed XML; block server requests; redirect; exceed the size limit; or disappear. Undated items remain available but sort behind valid dates. Apple generally supplies show links, not episode-specific Apple links, so RSS episodes usually expose their publisher webpage. Redirect targets are constrained by fetch behaviour, but Phase 1 does not perform provider identity matching.

Future work will match RSS episodes to genuine Spotify episode IDs/direct links (and only then offer **Open in Spotify**) without introducing Spotify OAuth solely for search. A later phase may add Supabase accounts and cross-device persistence; current state remains local only.

## Development

```bash
npm install
npm run dev
npm test
npm run lint
npm run build
```

Vercel serves `/api/podcasts/*` as functions while the non-API rewrite preserves `/explore`, `/onboarding`, `/today`, `/stack`, `/discover`, and `/profile`.
