import Papa from "papaparse";
import { getSheetCsvUrl } from "@/lib/config";

export async function fetchSheetRows<T>(sheetName: string): Promise<T[]> {
  const response = await fetch(getSheetCsvUrl(sheetName), {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Impossible de récupérer la feuille ${sheetName}`);
  }

  const csv = await response.text();
  const parsed = Papa.parse<T>(csv, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
  });

  return parsed.data;
}
