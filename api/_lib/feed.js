import dns from 'node:dns/promises'
import net from 'node:net'
import crypto from 'node:crypto'
import Parser from 'rss-parser'
import { parseDuration, sortEpisodesNewestFirst } from '../../src/utils/episodes.js'

export const FALLBACK_ARTWORK = '/podstack-artwork.svg'
const privateIp = ip => ip === '::1' || ip.startsWith('127.') || ip.startsWith('10.') || ip.startsWith('192.168.') || ip.startsWith('169.254.') || ip.startsWith('0.') || /^172\.(1[6-9]|2\d|3[01])\./.test(ip) || ip.startsWith('fc') || ip.startsWith('fd') || ip.startsWith('fe80')
export async function validateFeedUrl(input, resolve = dns.lookup) {
  let url
  try { url = new URL(input) } catch { throw new Error('A valid RSS feed URL is required.') }
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) throw new Error('Only public HTTP or HTTPS feed URLs are supported.')
  const host = url.hostname.toLowerCase()
  if (host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.local') || net.isIP(host) && privateIp(host)) throw new Error('Local or private-network feed URLs are not allowed.')
  const addresses = await resolve(host, { all: true })
  if (!addresses.length || addresses.some(({ address }) => privateIp(address))) throw new Error('The feed host does not resolve to a public address.')
  return url
}
const clean = value => String(value || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
const id = value => crypto.createHash('sha256').update(String(value)).digest('hex').slice(0, 24)
export function normalizeFeed(parsed, feedUrl) {
  const artworkUrl = parsed.itunes?.image || parsed.image?.url || FALLBACK_ARTWORK
  const show = { id: id(feedUrl), title: parsed.title || 'Untitled podcast', author: parsed.itunes?.author || parsed.creator || '', description: clean(parsed.description), artworkUrl, feedUrl, websiteUrl: parsed.link || null, genres: [parsed.itunes?.categories, parsed.categories].flat(2).filter(Boolean) }
  const episodes = (parsed.items || []).map(item => {
    const duration = parseDuration(item.itunes?.duration)
    const episodeArtworkUrl = item.itunes?.image || null
    const guid = item.guid || item.id || item.link || item.enclosure?.url || `${item.title}-${item.pubDate}`
    return { id: id(`${feedUrl}:${guid}`), guid: String(guid), podcastName: show.title, episodeTitle: item.title || 'Untitled episode', description: clean(item.contentSnippet || item.content || item.summary), artworkUrl: episodeArtworkUrl || artworkUrl || FALLBACK_ARTWORK, episodeArtworkUrl, ...duration, releaseDate: Number.isNaN(Date.parse(item.isoDate || item.pubDate)) ? null : new Date(item.isoDate || item.pubDate).toISOString(), episodeNumber: Number(item.itunes?.episode) || null, seasonNumber: Number(item.itunes?.season) || null, episodeType: item.itunes?.episodeType || null, isExplicit: /^(yes|true|explicit)$/i.test(item.itunes?.explicit || ''), webpageUrl: item.link || null, audioUrl: item.enclosure?.url || null, appleUrl: null, feedUrl, sourceType: 'rss' }
  })
  return { show, episodes: sortEpisodesNewestFirst(episodes) }
}
export const parser = new Parser({ timeout: 8000, maxRedirects: 3, customFields: { item: [['itunes:image','itunesImage',{keepArray:false}], ['itunes:episode','itunesEpisode']] } })
