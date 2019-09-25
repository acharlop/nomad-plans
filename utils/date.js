import addDays from 'date-fns/addDays'
import formatDistanceStrict from 'date-fns/formatDistanceStrict'
import differenceInMonths from 'date-fns/differenceInMonths'
import differenceInWeeks from 'date-fns/differenceInWeeks'

export const dateDistance = (start, end) => {
  if (!start || !end) return ''

  const startDate = new Date(start)
  const fakeEnd = addDays(new Date(end), 1)

  const weeks = differenceInWeeks(fakeEnd, startDate)
  const is2months = differenceInMonths(fakeEnd, startDate) > 1

  if (weeks && !is2months) {
    return `${weeks} week${weeks > 1 ? 's' : ''}`
  }

  const unit = is2months ? 'month' : 'day'

  return formatDistanceStrict(startDate, fakeEnd, { unit })
}
