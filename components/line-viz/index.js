import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveLine } from '@nivo/line';

import style from './style';

export default class LineViz extends React.PureComponent {
  static propTypes = {
    data: PropTypes.array,
    sideMargin: PropTypes.number,
  }

  static defaultProps = {
    data: [],
    sideMargin: 0,
  }

  render() {
    return (
      <div className='viz-wrapper'>
        <ResponsiveLine
          data={this.props.data}
          animate={true}
          colors={['rgba(255, 255, 0, 0.5)']}
          enablePoints={false}
          enableGridX={false}
          enableGridY={false}
          isInteractive={false}
          margin={{
              top: 6,
              bottom: 5,
              left: -this.props.sideMargin,
              right: -this.props.sideMargin,
          }}
          axisBottom={{tickSize: 0}}
          axisLeft={{tickSize: 0}}
          minY='auto'
          lineWidth={2}
          curve='linear' />

        <style jsx>{ style }</style>
      </div>
    );
  }
}
