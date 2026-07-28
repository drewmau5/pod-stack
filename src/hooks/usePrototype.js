import { useEffect, useState } from 'react'
import { buildStack, defaultState } from '../data/mockData'

const KEY = 'podstack.prototype.v2'
export function usePrototype() {
  const [state, setState] = useState(() => {
    try { return { ...defaultState, ...JSON.parse(localStorage.getItem(KEY)) } } catch { return defaultState }
  })
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(state)) }, [state])
  const patch = (value) => setState(current => ({ ...current, ...value }))
  const updateItem = (id, change) => patch({ stack: state.stack.map(item => item.id === id ? { ...item, ...change } : item) })
  const swap = (id) => {
    const replacement = buildStack(state.windows, Math.floor(Date.now() / 1000) % 5 + 1).find((_, i) => state.stack[i]?.id === id) || buildStack(state.windows, 2)[0]
    patch({ stack: state.stack.map(item => item.id === id ? { ...replacement, day: item.day, date: item.date, context: item.context, time: item.time, duration: item.duration } : item) })
  }
  const reset = () => { localStorage.removeItem(KEY); setState(defaultState) }
  return { state, patch, updateItem, swap, reset }
}
