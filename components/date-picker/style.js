import css from 'styled-jsx/css'

export default css`
  .date-picker {
    background: rgba(255, 255, 255, 0);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-top: 20px;
    padding: 0 40px;
    width: 100%;
  }

  .date-picker-input {
    border: none;
    color: #16161d;
    font-family: inherit;
    font-size: inherit
    padding: 4px;
    width: 165px;
  }

  .date-picker-input:hover,
  .date-submit:hover {
    cursor: pointer;
  }

  .date-submit {
    align-self: stretch;
    background: transparent;
    border: 1px solid white;
    color: white;
    margin-left: 8px;
    font-size: 14px;
    padding: 0 12px;
    border-radius: 2px;
    transition: 200ms ease background;
    user-select: none;
  }

  .date-submit[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .date-submit:not[disabled]:hover {
    background: purple;
  }
`
