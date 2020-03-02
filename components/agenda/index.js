import React from 'react'
import { isFunction, sortBy, flatten } from 'lodash'
import moment from 'moment'

import sources from '../../lib/sources'

import { getHighlightStyle } from '../../lib/constants'
import './style.styl'

const TIME_FMT = 'h:mma'
const HOUR_HEIGHT = 100
const AGENDA_WIDTH = 700

export default ({ data, date, sourceKey, sourceIndex }) => {
  const source = sources[sourceKey]
  const count = source.get.count(data)
  const collection = sortBy(source.get.collection(data), d =>
    source.get.time(d)
  ).filter(d => moment(source.get.time(d)).day() === moment(date).day())
  const hours = {}

  collection.forEach((item, idx) => {
    const mItemTime = moment(source.get.time(item))
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
      {count > 0
        ? flatten(
            Object.keys(hours).map((hc, hidx) =>
              hours[hc].map((item, idx) => {
                let time = source.get.time
                let mItemTime

                const today = moment(date).set({
                  hour: 0,
                  minute: 0,
                  second: 0,
                  millisecond: 0,
                })
                mItemTime = moment(source.get.time(item))

                const pct =
                  (mItemTime.toDate().getTime() - today.toDate().getTime()) /
                  86400000
                const pos = HOUR_HEIGHT * 24 * pct
                time = mItemTime.format(TIME_FMT)

                return (
                  <div
                    key={`${hc}-${idx}`}
                    className="agenda-item"
                    style={{
                      top: `${pos}px`,
                      zIndex: hidx + idx + 2,
                      left: `${50 +
                        (idx / hours[hc].length) * (AGENDA_WIDTH - 50)}px`,
                      right: `${AGENDA_WIDTH -
                        ((AGENDA_WIDTH - 50) / hours[hc].length +
                          (50 +
                            (idx / hours[hc].length) *
                              (AGENDA_WIDTH - 50)))}px`,
                      ...getHighlightStyle(sourceIndex),
                    }}
                  >
                    <a href={source.get.url(item)} target="_blank">
                      <h4>{source.get.title(item)}</h4>
                      <p>{time}</p>
                    </a>
                  </div>
                )
              })
            )
          )
        : null}
    </div>
  )
}
