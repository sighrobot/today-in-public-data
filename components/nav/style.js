import css from 'styled-jsx/css'

export const triggerStyle = css`
  .date-select-trigger {
    border: none;
    background: transparent;
    color: white;
    font-size: 16px;
    outline: 0;
    padding: 16px 40px;
    text-align: center;
    width: 100%;
  }

  span {
   border-bottom: 1px dotted white;
   transition: 200ms ease text-shadow;
  }

  span:hover {
    cursor: pointer;
    text-shadow: 5px 5px 1px rgba(255, 0, 0, 0.5), -5px -5px 1px rgba(0, 0, 255, 0.5);
  }
`

export default css`
  nav {
    background: linear-gradient(to right, #0063B2, #DC143C);
    color: white;
    text-align: center;
    box-shadow: 0px 3px 5px rgba(0,0, 0, 0.5);
  }
`
