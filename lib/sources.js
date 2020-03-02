const { get } = require('lodash')
const moment = require('moment')

OPEN_CORPORATES_API = { name: 'api_token', value: process.env.OPEN_CORPORATES }
DATA_GOV_API = { name: 'api_key', value: process.env.DATA_GOV }

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
  // nasa_neo: {
  //   name: 'Near-Earth Objects',
  //   web: 'http://neo.jpl.nasa.gov/',
  //   baseUrl: 'https://api.nasa.gov/neo/rest/v1/feed',
  //   query: [DATA_GOV_API, { name: 'format', value: 'geojson' }],
  //   dateFields: [
  //     {
  //       name: 'start_date',
  //       value: d =>
  //         moment(d)
  //           .format()
  //           .slice(0, 10),
  //     },
  //     {
  //       name: 'end_date',
  //       value: d =>
  //         moment(d)
  //           .format()
  //           .slice(0, 10),
  //     },
  //   ],
  //   get: {
  //     collection: data => {
  //       const obj = get(data, 'near_earth_objects', {})

  //       return get(data, `near_earth_objects.${Object.keys(obj)[0]}`, [])
  //     },
  //     title: item =>
  //       `${get(item, 'name')} misses Earth by ${Math.round(
  //         get(item, 'close_approach_data[0].miss_distance.kilometers')
  //       ).toLocaleString()} km`,
  //     url: item => get(item, 'nasa_jpl_url'),
  //     time: item =>
  //       get(item, 'close_approach_data[0].epoch_date_close_approach', 0),
  //     count: data => get(data, 'element_count', 0),
  //   },
  // },
  hpd: {
    name: 'NYC Housing Preservation & Development',
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

          return `created_date between '${after}T00:00:00.000' and '${before}T00:00:00.000' and agency like '%25HPD%25'`
        },
      },
    ],
    get: {
      collection: data => data,
      title: item => get(item, 'descriptor'),
      url: item =>
        `https://data.cityofnewyork.us/Social-Services/311-Service-Requests-from-2010-to-Present/erm2-nwe9/data?q=${get(
          item,
          'unique_key'
        )}`,
      time: item => get(item, 'created_date'),
      count: collection => get(collection, 'length', 0),
    },
  },
  edc: {
    name: 'NYC Economic Development Corporation',
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

          return `created_date between '${after}T00:00:00.000' and '${before}T00:00:00.000' and agency like '%25EDC%25'`
        },
      },
    ],
    get: {
      collection: data => data,
      title: item => get(item, 'descriptor') || get(item, 'complaint_type'),
      url: item =>
        `https://data.cityofnewyork.us/Social-Services/311-Service-Requests-from-2010-to-Present/erm2-nwe9/data?q=${get(
          item,
          'unique_key'
        )}`,
      time: item => get(item, 'created_date'),
      count: collection => get(collection, 'length', 0),
    },
  },
  dep: {
    name: 'NYC Environmental Protection',
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

          return `created_date between '${after}T00:00:00.000' and '${before}T00:00:00.000' and agency like '%25DEP%25'`
        },
      },
    ],
    get: {
      collection: data => data,
      title: item => get(item, 'descriptor') || get(item, 'complaint_type'),
      url: item =>
        `https://data.cityofnewyork.us/Social-Services/311-Service-Requests-from-2010-to-Present/erm2-nwe9/data?q=${get(
          item,
          'unique_key'
        )}`,
      time: item => get(item, 'created_date'),
      count: collection => get(collection, 'length', 0),
    },
  },
  dof: {
    name: 'NYC Finance',
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

          return `created_date between '${after}T00:00:00.000' and '${before}T00:00:00.000' and agency like '%25DOF%25'`
        },
      },
    ],
    get: {
      collection: data => data,
      title: item => get(item, 'descriptor') || get(item, 'complaint_type'),
      url: item =>
        `https://data.cityofnewyork.us/Social-Services/311-Service-Requests-from-2010-to-Present/erm2-nwe9/data?q=${get(
          item,
          'unique_key'
        )}`,
      time: item => get(item, 'created_date'),
      count: collection => get(collection, 'length', 0),
    },
  },
  doe: {
    name: 'NYC Education',
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

          return `created_date between '${after}T00:00:00.000' and '${before}T00:00:00.000' and agency like '%25DOE%25'`
        },
      },
    ],
    get: {
      collection: data => data,
      title: item => get(item, 'descriptor') || get(item, 'complaint_type'),
      url: item =>
        `https://data.cityofnewyork.us/Social-Services/311-Service-Requests-from-2010-to-Present/erm2-nwe9/data?q=${get(
          item,
          'unique_key'
        )}`,
      time: item => get(item, 'created_date'),
      count: collection => get(collection, 'length', 0),
    },
  },
  nypd: {
    name: 'NYC NYPD',
    web: 'https://api.opencorporates.com/documentation/API-Reference',
    baseUrl: 'https://data.cityofnewyork.us/resource/erm2-nwe9.json',
    query: [{ name: '$limit', value: 2000 }],
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

          return `created_date between '${after}T00:00:00.000' and '${before}T00:00:00.000' and agency like '%25NYPD%25'`
        },
      },
    ],
    get: {
      collection: data => data,
      title: item => get(item, 'descriptor') || get(item, 'complaint_type'),
      url: item =>
        `https://data.cityofnewyork.us/Social-Services/311-Service-Requests-from-2010-to-Present/erm2-nwe9/data?q=${get(
          item,
          'unique_key'
        )}`,
      time: item => get(item, 'created_date'),
      count: collection => get(collection, 'length', 0),
    },
  },
  dob: {
    name: 'NYC Buildings',
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
      title: item => get(item, 'descriptor') || get(item, 'complaint_type'),
      url: item =>
        `https://data.cityofnewyork.us/Social-Services/311-Service-Requests-from-2010-to-Present/erm2-nwe9/data?q=${get(
          item,
          'unique_key'
        )}`,
      time: item => get(item, 'created_date'),
      count: collection => get(collection, 'length', 0),
    },
  },
  dohmh: {
    name: 'NYC Health & Mental Hygiene',
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

          return `created_date between '${after}T00:00:00.000' and '${before}T00:00:00.000' and agency like '%25DOHMH%25'`
        },
      },
    ],
    get: {
      collection: data => data,
      title: item => get(item, 'descriptor') || get(item, 'complaint_type'),
      url: item =>
        `https://data.cityofnewyork.us/Social-Services/311-Service-Requests-from-2010-to-Present/erm2-nwe9/data?q=${get(
          item,
          'unique_key'
        )}`,
      time: item => get(item, 'created_date'),
      count: collection => get(collection, 'length', 0),
    },
  },
  dhs: {
    name: 'NYC Homeless Services',
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

          return `created_date between '${after}T00:00:00.000' and '${before}T00:00:00.000' and agency like '%25DHS%25'`
        },
      },
    ],
    get: {
      collection: data => data,
      title: item => get(item, 'descriptor') || get(item, 'complaint_type'),
      url: item =>
        `https://data.cityofnewyork.us/Social-Services/311-Service-Requests-from-2010-to-Present/erm2-nwe9/data?q=${get(
          item,
          'unique_key'
        )}`,
      time: item => get(item, 'created_date'),
      count: collection => get(collection, 'length', 0),
    },
  },
  dpr: {
    name: 'NYC Parks & Recreation',
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

          return `created_date between '${after}T00:00:00.000' and '${before}T00:00:00.000' and agency like '%25DPR%25'`
        },
      },
    ],
    get: {
      collection: data => data,
      title: item => get(item, 'descriptor'),
      url: item =>
        `https://data.cityofnewyork.us/Social-Services/311-Service-Requests-from-2010-to-Present/erm2-nwe9/data?q=${get(
          item,
          'unique_key'
        )}`,
      time: item => get(item, 'created_date'),
      count: collection => get(collection, 'length', 0),
    },
  },
  dsny: {
    name: 'NYC Sanitation',
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

          return `created_date between '${after}T00:00:00.000' and '${before}T00:00:00.000' and agency like '%25DSNY%25'`
        },
      },
    ],
    get: {
      collection: data => data,
      title: item => get(item, 'descriptor'),
      url: item =>
        `https://data.cityofnewyork.us/Social-Services/311-Service-Requests-from-2010-to-Present/erm2-nwe9/data?q=${get(
          item,
          'unique_key'
        )}`,
      time: item => get(item, 'created_date'),
      count: collection => get(collection, 'length', 0),
    },
  },
  dca: {
    name: 'NYC Consumer Affairs',
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

          return `created_date between '${after}T00:00:00.000' and '${before}T00:00:00.000' and agency like '%25DCA%25'`
        },
      },
    ],
    get: {
      collection: data => data,
      title: item => get(item, 'descriptor'),
      url: item =>
        `https://data.cityofnewyork.us/Social-Services/311-Service-Requests-from-2010-to-Present/erm2-nwe9/data?q=${get(
          item,
          'unique_key'
        )}`,
      time: item => get(item, 'created_date'),
      count: collection => get(collection, 'length', 0),
    },
  },
  dot: {
    name: 'NYC Transportation',
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

          return `created_date between '${after}T00:00:00.000' and '${before}T00:00:00.000' and agency like '%25DOT%25'`
        },
      },
    ],
    get: {
      collection: data => data,
      title: item => get(item, 'descriptor'),
      url: item =>
        `https://data.cityofnewyork.us/Social-Services/311-Service-Requests-from-2010-to-Present/erm2-nwe9/data?q=${get(
          item,
          'unique_key'
        )}`,
      time: item => get(item, 'created_date'),
      count: collection => get(collection, 'length', 0),
    },
  },
  tlc: {
    name: 'NYC Taxi & Limousine Commission',
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

          return `created_date between '${after}T00:00:00.000' and '${before}T00:00:00.000' and agency like '%25TLC%25'`
        },
      },
    ],
    get: {
      collection: data => data,
      title: item => get(item, 'descriptor'),
      url: item =>
        `https://data.cityofnewyork.us/Social-Services/311-Service-Requests-from-2010-to-Present/erm2-nwe9/data?q=${get(
          item,
          'unique_key'
        )}`,
      time: item => get(item, 'created_date'),
      count: collection => get(collection, 'length', 0),
    },
  },
  // nyc_film_permits: {
  //   name: 'NYC Film Permits',
  //   web: 'https://api.opencorporates.com/documentation/API-Reference',
  //   baseUrl: 'https://data.cityofnewyork.us/resource/tg4x-b46p.json',
  //   query: [],
  //   dateFields: [
  //     {
  //       name: '$where',
  //       value: d => {
  //         const m = moment(d)
  //         const after = m.format().slice(0, 10)
  //         const before = m
  //           .add(1, 'days')
  //           .format()
  //           .slice(0, 10)

  //         return `startdatetime between '${after}T00:00:00.000' and '${before}T00:00:00.000'`
  //       },
  //     },
  //   ],
  //   get: {
  //     collection: data => data,
  //     title: item => `${get(item, 'parkingheld')}`,
  //     url: () => 'https://data.cityofnewyork.us/Social-Services/311-Service-Requests-from-2010-to-Present/erm2-nwe9/data',
  //     time: item => get(item, 'startdatetime'),
  //     count: collection => get(collection, 'length', 0),
  //   },
  // },
  // nyc_events: {
  //   name: 'NYC Permitted Events',
  //   web: 'https://api.opencorporates.com/documentation/API-Reference',
  //   baseUrl: 'https://data.cityofnewyork.us/resource/tvpp-9vvx.json',
  //   query: [],
  //   dateFields: [
  //     {
  //       name: '$where',
  //       value: d => {
  //         const m = moment(d)
  //         const after = m.format().slice(0, 10)
  //         const before = m
  //           .add(1, 'days')
  //           .format()
  //           .slice(0, 10)

  //         return `start_date_time between '${after}T00:00:00.000' and '${before}T00:00:00.000' and event_type not like 'Sport%25'`
  //       },
  //     },
  //   ],
  //   get: {
  //     collection: data => data,
  //     title: item => get(item, 'event_name'),
  //     url: () => 'https://data.cityofnewyork.us/Social-Services/311-Service-Requests-from-2010-to-Present/erm2-nwe9/data',
  //     time: item => get(item, 'start_date_time'),
  //     count: collection => get(collection, 'length', 0),
  //   },
  // },
  open_corporates: {
    name: 'Corporate Registration Updates',
    web: 'https://api.opencorporates.com/documentation/API-Reference',
    baseUrl: 'https://api.opencorporates.com/v0.4/companies/search',
    query: [
      OPEN_CORPORATES_API,
      { name: 'q', value: '&nbsp;*' },
      { name: 'per_page', value: 100 },
    ],
    dateFields: [
      {
        name: 'updated_at',
        value: d => {
          const m = moment(d)
          const after = m.format().slice(0, 10)
          const before = m
            .add(1, 'days')
            .format()
            .slice(0, 10)

          return `${after}:${before}`
        },
      },
    ],
    get: {
      collection: data => get(data, 'results.companies', []),
      title: item => get(item, 'company.name'),
      url: item => get(item, 'company.opencorporates_url'),
      time: item => get(item, 'company.updated_at'),
      count: collection => get(collection, 'results.total_count', 0),
    },
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
  // caselaw: {
  //   name: 'Caselaw Access Project',
  //   web: 'https://case.law/api/',
  //   baseUrl: 'https://api.case.law/v1/cases/',
  //   query: [],
  //   dateFields: [
  //     {
  //       name: 'decision_date_min',
  //       value: d =>
  //         moment(d)
  //           .format()
  //           .slice(0, 10),
  //     },
  //     {
  //       name: 'decision_date_max',
  //       value: d =>
  //         moment(d)
  //           .format()
  //           .slice(0, 10),
  //     },
  //   ],
  //   get: {
  //     collection: data => get(data, 'results', []),
  //     title: item => get(item, 'name_abbreviation'),
  //     url: item => get(item, 'frontend_url'),
  //     time: () => 'a',
  //     count: data => get(data, 'count', 0),
  //   },
  // },
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
      count: collection => get(collection, 'results.length', 0),
    },
  },
  nasa_jpl_fireball: {
    name: 'NASA/JPL Fireball Data',
    web: 'https://ssd-api.jpl.nasa.gov/doc/fireball.html',
    baseUrl: 'https://ssd-api.jpl.nasa.gov/fireball.api',
    query: [],
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
      count: data => get(data, 'count', 0),
    },
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
