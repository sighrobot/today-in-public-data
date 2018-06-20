import React from 'react';
import moment from 'moment';

import { getISO } from '../../lib/utils';
import Calendar from '../calendar';
import style from './style';

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

  handleChangeDate = ({target}) => this.setState({dateForPicker: target.value})

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
        <input
          autoFocus
          className='date-picker-input'
          onChange={this.handleChangeDate}
          type='date'
          value={this.state.dateForPicker} />

        <button
          type='submit'
          className='date-submit'
          disabled={getISO(this.props.date) === this.state.dateForPicker}>
          Go
        </button>

        <style jsx>{ style }</style>
      </form>
    );
  }
}
