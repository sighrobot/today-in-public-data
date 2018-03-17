import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  createStringsForDate,
  fetchCountForDateString,
  formatNum,
} from '../utils';

export default class Day extends React.PureComponent {
  static propTypes = {
    date: PropTypes.object,
  }

  static defaultProps = {
    date: new Date(),
  }

  getCount = (date) => {
      const strings = createStringsForDate(date);

      fetchCountForDateString(strings.join(' || ')).then((count) => {
        this.props.setCountFunc(date, count);
      });
  }

  componentDidMount() {
    if (this.props.date && !this.props.count) { this.getCount(this.props.date); }
  }

  componentWillReceiveProps(nextProps) {
    if (moment(nextProps.date).diff(this.props.date, 'days')
        && !nextProps.count) {
      this.getCount(nextProps.date);
    }
  }

  handleDayClick = () => this.props.fetchDateFunc(this.props.date)

  renderCount() {
    if (this.props.count >= 0) {
      return (
        <span className='calendar-day-count'>
          <strong>{formatNum(this.props.count)}</strong>
          &nbsp;
          <small>{this.props.count === 1 ? 'dataset' : 'datasets'}</small>

          <style jsx>{`
            .calendar-day-count {
              margin-top: 8px;
              line-height: 1
            }

            .calendar-day-count strong {
              font-size: 12px;
              font-weight: 500;
            }

            .calendar-day-count small {
              font-size: 11px;
              font-weight: 100;
            }
          `}</style>
        </span>
      );
    }

    return '...';
  }

  render() {
    const mDate = moment(this.props.date);

    return (
      <button
        className={`calendar-day ${this.props.isActive ? 'calendar-day-active' : ''}`}
        disabled={this.props.isActive || this.props.count === 0}
        onClick={this.handleDayClick}>
        <div className='calendar-day-inner'>
          <span className='day-name'>{mDate.format('ddd')}</span>
          <span className='month-name'>{mDate.format('MMM')}</span>
          <span className='day-number'>{this.props.date.getDate()}</span>

          {this.renderCount()}
        </div>

        <style jsx>{`
          .calendar-day {
            border: none;
            outline: 0;
            padding: 0;
            width: 100%;
            position: relative;

            transition: 200ms ease background;
          }

          .calendar-day:not(.calendar-day-active) {
            background: rgba(255, 255, 255, 0.1);
          }

          .calendar-day:not(:disabled):hover {
            background: rgba(255, 255, 255, 0.05);
            cursor: pointer;
          }

          .calendar-day:not(:disabled):active {
            background: transparent;
          }

          .calendar-day-active {
            background: transparent;
          }

          .calendar-day:not(.calendar-day-active):disabled {
            cursor: not-allowed;
            opacity: 0.5;
          }

          .calendar-day-inner {
            align-items: center;
            color: white;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            justify-content: center;
            padding: 16px 0;
            text-align: center;
            user-select: none;
            width: 100%;
          }

          .calendar-day-inner span {
            line-height: 1;
          }

          .month-name,
          .day-name {
            font-weight: 100;
            margin-bottom: 2px;
            text-transform: uppercase;
          }

          .month-name {
            font-size: 14px;
          }

          .day-name {
            font-size: 8px;
          }

          .day-number {
            font-size: 22px;
            font-weight: 600;
          }
          `}</style>
        </button>
        );
  }
}
