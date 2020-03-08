import React from 'react'
import { getHighlightStyle } from '../../lib/constants'

export default ({ sourceIdx }) => {
  return <div className="schedule-dot" style={getHighlightStyle(sourceIdx)} />
}
