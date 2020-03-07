const { get } = require('lodash')
const moment = require('moment')

module.exports = {
  fcc_ecfs: {
    name: 'FCC Electronic Comment Filing System',
    web: 'https://www.fcc.gov/ecfs/help/public_api',
    baseUrl: 'https://ecfsapi.fcc.gov/filings',
    dateFields: [
      {
        name: 'date_received',
        value: d => {
          const m = moment(d)
          const after = m.format().slice(0, 10)
          const before = m
            .add(1, 'days')
            .format()
            .slice(0, 10)

          return `[gte]${after}[lt]${before}`
        },
      },
    ],
  },
}
