const { get } = require('lodash')
const moment = require('moment')

module.exports = {
  nasa_jpl_fireball: {
    name: 'NASA/JPL Fireball Data',
    web: 'https://ssd-api.jpl.nasa.gov/doc/fireball.html',
    baseUrl: 'https://ssd-api.jpl.nasa.gov/fireball.api',
    dateFields: [
      {
        name: 'date-min',
        value: d =>
          moment(d)
            .format()
            .slice(0, 10),
      },
      {
        name: 'date-max',
        value: d =>
          moment(d)
            .add(1, 'days')
            .format()
            .slice(0, 10),
      },
    ],
    get: {
      collection: data => get(data, 'data', []),
      title: item => `${item[1]} × 10^10 joules of total radiated energy`,
      url: item =>
        `https://www.google.com/maps/place/${item[3]}${item[4]}+${item[5]}${item[6]}/`,
      time: item => item[0],
      count: data => parseInt(get(data, 'count', 0), 10),
    },
  },
}
