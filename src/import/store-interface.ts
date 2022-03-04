import Papa from 'papaparse';

export interface ImportStore {
  results: Papa.ParseResult<any>;
}
