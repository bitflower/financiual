import Papa from 'papaparse';

const valueProp = 'Value';

export const readCSV = async (filePath): Promise<Papa.ParseResult<any>> => {
  return new Promise(resolve => {
    Papa.parse(filePath, {
      download: true,
      header: true,
      //   worker: true,
      transformHeader: header => header.trim(),
      // fastMode: true,
      transform: (value, columnName) => {
        if (columnName === valueProp) {
          return parseFloat(value); // TODO: Fix removed decimals
        }
        return value;
      },
      complete: results => {
        // console.log('Complete', results.data.length, 'records.');
        resolve(results);
      },
    });
  });
};
