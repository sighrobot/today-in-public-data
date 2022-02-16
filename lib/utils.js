import moment from 'moment'
import request from 'superagent'

export const getISO = d => d.toISOString().slice(0, 10)

export const fetchData = (date, sources = [], board) => {
  let url = `/api/data?date=${moment(date)
    .format()
    .slice(0, 10)}&board=${board}`

  if (sources.length > 0) {
    url += `&sources=${sources.join(',')}`
  }

  return request(url)
}

// export const normalizeCommunityBoard = (b) => {
//   if (parseInt(b, 10)) {
//     return b;
//   }

//   // normalization failure
//   return b
// }
