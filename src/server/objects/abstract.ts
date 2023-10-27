import { ERROR_MSG_DATA_FETCH } from "../../constants/error";
import { DataAdaptorFactory } from "../adaptors/factory";
import { DataLoader } from "../utils/dataLoader";


export default abstract class AbstractObject {

    protected type: string;
    protected adaptor: any;

    constructor(type:string) {
        this.adaptor = DataAdaptorFactory.createDataAdaptor();
        this.type = type;
    }

    async create<T extends object>(data:any):Promise<void> {
        this.adaptor.write(this.type, data as T);
    }

    retrieve<T extends object>(identifer?:string){
        return async (obj: any, args: { filter: T }, context: any, info: any): Promise<T[]> => {    
            const params = {
              ...args, // arguments passed to the database query.
            };
      
            // Extracting filter input from arguments
            const { filter } = args;
      
            try {
              const dataArray = await this.adaptor.read(this.type) as T[];
              
              if (filter) {
                return await DataLoader.filterData<T>(filter, dataArray);
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

    async update<T>(identifer:string, data:any):Promise<void> {
        this.adaptor.write(this.type, data as T, identifer);
    }

    async delete(identifer:string):Promise<void> {
        this.adaptor.write(this.type, {}, identifer);
    }
}