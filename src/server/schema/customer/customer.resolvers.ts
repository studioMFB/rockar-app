import { ERROR_MSG_DATA_FETCH, ERROR_MSG_FILTER } from "../../../constants/error";
import { DataLoader } from "../../utils/dataLoader";
import { ICustomer } from "./customer.model";


const TYPE = "customer";


/**
 * Transforms raw data into a structured `ICustomer` object.
 * 
 * This function handles the transformation of data (obtained from an external source 
 * or another format in the application) into the shape of an `ICustomer` object.
 *
 * @param {any} data - The input data to be transformed, which can be of any type. 
 *                     This parameter represents the raw data that needs processing.
 *
 * @returns {ICustomer} - The resulting `ICustomer` object after transformation. This object conforms to the 
 *                        ICustomer interface.
 * 
 * @example
 *   const rawData = { forename: 'Tom', contact_number: '07 000 000 00', ... };
 *   const customer = mapToCustomer(rawData);
 * 
 * @function mapToCustomer
 */
function mapToCustomer(data: any): ICustomer {
  return {
      email: data.email,
      forename: data.forename,
      surname: data.surname,
      contactNumber: data.contact_number,
      postcode: data.postcode,
  };
}

const CustomerResolvers = {
  /**
 * Retrieves a list of customers optionally filtered by certain criteria.
 * 
 * This function asynchronously fetches customers and may apply a filter if specified in the arguments. 
 * It returns a promise that resolves to an array of customers conforming to the ICustomer interface.
 *
 * @param {any} parent - The return value of the resolver for this field's parent (unused in top-level queries).
 * @param {Object} args - The arguments passed into the query, potentially containing a 'filter' object.
 * @param {ICustomer} args.filter - An optional filter applied to the customer search criteria. 
 *                                   Should conform to the ICustomer interface for field matching.
 * @param {any} context - The context passed from the ApolloServer instance (e.g., useful for containing auth info, data sources, etc.).
 * @param {any} info - Abstract Syntax Tree information related to the query (used less frequently but useful for advanced query techniques).
 * @returns {Promise<ICustomer[]>} A promise that resolves to an array of ICustomer objects.
 * 
 * @example
 * query {
 *   customers(filter: { forename: "Tom" }) {
 *    forename
      surname
      email
      contactNumber
      postcode
 *   }
 * }
 * 
 * @function customers
 */
  customers: async (parent: any, args: { filter: ICustomer }, context: any, info: any): Promise<ICustomer[]> => {
          try {
      const dataArray = await DataLoader.genericDataGetter(TYPE);

      // Extracting filter input from arguments
      const { filter } = args;
      if(!filter){
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

      // Transform the data from snake_case to camelCase
      const mapArray = filteredCustomers.map((customer: any): ICustomer => {
        return mapToCustomer(customer);
      });

      return mapArray;
    }
    catch (error) {
      throw new Error(ERROR_MSG_DATA_FETCH);
    }
  },
};

export { CustomerResolvers as CustomerResolver };
