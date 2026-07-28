import { normalizeFeed, parser, validateFeedUrl } from '../_lib/feed.js'
const MAX_BYTES = 5 * 1024 * 1024
export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed.' })
  const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), 10000)
  try {
    const url = await validateFeedUrl(String(req.query.url || ''))
    const response = await fetch(url, { signal: controller.signal, headers: { Accept: 'application/rss+xml, application/xml, text/xml;q=0.9' }, redirect: 'follow' })
    if (!response.ok) return res.status(502).json({ error: `The RSS host returned ${response.status}.` })
    if (Number(response.headers.get('content-length')) > MAX_BYTES) return res.status(413).json({ error: 'RSS feed is too large.' })
    const reader = response.body.getReader(); let size = 0; const chunks = []
    while (true) { const {done,value}=await reader.read(); if(done)break; size+=value.length; if(size>MAX_BYTES){controller.abort();return res.status(413).json({error:'RSS feed is too large.'})} chunks.push(value) }
    const xml = new TextDecoder().decode(Buffer.concat(chunks))
    const parsed = await parser.parseString(xml)
    const result = normalizeFeed(parsed, url.toString())
    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600')
    return res.status(200).json(result)
  } catch (error) { const client = /valid|required|public|Local|private-network|supported/.test(error.message); return res.status(client ? 400 : error.name === 'AbortError' ? 504 : 422).json({ error: client ? error.message : error.name === 'AbortError' ? 'RSS request timed out.' : 'The RSS feed could not be parsed.' }) }
  finally { clearTimeout(timer) }
}
