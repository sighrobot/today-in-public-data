import React from 'react';

import OpenCorporates  from './open-corporates'
import WeThePeople  from './we-the-people'
import FccEcfs from './fcc-ecfs'
import Caselaw from './caselaw'
import USGSEarthquakes from './usgs-earthquakes'
import NASAFireball from './nasa-fireball'

import { getHighlightStyle } from '../../lib/constants'
import './style.styl'

const getSourceComponent = (sourceKey) => {
    switch (sourceKey) {
        case 'open_corporates':
            return OpenCorporates
        case 'we_the_people':
            return WeThePeople
        case 'fcc_ecfs':
            return FccEcfs
        case 'caselaw':
            return Caselaw
        case 'usgs_earthquakes':
            return USGSEarthquakes
        case 'nasa_jpl_fireball':
            return NASAFireball
        default:
            return 'div'

    }
}

export default ({ data, sourceKey, sourceIndex }) => {
    const Component = getSourceComponent(sourceKey)

    return <Component data={data} style={getHighlightStyle(sourceIndex)} />
}
