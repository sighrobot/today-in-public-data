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
    sourceVisibility: mapValues(sources, () => true),
  }

  setCount = (date, count) =>
    this.setState(state => ({
      countsByDate: {
        ...state.countsByDate,
        [getISO(date)]: count,
      },
    }))

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

  loadDataOn = async () => {
    const { body } = await fetchData(this.state.date)
    // const body = require('../lib/fake.json')

    this.setState({ data: body, isLoading: false })
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

        <Planner
          data={this.state.data}
          sourceVisibility={this.state.sourceVisibility}
          loading={this.state.isLoading}
        />
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
