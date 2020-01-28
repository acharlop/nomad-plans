import addDays from 'date-fns/addDays'
import formatDistanceStrict from 'date-fns/formatDistanceStrict'
import differenceInMonths from 'date-fns/differenceInMonths'
import differenceInWeeks from 'date-fns/differenceInWeeks'
import DFNisWithinInterval from 'date-fns/isWithinInterval'
import DFNareIntervalsOverlapping from 'date-fns/areIntervalsOverlapping'
import DFNformat from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import isSameYear from 'date-fns/isSameYear'

export const DATE_FORMAT_NUMS = 'yyyy-MM-dd'
export const DATE_FORMAT_WORD = 'MMM d, yyyy'

// TODO [structure] split each function into it's own file

export const formatDistance = (start, end) => {
  if (!start || !end) return ''

  const startDate = parseISO(start)
  const fakeEnd = addDays(parseISO(end), 1)

  const weeks = differenceInWeeks(fakeEnd, startDate)
  const is2months = differenceInMonths(fakeEnd, startDate) > 1

  if (weeks && !is2months) {
    return `${weeks} week${weeks > 1 ? 's' : ''}`
  }

  const unit = is2months ? 'month' : 'day'

  return formatDistanceStrict(startDate, fakeEnd, { unit })
}

export const formatRange = (start, end) => {
  const startAt = parseISO(start)
  const endAt = parseISO(end)

  const startFormat = isSameYear(startAt, endAt) ? 'MMM d' : DATE_FORMAT_WORD

  return `${DFNformat(startAt, startFormat)} - ${DFNformat(
    endAt,
    DATE_FORMAT_WORD
  )}`
}

export const dayInPlan = (day, plan) => {
  const { startAt, endAt } = plan

  return !day || !startAt || !endAt
    ? false
    : DFNisWithinInterval(parseISO(day), {
        start: parseISO(startAt),
        end: parseISO(endAt),
      })
}

export const isWithinInterval = (day, range) =>
  DFNisWithinInterval(parseISO(day), {
    start: parseISO(range.startAt),
    end: parseISO(range.endAt),
  })
export const isWithinAnyInterval = (day, ranges = []) => {
  return ranges.some((range) => isWithinInterval(day, range))
}

export const areIntervalsOverlapping = (plan, ranges) => {
  const start = parseISO(plan.startAt)
  const end = parseISO(plan.endAt)

  return ranges.some((range) =>
    DFNareIntervalsOverlapping(
      { start, end },
      { start: parseISO(range.startAt), end: parseISO(range.endAt) }
    )
  )
}

export const formatDate = (date = '', dateFormat = DATE_FORMAT_WORD) => {
  if (date && dateFormat) {
    return DFNformat(parseISO(date), dateFormat)
  }

  return ''
}
