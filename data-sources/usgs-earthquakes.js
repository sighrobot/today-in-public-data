const { get } = require('lodash')
const moment = require('moment')

module.exports = {
  usgs_earthquakes: {
    name: 'Earthquakes',
    web: 'https://earthquake.usgs.gov/fdsnws/event/1/',
    baseUrl: 'https://earthquake.usgs.gov/fdsnws/event/1/query',
    query: [{ name: 'format', value: 'geojson' }],
    dateFields: [
      {
        name: 'starttime',
        value: d =>
          moment(d)
            .format()
            .slice(0, 10),
      },
      {
        name: 'endtime',
        value: d =>
          moment(d)
            .add(1, 'days')
            .format()
            .slice(0, 10),
      },
    ],
    get: {
      collection: data => get(data, 'features', []),
      title: item => get(item, 'properties.title'),
      url: item => get(item, 'properties.url'),
      time: item => get(item, 'properties.time', 0),
      count: data => get(data, 'metadata.count', 0),
    },
  },
}
