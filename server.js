const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const request = require('superagent')
const sources = require('./lib/sources.js')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const makeRequest = (sourceKey, date) => {
  const source = sources[sourceKey]

  return new Promise(async resolve => {
    try {
      const response = await request.get(source.baseUrl).query(
        source.dateFields
          .map(dateField => {
            return `${dateField.name}=${dateField.value(date)}`
          })
          .concat(source.query.map(param => `${param.name}=${param.value}`))
          .join('&')
      )

      resolve(response)
    } catch (err) {
      resolve({ response: { body: null } })
    }
  })
}

app.prepare().then(() => {
  createServer(async (req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    if (pathname === '/data') {
      const sourceKeys = Object.keys(sources)
      const responses = await Promise.all(
        sourceKeys.map(sourceKey => makeRequest(sourceKey, query.date))
      )

      const collated = {}

      responses.forEach((response, idx) => {
        collated[sourceKeys[idx]] = response.body
      })

      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(collated))
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(3000, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
