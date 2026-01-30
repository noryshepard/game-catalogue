//logic glue (state, parsing, transforming)

import { useState } from "react";
import { GameImportField } from "./csvImportFields";
import Papa from "papaparse";

// ----- Types -----

export type CsvColumn = {
  name: string;
};

export type ImportMapping = {
  [key in GameImportField]?: string;
};


// ----- Helper function -----

export function parseCsvFile(
  file: File,
  onComplete: (columns: string[], rows: Record<string, string>[]) => void
) {
  Papa.parse<Record<string, string>>(file, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.replace(/^"|"$/g, ""), // trim quotes
    complete: (results) => {
      const columns = results.meta.fields || [];
      onComplete(columns, results.data);
    },
  });
}

// ----- Custom Hook -----

export function useCsvImport(onParsed?: () => void) {
  const [csvColumns, setCsvColumns] = useState<CsvColumn[]>([]);
  const [rows, setRows] = useState<Record<string, string>[]>([]);
  const [mapping, setMapping] = useState<ImportMapping>({});

const handleFile = (file: File, onColumnsReady?: () => void) => {
    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.replace(/^"|"$/g, ""),
      complete: (results) => {
        const columns = results.meta.fields ?? [];
        setCsvColumns(columns.map((c) => ({ name: c })));
        setRows(results.data);

  
         if (onColumnsReady) onColumnsReady(); // open modal here
          if (onParsed) onParsed(); // optional global callback
      },
        });
  };

 return {
  csvColumns,
  setCsvColumns,
  rows,
  setRows,
  mapping,
  setMapping,
  handleFile,
};
}


