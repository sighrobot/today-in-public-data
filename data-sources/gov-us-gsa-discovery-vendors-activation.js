// https://api.gsa.gov/acquisition/discovery/v2/contracts/
const { get } = require('lodash')
const moment = require('moment')

module.exports = {
  gov_us_gsa_vendors_activation: {
    name: 'GSA Vendor Activations',
    web: 'https://discovery.gsa.gov/api/',
    baseUrl: 'https://api.gsa.gov/acquisition/discovery/v2/vendors/',
    query: [{ name: 'count', value: 100 }],
    dateFields: [
      {
        name: 'sam_activation_date',
        value: d =>
          moment(d)
            .format()
            .slice(0, 10),
      },
    ],
    get: {
      collection: data => get(data, 'results', []),
      title: item => item.name,
      url: item => get(item, 'sam_url'),
      time: item => new Date(item.sam_activation_date).getTime(),
      count: data => get(data, 'count', 0),
    },
  },
}
