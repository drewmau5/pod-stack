import { findLatestEpisode, sortEpisodesNewestFirst } from '../utils/episodes.js'

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
  return (data.podcasts || []).map(show => ({ ...show, source: 'apple-search', artworkUrl: show.artworkUrl || FALLBACK_ARTWORK }))
}
export const fallbackPopularPodcasts = [
  {id:'1322200189',title:'Crime Junkie',author:'audiochuck',feedUrl:'https://feeds.megaphone.fm/ADL9840290619',appleUrl:'https://podcasts.apple.com/ca/podcast/crime-junkie/id1322200189',genres:['True Crime'],source:'curated-fallback'},
  {id:'1464919521',title:'Dateline NBC',author:'NBC News',feedUrl:'https://podcastfeeds.nbcnews.com/dateline-nbc',appleUrl:'https://podcasts.apple.com/ca/podcast/dateline-nbc/id1464919521',genres:['True Crime','News'],source:'curated-fallback'},
  {id:'1200361736',title:'The Daily',author:'The New York Times',feedUrl:'https://feeds.simplecast.com/54nAGcIl',appleUrl:'https://podcasts.apple.com/ca/podcast/the-daily/id1200361736',genres:['News'],source:'curated-fallback'},
].map(x=>({...x,artworkUrl:FALLBACK_ARTWORK,chartCountry:'ca'}))
export async function fetchPopularPodcasts({country='ca',limit=10}={}) {
  try { const data=await request(`/api/podcasts/charts?country=${encodeURIComponent(country)}&limit=${limit}`); return {podcasts:(data.podcasts||[]).map(x=>({...x,artworkUrl:x.artworkUrl||FALLBACK_ARTWORK})),source:data.source||'apple-chart',isFallback:false} }
  catch (error) { return {podcasts:fallbackPopularPodcasts.slice(0,limit),source:'curated-fallback',isFallback:true,error:error.message} }
}
export async function fetchPodcastFeed(feedUrl) {
  const data = await request(`/api/podcasts/feed?url=${encodeURIComponent(feedUrl)}`)
  return { ...data, episodes: sortEpisodesNewestFirst(data.episodes || []).map(ep => ({ ...ep, artworkUrl: ep.episodeArtworkUrl || ep.artworkUrl || FALLBACK_ARTWORK })) }
}
export async function fetchLatestEpisodes(feedUrl) { const data = await fetchPodcastFeed(feedUrl); return { ...data, latestEpisode: findLatestEpisode(data.episodes) } }
