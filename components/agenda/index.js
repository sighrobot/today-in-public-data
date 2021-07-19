import React from 'react'
import { get, isEqual, flatten } from 'lodash'
import moment from 'moment'

import { getHighlightStyle, TIME_FMT } from '../../lib/constants'
import './style.styl'

const HOUR_HEIGHT = 100
const PADDING_RIGHT = 35

export default ({
  data,
  date,
  sourceIndex,
  onInspect,
  inspector,
  agendaWidth: AGENDA_WIDTH,
  isAllDay,
}) => {
  const collection = get(data, 'data', [])

  if (isAllDay) {
    return collection.map((item, idx) => {
      return (
        <div
          key={idx}
          onClick={() => onInspect(item)}
          className={`agenda-item agenda-item-all-day ${
            isEqual(item, inspector) ? 'agenda-item-inspected' : ''
          }`}
          style={getHighlightStyle(sourceIndex)}
        >
          <h4>{item.title}</h4>
          <p>All day</p>
        </div>
      )
    })
  }

  const hours = {}

  collection.forEach(item => {
    const mItemTime = moment(item.time)
    let k = `h${mItemTime.hour()}`
    if (mItemTime.minute() >= 30) k += 'm30'
    const hourC = hours[k]

    if (hourC) {
      hourC.push(item)
    } else {
      hours[k] = [item]
    }
  })

  return (
    <div className="agenda">
      {collection.length > 0
        ? flatten(
            Object.keys(hours).map((hc, hidx) =>
              hours[hc].map((item, idx) => {
                const today = moment(date).set({
                  hour: 0,
                  minute: 0,
                  second: 0,
                  millisecond: 0,
                })
                const pct = (item.time - today.toDate().getTime()) / 86400000
                const pos = HOUR_HEIGHT * 24 * pct

                return (
                  <div
                    key={`${hc}-${idx}`}
                    onClick={() => onInspect(item)}
                    className={`agenda-item ${
                      isEqual(item, inspector) ? 'agenda-item-inspected' : ''
                    }`}
                    style={{
                      top: `${pos}px`,
                      zIndex: hidx + idx + 2,
                      left: `${PADDING_RIGHT +
                        (idx / hours[hc].length) *
                          (AGENDA_WIDTH - PADDING_RIGHT)}px`,
                      right: `${AGENDA_WIDTH -
                        ((AGENDA_WIDTH - PADDING_RIGHT) / hours[hc].length +
                          (PADDING_RIGHT +
                            (idx / hours[hc].length) *
                              (AGENDA_WIDTH - PADDING_RIGHT)))}px`,
                      ...getHighlightStyle(sourceIndex),
                    }}
                  >
                    <h4>{item.title}</h4>
                    <p>{moment(item.time).format(TIME_FMT)}</p>
                  </div>
                )
              })
            )
          )
        : null}
    </div>
  )
}
