import { ERROR_MSG_DATA_FETCH } from "../../constants/error";
import { DataAdaptorFactory } from "../adaptors/factory";


export default abstract class AbstractObject {

  protected type: string;
  protected adaptor: any;

  constructor(type: string) {
    this.adaptor = DataAdaptorFactory.createDataAdaptor();
    this.type = type;
  }

  protected async create<T extends object>(data: any): Promise<void> {
    this.adaptor.write(this.type, data as T);
  }

  /**
* Retrieves data of a specified type from the data source and filters the results 
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
retrieve<T extends object>(identifer?: string) {
    return async (obj: any, args: { filter: T }, context: any, info: any): Promise<T[]> => {

      const params = {
        ...args, // arguments passed to the database query.
      };

      // Extracting filter input from arguments
      const { filter } = args;

      try {
        const dataArray = await this.adaptor.read(this.type, params) as T[];

        if (filter) {
          return await this.filterData<T>(filter, dataArray);
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

  async update<T>(identifer: string, data: any): Promise<void> {
    this.adaptor.write(this.type, data as T, identifer);
  }

  async delete(identifer: string): Promise<void> {
    this.adaptor.write(this.type, {}, identifer);
  }

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
  private mapData(data: any[]): any[] {
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
  private async filterData<T extends object>(filter: T, dataArray: T[]): Promise<T[]> {
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

      return this.mapData(filteredData);
    }
    catch (error) {
      throw new Error(ERROR_MSG_DATA_FETCH);
    }
  }
}