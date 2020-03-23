import React from 'react'
import RDP from 'react-datepicker'
import SourceFilter from '../source-filter'
import moment from 'moment'

import './style.styl'
import '../date-picker/style.styl'

export default ({
  dateForPicker,
  onToggleSource,
  sourceVisibility,
  handleFetchDate,
  menu
}) => {
  return (
    <div className={`control-bar ${menu ? 'control-bar-open' : ''}`}>
      <div className='date-control-wrapper'>
        <RDP
          className="date-picker-input"
          dateFormat="yyyy/MM/dd"
          onChange={d => {
            handleFetchDate(moment(d))
          }}
          disabledKeyboardNavigation
          selected={new Date(dateForPicker)}
          todayButton="Today"
          showMonthDropdown
      showYearDropdown
          inline
        />
      </div>

      <SourceFilter
        onToggleSource={onToggleSource}
        sourceVisibility={sourceVisibility}
      />
    </div>
  )
}
