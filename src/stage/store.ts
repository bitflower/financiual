import { createStore } from '@stencil/store';
// import { cluster } from './cluster';
import { cluster2 } from './cluster2';

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
  // cluster(data, sortProp);

  const cluster = cluster2(data.map(i => i[sortProp]));
  // console.log(`BF CLUSTER`, cluster);
  // console.log(`BF CLUSTER`, cluster.groups(2));
  console.log(`BF CLUSTER`, cluster.similarGroups(0.5));
});

export default state;
