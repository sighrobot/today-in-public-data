import React from 'react'
import moment from 'moment'
import { sortBy } from 'lodash'

import sources from '../../lib/sources'

import Dot from './dot'
import './style.styl'
import { TIME_FMT } from '../../lib/constants'

export default ({ data, date, sourceVisibility }) => {
  const sourceKeys = sortBy(Object.keys(sources), k => sources[k].name)
  const visible = sourceKeys.filter(sk => sourceVisibility[sk])
  const eventList = []

  if (data) {
    visible.forEach(sk => {
      const collection = sources[sk].get.collection(data[sk]) || []

      collection.forEach(c => {
        eventList.push({
          time: sources[sk].get.time(c),
          title: sources[sk].get.title(c),
          source: sk,
          url: sources[sk].get.url(c),
        })
      })
    })
  }

  const events = sortBy(eventList, e => moment(e.time).unix())
    .filter(d => moment(d.time).day() === moment(date).day())
    .map((e, idx, filteredEvents) => {
      const content = []

      content.push(
        <li key={`${e.source}-${e.time}-${idx}`}>
          <Dot sourceIdx={sourceKeys.indexOf(e.source)} />
          <div className="schedule-time">{moment(e.time).format(TIME_FMT)}</div>
          <div className="schedule-title">{e.title}</div>
          <a className="schedule-url" href={e.url} target="_blank">
            {e.url}
          </a>
        </li>
      )

      if (idx < filteredEvents.length - 1) {
        if (
          moment(e.time).hour() !== moment(filteredEvents[idx + 1].time).hour()
        ) {
          content.push(<hr key={idx} />)
        }
      }

      return content
    })

  return (
    <div className="schedule">
      <ul>{events}</ul>
    </div>
  )
}
