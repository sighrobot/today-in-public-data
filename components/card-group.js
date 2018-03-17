import React from 'react';
import PropTypes from 'prop-types';

export default class CardGroup extends React.PureComponent {
  static propTypes = {
    children: PropTypes.any,
    level: PropTypes.number,
    title: PropTypes.any.isRequired,
  }

  static defaultProps = {
    children: null,
    level: 0,
  }

  render() {
    return (
      <section className='card-group'>
        <h5>
          <div style={{background: `rgba(255,255,255,${0.25 * (this.props.level + 1) / 3})`}}>
            <div>
              <a
                href={`https://public.enigma.com/browse/`}
                target='_blank'
                rel='noopener noreferrer'>
                {this.props.title}
              </a>
            </div>
          </div>
        </h5>

        {this.props.children}

        <style jsx>{`
          section {
            min-height: calc(100vh - 50px);
            color: #16161d;
          }

          h5 {
            font-size: 14px;
            font-weight: 100;
            z-index:1;
            margin: 0;
            width: 100%;
          }

          h5 > div > div {
            margin: 0 auto;
            max-width: 600px;
            padding: 4px 40px;
          }

          h5 > div > div > a {
            color: inherit;
            text-decoration: none;
            border-bottom: 1px dotted #16161d;
          }

          h5 > div > div> a:hover {
            background: linear-gradient(to left, #16161d, white);
            color: white;
          }

          h5 > div > div > a:after {
            content: ' ↗';
          }
        `}</style>
      </section>
    );
  }
}
