import React from 'react'
import moment from 'moment'

import DatePicker from '../date-picker'

import styles from './style.module.scss'

export default class Nav extends React.PureComponent {
  renderTitle() {
    return (
      <header>
        <strong>{moment(this.props.date).format('MMM D, YYYY')}</strong>{' '}
        in&nbsp;Public&nbsp;Data
      </header>
    )
  }

  render() {
    return (
      <nav style={styles}>
        <DatePicker
          date={this.props.date}
          fetchDateFunc={this.props.fetchDateFunc}
        />
        in Public Data
      </nav>
    )
  }
}
