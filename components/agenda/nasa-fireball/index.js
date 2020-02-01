import React from 'react'
import moment from 'moment'
import { sortBy } from 'lodash'

import './style.styl'

export default ({ data, style }) => {
  const { data: fireballs } = data

  return (
    <div className='agenda'>
      {fireballs ? fireballs.map((fireball) => {
        return (
          <a href={`https://www.google.com/maps/place/${fireball[3]}${fireball[4]}+${fireball[5]}${fireball[6]}/`} target='_blank'>
            <div className='agenda-item' style={style}>
              <h4 className='agenda-title'>{fireball[1]} &times; 10<sup>10</sup> joules of total radiated energy</h4>
              <p>{moment(fireball[0]).format('h:MMa')}</p>
            </div>
          </a>
        )
      }) : null}

      {fireballs ? null : <aside>No events today.</aside>}
    </div>
  )
}
