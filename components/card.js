import Link from 'next/link'
import css from 'styled-jsx/css'
import { chunk, find, get } from 'lodash';

import TextExpander from './text-expander';

import { createStringsForDate } from '../utils';

const KEYWORDS_WHITE = [
  'abstract',
  'area',
  'desc.',
  'description',
  'definition',
  'details',
  'due',
  'footnote',
  'label',
  'latitude',
  'longitude',
  'elevation',
  'min temp',
  'min. temp',
  'max temp',
  'max. temp',
  'name',
  'notes',
  'reason',
  'remarks',
  'summary',
  'symptom',
  'text',
  'title',
  'type',
  'tax id',
  'ein'
];

const KEYWORDS_BLACK = [
  'compacted',
  'search',
  'serialid',
  'unparsed',
];

const CARD_INNER_STYLE = css`
  .one-row {
    max-width: calc(33.3% - 10px)
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
    line-height: 1.3
    color: white
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

const getCellData2 = (dataset, todayAsISO) => {
  const highlights = [];

  dataset.current_snapshot.highlights.forEach((h) => {
    if (get(h, 'offsets.length') > 3) {
      chunk(h.offsets, 3).forEach((o) => {
        highlights.push({offsets: o, path: h.path});
      });
    } else { highlights.push(h); }
  });

  const fields = dataset.current_snapshot.fields;
  const rows = dataset.current_snapshot.table_rows;

  return rows.rows.slice(0)[0].map((m,idx) => {
    const fieldName = fields[idx].display_name || fields[idx].name;
    const fieldDesc = fields[idx].description || '';

    if (
        m
        && get(m, 'length') > 2
        && (
                idx === 0
                || highlights.some((h) => idx === parseInt(get(h, 'path[3]'), 10))
             || KEYWORDS_WHITE.length === 0
             || KEYWORDS_WHITE.some((w) => fieldName.toLowerCase().indexOf(w) !== -1)
        )
        && KEYWORDS_BLACK.every((w) => fieldName.toLowerCase().indexOf(w) === -1)
    ) {
      const cell = [];

      const highlight = find(highlights, (h) => {
        return (
             parseInt(get(h, 'path[2]'), 10) === 0
          && idx === parseInt(get(h, 'path[3]'), 10)
        );
      })

      if (highlight) {
        const cellContent = get(dataset.current_snapshot, highlight.path);
        const start = cellContent.slice(0, highlight.offsets[0][0]);

        cell.push(
          <TextExpander
            key='x1'
            direction={TextExpander.direction.REVERSE}>
            {start}
          </TextExpander>
        );

        cell.push(
          <mark key='mark'>
            {cellContent.slice(highlight.offsets[0][0], highlight.offsets[get(highlight, 'offsets.length') - 1][1])}
          </mark>
        );

        const end = cellContent.slice(highlight.offsets[get(highlight, 'offsets.length') - 1][1]);

        cell.push(<TextExpander key='x2'>{end}</TextExpander>);
      }

      return  (
        <div
          className='one-row'
          style={{float: 'left'}}
          key={idx}>
          <div className={fieldDesc ? 'has-title' : 'no-title'} title={fieldDesc || undefined}>{fieldName}</div>
          <div>{cell.length > 0 ? cell : m}</div>

          <style jsx>{CARD_INNER_STYLE}</style>
        </div>
      );
    }

    if (
      m
      && typeof m.indexOf === 'function'
      && m.indexOf(todayAsISO) !== -1
      && KEYWORDS_BLACK.every((w) => fieldName.toLowerCase().indexOf(w) === -1)
    ) {
      return (
        <div key={idx} className='one-row' style={{float: 'left'}}>
          <div className={fieldDesc ? 'has-title' : 'no-title'} title={fieldDesc || undefined}>{fieldName}</div>
          <div><mark>{m}</mark></div>

          <style jsx>{CARD_INNER_STYLE}</style>
        </div>
      );
    };
  }).filter((f) => f)
}

const constructDatasetFilter = (d) => {
  return encodeURIComponent(`+[>[${createStringsForDate(d).join(' OR ')}]]`);
};

const Card = (props) => (
  <article key={props.dataset.id} className='card'>
    <h5>
      <a
        href={`https://public.enigma.com/browse/collection/${props.dataset.ancestors[props.dataset.ancestors.length - 2].id}`}
        target='_blank'
        rel='noopener noreferrer'>
        {props.dataset.ancestors[props.dataset.ancestors.length - 2].display_name}
      </a>
    </h5>
    <h3>{props.dataset.display_name}</h3>

    <TextExpander
      component='p'
      className='card-dataset-desc'>
      {props.dataset.description}
    </TextExpander>

    <div className="card-dataset-data">
      {getCellData2(props.dataset, props.todayAsISO)}
    </div>
    <a className='dataset-link' target="_blank" href={`https://public.enigma.com/datasets/${props.dataset.id}?filter=${constructDatasetFilter(props.date)}`}>
      {
        props.dataset.current_snapshot.table_rows.count === 1
        ? 'View this record'
        : `View all ${props.dataset.current_snapshot.table_rows.count.toLocaleString()} records`
      }
    </a>

    <style jsx>{`
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

        // padding: 20px 0;
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
    `}</style>
  </article>
)

export default Card
