const { get } = require('lodash')
const moment = require('moment')

const { DATA_GOV_API } = require('./_authParams')

module.exports = {
  we_the_people: {
    name: 'Data.gov – We the People',
    web: 'https://petitions.whitehouse.gov/developers',
    baseUrl: 'https://api.whitehouse.gov/v1/petitions.json',
    query: [DATA_GOV_API, { name: 'offset', value: 0 }],
    dateFields: [
      {
        name: 'createdBefore',
        value: d =>
          moment(d)
            .add(2, 'days')
            .unix(),
      },
      {
        name: 'createdAfter',
        value: d => moment(d).unix(),
      },
    ],
    get: {
      collection: data => get(data, 'results', []),
      title: item => get(item, 'title'),
      url: item => get(item, 'url'),
      time: item => get(item, 'created', 0) * 1000,
      count: collection => parseInt(get(collection, 'results.length', 0), 10),
      data: item => ({
        ID: item.id,
        'Signature count': `${item.signatureCount.toLocaleString()} / ${item.signatureThreshold.toLocaleString()} (${(
          (item.signatureCount / item.signatureThreshold) *
          100
        ).toFixed(1)}%)`,
      }),
      body: item => item.body,
    },
  },
}
