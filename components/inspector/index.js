import moment from 'moment'
import React from 'react'
import './style.styl'

import sources from '../../lib/sources'

export default ({ event, onClose }) => {
  if (!event) return <aside className="inspector" />

  const source = sources[event.source]
  const title = event.title
  const data = event.data || {}
  const body = event.body || ''
  const url = event.url
  const time = moment(event.time)

  return (
    <aside className={`inspector ${event ? 'inspector-open' : ''}`}>
      <header>
        <h3>{title}</h3>
        <button onClick={onClose}>&times;</button>
      </header>

      <em>{time.fromNow()}</em>
      <em>{time.format('MMMM D, YYYY')} at {time.format('h:mma')}</em>
      <a href={url} target="_blank">
        View event at {source.name}
      </a>

      <section>
        <table>
          <tbody>
            {Object.keys(data).map(dataKey => {
              return (
                <tr key={dataKey}>
                  <th title={dataKey}>{dataKey}</th>
                  <td>{data[dataKey]}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {body ? <p>{body}</p> : null}
      </section>
    </aside>
  )
}
