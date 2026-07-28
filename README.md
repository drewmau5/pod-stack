# Podstack

**Your podcast app plays it. Podstack plans it.**

Podstack remains a React + Vite weekly podcast planner with responsive burgundy, rust, and parchment UI and browser `localStorage` persistence. Phase 1 adds real catalogue discovery without adding authentication, Supabase, OAuth, Spotify credentials, playback, or permanent media storage.

## Real podcast data

Discover calls `GET /api/podcasts/search?term=...`, a Vercel Node function that validates the query and searches the Apple iTunes Search API for Canadian podcasts. Results normalize IDs, titles, authors, artwork, genres, Apple URLs, RSS feed URLs, and episode counts when Apple supplies them. Search responses cache at the edge for five minutes and may be served stale while revalidating for fifteen minutes; results are therefore not live to the second.

Selecting **View episodes** calls `GET /api/podcasts/feed?url=...`. The server validates public HTTP(S) URLs, rejects local/private targets, applies a timeout and 5 MB limit, and parses XML with `rss-parser` without executing feed content. It returns normalized show metadata and newest-first episodes including stable IDs, duration in minutes and seconds, dates, episode/season/type/explicit fields, webpage/audio/provider URLs, and feed provenance. Feed responses cache for 30 minutes with a one-hour stale-while-revalidate window.

Artwork uses episode artwork first, then show artwork, then the stable local Podstack SVG. The UI retains aspect ratio, never recolours artwork, and replaces failed images through `onError`. Media is neither downloaded nor stored. RSS episode webpages are labelled **Open episode page**; Apple destinations are **Open in Apple Podcasts**. Prototype Spotify URLs are search fallbacks and are labelled **Search in Spotify**, never as direct episode links.

Real RSS episodes can be assigned to a chosen stack day, next week, or saved for later. They use the same normalized shape and localStorage state as prototype episodes, so Today and weekly views survive refreshes. Ready-made stacks now fetch current publisher RSS episodes; the local sample catalogue is used only after an explicit fallback choice.

## Matching and listening days

Selected days are stored as booleans. Legacy duration strings and objects migrate to selected-day booleans and are not written back as preferences. Episode duration is displayed only when publishers provide it and never affects ranking. Real feeds are sorted newest-first and never receive fabricated dates.

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

## Phase 2: real stack generation

Podstack now starts custom setup with **podcast selection**: people can select keyboard-accessible cards from “Popular in Canada,” search Apple's Canadian podcast directory, remove favourites, or choose “Skip, surprise me.” Listening days are simple booleans; legacy duration strings/objects are discarded during localStorage migration. Duration from RSS remains informational and is never a recommendation input.

`GET /api/podcasts/charts?country=ca&limit=10` reads Apple’s server-side RSS Marketing Tools Top Podcasts JSON chart (`rss.marketingtools.apple.com/api/v2/ca/podcasts/top/10/podcasts.json`). Chart parsing is isolated in `api/_lib/appleCharts.js`; responses are validated, capped at 512 KiB, and time out after seven seconds. Vercel caches successful responses for three hours (`s-maxage=10800`) and may serve stale data for another six (`stale-while-revalidate=21600`). The chart does not contain RSS URLs, so the endpoint resolves chart IDs in one Apple Lookup request. Apple may change or retire this external chart schema.

If the chart fails, the shared browser service returns a clearly marked curated list (Crime Junkie, Dateline NBC, and The Daily); search and skipping remain available. The same service is available to onboarding and Discover, avoiding chart-fetch duplication.

Building a custom or ready-made stack combines selected favourites with cautious interest-mapped curated sources, retrieves up to 15 recent items per publisher through the existing protected Vercel RSS function, normalizes/deduplicates them, tolerates partial failures, then scores by favourite, interest, recency, selection mode and optional metadata—not length. Current stack, alternates, favourites, saved episodes, catalogue timestamp, and RSS-versus-fallback state persist locally. If every feed fails, the UI explicitly offers **Try again** or **Use sample stack**; samples are labelled fallback content.

Direct publisher episode pages and Apple Podcast links are used when supplied. Spotify OAuth, credentials and playback are intentionally out of scope. A future phase can match genuine direct Spotify episode URLs; until then, Podstack must only offer an accurately labelled Spotify search rather than claiming a direct episode link.
