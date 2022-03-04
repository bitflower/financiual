import Papa from 'papaparse';

// const fs = require('fs');
// Function to read csv which returns a promise so you can do async / await.

export const readCSV = async (filePath): Promise<Papa.ParseResult<any>> => {
  //   const csvFile = await fetch(filePath);
  //   console.log(`BF CSV FILE`, { csvFile });
  //   //   const csvFile = fs.readFileSync(filePath);
  //   const csvData = csvFile.text();
  //   console.log(`BF CSV DATA`, { csvData });
  return new Promise(resolve => {
    Papa.parse(filePath, {
      download: true,
      header: true,
      transformHeader: header => header.trim(),
      complete: results => {
        // console.log('Complete', results.data.length, 'records.');
        resolve(results);
      },
    });
  });
};
