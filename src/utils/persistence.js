export const STORAGE_KEY = 'podstack.phase2.v1'
export const LEGACY_STORAGE_KEY = 'podstack.prototype.v3'

export const freshState = {
  selectedPodcasts: [],
  selectedDays: { Monday: true, Tuesday: true, Wednesday: true, Thursday: true, Friday: true },
  interests: [],
  styles: [],
  tones: [],
  depths: [],
  episodeSelection: 'Keep me current',
  service: 'Apple Podcasts',
  stack: [],
  alternates: [],
  swaps: [],
  listened: [],
  skipped: [],
  saved: [],
  nextWeek: [],
  favouritePodcasts: [],
  onboardingComplete: false,
  lastCatalogueRefresh: null,
  catalogueSource: null,
}

const arrayFields = [
  'selectedPodcasts',
  'interests',
  'styles',
  'tones',
  'depths',
  'stack',
  'alternates',
  'swaps',
  'listened',
  'skipped',
  'saved',
  'nextWeek',
  'favouritePodcasts',
]

export function createFreshState() {
  return {
    ...freshState,
    selectedDays: { ...freshState.selectedDays },
    ...Object.fromEntries(arrayFields.map(field => [field, [...freshState[field]]])),
  }
}

export function migrateState(value = {}) {
  const saved = value && typeof value === 'object' && !Array.isArray(value) ? value : {}
  const migrated = { ...createFreshState(), ...saved }

  for (const field of arrayFields) {
    migrated[field] = Array.isArray(saved[field]) ? [...saved[field]] : [...freshState[field]]
  }

  const savedDays = saved.selectedDays
  migrated.selectedDays = savedDays && typeof savedDays === 'object' && !Array.isArray(savedDays)
    ? Object.fromEntries(Object.entries(savedDays).filter(([, enabled]) => Boolean(enabled)).map(([day]) => [day, true]))
    : { ...freshState.selectedDays }
  migrated.episodeSelection = typeof saved.episodeSelection === 'string' ? saved.episodeSelection : freshState.episodeSelection
  migrated.service = typeof saved.service === 'string' ? saved.service : freshState.service
  migrated.onboardingComplete = typeof saved.onboardingComplete === 'boolean' ? saved.onboardingComplete : freshState.onboardingComplete
  migrated.lastCatalogueRefresh = typeof saved.lastCatalogueRefresh === 'string' ? saved.lastCatalogueRefresh : null
  migrated.catalogueSource = typeof saved.catalogueSource === 'string' ? saved.catalogueSource : null

  return migrated
}

export function loadState(storage = localStorage) {
  try {
    const stored = storage.getItem(STORAGE_KEY) || storage.getItem(LEGACY_STORAGE_KEY)
    return stored ? migrateState(JSON.parse(stored)) : createFreshState()
  } catch {
    return createFreshState()
  }
}

export function clearStoredState(storage = localStorage) {
  storage.removeItem(STORAGE_KEY)
  storage.removeItem(LEGACY_STORAGE_KEY)
  return createFreshState()
}
