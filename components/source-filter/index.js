import React from 'react'
import { sortBy } from 'lodash'
import sources from '../../lib/sources'
import { getHighlightStyle } from '../../lib/constants'

import './style.styl'

export default ({ onToggleSource, sourceVisibility = {} }) => {
  const sourceKeys = sortBy(Object.keys(sources), k => sources[k].name)
  const filters = sourceKeys.map((sourceKey, idx) => {
    return (
      <label
        key={sourceKey}
        className={sourceVisibility[sourceKey] ? '' : 'source-filter-hidden'}
        style={getHighlightStyle(idx)}
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

  return <div className="source-filter">{filters}</div>
}
