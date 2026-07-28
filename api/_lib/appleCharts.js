const CHART_BASE = 'https://rss.marketingtools.apple.com/api/v2'
export const MAX_CHART_BYTES = 512 * 1024

const text = value => typeof value === 'string' ? value.trim() : ''
export function normalizeChart(payload, country = 'ca', limit = 10, updatedAt = new Date().toISOString()) {
  const rows = payload?.feed?.results
  if (!Array.isArray(rows)) throw new Error('Apple chart returned an unexpected response.')
  return rows.slice(0, Math.min(25, limit)).map((item, index) => ({
    rank: index + 1, id: text(item.id), title: text(item.name), author: text(item.artistName),
    artworkUrl: text(item.artworkUrl100) || null, appleUrl: text(item.url) || null, feedUrl: null,
    genres: Array.isArray(item.genres) ? item.genres.map(x => text(x.name)).filter(Boolean) : [],
    chartCountry: country.toLowerCase(), chartUpdatedAt: updatedAt, source: 'apple-chart',
  })).filter(item => item.id && item.title && item.appleUrl)
}

export function chartUrl(country = 'ca', limit = 10) {
  return `${CHART_BASE}/${encodeURIComponent(country.toLowerCase())}/podcasts/top/${Math.min(25, limit)}/podcasts.json`
}
