import React from 'react'

import './style.styl'

export default class Footer extends React.PureComponent {
  render() {
    return (
      <footer>
        <div>
          <strong>Made with public and open data</strong> by{' '}
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
