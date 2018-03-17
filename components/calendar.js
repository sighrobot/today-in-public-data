import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {getNumDaysPerSide, getISO} from '../utils';

import Day from './calendar-day';

export default class Calendar extends React.PureComponent {
  static propTypes = {
    focusDate: PropTypes.object,
  }

  static defaultProps = {
    focusDate: new Date(),
  }

  state = {
    numDaysPerSide: null,
  }

  componentDidMount() {
    this.setState({numDaysPerSide: getNumDaysPerSide()});
  }

  makeSubCounts = () => {
    const subCounts = {};

    for (let i = -(this.state.numDaysPerSide); i <= this.state.numDaysPerSide; i++) {
      const dateKey = getISO(moment(this.props.focusDate).add(i, 'days').toDate());

      subCounts[dateKey] = this.props.counts[dateKey];
    }

    return subCounts;
  }

  renderDays() {
    const days = [];

    for (let i = -(this.state.numDaysPerSide); i <= this.state.numDaysPerSide; i++) {
      const d = i !== 0
                ? moment(this.props.focusDate).add(i, 'days').toDate()
                : this.props.focusDate;

      days.push(
        <Day
          key={i}
          count={this.props.counts[getISO(d)]}
          counts={this.makeSubCounts()}
          date={d}
          fetchDateFunc={this.props.fetchDateFunc}
          isActive={i === 0}
          setCountFunc={this.props.setCountFunc} />
      );
    }

    return days;
  }

  render() {
    return (
      <menu className='calendar'>
        {this.state.numDaysPerSide ? this.renderDays() : null}

        <style jsx>{`
          .calendar {
            display: flex;
            margin: 0;
            padding: 0;
            position: sticky;
            top: 50px;
            z-index: 9999;
          }
        `}</style>
      </menu>
    );
  }
}
