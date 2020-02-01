import React from 'react';

import './style.styl'

const OFFSET = 100;

export default ({ data, style }) => {
    const companies = data.results.companies.slice(0, OFFSET)
    const count = data.results.total_count

    return (
        <div className='agenda'>
            {count > 0 ? companies.map(({ company }) => {
                return (
                    <a href={company.opencorporates_url} target='_blank'>
                        <div
                            className='agenda-item'
                            style={style}
                        >
                            <h4>{company.name}</h4>
                            <p>Incorporated today</p>
                        </div>
                    </a>
                )
            }) : null}

            {count > OFFSET ? <aside>+ {(count - OFFSET).toLocaleString()} more</aside> : null}
            {count === 0 ? <aside>No events today.</aside> : null}
        </div>
    )
}
