import React from 'react'

import './style.styl'

const p = require('../../package.json')

export default class Footer extends React.PureComponent {
  render() {
    return (
      <footer>
        <div>
          <a
            href={`${p.repository}/releases/tag/v${p.version}`}
            target="_blank"
          >
            v{p.version}
          </a>{' '}
          <strong>made with public and open data</strong> by{' '}
          <a
            className="outbound"
            target="_blank"
            href="https://twitter.com/sighrobot"
          >
            @sighrobot
          </a>
        </div>
      </footer>
    )
  }
}
