import { createStore } from '@stencil/store';

import stageStore from '../stage/store';

import { ImportStore } from './store-interface';

const initialStore: ImportStore = {
  results: null,
};

const { state, onChange } = createStore(initialStore);

onChange('results', ({ data, meta }) => {
  stageStore.data = data;
  stageStore.fields = meta.fields;
});

export default state;
