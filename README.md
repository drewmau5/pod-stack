# podstack

**Your podcast app plays it. Podstack plans it.**

Podstack is a frontend prototype for planning a week of podcast listening before opening a podcast app. It remains a React + Vite application with browser-only persistence; there is no authentication, database, audio player, or podcast API.

## Revised product flow

Users can start in either of two ways:

1. **Ready-made stacks:** Explore eight themed plans, preview the episodes, select one, then adjust days, approximate duration, and preferred listening service in Preferences.
2. **Custom stack:** A compact three-step flow asks for listening days and duration windows, broad interests, then optional preferences. Listening style, tone, depth, and episode-selection controls are collapsed disclosures so optional details stay secondary.

The completed experience opens on the weekly plan. It puts the recommendation for the browser's actual local day first, followed by a compact seven-day overview and alternate recommendations. If today is open, it identifies the next scheduled day. Week boundaries, day names, and the displayed current date are recalculated from `new Date()` on each app load.

## Swapping and weekly planning

- **Desktop:** Alternate cards can be dragged into a weekly day slot. Every card also retains an accessible **Swap in** button.
- **Mobile:** Alternatives form a horizontal swipe carousel. The explicit button and day selector avoid relying on drag-and-drop.
- The replaced episode is returned to the alternate carousel, a confirmation toast appears, and the most recent swap can be undone.
- **Other picks for your stack** is collapsed below the week and provides unused recommendations that can be assigned to any day.
- Listened and skipped statuses, swaps, the current stack, alternates, saved-for-later items, and next-week items persist in `localStorage` under `podstack.prototype.v3`.
- Reset in Preferences clears all locally persisted prototype data.

## Prototype recommendation policy

The local mock catalogue models the intended future policy rather than claiming live recommendations. It prefers a suitable, unplayed, recent episode that fits the selected duration. Recent recurring releases win by default; evergreen interviews may use a strong older match. Older samples are visibly marked **From the archive**. Serialized samples begin at episode one rather than a random middle episode. The user's selection preference—**Keep me current**, start from the beginning, best episodes, or a recent/archive mix—is stored for future ranking integration.

Episode records include podcast and episode names, podcast and episode artwork URLs, duration, release date, description, tags, interests, format, tone, depth, serialization fields, archive status, a general external URL, and Spotify, Apple Podcasts, YouTube Music, and Pocket Casts links.

Artwork and all episode metadata are prototype fixtures, not live data. Public Apple-hosted artwork URLs demonstrate the final presentation, with a neutral local data-URI fallback if an image cannot load. Artwork keeps a square aspect ratio and is not filtered or recoloured.

## Discover and preferences

Discover is intentionally task-oriented: add a sample episode to this week, next week, or save it for later. Preferences can edit every stored day and duration, interests, optional style/tone/depth tags, episode selection mode, and preferred external listening service.

## Future integrations

1. Replace fixtures with a licensed podcast metadata/search provider and refresh release data server-side.
2. Validate show and episode identifiers, artwork rights, publication dates, explicit flags, playable service deep links, and serialized episode order.
3. Add listening-history imports or user-confirmed progress so ranking can exclude played episodes and continue serialized shows safely.
4. Apply the documented ranking policy to live candidates, while retaining archive provenance and transparent selection reasons.
5. A later product phase may add Supabase for accounts, cross-device preferences, stack history, saved episodes, and progress. **Supabase is intentionally not included in this prototype.**

## Development

```bash
npm install
npm run dev
npm run lint
npm run build
```

Vite handles local development and production builds. Existing Vercel rewrites preserve client-side routes such as `/explore`, `/onboarding`, `/today`, `/stack`, `/discover`, and `/profile`.
