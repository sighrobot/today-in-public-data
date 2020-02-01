import moment from 'moment'
import request from 'superagent'

export const getISO = d => d.toISOString().slice(0, 10)

const OC_BASE = 'https://api.opencorporates.com/v0.4/companies/search'
const EMPTY_Q = '&nbsp;*'

export const fetchData = date => {
  return request(
    `/data?date=${moment(date)
      .format()
      .slice(0, 10)}`
  )
}

export const fetchCountForDateString2 = async d => {
  const m = moment(d)
  const isoDayBefore = m
    .subtract(1, 'days')
    .format()
    .slice(0, 10)
  const isoDayAfter = m
    .add(2, 'days')
    .format()
    .slice(0, 10)

  const fetched = await fetch(
    `${OC_BASE}?q=${EMPTY_Q}&incorporation_date=${isoDayBefore}:${isoDayAfter}&per_page=1&api_token=${process.env.OPEN_CORPORATES}`
  )
  const json = await fetched.json()

  return json.results.total_count
}

// https://stackoverflow.com/a/32638472/2502505
export const formatNum = function(num, fixed) {
  if (num === null) {
    return null
  } // terminate early
  if (num === 0) {
    return '0'
  } // terminate early
  fixed = !fixed || fixed < 0 ? 0 : fixed // number of decimal places to show
  var b = num.toPrecision(2).split('e'), // get power
    k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
    c =
      k < 1
        ? num.toFixed(0 + fixed)
        : (num / Math.pow(10, k * 3)).toFixed(1 + fixed), // divide by power
    d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
    e = d + ['', 'K', 'M', 'B', 'T'][k] // append power
  return e
}

export const getNumDaysPerSide = () => {
  return 1
  const w = global.innerWidth

  if (w < 450) {
    return 1
  }
  if (w < 600) {
    return 2
  }
  if (w < 960) {
    return 3
  }
  if (w < 1200) {
    return 4
  }
  if (w < 1600) {
    return 5
  }
  if (w < 1900) {
    return 6
  }

  return 7
}

export const isToday = d =>
  d && moment(d).diff(moment(new Date()), 'days') === 0
