const { get } = require('lodash')
const moment = require('moment')

module.exports = {
  fcc_ecfs: {
    name: 'FCC Electronic Comment Filing System',
    web: 'https://www.fcc.gov/ecfs/help/public_api',
    baseUrl: 'https://ecfsapi.fcc.gov/filings',
    search: {
      name: 'q',
      value: d => d,
    },
    isAllDay: true,
    dateFields: [
      {
        name: 'date_submission',
        value: d => {
          const m = moment(d)
          const after = m
            .subtract(1, 'days')
            .format()
            .slice(0, 10)
          const before = m
            .add(1, 'days')
            .format()
            .slice(0, 10)

          return `[gte]${after}[lt]${before}`
        },
      },
    ],
    get: {
      collection: data => data.filings,
      title: item =>
        `${get(
          item,
          'submissiontype.short',
          `Submission ${item.id_submission}`
        )}: ${get(item, 'proceedings[0].description', '')}`,
      url: item => `https://www.fcc.gov/ecfs/filing/${item.id_submission}`,
      time: item => moment(item.date_submission).utc(),
      count: data => parseInt(get(data, 'filings.length', 0), 10),
      data: item => ({}),
      body: item =>
        get(item, 'documents', [])
          .map(d => d.description.trim())
          .filter(d => d)
          .join(' / '),
    },
  },
}
