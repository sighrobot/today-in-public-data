import request from 'superagent'
import sources from '../../lib/sources'
import moment from 'moment'
import { sortBy } from 'lodash'

const makeRequest = (sourceKey, date, search) => {
  const source = sources[sourceKey]

  return new Promise(async resolve => {
    try {
      let query = (source.query || [])
        .map(param => `${param.name}=${param.value}`)
        .join('&')

      if (search && source.search) {
        query += `&${source.search.name}=${source.search.value(search)}`
      }

      const response = await request.get(source.baseUrl).query(query)

      console.log(source.baseUrl + '?' + query)

      resolve(response)
    } catch (err) {
      resolve({ response: { body: null } })
    }
  })
}

const parseBody = (json, sourceKey, date) => {
  const source = sources[sourceKey]

  return {
    raw: json,
    data: sortBy(
      source.get
        .collection(json)
        .filter(
          d => source.isAllDay || moment(source.get.time(d)).isSame(date, 'day')
        )
        .map(d => {
          return {
            body: source.get.body ? source.get.body(d) : '',
            url: source.get.url(d),
            title: source.get.title(d),
            time: moment(source.get.time(d))
              .toDate()
              .getTime(),
            raw: d,
            source: sourceKey,
          }
        }),
      'time'
    ),
  }
}

export default async (req, res) => {
  const {
    query: { date, sources: sourcesToFetch = '', search },
  } = req

  console.log({ search })

  const sourceKeys = Object.keys(sources).filter(
    s => sourcesToFetch.indexOf(s) !== -1
  )
  const responses = await Promise.all(
    sourceKeys.map(sourceKey => makeRequest(sourceKey, date, search))
  )

  const collated = {}

  responses.forEach((response, idx) => {
    const sourceKey = sourceKeys[idx]

    collated[sourceKey] = parseBody(response.body, sourceKey, date)
  })

  res.json(collated)
}
