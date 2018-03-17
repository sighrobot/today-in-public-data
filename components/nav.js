import React from 'react';
import moment from 'moment';

import Calendar from './calendar';
import DatePicker from './date-picker';
import {isToday} from '../utils';

export default class Nav extends React.PureComponent {
  state = {
    open: false,
  }

  toggleMenu = () => {
    this.setState({open: !this.state.open})
  }

  renderDateText = () => (
    isToday(this.props.date)
    ? 'Today'
    : moment(this.props.date).format('dddd, MMMM D, YYYY')
  )

  renderTitle() {
    return (
      <button
        className='date-select-trigger'
        onClick={this.toggleMenu}>
        <span>
          <strong>{this.renderDateText()}</strong> in&nbsp;Public&nbsp;Data
        </span>

        <style jsx>{`
          .date-select-trigger {
            border: none;
            background: transparent;
            color: white;
            font-size: 16px;
            outline: 0;
            padding: 20px 40px;
            text-align: center;
            width: 100%;
          }

          span:hover {
            border-bottom: 1px dotted white;
            cursor: pointer;
          }
        `}</style>
      </button>
    );
  }

  render() {
    return (
      <nav>
        {
          this.state.open
          ? <Calendar
              counts={this.props.counts}
              focusDate={this.props.date}
              fetchDateFunc={this.props.fetchDateFunc}
              setCountFunc={this.props.setCountFunc}/>
          : null
        }

        {
          this.state.open
          ? <DatePicker
              date={this.props.date}
              fetchDateFunc={this.props.fetchDateFunc} />
          : null
        }

        {this.renderTitle()}

        <style jsx>{`
          nav {
            background: linear-gradient(to right, blue, purple, red);
            color: white;
            text-align: center;
          }
        `}</style>
      </nav>
    );
  }
}
