export const PODSTACK_ARTWORK_FALLBACK = '/podstack-artwork.svg'

const blockedLocalArtwork = /^\/sample-artwork\//i
const tinySignals = /(?:^|[?&/_-])(?:1x1|pixel|spacer|transparent)(?:[?&/_.-]|$)/i

export function isUsableArtworkUrl(value, { allowFallback = true } = {}) {
  if (typeof value !== 'string' || !value.trim()) return false
  const url = value.trim()
  if (url === PODSTACK_ARTWORK_FALLBACK) return allowFallback
  if (blockedLocalArtwork.test(url) || tinySignals.test(url)) return false
  try { return ['http:', 'https:'].includes(new URL(url).protocol) } catch { return false }
}

export function normalizeFeedUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return null
  try {
    const url = new URL(value.trim())
    if (!['http:', 'https:'].includes(url.protocol)) return null
    url.protocol = url.protocol.toLowerCase()
    url.hostname = url.hostname.toLowerCase()
    if ((url.protocol === 'https:' && url.port === '443') || (url.protocol === 'http:' && url.port === '80')) url.port = ''
    if (url.pathname.length > 1) url.pathname = url.pathname.replace(/\/+$/, '')
    url.hash = ''
    return url.toString()
  } catch { return null }
}

const text = value => value == null ? null : String(value).trim() || null
const valid = value => isUsableArtworkUrl(value, { allowFallback: false }) ? value.trim() : null
const sameId = (a, b) => text(a) && text(b) && text(a) === text(b)

function appleArtwork(item) {
  const url = valid(item.appleShowArtworkUrl || item.appleArtworkUrl)
  if (!url || !text(item.appleCollectionId)) return null
  const artworkId = item.appleArtworkCollectionId
  return artworkId == null || sameId(artworkId, item.appleCollectionId) ? url : null
}

export function resolveShowArtwork(item = {}) {
  const apple = appleArtwork(item)
  if (apple) return { url: apple, source: 'apple-show' }
  const rss = valid(item.rssShowArtworkUrl)
  if (rss) return { url: rss, source: 'rss-channel' }
  const canonical = valid(item.showArtworkUrl)
  const canonicalMatches = item.showArtworkIdentityKey && item.showArtworkIdentityKey === artworkIdentityKey(item)
  if (canonical && canonicalMatches) return { url: canonical, source: item.showArtworkSource || 'canonical-show' }
  const index = valid(item.podcastIndexArtworkUrl)
  if (index) return { url: index, source: 'podcast-index' }
  return { url: PODSTACK_ARTWORK_FALLBACK, source: 'podstack-fallback' }
}

export function resolveEpisodeArtwork(item = {}) {
  const episode = valid(item.episodeArtworkUrl)
  if (episode) return { url: episode, source: 'rss-episode' }
  return resolveShowArtwork(item)
}

export function artworkIdentityKey(item = {}) {
  if (text(item.podcastGuid)) return `guid:${text(item.podcastGuid)}`
  if (text(item.appleCollectionId)) return `apple:${text(item.appleCollectionId)}`
  const feed = normalizeFeedUrl(item.feedUrl)
  if (feed) return `feed:${feed}`
  if (text(item.podcastId || item.id)) return `podcast:${text(item.podcastId || item.id)}`
  const title = text(item.podcastName || item.title)?.toLocaleLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
  const publisher = text(item.podcastAuthor || item.author)?.toLocaleLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
  return title ? `text:${title}|${publisher || ''}` : null
}

export function normalizeArtworkFields(item = {}, { kind } = {}) {
  const episode = kind === 'episode' || Boolean(item.episodeTitle || item.episodeArtworkUrl)
  const appleCollectionId = text(item.appleCollectionId || (item.source?.startsWith?.('apple') ? item.id : null))
  const podcastId = text(item.podcastId || (!episode ? item.id : null))
  const base = { ...item, podcastId, podcastGuid: text(item.podcastGuid), appleCollectionId, feedUrl: normalizeFeedUrl(item.feedUrl), episodeArtworkUrl: valid(item.episodeArtworkUrl) }
  // Legacy artwork is admitted only when its origin is known; it never outranks explicit canonical fields.
  if (!base.appleShowArtworkUrl && item.source?.startsWith?.('apple')) base.appleShowArtworkUrl = valid(item.artworkUrl)
  if (!base.rssShowArtworkUrl && item.artworkSource === 'rss-channel') base.rssShowArtworkUrl = valid(item.showArtworkUrl)
  if (!base.showArtworkUrl) base.showArtworkUrl = appleArtwork(base) || valid(base.rssShowArtworkUrl) || valid(item.showArtworkUrl)
  if (!base.showArtworkIdentityKey && base.showArtworkUrl) base.showArtworkIdentityKey = artworkIdentityKey(base)
  const selected = episode ? resolveEpisodeArtwork(base) : resolveShowArtwork(base)
  return { ...base, displayArtworkUrl: selected.url, artworkSource: selected.source }
}

export function nextArtworkAfterError(fallbackUsed = false) {
  return fallbackUsed ? null : { displayArtworkUrl: PODSTACK_ARTWORK_FALLBACK, artworkSource: 'podstack-fallback', fallbackUsed: true }
}
