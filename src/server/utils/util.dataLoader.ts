import csv from "csvtojson";


const ERROR_MSG_DIR_UNDEFINED = "The directory path is undefined!";
const ERROR_MSG_FILE_UNDEFINED = "The filename is undefined!";
const ERROR_MSG_CONVERT = "Failed while trying to convert the csv into a json!";
const ERROR_MSG_DB_CONNECT = "Failed to connect to the database!";
const ERROR_MSG_DATA_SOURCE = "Invalid data source!";
const ERROR_MSG_PARAMS = "The query parameters are undefined!";
// const ERROR_MSG_DATA = "No data was found!";

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

  export async function genericDataGetter(type: string, params?: Record<string, any>): Promise<string[][]>  {
    console.log("genericDataGetter =>");

    const dataSource: string | undefined = process.env.DATA_SOURCE?.toLowerCase();
    console.log("process.env.DATA_SOURCE ", dataSource);

    switch (dataSource) {
      case "csv":

    console.log("=> CSV");

        return getDataFromCsv(type);
      case "database":
        if(!params){
          throw new Error(ERROR_MSG_PARAMS);
        }
        return getDataFromDatabase(type, params);
      default:
        throw new Error(ERROR_MSG_DATA_SOURCE);
    }
  }

  async function getDataFromCsv(filename: string): Promise<string[][]> {
    console.log("getDataFromCsv => ");

    const dirPath: string | undefined = process.env.CSV_DIR_PATH;

    console.log("process.env.CSV_DIR_PATH ", dirPath);
    console.log("filename => ", filename);

    try {
      if (!dirPath) {
        throw new Error(ERROR_MSG_DIR_UNDEFINED);
      }
      if (!filename) {
        throw new Error(ERROR_MSG_FILE_UNDEFINED);
      }
      // Parse CSV to return data as Json
      const filePath = `${dirPath}/${filename}.csv`;
      console.log("filePath ", filePath);

      const jsonData = await csv().fromFile(filePath) as string[][];
      console.log("jsonData ", jsonData);

      // return JSON.stringify(jsonData);
      return jsonData;
    }
    catch {
      throw new Error(ERROR_MSG_CONVERT);
    }
  }

  // This is a stub for fetching data from your database.
  // Replace this with your actual database query logic.
  async function getDataFromDatabase(query: any, params: any): Promise<string[][]>  {
    // This is a stub: a real function would interact with your database and return the query results
    // For example:
    // const data = await db.query(query, params);
    // return data;

    throw new Error(ERROR_MSG_DB_CONNECT);
  }

}