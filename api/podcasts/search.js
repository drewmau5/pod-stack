export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed.' })
  const term = String(req.query.term || '').trim().replace(/[\u0000-\u001f]/g, '')
  if (term.length < 2 || term.length > 100) return res.status(400).json({ error: 'Search term must be between 2 and 100 characters.' })
  const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), 7000)
  try {
    const params = new URLSearchParams({ term, media: 'podcast', entity: 'podcast', country: 'CA', limit: '10' })
    const response = await fetch(`https://itunes.apple.com/search?${params}`, { signal: controller.signal })
    if (!response.ok) throw new Error('Apple podcast search is temporarily unavailable.')
    const data = await response.json()
    const podcasts = (data.results || []).map(x => ({ id: String(x.collectionId), title: x.collectionName, author: x.artistName, artworkUrl: x.artworkUrl600 || x.artworkUrl100 || null, genres: x.genres || [], appleUrl: x.collectionViewUrl || null, feedUrl: x.feedUrl || null, ...(Number.isFinite(x.trackCount) ? { episodeCount: x.trackCount } : {}) }))
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=900')
    return res.status(200).json({ podcasts })
  } catch (error) { return res.status(error.name === 'AbortError' ? 504 : 502).json({ error: error.name === 'AbortError' ? 'Apple podcast search timed out.' : error.message }) }
  finally { clearTimeout(timer) }
}
