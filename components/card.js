import Link from 'next/link'
import {chunk, get}from 'lodash';

const getCellData = (dataset, todayAsISO) => {
  const highlights = [];

  dataset.current_snapshot.highlights.forEach((h) => {
    if (h.offsets.length > 3) {
      chunk(h.offsets, 3).forEach((o) => {
        highlights.push({offsets: o, path: h.path});
      });
    } else { highlights.push(h); }
  });

  if (highlights.length > 0) {
    let cell = [];

    highlights.forEach((highlight, hi) => {
      const cellContent = get(dataset.current_snapshot, highlight.path);
      let lastIndex = 0;

      cell.push(cellContent.slice(lastIndex, highlight.offsets[0][0]))

      cell.push(
        <mark key={hi}>
          {cellContent.slice(highlight.offsets[0][0], highlight.offsets[highlight.offsets.length - 1][1])}
        </mark>
      );

      cell.push(cellContent.slice(highlight.offsets[highlight.offsets.length - 1][1]));
    });

    return cell;
  }

  const allRows = [];

  dataset.current_snapshot.table_rows.rows.map((row, rowIdx) => {
    allRows.push(
      <div key={rowIdx} className='row'>
        {row.map((cell, colIdx) => {
          if (cell && typeof cell.indexOf === 'function' && cell.indexOf(todayAsISO) !== -1) {
            return (
              <span key={colIdx} className='cell'>
                <strong>{dataset.current_snapshot.fields[colIdx].display_name || dataset.current_snapshot.fields[colIdx].name}</strong>
                <mark>{cell}</mark>
              </span>
            );
          }
        })}
      </div>
    );
  });

  return allRows;
}

const Card = (props) => (
  <article key={props.dataset.id} className='card'>

    <h3>{props.dataset.display_name}</h3>
    <p className='card-dataset-desc'>{props.dataset.description}</p>
    <div className="card-dataset-data">
      {getCellData(props.dataset, props.todayAsISO)}
    </div>
    <a href={`https://public.enigma.com/datasets/${props.dataset.id}`}>
      View all {props.dataset.current_snapshot.table_rows.count.toLocaleString()} records&hellip;
    </a>

    <style jsx>{`
      .card {
        padding: 80px 40px;
        margin: 0 auto;
        max-width: 600px;
        position: relative;
      }

      .card + .card:before {
        content: '';
        height: 1px;
        left: 40px;
        right: 40px;
        top: 0;
        position: absolute;
        background: #16161d
      }

      h3, p {
        margin: 0;
      }

      h3 {
        margin-bottom: 24px;
      }

      .card-dataset-data {
        font-family: courier;
        line-height: 2;
        margin: 24px 0;
        text-align: justify
        word-wrap: break-word;
      }

      a {
        color: #16161d;
        text-decoration: none;
        font-weight: bold;
      }

      a:hover {
        border-bottom: 1px dotted #16161d;
      }

      a:hover:after {
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
        background: purple;
        white-space: nowrap
        color: #eee;
        padding: 2px 4px;
        border-radius: 2px;
      }
    `}</style>
  </article>
)

export default Card
