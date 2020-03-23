import React from 'react'

import Icon from '../icon'

export default ({ children, onChangeView, view }) => {
  return (
    <header
      className="planner-header"
      style={{
        boxShadow: view === 'schedule' ? '0 2px 2px rgba(0, 0, 0, 0.2)' : '',
      }}
    >
      <h2>{children}</h2>
      <div>
        <button
          className={view === 'planner' ? 'active' : ''}
          onClick={onChangeView}
          name="planner"
        >
          <Icon glyph="timeline" />
        </button>
        <button
          className={view === 'schedule' ? 'active' : ''}
          onClick={onChangeView}
          name="schedule"
        >
          <Icon glyph="list" />
        </button>
      </div>
    </header>
  )
}
