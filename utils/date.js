import addDays from 'date-fns/addDays'
import formatDistance from 'date-fns/formatDistance'

export const dateDistance = (start, end) => {
  if (!start || !end) return ''

  const fakeEnd = addDays(new Date(end), 1)
  return formatDistance(new Date(start), fakeEnd)
}
