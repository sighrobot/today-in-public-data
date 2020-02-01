import { chunk, find, get } from 'lodash';

import { KEYWORDS } from '../../lib/constants';
import TextExpander from '../text-expander';
import style, { inner } from './style';

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
             || KEYWORDS.INCLUDED.length === 0
             || KEYWORDS.INCLUDED.some((w) => fieldName.toLowerCase().indexOf(w) !== -1)
        )
        && KEYWORDS.EXCLUDED.every((w) => fieldName.toLowerCase().indexOf(w) === -1)
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

          <style jsx>{ inner }</style>
        </div>
      );
    }

    if (
      m
      && typeof m.indexOf === 'function'
      && m.indexOf(todayAsISO) !== -1
      && KEYWORDS.EXCLUDED.every((w) => fieldName.toLowerCase().indexOf(w) === -1)
    ) {
      return (
        <div key={idx} className='one-row' style={{float: 'left'}}>
          <div className={fieldDesc ? 'has-title' : 'no-title'} title={fieldDesc || undefined}>{fieldName}</div>
          <div><mark>{m}</mark></div>

          <style jsx>{ inner }</style>
        </div>
      );
    };
  }).filter((f) => f)
}

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

    <style jsx>{ style }</style>
  </article>
)

export default Card
