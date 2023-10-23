import { ERROR_MSG_DATA_FETCH, ERROR_MSG_FILTER } from "../../../constants/error";
import { DataLoader } from "../../utils/dataLoader";
import { IProduct } from "./product.model";
import { TYPE } from "./product.queries";


// function mapToProduct(data: any): IProduct {
//   return {
//     vin: data.vin,
//     make: data.make,
//     colour: data.colour,
//     model: data.model,
//     price: data.price,
//   };
// }

export const ProductResolvers = {
  // customers: async (parent: any, args: { filter: IProduct }, context: any, info: any): Promise<IProduct[]> => {
  customers: async (parent: any, args: { filter: IProduct }, context: any, info: any): Promise<String[][]> => {
      try {
      const dataArray = await DataLoader.genericDataGetter(TYPE);

      // Extracting filter input from arguments
      const { filter } = args;
      if (!filter) {
        throw new Error(ERROR_MSG_FILTER);
      }

      // Filter the results
      const filteredCustomers = dataArray.filter((customer) => {
        let matches = true;

        for (const [key, value] of Object.entries(filter)) {
          if (key in customer && customer[key as keyof typeof customer] !== value) {
            matches = false;
            break;
          }
        }
        return matches;
      });

      // // Transform the data from snake_case to camelCase
      // const mapArray = filteredCustomers.map((customer: any): IProduct => {
      //   return mapToProduct(customer);
      // });

      // return mapArray;
      return filteredCustomers;
    }
    catch (error) {
      throw new Error(ERROR_MSG_DATA_FETCH);
    }
  },
};
