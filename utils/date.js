import addDays from 'date-fns/addDays'
import formatDistanceStrict from 'date-fns/formatDistanceStrict'
import differenceInMonths from 'date-fns/differenceInMonths'
import differenceInWeeks from 'date-fns/differenceInWeeks'
import DFNisWithinInterval from 'date-fns/isWithinInterval'
import { minTime, maxTime } from 'date-fns/constants'
import lightFormat from 'date-fns/lightFormat'
import DFNformat from 'date-fns/format'

// TODO [structure] split each function into it's own file

export const formatDistance = (start, end) => {
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

export const dayInPlan = (day, plan) => {
  const { startAt, endAt } = plan

  return !day || !startAt || !endAt
    ? false
    : DFNisWithinInterval(new Date(day), {
        start: new Date(startAt),
        end: new Date(endAt),
      })
}

export const isWithinInterval = (day, range) => {
  return DFNisWithinInterval(new Date(day), {
    start: new Date(range.startAt),
    end: new Date(range.endAt),
  })
}

export const isWithinAnyInterval = (day, ranges = []) => {
  return ranges.some((range) => isWithinInterval(day, range))
}

export const intervalContainingDate = (ranges = [], day) => {
  let interval = { startAfter: '', endBefore: '' }

  // check for present ranges
  if (!ranges.length) return interval

  // constants
  const max = new Date(maxTime)
  const min = new Date(minTime)
  const date = new Date(day)

  // build array of valid ranges
  const validRanges = [{ start: '', end: max }]
  ranges.forEach((range) => {
    validRanges[validRanges.length - 1].start = new Date(range.endAt)
    validRanges.push({ start: '', end: new Date(range.startAt) })
  })
  validRanges[validRanges.length - 1].start = min

  // find range
  validRanges.some((range) => {
    if (DFNisWithinInterval(date, range)) {
      interval = { startAfter: range.start, endBefore: range.end }
      return true
    }
    return false
  })

  let { startAfter, endBefore } = interval

  startAfter =
    !startAfter || startAfter === min
      ? ''
      : lightFormat(startAfter, 'yyyy-MM-dd')

  endBefore =
    !endBefore || endBefore === max ? '' : lightFormat(endBefore, 'yyyy-MM-dd')

  return { startAfter, endBefore }
}

export const formatDate = (date = '', dateFormat = 'MMM dd, yyyy') => {
  if (date && dateFormat) {
    return DFNformat(new Date(date), dateFormat)
  }

  return ''
}
