import css from 'styled-jsx/css'

export const countStyle = css`
  .calendar-day-count {
    margin-top: 5px;
    line-height: 1
  }

  .calendar-day-count strong {
    font-size: 10px;
    font-weight: 500;
  }

  .calendar-day-count small {
    font-size: 9px;
    font-weight: 100;
  }
`

export default css`
  .calendar-day {
    border: none;
    color: white;
    outline: 0;
    padding: 0;
    width: 100%;
    position: relative;

    transition: 200ms ease background, text-shadow;
  }

  .calendar-day:not(.calendar-day-active) {
    background: rgba(255, 255, 255, 0.15);
  }

  .calendar-day:not(:disabled):hover {
    background: rgba(255, 255, 255, 0.05);
    cursor: pointer;
  }

  .calendar-day:not(:disabled):active {
    background: transparent;
  }

  .calendar-day-active {
    background: transparent;
    font-weight: 500;
    text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.5);
  }

  .calendar-day:not(.calendar-day-active):disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .calendar-day-inner {
    align-items: center;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;
    padding: 10px 0;
    text-align: center;
    user-select: none;
    width: 100%;
  }

  .calendar-day-inner span {
    line-height: 1;
  }

  .day-name {
    font-size: 8px;
    font-weight: 100;
    margin-bottom: 3px;
    text-transform: uppercase;
  }

  .day-number {
    font-weight: 200;
    font-size: 12px;
  }
`
