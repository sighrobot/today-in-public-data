const { get, omit } = require('lodash')
const moment = require('moment')

const { DATA_GOV_API } = require('./_authParams')

module.exports = {
  nasa_neo: {
    name: 'NASA Near-Earth Objects',
    web: 'http://neo.jpl.nasa.gov/',
    baseUrl: 'https://api.nasa.gov/neo/rest/v1/feed',
    query: [DATA_GOV_API, { name: 'format', value: 'geojson' }],
    dateFields: [
      {
        name: 'start_date',
        value: d =>
          moment(d)
            .format()
            .slice(0, 10),
      },
      {
        name: 'end_date',
        value: d =>
          moment(d)
            .format()
            .slice(0, 10),
      },
    ],
    get: {
      collection: data => {
        const obj = get(data, 'near_earth_objects', {})

        return get(data, `near_earth_objects.${Object.keys(obj)[0]}`, [])
      },
      title: item =>
        `${get(item, 'name')} misses Earth by ${Math.round(
          get(item, 'close_approach_data[0].miss_distance.kilometers')
        ).toLocaleString()} km`,
      url: item => get(item, 'nasa_jpl_url'),
      time: item =>
        get(item, 'close_approach_data[0].epoch_date_close_approach', 0),
      count: data => parseInt(get(data, 'element_count', 0), 10),
      data: item => ({
        Name: item.name,
        'NEO Reference ID': item.neo_reference_id,
        'Abs. magnitude (H)': item.absolute_magnitude_h,
        'Potentially hazardous?': item.is_potentially_hazardous_asteroid.toString(),
        'Sentry object?': item.is_sentry_object.toString(),
        'Est. min. diameter': `${item.estimated_diameter.kilometers.estimated_diameter_min} km`,
        'Est. max. diameter': `${item.estimated_diameter.kilometers.estimated_diameter_max} km`,
      }),
      body: () => '',
    },
  },
}
