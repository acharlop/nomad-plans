const unsure = 'Unsure'
const maybe = 'Maybe'
const confirmed = 'Confirmed'
const all = [unsure, maybe, confirmed]

export const confirmations = {
  t: {
    unsure,
    maybe,
    confirmed,
    all: [unsure, maybe, confirmed],
  },
  i: {
    '-1': 'UNSURE',
    '0': 'MAYBE',
    '1': 'CONFIRMED',
    all: [-1, 0, 1],
  },
  t2i: (textArray) => textArray.map((t) => all.indexOf(t) - 1),
}
