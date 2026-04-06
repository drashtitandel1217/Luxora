import Papa from "papaparse";

export const loadCSV = (filePath) => {
  return new Promise((resolve) => {
    Papa.parse(filePath, {
      download: true,
      header: true,
      complete: (results) => {
        resolve(results.data);
      },
    });
  });
};