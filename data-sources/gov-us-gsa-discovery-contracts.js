// https://api.gsa.gov/acquisition/discovery/v2/contracts/
const { get } = require('lodash')
const moment = require('moment')

module.exports = {
  gov_us_gsa_discovery_contracts: {
    isAllDay: true,
    name: 'GSA Discovery Contracts',
    web: 'https://discovery.gsa.gov/api/',
    baseUrl: 'https://api.gsa.gov/acquisition/discovery/v2/contracts/',
    query: [{ name: 'count', value: 100 }],
    dateFields: [
      {
        name: 'date_signed',
        value: d =>
          moment(d)
            .format()
            .slice(0, 10),
      },
    ],
    get: {
      collection: data => get(data, 'results', []),
      title: item =>
        `$${get(item, 'obligated_amount')} for ${get(item, 'agency.name')}`,
      url: item => get(item, 'url'),
      time: item => moment(item.date_signed).unix(),
      count: data => get(data, 'count', 0),
    },
  },
}
