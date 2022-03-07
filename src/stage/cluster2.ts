// import difflib from 'difflib';
import cluster from 'set-clustering';
import { compareTwoStrings } from 'string-similarity';

// var words = ['stephen', 'albert', 'stephanie', 'bernard', 'norbert'];

// Words similarity is based on how much of a word needs to be changed
// to make it into the other.  E.g. "ABCD" and "QBCD" are 80% similar,
// while "A" and "B" are 0% similar.
function similarity(x, y) {
  // return new difflib.SequenceMatcher(null, x, y).ratio();
  if (!x || !y) {
    return 0;
  }
  return compareTwoStrings(x, y);
}

export const cluster2 = (words: string[]) => {
  return cluster(words, similarity);
};

// var c = cluster(words, similarity);
