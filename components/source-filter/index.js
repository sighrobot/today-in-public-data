import React from 'react'
import { sortBy, partition } from 'lodash'
import sources from '../../lib/sources'
import { getHighlightStyle } from '../../lib/constants'

import './style.styl'

export default ({ onToggleSource, sourceVisibility = {} }) => {
  const [value, setValue] = React.useState('')

  const sourceKeys = sortBy(Object.keys(sources), k => sources[k].name)

  const [visible, hidden] = partition(sourceKeys, sk => sourceVisibility[sk])

  const filters = sourceKeys
    .filter(
      sk => sources[sk].name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    )
    .map(sourceKey => {
      return (
        <label
          key={sourceKey}
          className={sourceVisibility[sourceKey] ? '' : 'source-filter-hidden'}
          style={getHighlightStyle(sourceKeys.indexOf(sourceKey))}
        >
          <input
            name={sourceKey}
            onChange={onToggleSource}
            checked={sourceVisibility[sourceKey]}
            type="checkbox"
          />
          <span>{sources[sourceKey].name}</span>
        </label>
      )
    })

  const handleChange = e => setValue(e.target.value)

  return (
    <div className="source-filter">
      {/* <input
        placeholder="Filter data sources"
        value={value}
        onChange={handleChange}
      /> */}
      <div className="source-list">{filters}</div>
    </div>
  )
}
