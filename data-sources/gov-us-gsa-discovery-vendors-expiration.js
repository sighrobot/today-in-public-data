// https://api.gsa.gov/acquisition/discovery/v2/contracts/
const { get } = require('lodash')
const moment = require('moment')

module.exports = {
  gov_us_gsa_vendor_expiration: {
    name: 'GSA Vendor Expirations',
    web: 'https://discovery.gsa.gov/api/',
    baseUrl: 'https://api.gsa.gov/acquisition/discovery/v2/vendors/',
    query: [{ name: 'count', value: 100 }],
    dateFields: [
      {
        name: 'sam_expiration_date',
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
      time: item => new Date(item.sam_expiration_date).getTime(),
      count: data => get(data, 'count', 0),
    },
  },
}
