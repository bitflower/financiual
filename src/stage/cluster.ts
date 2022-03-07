import { BestMatch, findBestMatch } from 'string-similarity';

const pivot = {};
// const pivot = new WeakMap();

const ruleOuts = ['AMZN Mktp'];

export const cluster = (data: any[], prop: string) => {
  // Build targets:
  // - filter nulls/undefined
  //- filter empty string
  const targets = data.map(r => r[prop]).filter(s => !!s && s !== '');
  data
    .filter(r => r[prop] !== '')
    .forEach(record => {
      // TODO: Abort of record[prop] is null
      // TODO: Loop over ruleOuts
      if (record[prop] && record[prop].indexOf(ruleOuts[0]) >= 0) {
        // 1. It has a rule out phrase
        setValue(ruleOuts[0], record, prop);
      } else {
        // 2. Auto grouping
        let bestMatch: BestMatch;
        try {
          // console.log(`BF BEST MATCH`, { main: record[prop] });
          bestMatch = findBestMatch(
            record[prop],
            targets.filter(t => t !== record[prop]),
          );
          // console.log(`BF BEST MATCH for ${record[prop]}`);
          // if (bestMatch.bestMatch.rating < 1) {
          if (bestMatch.bestMatch.rating < 1 && bestMatch.bestMatch.rating > 0.72) {
            console.log(`BF BEST MATCH for ${record[prop]}: ${bestMatch.bestMatch.target} (${bestMatch.bestMatch.rating})`, { bestMatch, record });
            setValue(bestMatch.bestMatch.target, record, prop);
          } else {
            setValue(record[prop], record, prop);
          }
        } catch (error) {
          console.log(`CLUSTER: ERROR`, error);
        }
      }
    });

  console.log(`BF THE END`, pivot);
};

const setValue = (pivotValue: string, record: any, prop: string) => {
  if (pivot[pivotValue]) {
    pivot[pivotValue] = pivot[pivotValue] + record['Value'];
  } else {
    pivot[pivotValue] = record['Value'];
    // pivot[record[prop]] = record['Value'];
  }
  //   if (pivot[record[prop]]) {
  //     pivot[record[prop]] = pivot[record[prop]] + record['Value'];
  //     return;
  //   }

  //   if (pivot[pivotValue]) {
  //     pivot[pivotValue] = pivot[pivotValue] + record['Value'];
  //   } else {
  //     // pivot[pivotValue] = record['Value'];
  //     pivot[record[prop]] = record['Value'];
  //   }
};
