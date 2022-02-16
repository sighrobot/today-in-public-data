import React from 'react'

import styles from './style.module.scss'

export default ({ toggleMenu, date }) => {
  return (
    <header className={styles.appHeader}>
      <button onClick={toggleMenu}>&#9776;</button>
      <h1>Today in Public Data</h1>
    </header>
  )
}
