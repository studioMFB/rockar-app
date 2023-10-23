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
  products: DataLoader.fetchAll<IProduct>('product'),

  //   productsFilter: async (parent: any, args: { filter: IProduct }, context: any, info: any): Promise<String[][]> => {
  //     try {
  //     const dataArray = await DataLoader.fetchData(TYPE);

  //     // Extracting filter input from arguments
  //     const { filter } = args;
  //     if (!filter) {
  //       throw new Error(ERROR_MSG_FILTER);
  //     }

  //     // Filter the results
  //     // const filteredProducts = dataArray.filter((product) => {
  //     //   let matches = true;

  //     //   for (const [key, value] of Object.entries(filter)) {
  //     //     if (key in product && product[key as keyof typeof product] !== value) {
  //     //       matches = false;
  //     //       break;
  //     //     }
  //     //   }
  //     //   return matches;
  //     // });

  //     // // Transform the data from snake_case to camelCase
  //     // const mapArray = filteredCustomers.map((customer: any): IProduct => {
  //     //   return mapToProduct(customer);
  //     // });

  //     return dataArray;
  //     // return mapArray;
  //     // return filteredProducts;
  //   }
  //   catch (error) {
  //     throw new Error(ERROR_MSG_DATA_FETCH);
  //   }
  // },
};
