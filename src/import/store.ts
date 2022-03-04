import { createStore } from '@stencil/store';

import stageStore from '../stage/store';

import { ImportStore } from './store-interface';

const initialStore: ImportStore = {
  results: null,
};

const { state, onChange } = createStore(initialStore);

onChange('results', ({ data, meta }) => {
  const sortProp = 'PayeePayerName';
  const fillProp = 'Purpose';

  // Fill data
  data.forEach(record => {
    if (!record[sortProp] || record[sortProp] === '') {
      record[sortProp] = record[fillProp];
    }
  });

  // sort data
  stageStore.data = data.sort((a, b) => (a[sortProp] > b[sortProp] ? 1 : a[sortProp] < b[sortProp] ? -1 : 0));

  stageStore.data = data;
  stageStore.fields = meta.fields;
});

export default state;
