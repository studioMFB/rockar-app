import csv from "csvtojson";
import {
  ERROR_MSG_CONVERT, ERROR_MSG_DATA_FETCH, ERROR_MSG_DATA_SOURCE,
  ERROR_MSG_DB_CONNECT, ERROR_MSG_DIR_UNDEFINED,
  ERROR_MSG_FILE_UNDEFINED, ERROR_MSG_PARAMS
} from "../../constants/error";


export namespace DataLoader {

  /**
 * Transforms the keys of objects within an array from snake_case to camelCase.
 *
 * Specifically, it targets the 'contact_number' field, converting it to 'contactNumber',
 * while keeping all other fields unchanged. This function doesn't mutate the original 
 * data but returns a new array with the transformed objects.
 *
 * @param {any[]} data - An array of objects where each object's keys represent the data fields.
 *                       These objects may contain a mix of snake_case and other naming 
 *                       conventions for keys.
 *
 * @returns {any[]} A new array derived from the input `data`, where each object's 'contact_number'
 *                  field (if present) has been renamed to 'contactNumber', and the value 
 *                  from the original object is copied over. All other fields are kept as-is.
 *
 * @example
 * const originalData = [{ contact_number: '12345', other_field: 'value' },...];
 * 
 * const mappedData = mapData(originalData);
 * // Result: [{ contactNumber: '12345', other_field: 'value' },...]
 *
 */
  function mapData(data: any[]): any[] {
    return data.map(item => {
      const result: { [key: string]: any } = {};

      for (const key in item) {
        // Only transform the data that we know to be snake_case to camelCase.
        const newKey = key === 'contact_number' ? 'contactNumber' : key;

        result[newKey] = item[key];
      }

      return result;
    });
  }

  /**
 * Filters a list of objects based on the provided filter criteria.
 *
 * This generic async function compares each object in the provided dataArray against
 * the filter criteria. It returns a Promise that resolves with an array of objects 
 * that match the filter criteria. It's designed to work with any object type, 
 * provided that the filter criteria include keys relevant to the objects in dataArray.
 *
 * @template T The object type that the function works with, ensuring that the filter 
 *             criteria and dataArray contain objects of the same type.
 *
 * @param {T} filter - An object of type T containing the filter criteria. Each key in 
 *                     this object is checked against the corresponding key in the 
 *                     objects in dataArray.
 * @param {T[]} dataArray - An array of objects of type T to be filtered. Each object in 
 *                          this array is compared against the filter criteria.
 *
 * @returns {Promise<T[]>} A promise that resolves with an array of objects of type T. 
 *                         Each object in this array satisfies all filter criteria specified 
 *                         in the filter object.
 *
 * @example
 * // For a list of products, filter those that are available.
 * const products = await filterData<{ colour: string }>({ colour: 'Red' }, Products);
 *
 * @throws Will throw an error if the filtering process encounters an issue.
 */
  export async function filterData<T extends object>(filter: T, dataArray: T[]): Promise<T[]> {
    try {
      // Filter the data
      const filteredData = dataArray.filter((data: T) => {
        let matches = true;

        for (const [key, value] of Object.entries(filter)) {
          // Check if key exists and if its value is not a match.
          const dataValue = (data[key as keyof typeof data] as string).toLowerCase();

          if (key in data && dataValue !== value.toLowerCase()) {
              matches = false;
            break;
          }
        }
        return matches;
      });

      return mapData(filteredData);
    }
    catch (error) {
      throw new Error(ERROR_MSG_DATA_FETCH);
    }
  }

  /**
 * Asynchronously retrieves data of a specified type from the data source and filters the results 
 * based on the provided criteria.
 * 
 * This generic function is designed to work with various data types. It fetches data corresponding 
 * to the specified type, applies a filter if present, and returns the filtered or complete data set.
 * If the filtering is used, it will be applied to the data fields directly corresponding to the 
 * keys in the `filter` object. In the case of an error during the data fetching process, an error 
 * will be thrown.
 *
 * @param {string} type - The type of data to retrieve. This is used in fetching the data and is 
 *                        expected to match a known type identifier in the data source.
 *
 * @returns {Function} A function that takes four arguments typically associated with GraphQL resolvers:
 *                     obj (parent object), args (arguments passed to the resolver), context (shared 
 *                     between all resolvers), and info (AST of the incoming query). 
 *                     This function returns a Promise that resolves to an array of objects of type T, 
 *                     corresponding to the fetched data set (filtered or complete based on the input criteria).
 *
 * @template T This function is generic, expecting a type parameter corresponding to the data structure 
 *             being worked with, ensuring consistency between the input filter, fetched data, and 
 *             returned data array.
 *
 * @example
 * // Resolver for 'books' data type.
 * const bookResolver = fetchAll<Book>('books');
 * 
 * // Later in GraphQL resolver definition:
 * Query: {
 *   books: bookResolver
 * }
 *
 * @throws {Error} If there is a problem fetching the data, an error is thrown with a message 
 *                 indicating the failure.
 */
  export function fetchAll<T extends object>(type: string) {
    return async (obj: any, args: { filter: T }, context: any, info: any): Promise<T[]> => {

      const params = {
        ...args, // arguments passed to the database query.
      };

      // Extracting filter input from arguments
      const { filter } = args;

      try {
        const dataArray = await fetchData<T>(type.toLowerCase(), params);

        if (filter) {
          return await filterData<T>(filter, dataArray);
        }
        else {
          return dataArray;
        }
      }
      catch (error) {
        throw new Error(ERROR_MSG_DATA_FETCH);
      }
    };
  }

