const moment = require('moment');

OPEN_CORPORATES_API = { name: 'api_token', value: process.env.OPEN_CORPORATES }
DATA_GOV_API = { name: 'api_key', value: process.env.DATA_GOV }

module.exports = {
  open_corporates: {
    name: 'OpenCorporates',
    web: 'https://api.opencorporates.com/documentation/API-Reference',
    baseUrl: 'https://api.opencorporates.com/v0.4/companies/search',
    query: [
      OPEN_CORPORATES_API,
      { name: 'q', value: '&nbsp;*' },
      { name: 'per_page', value: 100 },
    ],
    dateFields: [
      {
        name: 'incorporation_date',
        value: (d) => {
          const m = moment(d)
          const after = m.subtract(1, 'days').format().slice(0, 10)
          const before = m.add(2, 'days').format().slice(0, 10)

          return `${after}:${before}`
        },
      },
    ],
  },
  we_the_people: {
    name: 'We the People',
    web: 'https://petitions.whitehouse.gov/developers',
    baseUrl: 'https://api.whitehouse.gov/v1/petitions.json',
    query: [
      DATA_GOV_API,
      { name: 'offset', value: 0 },
    ],
    dateFields: [
      {
        name: 'createdBefore',
        value: (d) => moment(d).add(2, 'days').unix(),
      },
      {
        name: 'createdAfter',
        value: (d) => moment(d).unix(),
      },
    ],
  },
  // fcc_ecfs: {
  //   name: 'FCC Electronic Comment Filing System',
  //   web: 'https://www.fcc.gov/ecfs/help/public_api',
  //   baseUrl: 'https://ecfsapi.fcc.gov/filings',
  //   query: [],
  //   dateFields: [
  //     {
  //       name: 'date_received',
  //       value: (d) => {
  //         const m = moment(d);
  //         const after = m.format().slice(0, 10)
  //         const before = m.add(1, 'days').format().slice(0, 10)

  //         return `[gte]${after}[lt]${before}`
  //       },
  //     },
  //   ],
  // },
  caselaw: {
    name: 'Caselaw Access Project',
    web: 'https://case.law/api/',
    baseUrl: 'https://api.case.law/v1/cases/',
    query: [],
    dateFields: [
      {
        name: 'decision_date_min',
        value: (d) => moment(d).format().slice(0, 10),
      },
      {
        name: 'decision_date_max',
        value: (d) => moment(d).format().slice(0, 10),
      },
    ],
  },
  usgs_earthquakes: {
    name: 'USGS Earthquake Catalog',
    web: 'https://earthquake.usgs.gov/fdsnws/event/1/',
    baseUrl: 'https://earthquake.usgs.gov/fdsnws/event/1/query',
    query: [
      { name: 'format', value: 'geojson' },
    ],
    dateFields: [
      {
        name: 'starttime',
        value: (d) => moment(d).format().slice(0, 10),
      },
      {
        name: 'endtime',
        value: (d) => moment(d).add(1, 'days').format().slice(0, 10),
      },
    ],
  },
  nasa_jpl_fireball: {
    name: 'NASA/JPL Fireball Data',
    web: 'https://ssd-api.jpl.nasa.gov/doc/fireball.html',
    baseUrl: 'https://ssd-api.jpl.nasa.gov/fireball.api',
    query: [],
    dateFields: [
      {
        name: 'date-min',
        value: (d) => moment(d).format().slice(0, 10),
      },
      {
        name: 'date-max',
        value: (d) => moment(d).add(1, 'days').format().slice(0, 10),
      },
    ],
  },
  // nasa_apod: {
  //   name: 'NASA Astronomy Picture of the Day',
  //   web: 'https://api.nasa.gov/',
  //   baseUrl: 'https://api.nasa.gov/planetary/apod',
  //   query: [
  //     DATA_GOV_API
  //   ],
  //   dateFields: [
  //     {
  //       name: 'date',
  //       value: (d) => d,
  //     },
  //   ],
  //   startDate: '1995-06-15',
  // },
}