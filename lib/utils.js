import moment from 'moment'
import request from 'superagent'

export const getISO = d => d.toISOString().slice(0, 10)

const OC_BASE = 'https://api.opencorporates.com/v0.4/companies/search'
const EMPTY_Q = '&nbsp;*'

export const fetchData = (date, sources = []) => {
  let url = `/data?date=${moment(date)
    .format()
    .slice(0, 10)}`

  if (sources.length > 0) {
    url += `&sources=${sources.join(',')}`
  }

  return request(url)
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