  /**
 * Asynchronously fetches data from a specified data source based on the type and parameters provided.
 * 
 * This function is a generic data retrieval utility that can interface with different data sources 
 * such as CSV files or a database. The specific source from which the data is retrieved is determined 
 * by the `DATA_SOURCE` environment variable. The function is designed to be flexible and can work with 
 * various data structures, as indicated by the generic type `T`.
 *
 * @param {string} type - The type of data to retrieve, which is used as an identifier or path in the 
 *                        data source. For example, it could correspond to a CSV filename or a database table.
 * @param {Record<string, any>} [params] - Optional parameters for the query, which are used if the data 
 *                                         is fetched from a database. These might correspond to SQL query 
 *                                         parameters, filtering options, or other query-specific criteria.
 *
 * @returns {Promise<T[]>} - A promise that resolves to an array of data of type `T`. The structure of 
 *                           these objects is determined by the data's source and the `type` parameter.
 *
 * @template T - A placeholder for the data type that the function returns. This generic parameter ensures 
 *               that the data array returned by the function maintains consistency in its structure 
 *               and aligns with the expected data model.
 *
 * @example
 * // To fetch 'user' data from the corresponding data source
 * const users = await fetchData<User>('user');
 *
 * @throws {Error} - Throws an error if `params` are required but not provided, the `DATA_SOURCE` environment 
 *                   variable is not set, or the specified data source is not supported. The error messages 
 *                   are stored in `ERROR_MSG_PARAMS` and `ERROR_MSG_DATA_SOURCE` constants, respectively.
 */
  export async function fetchData<T>(type: string, params?: Record<string, any>): Promise<T[]> {
    const DATA_SOURCE: string | undefined = process.env.DATA_SOURCE?.toLowerCase();

    switch (DATA_SOURCE) {
      case "csv":
        return getDataFromCsv<T>(type);
      case "db":
        if (!params) {
          throw new Error(ERROR_MSG_PARAMS);
        }
        return getDataFromDatabase<T>(type, params);
      default:
        throw new Error(ERROR_MSG_DATA_SOURCE);
    }
  }

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
  async function getDataFromCsv<T>(filename: string): Promise<T[]> {
    const DIR_PATH: string | undefined = process.env.CSV_DIR_PATH;
    try {
      if (!DIR_PATH) {
        throw new Error(ERROR_MSG_DIR_UNDEFINED);
      }
      if (!filename) {
        throw new Error(ERROR_MSG_FILE_UNDEFINED);
      }

      const filePath = `${DIR_PATH}/${filename}.csv`;
      const jsonData: T[] = await csv().fromFile(filePath); // Parse CSV as Json.

      return jsonData;
    }
    catch {
      throw new Error(ERROR_MSG_CONVERT);
    }
  }

  /**
 * Asynchronously retrieves data from the database based on the provided query and parameters.
 *
 * This function is intended to execute a database query using the supplied `query` and `params`. It is 
 * designed to be flexible, allowing for various query structures and parameters, depending on the needs 
 * of the calling context. The generic type `T` is used to define the structure of the objects that 
 * the database query returns, allowing this function to be used for a wide range of database queries 
 * across different data models. Currently, this function serves as a placeholder and needs to be 
 * integrated with actual database interaction logic.
 *
 * @param {any} query - The database query or command that specifies what data to fetch. This could be 
 *                      a SQL query, a MongoDB command, or any other appropriate format, depending on 
 *                      the database being used.
 * @param {any} params - The parameters or variables required by the `query`, if applicable. These could 
 *                       include values for filtering, sorting, or any other query modifications.
 *
 * @returns {Promise<T[]>} - A promise that resolves to an array of objects retrieved from the database, 
 *                           each conforming to the generic type `T`.
 *
 * @template T - Represents the expected structure of records fetched from the database, ensuring the 
 *               function's adaptability for various data models and database schemas.
 *
 * @example
 * // Example usage with a hypothetical database structure (to be replaced with actual usage)
 * const users = await getDataFromDatabase<User>('SELECT * FROM users WHERE active = ?', [1]);
 *
 * @throws {Error} - Throws an error if there is a problem connecting to the database or executing the 
 *                   database query (error message stored in `ERROR_MSG_DB_CONNECT`).
 *
 * @todo - Replace the stub with actual database interaction logic, ensuring proper handling of 
 *         connections, query execution, result retrieval, and error management.
 */
  async function getDataFromDatabase<T>(query: any, params: any): Promise<T[]> {
    /* To be implemented */

    throw new Error(ERROR_MSG_DB_CONNECT);
  }

}