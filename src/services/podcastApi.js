import { findLatestEpisode, sortEpisodesNewestFirst } from '../utils/episodes'

const FALLBACK_ARTWORK = '/podstack-artwork.svg'
async function request(path) {
  const response = await fetch(path, { headers: { Accept: 'application/json' } })
  const body = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(body.error || `Podcast service returned ${response.status}.`)
  return body
}
export async function searchPodcasts(term) {
  const clean = String(term || '').trim()
  if (!clean) return []
  const data = await request(`/api/podcasts/search?term=${encodeURIComponent(clean)}`)
  return (data.podcasts || []).map(show => ({ ...show, artworkUrl: show.artworkUrl || FALLBACK_ARTWORK }))
}
export async function fetchPodcastFeed(feedUrl) {
  const data = await request(`/api/podcasts/feed?url=${encodeURIComponent(feedUrl)}`)
  return { ...data, episodes: sortEpisodesNewestFirst(data.episodes || []).map(ep => ({ ...ep, artworkUrl: ep.episodeArtworkUrl || ep.artworkUrl || FALLBACK_ARTWORK })) }
}
export async function fetchLatestEpisodes(feedUrl) { const data = await fetchPodcastFeed(feedUrl); return { ...data, latestEpisode: findLatestEpisode(data.episodes) } }
