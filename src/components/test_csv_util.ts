import Papa from 'papaparse';

interface CsvDataRow {
  Director: string;
  Project: string;
  // Add more fields as per your CSV structure
}

export const readCSV = (file: string, callback: (data: CsvDataRow[]) => void) => {
  Papa.parse(file, {
    download: true,
    header: true, // Set to false if your CSV doesn't have a header row
    complete: (results) => {
      const typedData = results.data as CsvDataRow[];
      callback(typedData);
    }
  });
};
