// import difflib from 'difflib';
import cluster from 'set-clustering';
import { compareTwoStrings } from 'string-similarity';

// // Words similarity is based on how much of a word needs to be changed
// // to make it into the other.  E.g. "ABCD" and "QBCD" are 80% similar,
// // while "A" and "B" are 0% similar.
// function similarity(x: any, y: any, prop: string) {
//   // return new difflib.SequenceMatcher(null, x, y).ratio();
//   if (!x || !x[prop] || !y || !y[prop]) {
//     return 0;
//   }
//   return compareTwoStrings(x[prop], y[prop]);
// }

function getCompareFn(prop: string) {
  return function similarity(x: any, y: any) {
    // return new difflib.SequenceMatcher(null, x, y).ratio();
    if (!x || !x[prop] || !y || !y[prop]) {
      return 0;
    }
    return compareTwoStrings(x[prop], y[prop]);
  };
}

export const cluster2 = (items: any[], prop: string) => {
  items = items.filter(item => !!item[prop]);
  return cluster(items, getCompareFn(prop));
  // const words = items.map(i => i[prop]);
  // return cluster(words, similarity);
};
