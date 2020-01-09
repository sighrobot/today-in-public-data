import React from 'react';
import sources from '../../lib/sources'
import { getHighlightStyle } from '../../lib/constants'

import './style.styl'

export default ({ onToggleSource, sourceVisibility = {} }) => {
    const sourceKeys = Object.keys(sources)
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
                    type='checkbox'
                />
                <span>{sources[sourceKey].name}</span>
            </label>
        )
    })

    return (
        <div className='source-filter'>
            {filters}
        </div>
    );
}
