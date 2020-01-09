import React from 'react';

import './style.styl'

const OFFSET = 100;

export default ({ data, style }) => {
    const results = data.results.slice(0, OFFSET)
    const count = data.count

    return (
        <div className='agenda'>
            {count > 0 ? results.map((result) => {
                return (
                    <a href={result.frontend_url} target='_blank'>
                        <div
                            className='agenda-item'
                            style={style}
                        >
                            <h4>{result.name_abbreviation}</h4>
                            <p>Decided today</p>
                        </div>
                    </a>
                )
            }) : null}

            {count > OFFSET ? <aside>+ {(count - OFFSET).toLocaleString()} more</aside> : null}
            {count === 0 ? <aside>No events today.</aside> : null}

        </div>
    )
}
