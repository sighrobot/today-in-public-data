const { get } = require('lodash')
const moment = require('moment')

module.exports = {
  nyc_311_nypd: {
    name: 'NYC 311 NYPD',
    web: 'https://api.opencorporates.com/documentation/API-Reference',
    baseUrl: 'https://data.cityofnewyork.us/resource/erm2-nwe9.json',
    query: [{ name: '$limit', value: 2000 }],
    dateFields: [
      {
        name: '$where',
        value: d => {
          const m = moment(d)
          const after = m.format().slice(0, 10)
          const before = m
            .add(1, 'days')
            .format()
            .slice(0, 10)

          return `created_date between '${after}T00:00:00.000' and '${before}T00:00:00.000' and agency like '%25NYPD%25'`
        },
      },
    ],
    get: {
      collection: data => data,
      title: item => get(item, 'descriptor') || get(item, 'complaint_type'),
      url: item =>
        `https://data.cityofnewyork.us/Social-Services/311-Service-Requests-from-2010-to-Present/erm2-nwe9/data?q=${get(
          item,
          'unique_key'
        )}`,
      time: item => get(item, 'created_date'),
      count: collection => get(collection, 'length', 0),
    },
  },
}
