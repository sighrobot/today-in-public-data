import React from 'react';

import style from './style';

export default class Footer extends React.PureComponent {
  render() {
    return (
      <footer>
        <div>Powered by <a className='outbound' target='_blank' href="https://public.enigma.com/">Enigma Public</a></div>

        <div>Made by <a className='outbound' target='_blank' href='https://twitter.com/sighrobot'>@sighrobot</a></div>

        <style jsx>{ style }</style>
      </footer>
    );
  }
}
