// Prototype-only catalogue. URLs intentionally point to public podcast pages; production will store verified deep links and fallbacks.
export const services = ['Spotify', 'Apple Podcasts', 'YouTube Music', 'Pocket Casts', 'Other']
export const genres = ['True Crime', 'News', 'Comedy', 'History', 'Science', 'Society and Culture', 'Technology', 'Sports', 'Business', 'Documentary', 'Interviews']

const links = (slug) => ({
  Spotify: `https://open.spotify.com/search/${encodeURIComponent(slug)}`,
  'Apple Podcasts': `https://podcasts.apple.com/us/search?term=${encodeURIComponent(slug)}`,
  'YouTube Music': `https://music.youtube.com/search?q=${encodeURIComponent(slug)}`,
  'Pocket Casts': `https://pca.st/search/${encodeURIComponent(slug)}`,
  general: `https://podcasts.apple.com/us/search?term=${encodeURIComponent(slug)}`,
})

export const initialWindows = [
  { id: 'mon', day: 'Monday', date: '28', context: 'Morning commute', time: '8:10 AM', duration: 55 },
  { id: 'tue', day: 'Tuesday', date: '29', context: 'Workout', time: '6:00 PM', duration: 60 },
  { id: 'wed', day: 'Wednesday', date: '30', context: 'Lunch walk', time: '12:30 PM', duration: 35 },
  { id: 'thu', day: 'Thursday', date: '31', context: 'Drive home', time: '4:00 PM', duration: 45 },
  { id: 'fri', day: 'Friday', date: '1', context: 'Morning reset', time: '8:30 AM', duration: 45 },
]

const catalogue = [
  ['Crime Junkie', 'MYSTERIOUS DEATH OF: Bethany Decker', 52, 'Fits your commute', 'New release', 'CJ'],
  ['Dateline NBC', 'The Good Soldier', 54, 'Matches your taste', 'Fits your workout', 'DN'],
  ['Science Vs', 'The Science of Better Sleep', 32, 'Within your preferred length', 'New this week', 'SV'],
  ['Anatomy of Murder', 'The Last Ride Home', 42, 'Similar to Dateline', 'Not previously played', 'AM'],
  ['The Daily', 'The New Space Race', 39, 'Matches your usual Friday routine', 'Chosen for you', 'TD'],
  ['99% Invisible', 'The Lost Subways of North America', 44, 'Popular with listeners like you', 'Fits an open spot', '99'],
  ['The Journal.', 'How AI Is Changing the Office', 31, 'Matches your taste', 'New this week', 'TJ'],
]

export const buildStack = (windows = initialWindows, offset = 0) => windows.map((window, index) => {
  const ep = catalogue[(index + offset) % catalogue.length]
  return { ...window, id: `${window.id}-${ep[1]}`, show: ep[0], title: ep[1], episodeDuration: ep[2], reasons: [ep[3], ep[4]], art: ep[5], status: 'planned', links: links(`${ep[0]} ${ep[1]}`) }
})

export const discoveries = buildStack(initialWindows.slice(0, 4), 3).map((item, index) => ({ ...item, id: `discover-${index}`, reasons: [item.reasons[0], ['Fits your commute', 'Popular with listeners like you', 'New this week', 'Similar to a favourite show'][index]] }))

export const defaultState = {
  onboardingComplete: false, prototypeSignedIn: false, name: 'Andrew', email: '', service: 'Spotify',
  windows: initialWindows, preferences: { genres: ['True Crime', 'News'], shows: ['Crime Junkie', 'Dateline NBC'], topics: ['Investigations'], formats: ['Documentary', 'Interviews'], rules: { newReleases: true, explicit: false, newShows: true, serialized: false, heard: true, min: 20, max: 60 }, exclusions: [] },
  stack: buildStack(), saved: [], nextWeek: [],
}
