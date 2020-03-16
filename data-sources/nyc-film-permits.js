const { get } = require('lodash')
const moment = require('moment')

module.exports = {
  nyc_film_permits: {
    name: 'NYC Film Permits',
    web: 'https://api.opencorporates.com/documentation/API-Reference',
    baseUrl: 'https://data.cityofnewyork.us/resource/tg4x-b46p.json',
    query: [],
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

          return `startdatetime between '${after}T00:00:00.000' and '${before}T00:00:00.000'`
        },
      },
    ],
    get: {
      collection: data => data,
      title: item => `${get(item, 'parkingheld')}`,
      url: () =>
        'https://data.cityofnewyork.us/Social-Services/311-Service-Requests-from-2010-to-Present/erm2-nwe9/data',
      time: item => get(item, 'startdatetime'),
      count: collection => get(collection, 'length', 0),
    },
  },
}
