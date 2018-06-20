import css from 'styled-jsx/css'

export default css`
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

`
