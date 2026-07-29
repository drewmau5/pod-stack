# PodStack brand asset inventory

All files in this directory are original, lightweight SVG assets created for the PodStack editorial formulation system. They contain no embedded raster images or fonts.

| Asset | Purpose | Decorative? | Used on |
| --- | --- | --- | --- |
| `podstack-mark.svg` | Overlapping-sheet brand mark | No | rail, mobile wordmark, formulation label |
| `listening-formulated-stamp.svg` | Restrained circular listening stamp | Yes | hero collage |
| `formulation-house-stamp.svg` | Alternate rectangular house stamp | Yes | reusable asset kit (not repeated on homepage) |
| `barcode-strip.svg` | Catalogue indexing motif | Yes | formulation label |
| `catalogue-strip.svg` | Vertical formulation catalogue strip | Yes | reusable asset kit |
| `registration-marks.svg` | Print-registration detail | Yes | hero collage |
| `paper-noise.svg` | Very low-opacity paper fibre texture | Yes | global paper surface |
| `abstract-cover-01.svg`–`04.svg` | Intentionally abstract fallback covers (not fictional podcast artwork) | Yes | static homepage example and curated cards |

## Sample artwork audit

The four pre-existing files in `public/sample-artwork/` are stylised SVG placeholders rather than verified publisher artwork. They remain available for compatibility, but the signed-out homepage does not feature them. Dynamic search, Popular in Canada, RSS episode views, and generated stacks continue to render real artwork supplied by Apple and publishers.

## Artwork diagnostics

All show and episode images render through the shared `Artwork` component and `src/utils/artwork.js`. In development, set `VITE_ARTWORK_DEBUG=true` or set the local storage key `podstack:artwork-debug` to `true`; hovering artwork then exposes its podcast identity, selected URL, source, and fallback status. Diagnostic attributes and titles are omitted from normal production output.
