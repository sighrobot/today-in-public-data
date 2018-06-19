import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { get } from 'lodash';

import {
  createStringsForDate,
  fetchCountForDateString,
  formatNum,
} from '../lib';

export default class Day extends React.PureComponent {
  static propTypes = {
    date: PropTypes.object,
  }

  static defaultProps = {
    date: new Date(),
  }

  fetchCount = (date) => {
      const strings = createStringsForDate(date);

      fetchCountForDateString(strings.join(' || ')).then((count) => {
        this.props.setCountFunc(date, count);
      });
  }

  getCount = (props = this.props) => get(props, 'count')

  componentDidMount() {
    if (this.props.date && !this.getCount()) { this.fetchCount(this.props.date); }
  }

  componentWillReceiveProps(nextProps) {
    if (moment(nextProps.date).diff(this.props.date, 'days') && !this.getCount(nextProps)) {
      this.fetchCount(nextProps.date);
    }
  }

  handleDayClick = () => this.props.fetchDateFunc(this.props.date)

  renderCount() {
    const count = this.getCount();

    if (count >= 0) {
      return (
        <span className='calendar-day-count'>
          <strong>{formatNum(count)}</strong>
          &nbsp;
          <small>{count === 1 ? 'dataset' : 'datasets'}</small>

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

    return <img style={{height: '6px', marginTop: '12px', marginBottom: '2px'}} src='./static/dot-loader.svg' />;
  }

  render() {
    const mDate = moment(this.props.date);

    return (
      <button
        className={`calendar-day ${this.props.isActive ? 'calendar-day-active' : ''}`}
        disabled={this.props.isActive || this.getCount() === 0}
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
            color: white;
            outline: 0;
            padding: 0;
            width: 100%;
            position: relative;

            transition: 200ms ease background, text-shadow;
          }

          .calendar-day:not(.calendar-day-active) {
            background: rgba(255, 255, 255, 0.1);
          }

          .calendar-day:not(:disabled):hover {
            background: rgba(255, 255, 255, 0.05);
            cursor: pointer;
            text-shadow: 5px 5px 1px rgba(255, 0, 0, 0.3), -5px -5px 1px rgba(0, 0, 255, 0.3);
          }

          .calendar-day:not(:disabled):active {
            background: transparent;
          }

          .calendar-day-active {
            background: transparent;
            font-weight: 500;
            text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.5);
          }

          .calendar-day:not(.calendar-day-active):disabled {
            cursor: not-allowed;
            opacity: 0.5;
          }

          .calendar-day-inner {
            align-items: center;
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
          }
          `}</style>
        </button>
        );
  }
}
