// import csv from "csvtojson";
import { DataLoader } from "../../utils/dataLoader";
import { ICustomer } from "./customer.model";

const TYPE = "customer";

function toCustomer(data: string[]): ICustomer {

  console.log("toCustomer => data ", data);

  return {
    email: data[0],
    forename: data[1],
    surname: data[2],
    contactNumber: data[3],
    postcode: data[4]
  };
}

const CustomerResolver = {
  getAllCustomers: async (): Promise<string[][]> => {
    try {
      const dataArray = await DataLoader.genericDataGetter(TYPE);

      return dataArray;
    }
    catch (error) {
      throw new Error("Something went wrong")
    }
  },

  getCustomer: async (root: any, args: ICustomer): Promise<ICustomer | undefined> => {
    try {
      const dataArray = await DataLoader.genericDataGetter(TYPE);

      console.log("dataArray ", dataArray);

      const convertedArray = dataArray.map(objectArray => toCustomer(objectArray)) as ICustomer[];
//       dataArray.forEach((customer)=>{
// if(customer.forename === args.forename){

// }
//       })

      return convertedArray.find(c => c.forename === args.forename);
    }
    catch (error) {
      throw new Error("Something went wrong")
    }
  },
};

export { CustomerResolver };
