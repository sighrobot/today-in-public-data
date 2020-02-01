import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { get } from 'lodash';

import {
  fetchCountForDateString2,
  formatNum,
} from '../../lib/utils';

import style, { countStyle } from './style';

export default class Day extends React.PureComponent {
  static propTypes = {
    date: PropTypes.object,
  }

  static defaultProps = {
    date: new Date(),
  }

  fetchCount = async (date) => {
      const count = await fetchCountForDateString2(date);

      this.props.setCountFunc(date, count);
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
          <small>{count === 1 ? 'record' : 'records'}</small>

          <style jsx>{ countStyle }</style>
        </span>
      );
    }

    return <img style={{height: '6px', marginTop: '12px', marginBottom: '2px'}} src='/dot-loader.svg' />;
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
          <span className='day-number'>{this.props.date.getDate()}</span>

          {this.renderCount()}
        </div>

        <style jsx>{ style }</style>
        </button>
        );
  }
}
