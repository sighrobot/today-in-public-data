import React from 'react';
import moment from 'moment';

import Calendar from '../calendar';
import DatePicker from '../date-picker';
import { isToday } from '../../lib/utils';

import style, { triggerStyle } from './style';

export default class Nav extends React.PureComponent {
  state = {
    open: false,
  }

  toggleMenu = () => {
    this.setState({open: !this.state.open})
  }

  renderDateText = () => (
    isToday(this.props.date)
    ? 'Today'
    : moment(this.props.date).format('dddd, MMMM D, YYYY')
  )

  renderTitle() {
    return (
      <button
        className='date-select-trigger'
        onClick={this.toggleMenu}>
        <span>
          <strong>{this.renderDateText()}</strong> in&nbsp;Public&nbsp;Data
        </span>

        <style jsx>{ triggerStyle }</style>
      </button>
    );
  }

  render() {
    return (
      <nav>
        {
          this.state.open
          ? <Calendar
              counts={this.props.counts}
              focusDate={this.props.date}
              fetchDateFunc={this.props.fetchDateFunc}
              setCountFunc={this.props.setCountFunc}/>
          : null
        }

        {
          this.state.open
          ? <DatePicker
              date={this.props.date}
              fetchDateFunc={this.props.fetchDateFunc} />
          : null
        }

        {this.renderTitle()}

        <style jsx>{ style }</style>
      </nav>
    );
  }
}
