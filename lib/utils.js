import moment from 'moment'
import request from 'superagent'

export const getISO = d => d.toISOString().slice(0, 10)

export const fetchData = (date, sources = []) => {
  let url = `/api/data?date=${moment(date)
    .format()
    .slice(0, 10)}`

  if (sources.length > 0) {
    url += `&sources=${sources.join(',')}`
  }

  return request(url)
}
