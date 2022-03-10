import { cluster2 } from '../../groups/cluster2';
import { GroupItem } from '../../groups/store-interface';

let myCluster;

export const cluster = async (data: any[], prop: string) => {
  myCluster = cluster2(data, prop);
  return;
};

export const buildGroups = async (ratio: number, sortProp: string, valueProp: string) => {
  const data: any[][] = myCluster.similarGroups(ratio);

  // Cumulate data
  const groups: GroupItem[] = data.map(group => {
    return group.reduce(
      (all: GroupItem, item) => {
        if (!item) {
          return all;
        }

        all.name = item[sortProp];
        if (item[valueProp]) {
          all.value += item[valueProp];
        }

        all.items.push(item);

        return all;
      },
      {
        value: 0,
        items: [],
      },
    );
  });

  return {
    data,
    groups,
  };
};

//   export const expensiveTask = async (buffer: ArrayBuffer) => {
//     for (let i = 0; i < buffer.length; i++) {
//       // do a lot of processing
//     }
//     return buffer;
//   };
