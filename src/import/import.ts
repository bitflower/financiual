import Papa from 'papaparse';

export const readCSV = async (filePath): Promise<Papa.ParseResult<any>> => {
  return new Promise(resolve => {
    Papa.parse(filePath, {
      download: true,
      header: true,
      //   worker: true,
      transformHeader: header => header.trim(),
      complete: results => {
        // console.log('Complete', results.data.length, 'records.');
        resolve(results);
      },
    });
  });
};
