import React from 'react'
import Router from 'next/router'
import { withRouter } from 'next/router'
import moment from 'moment'
import { get, mapValues } from 'lodash'

import { fetchData, getISO } from '../lib/utils'
import sources from '../lib/sources'

import Head from '../components/head'
import Nav from '../components/nav'
import Footer from '../components/footer'
import Planner from '../components/planner'
import Schedule from '../components/schedule'
import ControlBar from '../components/control-bar'

class App extends React.PureComponent {
  static getInitialProps() {
    return {}
  }

  initDate = () => {
    const dateStringFromUrl = get(this.props, 'router.query.date')

    return dateStringFromUrl ? moment(dateStringFromUrl).toDate() : new Date()
  }

  state = {
    countsByDate: {},
    date: this.initDate(),
    isLoading: true,
    data: null,
    sourceVisibility: mapValues(sources, (value, key) =>
      ['nasa_neo', 'open_corporates', 'usgs_earthquakes'].includes(key)
    ),
    view: 'planner',
  }

  setCount = (date, count) =>
    this.setState(state => ({
      countsByDate: {
        ...state.countsByDate,
        [getISO(date)]: count,
      },
    }))

  toggleView = () =>
    this.setState({
      view: this.state.view === 'planner' ? 'schedule' : 'planner',
    })

  updateRoute = d => {
    const nextRouting = {
      pathname: '/',
      query: {
        date: this.props.router.query.date,
      },
    }

    if (d) {
      nextRouting.query.date = moment(d).format('YYYY-MM-DD')
    }

    Router.push(nextRouting)
  }

  loadDataOn = () => {
    Object.keys(this.state.sourceVisibility)
      .filter(k => this.state.sourceVisibility[k])
      .forEach(k => {
        this.loady(k)
      })
  }

  loady = async key => {
    const { body } = await fetchData(this.state.date, [key])
    // const body = require('../lib/fake.json')

    this.setState({
      data: Object.assign({}, this.state.data, body),
      isLoading: false,
    })
  }

  componentDidMount() {
    this.loadDataOn()
  }

  handleFetchDate = d => {
    this.updateRoute(d)

    this.setState({ date: d || new Date(), isLoading: true }, this.loadDataOn)
  }

  handleToggleSource = e => {
    e.persist()

    if (e.target.checked) {
      this.loady(e.target.name)
    }

    this.setState(state => {
      const newSourceVisibility = { ...state.sourceVisibility }

      newSourceVisibility[e.target.name] = e.target.checked

      return {
        ...state,
        sourceVisibility: newSourceVisibility,
      }
    })
  }

  renderContent() {
    if (this.props.content) {
      return this.props.content
    }

    return (
      <main>
        <ControlBar
          dateForPicker={this.state.date}
          onToggleSource={this.handleToggleSource}
          sourceVisibility={this.state.sourceVisibility}
          handleFetchDate={this.handleFetchDate}
        />

        {this.state.view === 'planner' ? (
          <Planner
            data={this.state.data}
            date={this.state.date}
            sourceVisibility={this.state.sourceVisibility}
            loading={this.state.isLoading}
          />
        ) : (
          <Schedule
            data={this.state.data}
            date={this.state.date}
            sourceVisibility={this.state.sourceVisibility}
            loading={this.state.isLoading}
          />
        )}
      </main>
    )
  }

  render() {
    return (
      <>
        <Head
          title={`${moment(this.state.date).format(
            'MMMM D, YYYY'
          )} – Today in Public Data`}
          description={`What's happening in public data on ${moment(
            this.state.date
          ).format('MMMM D, YYYY')}?`}
        />

        <Nav
          date={this.state.date}
          counts={this.state.countsByDate}
          fetchDateFunc={this.handleFetchDate}
          setCountFunc={this.setCount}
          handleViewChange={this.toggleView}
        />

        {this.renderContent()}

        <Footer />

        <script> </script>
        {/* https://github.com/zeit/next-plugins/issues/455#issuecomment-489452379 */}
      </>
    )
  }
}

export default withRouter(App)
