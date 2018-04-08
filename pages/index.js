import React from 'react';
import Router from 'next/router';
import moment from 'moment';
import {get, flatten} from 'lodash';

import {
  createStringsForDate,
  fetchForDateString,
  getISO,
  keyThem,
} from '../utils';

import Calendar from '../components/calendar';
import Card from '../components/card'
import CardGroup from '../components/card-group';
import Head from '../components/head'
import Link from 'next/link'
import Loader from '../components/loader'
import Nav from '../components/nav'

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);

    const dateStringFromUrl = get(props, 'url.query.date');

    this.state = {
      countsByDate: {},
      date: dateStringFromUrl ? moment(dateStringFromUrl).toDate() : new Date(),
      datasets: null,
      isLoading: true,
    };
  }

  setCount = (date, count) => this.setState((state) => ({
    countsByDate: {
      ...state.countsByDate,
      [getISO(date)]: count,
    }
  }))

  updateRoute = (d) => {
    const nextRouting = {pathname: '/'};

    if (d) { nextRouting.query = {date: moment(d).format('YYYY-MM-DD')}; }

    Router.push(nextRouting);
  }

  loadDataOn = () => {
    const strings = createStringsForDate(this.state.date);

    Promise.all(strings.map(fetchForDateString)).then((responses) => {
      Promise.all(responses.map((r) => r.json())).then((jsons) => {
        const flattened = flatten(jsons);

        const mapped = keyThem(flattened, 'ancestors[1].display_name');

        Object.keys(mapped).forEach((k) => {
          mapped[k] = keyThem(mapped[k], 'ancestors[2].display_name')

          // Object.keys(mapped[k]).forEach((k2) => {
          //   mapped[k][k2] = keyThem(mapped[k][k2], 'ancestors[3].display_name')
          // });
        })

        // console.log(mapped)

        this.setState({
          datasets: flattened,
          isLoading: false,
          mapped: mapped,
        });
      });
    });
  }

  componentDidMount() {
    this.loadDataOn();
  }

  handleFetchDate = (d) => {
    this.updateRoute(d);

    this.setState({date: d || new Date(), isLoading: true}, this.loadDataOn);
  }

  renderSection = (things = this.state.mapped, level=0) => {
    return Object.keys(things).map((k, idx) => {
      const moreThings = things[k];

      return (
        <CardGroup key={k} level={level} title={k}>
          {moreThings.length ? moreThings.map(this.renderCard) : this.renderSection(moreThings, level+1)}
        </CardGroup>
      );
    });
  }

  renderCard = (dataset, idx) => {
    return (
      <Card
        key={idx}
        dataset={dataset}
        todayAsISO={getISO(this.state.date)} />
    );
  }

  renderContent() {
    if (this.state.isLoading) { return <Loader />; }

    return (
      <div className='content'>
        {this.state.datasets ? this.renderSection() : null}

        <style jsx>{`
          .content {
            height: 100%;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
          }
        `}</style>
      </div>
    );
  }

  render() {
    return (
      <div className='wrapper'>
        <Head title={`${moment(this.state.date).format('MMMM D, YYYY')} – Today in Public Data`} />

        <Nav
          date={this.state.date}
          counts={this.state.countsByDate}
          fetchDateFunc={this.handleFetchDate}
          setCountFunc={this.setCount} />

        {this.renderContent()}

        <style jsx>{`
          :global(*) {
            box-sizing: border-box;
          }

          :global(body) {
            background: white;
            font-family: -apple-system,BlinkMacSystemFont,Avenir Next,Avenir,Helvetica,sans-serif;
            margin: 0;
          }

          nav {
            flex-shrink: 0;
          }

          .wrapper {
            display: flex;
            flex-direction: column
            height: 100vh;
            overflow: hidden;
          }
        `}</style>
      </div>
    );
  }
}
