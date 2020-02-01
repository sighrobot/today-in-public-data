import React from 'react'
import moment from 'moment'
import { sortBy, uniqBy } from 'lodash'

import './style.styl'

export default ({ data, style }) => {
  const { filings } = data;

  return (
    <div className='agenda'>
      {uniqBy(sortBy(filings, 'date_submision'), 'proceedings[0].id_proceeding').map((filing) => {
        return (
          <div className='agenda-item' style={style}>
            <h4 className='agenda-title'>{filing.proceedings[0].description || '<unknown>'}</h4>
            <p>{moment(filing.date_submission).format('h:MMa')}</p>
          </div>
        )
      })}
    </div>
  )
}
