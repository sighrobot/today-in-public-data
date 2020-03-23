import React from 'react'
import moment from 'moment'

import './style.styl'

export default ({ toggleMenu, date }) => {
  return (
    <header className="app-header">
      <button onClick={toggleMenu}>&#9776;</button>
      <h1><strong>{moment(date).format('MMMM D, YYYY')}</strong> in Public Data</h1>
    </header>
  )
}
