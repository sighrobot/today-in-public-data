const { get } = require('lodash')
const moment = require('moment')

module.exports = {
  caselaw: {
    name: 'Caselaw Access Project',
    web: 'https://case.law/api/',
    baseUrl: 'https://api.case.law/v1/cases/',
    dateFields: [
      {
        name: 'decision_date_min',
        value: d =>
          moment(d)
            .format()
            .slice(0, 10),
      },
      {
        name: 'decision_date_max',
        value: d =>
          moment(d)
            .format()
            .slice(0, 10),
      },
    ],
    get: {
      collection: data => get(data, 'results', []),
      title: item => get(item, 'name_abbreviation'),
      url: item => get(item, 'frontend_url'),
      time: () => 'a',
      count: data => parseInt(get(data, 'count', 0), 10),
    },
  },
}
