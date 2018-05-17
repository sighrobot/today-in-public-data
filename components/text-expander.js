import React from 'react';
import PropTypes from 'prop-types';

export default class TextExpander extends React.PureComponent {
  static direction = {
    FORWARD: 'FORWARD',
    REVERSE: 'REVERSE',
  }

  static propTypes = {
    characterThreshold: PropTypes.number,
    children: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    direction: PropTypes.oneOf(Object.keys(TextExpander.direction)),
  }

  static defaultProps = {
    characterThreshold: 250,
    direction: TextExpander.direction.FORWARD,
  }

  state = {
    expanded: this.props.children.length <= this.props.characterThreshold,
  }

  handleClick = () => this.setState({expanded: true})

  renderTrigger() {
    const markup = [];

    if (this.props.direction === TextExpander.direction.FORWARD) {
      markup.push(this.props.children.slice(0, this.props.characterThreshold).split(' ').slice(0, -1).join(' ') + '… ');
    }

    markup.push(
      <button
        key='trigger'
        className='text-expander'
        onClick={this.handleClick}>
        [+ more]

        <style jsx>{`
          button {
            font-size: inherit;
            font-family: inherit;
            line-height: 1;
            border: none;
            color: black;
            font-weight: bold;
            outline: 0;
            padding: 0;

            transition: 200ms ease text-shadow, color;
          }

          button:hover {
            cursor: pointer;
            text-shadow: 5px 5px 1px rgba(255, 0, 0, 0.15), -5px -5px 1px rgba(0, 99, 178, 0.15);
          }
        `}</style>
      </button>
    );

    if (this.props.direction === TextExpander.direction.REVERSE) {
      markup.push(' …' + this.props.children.slice(-(this.props.characterThreshold)).split(' ').slice(1).join(' '));
    }

    return this.maybeRenderChildren(markup);
  }

  maybeRenderChildren(children = this.props.children) {
    if (this.props.component) {
      return (
        <this.props.component className={this.props.className}>
          {children}
        </this.props.component>
      );
    }

    return children;
  }

  render() {
    if (this.state.expanded) { return this.maybeRenderChildren(); }

    return this.renderTrigger();
  }
}
