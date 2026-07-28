import { days } from '../data/mockData.js'

export const localDayIndex = (date = new Date()) => (date.getDay() + 6) % 7

export function daysFromToday(date = new Date()) {
  const index = localDayIndex(date)
  return [...days.slice(index), ...days.slice(0, index)]
}

export function visibleStackDays(stack = [], { date = new Date(), showOpenDays = false } = {}) {
  const ordered = daysFromToday(date)
  const today = ordered[0]
  const byDay = new Map(stack.map(item => [item.day, item]))
  const active = ordered.filter(day => byDay.has(day) && !['listened', 'skipped'].includes(byDay.get(day).status))
  const completed = ordered.filter(day => byDay.has(day) && ['listened', 'skipped'].includes(byDay.get(day).status))
  const open = ordered.filter(day => !byDay.has(day))
  const result = [today, ...active.filter(day => day !== today), ...completed.filter(day => day !== today)]
  if (showOpenDays) result.push(...open.filter(day => day !== today))
  return [...new Set(result)]
}
