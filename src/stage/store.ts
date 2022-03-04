import { createStore } from '@stencil/store';

import { fill } from './fill';
import { sort } from './sort';
import { StageStore } from './store-interface';

const initialStore: StageStore = {
  fields: [],
  data: [],
};

const { state, onChange } = createStore(initialStore);

onChange('data', data => {
  const sortProp = 'PayeePayerName';
  const fillProp = 'Purpose';

  // Fill data
  fill(data, sortProp, fillProp);

  // Sort data
  sort(data, sortProp);

  // Cluster data
});

export default state;
