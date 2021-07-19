import React from 'react'
import Router from 'next/router'
import { withRouter } from 'next/router'
import moment from 'moment'
import { get, isEqual, mapValues } from 'lodash'

import { fetchData } from '../lib/utils'
import sources from '../lib/sources'

import Head from '../components/head'
import Footer from '../components/footer'
import Planner from '../components/planner'
import CalendarHeader from '../components/planner/header'
import Schedule from '../components/schedule'
import Inspector from '../components/inspector'
import ControlBar from '../components/control-bar'

class App extends React.PureComponent {
  initDate = () => {
    const dateStringFromUrl = get(this.props, 'router.asPath').split('date=')[1]

    return dateStringFromUrl ? moment(dateStringFromUrl).toDate() : new Date()
  }

  state = {
    date: this.initDate(),
    isLoading: true,
    data: null,
    sourceVisibility: mapValues(sources, (value, key) => true),
    view: 'planner',
    event: null,
    menu: false,
    search: '',
  }

  toggleView = ({ target: { name: view } }) => this.setState({ view })

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
        this.loady(k, this.state.search)
      })
  }

  loady = async (key, search) => {
    const { body } = await fetchData(this.state.date, [key], search)
    // const body = require('../lib/fake.json')

    this.setState({
      data: Object.assign({}, this.state.data, body),
      isLoading: false,
    })
  }

  componentDidMount() {
    this.loadDataOn()
  }

  handleInspectEvent = event =>
    this.setState(state => {
      const newState = { event }

      if (isEqual(state.event, event)) {
        newState.event = null
      }

      return newState
    })
  closeInspector = () => this.setState({ event: null })

  toggleMenu = () => this.setState(state => ({ menu: !state.menu }))

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

    const eventCount = Object.keys(this.state.sourceVisibility)
      .filter(sk => this.state.sourceVisibility[sk])
      .reduce((acc, sk) => {
        const data = get(this.state.data, sk)

        if (data) {
          return acc + data.data.length
        }

        return acc + 0
      }, 0)

    return (
      <main>
        <ControlBar
          menu={this.state.menu}
          dateForPicker={this.state.date}
          onToggleSource={this.handleToggleSource}
          sourceVisibility={this.state.sourceVisibility}
          handleFetchDate={this.handleFetchDate}
        />

        <div className="calendar-wrap">
          <CalendarHeader onChangeView={this.toggleView} view={this.state.view}>
            <strong>{eventCount.toLocaleString()}</strong>{' '}
            {eventCount === 1 ? 'event' : 'events'}
          </CalendarHeader>
          {this.state.view === 'planner' ? (
            <Planner
              data={this.state.data}
              date={this.state.date}
              inspector={this.state.event}
              sourceVisibility={this.state.sourceVisibility}
              loading={this.state.isLoading}
              onInspect={this.handleInspectEvent}
            />
          ) : (
            <Schedule
              data={this.state.data}
              date={this.state.date}
              inspector={this.state.event}
              sourceVisibility={this.state.sourceVisibility}
              loading={this.state.isLoading}
              onInspect={this.handleInspectEvent}
            />
          )}
        </div>

        <Inspector event={this.state.event} onClose={this.closeInspector} />
      </main>
    )
  }

  handleSearchSubmit = e => {
    e.preventDefault()

    console.log('search for', this.state.search)
    this.loadDataOn()
  }

  handleSearchChange = e => {
    this.setState({ search: e.target.value })
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

        <Footer date={this.state.date} toggleMenu={this.toggleMenu} />

        <form onSubmit={this.handleSearchSubmit}>
          <input onChange={this.handleSearchChange} value={this.state.search} />
        </form>

        {this.renderContent()}

        <script> </script>
        {/* https://github.com/zeit/next-plugins/issues/455#issuecomment-489452379 */}
      </>
    )
  }
}

export default withRouter(App)
