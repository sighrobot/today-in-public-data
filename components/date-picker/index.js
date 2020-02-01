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

    this.props.fetchDateFunc(new Date(moment(this.state.dateForPicker).utc()));
  }

  render() {
    return (
      <form className='date-picker' onSubmit={this.submitDate}>
        <RDP
          className='date-picker-input'
          dateFormat='MMM dd, yyyy'
          showYearDropdown
          disabledKeyboardNavigation
          onChange={this.handleChangeDate}
          selected={new Date(moment(this.state.dateForPicker).utc())}
          todayButton='Today'
          onBlur={this.submitDate}
        />
      </form>
    );
  }
}
