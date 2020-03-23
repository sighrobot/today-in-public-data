const { get } = require('lodash')
const moment = require('moment')

const { OPEN_CORPORATES_API } = require('./_authParams')

module.exports = {
  open_corporates: {
    name: 'OpenCorporates',
    web: 'https://api.opencorporates.com/documentation/API-Reference',
    baseUrl: 'https://api.opencorporates.com/v0.4/companies/search',
    query: [
      OPEN_CORPORATES_API,
      { name: 'q', value: '&nbsp;*' },
      { name: 'per_page', value: 100 },
    ],
    dateFields: [
      {
        name: 'updated_at',
        value: d => {
          const m = moment(d)
          const after = m.format().slice(0, 10)
          const before = m
            .add(1, 'days')
            .format()
            .slice(0, 10)

          return `${after}:${before}`
        },
      },
    ],
    get: {
      collection: data => get(data, 'results.companies', []),
      title: item => get(item, 'company.name'),
      url: item => get(item, 'company.opencorporates_url'),
      time: item => get(item, 'company.updated_at'),
      count: collection =>
        parseInt(get(collection, 'results.total_count', 0), 10),
    },
  },
}
