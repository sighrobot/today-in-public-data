import React from 'react'
import sources from '../../lib/sources'

import Agenda from '../agenda'
import './style.styl';

export default ({ data, sourceVisibility }) => {
  const sourceKeys = Object.keys(sources)

  return (
    <div className='planner'>
      {sourceKeys.map((sourceKey, idx) => {
        if (sourceVisibility[sourceKey]) {
          const source = sources[sourceKey]

          return (
            <section className='planner-section' key={sourceKey}>
              <h3>{source.name}</h3>

              <Agenda
                data={data[sourceKey]}
                sourceKey={sourceKey}
                sourceIndex={idx}
              />
            </section>
          )
        }

        return null
      })}
    </div>
  );
}
