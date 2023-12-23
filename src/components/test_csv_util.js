import Papa from 'papaparse';

export const readCSV = (file, callback) => {
  Papa.parse(file, {
    download: true,
    header: true, // Set to false if your CSV doesn't have a header row
    complete: (results) => {
      callback(results.data);
    }
  });
};
