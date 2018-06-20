import moment from 'moment';
import { get } from 'lodash';

import { DATASETS_API_URL, SUMMARY_API_URL } from './constants';

export const getISO = (d) => d.toISOString().slice(0, 10);

export const createStringsForDate = (d) => {
  const m = moment(d);

  const dAsISO = m.format().slice(0, 10);
  const YYYY = m.format('YYYY');
  const monthName = m.format('MMMM');
  const MM = m.format('MM');
  const DD = m.format('DD');

  const strings = [
    `"${DD} ${monthName} ${YYYY}"`,
    `"${monthName} ${DD} ${YYYY}"`,
    `"${YYYY}-${MM}-${DD}"`,
    `"${d.toDateString().slice(4)}"`, // Oct 23 2017
    `"${dAsISO + 'T00\\:00\\:00'}"`,
    `"${MM}-${DD}-${YYYY}"`,
  ];

  if (parseInt(DD, 10) > 12) {
    strings.push(`"${DD}-${MM}-${YYYY}"`);
  }

  return strings;
};

export const fetchForDateString = (s) => {
  return fetch(
    `${DATASETS_API_URL}&query=${encodeURIComponent(s)}`,
    { headers: { 'Range': 'resources=0-24' } }
  ).then((response) => response);
};

export const fetchCountForDateString = (s) => {
  return fetch(`${SUMMARY_API_URL}&query_mode=advanced&query=(${encodeURIComponent(s)})`, {'cache': 'no-store'}).then((response) => {
    return response.json().then((summary) => {
      return summary.row_count_summary.reduce((acc, b) => acc + b.count, 0);
    });
  });
};

// https://stackoverflow.com/a/32638472/2502505
export const formatNum = function(num, fixed) {
  if (num === null) { return null; } // terminate early
  if (num === 0) { return '0'; } // terminate early
  fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
  var b = (num).toPrecision(2).split("e"), // get power
      k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
      c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3) ).toFixed(1 + fixed), // divide by power
      d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
      e = d + ['', 'K', 'M', 'B', 'T'][k]; // append power
  return e;
}

export const getNumDaysPerSide = () => {
  const w = global.innerWidth;

  if (w < 450) { return 1; }
  if (w < 600) { return 2; }
  if (w < 960) { return 3; }

  return 4;
};

export const isToday = (d) => d && moment(d).diff(moment(new Date()), 'days') === 0;
