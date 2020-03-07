const { get } = require('lodash')
const moment = require('moment')

module.exports = {
  nyc_events: {
    name: 'NYC Permitted Events',
    web: 'https://api.opencorporates.com/documentation/API-Reference',
    baseUrl: 'https://data.cityofnewyork.us/resource/tvpp-9vvx.json',
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

          return `start_date_time between '${after}T00:00:00.000' and '${before}T00:00:00.000' and event_type not like 'Sport%25'`
        },
      },
    ],
    get: {
      collection: data => data,
      title: item => get(item, 'event_name'),
      url: () =>
        'https://data.cityofnewyork.us/Social-Services/311-Service-Requests-from-2010-to-Present/erm2-nwe9/data',
      time: item => get(item, 'start_date_time'),
      count: collection => get(collection, 'length', 0),
    },
  },
}
