import { createStore } from '@stencil/store';

import { StageStore } from './store-interface';

const initialStore: StageStore = {
  fields: [],
  data: [],
};

const {
  state,
  // , onChange
} = createStore(initialStore);

// onChange('clicks', value => {
//   state.squaredClicks = value ** 2;
// });

export default state;
