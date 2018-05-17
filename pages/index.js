import React from 'react';
import Router from 'next/router';
import moment from 'moment';
import {get, flatten, pick, uniqBy} from 'lodash';

import {
  createStringsForDate,
  fetchForDateString,
  getISO,
  keyThem,
} from '../utils';

import Calendar from '../components/calendar';
import Card from '../components/card'
import Head from '../components/head'
import Loader from '../components/loader'
import Nav from '../components/nav'
import Footer from '../components/footer'

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

  setCount = (date, countObj) => this.setState((state) => ({
    countsByDate: {
      ...state.countsByDate,
      [getISO(date)]: countObj,
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

        flattened.sort((d1, d2) => get(d1, 'score') < get(d2, 'score') ? 1 : -1);
        const count = flattened.reduce((acc, d) => acc + get(d, 'current_snapshot.table_rows.count', 0), 0);

        this.setState((state) => ({
          datasets: uniqBy(flattened, 'id').map((d) => pick(d, 'description', 'id', 'display_name', 'name', 'current_snapshot', 'ancestors', 'score')),
          isLoading: false,
          countsByDate: {
            ...state.countsByDate,
            [getISO(this.state.date)]: {count: count, exact: flattened.length !== 1000},
          },
        }));
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

  renderCard = (dataset, idx) => {
    return (
      <Card
        key={idx}
        dataset={dataset}
        date={this.state.date}
        todayAsISO={getISO(this.state.date)} />
    );
  }

  renderContent() {
    if (this.props.content) { return this.props.content; }

    if (this.state.isLoading) { return <Loader />; }

    return (
      <div className='content'>
        {this.state.datasets ? this.state.datasets.map(this.renderCard) : null}

        <style jsx>{`
          .content {
            height: 100%;
            padding: 0 20px;
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

        <Footer />

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
