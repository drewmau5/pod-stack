import { chartUrl, MAX_CHART_BYTES, normalizeChart } from '../_lib/appleCharts.js'

async function limitedJson(response) {
  if (Number(response.headers.get('content-length')) > MAX_CHART_BYTES) throw new Error('Apple chart response is too large.')
  const reader = response.body.getReader(); const chunks = []; let size = 0
  while (true) { const { done, value } = await reader.read(); if (done) break; size += value.length; if (size > MAX_CHART_BYTES) throw new Error('Apple chart response is too large.'); chunks.push(value) }
  return JSON.parse(new TextDecoder().decode(Buffer.concat(chunks)))
}
export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed.' })
  const country = String(req.query.country || 'ca').toLowerCase(); const limit = Math.max(1, Math.min(10, Number(req.query.limit) || 10))
  if (!/^[a-z]{2}$/.test(country)) return res.status(400).json({ error: 'A two-letter country code is required.' })
  const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), 7000)
  try {
    const response = await fetch(chartUrl(country, limit), { signal: controller.signal, headers: { Accept: 'application/json' } })
    if (!response.ok) throw new Error(`Apple chart returned ${response.status}.`)
    const podcasts = normalizeChart(await limitedJson(response), country, limit)
    if (!podcasts.length) throw new Error('Apple chart contained no usable podcasts.')
    // Apple's chart omits RSS URLs. Resolve them in one server-side lookup request.
    const lookup = await fetch(`https://itunes.apple.com/lookup?id=${podcasts.map(x => x.id).join(',')}&entity=podcast&country=${country}`, { signal: controller.signal })
    if (lookup.ok) { const data=await lookup.json(); const byId=new Map((data.results||[]).map(x=>[String(x.collectionId),x])); podcasts.forEach(p=>{const x=byId.get(p.appleCollectionId);if(x){p.feedUrl=x.feedUrl||null;p.genres=x.genres||p.genres;p.appleShowArtworkUrl=x.artworkUrl600||p.appleShowArtworkUrl;p.showArtworkUrl=p.appleShowArtworkUrl;p.appleArtworkCollectionId=p.appleCollectionId}}) }
    res.setHeader('Cache-Control', 's-maxage=10800, stale-while-revalidate=21600')
    return res.status(200).json({ podcasts, source: 'apple-chart' })
  } catch (error) { return res.status(error.name === 'AbortError' ? 504 : 502).json({ error: error.name === 'AbortError' ? 'Apple chart request timed out.' : error.message }) }
  finally { clearTimeout(timer) }
}
