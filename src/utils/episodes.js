export const FLEXIBILITY_MINUTES = { close: 10, balanced: 25, flexible: 45 }

export function parseDuration(value) {
  if (value == null || value === '') return { durationSeconds: null, durationMinutes: null }
  if (typeof value === 'number' && Number.isFinite(value)) return { durationSeconds: Math.round(value), durationMinutes: Math.round(value / 60) }
  const text = String(value).trim()
  let seconds
  if (/^\d+$/.test(text)) seconds = Number(text)
  else if (/^\d{1,3}:\d{1,2}(?::\d{1,2})?$/.test(text)) {
    const parts = text.split(':').map(Number)
    seconds = parts.length === 3 ? parts[0] * 3600 + parts[1] * 60 + parts[2] : parts[0] * 60 + parts[1]
  }
  return Number.isFinite(seconds) ? { durationSeconds: seconds, durationMinutes: Math.round(seconds / 60) } : { durationSeconds: null, durationMinutes: null }
}

export function normalizeDurationPreference(value) {
  if (value && typeof value === 'object') return { targetMinutes: Math.max(5, Number(value.targetMinutes) || 60), flexibility: FLEXIBILITY_MINUTES[value.flexibility] ? value.flexibility : 'balanced' }
  const numbers = String(value || '').match(/\d+/g)?.map(Number) || []
  return { targetMinutes: numbers.length > 1 ? Math.round((numbers[0] + numbers[1]) / 2) : numbers[0] || 60, flexibility: 'balanced' }
}

export function sortEpisodesNewestFirst(episodes = []) {
  return [...episodes].sort((a, b) => (Date.parse(b.releaseDate) || 0) - (Date.parse(a.releaseDate) || 0))
}
export const findLatestEpisode = episodes => sortEpisodesNewestFirst(episodes).find(item => Date.parse(item.releaseDate)) || episodes[0] || null

export function scoreEpisodeForSlot(episode, _slot = {}, preferences = {}) {
  void _slot
  let score = 0
  const interests = preferences.interests || []
  score += (episode.interests || []).filter(x => interests.includes(x)).length * 35
  if (preferences.styles?.includes(episode.format)) score += 15
  if (preferences.tones?.includes(episode.tone)) score += 12
  if (preferences.depths?.includes(episode.depth)) score += 12
  if (Date.now() - Date.parse(episode.releaseDate) < 30 * 864e5) score += 12
  if (episode.isSerialized && preferences.episodeSelection === 'Start from the beginning' && Number(episode.episodeNumber) === 1) score += 18
  return score
}
export function chooseEpisodeForSlot(episodes, slot, preferences) { return [...episodes].sort((a,b)=>scoreEpisodeForSlot(b,slot,preferences)-scoreEpisodeForSlot(a,slot,preferences))[0] || null }
