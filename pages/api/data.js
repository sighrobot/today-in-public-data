import request from 'superagent'
import sources from '../../lib/sources'

const makeRequest = (sourceKey, date) => {
  const source = sources[sourceKey]

  return new Promise(async resolve => {
    try {
      const response = await request.get(source.baseUrl).query(
        source.dateFields
          .map(dateField => {
            return `${dateField.name}=${dateField.value(date)}`
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

export default async (req, res) => {
  const {
    query: { date, sources: sourcesToFetch = '' },
  } = req

  const sourceKeys = Object.keys(sources).filter(
    s => sourcesToFetch.indexOf(s) !== -1
  )
  const responses = await Promise.all(
    sourceKeys.map(sourceKey => makeRequest(sourceKey, date))
  )

  const collated = {}

  responses.forEach((response, idx) => {
    collated[sourceKeys[idx]] = response.body
  })

  res.json(collated)
}
