import css from 'styled-jsx/css'

export const countStyle = css`
  .calendar-day-count {
    margin-top: 8px;
    line-height: 1
  }

  .calendar-day-count strong {
    font-size: 12px;
    font-weight: 500;
  }

  .calendar-day-count small {
    font-size: 11px;
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
    background: rgba(255, 255, 255, 0.1);
  }

  .calendar-day:not(:disabled):hover {
    background: rgba(255, 255, 255, 0.05);
    cursor: pointer;
    text-shadow: 5px 5px 1px rgba(255, 0, 0, 0.3), -5px -5px 1px rgba(0, 0, 255, 0.3);
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
    padding: 16px 0;
    text-align: center;
    user-select: none;
    width: 100%;
  }

  .calendar-day-inner span {
    line-height: 1;
  }

  .month-name,
  .day-name {
    font-weight: 100;
    margin-bottom: 2px;
    text-transform: uppercase;
  }

  .month-name {
    font-size: 14px;
  }

  .day-name {
    font-size: 8px;
  }

  .day-number {
    font-size: 22px;
  }
`
