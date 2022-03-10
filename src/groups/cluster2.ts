import cluster from 'set-clustering';
import { compareTwoStrings } from 'string-similarity';

function getCompareFn(prop: string) {
  return function similarity(x: any, y: any) {
    if (!x || !x[prop] || !y || !y[prop]) {
      return 0;
    }
    return compareTwoStrings(x[prop], y[prop]);
  };
}

export const cluster2 = (items: any[], prop: string) => {
  items = items.filter(item => !!item[prop]);
  return cluster(items, getCompareFn(prop));
};
