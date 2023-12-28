import Papa from 'papaparse';
// import fs from 'fs';
interface CsvDataRow {
  Director: string;
  Project: string;
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


//usage example

// useEffect(() => {
//   readCSV("src/components/data/projects.csv", (csvData: CsvDataRow[]) => {
//     setData(csvData);
//     const directors = new Set(csvData.map((row) => row.Director));
//     setUniqueDirectors(Array.from(directors));
//   });
// }, []);

// Function to read csv which returns a promise so you can do async / await.

// export const readCSV = async (filePath:string) => {
//   const csvFile = fs.readFileSync(filePath)
//   const csvData = csvFile.toString()  
//   return new Promise(resolve => {
//     Papa.parse(csvData, {
//       header: true,
//       complete: results => {
//         console.log('Complete', results.data.length, 'records.'); 
//         resolve(results.data);
//       }
//     });
//   });
// };

// const test = async () => {
//   let parsedData = await readCSV(csvFilePath); 
//   console.log(parsedData)
// }

// test()