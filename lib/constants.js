const BASE_API_URL = 'https://public.enigma.com/api';

export const DATASETS_API_URL = `${BASE_API_URL}/datasets/?&row_limit=1`;
export const SUMMARY_API_URL = `${BASE_API_URL}/dataset_summary?`;

export const KEYWORDS = {
  INCLUDED: [
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
  ],

  EXCLUDED: [
    'compacted',
    'search',
    'serialid',
    'unparsed',
  ],
};
