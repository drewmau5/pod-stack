export const patchState = (state, value) => ({ ...state, ...value })

export const updateStatusState = (state, slotId, status) => ({
  ...state,
  stack: state.stack.map(item => item.slotId === slotId ? { ...item, status } : item),
  [status]: [...(state[status] || []), slotId],
})

export function swapState(state, slotId, episode) {
  const old = state.stack.find(item => item.slotId === slotId)
  if (!old) return state
  const next = { ...episode, slotId, day: old.day, window: old.window, status: 'planned' }
  return {
    ...state,
    stack: state.stack.map(item => item.slotId === slotId ? next : item),
    alternates: [old, ...state.alternates.filter(item => item.id !== episode.id)],
    swaps: [...state.swaps, { slotId, from: old, to: next }],
  }
}

export function undoState(state) {
  const action = state.swaps.at(-1)
  if (!action) return state
  return {
    ...state,
    stack: state.stack.map(item => item.slotId === action.slotId ? action.from : item),
    alternates: state.alternates.filter(item => item.id !== action.from.id).concat(action.to),
    swaps: state.swaps.slice(0, -1),
  }
}
