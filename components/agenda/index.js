import React from 'react';
import { isFunction } from 'lodash'
import moment from 'moment'

import sources from '../../lib/sources'

import { getHighlightStyle } from '../../lib/constants'
import './style.styl'

const OFFSET = 100
const TIME_FMT = 'h:MMa'

export default ({ data, sourceKey, sourceIndex }) => {
    const source = sources[sourceKey]
    const count = source.get.count(data)
    const collection = source.get.collection(data);

    return (
        <div className='agenda'>
            {count > 0 ? collection.map((item) => {
                const time = isFunction(source.get.time) ? moment(source.get.time(item)).format(TIME_FMT) : source.get.time

                return (
                    <a href={source.get.url(item)} target='_blank'>
                        <div
                            className='agenda-item'
                            style={getHighlightStyle(sourceIndex)}
                        >
                            <h4>{source.get.title(item)}</h4>
                            <p>{time}</p>
                        </div>
                    </a>
                )
            }) : null}

            {count > OFFSET ? <aside>+ {(count - OFFSET).toLocaleString()} more</aside> : null}
            {count === 0 ? <aside>No events today.</aside> : null}
        </div>
    )
}
