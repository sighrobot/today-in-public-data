import React from 'react';

import Link from 'next/link'

export default class Footer extends React.PureComponent {
  render() {
    return (
      <footer>
        <div>Powered by <a className='outbound' target='_blank' href="https://public.enigma.com/">Enigma Public</a></div>

        <div>Made by <a className='outbound' target='_blank' href='https://twitter.com/sighrobot'>@sighrobot</a></div>

        <style jsx>{`
          footer {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            background: white;
            color: #16161d;
            font-size:12px;
            padding: 16px;
            box-shadow: 0px -3px 5px rgba(0,0,0,0.25);
          }

          a {
            font-size: 12px;
          }

          a.outbound:after {
            content: ' ↗';
          }

        `}</style>
      </footer>
    );
  }
}
