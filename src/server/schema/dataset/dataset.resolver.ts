import { ERROR_MSG_DATA_FETCH } from "../../../constants/error";
import { IDataset } from "./dataset.model";
import { DataLoader } from "./../../utils/dataLoader";


export const DatasetResolver = {

    dataset: async (root: any, args: IDataset): Promise<string[][]> => {
        try {
            const dataArray = await DataLoader.genericDataGetter(args.type);            
            return dataArray;
        }
        catch (error) {
            throw new Error(ERROR_MSG_DATA_FETCH);
        }
    }
};