import React from 'react'
import { get, sortBy } from 'lodash'

import sources from '../../lib/sources'

import Loader from '../../components/loader'
import Agenda from '../agenda'
import Grid from '../grid'
import styles from './style.module.scss'
import { getHighlightStyle } from '../../lib/constants'

const MIN_WIDTH = 540

export default ({
  data,
  date,
  sourceVisibility,
  loading,
  onInspect,
  inspector,
}) => {
  const [maxWidth, setMaxWidth] = React.useState(MIN_WIDTH)
  const sourceKeys = sortBy(Object.keys(sources), k => sources[k].name)
  const visible = sourceKeys.filter(sk => sourceVisibility[sk])

  React.useEffect(() => {
    const agendaWidth = window.innerWidth / visible.length

    setMaxWidth(Math.max(agendaWidth, MIN_WIDTH))
  }, [visible.length])

  let bg = 'linear-gradient(to right, #f5f5f5,'

  bg += visible
    .map(
      (v, idx) =>
        getHighlightStyle(sourceKeys.indexOf(v)).background +
        ` ${(idx + 0.5) * maxWidth}px`
    )
    .join(',')

  bg += ', #f5f5f5)'

  React.useEffect

  const totalLength = visible.length * maxWidth

  return (
    <div className="planner" style={styles}>
      <hr style={{ background: bg, width: `${totalLength}px` }} />
      <div className="planner-headers" style={{ width: `${totalLength}px` }}>
        {sourceKeys.map((sourceKey, idx) => {
          if (!sourceVisibility[sourceKey]) return null
          return (
            <h3 key={sourceKey} style={{ width: maxWidth }}>
              {sources[sourceKey].name}{' '}
              <span>
                (
                {(data
                  ? get(data[sourceKey], 'data', []).length
                  : 0
                ).toLocaleString()}
                )
              </span>
            </h3>
          )
        })}
      </div>

      {loading ? <Loader /> : null}

      <div
        className="planner-agendas"
        style={{
          width: `${totalLength}px`,
        }}
      >
        {!loading &&
          sourceKeys.map((sourceKey, idx) => {
            if (!sourceVisibility[sourceKey]) return null

            return (
              <section
                className="planner-section"
                key={sourceKey}
                style={{ width: maxWidth }}
              >
                <Grid numbers />
                <Agenda
                  data={data[sourceKey]}
                  date={date}
                  sourceKey={sourceKey}
                  sourceIndex={idx}
                  onInspect={onInspect}
                  inspector={inspector}
                  agendaWidth={maxWidth}
                />
              </section>
            )
          })}
      </div>
    </div>
  )
}
