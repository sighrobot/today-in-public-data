import React from 'react';

import Calendar from './calendar';
import DatePicker from './date-picker';

export default class Nav extends React.PureComponent {
  state = {
    open: false,
  }

  toggleMenu = () => {
    if (!this.state.open) {
      this.setState({open: true})
    }
  }

  renderDateAssemblage() {
    return (
      <div
        className='date-assemblage'
        onClick={this.toggleMenu}>
        <DatePicker
          date={this.props.date}
          fetchDateFunc={this.props.fetchDateFunc}
          open={this.state.open} />

        {
          this.state.open
          ? <Calendar
              counts={this.props.counts}
              focusDate={this.props.date}
              fetchDateFunc={this.props.fetchDateFunc}
              setCountFunc={this.props.setCountFunc}/>
          : null
        }

          <style jsx>{`
            .date-assemblage {

            }
          `}</style>
      </div>
    );
  }

  render() {
    return (
      <nav>
        {this.renderDateAssemblage()}

        <style jsx>{`
          nav {
            background: linear-gradient(to right, blue, purple, red);
            color: white;
            font-size: 15px;
            text-align: center;
          }
        `}</style>
      </nav>
    );
  }
}
