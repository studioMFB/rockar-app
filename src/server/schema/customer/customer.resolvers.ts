import { ERROR_MSG_DATA_FETCH } from "../../../constants/error";
import { DataLoader } from "../../utils/dataLoader";
import { ICustomer } from "./customer.model";


const TYPE = "customer";

// function mapToCustomer(data: string[]): ICustomer {
//   return {
//     email: data[0],
//     forename: data[1],
//     surname: data[2],
//     contactNumber: data[3],
//     postcode: data[4]
//   };
// }

const CustomerResolvers = {
  // customers: async (): Promise<string[][]> => {
  //   try {
  //     const dataArray = await DataLoader.genericDataGetter(TYPE);
  //     return dataArray;
  //   }
  //   catch (error) {
  //     throw new Error(ERROR_MSG_DATA_FETCH);
  //   }
  // },

  customers: async (parent: any, args: { filter: ICustomer }, context: any, info: any): Promise<string[][]> => {
    try {
      const dataArray = await DataLoader.genericDataGetter(TYPE);

      // Extracting filter input from arguments
      const { filter } = args;

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

      // Transform the data from snake_case to camelCase
      // const mapArray = filteredCustomers.map((customer: any) => ({
      //   email: customer.email,
      //   forename: customer.forename,
      //   surname: customer.surname,
      //   contactNumber: customer.contact_number,
      //   postcode: customer.postcode,
      // }));

      return filteredCustomers;
    }
    catch (error) {
      throw new Error(ERROR_MSG_DATA_FETCH);
    }
  },
};

export { CustomerResolvers as CustomerResolver };
