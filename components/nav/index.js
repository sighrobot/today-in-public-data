import React from 'react'
import moment from 'moment'

import DatePicker from '../date-picker'
import { isToday } from '../../lib/utils'

import './style.styl'

export default class Nav extends React.PureComponent {
  renderDateText = () =>
    isToday(this.props.date)
      ? 'Today'
      : moment(this.props.date).format('MMM D, YYYY')

  renderTitle() {
    return (
      <header>
        <strong>{this.renderDateText()}</strong> in&nbsp;Public&nbsp;Data
      </header>
    )
  }

  render() {
    return (
      <nav>
        <DatePicker
          date={this.props.date}
          fetchDateFunc={this.props.fetchDateFunc}
        />
        in Public Data
      </nav>
    )
  }
}
