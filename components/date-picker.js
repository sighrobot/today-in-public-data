import React from 'react';
import moment from 'moment';

import Calendar from './calendar';
import {getISO} from '../utils';

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

        <style jsx>{`
          .date-picker {
            background: rgba(255, 255, 255, 0);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            margin-top: 20px;
            padding: 0 40px;
            width: 100%;
          }

          .date-picker-input {
            border: none;
            color: #16161d;
            font-family: inherit;
            font-size: inherit
            padding: 4px;
            width: 165px;
          }

          .date-picker-input:hover,
          .date-submit:hover {
            cursor: pointer;
          }

          .date-submit {
            align-self: stretch;
            background: transparent;
            border: 1px solid white;
            color: white;
            margin-left: 8px;
            font-size: 14px;
            padding: 0 12px;
            border-radius: 2px;
            transition: 200ms ease background;
            user-select: none;
          }

          .date-submit[disabled] {
            opacity: 0.5;
            cursor: not-allowed;
          }

          .date-submit:not[disabled]:hover {
            background: purple;
          }
        `}</style>
      </form>
    );
  }
}
