import React from 'react'
import moment from 'moment'
import { sortBy } from 'lodash'

import './style.styl'

export default ({ data, style }) => {
  const petitions = data.results

  return (
    <div className='agenda'>
      {sortBy(petitions, 'created').map((petition) => {
        return (
          <a href={petition.url} target='_blank'>
            <div className='agenda-item' style={style}>
              <h4 className='agenda-title'>{petition.title}</h4>
              <p>{moment(petition.created * 1000).format('h:MMa')}</p>
            </div>
          </a>
        )
      })}

      {petitions.length === 0 ? <aside>No events today.</aside> : null}
    </div>
  )
}
