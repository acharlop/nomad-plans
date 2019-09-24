import addDays from 'date-fns/addDays'
import formatDistanceStrict from 'date-fns/formatDistanceStrict'

export const dateDistance = (start, end) => {
  if (!start || !end) return ''

  const fakeEnd = addDays(new Date(end), 1)
  return formatDistanceStrict(new Date(start), fakeEnd)
}
