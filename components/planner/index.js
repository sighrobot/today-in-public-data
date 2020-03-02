import React from 'react'
import { sortBy } from 'lodash'

import sources from '../../lib/sources'

import Loader from '../../components/loader'
import Agenda from '../agenda'
import Grid from '../grid'
import './style.styl'

export default ({ data, date, sourceVisibility, loading }) => {
  const sourceKeys = sortBy(Object.keys(sources), k => sources[k].name)
  const visible = sourceKeys.filter(sk => sourceVisibility[sk])

  return (
    <div className="planner">
      <div className="planner-headers">
        <aside></aside>
        {sourceKeys.map((sourceKey, idx) => {
          if (!sourceVisibility[sourceKey]) return null
          return <h3>{sources[sourceKey].name}</h3>
        })}
      </div>

      {loading ? <Loader /> : null}

      <div
        className="planner-agendas"
        style={{
          width: `${visible.length * 700}px`,
        }}
      >
        {!loading &&
          sourceKeys.map((sourceKey, idx) => {
            const source = sources[sourceKey]
            if (!sourceVisibility[sourceKey]) return null

            return (
              <section className="planner-section" key={sourceKey}>
                <Grid numbers={idx % 2 === 0} />
                <Agenda
                  data={data[sourceKey]}
                  date={date}
                  sourceKey={sourceKey}
                  sourceIndex={idx}
                />
              </section>
            )
          })}
      </div>
    </div>
  )
}
