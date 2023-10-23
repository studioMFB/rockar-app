import csv from "csvtojson";
import {
  ERROR_MSG_CONVERT, ERROR_MSG_DATA_FETCH, ERROR_MSG_DATA_SOURCE,
  ERROR_MSG_DB_CONNECT, ERROR_MSG_DIR_UNDEFINED,
  ERROR_MSG_FILE_UNDEFINED, ERROR_MSG_PARAMS
} from "../../constants/error";


export namespace DataLoader {

  // export async function getDataBasedOnFilter(type:string, filter:any){
  //   const dataArray = await DataLoader.genericDataGetter(type, filter) as string;

  //   // const data = dataArray.find((data) => data.forename.toLowerCase() == filter.toLowerCase());
  //   let data = undefined;

  //   if(!data){
  //     throw new Error(ERROR_MSG_DATA);
  //   }

  //   return data;
  // }
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

  async function filterData<T extends object>(filter: T, dataArray: T[]): Promise<T[]> {
    try {
      // Filter the data
      const filteredData = dataArray.filter((data: T) => {
        let matches = true;

        for (const [key, value] of Object.entries(filter)) {
          if (key in data && data[key as keyof typeof data] !== value) {
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

  export async function fetchData<T>(type: string, params?: Record<string, any>): Promise<T[]> {
    const DATA_SOURCE: string | undefined = process.env.DATA_SOURCE?.toLowerCase();

    switch (DATA_SOURCE) {
      case "csv":
        return getDataFromCsv<T>(type);
      case "database":
        if (!params) {
          throw new Error(ERROR_MSG_PARAMS);
        }
        return getDataFromDatabase<T>(type, params);
      default:
        throw new Error(ERROR_MSG_DATA_SOURCE);
    }
  }

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

      // return JSON.stringify(jsonData);
      return jsonData;
    }
    catch {
      throw new Error(ERROR_MSG_CONVERT);
    }
  }

  // This is a stub for fetching data from the database.
  // To be implemented with the actual database query logic.
  async function getDataFromDatabase<T>(query: any, params: any): Promise<T[]> {
    // This is a stub: a real function would interact with your database and return the query results
    // For example:
    // const data = await db.query(query, params);
    // return data;

    throw new Error(ERROR_MSG_DB_CONNECT);
  }

}