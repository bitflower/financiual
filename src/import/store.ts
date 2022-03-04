import { createStore } from '@stencil/store';

import { ImportStore } from './store-interface';

const initialStore: ImportStore = {
  results: null,
};

const {
  state,
  // , onChange
} = createStore(initialStore);

// onChange('clicks', value => {
//   state.squaredClicks = value ** 2;
// });

export default state;
