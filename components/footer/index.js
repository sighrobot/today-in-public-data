import React from 'react'
import moment from 'moment'

import styles from './style.module.scss'

export default ({ toggleMenu, date }) => {
  return (
    <header className="app-header" styles={styles}>
      <button onClick={toggleMenu}>&#9776;</button>
      <h1>
        <strong>{moment(date).format('MMMM D, YYYY')}</strong> in Public Data
      </h1>
    </header>
  )
}
