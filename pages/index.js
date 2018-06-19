import React from 'react';
import Router from 'next/router';
import moment from 'moment';
import {get, flatten, pick, uniqBy} from 'lodash';

import {
  createStringsForDate,
  fetchForDateString,
  getISO,
} from '../lib';

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

        flattened.sort((d1, d2) => get(d1, 'score') < get(d2, 'score') ? 1 : -1);

        this.setState((state) => ({
          datasets: uniqBy(flattened, 'id').map((d) => pick(d, 'description', 'id', 'display_name', 'name', 'current_snapshot', 'ancestors', 'score')),
          isLoading: false,
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

        {this.maybeRenderSearchLink()}
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

  maybeRenderSearchLink() {
    if (!this.state.isLoading) {
      return (
        <aside className='search-link-wrapper'>
          <h3>Looking for more data?</h3>
          <p>Full search results are available on Enigma Public!</p>

          <a target="_blank" href={`https://public.enigma.com/search/${encodeURIComponent(createStringsForDate(this.state.date).join(' || '))}`}>
            View all of today's datasets
          </a>

          <style jsx>{`
            .search-link-wrapper {
              padding: 100px 0;
              margin: 0 auto;
              max-width: 1200px;
            }

            h3 {
              margin: 0;
            }
            a:after {
              content: ' ↗';
            }
          `}</style>
        </aside>
      );
    }
  }

  render() {
    return (
      <div className='wrapper'>
        <Head
          title={`${moment(this.state.date).format('MMMM D, YYYY')} – Today in Public Data`}
          description={`What's happening in public data on ${moment(this.state.date).format('MMMM D, YYYY')}?`}/>

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
