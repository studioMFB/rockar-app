import csv from "csvtojson";
import { ERROR_MSG_CONVERT, ERROR_MSG_DIR_UNDEFINED, ERROR_MSG_FILE_UNDEFINED } from "../../constants/error";
import { AbstractDataSource } from "./abstract";


export class CsvAdaptor extends AbstractDataSource {

  /**
* Asynchronously fetches and converts data from a specified CSV file into JSON format.
*
* This function reads a CSV file, specified by the `filename`, from a directory path defined in the 
* `CSV_DIR_PATH` environment variable. It parses the CSV content and transforms it into an array 
* of JSON objects. The generic type `T` ensures the function's flexibility to accommodate various 
* data structures corresponding to different CSV files. This function is particularly useful for 
* environments where data storage and retrieval are handled via flat files rather than traditional 
* databases.
*
* @param {string} filename - The name of the target CSV file (without extension) from which data is read. 
*                            The actual file accessed is `<CSV_DIR_PATH>/<filename>.csv`.
* 
* @returns {Promise<T[]>} - A promise that resolves to an array of JSON objects, each representing 
*                           a row from the CSV file, conforming to the structure of type `T`.
*
* @template T - Represents the expected structure of objects that the CSV rows are converted into. 
*               This type parameter accommodates a variety of data models corresponding to different CSV files.
*
* @example
* // Fetches data from 'records.csv' and expects each row to conform to the structure of a 'Record' type.
* const records = await getDataFromCsv<Record>('records');
*
* @throws {Error} - Throws an error if the `CSV_DIR_PATH` environment variable is not set, indicating 
*                   that the directory path for CSV files is not specified (error message stored in 
*                   `ERROR_MSG_DIR_UNDEFINED`), if the `filename` is not provided (error message in 
*                   `ERROR_MSG_FILE_UNDEFINED`), or if there is an issue in reading or parsing the CSV file 
*                   (error message in `ERROR_MSG_CONVERT`).
*/
  async read(filename: string, identifer?: string): Promise<any[] | null> {
    const DIR_PATH: string | undefined = process.env.CSV_DIR_PATH;

    try {
      if (!DIR_PATH) {
        throw new Error(ERROR_MSG_DIR_UNDEFINED);
      }
      if (!filename) {
        throw new Error(ERROR_MSG_FILE_UNDEFINED);
      }

      const filePath = `${DIR_PATH}/${filename}.csv`;
      const jsonData: any[] = await csv().fromFile(filePath); // Parse CSV as Json.

      return jsonData;
    }
    catch {
      throw new Error(ERROR_MSG_CONVERT);
    }
  }

  async write<T>(filename: string, data: any, identifer = false) {
    // Data Source Specific Code
  }
}