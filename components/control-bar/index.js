import React from 'react';
import RDP from 'react-datepicker';
import SourceFilter from '../source-filter';
import moment from 'moment'

import './style.styl'

export default ({ dateForPicker, onToggleSource, sourceVisibility, handleFetchDate }) => {
    return (
        <form className='control-bar' >
            <RDP
                className='date-picker-input'
                dateFormat='yyyy/MM/dd'
                showYearDropdown
                onChange={(d) => {
                    handleFetchDate(moment(d))
                }}
                disabledKeyboardNavigation
                selected={new Date(dateForPicker)}
                todayButton='Jump to Today'
                inline
            />

            <SourceFilter
                onToggleSource={onToggleSource}
                sourceVisibility={sourceVisibility}
            />
        </form>
    );
}