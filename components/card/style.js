import css from 'styled-jsx/css'

export const inner = css`
  .one-row {
    max-width: calc(33.3% - 10px);
    display: inline-block;
    line-height:1;
    z-index:1;
  }

  .one-row:not(:last-child) {
    margin-right: 30px;
    margin-bottom: 15px;
  }

  .one-row div:first-child {
    color: #DC143C;
    color: rgb(116, 64, 120);
    text-transform: uppercase;
    font-size: 10px;
    font-weight: 500;
    line-height: 1;
    letter-spacing: 0.3px;
    display: inline-block;
  }

  .one-row div:first-child:hover:before {
    content: attr(title);
    position: absolute;
    padding: 10px;
    margin-top: 15px;
    text-transform: none;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.3;
    color: white;
    opacity: 0.8;
    background: #16161d;
    z-index: 3;
    border-radius: 2px;
    max-width: 600px;
  }

  .one-row div:last-child {
    font-family: Inconsolata, monospace;
    color: #16161d;
    letter-spacing: 0.5px;
    line-height:1.4;
  }

  .has-title {
    border-bottom: 1px dotted rgb(116, 64, 120);

  }

  .has-title:hover {
    cursor: help;
  }

  .no-title {
    pointer-events: none;
  }
`;

export default css`
  .card {
    padding: 100px 0;
    margin: 0 auto;
    max-width: 1200px;
    position: relative;
  }

  .card:not(:last-child):after {
    position: absolute;
    content: '';
    background: linear-gradient(to right, #0063B2, #DC143C);
    height: 1px;
    width: 100%;
    bottom: 0;
    left: 0;
  }

  h3, p {
    margin: 0;
  }

  h3 {
    margin: 10px 0;
    font-weight: 500;
    max-width: 600px;
  }

  h5 {
    margin: 0;
    margin-bottom: 5px;
    font-weight: 400;
  }

  .card-dataset-data {
    margin: 30px 0;
    word-wrap: break-word;
    font-size: 18px;
    overflow: hidden;
    margin-bottom: 20px;
  }

  :global(.card-dataset-desc) {
    color: #16161d;
    opacity: 0.8;
    line-height: 1.5;
    font-size: 12px;
    max-width: 600px;
  }

  :global(a) {
    color: #16161d;
    font-size: 14px;
    text-decoration: none;
    border-bottom: 1px dotted #16161d;
    transition: 200ms ease text-shadow;
  }

  :global(a:hover) {
    text-shadow: 5px 5px 1px rgba(255, 0, 0, 0.15), -5px -5px 1px rgba(0, 0, 255, 0.15);
  }

  a:after {
    content: ' ↗';
  }

  :global(.cell) {
    display: flex;
    flex-direction: column;
  }

  :global(.row) {
    display: flex;
  }
  :global(mark) {
    background: rgba(255, 255, 0, 0.5);
    padding: 1px 2px;
    border-radius: 2px;
  }
`
