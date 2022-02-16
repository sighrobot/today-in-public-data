const { get } = require('lodash')
const moment = require('moment')

module.exports = {
  nyc_311_dob: {
    name: 'NYC 311 Buildings',
    web: 'https://api.opencorporates.com/documentation/API-Reference',
    baseUrl: 'https://data.cityofnewyork.us/resource/erm2-nwe9.json',
    query: [],
    dateFields: [
      {
        name: '$where',
        value: d => {
          const m = moment(d)
          const after = m.format().slice(0, 10)
          const before = m
            .add(1, 'days')
            .format()
            .slice(0, 10)

          return `created_date between '${after}T00:00:00.000' and '${before}T00:00:00.000' and agency like '%25DOB%25'`
        },
      },
    ],
    get: {
      collection: data => data,
      agency: item => get(item, 'agency'),
      category: item => get(item, 'complaint_type'),
      title: item => get(item, 'descriptor'),
      description: item => get(item, 'descriptor'),
      addressType: item => get(item, 'address_type'),
      address: item => get(item, 'incident_address'),
      city: item => get(item, 'city'),
      zip: item => get(item, 'incident_zip'),
      latitude: item => get(item, 'latitude'),
      longitude: item => get(item, 'longitude'),

      url: item =>
        `https://data.cityofnewyork.us/Social-Services/311-Service-Requests-from-2010-to-Present/erm2-nwe9/data?q=${get(
          item,
          'unique_key'
        )}`,
      time: item => get(item, 'created_date'),
      count: collection => get(collection, 'length', 0),
    },
  },
}
