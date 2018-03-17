import React from 'react';
import moment from 'moment';

import Calendar from './calendar';

export default class DatePicker extends React.PureComponent {
  state = {
    isPressed: false,
  }

  handleDateChange = (e) => {
    e.persist();

    this.setState({isPressed: false}, () => {
      this.props.fetchDateFunc(
        e.target.value
        ? new Date(moment(e.target.value).format())
        : undefined
      );
    });
  }

  maybeRenderInput() {
    if (this.props.open) {
      return (
        <input
          autoFocus
          className='date-picker-input'
          onChange={this.handleDateChange}
          type='date'
          value={this.props.date} />
      );
    }
  }

  maybeRenderText() {
    if (!this.props.open) {
      return this.props.date ? moment(this.props.date).format('dddd, MMMM D, YYYY') : 'Today';
    }
  }

  renderPicker() {
    return (
      <span className='date-picker-trigger'>
        {this.maybeRenderInput()}
        {this.maybeRenderText()}

        <style jsx>{`
          .date-picker-trigger {
            border-bottom: 1px dotted white;
            padding: 2px;
          }

          .date-picker-trigger:hover {
            cursor: pointer;
          }

          :global(.date-picker-input) {
            border: 0;
            color: #16161d;
            font-family: inherit;
            font-size: inherit
            outline: 0;
            padding: 4px;
          }
        `}</style>
      </span>
    );
  }

  handlePressed = () => this.setState({isPressed: true})
  handleUnpressed = () => this.setState({isPressed: false})

  render() {
    return (
      <div
        className='date-picker'
        onClick={this.handlePressed}>
        {this.renderPicker()}
        &nbsp; in Public Data

        <style jsx>{`
          .date-picker {
            width: 100%;
            padding: 16px;
            display: inline-block;
            font-weight: bold;
          }
        `}</style>
      </div>
    );
  }
}
