import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import moment from 'moment';

import { getNumDaysPerSide, getISO } from '../lib/utils';

import Day from './calendar-day';
import LineViz from './line-viz';

export default class Calendar extends React.PureComponent {
  static propTypes = {
    counts: PropTypes.object,
    focusDate: PropTypes.object,
  }

  static defaultProps = {
    focusDate: new Date(),
  }

  getSideMargin = (daysPerSide) => window.innerWidth / (daysPerSide * 2 + 1) / 2

  setSideMargin = () => this.setState({sideMargin: this.getSideMargin(this.state.numDaysPerSide)})

  state = {
    numDaysPerSide: null,
    sideMargin: 0,
  }

  componentDidMount() {
    const daysPerSide = getNumDaysPerSide();

    this.setState({
      numDaysPerSide: daysPerSide,
      sideMargin: this.getSideMargin(daysPerSide),
    });

    global.addEventListener('resize', this.setSideMargin);
  }

  componentWillUnmount() {
    global.removeEventListener('resize', this.setSideMargin);
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
          date={d}
          fetchDateFunc={this.props.fetchDateFunc}
          isActive={i === 0}
          setCountFunc={this.props.setCountFunc} />
      );
    }

    return days;
  }

  mapCountsForViz = () => {
    const { counts } = this.props;
    const data = [];

    for (let i = -(this.state.numDaysPerSide + 1); i <= this.state.numDaysPerSide + 1; i++) {
      const key = getISO(moment(this.props.focusDate).add(i, 'days').toDate());
      let val = counts[key];

      if (i === -(this.state.numDaysPerSide + 1)) {
        val = counts[getISO(moment(this.props.focusDate).add(-(this.state.numDaysPerSide), 'days').toDate())];
      }

      if (i === this.state.numDaysPerSide + 1) {
        val = counts[getISO(moment(this.props.focusDate).add(this.state.numDaysPerSide, 'days').toDate())];
      }

      data.push({x: key, y: val || 0});
    }

    return [{id: 'counts', data}];
  }

  render() {
    return (
      <menu className='calendar'>
        <div className='days-wrapper'>
          {this.state.numDaysPerSide ? this.renderDays() : null}
        </div>

        <LineViz
          data={this.mapCountsForViz()}
          sideMargin={this.state.sideMargin} />

        <style jsx>{`
          .calendar {
            position: relative;
            margin: 0;
            padding: 0;
          }

          .days-wrapper {
            display: flex;
            position: relative;
            z-index:2;
          }
        `}</style>
      </menu>
    );
  }
}
