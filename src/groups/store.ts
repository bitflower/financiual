import { createStore } from '@stencil/store';
// import { cluster } from './cluster';
// import { cluster2 } from './cluster2';

import { GroupsStore } from './store-interface';

const initialStore: GroupsStore = {
  data: [],
  groups: [],
};

const { state } = createStore(initialStore);

export default state;
