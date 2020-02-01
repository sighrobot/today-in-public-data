import React from 'react';
import moment from 'moment';
import RDP from 'react-datepicker';

import { getISO } from '../../lib/utils';
import './style.styl'

export default class DatePicker extends React.PureComponent {
  updateDate = (props = this.props) => getISO(props.date)

  state = {
    dateForPicker: this.updateDate(),
  }

  componentWillReceiveProps(nextProps) {
    if (moment(nextProps.date).diff(moment(this.props.date), 'days') !== 0) {
      this.setState({dateForPicker: this.updateDate(nextProps)});
    }
  }

  handleChangeDate = (d) => this.setState({ dateForPicker: d })

  submitDate = (e) => {
    e.preventDefault();

    const {dateForPicker} = this.state;

    this.props.fetchDateFunc(
      dateForPicker ? new Date(moment(dateForPicker).format()) : undefined
    );
  }

  render() {
    return (
      <form className='date-picker' onSubmit={this.submitDate}>
        <RDP
          className='date-picker-input'
          dateFormat='yyyy/MM/dd'
          disabledKeyboardNavigation
          onChange={this.handleChangeDate}
          selected={new Date(this.state.dateForPicker)}
          todayButton='Today'
        />

        <button
          type='submit'
          className='date-submit'
          disabled={getISO(this.props.date) === this.state.dateForPicker}>
          Go
        </button>
      </form>
    );
  }
}
