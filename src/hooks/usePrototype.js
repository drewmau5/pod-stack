import { useEffect, useState } from 'react'
import { clearStoredState, loadState, STORAGE_KEY } from '../utils/persistence'
import { patchState, swapState, undoState, updateStatusState } from '../utils/prototypeState'

export function usePrototype() {
  const [state, setState] = useState(() => loadState())

  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(state)), [state])

  const patch = value => setState(current => patchState(current, value))
  const updateStatus = (slotId, status) => setState(current => updateStatusState(current, slotId, status))
  const swap = (slotId, episode) => setState(current => swapState(current, slotId, episode))
  const undo = () => setState(undoState)
  const reset = () => setState(clearStoredState())

  return { state, patch, updateStatus, swap, undo, reset }
}
