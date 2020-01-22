const maybe = 'Maybe'
const confirmed = 'Confirmed'

const all = [maybe, confirmed]
const boolMap = [false, true]

export const confirmations = {
  t: {
    maybe,
    confirmed,
    all: [maybe, confirmed],
  },
  boolMap,
  t2b: (textArray) =>
    textArray
      .map((t) => boolMap[all.indexOf(t)])
      .filter((e) => e !== undefined),
}
