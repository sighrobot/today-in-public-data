import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import moment from 'moment';
import {ResponsiveLine} from '@nivo/line';

import {getNumDaysPerSide, getISO} from '../utils';

import Day from './calendar-day';

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

  renderViz() {
    return (
      <div className='viz-wrapper'>
        <ResponsiveLine
          data={this.mapCountsForViz()}
          animate={true}
          colors={['rgba(255, 255, 0, 0.5)']}
          enableDots={false}
          enableGridX={false}
          enableGridY={false}
          isInteractive={false}
          margin={{
              top: 6,
              bottom: 5,
              left: -this.state.sideMargin,
              right: -this.state.sideMargin,
          }}
          axisBottom={{tickSize: 0}}
          axisLeft={{tickSize: 0}}
          minY='auto'
          lineWidth={2}
          curve='linear' />

        <style jsx>{`
          .viz-wrapper {
            position: absolute;
            top:0;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 1;
          }
        `}</style>
      </div>
    );
  }

  render() {
    return (
      <menu className='calendar'>
        <div className='days-wrapper'>
          {this.state.numDaysPerSide ? this.renderDays() : null}
        </div>

        {this.renderViz()}

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
