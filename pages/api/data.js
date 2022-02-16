import request from 'superagent'
import sources from '../../lib/sources'
import moment from 'moment'
import { sortBy } from 'lodash'

const makeRequest = (sourceKey, date, board) => {
  const source = sources[sourceKey]

  console.log({ df: source.dateFields[0].value('2021-12-01') })

  return new Promise(async resolve => {
    try {
      const response = await request.get(source.baseUrl).query(
        source.dateFields
          .map(dateField => {
            return `${
              dateField.name
            }=incident_zip = '11237' AND community_board = '${board}' AND ${dateField.value(
              date
            )}`
          })
          .concat(
            (source.query || []).map(param => `${param.name}=${param.value}`)
          )
          .join('&')
      )

      resolve(response)
    } catch (err) {
      resolve({ response: { body: null } })
    }
  })
}

const parseBody = (json, sourceKey, date) => {
  const source = sources[sourceKey]

  return {
    // raw: json,
    data: sortBy(
      source.get
        .collection(json)
        .filter(d => moment(source.get.time(d)).day() === moment(date).day())
        .map(d => ({
          body: source.get.body ? source.get.body(d) : '',
          url: source.get.url(d),
          title: source.get.title(d),
          time: moment(source.get.time(d))
            .toDate()
            .getTime(),
          raw: d,
          source: sourceKey,
        })),
      'time'
    ),
  }
}

export default async (req, res) => {
  const {
    query: { date, sources: sourcesToFetch = '', board },
  } = req

  const sourceKeys = Object.keys(sources).filter(
    s => sourcesToFetch.indexOf(s) !== -1
  )
  const responses = await Promise.all(
    sourceKeys.map(sourceKey => makeRequest(sourceKey, date, board))
  )

  const collated = {}

  responses.forEach((response, idx) => {
    const sourceKey = sourceKeys[idx]

    collated[sourceKey] = parseBody(response.body, sourceKey, date)
  })

  res.json(collated)
}
