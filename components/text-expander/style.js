import css from 'styled-jsx/css'

export const buttonStyle = css`
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
`
