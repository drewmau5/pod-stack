import test from 'node:test'
import assert from 'node:assert/strict'
import {
  clearStoredState,
  createFreshState,
  freshState,
  LEGACY_STORAGE_KEY,
  loadState,
  migrateState,
  STORAGE_KEY,
} from '../src/utils/persistence.js'
import { patchState, swapState, undoState, updateStatusState } from '../src/utils/prototypeState.js'

function storageWith(values = {}) {
  const data = new Map(Object.entries(values))
  return {
    getItem: key => data.get(key) ?? null,
    removeItem: key => data.delete(key),
    setItem: (key, value) => data.set(key, value),
    has: key => data.has(key),
  }
}

test('no stored state produces a fresh, unshared state', () => {
  const first = loadState(storageWith())
  const second = loadState(storageWith())
  assert.deepEqual(first, freshState)
  assert.notStrictEqual(first, freshState)
  assert.notStrictEqual(first.stack, second.stack)
  assert.notStrictEqual(first.selectedDays, second.selectedDays)
})

test('valid current state is loaded before legacy state and migrated', () => {
  const storage = storageWith({
    [STORAGE_KEY]: JSON.stringify({ interests: ['Technology'], service: 'Pocket Casts' }),
    [LEGACY_STORAGE_KEY]: JSON.stringify({ interests: ['Legacy'] }),
  })
  const state = loadState(storage)
  assert.deepEqual(state.interests, ['Technology'])
  assert.equal(state.service, 'Pocket Casts')
})

test('valid legacy state loads and migrates when current state is absent', () => {
  const state = loadState(storageWith({
    [LEGACY_STORAGE_KEY]: JSON.stringify({ selectedDays: { Sunday: '30 minutes' }, saved: [{ id: 'saved' }] }),
  }))
  assert.deepEqual(state.selectedDays, { Sunday: true })
  assert.deepEqual(state.saved, [{ id: 'saved' }])
})

test('malformed stored JSON falls back to a safe fresh state', () => {
  assert.deepEqual(loadState(storageWith({ [STORAGE_KEY]: '{not json' })), freshState)
})

test('migration restores every missing UI field', () => {
  const state = migrateState({ onboardingComplete: true })
  for (const field of ['selectedPodcasts', 'interests', 'styles', 'tones', 'depths', 'stack', 'alternates', 'swaps', 'listened', 'skipped', 'saved', 'nextWeek', 'favouritePodcasts']) {
    assert.ok(Array.isArray(state[field]), `${field} should be an array`)
  }
  assert.equal(typeof state.selectedDays, 'object')
  assert.equal(state.onboardingComplete, true)
  assert.equal(state.episodeSelection, freshState.episodeSelection)
  assert.equal(state.service, freshState.service)
  assert.equal(state.lastCatalogueRefresh, null)
  assert.equal(state.catalogueSource, null)
})

test('migration replaces invalid arrays without sharing freshState arrays', () => {
  const invalid = Object.fromEntries(['selectedPodcasts', 'interests', 'styles', 'tones', 'depths', 'stack', 'alternates', 'swaps', 'listened', 'skipped', 'saved', 'nextWeek', 'favouritePodcasts'].map(field => [field, 'invalid']))
  const state = migrateState(invalid)
  for (const field of Object.keys(invalid)) {
    assert.deepEqual(state[field], [])
    assert.notStrictEqual(state[field], freshState[field])
  }
})

test('migration replaces invalid selectedDays values with a cloned default', () => {
  for (const invalid of [null, [], 'Monday', 42]) {
    const state = migrateState({ selectedDays: invalid })
    assert.deepEqual(state.selectedDays, freshState.selectedDays)
    assert.notStrictEqual(state.selectedDays, freshState.selectedDays)
  }
})

test('reset removes both keys and returns safe unshared fresh state', () => {
  const storage = storageWith({ [STORAGE_KEY]: '{}', [LEGACY_STORAGE_KEY]: '{}' })
  const reset = clearStoredState(storage)
  assert.equal(storage.has(STORAGE_KEY), false)
  assert.equal(storage.has(LEGACY_STORAGE_KEY), false)
  assert.deepEqual(reset, freshState)
  assert.notStrictEqual(reset, freshState)
  assert.notStrictEqual(reset.selectedDays, freshState.selectedDays)
  assert.notStrictEqual(reset.stack, freshState.stack)
})

test('prototype state patch, status, swap, and undo operations remain safe', () => {
  const original = migrateState({
    stack: [{ id: 'old', slotId: 'monday-slot', day: 'Monday', window: true, status: 'planned' }],
    alternates: [{ id: 'new', episodeTitle: 'New episode' }],
  })
  const patched = patchState(original, { service: 'Overcast' })
  const listened = updateStatusState(patched, 'monday-slot', 'listened')
  assert.equal(listened.stack[0].status, 'listened')
  assert.deepEqual(listened.listened, ['monday-slot'])

  const swapped = swapState(listened, 'monday-slot', original.alternates[0])
  assert.equal(swapped.stack[0].id, 'new')
  assert.equal(swapped.swaps.length, 1)

  const undone = undoState(swapped)
  assert.equal(undone.stack[0].id, 'old')
  assert.equal(undone.swaps.length, 0)
})

test('createFreshState cannot mutate the exported fresh state', () => {
  const state = createFreshState()
  state.stack.push({ id: 'changed' })
  state.selectedDays.Monday = false
  assert.deepEqual(freshState.stack, [])
  assert.equal(freshState.selectedDays.Monday, true)
})
