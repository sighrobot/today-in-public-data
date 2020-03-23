import React from 'react'
import moment from 'moment'
import { isEqual, sortBy } from 'lodash'

import sources from '../../lib/sources'

import Dot from './dot'
import './style.styl'
import { TIME_FMT, getHighlightStyle } from '../../lib/constants'

export default ({ data, date, inspector, onInspect, sourceVisibility }) => {
  const sourceKeys = sortBy(Object.keys(sources), k => sources[k].name)
  const visible = sourceKeys.filter(sk => sourceVisibility[sk])
  const eventList = []

  if (data) {
    visible.forEach(sk => {
      const collection = data[sk] ? data[sk].data || [] : []

      collection.forEach(c => {
        eventList.push({
          ...c,
          source: sk,
        })
      })
    })
  }

  const filteredEvents = sortBy(eventList, e => moment(e.time).unix()).filter(
    d => moment(d.time).day() === moment(date).day()
  )

  const events = filteredEvents.map((e, idx, filteredEvents) => {
    const content = []

    content.push(
      <li
        className={isEqual(e, inspector) ? 'inspected' : ''}
        onClick={() => onInspect(e)}
        key={`${e.source}-${e.time}-${idx}`}
      >
        <Dot sourceIdx={sourceKeys.indexOf(e.source)} />
        <div className="schedule-time">{moment(e.time).format(TIME_FMT)}</div>
        <div className="schedule-title">{e.title}</div>
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
