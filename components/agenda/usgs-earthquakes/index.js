import React from 'react'
import moment from 'moment'
import { sortBy } from 'lodash'

import './style.styl'

const OFFSET = 100;

export default ({ data, style }) => {
  const features = data.features.slice(0, OFFSET)
  const count = data.metadata.count

  return (
    <div className='agenda'>
      {count > 0 ? sortBy(features, (f) => f.properties.time, 'asc').map((feature) => {
        return (
          <a href={feature.properties.url} target='_blank'>
            <div className='agenda-item' style={style}>
              <h4 className='agenda-title'>{feature.properties.title}</h4>
              <p>{moment(feature.properties.time).format('h:MMa')}</p>
            </div>
          </a>
        )
      }) : null}

      {count > OFFSET ? <aside>+ {(count - OFFSET).toLocaleString()} more</aside> : null}
      {count === 0 ? <aside>No events today.</aside> : null}
    </div>
  )
}
